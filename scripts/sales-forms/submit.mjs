// 法人営業のフォーム宛てを、ヘッドレスブラウザで自動入力・送信する (GitHub Actions の sales-forms ワークフローから実行)。
//
//   1) GET  $BASE_URL/internal/sales/forms?limit=N で、承認済み・未送信のフォーム宛てを受け取る
//   2) 1件ずつページを開き、問い合わせフォームを探して入力する
//   3) 送信 (確認画面があれば確認ボタンも押す) し、完了表示を確かめる
//   4) POST $BASE_URL/internal/sales/forms で結果 (sent / skipped / failed) を書き戻す
//
// 見送るもの (嘘の内容を入れない・迷惑をかけないためのルール):
//   - 「営業お断り」「セールスお断り」等の記載があるページ
//   - CAPTCHA (画像認証) があるフォーム
//   - 住所・郵便番号・学年・お子さまの情報・性別など、こちらが正しく答えられない必須項目があるフォーム
//     (生年月日・年齢が必須の場合は、じゅんさん本人の生年月日 1980年8月16日 と、そこから計算した年齢を入れる)
//   - 体験・見学の予約、入会・入塾の申込、採用応募など、問い合わせ以外が目的のフォーム
//   - ブログのコメント欄
// 失敗・完了画面を確認できなかったものは、二重送信を避けるため自動では再送しない。
//
// 環境変数: CRON_SECRET (必須), BASE_URL (既定 https://app.bluespring.co.jp), LIMIT (既定 30),
//           DRY=1 で送信せず入力までを試す (結果は書き戻さない), OUT_DIR (スクリーンショットの保存先)

