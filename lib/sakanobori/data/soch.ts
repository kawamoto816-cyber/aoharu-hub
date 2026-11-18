import type { PrereqUnit } from "../types";

// 高校の地理・歴史・公民（地理総合/地理探究・歴史総合/日本史探究/世界史探究・公共/倫理/政治経済・吉田松陰講座）
// 系統: 中学（j-soc-…）→ 地理総合 → 地理探究、中学 → 歴史総合 → 日本史探究、中学 → 世界史探究（時代順）、
//       中学公民 → 公共 → 政治経済・倫理。歴史は公民を前提にしない（輪を防ぐ）。
export const PREREQ_SOCH: PrereqUnit[] = [
  // ───────── 公共 ─────────
  {
    unit: "h-civ-kokyo-seinen",
    needs: [{ unit: "j-soc-civ-gendai-shakai", why: "社会の変化の中で自分をどう生きるかを考える出発点" }],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-seinen", why: "ルソーとエリクソンの用語を人と結びつけて覚えていない" },
      { i: 1, root: "h-civ-kokyo-seinen", why: "防衛機制の合理化を日常語の意味で読んでいる" },
      { i: 2, root: "h-civ-kokyo-seinen", why: "防衛機制それぞれの向きのちがいを区別できていない" },
    ],
  },
  {
    unit: "h-civ-kokyo-shiso",
    needs: [{ unit: "j-soc-civ-goi", why: "効率と公正の見方が、功利主義と義務論の入り口になる" }],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-shiso", why: "功利主義が「社会全体」の幸福を数えることをつかめていない" },
      { i: 1, root: "h-civ-kokyo-shiso", why: "結果で判断するか動機で判断するかの対比があいまい" },
      { i: 2, root: "j-soc-civ-goi", why: "公正には「格差の是正」もふくむという見方が弱い" },
    ],
  },
  {
    unit: "h-civ-kokyo-kenpo",
    needs: [
      { unit: "j-soc-civ-kenpo", why: "日本国憲法の三つの基本原理を中学で学んでいる" },
      { unit: "j-soc-hist-kaikoku", why: "ロックやルソーの思想と市民革命の流れを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kenpo", why: "憲法が国の権力をしばる立憲主義の考えが身についていない" },
      { i: 1, root: "j-soc-civ-kenpo", why: "改正の発議の条件「総議員の3分の2」を正確に覚えていない" },
      { i: 2, root: "h-civ-kokyo-kenpo", why: "ロックとルソーの社会契約説のちがいを比べていない" },
    ],
  },
  {
    unit: "h-civ-kokyo-jinken",
    needs: [
      { unit: "j-soc-civ-jinken", why: "自由権・平等権・社会権の区別を中学で学んでいる" },
      { unit: "h-civ-kokyo-kenpo", why: "人権は国家権力から個人を守るという考えが土台" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-jinken", why: "社会権の始まりがワイマール憲法だと結びついていない" },
      { i: 1, root: "h-civ-kokyo-jinken", why: "自由権の三分類（精神・身体・経済）があいまい" },
      { i: 2, root: "j-soc-civ-jinken", why: "新しい人権が条文にない権利だという点が弱い" },
    ],
  },
  {
    unit: "h-civ-kokyo-tosei",
    needs: [
      { unit: "j-soc-civ-kokkai", why: "国会の地位と衆議院の優越を中学で学んでいる" },
      { unit: "j-soc-civ-naikaku", why: "議院内閣制と内閣不信任のしくみが前提" },
      { unit: "j-soc-civ-saibansho", why: "三権分立・三審制・違憲審査を中学で学んでいる" },
      { unit: "h-civ-kokyo-kenpo", why: "権力分立が憲法の考え方から生まれたことを知る" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-naikaku", why: "内閣不信任決議が衆議院だけの権限だと押さえていない" },
      { i: 1, root: "j-soc-civ-saibansho", why: "違憲審査権はすべての裁判所がもつと覚えていない" },
      { i: 2, root: "j-soc-civ-saibansho", why: "三審制の控訴と上告の区別があいまい" },
    ],
  },
  {
    unit: "h-civ-kokyo-chiho",
    needs: [
      { unit: "j-soc-civ-chiho", why: "首長・議会・直接請求のしくみを中学で学んでいる" },
      { unit: "h-civ-kokyo-tosei", why: "国の議院内閣制と比べて二元代表制を理解する" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-chiho", why: "首長も住民が直接選ぶ二元代表制をつかめていない" },
      { i: 1, root: "j-soc-civ-chiho", why: "直接請求の請求先と議決する機関を区別していない" },
      { i: 2, root: "j-soc-civ-chiho", why: "地方交付税と国庫支出金の使い道のちがいがあいまい" },
      { i: 3, root: "h-civ-kokyo-chiho", why: "条例の請求は議会が決める入り口だと理解していない" },
    ],
  },
  {
    unit: "h-civ-kokyo-senkyo",
    needs: [
      { unit: "j-soc-civ-senkyo", why: "選挙の4原則と小選挙区・比例代表を中学で学んでいる" },
      { unit: "e-math-5-wariai", why: "得票率や一票の格差を割合で比べる力が要る" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-senkyo", why: "普通選挙の「普通」の意味を中学で押さえていない" },
      { i: 1, root: "j-soc-civ-senkyo", why: "死票の多い制度と少ない制度の区別があいまい" },
      { i: 2, root: "h-civ-kokyo-senkyo", why: "ドント式の「わって商を比べる」手順が身についていない" },
    ],
  },
  {
    unit: "h-civ-kokyo-keiyaku",
    needs: [
      { unit: "j-soc-civ-shohi", why: "契約の成立とクーリング・オフを中学で学んでいる" },
      { unit: "h-civ-kokyo-jinken", why: "私法の原則と人権の考え方を結びつけて考える" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-shohi", why: "契約は合意だけで成立することが身についていない" },
      { i: 1, root: "j-soc-civ-shohi", why: "クーリング・オフの対象外の取引を覚えていない" },
      { i: 2, root: "h-civ-kokyo-keiyaku", why: "成年年齢と飲酒などの年齢を区別していない" },
      { i: 3, root: "j-soc-civ-shohi", why: "製造物責任法が「欠陥」を示せばよい法だと知らない" },
    ],
  },
  {
    unit: "h-civ-kokyo-shijo",
    needs: [
      { unit: "j-soc-civ-shijo", why: "需要・供給と価格の決まり方を中学で学んでいる" },
      { unit: "j-math-2-ichiji-kansu", why: "右下がり・右上がりのグラフを読む力が要る" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-shijo", why: "曲線上の移動と曲線のシフトを区別できていない" },
      { i: 1, root: "h-civ-kokyo-shijo", why: "公共財を「つくった人」でなく性質で見ていない" },
      { i: 2, root: "j-soc-civ-shijo", why: "寡占で価格が下がりにくいことを押さえていない" },
    ],
  },
  {
    unit: "h-civ-kokyo-kinyu",
    needs: [
      { unit: "j-soc-civ-kinyu", why: "直接金融・間接金融と日銀の役割を中学で学んでいる" },
      { unit: "j-soc-civ-zaisei", why: "税と国債で国が収入を得るしくみが前提" },
      { unit: "h-civ-kokyo-shijo", why: "市場の失敗を補う政府の役割が財政につながる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kinyu", why: "銀行が仲立ちする借り入れが間接金融だと区別していない" },
      { i: 1, root: "j-soc-civ-kinyu", why: "買いオペで資金がふえる向きを押さえていない" },
      { i: 2, root: "h-civ-kokyo-kinyu", why: "金融政策の中心が公開市場操作に移ったことを知らない" },
      { i: 3, root: "h-civ-kokyo-kinyu", why: "建設国債と赤字国債の法的なちがいがあいまい" },
    ],
  },
  {
    unit: "h-civ-kokyo-rodo",
    needs: [
      { unit: "j-soc-civ-kigyo", why: "労働三権と労働三法を中学で学んでいる" },
      { unit: "j-soc-civ-shakai-hosho", why: "社会保障の4つの柱を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kigyo", why: "労働三権と勤労権（社会権）を区別していない" },
      { i: 1, root: "h-civ-kokyo-rodo", why: "公務員の労働基本権の制限を押さえていない" },
      { i: 2, root: "j-soc-civ-shakai-hosho", why: "社会保険と公的扶助の区別が身についていない" },
    ],
  },
  {
    unit: "h-civ-kokyo-kokusai-seiji",
    needs: [
      { unit: "j-soc-civ-kokusai", why: "主権国家と国際連合のしくみを中学で学んでいる" },
      { unit: "j-soc-hist-gendai", why: "冷戦とその終わりの流れを中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kokusai", why: "拒否権が安保理の常任理事国の権限だと覚えていない" },
      { i: 1, root: "h-civ-kokyo-kokusai-seiji", why: "国際司法裁判所に双方の同意が要ることを知らない" },
      { i: 2, root: "j-soc-hist-gendai", why: "1989年と1991年のできごとを年表で区別していない" },
    ],
  },
  {
    unit: "h-civ-kokyo-kokusai-keizai",
    needs: [
      { unit: "j-soc-civ-kinyu", why: "円高・円安と為替のしくみを中学で学んでいる" },
      { unit: "j-soc-civ-kokusai", why: "地域統合や国際協力の動きを中学で学んでいる" },
      { unit: "h-civ-kokyo-shijo", why: "交換で全体が得をするという市場の考えが土台" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kinyu", why: "1ドルに必要な円がふえると円安という見方が弱い" },
      { i: 1, root: "h-civ-kokyo-kokusai-keizai", why: "絶対的な優劣と比較優位を区別できていない" },
      { i: 2, root: "h-civ-kokyo-kokusai-keizai", why: "GATTからWTOへの変化の中身を押さえていない" },
    ],
  },
  {
    unit: "h-civ-kokyo-jizoku",
    needs: [
      { unit: "j-soc-civ-chikyu", why: "温暖化・SDGs・国際的な取り組みを中学で学んでいる" },
      { unit: "h-civ-kokyo-kokusai-keizai", why: "南北の格差など国際経済の課題とつながる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-jizoku", why: "持続可能な開発を「開発をやめる」と取りちがえている" },
      { i: 1, root: "j-soc-civ-chikyu", why: "SDGsが全ての国の目標であることを押さえていない" },
      { i: 2, root: "j-soc-civ-chikyu", why: "京都議定書とパリ協定のちがいを中学で整理していない" },
      { i: 3, root: "e-social-4-gomi", why: "3Rの順番でリデュースが先だという考えが弱い" },
    ],
  },

  // ───────── 倫理 ─────────
  {
    unit: "h-civ-rinri-seinen",
    needs: [{ unit: "h-civ-kokyo-seinen", why: "青年期の発達課題と第二の誕生を公共で学んでいる" }],
    mistakes: [
      { i: 0, root: "h-civ-rinri-seinen", why: "ラテン語の人間の定義を意味と結びつけていない" },
      { i: 1, root: "h-civ-kokyo-seinen", why: "第二の誕生（ルソー）と境界人（レヴィン）が混ざる" },
      { i: 2, root: "h-civ-rinri-seinen", why: "人格が遺伝と環境でつくられることをつかめていない" },
    ],
  },
  {
    unit: "h-civ-rinri-greece",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "ギリシアのポリスと文明のおこりを中学で学んでいる" },
      { unit: "h-civ-kokyo-shiso", why: "「どう生きるか」を問う倫理の見方の出発点" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-greece", why: "エピクロスの快楽がアタラクシアだと押さえていない" },
      { i: 1, root: "h-civ-rinri-greece", why: "ソフィストとソクラテスの立場の対立を整理していない" },
      { i: 2, root: "h-civ-rinri-greece", why: "プラトンとアリストテレスの本質の見方を比べていない" },
    ],
  },
  {
    unit: "h-civ-rinri-christ",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "キリスト教のおこりとローマ帝国を中学で学んでいる" },
      { unit: "h-civ-rinri-greece", why: "中世神学はギリシア哲学と信仰を結びつけた" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-christ", why: "アガペーとエロースの愛のちがいを比べていない" },
      { i: 1, root: "h-civ-rinri-christ", why: "イエスとパウロの役割を区別していない" },
      { i: 2, root: "j-soc-hist-bunmei", why: "ローマでの公認と国教化の流れを押さえていない" },
    ],
  },
  {
    unit: "h-civ-rinri-islam",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "イスラームの暮らしのきまりを中学で学んでいる" },
      { unit: "h-civ-rinri-christ", why: "同じ唯一神を信じる一神教の系譜をたどる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-islam", why: "ムハンマドが人間の預言者だという点が弱い" },
      { i: 1, root: "h-civ-rinri-christ", why: "ユダヤ教・キリスト教と同じ神だという系譜を知らない" },
      { i: 2, root: "h-civ-rinri-islam", why: "信じる六信と行う五行を分けて覚えていない" },
    ],
  },
  {
    unit: "h-civ-rinri-bukkyo",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "インドのシャカと仏教のおこりを中学で学んでいる" },
      { unit: "h-civ-kokyo-shiso", why: "「どう生きるか」を問う倫理の見方の出発点" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-bukkyo", why: "苦行も快楽も捨てる中道の考えをつかめていない" },
      { i: 1, root: "h-civ-rinri-bukkyo", why: "仏教の「苦」を日常語の苦しみで読んでいる" },
      { i: 2, root: "h-civ-rinri-bukkyo", why: "バラモン教の梵我一如と諸法無我を比べていない" },
    ],
  },
  {
    unit: "h-civ-rinri-china",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "春秋戦国の乱世と孔子の儒教を中学で学んでいる" },
      { unit: "h-civ-kokyo-shiso", why: "「どう生きるか」を問う倫理の見方の出発点" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-china", why: "四端が芽ばえで拡充が要ることをつかめていない" },
      { i: 1, root: "h-civ-rinri-china", why: "荀子の「偽」が人為の意味だと読めていない" },
      { i: 2, root: "h-civ-rinri-china", why: "無為自然を「何もしない」と字面で読んでいる" },
      { i: 3, root: "h-civ-rinri-china", why: "朱子学と陽明学の理のありかを比べていない" },
    ],
  },
  {
    unit: "h-civ-rinri-nihon",
    needs: [
      { unit: "h-civ-rinri-bukkyo", why: "日本仏教は仏教の教えを受けてつくりかえられた" },
      { unit: "h-civ-rinri-china", why: "江戸の儒学は朱子学・陽明学の受容から始まる" },
      { unit: "j-soc-hist-kamakura", why: "鎌倉仏教の宗派と開祖を中学で学んでいる" },
      { unit: "j-soc-hist-edo-tenkai", why: "朱子学・国学・蘭学の広がりを中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-nihon", why: "悪人正機の「悪人」の意味を字面で読んでいる" },
      { i: 1, root: "h-civ-rinri-china", why: "朱子学と陽明学のちがいがあいまいで人と結べない" },
      { i: 2, root: "j-soc-hist-edo-tenkai", why: "国学が儒教・仏教以前の心を求めたことが弱い" },
    ],
  },
  {
    unit: "h-civ-rinri-kindai-nihon",
    needs: [
      { unit: "h-civ-rinri-nihon", why: "江戸までの儒学・国学が近代思想の土台になる" },
      { unit: "j-soc-hist-meiji-ishin", why: "文明開化と福沢諭吉を中学で学んでいる" },
      { unit: "j-soc-hist-taisho", why: "大正デモクラシーと民本主義を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-kindai-nihon", why: "当時の「芸術」が技術の意味だったと知らない" },
      { i: 1, root: "j-soc-hist-meiji-ishin", why: "『学問のすゝめ』の主張を中学で押さえていない" },
      { i: 2, root: "j-soc-hist-taisho", why: "民本主義が主権の所在を問わない点が弱い" },
    ],
  },
  {
    unit: "h-civ-rinri-renaissance",
    needs: [
      { unit: "j-soc-hist-tenka-toitsu", why: "ルネサンスと宗教改革の流れを中学で学んでいる" },
      { unit: "h-civ-rinri-christ", why: "カトリック教会の教えを知ると改革の意味がわかる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-renaissance", why: "人間肯定と信仰が両立していたことをつかめていない" },
      { i: 1, root: "h-civ-rinri-renaissance", why: "予定説で救いは行いで変わらない点が弱い" },
      { i: 2, root: "j-soc-hist-tenka-toitsu", why: "ルターが聖書をドイツ語に訳した意味を知らない" },
    ],
  },
  {
    unit: "h-civ-rinri-keiken",
    needs: [
      { unit: "h-civ-rinri-renaissance", why: "人間の理性への信頼が近代哲学の出発点になる" },
      { unit: "h-civ-rinri-greece", why: "知とは何かを問うギリシア哲学の流れを受けつぐ" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-keiken", why: "方法的懐疑が真理を探す手段だとつかめていない" },
      { i: 1, root: "h-civ-rinri-keiken", why: "帰納法と演繹法の推論の向きを区別していない" },
      { i: 2, root: "h-civ-rinri-keiken", why: "4つのイドラを名前の字面だけで覚えている" },
    ],
  },
  {
    unit: "h-civ-rinri-keiyaku",
    needs: [
      { unit: "h-civ-kokyo-kenpo", why: "社会契約説と立憲主義の基本を公共で学んでいる" },
      { unit: "h-civ-rinri-keiken", why: "ロックの経験論と同じ近代の人間観から生まれた" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-keiyaku", why: "王権神授説と社会契約説の根拠のちがいが弱い" },
      { i: 1, root: "h-civ-rinri-keiyaku", why: "3人の自然状態の描き方を比べていない" },
      { i: 2, root: "h-civ-rinri-keiyaku", why: "一般意志と全体意志のちがいをつかめていない" },
      { i: 3, root: "h-civ-kokyo-kenpo", why: "ロックの間接民主制とルソーの直接民主制が混ざる" },
      { i: 4, root: "h-civ-rinri-keiyaku", why: "自然状態が仮定の思考実験だと理解していない" },
    ],
  },
  {
    unit: "h-civ-rinri-kant",
    needs: [
      { unit: "h-civ-rinri-keiken", why: "カントは経験論と合理論を総合しようとした" },
      { unit: "h-civ-kokyo-shiso", why: "動機で考える義務論の基本を公共で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-kant", why: "条件つきの仮言命法と定言命法を区別していない" },
      { i: 1, root: "h-civ-rinri-kant", why: "自律としての自由を「好き勝手」と読んでいる" },
      { i: 2, root: "h-civ-rinri-kant", why: "「単に手段としてのみ」の限定を読み落としている" },
      { i: 3, root: "h-civ-rinri-kant", why: "家族・市民社会・国家の弁証法の流れを追えていない" },
    ],
  },
  {
    unit: "h-civ-rinri-kori",
    needs: [
      { unit: "h-civ-kokyo-shiso", why: "結果で考える功利主義の基本を公共で学んでいる" },
      { unit: "j-soc-hist-kaikoku", why: "産業革命後のイギリス社会が功利主義の背景" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-kori", why: "ベンサムの量とミルの質の対比を整理していない" },
      { i: 1, root: "h-civ-kokyo-shiso", why: "社会全体の幸福の総量という考えが弱い" },
      { i: 2, root: "h-civ-rinri-kori", why: "ミルが功利主義を修正して受けついだ点が弱い" },
    ],
  },
  {
    unit: "h-civ-rinri-jitsuzon",
    needs: [
      { unit: "h-civ-rinri-kant", why: "ヘーゲルの体系への反発から実存主義が生まれた" },
      { unit: "h-civ-rinri-christ", why: "キリスト教の神の理解が「神は死んだ」の前提" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-jitsuzon", why: "実存と本質の順番の意味をつかめていない" },
      { i: 1, root: "h-civ-rinri-jitsuzon", why: "超人を価値の創造者として理解していない" },
      { i: 2, root: "h-civ-rinri-jitsuzon", why: "単独者として神の前に立つ意味が弱い" },
      { i: 3, root: "h-civ-rinri-jitsuzon", why: "限界状況を「避けられない状況」と押さえていない" },
    ],
  },
  {
    unit: "h-civ-rinri-pragma",
    needs: [
      { unit: "h-civ-rinri-keiken", why: "経験を重んじるイギリス経験論の流れを受けつぐ" },
      { unit: "h-civ-rinri-kori", why: "役に立つかで判断する功利主義の考えと近い" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-pragma", why: "思想の生まれた国と時代を結びつけていない" },
      { i: 1, root: "h-civ-rinri-pragma", why: "有用性を「都合がよい」と取りちがえている" },
      { i: 2, root: "h-civ-rinri-pragma", why: "道具主義の「道具」が知性だとつかめていない" },
    ],
  },
  {
    unit: "h-civ-rinri-gendai",
    needs: [
      { unit: "h-civ-rinri-kant", why: "ヘーゲル哲学がマルクスの出発点になった" },
      { unit: "h-civ-rinri-pragma", why: "道具主義と道具的理性批判を比べて理解する" },
      { unit: "j-soc-hist-kaikoku", why: "産業革命と社会主義の思想を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-gendai", why: "下部構造が上部構造を決める向きを逆にしている" },
      { i: 1, root: "h-civ-rinri-pragma", why: "デューイの道具主義の意味があいまいで混同する" },
      { i: 2, root: "h-civ-rinri-gendai", why: "ウィトゲンシュタインの前期と後期を区別していない" },
    ],
  },
  {
    unit: "h-civ-rinri-seimei",
    needs: [
      { unit: "h-civ-kokyo-jinken", why: "自己決定権など新しい人権が議論の土台になる" },
      { unit: "j-sci-3-iden", why: "遺伝子と細胞のしくみを理科で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-seimei", why: "安楽死と尊厳死の定義を比べていない" },
      { i: 1, root: "h-civ-rinri-seimei", why: "ES細胞とiPS細胞のつくり方を区別していない" },
      { i: 2, root: "h-civ-rinri-seimei", why: "改正臓器移植法の本人の意思の扱いが弱い" },
      { i: 3, root: "h-civ-kokyo-jinken", why: "患者の自己決定権という考えが身についていない" },
    ],
  },
  {
    unit: "h-civ-rinri-kankyo",
    needs: [
      { unit: "h-civ-kokyo-jizoku", why: "持続可能な開発と気候変動の取り組みを学んでいる" },
      { unit: "h-civ-rinri-kant", why: "義務や責任を考える近代の倫理の見方を広げる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-kankyo", why: "世代間倫理の「世代」が未来の人だと押さえていない" },
      { i: 1, root: "j-soc-civ-chikyu", why: "京都議定書とパリ協定のちがいを整理していない" },
      { i: 2, root: "h-civ-rinri-kankyo", why: "『沈黙の春』が農薬の害を訴えた本と知らない" },
    ],
  },
  {
    unit: "h-civ-rinri-joho",
    needs: [
      { unit: "j-soc-civ-gendai-shakai", why: "情報化の進展とその課題を中学で学んでいる" },
      { unit: "h-civ-kokyo-jinken", why: "プライバシーの権利など新しい人権が土台になる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-rinri-joho", why: "著作権が創作と同時に生まれることを知らない" },
      { i: 1, root: "h-civ-rinri-joho", why: "リップマンとマクルーハンの主張を区別していない" },
      { i: 2, root: "j-soc-civ-gendai-shakai", why: "情報格差の意味を中学で押さえていない" },
    ],
  },

  // ───────── 政治・経済 ─────────
  {
    unit: "h-civ-seikei-genri",
    needs: [
      { unit: "h-civ-kokyo-kenpo", why: "社会契約説・法の支配・権力分立を公共で学んでいる" },
      { unit: "j-soc-hist-kaikoku", why: "市民革命と人権宣言の流れを中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-saibansho", why: "三権分立とモンテスキューの結びつきが弱い" },
      { i: 1, root: "h-civ-seikei-genri", why: "法の支配と法治主義のちがいをつかめていない" },
      { i: 2, root: "h-civ-seikei-genri", why: "大統領制と議院内閣制の権限を比べていない" },
    ],
  },
  {
    unit: "h-civ-seikei-kenpo",
    needs: [
      { unit: "h-civ-seikei-genri", why: "立憲主義と民主政治の原理が憲法の土台になる" },
      { unit: "h-civ-kokyo-kenpo", why: "日本国憲法の三つの基本原理を公共で学んでいる" },
      { unit: "h-hist-sogo-sengo", why: "占領下で憲法がつくられた経緯を歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-kenpo", why: "天皇の国事行為に内閣の助言と承認が要ると知らない" },
      { i: 1, root: "h-civ-seikei-kenpo", why: "第99条の義務が公務員にかかる点が弱い" },
      { i: 2, root: "h-civ-seikei-kenpo", why: "統治行為論で判断を避けたことを押さえていない" },
    ],
  },
  {
    unit: "h-civ-seikei-jinken",
    needs: [
      { unit: "h-civ-kokyo-jinken", why: "人権の分類と自由権・社会権を公共で学んでいる" },
      { unit: "h-civ-seikei-kenpo", why: "最高法規としての憲法が人権保障の土台" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-jinken", why: "国家からの自由と国家による自由を区別していない" },
      { i: 1, root: "h-civ-seikei-jinken", why: "政教分離の判例ごとの結論を整理していない" },
      { i: 2, root: "h-civ-kokyo-jinken", why: "新しい人権が第13条を根拠にすることが弱い" },
    ],
  },
  {
    unit: "h-civ-seikei-kokkai",
    needs: [
      { unit: "h-civ-kokyo-tosei", why: "国会・内閣の基本と三権分立を公共で学んでいる" },
      { unit: "h-civ-seikei-genri", why: "議院内閣制と大統領制のちがいが前提" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-naikaku", why: "首相は国会が指名する議院内閣制が身についていない" },
      { i: 1, root: "h-civ-kokyo-tosei", why: "内閣不信任決議が衆議院だけの権限だと押さえていない" },
      { i: 2, root: "j-soc-civ-kokkai", why: "衆議院の再可決の条件を中学で押さえていない" },
    ],
  },
  {
    unit: "h-civ-seikei-saiban",
    needs: [
      { unit: "h-civ-kokyo-tosei", why: "司法権の独立と三審制を公共で学んでいる" },
      { unit: "h-civ-seikei-jinken", why: "違憲判決は人権をめぐる裁判から生まれる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-tosei", why: "すべての裁判所が違憲審査権をもつと覚えていない" },
      { i: 1, root: "j-soc-civ-saibansho", why: "国民審査の対象が最高裁裁判官だけと知らない" },
      { i: 2, root: "h-civ-seikei-saiban", why: "違憲判決の効力と国会の役割を区別していない" },
    ],
  },
  {
    unit: "h-civ-seikei-chiho",
    needs: [
      { unit: "h-civ-kokyo-chiho", why: "地方自治の本旨と直接請求を公共で学んでいる" },
      { unit: "h-civ-seikei-kenpo", why: "憲法第8章が地方自治を保障していることが前提" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-chiho", why: "廃止されたのが機関委任事務だと押さえていない" },
      { i: 1, root: "h-civ-seikei-chiho", why: "自治事務と法定受託事務の分け方がわからない" },
      { i: 2, root: "h-civ-kokyo-chiho", why: "条例による住民投票に法的拘束力がないと知らない" },
    ],
  },
  {
    unit: "h-civ-seikei-senkyo",
    needs: [
      { unit: "h-civ-kokyo-senkyo", why: "選挙制度とドント式を公共で学んでいる" },
      { unit: "h-civ-seikei-kokkai", why: "衆議院と参議院のちがいが選挙制度に表れる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-senkyo", why: "衆参の選挙制度のちがいを整理していない" },
      { i: 1, root: "h-civ-seikei-saiban", why: "違憲判決の効力がその選挙に及ぶ範囲が弱い" },
      { i: 2, root: "h-civ-seikei-senkyo", why: "献金が禁止される相手を区別していない" },
    ],
  },
  {
    unit: "h-civ-seikei-kokuren",
    needs: [
      { unit: "h-civ-kokyo-kokusai-seiji", why: "主権国家・集団安全保障・安保理を公共で学んでいる" },
      { unit: "h-hist-sogo-sengo", why: "国際連盟の反省から国連がつくられた経緯を学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-kokuren", why: "総会の勧告と安保理の決定の効力を区別していない" },
      { i: 1, root: "h-civ-seikei-kokuren", why: "正規の国連軍と多国籍軍を区別していない" },
      { i: 2, root: "h-civ-kokyo-kokusai-seiji", why: "ICJが国家間の争いを裁く機関だと押さえていない" },
    ],
  },
  {
    unit: "h-civ-seikei-heiwa",
    needs: [
      { unit: "h-civ-seikei-kenpo", why: "平和主義と第9条の解釈が議論の出発点" },
      { unit: "h-civ-seikei-kokuren", why: "国連憲章の集団安全保障と自衛権が前提" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-kenpo", why: "最高裁が統治行為論で判断を避けたことが弱い" },
      { i: 1, root: "h-civ-seikei-kokuren", why: "憲章第51条の自衛権の中身を押さえていない" },
      { i: 2, root: "h-civ-seikei-heiwa", why: "難民条約の難民の定義を正確に覚えていない" },
    ],
  },
  {
    unit: "h-civ-seikei-taisei",
    needs: [
      { unit: "h-civ-kokyo-shijo", why: "市場のはたらきと市場の失敗を公共で学んでいる" },
      { unit: "j-soc-hist-sekai-taisen", why: "世界恐慌とニューディールを中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-taisei", why: "夜警国家が批判のための言葉だと知らない" },
      { i: 1, root: "h-civ-seikei-taisei", why: "有効需要をつくる財政支出の向きをつかめていない" },
      { i: 2, root: "h-civ-seikei-taisei", why: "社会主義市場経済の意味を押さえていない" },
    ],
  },
  {
    unit: "h-civ-seikei-shijo",
    needs: [
      { unit: "h-civ-kokyo-shijo", why: "需要・供給曲線とシフトを公共で学んでいる" },
      { unit: "j-math-2-ichiji-kansu", why: "2直線の交点を連立方程式で求める力が要る" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-shijo", why: "どの曲線がなぜ動くのかの判断が身についていない" },
      { i: 1, root: "h-civ-seikei-shijo", why: "弾力性で価格の上がり幅が変わる点が弱い" },
      { i: 2, root: "j-soc-civ-shijo", why: "カルテル・トラストなど独占の形態を区別していない" },
    ],
  },
  {
    unit: "h-civ-seikei-shotoku",
    needs: [
      { unit: "h-civ-seikei-shijo", why: "市場で生まれる生産と価格の動きが前提" },
      { unit: "e-math-5-wariai", why: "成長率や物価上昇率を割合で計算する力が要る" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-shotoku", why: "中間生産物を引く付加価値の考えが弱い" },
      { i: 1, root: "h-civ-seikei-shotoku", why: "GDPの「国内」とGNIの「国民」を区別していない" },
      { i: 2, root: "h-civ-seikei-shotoku", why: "間接税を引き補助金を足す向きが身についていない" },
      { i: 3, root: "h-civ-seikei-shotoku", why: "名目と実質の差が物価の変化だと理解していない" },
    ],
  },
  {
    unit: "h-civ-seikei-kinyu",
    needs: [
      { unit: "h-civ-kokyo-kinyu", why: "信用創造と日銀の金融政策を公共で学んでいる" },
      { unit: "h-math-b-tosa", why: "信用創造の総額を等比数列の和で求める" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-kinyu", why: "マネタリーベースとマネーストックを区別していない" },
      { i: 1, root: "h-civ-kokyo-kinyu", why: "準備率と信用創造の額の関係をつかめていない" },
      { i: 2, root: "h-civ-seikei-kinyu", why: "ペイオフで保護される範囲を押さえていない" },
    ],
  },
  {
    unit: "h-civ-seikei-zaisei",
    needs: [
      { unit: "h-civ-kokyo-kinyu", why: "財政の3つの機能と国債を公共で学んでいる" },
      { unit: "j-soc-civ-zaisei", why: "直接税・間接税と累進課税を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-zaisei", why: "累進課税が超えた部分だけにかかると理解していない" },
      { i: 1, root: "j-soc-civ-zaisei", why: "歳出の大きい順を中学で押さえていない" },
      { i: 2, root: "j-soc-civ-zaisei", why: "国税と地方税の分け方を中学で押さえていない" },
      { i: 3, root: "h-civ-seikei-zaisei", why: "シャウプ勧告が直接税中心だったと知らない" },
    ],
  },
  {
    unit: "h-civ-seikei-nihon",
    needs: [
      { unit: "h-civ-seikei-shotoku", why: "成長率や景気循環の見方で戦後経済を読む" },
      { unit: "h-civ-seikei-kinyu", why: "金融政策と金利がバブルの説明に使われる" },
      { unit: "h-hist-sogo-kodo", why: "高度経済成長の流れを歴史総合で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-nihon", why: "ドッジ・ラインが緊縮策だったことが弱い" },
      { i: 1, root: "h-civ-seikei-shotoku", why: "不況とインフレが同時に起こる状態をつかめていない" },
      { i: 2, root: "h-civ-kokyo-kokusai-keizai", why: "円高・円安と輸出の関係が身についていない" },
    ],
  },
  {
    unit: "h-civ-seikei-rodo",
    needs: [{ unit: "h-civ-kokyo-rodo", why: "労働基本権と労働三法を公共で学んでいる" }],
    mistakes: [
      { i: 0, root: "h-civ-seikei-rodo", why: "三六協定にも上限があることを押さえていない" },
      { i: 1, root: "h-civ-seikei-rodo", why: "あっせん・調停・仲裁の拘束力のちがいが弱い" },
      { i: 2, root: "h-civ-seikei-rodo", why: "不当労働行為の具体例を覚えていない" },
    ],
  },
  {
    unit: "h-civ-seikei-shakaihosho",
    needs: [
      { unit: "h-civ-kokyo-rodo", why: "社会保障の4つの柱と年金の課題を公共で学んでいる" },
      { unit: "h-civ-seikei-zaisei", why: "社会保障関係費と税・保険料の財源が前提" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-civ-shakai-hosho", why: "社会保険と公的扶助の区別が身についていない" },
      { i: 1, root: "h-civ-seikei-shakaihosho", why: "介護保険の加入年齢を押さえていない" },
      { i: 2, root: "h-civ-seikei-shakaihosho", why: "年金の2階建ての構造をつかめていない" },
      { i: 3, root: "h-civ-seikei-shakaihosho", why: "ビスマルクとベバリッジの役割を区別していない" },
    ],
  },
  {
    unit: "h-civ-seikei-boeki",
    needs: [
      { unit: "h-civ-kokyo-kokusai-keizai", why: "比較生産費説・為替・国際収支を公共で学んでいる" },
      { unit: "h-civ-seikei-kinyu", why: "金利の変化が為替を動かすしくみにつながる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-kokyo-kokusai-keizai", why: "絶対的な優劣と比較優位を区別できていない" },
      { i: 1, root: "h-civ-seikei-boeki", why: "金利と通貨の需要の結びつきをつかめていない" },
      { i: 2, root: "j-soc-civ-kinyu", why: "1ドルに必要な円がふえると円安という見方が弱い" },
      { i: 3, root: "h-civ-seikei-boeki", why: "スミソニアン協定から変動相場制への順を知らない" },
    ],
  },
  {
    unit: "h-civ-seikei-togo",
    needs: [
      { unit: "h-civ-seikei-boeki", why: "自由貿易とWTOのルールが地域統合の前提" },
      { unit: "j-soc-geo-europe", why: "EUの成り立ちとユーロを中学で学んでいる" },
      { unit: "j-soc-civ-chikyu", why: "南北問題を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-seikei-togo", why: "FTAとEPAの範囲のちがいを押さえていない" },
      { i: 1, root: "j-soc-geo-europe", why: "EU加盟とユーロ導入が別だと押さえていない" },
      { i: 2, root: "j-soc-civ-chikyu", why: "南北問題の「南」が途上国の意味だと結べていない" },
    ],
  },

  // ───────── 吉田松陰講座 ─────────
  {
    unit: "h-civ-shoin-nyujuku",
    needs: [
      { unit: "j-soc-hist-kaikoku", why: "ペリー来航から幕末の動きを中学で学んでいる" },
      { unit: "j-soc-hist-edo-tenkai", why: "寺子屋や私塾など江戸の学びの広がりを知っておく" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-shoin-nyujuku", why: "塾の名の由来と松陰の関わり方を確かめていない" },
      { i: 1, root: "h-civ-shoin-nyujuku", why: "松陰が教えた期間と立場を押さえていない" },
      { i: 2, root: "h-civ-shoin-nyujuku", why: "松下村塾記の全体を読まず一句だけで判断している" },
      { i: 3, root: "h-civ-shoin-nyujuku", why: "名言の出どころを原典で確かめる習慣がない" },
    ],
  },
  {
    unit: "h-civ-shoin-risshi",
    needs: [{ unit: "h-civ-shoin-nyujuku", why: "松陰の人物像と松下村塾の学びが前提" }],
    mistakes: [
      { i: 0, root: "h-civ-shoin-risshi", why: "原文の字と後の言いかえを区別していない" },
      { i: 1, root: "h-civ-shoin-risshi", why: "士規七則が書かれた時と相手を押さえていない" },
      { i: 2, root: "h-civ-shoin-risshi", why: "第一・二則の時代の背景を読みとばしている" },
      { i: 3, root: "h-civ-shoin-risshi", why: "写本や書き下しで字がちがうことを知らない" },
    ],
  },
  {
    unit: "h-civ-shoin-dokusho",
    needs: [
      { unit: "h-civ-shoin-risshi", why: "立志・選交・読書の「読書」をここで深める" },
      { unit: "h-civ-rinri-china", why: "孔子・孟子の思想を知ると松陰の異議が読める" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-shoin-dokusho", why: "講孟余話が獄中の講義録だと押さえていない" },
      { i: 1, root: "h-civ-shoin-dokusho", why: "「阿らぬ」を「読まない」と取りちがえている" },
      { i: 2, root: "h-civ-shoin-dokusho", why: "序説の議論の流れを最後まで追っていない" },
      { i: 3, root: "h-civ-rinri-china", why: "『孟子』の言葉と松陰の言葉を区別できていない" },
    ],
  },
  {
    unit: "h-civ-shoin-kodo",
    needs: [
      { unit: "h-civ-shoin-dokusho", why: "野山獄での講義を知ると獄中の学びがつながる" },
      { unit: "j-soc-hist-kaikoku", why: "ペリー来航と日米和親条約が下田踏海の背景" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-shoin-kodo", why: "下田踏海の結末を史料で確かめていない" },
      { i: 1, root: "h-civ-shoin-kodo", why: "松陰の生涯の年表を整理していない" },
      { i: 2, root: "h-civ-shoin-kodo", why: "獄中で書いた著作を押さえていない" },
      { i: 3, root: "h-civ-shoin-kodo", why: "人物の行動を一面だけで評価している" },
    ],
  },
  {
    unit: "h-civ-shoin-shisei",
    needs: [
      { unit: "h-civ-shoin-kodo", why: "野山獄までの歩みを知ると最後の一年が読める" },
      { unit: "h-hist-jp-bakumatsu", why: "安政の大獄など幕末の政治の動きが背景" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-shoin-shisei", why: "手紙の生と死の両面を読み落としている" },
      { i: 1, root: "h-civ-shoin-shisei", why: "留魂録が書かれた日付と場面を押さえていない" },
      { i: 2, root: "h-civ-shoin-shisei", why: "原文の字と一般的な表記を区別していない" },
      { i: 3, root: "h-civ-shoin-shisei", why: "言葉の出典を史料で確かめていない" },
    ],
  },
  {
    unit: "h-civ-shoin-hikari",
    needs: [
      { unit: "h-civ-shoin-shisei", why: "松陰の生涯の全体を知ったうえで評価を考える" },
      { unit: "j-soc-hist-rikken", why: "日清・日露戦争と韓国併合など近代日本の歩み" },
    ],
    mistakes: [
      { i: 0, root: "h-civ-shoin-nyujuku", why: "名言の出どころを原典で確かめる習慣がない" },
      { i: 1, root: "h-civ-shoin-hikari", why: "『幽囚録』の対外策を読んでいない" },
      { i: 2, root: "h-civ-shoin-hikari", why: "研究によって評価が分かれることを知らない" },
      { i: 3, root: "h-civ-shoin-risshi", why: "士規七則の原文の字を確かめていない" },
    ],
  },

  // ───────── 地理総合 ─────────
  {
    unit: "h-geo-sogo-gis",
    needs: [
      { unit: "j-soc-geo-sekai-sugata", why: "メルカトル図法・正距方位図法を中学で学んでいる" },
      { unit: "j-soc-geo-chiiki-chosa", why: "地形図と主題図の読み方を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-sekai-sugata", why: "図法ごとに正しく表せるものを区別していない" },
      { i: 1, root: "h-geo-sogo-gis", why: "絶対値と相対値で表し方を選ぶ考えが弱い" },
      { i: 2, root: "j-soc-geo-sekai-sugata", why: "正距方位図法は中心からだけ正しいと知らない" },
    ],
  },
  {
    unit: "h-geo-sogo-jisa",
    needs: [
      { unit: "j-soc-geo-nihon-sugata", why: "経度15度で1時間の時差を中学で学んでいる" },
      { unit: "j-soc-geo-sekai-sugata", why: "緯度・経度で位置を表す方法が前提" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-sugata", why: "東経と西経をまたぐと経度差は足すと身についていない" },
      { i: 1, root: "j-soc-geo-nihon-sugata", why: "東ほど時刻が進むという向きを押さえていない" },
      { i: 2, root: "j-soc-geo-nihon-sugata", why: "日付変更線をこえる向きと日付の関係が弱い" },
      { i: 3, root: "h-geo-sogo-jisa", why: "標準時子午線で計算するルールが身についていない" },
    ],
  },
  {
    unit: "h-geo-sogo-musubi",
    needs: [
      { unit: "j-soc-geo-europe", why: "EUの統合とユーロを中学で学んでいる" },
      { unit: "e-social-5-boeki", why: "船や飛行機で貨物を運ぶ貿易を小学校で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-europe", why: "EU加盟とユーロ導入が別だと押さえていない" },
      { i: 1, root: "e-social-5-boeki", why: "重い原料は船で運ぶという輸送の基本が弱い" },
      { i: 2, root: "h-geo-sogo-musubi", why: "時間距離と実際の距離を区別していない" },
    ],
  },
  {
    unit: "h-geo-sogo-chikei",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "造山帯・扇状地・リアス海岸を中学で学んでいる" },
      { unit: "j-sci-1-jishin", why: "プレートの動きと地震のしくみを理科で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-tokushoku", why: "扇状地の扇央と扇端の水の得やすさを区別していない" },
      { i: 1, root: "h-geo-sogo-chikei", why: "長い侵食で山が低くなる考えが身についていない" },
      { i: 2, root: "h-geo-sogo-chikei", why: "V字谷とU字谷で海岸のでき方を比べていない" },
    ],
  },
  {
    unit: "h-geo-sogo-kiko",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "世界の5つの気候帯とくらしを中学で学んでいる" },
      { unit: "j-sci-2-kisho", why: "気圧と風のふき方を理科で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-sogo-kiko", why: "亜熱帯高圧帯と砂漠の位置を結びつけていない" },
      { i: 1, root: "h-geo-sogo-kiko", why: "ケッペンの区分が最暖月の気温で決まる点が弱い" },
      { i: 2, root: "h-geo-sogo-kiko", why: "貿易風と偏西風のふく向きを区別していない" },
    ],
  },
  {
    unit: "h-geo-sogo-shukyo",
    needs: [
      { unit: "j-soc-geo-seikatsu", why: "世界の宗教と暮らしのきまりを中学で学んでいる" },
      { unit: "j-soc-geo-asia", why: "アジアの宗教の分布を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-asia", why: "東南アジアにイスラームの大国があると知らない" },
      { i: 1, root: "j-soc-geo-asia", why: "インドの宗教の多数派を中学で押さえていない" },
      { i: 2, root: "j-soc-geo-seikatsu", why: "ハラールの意味を中学で押さえていない" },
      { i: 3, root: "h-geo-sogo-shukyo", why: "太陰暦と太陽暦のずれをつかめていない" },
    ],
  },
  {
    unit: "h-geo-sogo-kankyo",
    needs: [
      { unit: "j-soc-civ-chikyu", why: "温暖化と国際的な取り組みを中学で学んでいる" },
      { unit: "h-geo-sogo-kiko", why: "気候帯の分布が砂漠化や熱帯林の問題の土台" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-sogo-kankyo", why: "温暖化とオゾン層破壊の原因を区別していない" },
      { i: 1, root: "j-soc-civ-chikyu", why: "京都議定書とパリ協定のちがいを整理していない" },
      { i: 2, root: "h-geo-sogo-kankyo", why: "砂漠化の人為的な原因を押さえていない" },
    ],
  },
  {
    unit: "h-geo-sogo-shigen",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "日本の資源・エネルギーと発電を中学で学んでいる" },
      { unit: "j-soc-hist-sengo", why: "エネルギー革命と石油危機を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sengo", why: "石油危機が価格と供給の問題だと押さえていない" },
      { i: 1, root: "h-geo-sogo-shigen", why: "可採年数が条件で変わる目安だと知らない" },
      { i: 2, root: "h-geo-sogo-shigen", why: "再生可能エネルギーの課題を考えていない" },
      { i: 3, root: "j-soc-geo-nihon-tokushoku", why: "再生可能エネルギーの範囲を中学で押さえていない" },
    ],
  },
  {
    unit: "h-geo-sogo-jinko",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "人口ピラミッドの型を中学で学んでいる" },
      { unit: "j-soc-civ-chikyu", why: "途上国の貧困と飢餓の問題を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-sogo-jinko", why: "出生率と死亡率の差で人口がふえる点が弱い" },
      { i: 1, root: "j-soc-civ-chikyu", why: "食料は分配のかたよりが問題だと押さえていない" },
      { i: 2, root: "j-soc-geo-nihon-tokushoku", why: "人口ピラミッドの型と国の対応を覚えていない" },
    ],
  },
  {
    unit: "h-geo-sogo-toshi",
    needs: [
      { unit: "j-soc-geo-kanto", why: "首都圏への集中と郊外の広がりを中学で学んでいる" },
      { unit: "h-geo-sogo-jinko", why: "人口移動と都市化を人口の変化と結びつける" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-sogo-toshi", why: "ドーナツ化現象の「中心が空く」形をつかめていない" },
      { i: 1, root: "h-geo-sogo-toshi", why: "プライメートシティの意味を押さえていない" },
      { i: 2, root: "h-geo-sogo-toshi", why: "再開発の影と光の両面を考えていない" },
      { i: 3, root: "h-geo-sogo-toshi", why: "コンパクトシティが誘導で進むことを知らない" },
    ],
  },
  {
    unit: "h-geo-sogo-bosai",
    needs: [
      { unit: "j-soc-geo-nihon-tokushoku", why: "日本の地形・災害と防災を中学で学んでいる" },
      { unit: "h-geo-sogo-chikei", why: "プレートと土地の成り立ちが被害の差を生む" },
    ],
    mistakes: [
      { i: 0, root: "j-sci-1-jishin", why: "海溝型と内陸型の地震のちがいをつかめていない" },
      { i: 1, root: "j-soc-geo-chiiki-chosa", why: "ハザードマップが想定にもとづく図だと知らない" },
      { i: 2, root: "e-social-5-bosai", why: "自助・共助・公助の組み合わせが身についていない" },
    ],
  },
  {
    unit: "h-geo-sogo-chosa",
    needs: [
      { unit: "j-soc-geo-chiiki-chosa", why: "問い→調べる→まとめるの手順を中学で学んでいる" },
      { unit: "h-geo-sogo-gis", why: "主題図とGISでデータを地図にする力が要る" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-sogo-gis", why: "絶対値と相対値で表し方を選ぶ考えが弱い" },
      { i: 1, root: "j-soc-geo-chiiki-chosa", why: "問いと仮説を先に立てる手順が身についていない" },
      { i: 2, root: "e-social-5-joho", why: "情報の出どころを確かめる習慣が身についていない" },
    ],
  },

  // ───────── 地理探究 ─────────
  {
    unit: "h-geo-tankyu-chikei",
    needs: [{ unit: "h-geo-sogo-chikei", why: "大地形と小地形の基本を地理総合で学んでいる" }],
    mistakes: [
      { i: 0, root: "h-geo-sogo-chikei", why: "長い侵食で山が低くなる考えが身についていない" },
      { i: 1, root: "j-soc-geo-nihon-tokushoku", why: "扇状地の扇央と扇端の水の得やすさを区別していない" },
      { i: 2, root: "h-geo-sogo-chikei", why: "V字谷とU字谷で海岸のでき方を比べていない" },
      { i: 3, root: "h-geo-tankyu-chikei", why: "自然堤防と後背湿地の高さと水はけを比べていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-kiko",
    needs: [
      { unit: "h-geo-sogo-kiko", why: "気圧帯とケッペン区分の基本を地理総合で学んでいる" },
      { unit: "h-geo-tankyu-chikei", why: "海と陸の配置や地形が気候の差を生む" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-kiko", why: "夏に亜熱帯高圧帯におおわれる理由が弱い" },
      { i: 1, root: "j-soc-geo-seikatsu", why: "乾燥帯の砂漠とステップの区別を押さえていない" },
      { i: 2, root: "h-geo-tankyu-kiko", why: "南半球に冷帯ができない陸の配置を知らない" },
      { i: 3, root: "j-soc-geo-europe", why: "偏西風と暖流が西岸を暖めることが弱い" },
    ],
  },
  {
    unit: "h-geo-tankyu-nogyo",
    needs: [
      { unit: "h-geo-tankyu-kiko", why: "気候区が農業の型の分布を決める" },
      { unit: "j-soc-geo-europe", why: "混合農業・地中海式農業を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-europe", why: "地中海式農業の夏と冬の作物を押さえていない" },
      { i: 1, root: "j-soc-geo-africa", why: "プランテーションが輸出用だと押さえていない" },
      { i: 2, root: "j-soc-geo-kanto", why: "近郊農業が都市の近くで行われると結べていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-shigen",
    needs: [
      { unit: "h-geo-sogo-shigen", why: "資源のかたよりとエネルギーを地理総合で学んでいる" },
      { unit: "h-geo-tankyu-chikei", why: "大地のつくりが石油や石炭の分布を決める" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sengo", why: "1960年代のエネルギー革命を中学で押さえていない" },
      { i: 1, root: "h-geo-tankyu-shigen", why: "石油のでき方とたまる地形をつかめていない" },
      { i: 2, root: "h-geo-sogo-shigen", why: "再生可能エネルギーの範囲を押さえていない" },
      { i: 3, root: "h-geo-sogo-shigen", why: "資源が一部の地域にかたよることが弱い" },
    ],
  },
  {
    unit: "h-geo-tankyu-kogyo",
    needs: [
      { unit: "h-geo-tankyu-shigen", why: "原料や燃料の分布が工業の立地を左右する" },
      { unit: "j-soc-geo-north-america", why: "サンベルトへの工業の移動を中学で学んでいる" },
      { unit: "e-social-5-kogyo", why: "工業地域が臨海部に多いことを小学校で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-kogyo", why: "原料と製品の重さで立地が決まる考えが弱い" },
      { i: 1, root: "e-social-5-boeki", why: "原料を輸入する日本の工業の形が身についていない" },
      { i: 2, root: "h-geo-tankyu-kogyo", why: "空洞化が生産と雇用の問題だとつかめていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-kotsu",
    needs: [
      { unit: "h-geo-sogo-musubi", why: "時間距離と輸送手段の使い分けを地理総合で学んでいる" },
      { unit: "h-geo-tankyu-kogyo", why: "産業の中心が工業から第3次産業へ移る流れ" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-kotsu", why: "第3次産業にふくまれる業種の広さを知らない" },
      { i: 1, root: "h-geo-sogo-musubi", why: "重い物は船で運ぶという輸送の基本が弱い" },
      { i: 2, root: "h-geo-tankyu-kotsu", why: "ハブ空港の意味を押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-jinko",
    needs: [{ unit: "h-geo-sogo-jinko", why: "人口転換と人口ピラミッドを地理総合で学んでいる" }],
    mistakes: [
      { i: 0, root: "h-geo-sogo-jinko", why: "死亡率が先に下がって人口がふえる点が弱い" },
      { i: 1, root: "j-soc-geo-nihon-tokushoku", why: "人口ピラミッドの型と意味を覚えていない" },
      { i: 2, root: "h-geo-tankyu-jinko", why: "人口置換水準が約2.1だと押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-toshi",
    needs: [
      { unit: "h-geo-sogo-toshi", why: "都市化と都市問題の基本を地理総合で学んでいる" },
      { unit: "h-geo-tankyu-chikei", why: "扇状地や谷口など地形が集落の立地を決める" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-tokushoku", why: "扇状地で水が得られる場所を区別していない" },
      { i: 1, root: "h-geo-tankyu-toshi", why: "谷口集落の位置を地形と結びつけていない" },
      { i: 2, root: "h-geo-sogo-toshi", why: "ドーナツ化現象の形をつかめていない" },
      { i: 3, root: "h-geo-tankyu-toshi", why: "インナーシティ問題の起こる場所を押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-minzoku",
    needs: [{ unit: "h-geo-sogo-shukyo", why: "世界宗教と民族宗教の区別を地理総合で学んでいる" }],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-minzoku", why: "民族を文化で分けるという考えが身についていない" },
      { i: 1, root: "h-geo-tankyu-minzoku", why: "言語と方言の境目が社会で決まる点が弱い" },
      { i: 2, root: "h-geo-sogo-shukyo", why: "世界宗教と民族宗教を区別していない" },
      { i: 3, root: "j-soc-geo-asia", why: "東南アジアの宗教の分布を中学で押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-kokka",
    needs: [
      { unit: "j-soc-civ-kokusai", why: "国家の三要素と領域を中学で学んでいる" },
      { unit: "h-geo-sogo-musubi", why: "EUなど地域のまとまりを地理総合で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-sugata", why: "領海とEEZのちがいを中学で押さえていない" },
      { i: 1, root: "j-soc-civ-kokusai", why: "領空が領土・領海の上空だけだと知らない" },
      { i: 2, root: "j-soc-geo-europe", why: "EU加盟とユーロ導入が別だと押さえていない" },
      { i: 3, root: "h-geo-tankyu-kokka", why: "シェンゲン協定の参加国の範囲を知らない" },
    ],
  },
  {
    unit: "h-geo-tankyu-higashiasia",
    needs: [
      { unit: "j-soc-geo-asia", why: "季節風と中国の農業・工業を中学で学んでいる" },
      { unit: "h-geo-tankyu-nogyo", why: "気候と農業の型の結びつきを系統地理で学ぶ" },
      { unit: "h-geo-tankyu-kogyo", why: "工業の立地と国際分業を系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-asia", why: "中国の北の畑作と南の稲作を区別していない" },
      { i: 1, root: "j-soc-geo-asia", why: "経済特区が沿海部にあることを押さえていない" },
      { i: 2, root: "h-geo-tankyu-higashiasia", why: "NIEsの国と地域を覚えていない" },
      { i: 3, root: "h-geo-tankyu-higashiasia", why: "人口政策の変化を最新の情報で押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-minamiasia",
    needs: [
      { unit: "j-soc-geo-asia", why: "東南・南アジアの農業と工業化を中学で学んでいる" },
      { unit: "h-geo-tankyu-minzoku", why: "宗教の分布と暮らしの結びつきを系統地理で学ぶ" },
      { unit: "h-geo-tankyu-nogyo", why: "稲作やプランテーションの型を系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-asia", why: "東南アジアの宗教の分布を中学で押さえていない" },
      { i: 1, root: "j-soc-geo-asia", why: "プランテーションが輸出用の農園だと結べていない" },
      { i: 2, root: "h-geo-sogo-shukyo", why: "インドの多数派がヒンドゥー教だと押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-nishiasia",
    needs: [
      { unit: "j-soc-geo-africa", why: "アフリカの植民地の歴史とモノカルチャーを学んでいる" },
      { unit: "h-geo-tankyu-shigen", why: "石油の分布と資源ナショナリズムを系統地理で学ぶ" },
      { unit: "h-geo-tankyu-minzoku", why: "民族と宗教の分け方を系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-minzoku", why: "民族を言語・宗教で分ける見方が弱い" },
      { i: 1, root: "h-geo-sogo-kankyo", why: "砂漠化の人為的な原因を押さえていない" },
      { i: 2, root: "j-soc-geo-africa", why: "モノカルチャー経済の弱点を中学で押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-europe",
    needs: [
      { unit: "j-soc-geo-europe", why: "気候・農業・EUの基本を中学で学んでいる" },
      { unit: "h-geo-tankyu-kokka", why: "国家群とEU統合のしくみを系統地理で学ぶ" },
      { unit: "h-geo-tankyu-nogyo", why: "ヨーロッパの農業の型を系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-europe", why: "暖流と偏西風が西岸を暖めることが弱い" },
      { i: 1, root: "j-soc-geo-europe", why: "EU加盟とユーロ導入が別だと押さえていない" },
      { i: 2, root: "h-geo-tankyu-nogyo", why: "地中海式農業の夏と冬の作物を区別していない" },
      { i: 3, root: "h-geo-tankyu-kokka", why: "シェンゲン協定の参加国の範囲を知らない" },
    ],
  },
  {
    unit: "h-geo-tankyu-russia",
    needs: [
      { unit: "h-geo-tankyu-kiko", why: "冷帯・寒帯と植生の並びを系統地理で学ぶ" },
      { unit: "j-soc-hist-gendai", why: "ソ連の解体と冷戦の終わりを中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-seikatsu", why: "タイガが針葉樹林だと中学で押さえていない" },
      { i: 1, root: "h-geo-tankyu-russia", why: "バルト3国の歩みを押さえていない" },
      { i: 2, root: "h-geo-tankyu-russia", why: "灌漑取水が湖を縮めたことをつかめていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-america",
    needs: [
      { unit: "j-soc-geo-north-america", why: "適地適作とサンベルトを中学で学んでいる" },
      { unit: "j-soc-geo-south-america", why: "南アメリカの言語と住民を中学で学んでいる" },
      { unit: "h-geo-tankyu-nogyo", why: "企業的農業とアグリビジネスを系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-america", why: "西経100度と降水量の境を結びつけていない" },
      { i: 1, root: "j-soc-geo-south-america", why: "ブラジルがポルトガル語だと押さえていない" },
      { i: 2, root: "j-soc-geo-south-america", why: "メスチソとムラートの区別があいまい" },
    ],
  },
  {
    unit: "h-geo-tankyu-oceania",
    needs: [
      { unit: "j-soc-geo-oceania", why: "乾燥した大陸とアジアとの結びつきを学んでいる" },
      { unit: "h-geo-tankyu-chikei", why: "古期造山帯や安定陸塊の大地形を系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-geo-tankyu-oceania", why: "大鑽井盆地の地下水の使われ方を知らない" },
      { i: 1, root: "j-soc-geo-oceania", why: "貿易相手がアジアへ移ったことを押さえていない" },
      { i: 2, root: "h-geo-tankyu-kiko", why: "偏西風帯で西岸海洋性気候になる点が弱い" },
      { i: 3, root: "h-geo-sogo-chikei", why: "古期造山帯の山がなだらかだと押さえていない" },
    ],
  },
  {
    unit: "h-geo-tankyu-nihon",
    needs: [
      { unit: "h-geo-sogo-bosai", why: "変動帯の日本の災害と防災を地理総合で学んでいる" },
      { unit: "h-geo-tankyu-jinko", why: "人口減少と少子高齢化を系統地理で学ぶ" },
      { unit: "h-geo-tankyu-toshi", why: "過密と過疎、都市圏のしくみを系統地理で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-geo-nihon-tokushoku", why: "日本の人口が減少に転じたことが弱い" },
      { i: 1, root: "e-social-5-bosai", why: "被害を減らす減災の考えが身についていない" },
      { i: 2, root: "j-soc-geo-nihon-tokushoku", why: "過疎が人口減と生活の維持の問題だと知らない" },
    ],
  },

  // ───────── 歴史総合 ─────────
  {
    unit: "h-hist-sogo-18c",
    needs: [
      { unit: "j-soc-hist-edo-seiritsu", why: "四つの口と「鎖国」の体制を中学で学んでいる" },
      { unit: "j-soc-hist-tenka-toitsu", why: "大航海時代とヨーロッパのアジア進出を学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-edo-seiritsu", why: "四つの口での交流を中学で押さえていない" },
      { i: 1, root: "h-hist-sogo-18c", why: "当時のアジアの豊かさと銀の流れをつかめていない" },
      { i: 2, root: "h-hist-sogo-18c", why: "清の管理貿易のしくみを押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-sangyo",
    needs: [
      { unit: "j-soc-hist-kaikoku", why: "産業革命と資本主義の成立を中学で学んでいる" },
      { unit: "h-hist-sogo-18c", why: "アジアの綿布への需要が産業革命の背景になる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-18c", why: "綿布の需要から機械化が始まった流れが弱い" },
      { i: 1, root: "h-hist-sogo-sangyo", why: "発明と改良を区別していない" },
      { i: 2, root: "h-hist-sogo-sangyo", why: "工場法が労働者を守る法だとつかめていない" },
    ],
  },
  {
    unit: "h-hist-sogo-kakumei",
    needs: [{ unit: "j-soc-hist-kaikoku", why: "市民革命と人権宣言を中学で学んでいる" }],
    mistakes: [
      { i: 0, root: "j-soc-hist-kaikoku", why: "ピューリタン革命と名誉革命の区別があいまい" },
      { i: 1, root: "h-hist-sogo-kakumei", why: "宣言の理念と現実の権利の範囲を比べていない" },
      { i: 2, root: "j-soc-hist-kaikoku", why: "人権宣言とナポレオンの時代を区別していない" },
    ],
  },
  {
    unit: "h-hist-sogo-meiji",
    needs: [
      { unit: "j-soc-hist-kaikoku", why: "ペリー来航と開国の流れを中学で学んでいる" },
      { unit: "j-soc-hist-meiji-ishin", why: "廃藩置県・地租改正などの改革を中学で学んでいる" },
      { unit: "h-hist-sogo-18c", why: "江戸時代の対外関係を知ると開国の意味がわかる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kaikoku", why: "和親条約と修好通商条約の中身を区別していない" },
      { i: 1, root: "j-soc-hist-meiji-ishin", why: "廃藩置県で中央から役人を送った点が弱い" },
      { i: 2, root: "j-soc-hist-meiji-ishin", why: "地租改正の地価・現金・所有者を押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-teikoku",
    needs: [
      { unit: "h-hist-sogo-sangyo", why: "工業化した国が原料と市場を求めたことが背景" },
      { unit: "j-soc-hist-rikken", why: "列強の進出と日本の立場を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-teikoku", why: "ファショダ事件の結末を押さえていない" },
      { i: 1, root: "h-hist-sogo-teikoku", why: "独立を保ったアフリカの国を覚えていない" },
      { i: 2, root: "h-hist-sogo-teikoku", why: "帝国主義の原因に複数の見方があると知らない" },
      { i: 3, root: "h-hist-sogo-teikoku", why: "タイの外交による独立の守り方を知らない" },
    ],
  },
  {
    unit: "h-hist-sogo-nisshin",
    needs: [
      { unit: "j-soc-hist-rikken", why: "日清・日露戦争と条約改正を中学で学んでいる" },
      { unit: "h-hist-sogo-teikoku", why: "列強の中国分割が日露の対立の背景になる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-rikken", why: "ポーツマス条約で賠償金がなかった点が弱い" },
      { i: 1, root: "j-soc-hist-rikken", why: "三国干渉で返した場所を中学で押さえていない" },
      { i: 2, root: "j-soc-hist-rikken", why: "条約改正の2段階の順番を押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-ww1",
    needs: [
      { unit: "j-soc-hist-taisho", why: "第一次世界大戦と国際連盟を中学で学んでいる" },
      { unit: "h-hist-sogo-teikoku", why: "列強の対立と同盟関係が大戦の背景になる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-ww1", why: "イタリアが協商国側で参戦したと押さえていない" },
      { i: 1, root: "j-soc-hist-taisho", why: "アメリカが国際連盟に入らなかったことが弱い" },
      { i: 2, root: "j-soc-hist-taisho", why: "民族自決が東欧中心だった点を押さえていない" },
      { i: 3, root: "j-soc-hist-taisho", why: "米騒動の原因と大戦景気を結びつけていない" },
    ],
  },
  {
    unit: "h-hist-sogo-taishu",
    needs: [
      { unit: "h-hist-sogo-ww1", why: "総力戦が大衆の政治参加を広げた" },
      { unit: "j-soc-hist-taisho", why: "大正デモクラシーと普通選挙法を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-taisho", why: "1925年の普通選挙法の対象を押さえていない" },
      { i: 1, root: "j-soc-hist-taisho", why: "最初の政党内閣と本格的政党内閣を区別していない" },
      { i: 2, root: "j-soc-civ-shijo", why: "需要が供給を下回ると売れ残るしくみが弱い" },
    ],
  },
  {
    unit: "h-hist-sogo-kyoko",
    needs: [
      { unit: "j-soc-hist-sekai-taisen", why: "世界恐慌とニューディール・ブロック経済を学んでいる" },
      { unit: "h-hist-sogo-taishu", why: "大量生産・大量消費の行きづまりが恐慌の背景" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sekai-taisen", why: "ソ連が五か年計画で恐慌の影響を受けなかった点" },
      { i: 1, root: "h-hist-sogo-kyoko", why: "金解禁が不況を深めた順序をつかめていない" },
      { i: 2, root: "j-soc-hist-sekai-taisen", why: "ブロック経済が保護貿易だと押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-ww2",
    needs: [
      { unit: "h-hist-sogo-kyoko", why: "恐慌がファシズムと対外進出を生んだ" },
      { unit: "j-soc-hist-sekai-taisen", why: "第二次世界大戦の経過を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sekai-taisen", why: "大戦の始まりがポーランド侵攻だと押さえていない" },
      { i: 1, root: "h-hist-sogo-ww2", why: "宥和政策の中身をつかめていない" },
      { i: 2, root: "h-hist-sogo-ww2", why: "独ソ戦の開始を年表で押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-sengo",
    needs: [
      { unit: "h-hist-sogo-ww2", why: "大戦の反省から戦後の国際秩序がつくられた" },
      { unit: "j-soc-hist-sengo", why: "占領下の民主化と日本国憲法を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sengo", why: "GHQの間接統治のしくみを押さえていない" },
      { i: 1, root: "j-soc-civ-kokusai", why: "安保理の常任理事国の拒否権を押さえていない" },
      { i: 2, root: "j-soc-hist-sengo", why: "農地改革で政府が買い上げたことが弱い" },
      { i: 3, root: "j-soc-civ-kenpo", why: "憲法の公布日と施行日を区別していない" },
    ],
  },
  {
    unit: "h-hist-sogo-reisen",
    needs: [
      { unit: "h-hist-sogo-sengo", why: "占領と国連の成立のあとに冷戦が始まった" },
      { unit: "j-soc-hist-sengo", why: "冷戦とサンフランシスコ平和条約を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-reisen", why: "米ソが直接戦わない「冷たい戦争」の意味が弱い" },
      { i: 1, root: "j-soc-hist-sengo", why: "平和条約に調印しなかった国を押さえていない" },
      { i: 2, root: "h-hist-sogo-reisen", why: "警察予備隊から自衛隊への順を押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-datsu",
    needs: [
      { unit: "h-hist-sogo-reisen", why: "東西対立の中で第三勢力が生まれた" },
      { unit: "h-hist-sogo-teikoku", why: "植民地支配の歴史が独立の背景になる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-datsu", why: "インドとパキスタンの分離独立を押さえていない" },
      { i: 1, root: "h-hist-sogo-datsu", why: "第三勢力の立場と東西陣営を区別していない" },
      { i: 2, root: "h-hist-sogo-datsu", why: "アフリカの年が1960年だと押さえていない" },
    ],
  },
  {
    unit: "h-hist-sogo-kodo",
    needs: [
      { unit: "h-hist-sogo-reisen", why: "独立回復と西側陣営の一員としての歩みが前提" },
      { unit: "j-soc-hist-sengo", why: "高度経済成長と公害を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sengo", why: "高度経済成長の始まりと終わりの年を押さえていない" },
      { i: 1, root: "j-soc-hist-sengo", why: "三種の神器と3Cの中身を区別していない" },
      { i: 2, root: "e-social-5-kogai", why: "四大公害の原因物質と地域を結びつけていない" },
    ],
  },
  {
    unit: "h-hist-sogo-global",
    needs: [
      { unit: "h-hist-sogo-kodo", why: "経済大国となった日本の歩みが前提" },
      { unit: "j-soc-hist-gendai", why: "冷戦の終結とグローバル化を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-gendai", why: "壁の開放とドイツ統一の年を区別していない" },
      { i: 1, root: "j-soc-hist-gendai", why: "冷戦終結とソ連解体の年を区別していない" },
      { i: 2, root: "j-soc-geo-europe", why: "EUの発足とユーロ導入の年を区別していない" },
    ],
  },

  // ───────── 日本史探究 ─────────
  {
    unit: "h-hist-jp-genshi",
    needs: [
      { unit: "j-soc-hist-nihon-naritachi", why: "縄文・弥生と邪馬台国を中学で学んでいる" },
      { unit: "j-soc-hist-toraekata", why: "時代区分と西暦・世紀の数え方が前提" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-nihon-naritachi", why: "縄文土器と稲作の始まりの時期を区別していない" },
      { i: 1, root: "j-soc-hist-nihon-naritachi", why: "青銅器と鉄器の使い道を区別していない" },
      { i: 2, root: "j-soc-hist-nihon-naritachi", why: "邪馬台国の位置に2つの説があると知らない" },
    ],
  },
  {
    unit: "h-hist-jp-kofun",
    needs: [
      { unit: "h-hist-jp-genshi", why: "弥生のクニが古墳時代のヤマト政権につながる" },
      { unit: "j-soc-hist-nihon-naritachi", why: "古墳と大和政権・渡来人を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-jp-kofun", why: "古墳の形の時期による変化を押さえていない" },
      { i: 1, root: "h-hist-jp-kofun", why: "仏教公伝に2つの説があると知らない" },
      { i: 2, root: "h-hist-jp-kofun", why: "姓と役職名を区別していない" },
    ],
  },
  {
    unit: "h-hist-jp-asuka",
    needs: [
      { unit: "h-hist-jp-kofun", why: "豪族の連合と氏姓制度が改革の出発点" },
      { unit: "j-soc-hist-kodai-kokka", why: "聖徳太子・大化の改新・律令を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kodai-kokka", why: "大化改新から大宝律令までの流れを追えていない" },
      { i: 1, root: "h-hist-jp-asuka", why: "律と令の中身を区別していない" },
      { i: 2, root: "h-hist-jp-asuka", why: "壬申の乱で争った人物を押さえていない" },
    ],
  },
  {
    unit: "h-hist-jp-nara",
    needs: [
      { unit: "h-hist-jp-asuka", why: "律令のしくみが奈良時代に動き出す" },
      { unit: "j-soc-hist-kodai-kokka", why: "租調庸と墾田永年私財法を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kodai-kokka", why: "租と調・庸の納め先を区別していない" },
      { i: 1, root: "j-soc-hist-kodai-kokka", why: "三世一身法と墾田永年私財法の順が弱い" },
      { i: 2, root: "h-hist-jp-nara", why: "遷都と大仏造立の年を区別していない" },
    ],
  },
  {
    unit: "h-hist-jp-heian",
    needs: [
      { unit: "h-hist-jp-nara", why: "律令政治のゆらぎが平安の立て直しの背景" },
      { unit: "j-soc-hist-heian", why: "摂関政治と国風文化を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-heian", why: "摂政と関白のちがいを押さえていない" },
      { i: 1, root: "h-hist-jp-heian", why: "遣唐使中止後の民間の交流を知らない" },
      { i: 2, root: "h-hist-jp-heian", why: "受領と郡司の立場を区別していない" },
    ],
  },
  {
    unit: "h-hist-jp-insei",
    needs: [
      { unit: "h-hist-jp-heian", why: "摂関政治のあとに院政が始まる" },
      { unit: "j-soc-hist-heian", why: "院政と武士の成長・平氏政権を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-heian", why: "院政と摂関政治のちがいをつかめていない" },
      { i: 1, root: "h-hist-jp-insei", why: "寄進地系荘園のしくみを押さえていない" },
      { i: 2, root: "h-hist-jp-insei", why: "保元の乱の対立の構図を押さえていない" },
    ],
  },
  {
    unit: "h-hist-jp-kamakura",
    needs: [
      { unit: "h-hist-jp-insei", why: "平氏政権と治承・寿永の乱が幕府成立の背景" },
      { unit: "j-soc-hist-kamakura", why: "御恩と奉公・執権政治・元寇を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-jp-kamakura", why: "幕府成立を段階的にみる見方をつかめていない" },
      { i: 1, root: "j-soc-hist-kamakura", why: "御成敗式目の対象が武家だと押さえていない" },
      { i: 2, root: "h-hist-jp-kamakura", why: "下地中分と地頭請を区別していない" },
    ],
  },
  {
    unit: "h-hist-jp-muromachi",
    needs: [
      { unit: "h-hist-jp-kamakura", why: "鎌倉幕府の滅亡が建武の新政につながる" },
      { unit: "j-soc-hist-muromachi", why: "南北朝・守護大名・応仁の乱を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-muromachi", why: "南朝と北朝の場所を押さえていない" },
      { i: 1, root: "h-hist-jp-muromachi", why: "半済令が守護の権限を強めた点が弱い" },
      { i: 2, root: "j-soc-hist-muromachi", why: "勘合貿易が朝貢形式だったことを知らない" },
    ],
  },
  {
    unit: "h-hist-jp-shokuho",
    needs: [
      { unit: "h-hist-jp-muromachi", why: "応仁の乱と下剋上が戦国大名を生んだ" },
      { unit: "j-soc-hist-tenka-toitsu", why: "信長・秀吉と太閤検地・刀狩を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-jp-shokuho", why: "楽市令を信長以前の大名も出していたと知らない" },
      { i: 1, root: "j-soc-hist-tenka-toitsu", why: "太閤検地で荘園制が解体された意味が弱い" },
      { i: 2, root: "j-soc-hist-tenka-toitsu", why: "バテレン追放令が貿易を禁じなかった点が弱い" },
    ],
  },
  {
    unit: "h-hist-jp-edo-seiritsu",
    needs: [
      { unit: "h-hist-jp-shokuho", why: "兵農分離と全国統一が幕藩体制の土台" },
      { unit: "j-soc-hist-edo-seiritsu", why: "大名統制と「鎖国」を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-jp-edo-seiritsu", why: "老中と大老の役割のちがいを押さえていない" },
      { i: 1, root: "j-soc-hist-edo-seiritsu", why: "四つの口での交流を中学で押さえていない" },
      { i: 2, root: "j-soc-hist-edo-seiritsu", why: "参勤交代が家光の時に制度化された点が弱い" },
    ],
  },
  {
    unit: "h-hist-jp-edo-keizai",
    needs: [
      { unit: "h-hist-jp-edo-seiritsu", why: "年貢米を軸にした幕藩体制が経済の土台" },
      { unit: "j-soc-hist-edo-tenkai", why: "産業・交通・元禄と化政文化を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-jp-edo-keizai", why: "東の金遣いと西の銀遣いを区別していない" },
      { i: 1, root: "j-soc-hist-edo-tenkai", why: "元禄文化と化政文化の中心地を区別していない" },
      { i: 2, root: "h-hist-jp-edo-keizai", why: "西廻り航路と南海路の経路を区別していない" },
    ],
  },
  {
    unit: "h-hist-jp-edo-doyo",
    needs: [
      { unit: "h-hist-jp-edo-keizai", why: "商品経済の発達が幕府財政の悪化の背景" },
      { unit: "j-soc-hist-edo-tenkai", why: "三大改革と田沼の政治を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-jp-edo-doyo", why: "上げ米が大名に課した制度だと押さえていない" },
      { i: 1, root: "j-soc-hist-edo-tenkai", why: "三大改革の人物と田沼を区別していない" },
      { i: 2, root: "h-hist-jp-edo-doyo", why: "異国船打払令から薪水給与令への変化を知らない" },
    ],
  },
  {
    unit: "h-hist-jp-bakumatsu",
    needs: [
      { unit: "h-hist-jp-edo-doyo", why: "外国船の接近と雄藩の成長が開国の背景" },
      { unit: "h-hist-sogo-meiji", why: "開国から明治維新の大きな流れを歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kaikoku", why: "和親条約と修好通商条約の中身を区別していない" },
      { i: 1, root: "j-soc-hist-kaikoku", why: "不平等条約の2つの中身を逆に覚えている" },
      { i: 2, root: "j-soc-hist-meiji-ishin", why: "大政奉還のあとに戊辰戦争が起きた流れが弱い" },
    ],
  },
  {
    unit: "h-hist-jp-meiji",
    needs: [
      { unit: "h-hist-jp-bakumatsu", why: "新政府の成立が明治の改革の出発点" },
      { unit: "j-soc-hist-rikken", why: "自由民権運動と大日本帝国憲法を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-meiji-ishin", why: "版籍奉還と廃藩置県を区別していない" },
      { i: 1, root: "j-soc-hist-meiji-ishin", why: "地租改正の地価・現金・所有者を押さえていない" },
      { i: 2, root: "j-soc-hist-rikken", why: "欽定憲法と民定憲法を区別していない" },
    ],
  },
  {
    unit: "h-hist-jp-nichiro",
    needs: [
      { unit: "h-hist-jp-meiji", why: "立憲国家の成立が条約改正と対外戦争の前提" },
      { unit: "h-hist-sogo-nisshin", why: "日清・日露戦争の大きな流れを歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-nisshin", why: "条約改正の2段階の順番を押さえていない" },
      { i: 1, root: "j-soc-hist-rikken", why: "ポーツマス条約で賠償金がなかった点が弱い" },
      { i: 2, root: "j-soc-hist-rikken", why: "三国干渉で返した場所を中学で押さえていない" },
    ],
  },
  {
    unit: "h-hist-jp-taisho",
    needs: [
      { unit: "h-hist-jp-nichiro", why: "日露戦争後の政治と社会が大正政変の背景" },
      { unit: "h-hist-sogo-taishu", why: "大衆の政治参加と普通選挙を歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-taisho", why: "最初の政党内閣と本格的政党内閣を区別していない" },
      { i: 1, root: "j-soc-hist-taisho", why: "1925年の普通選挙法の対象を押さえていない" },
      { i: 2, root: "j-soc-hist-taisho", why: "民本主義が主権の所在を問わない点が弱い" },
    ],
  },
  {
    unit: "h-hist-jp-senso",
    needs: [
      { unit: "h-hist-jp-taisho", why: "政党政治と協調外交がくずれていく流れ" },
      { unit: "h-hist-sogo-kyoko", why: "世界恐慌と昭和恐慌を歴史総合で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sekai-taisen", why: "五・一五事件と二・二六事件を区別していない" },
      { i: 1, root: "h-hist-sogo-kyoko", why: "金解禁が恐慌を深めた順序をつかめていない" },
      { i: 2, root: "j-soc-hist-sekai-taisen", why: "満州事変と日中戦争のきっかけを区別していない" },
      { i: 3, root: "h-hist-jp-senso", why: "大政翼賛会が政党ではないことを押さえていない" },
    ],
  },
  {
    unit: "h-hist-jp-senryo",
    needs: [
      { unit: "h-hist-jp-senso", why: "敗戦が占領と戦後改革の出発点" },
      { unit: "h-hist-sogo-sengo", why: "占領と民主化の大きな流れを歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-sogo-sengo", why: "GHQの間接統治のしくみを押さえていない" },
      { i: 1, root: "h-hist-jp-senryo", why: "憲法が帝国議会で修正されて成立した点が弱い" },
      { i: 2, root: "j-soc-civ-kenpo", why: "憲法の公布日と施行日を区別していない" },
      { i: 3, root: "h-hist-sogo-reisen", why: "平和条約に調印しなかった国を押さえていない" },
    ],
  },
  {
    unit: "h-hist-jp-kodo",
    needs: [
      { unit: "h-hist-jp-senryo", why: "独立回復と戦後改革が高度成長の土台" },
      { unit: "h-hist-sogo-kodo", why: "高度経済成長の大きな流れを歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sengo", why: "三種の神器と3Cの中身を区別していない" },
      { i: 1, root: "j-soc-hist-sengo", why: "高度成長が石油危機で終わったことが弱い" },
      { i: 2, root: "j-soc-hist-sengo", why: "55年体制が自民党の長期政権だと押さえていない" },
    ],
  },
  {
    unit: "h-hist-jp-gendai",
    needs: [
      { unit: "h-hist-jp-kodo", why: "高度成長の終わりが安定成長期の出発点" },
      { unit: "h-hist-sogo-global", why: "冷戦終結とグローバル化を歴史総合で学ぶ" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-sengo", why: "日中共同声明と平和友好条約の年を区別していない" },
      { i: 1, root: "h-hist-jp-gendai", why: "円高不況と低金利がバブルを生んだ流れが弱い" },
      { i: 2, root: "j-soc-hist-gendai", why: "55年体制の終わりの年を押さえていない" },
    ],
  },

  // ───────── 世界史探究 ─────────
  {
    unit: "h-hist-w-orient",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "四大文明と文字の発明を中学で学んでいる" },
      { unit: "j-soc-hist-toraekata", why: "紀元前の年の数え方と世紀が前提" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-bunmei", why: "文明ごとの文字を区別していない" },
      { i: 1, root: "h-hist-w-orient", why: "アッシリアとアケメネス朝の統一の順が弱い" },
      { i: 2, root: "h-hist-w-orient", why: "フェニキア文字とアラム文字を区別していない" },
    ],
  },
  {
    unit: "h-hist-w-greece",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "ギリシアの民主政とローマ帝国を中学で学んでいる" },
      { unit: "h-hist-w-orient", why: "オリエントやペルシアとの関わりの中で発展した" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-bunmei", why: "民会に参加できた人の範囲を押さえていない" },
      { i: 1, root: "h-hist-w-greece", why: "元首政と専制君主政のちがいをつかめていない" },
      { i: 2, root: "h-hist-w-greece", why: "キリスト教の公認と国教化を区別していない" },
    ],
  },
  {
    unit: "h-hist-w-india",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "インダス文明とシャカの仏教を中学で学んでいる" },
      { unit: "j-soc-geo-asia", why: "南アジアの宗教と自然を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-india", why: "ヴァルナとジャーティの関係をつかめていない" },
      { i: 1, root: "h-hist-w-india", why: "王朝と王の名を結びつけていない" },
      { i: 2, root: "h-hist-w-india", why: "ヒンドゥー教の成り立ちを押さえていない" },
    ],
  },
  {
    unit: "h-hist-w-china-kodai",
    needs: [{ unit: "j-soc-hist-bunmei", why: "中国文明と殷・秦・漢を中学で学んでいる" }],
    mistakes: [
      { i: 0, root: "h-hist-w-china-kodai", why: "周の封建制が血縁にもとづく点が弱い" },
      { i: 1, root: "h-hist-w-china-kodai", why: "郡県制と郡国制の時代を区別していない" },
      { i: 2, root: "h-hist-w-china-kodai", why: "孟子と荀子の人間観を区別していない" },
    ],
  },
  {
    unit: "h-hist-w-tou",
    needs: [
      { unit: "h-hist-w-china-kodai", why: "漢の滅亡のあとに分裂の時代が始まる" },
      { unit: "j-soc-hist-kodai-kokka", why: "隋・唐と遣隋使・遣唐使を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-tou", why: "科挙が始まった王朝を押さえていない" },
      { i: 1, root: "h-hist-w-tou", why: "均田制が北魏に始まったことを知らない" },
      { i: 2, root: "h-hist-w-tou", why: "両税法の取り方を押さえていない" },
    ],
  },
  {
    unit: "h-hist-w-yuboku",
    needs: [
      { unit: "h-hist-w-china-kodai", why: "匈奴と漢の対立など中国との関係が前提" },
      { unit: "j-soc-geo-seikatsu", why: "乾燥地の遊牧とオアシスのくらしを学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-yuboku", why: "遊牧民と定住民の交易の関係をつかめていない" },
      { i: 1, root: "h-hist-w-yuboku", why: "単于と可汗の称号を区別していない" },
      { i: 2, root: "h-hist-w-tou", why: "安史の乱で唐が弱まった流れが弱い" },
    ],
  },
  {
    unit: "h-hist-w-islam",
    needs: [
      { unit: "j-soc-hist-bunmei", why: "ムハンマドとイスラームのおこりを中学で学んでいる" },
      { unit: "h-hist-w-greece", why: "ローマ・ペルシアの後に西アジアの帝国がおこる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-islam", why: "ヒジュラがメディナへの移住だと押さえていない" },
      { i: 1, root: "h-hist-w-islam", why: "ジズヤとハラージュの区別をつかめていない" },
      { i: 2, root: "h-hist-w-islam", why: "スンナ派とシーア派の多数・少数が逆になっている" },
      { i: 3, root: "h-hist-w-islam", why: "カリフとスルタンの役割を区別していない" },
    ],
  },
  {
    unit: "h-hist-w-chusei",
    needs: [
      { unit: "h-hist-w-greece", why: "西ローマ帝国の滅亡が中世ヨーロッパの出発点" },
      { unit: "j-soc-hist-tenka-toitsu", why: "ローマ教会と十字軍を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-chusei", why: "主従関係が双務的な契約だとつかめていない" },
      { i: 1, root: "h-hist-w-chusei", why: "カノッサの屈辱でだれが屈したかが逆" },
      { i: 2, root: "h-hist-w-chusei", why: "十字軍の失敗と教皇権の低下を結べていない" },
    ],
  },
  {
    unit: "h-hist-w-sougen",
    needs: [
      { unit: "h-hist-w-tou", why: "唐の滅亡と五代十国のあとに宋がおこる" },
      { unit: "j-soc-hist-kamakura", why: "モンゴル帝国と元寇を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-sougen", why: "文治主義で軍事が弱かった点を押さえていない" },
      { i: 1, root: "h-hist-w-sougen", why: "北宋と南宋の都を区別していない" },
      { i: 2, root: "j-soc-hist-kamakura", why: "チンギス=ハンとフビライを区別していない" },
    ],
  },
  {
    unit: "h-hist-w-minshin",
    needs: [
      { unit: "h-hist-w-sougen", why: "元の北退のあとに明が成立する" },
      { unit: "j-soc-hist-muromachi", why: "明との勘合貿易と朝貢を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-minshin", why: "明と清の税制を区別していない" },
      { i: 1, root: "j-soc-hist-muromachi", why: "明の朝貢による貿易のしくみが弱い" },
      { i: 2, root: "h-hist-w-minshin", why: "清の漢人統治の硬軟両面を押さえていない" },
    ],
  },
  {
    unit: "h-hist-w-teikoku",
    needs: [{ unit: "h-hist-w-islam", why: "カリフ・スルタンやスンナ派・シーア派が前提" }],
    mistakes: [
      { i: 0, root: "h-hist-w-islam", why: "スンナ派とシーア派の区別が身についていない" },
      { i: 1, root: "h-hist-w-teikoku", why: "アクバルとアウラングゼーブの政策を区別していない" },
      { i: 2, root: "h-hist-w-teikoku", why: "デヴシルメとイェニチェリのしくみを知らない" },
    ],
  },
  {
    unit: "h-hist-w-daikokai",
    needs: [
      { unit: "h-hist-w-chusei", why: "教会の権威と封建社会のゆらぎが背景" },
      { unit: "j-soc-hist-tenka-toitsu", why: "ルネサンス・大航海・宗教改革を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-tenka-toitsu", why: "コロンブスとヴァスコ=ダ=ガマを区別していない" },
      { i: 1, root: "j-soc-hist-tenka-toitsu", why: "マゼランが途中で死んだことを押さえていない" },
      { i: 2, root: "h-hist-w-daikokai", why: "宗派を選べたのが諸侯だと押さえていない" },
    ],
  },
  {
    unit: "h-hist-w-shuken",
    needs: [{ unit: "h-hist-w-daikokai", why: "宗教改革と宗教戦争が主権国家体制を生んだ" }],
    mistakes: [
      { i: 0, root: "h-hist-w-shuken", why: "ウェストファリア条約の結果を押さえていない" },
      { i: 1, root: "h-hist-w-shuken", why: "ナントの王令を出した王と廃止した王が逆" },
      { i: 2, root: "h-hist-w-shuken", why: "重商主義が国の介入する考えだとつかめていない" },
    ],
  },
  {
    unit: "h-hist-w-kakumei",
    needs: [
      { unit: "h-hist-w-shuken", why: "絶対王政への反発から市民革命が起こった" },
      { unit: "j-soc-hist-kaikoku", why: "市民革命と産業革命を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kaikoku", why: "ピューリタン革命と名誉革命の区別があいまい" },
      { i: 1, root: "h-hist-w-kakumei", why: "発明と改良を区別していない" },
      { i: 2, root: "h-hist-w-kakumei", why: "綿工業から機械化が始まったことが弱い" },
    ],
  },
  {
    unit: "h-hist-w-19c",
    needs: [{ unit: "h-hist-w-kakumei", why: "フランス革命とナポレオンのあとの秩序をたどる" }],
    mistakes: [
      { i: 0, root: "h-hist-w-19c", why: "正統主義の考えをつかめていない" },
      { i: 1, root: "h-hist-w-19c", why: "ドイツ統一の中心がプロイセンだと押さえていない" },
      { i: 2, root: "h-hist-w-19c", why: "七月革命と二月革命の年を区別していない" },
      { i: 3, root: "h-hist-w-19c", why: "農奴解放が有償だったことを知らない" },
    ],
  },
  {
    unit: "h-hist-w-teikokushugi",
    needs: [
      { unit: "h-hist-w-19c", why: "国民国家となった列強が植民地を広げていく" },
      { unit: "h-hist-w-minshin", why: "清の体制を知るとアヘン戦争後の変化がわかる" },
      { unit: "h-hist-w-teikoku", why: "オスマン帝国のゆらぎが西アジアの改革の背景" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-kaikoku", why: "アヘン戦争と南京条約を結びつけていない" },
      { i: 1, root: "h-hist-w-teikokushugi", why: "イギリスとフランスの進出方向を区別していない" },
      { i: 2, root: "h-hist-w-teikokushugi", why: "スエズ運河の建設者を押さえていない" },
      { i: 3, root: "h-hist-w-teikokushugi", why: "タイが独立を保ったことを知らない" },
    ],
  },
  {
    unit: "h-hist-w-taisen",
    needs: [
      { unit: "h-hist-w-teikokushugi", why: "列強の対立が第一次世界大戦の背景" },
      { unit: "j-soc-hist-sekai-taisen", why: "世界恐慌と第二次世界大戦を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-taisen", why: "イタリアが協商国側で参戦したと押さえていない" },
      { i: 1, root: "j-soc-hist-taisho", why: "アメリカが国際連盟に入らなかったことが弱い" },
      { i: 2, root: "j-soc-civ-kokusai", why: "国連の多数決と安保理の拒否権が弱い" },
      { i: 3, root: "h-hist-w-taisen", why: "ロシア革命と大戦離脱の関係をつかめていない" },
    ],
  },
  {
    unit: "h-hist-w-reisen",
    needs: [
      { unit: "h-hist-w-taisen", why: "大戦後の米ソの対立から冷戦が始まった" },
      { unit: "j-soc-hist-sengo", why: "冷戦と朝鮮戦争を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "h-hist-w-reisen", why: "米ソが直接戦わない「冷戦」の意味が弱い" },
      { i: 1, root: "j-soc-hist-gendai", why: "冷戦終結とソ連解体の年を区別していない" },
      { i: 2, root: "h-hist-w-reisen", why: "NATOとワルシャワ条約機構の成立順が弱い" },
    ],
  },
  {
    unit: "h-hist-w-gendai",
    needs: [
      { unit: "h-hist-w-reisen", why: "冷戦の終結が現代の国際関係の出発点" },
      { unit: "j-soc-hist-gendai", why: "冷戦後の世界とグローバル化を中学で学んでいる" },
    ],
    mistakes: [
      { i: 0, root: "j-soc-hist-gendai", why: "壁の崩壊とソ連解体の年を区別していない" },
      { i: 1, root: "h-hist-w-gendai", why: "ECSCからEUまでの統合の段階を追えていない" },
      { i: 2, root: "j-soc-geo-europe", why: "EU加盟とユーロ導入が別だと押さえていない" },
      { i: 3, root: "j-soc-civ-chikyu", why: "京都議定書とパリ協定のちがいを整理していない" },
    ],
  },
];
