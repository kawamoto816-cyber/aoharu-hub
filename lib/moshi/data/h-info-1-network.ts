// 情報Ⅰ「ネットワークとインターネット」の単元模試 (A: 数値を入れかえる生成型 ＋ B: 問題プール9問からシードで4問)。問題はすべてオリジナル。
// 検算: IPv4 の1つの区切り (0〜255) の8ビット表記は JS の2進変換を正解 (term) に。アドレスの数は 2^n を、転送時間は
//   データ量(MB)×8÷(通信速度(Mbps)×伝送効率) を calc に (割り切れる組だけを使う) (scripts/check-moshi.ts がシード1〜100で照合する)。
// プールは基本4・標準3・発展2。1回に基本2・標準1・発展1 (15×2＋17＋21＝68点) と A の 15＋17点で 100点。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-info-1-network";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "ネットワークのつながり方");
const S2 = L(2, "回線交換とパケット交換");
const S3 = L(3, "約束ごとを4つの層に分ける（TCP/IP）");
const S4 = L(4, "IPアドレスとDNS");
const S5 = L(5, "HTTPSと暗号のしくみ");

function ip(r: Rng): QuestionBody {
  if (r.bool(0.35)) {
    const n = r.pick([8, 16, 24, 32]);
    const label = n === 32 ? "IPv4 のアドレス全体（32ビット）" : `${n}ビット`;
    const v = 2 ** n;
    return {
      prompt: `${label}で区別できるアドレスは何通りですか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(v)], unit: "通り", calc: Array(n / 8).fill("256").join("*") },
      point: "nビットで 2ⁿ 通り（8ビットごとに 256倍）",
      steps: [{ title: "2の累乗", body: `2^${n}＝${Array(n / 8).fill("256").join("×")}＝{{${v}}} 通り。${n === 32 ? "約43億通りで足りなくなり、128ビットの IPv6 への移行が進んでいます。" : ""}`, back: [S4] }],
    };
  }
  const a = [192, 168, r.int(0, 255), r.int(1, 254)];
  const k = r.int(2, 3);
  const bin = a[k].toString(2).padStart(8, "0");
  return {
    prompt: `IPv4 アドレス ${a.join(".")} の、左から ${k + 1}番目の区切りの数 ${a[k]} を8ビットの2進数で表しなさい。`,
    answer: { kind: "term", accept: [bin] },
    point: "IPv4 は 8ビット×4＝32ビット。区切りは 0〜255",
    steps: [
      { title: "2進数にする", body: `${a[k]} を2で割り続け、余りを下から並べると ${a[k].toString(2)}。`, back: [S4] },
      { title: "8けたにそろえる", body: bin.startsWith("0") ? `左に 0 を足して8けたにすると {{${bin}}}。` : `もう8けたあるので、そのまま {{${bin}}}。`, trap: "8ビットなので、けたが足りなければ左に 0 を足す。" },
    ],
  };
}

function tenso(r: Rng): QuestionBody {
  for (;;) {
    const mb = r.pick([10, 20, 25, 50, 100, 200, 250, 500, 600, 750, 1000]);
    const mbps = r.pick([10, 20, 40, 50, 100, 200]);
    const eff = r.pick([100, 100, 80, 50]);
    const t = (mb * 8 * 100) / (mbps * eff);
    if (!Number.isInteger(t) || t < 1) continue;
    return {
      prompt: `${mb}MB のファイルを、通信速度 ${mbps}Mbps の回線で送る。${eff === 100 ? "伝送効率は 100% とする" : `伝送効率（実際に使える割合）は ${eff}% とする`}とき、かかる時間は何秒ですか。ただし 1B＝8ビットとし、M はどちらも同じ大きさ（10⁶）とします。`,
      answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "秒", calc: `${mb}*8/(${mbps}*${eff}/100)` },
      point: "MB は ×8 でメガビットに。bps は1秒あたりのビット数",
      steps: [
        { title: "ビットに直す", body: `${mb}MB＝${mb}×8＝${mb * 8} M ビット。`, back: [S2] },
        { title: "実際の速さ", body: eff === 100 ? `1秒に ${mbps} M ビット送れます。` : `${mbps}×${eff / 100}＝${(mbps * eff) / 100} M ビット／秒。` },
        { title: "時間", body: `${mb * 8}÷${(mbps * eff) / 100}＝{{${t}}} 秒。`, trap: "B（バイト）と b（ビット）を取りちがえない。×8 を忘れない。" },
      ],
    };
  }
}

const P = { 1: 15, 2: 17, 3: 21 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("dns", 1),
    prompt: "www.example.jp のようなドメイン名を、IP アドレスに変換するしくみを何といいますか。",
    answer: {
      kind: "choice",
      options: ["DNS", "HTTPS", "TCP", "LAN"],
      correct: 0,
      why: ["正しい。ドメイン名と IP アドレスを対応させる。", "HTTPS は、ウェブの通信を暗号化するプロトコル。", "TCP は、データを確実に届けるトランスポート層のプロトコル。", "LAN は、限られた範囲の機器を結ぶネットワーク。"],
    },
    point: "DNS＝ドメイン名 → IP アドレス",
    steps: [{ title: "名前と番号", body: "人は覚えやすいドメイン名を使い、{{DNS}}が IP アドレスに変換します。", back: [S4] }],
  },
  {
    ...base("router", 1),
    prompt: "ネットワークの境目に置かれ、宛先を見て次にどこへ送るかを決めながらデータを中継する機器を何といいますか。",
    answer: { kind: "term", accept: ["ルータ", "ルーター", "るーた", "るーたー"] },
    point: "宛先を見て道を選ぶ＝ルータ",
    steps: [{ title: "中継のしかた", body: "{{ルータ}}は宛先の IP アドレスを見て、次に送る先を決めます。", back: [S1] }],
  },
  {
    ...base("lan-wan", 1),
    prompt: "学校の中のコンピュータどうしを結ぶ、限られた範囲のネットワークを何といいますか。",
    answer: {
      kind: "choice",
      options: ["LAN", "WAN", "DNS", "IPv6"],
      correct: 0,
      why: ["正しい。建物の中など限られた範囲のネットワーク。", "WAN は、離れた拠点どうしを通信事業者の回線で結ぶネットワーク。", "DNS はドメイン名を IP アドレスに変換するしくみ。", "IPv6 は 128ビットの IP アドレスの方式。"],
    },
    point: "限られた範囲＝LAN、離れた拠点どうし＝WAN",
    steps: [{ title: "範囲で分ける", body: "限られた範囲は{{LAN}}、離れた拠点どうしは{{WAN}}、ネットワークどうしを世界中でつないだものがインターネット。", back: [S1] }],
  },
  {
    ...base("ipv6", 1),
    prompt: "IPv6 のアドレスは何ビットですか。",
    answer: {
      kind: "choice",
      options: ["128ビット", "32ビット", "64ビット", "8ビット"],
      correct: 0,
      why: ["正しい。IPv4 の 32ビットでは足りなくなったため、128ビットに広げた。", "32ビットは IPv4。", "64ビットではない。", "8ビットは IPv4 の1つの区切りの大きさ。"],
    },
    point: "IPv4＝32ビット、IPv6＝128ビット",
    steps: [{ title: "2つの方式", body: "IPv4 は {{32ビット}}（約43億通り）、IPv6 は {{128ビット}}。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("packet", 2, "思考・判断・表現"),
    prompt: "インターネットで使われるパケット交換方式について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["1本の回線を多くの通信で共有でき、経路が混んだりこわれたりしても別の経路で届けられる", "通信の間、1本の経路を専用に確保し続ける", "パケットは必ず送った順に、同じ経路で届く", "データを分けずに、まとめて1回で送る"],
      correct: 0,
      why: ["正しい。データを小さなパケットに分けて送るので、回線を共有でき、経路も選べる。", "これは固定電話などの回線交換方式。", "経路も届く順もばらばらになりうる。受け取った側が番号で並べ直す。", "パケット交換は、データを小さなかたまり（パケット）に分けて送る。"],
    },
    point: "分けて送る → 回線を共有、経路も選べる",
    steps: [{ title: "回線交換とのちがい", body: "{{回線交換}}は経路を専用に確保、{{パケット交換}}は小さなかたまりに分けて回線を共有します。", back: [S2] }],
  },
  {
    ...base("tcp", 2),
    prompt: "TCP/IP の4つの層のうち、届かなかったパケットを送り直したり、番号順に並べ直したりして、データを確実に届ける役割をもつのはどの層のどのプロトコルですか。",
    answer: {
      kind: "choice",
      options: ["トランスポート層の TCP", "インターネット層の IP", "アプリケーション層の HTTP", "ネットワークインタフェース層のイーサネット"],
      correct: 0,
      why: ["正しい。TCP が確実に届けるしくみを受けもつ。", "IP は宛先の IP アドレスまでパケットを届ける（経路を選ぶ）役割。", "HTTP はウェブのデータのやりとりの約束ごと。", "イーサネットは、同じネットワークの中の機器どうしで信号を送る役割。"],
    },
    point: "確実に届ける＝トランスポート層の TCP",
    steps: [{ title: "4つの層", body: "アプリケーション層（HTTP など）・{{トランスポート層（TCP）}}・インターネット層（IP）・ネットワークインタフェース層。", back: [S3] }],
  },
  {
    ...base("layer-merit", 2, "思考・判断・表現"),
    prompt: "通信の約束ごとを層に分けておくことの利点として、最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["有線から無線に変えても、上の層の約束ごとはそのまま使える", "層が多いほど、データ量が小さくなる", "層に分けると、暗号化しなくても盗聴されない", "層に分けると、IP アドレスが不要になる"],
      correct: 0,
      why: ["正しい。それぞれの層が自分の役割だけを受けもつので、一部を取りかえても全体を作り直さずにすむ。", "各層で情報をつけ加えるので、データ量はむしろふえる。", "盗聴を防ぐには暗号化（HTTPS など）が必要。", "IP アドレスはインターネット層で使われる。"],
    },
    point: "役割を分ける → 一部を取りかえやすい",
    steps: [{ title: "層の考え方", body: "送る側は上の層から情報をつけ、受ける側は下の層から外します。{{層ごとに独立}}しているので、一部を変えてもほかはそのまま使えます。", back: [S3] }],
  },
  // ---- 発展 ----
  {
    ...base("https", 3, "思考・判断・表現"),
    prompt: "HTTPS の通信で、公開鍵暗号方式と共通鍵暗号方式を組み合わせて使う理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["共通鍵を安全に受けわたすのに公開鍵暗号を使い、処理の速い共通鍵暗号で大量のデータを暗号化するため", "公開鍵暗号のほうが処理が速いので、すべてのデータを公開鍵暗号で送るため", "共通鍵暗号は鍵を受けわたす必要がないため", "2回暗号化すると、データ量が半分になるため"],
      correct: 0,
      why: ["正しい。鍵の受けわたしの弱点を公開鍵暗号で補い、暗号化の処理は速い共通鍵暗号で行う。", "公開鍵暗号は一般に処理に時間がかかる。", "共通鍵暗号は、同じ鍵を相手と共有しなければならないのが弱点。", "暗号化でデータ量が半分になることはない。"],
    },
    point: "鍵の受けわたし＝公開鍵、データの暗号化＝共通鍵",
    steps: [{ title: "それぞれの長所", body: "共通鍵暗号は{{速い}}が鍵の受けわたしが難しい。公開鍵暗号は{{受けわたしが安全}}だが遅い。組み合わせて使います。", back: [S5] }],
  },
  {
    ...base("signature", 3, "思考・判断・表現"),
    prompt: "通信相手から届いたデータについて、デジタル署名を使って確かめられることの組み合わせとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["送り主が本物であることと、途中で改ざんされていないこと", "データが盗聴されていないことと、通信速度", "送り主の IP アドレスと、ドメイン名", "パケットの届いた順番と、経路"],
      correct: 0,
      why: ["正しい。送り主の秘密鍵で作った署名を公開鍵で確かめ、なりすましと改ざんを見つける。", "盗聴を防ぐのは暗号化。通信速度は署名と関係がない。", "IP アドレスとドメイン名の対応は DNS の役割。", "パケットの順番は TCP が扱う。"],
    },
    point: "デジタル署名 → なりすまし・改ざんを見つける",
    steps: [{ title: "3つの危険と対策", body: "盗聴 → {{暗号化}}、なりすまし・改ざん → {{デジタル署名}}。", back: [S5] }],
  },
];

export const H_INFO_1_NETWORK_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "情報Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "アドレスと通信の速さ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "ip", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: ip },
        { id: "tenso", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: tenso },
      ],
    },
    { title: "インターネットのしくみ", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
  ],
};
