import type { Den } from "@/lib/unizeb/types";

export const DEN_MELANIE_PERKINS: Den = {
  id: "melanie-perkins",
  name: "メラニー・パーキンス",
  yomi: "めらにー ぱーきんす",
  years: "1987年生まれ",
  country: "オーストラリア",
  era: "現代",
  field: "IT・学生起業",
  company: "Fusion Books（2007年）→ Canva",
  title: "大学生のころデザインソフトの難しさに気づき、Canvaを共同で創業した起業家",
  hook: "文化祭のポスターやスライドを、ネットのデザインツールで作ったことはありますか。そのツールの一つ、Canvaの始まりは、大学生がほかの学生にデザインソフトの使い方を教えていた経験でした。そして最初の事業は、意外にも「学校の卒業アルバム」だったのです。",
  sections: [
    {
      heading: "年表：卒業アルバムから、だれでも使えるデザインへ",
      body: "メラニー・パーキンスは、オーストラリア・パースの{{西オーストラリア大学}}で学んでいた2007年（2008年とする資料もある）、クリフ・オブレヒトと{{Fusion Books}}を始めました。その後、キャメロン・アダムスを加えた3人でCanvaを立ち上げ、2013年に公開しました（2012年とする資料もある）。",
      reading: [
        "パーキンスは1987年にオーストラリアで生まれ、西部の都市パースにある西オーストラリア大学で学びました。在学中、ほかの学生にデザインソフトの使い方を教えていて、ソフトの操作を覚えるだけで多くの時間がかかることに気づいたといわれます。2007年、オブレヒトとともに、学校の卒業アルバムをネット上で作れる{{Fusion Books}}を始めました。",
        "Fusion Booksは、学校の卒業アルバムという小さくはっきりした市場で、かんたんなデザインの道具を試す事業でした。Canvaの発表によると、5年ほどでオーストラリア最大の卒業アルバムの会社になり、フランスやニュージーランドにも広がりました。この経験をもとに、パーキンスたちは、卒業アルバムにかぎらず何でもデザインできる道具をめざします。",
        "Canvaには、元Googleのデザイナーだったキャメロン・アダムスが3人目の共同創業者として加わり、製品づくりを受け持ちました。パーキンスはCEO（最高経営責任者）、オブレヒトは会社の運営を受け持つ立場です。2013年5月にベンチャー投資会社などから出資を受け、Canvaは2013年8月に公開されました（Canva自身の発表でも公開は2013年）。2023年には公開から10年を迎え、ロンドンにも拠点を開いています。",
      ],
      figure: {
        type: "timeline",
        title: "メラニー・パーキンスとCanvaの年表",
        events: [
          { year: 1987, label: "オーストラリアに生まれる" },
          { year: 2007, label: "Fusion Booksを共同で始める", key: true },
          { year: 2013, label: "投資会社などから出資を得る" },
          { year: 2013, label: "Canvaを公開", key: true },
          { year: 2014, label: "新たな投資家から資金を得る" },
          { year: 2023, label: "公開から10年を迎える" },
          { year: 2023, label: "ロンドンに拠点を開く" },
        ],
        note: "Canvaの公開年は2013年（Canvaの発表ほか）と2012年（Global Business Hall of Fame）、Fusion Booksの開始は2007年と2008年（AVCJ）で資料が分かれます。",
      },
      cliff: "なぜ最初から何でも作れる道具ではなく、卒業アルバムだったのでしょう。",
    },
    {
      heading: "0→1の場面：教えて気づいた「難しさ」を、小さな市場で解く",
      body: "パーキンスは、デザインソフトを教えるなかで、使い方を覚えるまでが大きな壁になっていると気づきました。その困りごとを、まず{{卒業アルバム}}という具体的な場面にしぼり、ネット上で学生がいっしょに作れる道具にしたのがFusion Booksです。",
      reading: [
        "大学で教えていたのは、プロ向けの画像やレイアウトのソフトでした。機能は多いのですが、使いこなすまでに時間がかかります。パーキンスは、デザインしたい人が、操作を覚えることに多くの時間を取られているという{{困りごと}}に目をとめたとされます。これは、教える立場で多くの学生を見ていたからこそ気づけたことでした。",
        "ただし、いきなり世界中の人向けのデザインツールを作ったわけではありません。最初に選んだのは、学校の卒業アルバムでした。生徒たちがネット上でプロフィールのページや記事をいっしょに作り、できあがったアルバムを印刷して学校に届けるしくみです。2人はお金を借りて、技術者のチームを雇って作ったとされます。",
        "卒業アルバムは、使う人（生徒と学校）、作るもの、締め切りがはっきりしています。だから、かんたんな道具が本当に役に立つのかを確かめやすい場でした。Fusion Booksで得た経験をもとに、パーキンスたちは、何でもデザインできる道具という大きな構想へ進んでいきます。",
      ],
      figure: {
        type: "cause",
        title: "Fusion Booksが生まれたしくみ",
        causes: [
          { label: "ソフトが難しい", sub: "覚えるのに時間がかかる", tone: "red" },
          { label: "教える経験", sub: "学生のつまずきを見る", tone: "blue" },
          { label: "卒業アルバム", sub: "使う人と締め切りが明確", tone: "plain" },
        ],
        effect: { label: "Fusion Books", sub: "2007年にネットで作成", tone: "navy" },
        chain: [
          { label: "国内で広がる", sub: "仏・NZにも展開", tone: "blue" },
          { label: "Canvaの構想", sub: "何でもデザインできる", tone: "yellow" },
        ],
      },
      cliff: "大きな構想を語りはじめた2人を待っていたのは、たくさんの「ノー」でした。",
    },
    {
      heading: "つまずきと立て直し：たくさんの投資家に断られて",
      body: "Canvaの資金を集めるため、パーキンスたちはサンフランシスコで投資家を回りましたが、{{100人をこえる投資家に断られた}}と伝えられます。製品づくりに強い仲間を得てチームを強くし、投資会社などから出資を受けて、公開にこぎつけました。",
      reading: [
        "Canvaの構想を実現するには、大きな開発の資金が必要でした。パーキンスとオブレヒトは、サンフランシスコで多くの投資家に会いましたが、100人をこえる投資家に断られたと伝えられます。西オーストラリア大学の記事によると、海外の会社への投資を望まない投資家が多かったといいます。",
        "立て直しのかぎになったのは、チームを強くする人でした。Googleマップの共同開発者として知られるラース・ラスムッセンが、Googleで部下だったキャメロン・アダムスを2人に紹介しました。デザインとプログラムの両方ができるアダムスが加わったことで、製品を速く作り直せるようになったとされます。2013年には、ベンチャー投資会社のBlackbird Venturesや個人の投資家などから出資を受けています。",
        "断られた回数は、成功のあとから語られると武勇伝のように聞こえます。けれども、断られるたびに何を指摘されたのかを聞き取り、チームや説明を直していくことのほうが大切です。一方で、大きな資金を外から入れると、会社の持ち分や進め方に投資家の意見が入るようになります。資金の集め方には、いつも利点と危うさの両方があります。",
      ],
      figure: {
        type: "flow",
        title: "断られてから公開までの流れ",
        dir: "row",
        steps: [
          { label: "投資家を回る", sub: "サンフランシスコで", tone: "plain" },
          { label: "断られ続ける", sub: "海外の案件は避けたい", tone: "red" },
          { label: "製品づくりの仲間", sub: "アダムスが加わる", tone: "blue" },
          { label: "資金と公開", sub: "2013年に出資と公開", tone: "navy" },
        ],
        arrows: ["断られる", "仲間の紹介", "立て直し"],
        note: "断られた人数は「100人をこえる」とする資料（Wikipedia）によります。西オーストラリア大学の記事は、数百人の投資家に会ったと書いています。",
      },
      cliff: "卒業アルバムとCanvaを並べると、パーキンスのやり方が見えてきます。",
    },
    {
      heading: "パーキンスのやり方を図に：小さく試し、大きく広げる",
      body: "Fusion BooksとCanvaは、同じ{{かんたんなデザインの道具}}という考えを、規模を変えて形にしたものです。まず小さな市場で確かめてから、使う人と作るものの範囲を広げました。",
      reading: [
        "Fusion Booksでは、使う人を学校の生徒にしぼり、作るものも卒業アルバムだけにしました。Canvaでは、使う人をデザインの専門家ではないすべての人に広げ、ポスターやスライドなど何でも作れるようにしました。順番を逆にして、いきなり何でも作れる道具から始めていたら、何が役に立っているのかを確かめにくかったかもしれません。",
        "もちろん、どの起業家にもこのやり方が合うとはかぎりません。小さな市場で時間をかけすぎて、大きな機会を逃すこともあります。それでも、自分が見て知っている困りごとから出発し、確かめられる大きさで試すという考え方は、高校生や大学生が最初の事業を考えるときにも使えます。",
      ],
      figure: {
        type: "compare",
        title: "Fusion BooksとCanvaのちがい",
        columns: [
          { title: "Fusion Books", tone: "blue" },
          { title: "Canva", tone: "navy" },
        ],
        rows: [
          { label: "使う人", cells: ["学校の生徒", "専門家でないすべての人"] },
          { label: "作るもの", cells: ["卒業アルバム", "ポスターやスライドなど"] },
          { label: "広がり", cells: ["豪州からNZ・仏へ", "2023年にロンドンに拠点"] },
        ],
      },
    },
  ],
  skills: [
    {
      card: "z3-02",
      how: "デザインソフトを教えるなかで、操作を覚えるのに時間がかかるという学生の困りごとを見つけました。",
    },
    {
      card: "z3-04",
      how: "何でもデザインできる道具の前に、卒業アルバムにしぼったFusion Booksで、かんたんな道具が役に立つかを確かめました。",
    },
    {
      card: "z7-08",
      how: "断られ続けても投資家への説明をやめず、製品づくりに強い仲間を加えてチームを強くしたうえで、次の出資につなげました。",
    },
  ],
  takeaways: [
    "自分が教えたり手伝ったりしている場面で見える「つまずき」は、事業のたねになる。",
    "大きな夢でも、まず卒業アルバムのような小さく具体的な市場で試すと、役に立つかどうかを確かめやすい。",
    "断られたら、何が足りないと見られたのかを聞き取り、チームや説明を直していく。",
  ],
  check: [
    {
      q: "パーキンスたちがCanvaの前に始めた事業で、ネット上で作れるようにしたものは何ですか。",
      a: "学校の卒業アルバム",
      why: "2007年に始めたFusion Booksは、生徒がネット上で卒業アルバムを作れるサービスでした。",
    },
    {
      q: "投資家探しのころ、ラース・ラスムッセンの紹介でCanvaに加わった共同創業者はだれですか。",
      a: "キャメロン・アダムス",
      why: "Googleでラスムッセンの部下だったデザイナーで、3人目の共同創業者として製品づくりを受け持ちました。",
    },
  ],
  note: "生年（1987年）、Fusion Booksの開始（2007年）、お金を借りてチームを雇い卒業アルバムを印刷して学校に届けたことはGlobal Business Hall of Fame、Fusion Booksがオーストラリア最大の卒業アルバム会社になりフランス・ニュージーランドに広がったこと、3人の役割、公開から10年（2023年）とロンドンの拠点はCanvaの発表（Business Wire、2023年）、ラスムッセンがアダムスを紹介したことと2013年8月の公開はFirst Round Review、2013年5月のBlackbirdの出資はBlackbirdの事例紹介、2014年の資金調達はAVCJの記事によります。Canvaの公開年は2013年（Canvaの公式サイトと発表・First Round Review・AVCJ）と2012年（Global Business Hall of Fame）、Fusion Booksの開始年は2007年（Global Business Hall of Fame）と2008年（AVCJ）で分かれるため、両方を示しました。断られた人数は「と伝えられる」とし、西オーストラリア大学の記事は数百人の投資家に会ったと書いていることを図の注に添えました。Wikipediaにしかなかったこと（大学での専攻、アダムスの参加年、断られた理由のうち技術の経歴、政府の補助金、2016年の多言語対応、2022年の職場向けの道具）は書いていません。存命の人物のため、私生活と家族にはふれず、共同創業者は役割だけを書いています。企業価値・利用者数・売上などの最新の数字は書いていません。本人の言葉は引用していません。",
  sources: [
    {
      title: "Melanie Perkins - Wikipedia",
      url: "https://en.wikipedia.org/wiki/Melanie_Perkins",
      checked: "2026-11-04",
    },
    {
      title: "Melanie Perkins - Global Business Hall of Fame（JA Worldwide）",
      url: "https://businesshalloffame.org/melanie-perkins",
      checked: "2026-11-04",
    },
    {
      title: "About Canva（Canva 公式サイト）",
      url: "https://www.canva.com/about/",
      checked: "2026-11-04",
    },
    {
      title: "Canva Celebrates 10 Years of Empowering the World to Design（Canva、Business Wire、2023年8月28日）",
      url: "https://www.businesswire.com/news/home/20230828160732/en/Canva-Celebrates-10-Years-of-Empowering-the-World-to-Design",
      checked: "2026-11-04",
    },
    {
      title: "Cliff Obrecht talks Canva, start-ups and the road to success（The University of Western Australia、2022年11月22日）",
      url: "https://www.uwa.edu.au/news/article/2022/november/canvas-cliff-obrecht-talks-start-ups",
      checked: "2026-11-04",
    },
    {
      title: "Canva's Path to Product-Market Fit（First Round Review）",
      url: "https://review.firstround.com/canvas-path-to-product-market-fit-2/",
      checked: "2026-11-04",
    },
    {
      title: "Canva's simple design wins VC support（AVCJ、2015年5月12日）",
      url: "https://www.avcj.com/avcj/official-record/51033/canva-s-simple-design-wins-vc-support",
      checked: "2026-11-04",
    },
    {
      title: "Case Study: Canva（Blackbird Ventures の事例紹介、aic.co、2022年2月）",
      url: "https://www.aic.co/AIC/Our-Industry/CaseStudy/Canva/AIC/Our-Industry/CaseStudy/Canva.aspx",
      checked: "2026-11-04",
    },
  ],
};
