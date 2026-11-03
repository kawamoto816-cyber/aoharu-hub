import type { AxisA } from "./types";

// 軸 A 概念の系譜。上から下へ小1→高校、縦の列は「ひとつの考え方の育ち方」。
// 点線の橋 (bridge) は、教科をこえて同じ考え方が使われるところ。

export const AXIS_A: AxisA = {
  lines: [
    { id: "a1", mark: "①", name: "文のしくみ", col: 0 },
    { id: "a2", mark: "②", name: "位と桁", col: 2 },
    { id: "a3", mark: "③", name: "分ける", col: 3 },
    { id: "a4", mark: "④", name: "粒で数える", col: 5 },
    { id: "a5", mark: "⑤", name: "ともなって変わる", col: 6 },
    { id: "a6", mark: "⑥", name: "動きをとらえる", col: 7 },
    { id: "a7", mark: "⑦", name: "力とエネルギー", col: 8 },
  ],
  nodes: [
    // ① 文のしくみ
    { unit: "e-japanese-2-shugo", short: "主語・述語", line: "a1" },
    { unit: "e-japanese-4-bun-kumitate", short: "文の組立て", line: "a1" },
    { unit: "j-ja-1-bunpo-seibun", short: "文の成分", line: "a1" },
    { unit: "j-ja-2-bunpo-yogen", short: "用言活用", line: "a1" },
    { unit: "j-en-2-bunkei", short: "文型", line: "a1", col: 1 },
    { unit: "h-eng-gram-bunkei", short: "英・文型", line: "a1" },
    // ② 位と桁
    { unit: "e-math-1-10made", short: "10まで", line: "a2" },
    { unit: "e-math-3-shosu", short: "小数", line: "a2" },
    { unit: "e-math-5-seisu-shosu", short: "整数と小数", line: "a2", label: "l" },
    { unit: "h-math-a-nshin", short: "n進法", line: "a2" },
    { unit: "h-info-1-digital", short: "2進数", line: "a2", col: 1 },
    { unit: "h-math-2-shisu", short: "指数", line: "a2" },
    { unit: "h-math-2-taisu", short: "対数", line: "a2", col: 3 },
    // ③ 分ける
    { unit: "e-math-2-bunsu", short: "分数", line: "a3" },
    { unit: "e-math-5-wariai", short: "割合", line: "a3" },
    { unit: "e-math-6-hi", short: "比", line: "a3", label: "l" },
    { unit: "e-math-6-narabekata", short: "並べ方", line: "a3", col: 4 },
    { unit: "j-math-2-kakuritsu", short: "確率", line: "a3" },
    { unit: "h-math-a-kakuritsu", short: "確率(A)", line: "a3" },
    // ④ 粒で数える
    { unit: "e-science-4-sugata", short: "水のすがた", line: "a4", label: "l" },
    { unit: "j-sci-1-jotai", short: "状態変化", line: "a4", label: "l" },
    { unit: "j-sci-2-shitsuryo", short: "質量保存", line: "a4", label: "l" },
    { unit: "h-sci-chemb-mol", short: "物質量", line: "a4" },
    // ⑤ ともなって変わる
    { unit: "e-math-4-kawarikata", short: "変わり方", line: "a5", label: "r" },
    { unit: "e-math-6-hirei-hanpirei", short: "反比例", line: "a5" },
    { unit: "j-math-1-hirei", short: "比例(中)", line: "a5" },
    { unit: "j-math-2-ichiji-kansu", short: "一次関数", line: "a5" },
    { unit: "j-math-3-kansu-ax2", short: "y=ax²", line: "a5" },
    { unit: "h-math-1-nijikansu", short: "二次関数", line: "a5" },
    { unit: "h-math-2-bibun", short: "微分", line: "a5" },
    // ⑥ 動きをとらえる
    { unit: "e-math-5-hayasa", short: "速さ", line: "a6" },
    { unit: "j-sci-3-undo", short: "運動(中)", line: "a6" },
    { unit: "h-sci-phyb-undo", short: "運動(高)", line: "a6" },
    // ⑦ 力とエネルギー
    { unit: "e-science-6-teko", short: "てこ", line: "a7" },
    { unit: "j-sci-3-shigoto", short: "仕事", line: "a7", label: "r" },
    { unit: "h-sci-phyb-energy", short: "エネルギー", line: "a7", label: "t" },
  ],
  edges: [
    // ①
    { from: "e-japanese-2-shugo", to: "e-japanese-4-bun-kumitate", line: "a1", kind: "line", why: "主語・述語に修飾語を加えて、文の組み立てを見る" },
    { from: "e-japanese-4-bun-kumitate", to: "j-ja-1-bunpo-seibun", line: "a1", kind: "line", why: "文を文節に分け、主語・述語・修飾語などの成分として見る" },
    { from: "j-ja-1-bunpo-seibun", to: "j-ja-2-bunpo-yogen", line: "a1", kind: "line", why: "述語になる動詞・形容詞の形の変わり方を見る" },
    { from: "j-ja-1-bunpo-seibun", to: "j-en-2-bunkei", line: "a1", kind: "bridge", why: "主語・述語・目的語の見方で、英語の S・V・O をとらえる" },
    { from: "j-en-2-bunkei", to: "h-eng-gram-bunkei", line: "a1", kind: "line", why: "SVOO・SVOC をふくむ5つの文型に整理する" },
    // ②
    { from: "e-math-1-10made", to: "e-math-3-shosu", line: "a2", kind: "line", why: "10集まると次の位に上がるしくみを、1より小さい位にも広げる" },
    { from: "e-math-3-shosu", to: "e-math-5-seisu-shosu", line: "a2", kind: "line", why: "10倍・10分の1で位が1つずつ移る、十進法のしくみ" },
    { from: "e-math-5-seisu-shosu", to: "h-math-a-nshin", line: "a2", kind: "line", why: "10ではなく2や5で位が上がる数の表し方" },
    { from: "h-math-a-nshin", to: "h-info-1-digital", line: "a2", kind: "bridge", why: "コンピュータは数も文字も2進法で表す" },
    { from: "h-math-a-nshin", to: "h-math-2-shisu", line: "a2", kind: "line", why: "位の重み 10²・10³ を、指数で表す" },
    { from: "h-math-2-shisu", to: "h-math-2-taisu", line: "a2", kind: "line", why: "何乗すればその数になるかを、対数で表す" },
    // ③
    { from: "e-math-2-bunsu", to: "e-math-5-wariai", line: "a3", kind: "line", why: "全体を1として、部分の大きさを表す" },
    { from: "e-math-5-wariai", to: "e-math-6-hi", line: "a3", kind: "line", why: "2つの量の割合を a:b の形で表す" },
    { from: "e-math-6-hi", to: "j-math-2-kakuritsu", line: "a3", kind: "line", why: "起こりやすさを、全体に対する割合で表す" },
    { from: "e-math-6-narabekata", to: "j-math-2-kakuritsu", line: "a3", kind: "line", why: "すべての場合を数えて、確率を求める" },
    { from: "j-math-2-kakuritsu", to: "h-math-a-kakuritsu", line: "a3", kind: "line", why: "場合の数をもとに、独立な試行や反復試行へ" },
    // ④
    { from: "e-science-4-sugata", to: "j-sci-1-jotai", line: "a4", kind: "line", why: "氷・水・水蒸気の変化を、粒子の動きで説明する" },
    { from: "j-sci-1-jotai", to: "j-sci-2-shitsuryo", line: "a4", kind: "line", why: "化学変化の前後で、全体の質量は変わらない" },
    { from: "j-sci-2-shitsuryo", to: "h-sci-chemb-mol", line: "a4", kind: "line", why: "決まった質量の比で反応することを、粒の数 (mol) で表す" },
    { from: "e-math-6-hi", to: "h-sci-chemb-mol", line: "a4", kind: "bridge", why: "物質は決まった比で反応する。比で量をそろえる" },
    // ⑤
    { from: "e-math-4-kawarikata", to: "e-math-6-hirei-hanpirei", line: "a5", kind: "line", why: "ともなって変わる2つの量を、きまりで表す" },
    { from: "e-math-6-hirei-hanpirei", to: "j-math-1-hirei", line: "a5", kind: "line", why: "負の数まで広げ、y=ax・y=a/x の式とグラフで表す" },
    { from: "j-math-1-hirei", to: "j-math-2-ichiji-kansu", line: "a5", kind: "line", why: "y=ax+b。変化の割合が一定の関数" },
    { from: "j-math-2-ichiji-kansu", to: "j-math-3-kansu-ax2", line: "a5", kind: "line", why: "変化の割合が一定でない関数へ" },
    { from: "j-math-3-kansu-ax2", to: "h-math-1-nijikansu", line: "a5", kind: "line", why: "y=ax²+bx+c。グラフの平行移動で見る" },
    { from: "h-math-1-nijikansu", to: "h-math-2-bibun", line: "a5", kind: "line", why: "接線の傾きで、その点での変化の割合を見る" },
    // ⑥
    { from: "e-math-5-hayasa", to: "j-sci-3-undo", line: "a6", kind: "bridge", why: "速さ＝道のり÷時間を、物体の運動の記録で使う" },
    { from: "j-sci-3-undo", to: "h-sci-phyb-undo", line: "a6", kind: "line", why: "速さの変わり方を、加速度で表す" },
    { from: "h-sci-phyb-undo", to: "h-math-2-bibun", line: "a6", kind: "bridge", why: "速度は、位置を時間で微分したもの" },
    // ⑦
    { from: "e-science-6-teko", to: "j-sci-3-shigoto", line: "a7", kind: "line", why: "てこで力を小さくしても、仕事 (力×距離) は変わらない" },
    { from: "j-sci-3-shigoto", to: "h-sci-phyb-energy", line: "a7", kind: "line", why: "仕事をする能力を、エネルギーとして量で表す" },
    { from: "e-science-6-teko", to: "e-math-6-hirei-hanpirei", line: "a7", kind: "bridge", why: "つり合うとき、おもりの重さと支点からの距離は反比例する" },
  ],
};