import { chromium } from "playwright";
import { mkdirSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = (process.env.BASE_URL || "https://app.bluespring.co.jp").replace(/\/$/, "");
const SECRET = process.env.CRON_SECRET;
const LIMIT = Number(process.env.LIMIT || 30);
const DRY = process.env.DRY === "1";
const OUT_DIR = process.env.OUT_DIR || "out/sales-forms";
const RUN_BUDGET_MS = 25 * 60 * 1000; // ワークフローの制限時間より手前で止める
const ITEM_BUDGET_MS = 180 * 1000;

// 送信者情報 (じゅんさん指定: 担当者名は「川本　潤」、電話番号は必須のフォームにだけ入れる)
const SENDER = {
  company: "株式会社ブルースプリング",
  name: "川本　潤",
  sei: "川本",
  mei: "潤",
  kana: "カワモト ジュン",
  seiKana: "カワモト",
  meiKana: "ジュン",
  hira: "かわもと じゅん",
  seiHira: "かわもと",
  meiHira: "じゅん",
  email: "pr@bluespring.co.jp",
  tel: "09036593315",
  telParts: ["090", "3659", "3315"],
  url: "https://app.bluespring.co.jp",
  // 生年月日・年齢が必須のフォーム用 (じゅんさん本人の生年月日。じゅんさん指定)
  birth: { y: 1980, m: 8, d: 16 },
};

const OPT_OUT =
  /営業(?!時間|日|中|所|部|担当)[^。\n]{0,15}(お断り|ご遠慮|禁止)|勧誘[^。\n]{0,12}(お断り|ご遠慮|禁止)|セールス[^。\n]{0,12}(お断り|ご遠慮|禁止)|売り込み[^。\n]{0,12}(お断り|ご遠慮|禁止)|飛び込み営業/;
const SUCCESS =
  /送信(が|を)?(完了|しました|されました|いたしました|致しました)|ありがとうございま(す|した)|受け付け(ました|いたしました|致しました)|受付(完了|いたしました|致しました|しました)|承りました|thank\s*you|thanks for|successfully|has been sent|was sent/gi;
const INPUT_ERROR = /入力してください|入力して下さい|選択してください|必須項目です|必須です|正しく入力|入力内容に(誤り|エラー)|エラーがあります|入力されていません|invalid|is required|required field/gi;
// サイト側で送信を断られたときの表示 (reCAPTCHA v3 でスパム判定された Contact Form 7 など)。この場合は届いていない
const REJECTED = /送信に失敗|失敗しました|スパム|spam|エラーが発生|送信できませんでした|送信中にエラー|failed to send|could not be sent/gi;
const NOT_CONTACT_PURPOSE = /(体験|見学|無料体験|体験レッスン|予約|入会|入塾|入校|申込|申し込み|エントリー|求人|採用|応募|資料請求)/;
const CONTACT_WORD = /(問い?合|問合|contact|inquiry|お問合せ|ご相談|ご意見)/i;

function log(...a) {
  console.log(new Date().toISOString().slice(11, 19), ...a);
}

async function api(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${SECRET}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  return json;
}

// ------------------------------------------------------------------
// ページ内で実行する関数 (Playwright がソースごとブラウザに渡すので、外の変数は使えない)
// ------------------------------------------------------------------

/** このフレームの「本命の問い合わせフォーム」の手がかりを返す */
function inspectFrame() {
  const forms = [...document.forms].filter((f) => f.querySelector("textarea"));
  const scored = forms
    .map((f, i) => ({ i, n: f.querySelectorAll("input:not([type=hidden]),textarea,select").length, f }))
    .sort((a, b) => b.n - a.n);
  const best = scored[0];
  if (!best) return { hasForm: false };
  const f = best.f;
  const isComment = f.id === "commentform" || /wp-comments-post|comment/i.test(f.getAttribute("action") || "");
  const headings = [...document.querySelectorAll("h1,h2,h3,title,legend")]
    .map((h) => (h.textContent || "").trim())
    .filter(Boolean)
    .slice(0, 12)
    .join(" / ");
  return { hasForm: true, fields: best.n, isComment, headings, formText: (f.innerText || "").replace(/\s+/g, " ").slice(0, 3000) };
}

/** 本命のフォームに入力する。入れられない必須項目は miss に入れて返す (その場合は送信しない) */
function fillForm(args) {
  const { P, subject, body } = args;
  window.__aoForm = null;
  const forms = [...document.forms].filter((f) => f.querySelector("textarea"));
  const f = forms.sort(
    (a, b) =>
      b.querySelectorAll("input:not([type=hidden]),textarea,select").length -
      a.querySelectorAll("input:not([type=hidden]),textarea,select").length,
  )[0];
  if (!f) return { error: "no-form" };
  window.__aoForm = f;
  const txt = (e) => ((e && e.innerText) || "").replace(/\s+/g, " ").trim();
  const lab = (e) => {
    let s = [e.labels && e.labels[0] && txt(e.labels[0]), e.getAttribute("aria-label"), e.placeholder, e.name, e.id].filter(Boolean).join(" ");
    const tr = e.closest("tr");
    if (tr && tr.querySelector("th")) s += " " + txt(tr.querySelector("th"));
    const dd = e.closest("dd");
    if (dd && dd.previousElementSibling) s += " " + txt(dd.previousElementSibling);
    let p = e.parentElement;
    for (let i = 0; i < 4 && p; i++, p = p.parentElement) {
      const t = txt(p);
      if (t.length > 0 && t.length < 60) {
        s += " " + t;
        break;
      }
    }
    return s;
  };
  // その欄だけのラベル (周りの文字を拾わない)。「お名前 姓 名」のように周りの文字が混ざると、
  // 名の欄に姓を入れる・氏名の欄にフリガナを入れる、といった取り違えが起きるため、こちらを優先して判定する
  const ownLab = (e) => {
    let s = [e.labels && e.labels[0] && txt(e.labels[0]), e.getAttribute("aria-label"), e.placeholder, e.name, e.id].filter(Boolean).join(" ");
    const tr = e.closest("tr");
    if (tr && tr.querySelector("th") && tr.querySelectorAll("input,textarea,select").length === 1) s += " " + txt(tr.querySelector("th"));
    const dd = e.closest("dd");
    if (dd && dd.previousElementSibling && dd.querySelectorAll("input,textarea,select").length === 1) s += " " + txt(dd.previousElementSibling);
    // この欄だけを囲む枠 (入力欄が1つだけ入っている一番外側の要素) の文字も、その欄の見出しとして使う
    let box = null;
    for (let p = e.parentElement, i = 0; p && i < 5; p = p.parentElement, i++) {
      if (p.querySelectorAll("input:not([type=hidden]),textarea,select").length !== 1) break;
      if (txt(p).length <= 80) box = p;
    }
    if (box) s += " " + txt(box);
    return s;
  };
  const short = (s) => s.replace(/\s+/g, " ").trim().slice(0, 14);
  const KANA = /カナ|かな|フリガナ|ふりがな|kana|furigana|ruby|yomi/;
  const SEI = /姓|せい|セイ|sei_?kana|namesei|(^|[^a-z])sei([^a-z]|$)|last.?name|family|lname/;
  const MEI = /(^|[\s（(【])名([\s)）】]|$)|めい|メイ|mei_?kana|namemei|(^|[^a-z])mei([^a-z]|$)|first.?name|given|fname/;
  /** 文字の欄の種類を判定する (該当なしは null) */
  const classify = (s, t) => {
    if (/お子|生徒|児童|学年|保護者|性別|gender|郵便|〒|zip|住所|address|生年月日|誕生|birth|年齢/.test(s)) return null;
    if (t === "email" || /mail|メール/.test(s)) return "email";
    if (/fax/.test(s)) return "fax";
    if (t === "tel" || /tel|phone|電話|携帯/.test(s)) return "tel";
    if (t === "url" || /url|ホームページ|website|サイト/.test(s)) return "url";
    if (KANA.test(s)) return SEI.test(s) ? "seiKana" : MEI.test(s) ? "meiKana" : "kana";
    if (/部署|部門|department|division|dept/.test(s)) return "dept";
    if (/役職|肩書|position|job.?title/.test(s)) return "position";
    if (/会社|法人|団体|組織|所属|company|organization|corp|貴社|御社|屋号|店名|学校名|教室名/.test(s)) return "company";
    if (isSubject(s)) return "subject";
    if (/氏名|名前|お名|ご芳名|担当者|full.?name/.test(s)) return SEI.test(s) && !/氏名/.test(s) ? "sei" : MEI.test(s) && !/氏名|名前/.test(s) ? "mei" : "name";
    if (SEI.test(s)) return "sei";
    if (MEI.test(s)) return "mei";
    if (/name/.test(s)) return "name";
    return null;
  };
  const isVisible = (e) => {
    const r = e.getBoundingClientRect();
    const cs = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
  };
  const set = (e, v) => {
    const proto = e.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(e, v);
    for (const ev of ["input", "change", "blur"]) e.dispatchEvent(new Event(ev, { bubbles: true }));
  };
  const OK = /その他|お問い?合わ?せ|問合|ご相談|other|一般|提案|営業|取材|法人|企業/i;
  // 生年月日・年齢 (じゅんさん本人の値)
  const B = P.birth;
  const nowD = new Date();
  const age = nowD.getFullYear() - B.y - (nowD.getMonth() + 1 < B.m || (nowD.getMonth() + 1 === B.m && nowD.getDate() < B.d) ? 1 : 0);
  const isBirth = (l) => /生年月日|誕生日|birth|dob/.test(l);
  const isAge = (l) => /年齢|\bage\b/.test(l) && !isBirth(l);
  // 年・月・日に分かれた欄のどれかを、name/id/placeholder/直後の文字から判定する
  const birthPart = (e) => {
    const s = `${e.name || ""} ${e.id || ""} ${e.placeholder || ""}`.toLowerCase();
    if (/year|yyyy|(^|[_\-\[\s])y([_\-\]\s]|$)/.test(s)) return "y";
    if (/month|(^|[^a-z])mm([^a-z]|$)|(^|[_\-\[\s])m([_\-\]\s]|$)/.test(s)) return "m";
    if (/day|(^|[^a-z])dd([^a-z]|$)|(^|[_\-\[\s])d([_\-\]\s]|$)/.test(s)) return "d";
    const next = ((e.nextSibling && e.nextSibling.textContent) || "").trim().charAt(0);
    if (next === "年") return "y";
    if (next === "月") return "m";
    if (next === "日") return "d";
    return null;
  };
  const partValue = (part) => (part === "y" ? B.y : part === "m" ? B.m : B.d);
  const pad = (n) => String(n).padStart(2, "0");
  const els = [...f.elements].filter((e) => {
    const t = (e.type || "").toLowerCase();
    return !["hidden", "submit", "button", "reset", "image", "file", "password"].includes(t) && (e.name || e.id);
  });
  const reqOf = (e, L) => e.required || e.getAttribute("aria-required") === "true" || /必須|※|\*|required/i.test(L);
  const isSubject = (l) => /件名|subject|題名|タイトル|title|用件/.test(l) && !/種別|種類|区分/.test(l);
  const hasSubject = els.some((e) => e.tagName === "INPUT" && isSubject(lab(e).toLowerCase()));
  const hasCo = els.some((x) => /会社|法人|団体|組織|所属|company|organization|貴社|御社|屋号|学校名|教室名/i.test(lab(x)));
  const filled = {};
  const miss = [];
  const tels = [];
  const textFields = [];
  const done = new Set();
  let bodyDone = false;
  for (const e of els) {
    const t = (e.type || "").toLowerCase();
    const L = lab(e);
    const l = L.toLowerCase();
    const req = reqOf(e, L);
    const key = e.name || e.id;
    const put = (k, v) => {
      set(e, v);
      filled[key] = k;
    };
    if (e.tagName === "TEXTAREA") {
      if (!bodyDone) {
        put("body", hasSubject ? body : `【件名】${subject}\n\n${body}`);
        bodyDone = true;
      } else if (req) miss.push("textarea:" + L.slice(0, 30));
      continue;
    }
    if (e.tagName === "SELECT" && (isBirth(l) || isAge(l))) {
      const part = isBirth(l) ? birthPart(e) : null;
      const want = isAge(l) ? age : part ? partValue(part) : null;
      const opts = [...e.options].filter((x) => x.value);
      const opt =
        want === null
          ? null
          : isAge(l)
            ? opts.find((x) => parseInt(x.text, 10) === age || parseInt(x.value, 10) === age) ||
              opts.find((x) => new RegExp(`${Math.floor(age / 10) * 10}代`).test(x.text))
            : opts.find((x) => parseInt(x.value, 10) === want || parseInt(x.text, 10) === want);
      if (opt) {
        e.value = opt.value;
        e.dispatchEvent(new Event("change", { bubbles: true }));
        filled[key] = isAge(l) ? "age" : "birth-" + part;
      } else if (req) miss.push("生年月日/年齢の選択肢:" + L.slice(0, 20));
      continue;
    }
    if (e.tagName === "SELECT" && /学年|生徒|お子|児童|保護者|校舎|教室を選|性別|gender|都道府県|pref/.test(ownLab(e) + " " + (e.name || ""))) {
      if (req) miss.push("select:" + ownLab(e).slice(0, 30));
      continue;
    }
    if (e.tagName === "SELECT") {
      const opt = [...e.options].find((x) => OK.test(x.text) && x.value);
      if (opt) {
        e.value = opt.value;
        e.dispatchEvent(new Event("change", { bubbles: true }));
        filled[key] = "select:" + opt.text;
      } else if (req) miss.push("select:" + L.slice(0, 30) + " [" + [...e.options].map((x) => x.text).slice(0, 6).join("/") + "]");
      continue;
    }
    if (t === "radio" || t === "checkbox") {
      if (done.has(e.name)) continue;
      done.add(e.name);
      const grp = e.name ? [...f.querySelectorAll(`[name="${CSS.escape(e.name)}"]`)] : [e];
      if (t === "checkbox" && grp.length === 1 && /同意|承諾|agree|プライバシー|個人情報|確認|規約|policy|privacy/i.test(L)) {
        if (!e.checked) e.click();
        filled[key] = "agree";
        continue;
      }
      const grpReq = grp.some((r) => r.required) || /必須|※|\*/.test(L);
      if (grp.some((r) => r.checked)) continue;
      // 選択肢そのものの文字 (ラベル・値・直後の文字) だけで選ぶ。周りの文字で選ぶと「個人・法人」の「個人」を選ぶ等の誤りが起きる。
      // 「一般」はクラス名 (例:「月曜Girls一般」) にも使われるため、選択肢の決め手にしない
      const optText = (r) => [r.labels && r.labels[0] && txt(r.labels[0]), r.value, r.nextSibling && r.nextSibling.textContent].filter(Boolean).join(" ");
      const PRIORITY = [/法人|企業|会社|団体/, /営業|提案|取材|ご案内/, /お問い?合わ?せ|問合|ご相談|ご質問/, /その他|other/i];
      let pick = null;
      for (const re of PRIORITY) {
        pick = grp.find((r) => re.test(optText(r)) && !/個人/.test(optText(r)));
        if (pick) break;
      }
      if (pick) {
        pick.click();
        filled[key] = t + ":" + pick.value;
      } else if (grpReq) miss.push(t + ":" + (e.name || "") + " [" + grp.map((r) => r.value).slice(0, 6).join("/") + "]");
      continue;
    }
    const ownFull = ownLab(e);
    // 生徒・お子さま・学年の欄 (保護者向けの入会・体験フォーム) には、こちらの情報を入れない
    if (/お子|生徒|児童|学年|保護者/.test(ownFull)) {
      if (req) miss.push("個人情報:" + short(ownFull));
      continue;
    }
    // 欄そのもののラベル・名前 → 欄を囲む枠の文字 の順に判定する
    const core = [e.labels && e.labels[0] && txt(e.labels[0]), e.getAttribute("aria-label"), e.placeholder, e.name, e.id].filter(Boolean).join(" ").toLowerCase();
    const ownKind = classify(core, t) || classify(ownFull.toLowerCase(), t);
    if (ownKind) {
      textFields.push({ e, kind: ownKind, own: ownFull, req, hira: /ふりがな|ひらがな/.test(ownFull + " " + L) });
      continue;
    }
    if (/郵便|〒|zip|postal/.test(l)) {
      if (req) miss.push("郵便番号");
      continue;
    }
    if (/住所|address|都道府県|市区町村|番地|pref/.test(l) && !/mail|メール/.test(l)) {
      if (req) miss.push("住所");
      continue;
    }
    if (isBirth(l)) {
      if (t === "date") put("birth", `${B.y}-${pad(B.m)}-${pad(B.d)}`);
      else {
        const part = birthPart(e);
        put("birth", part ? String(partValue(part)) : `${B.y}/${pad(B.m)}/${pad(B.d)}`);
      }
      continue;
    }
    if (isAge(l)) {
      put("age", String(age));
      continue;
    }
    // 学年・お子さま・生徒の情報は、こちらに該当者がいないため入れない (嘘の内容になる)
    if (/性別|gender|学年|お子様|お子さま|生徒名|保護者/.test(l)) {
      if (req) miss.push("個人情報:" + L.slice(0, 20));
      continue;
    }
    const own = ownLab(e).toLowerCase();
    const kind = classify(own, t) || classify(l, t);
    if (kind) {
      textFields.push({ e, kind, own: ownLab(e), req, hira: /ふりがな|ひらがな/.test(own + " " + L) });
      continue;
    }
    if (req && !e.value) miss.push((t || e.tagName) + ":" + L.slice(0, 40));
  }
  // 同じ行に「お名前」欄が2つ並んでいたら、1つ目を姓・2つ目を名にする (フリガナも同様)
  const rowOf = (e) => e.closest("tr,dd,li") || e.parentElement;
  for (const [base, a, b] of [["name", "sei", "mei"], ["kana", "seiKana", "meiKana"]]) {
    const same = textFields.filter((x) => x.kind === base);
    for (let i = 0; i + 1 < same.length; i++) {
      if (rowOf(same[i].e) === rowOf(same[i + 1].e)) {
        same[i].kind = a;
        same[i + 1].kind = b;
        i++;
      }
    }
  }
  const valueOf = (x) => {
    switch (x.kind) {
      case "email": return P.email;
      case "url": return P.url;
      case "company": return P.company;
      case "dept": return x.req ? "アオハルOS担当" : null;
      case "position": return x.req ? "担当" : null;
      case "subject": return subject;
      case "sei": return P.sei;
      case "mei": return P.mei;
      case "name": return hasCo ? P.name : `${P.company} ${P.name}`;
      case "kana": return x.hira ? P.hira : P.kana;
      case "seiKana": return x.hira ? P.seiHira : P.seiKana;
      case "meiKana": return x.hira ? P.meiHira : P.meiKana;
      default: return null;
    }
  };
  for (const x of textFields) {
    if (x.kind === "fax") continue;
    if (x.kind === "tel") {
      tels.push({ e: x.e, req: x.req });
      continue;
    }
    const v = valueOf(x);
    if (v === null) continue;
    set(x.e, v);
    filled[x.e.name || x.e.id] = `${x.kind}「${short(x.own)}」`;
  }
  // 電話番号は必須のときだけ入れる (3分割の欄にも対応)
  const telReq = tels.some((x) => x.req);
  if (tels.length && telReq) {
    if (tels.length === 3) tels.forEach((x, i) => set(x.e, P.telParts[i]));
    else set(tels[0].e, P.tel);
    filled.tel = "tel";
  }
  // ブラウザ標準の入力チェックで引っかかる項目 (必須なのに空など) も拾う
  const invalid = [...f.elements]
    .filter((e) => e.willValidate && !e.checkValidity() && isVisible(e))
    .map((e) => "invalid:" + lab(e).slice(0, 30));
  for (const x of invalid) if (!miss.includes(x)) miss.push(x);
  return { filled, miss, bodyDone, hasSubject };
}

/** 送信ボタン (または確認画面の「送信する」) を押す */
function clickSubmit(confirmStep) {
  // 確認画面の「送信」を押すのは、元の入力フォームが消えたとき (確認画面に切り替わったとき) だけ。
  // 同じページのまま (送信中・送信済み・拒否) で「送信」を押し直すと、二重送信になるおそれがあるため
  if (confirmStep && window.__aoForm && document.contains(window.__aoForm)) {
    const ta = window.__aoForm.querySelector("textarea");
    if (ta && ta.offsetParent !== null && !ta.readOnly && !ta.disabled) return "form-still-visible";
  }
  const scope = (!confirmStep && window.__aoForm && document.contains(window.__aoForm) ? window.__aoForm : document);
  const cands = [...scope.querySelectorAll("button,input[type=submit],input[type=image],input[type=button],a[role=button]")];
  const label = (b) => (b.value || b.innerText || b.alt || b.getAttribute("aria-label") || "").trim();
  const visible = (b) => {
    const r = b.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const re = confirmStep ? /送信|この内容|submit|send|確定|完了/i : /送信|確認|submit|send|次へ|進む|問い?合わ?せ/i;
  const b = cands.find((b) => visible(b) && re.test(label(b)) && !/戻|修正|back|リセット|クリア|reset/i.test(label(b)));
  if (b) {
    b.click();
    return "clicked:" + label(b).slice(0, 20);
  }
  if (!confirmStep && window.__aoForm && window.__aoForm.requestSubmit) {
    window.__aoForm.requestSubmit();
    return "requestSubmit";
  }
  return "no-button";
}

// ------------------------------------------------------------------
// 1件の処理
// ------------------------------------------------------------------
async function pageText(page) {
  const parts = [];
  for (const fr of page.frames()) {
    try {
      parts.push(await fr.evaluate(() => (document.body ? document.body.innerText : "")));
    } catch {
      /* 読めないフレームは無視 */
    }
  }
  return parts.join("\n");
}

function count(re, s) {
  return (s.match(new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g")) || []).length;
}

function hasVisibleCaptcha(page) {
  return page
    .frames()
    .some((fr) => {
      const u = fr.url();
      return (/recaptcha\/(api2|enterprise)\/anchor/.test(u) && !/size=invisible/.test(u)) || /hcaptcha\.com/.test(u) || /challenges\.cloudflare\.com/.test(u);
    });
}

async function settle(page) {
  await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => undefined);
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => undefined);
  await page.waitForTimeout(1500);
}

async function processItem(context, item, idx) {
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  const shot = async (tag) => {
    const name = `${String(idx + 1).padStart(3, "0")}_${tag}.png`;
    await page.screenshot({ path: join(OUT_DIR, name), fullPage: false }).catch(() => undefined);
  };
  try {
    // 読み込みが遅いサイト (画像や外部スクリプト待ちで止まる等) があるため、
    // 1回目は本文の読み込み完了まで、だめなら2回目は「応答が返り始めた」時点で次に進む
    let res = await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => ({ err: e }));
    if (res && res.err) {
      res = await page.goto(item.url, { waitUntil: "commit", timeout: 45000 }).catch((e) => ({ err: e }));
      if (!(res && res.err)) await page.waitForTimeout(8000);
    }
    if (res && res.err) return { status: "failed", note: `ページを開けない: ${String(res.err.message || res.err).slice(0, 120)}` };
    if (res && typeof res.status === "function" && res.status() >= 400) return { status: "failed", note: `ページを開けない (HTTP ${res.status()})` };
    await settle(page);

    const before = await pageText(page);
    if (OPT_OUT.test(before)) return { status: "skipped", note: "ページに「営業お断り」等の記載あり" };

    // 本命のフォームがあるフレームを探す (埋め込みフォームにも対応)
    let target = null;
    for (const fr of page.frames()) {
      const info = await fr.evaluate(inspectFrame).catch(() => null);
      if (info && info.hasForm && (!target || info.fields > target.info.fields)) target = { fr, info };
    }
    if (!target) {
      await shot("noform");
      return { status: "skipped", note: "問い合わせフォームが見つからない (メール・電話・LINEのみ等)" };
    }
    if (target.info.isComment) return { status: "skipped", note: "ブログのコメント欄 (問い合わせフォームではない)" };
    const purposeText = `${target.info.headings} ${target.info.formText.slice(0, 400)}`;
    if (NOT_CONTACT_PURPOSE.test(target.info.headings) && !CONTACT_WORD.test(purposeText)) {
      return { status: "skipped", note: `問い合わせ以外が目的のフォーム (${target.info.headings.slice(0, 60)})` };
    }
    if (hasVisibleCaptcha(page)) {
      await shot("captcha");
      return { status: "skipped", note: "CAPTCHA (画像認証) あり" };
    }

    const r = await target.fr.evaluate(fillForm, { P: SENDER, subject: item.subject, body: item.body });
    if (r.error) return { status: "skipped", note: "フォームに入力できない" };
    if (!r.bodyDone) return { status: "skipped", note: "本文欄が見つからない" };
    if (r.miss.length) {
      await shot("miss");
      return { status: "skipped", note: `正しく答えられない必須項目あり: ${[...new Set(r.miss)].join(", ").slice(0, 200)}` };
    }
    await shot("filled");
    if (DRY) return { status: "dry", note: `入力OK (${Object.values(r.filled).join(",")})` };

    // 送信 → (確認画面なら) もう一度送信 → 完了表示を確かめる
    const beforeOk = count(SUCCESS, before);
    const beforeErr = count(INPUT_ERROR, before);
    let clicked = await target.fr.evaluate(clickSubmit, false);
    if (clicked === "no-button") return { status: "skipped", note: "送信ボタンが見つからない" };
    await settle(page);
    const beforeRej = count(REJECTED, before);
    const judge = async () => {
      const t = await pageText(page);
      if (count(SUCCESS, t) > beforeOk) return { status: "sent", note: `完了表示を確認 (${clicked})` };
      if (count(REJECTED, t) > beforeRej) {
        const m = t.match(new RegExp(`.{0,20}(${REJECTED.source}).{0,40}`, "i"));
        return { status: "skipped", note: `サイト側で送信を拒否された (届いていない。手動送信の候補): ${(m ? m[0] : "").replace(/\s+/g, " ").slice(0, 100)}` };
      }
      if (count(INPUT_ERROR, t) > beforeErr) {
        const m = t.match(new RegExp(`.{0,30}(${INPUT_ERROR.source}).{0,30}`, "i"));
        return { status: "failed", note: `入力エラー (届いていない): ${(m ? m[0] : "").replace(/\s+/g, " ").slice(0, 120)}` };
      }
      if (hasVisibleCaptcha(page)) return { status: "failed", note: "送信後に画像認証が出た (届いていない)" };
      return null;
    };
    for (let step = 0; step < 3; step++) {
      const r = await judge();
      if (r) {
        await shot(r.status);
        return r;
      }
      // 確認画面なら「送信」を押す (元のフォームが残っている間は押し直さない)
      let c = "no-button";
      for (const fr of page.frames()) {
        c = await fr.evaluate(clickSubmit, true).catch(() => "no-button");
        if (c !== "no-button") break;
      }
      if (c === "form-still-visible") {
        // 同じページで送信処理中 (Contact Form 7 等)。結果が出るまで最大15秒待つ
        for (let i = 0; i < 5; i++) {
          await page.waitForTimeout(3000);
          const r2 = await judge();
          if (r2) {
            await shot(r2.status);
            return r2;
          }
        }
        break;
      }
      if (c === "no-button") break;
      clicked = c;
      await settle(page);
    }
    const last = await judge();
    if (last) {
      await shot(last.status);
      return last;
    }
    await shot("unknown");
    const tail = (await pageText(page)).replace(/\s+/g, " ").slice(0, 80);
    return { status: "failed", note: `送信ボタンは押したが完了表示を確認できない (二重送信を避けるため再送しない)。画面: ${tail}` };
  } finally {
    await page.close().catch(() => undefined);
  }
}

// ------------------------------------------------------------------
async function main() {
  if (!SECRET) throw new Error("CRON_SECRET が未設定です");
  mkdirSync(OUT_DIR, { recursive: true });
  const { items } = await api("GET", `/internal/sales/forms?limit=${LIMIT}`);
  log(`未処理のフォーム宛て: ${items.length}件${DRY ? " (DRY: 送信しない)" : ""}`);
  if (!items.length) return;

  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined });
  // 「HeadlessChrome」を名乗ると門前払い (403) するサイトがあるため、通常の Chrome と同じ名乗りにする
  const ua = (await browser.newPage().then(async (p) => { const u = await p.evaluate(() => navigator.userAgent); await p.close(); return u; })).replace("HeadlessChrome", "Chrome");
  const context = await browser.newContext({ locale: "ja-JP", timezoneId: "Asia/Tokyo", viewport: { width: 1280, height: 900 }, userAgent: ua, ignoreHTTPSErrors: true });
  context.on("dialog", (d) => d.accept().catch(() => undefined)); // 「送信してよろしいですか？」の確認ダイアログ
  const started = Date.now();
  const rows = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (Date.now() - started > RUN_BUDGET_MS) {
      log("時間切れのため残りは次回に回します");
      break;
    }
    let result;
    try {
      result = await Promise.race([
        processItem(context, item, i),
        new Promise((_, rej) => setTimeout(() => rej(new Error("1件の処理時間の上限を超えた")), ITEM_BUDGET_MS)),
      ]);
    } catch (e) {
      result = { status: "failed", note: `処理エラー: ${String(e && e.message ? e.message : e).slice(0, 150)}` };
    }
    log(`[${i + 1}/${items.length}] ${result.status.padEnd(7)} ${item.company} — ${result.note}`);
    rows.push({ ...item, ...result });
    if (!DRY && result.status !== "dry") {
      await api("POST", "/internal/sales/forms", { id: item.id, status: result.status, note: result.note }).catch((e) => log("書き戻し失敗:", e.message));
    }
  }
  await browser.close();

  const tally = rows.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
  log("集計:", JSON.stringify(tally));
  writeFileSync(join(OUT_DIR, "summary.tsv"), ["法人名\tURL\t結果\t備考", ...rows.map((r) => [r.company, r.url, r.status, r.note].join("\t"))].join("\n"));
  if (process.env.GITHUB_STEP_SUMMARY) {
    const md = [
      `### 法人営業 フォーム自動送信${DRY ? " (DRY)" : ""}`,
      "",
      `送信 ${tally.sent || 0} / 見送り ${tally.skipped || 0} / 失敗 ${tally.failed || 0}${DRY ? ` / 入力OK ${tally.dry || 0}` : ""}`,
      "",
      "| 法人名 | 結果 | 備考 |",
      "|---|---|---|",
      ...rows.map((r) => `| ${r.company.replace(/\|/g, "／")} | ${r.status} | ${r.note.replace(/\|/g, "／")} |`),
    ].join("\n");
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
