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
const ITEM_BUDGET_MS = 120 * 1000;

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
      const pick = grp.find((r) => OK.test(lab(r) + " " + r.value));
      if (pick) {
        pick.click();
        filled[key] = t + ":" + pick.value;
      } else if (grpReq) miss.push(t + ":" + (e.name || "") + " [" + grp.map((r) => r.value).slice(0, 6).join("/") + "]");
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
    if (t === "email" || /mail|メール/.test(l)) {
      put("email", P.email);
      continue;
    }
    if (t === "tel" || /tel|phone|電話|携帯|fax/.test(l)) {
      if (!/fax/.test(l)) tels.push({ e, req });
      continue;
    }
    if (t === "url" || /url|ホームページ|website|サイト/.test(l)) {
      put("url", P.url);
      continue;
    }
    if (/カナ|かな|フリガナ|ふりがな|kana|furigana|ruby/.test(l)) {
      const hira = /ふりがな|ひらがな/.test(L);
      if (/姓|せい|sei|last|family/.test(l)) put("seiKana", hira ? P.seiHira : P.seiKana);
      else if (/(^|[^氏])名(?!前)|めい|mei|first|given/.test(L)) put("meiKana", hira ? P.meiHira : P.meiKana);
      else put("kana", hira ? P.hira : P.kana);
      continue;
    }
    if (/会社|法人|団体|組織|所属|company|organization|corp|貴社|御社|屋号|店名|学校名|教室名/.test(l)) {
      put("company", P.company);
      continue;
    }
    if (isSubject(l)) {
      put("subject", subject);
      continue;
    }
    if (/姓|last.?name|family|\bsei\b/.test(l) && !/氏名/.test(l)) {
      put("sei", P.sei);
      continue;
    }
    if (/first.?name|given|\bmei\b/.test(l) || /^\s*名\s*$/.test(L.split(" ").pop())) {
      put("mei", P.mei);
      continue;
    }
    if (/名前|氏名|担当|name|お名|ご芳名/.test(l)) {
      put("name", hasCo ? P.name : `${P.company} ${P.name}`);
      continue;
    }
    if (req && !e.value) miss.push((t || e.tagName) + ":" + L.slice(0, 40));
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
    const res = await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => ({ err: e }));
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
    for (let step = 0; step < 2; step++) {
      const after = await pageText(page);
      if (count(SUCCESS, after) > beforeOk) {
        await shot("sent");
        return { status: "sent", note: `完了表示を確認 (${clicked})` };
      }
      if (count(INPUT_ERROR, after) > beforeErr) {
        await shot("error");
        const m = after.match(new RegExp(`.{0,30}(${INPUT_ERROR.source}).{0,30}`, "i"));
        return { status: "failed", note: `入力エラー: ${(m ? m[0] : "").replace(/\s+/g, " ").slice(0, 120)}` };
      }
      if (hasVisibleCaptcha(page)) {
        await shot("captcha2");
        return { status: "failed", note: "送信後に画像認証が出た" };
      }
      // 確認画面: 確認ボタン/送信ボタンを探して押す
      let c = "no-button";
      for (const fr of page.frames()) {
        c = await fr.evaluate(clickSubmit, true).catch(() => "no-button");
        if (c !== "no-button") break;
      }
      if (c === "no-button") break;
      clicked = c;
      await settle(page);
    }
    const last = await pageText(page);
    if (count(SUCCESS, last) > beforeOk) {
      await shot("sent");
      return { status: "sent", note: `完了表示を確認 (${clicked})` };
    }
    await shot("unknown");
    return { status: "failed", note: "送信ボタンは押したが完了表示を確認できない (二重送信を避けるため再送しない)" };
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
  const context = await browser.newContext({ locale: "ja-JP", timezoneId: "Asia/Tokyo", viewport: { width: 1280, height: 900 } });
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
