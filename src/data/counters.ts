export interface Conjugation {
  number: number;
  kanji: string;
  reading: string;
  isSpecial: boolean;
}

export interface Item {
  word: string;
  reading: string;
}

export interface CounterInfo {
  id: string;
  kanji: string;
  emoji: string;
  meaning: string;
  description: string;
  items: Item[];
  conjugations: Conjugation[];
}

export const countersData: CounterInfo[] = [
  {
    id: "hon",
    kanji: "本",
    emoji: "✏️",
    meaning: "Vật thon dài",
    description: "Dùng để đếm các vật dài và thon. (Ví dụ: bút, ô/dù, chuối, cây cối, v.v.)",
    items: [
      { word: "ペン", reading: "ぺん" },
      { word: "傘", reading: "かさ" },
      { word: "バナナ", reading: "ばなな" },
      { word: "木", reading: "き" },
      { word: "鉛筆", reading: "えんぴつ" }
    ],
    conjugations: [
      { number: 1, kanji: "1本", reading: "いっぽん", isSpecial: true },
      { number: 2, kanji: "2本", reading: "にほん", isSpecial: false },
      { number: 3, kanji: "3本", reading: "さんぼん", isSpecial: true },
      { number: 4, kanji: "4本", reading: "よんほん", isSpecial: false },
      { number: 5, kanji: "5本", reading: "ごほん", isSpecial: false },
      { number: 6, kanji: "6本", reading: "ろっぽん", isSpecial: true },
      { number: 7, kanji: "7本", reading: "ななほん", isSpecial: false },
      { number: 8, kanji: "8本", reading: "はっぽん", isSpecial: true },
      { number: 9, kanji: "9本", reading: "きゅうほん", isSpecial: false },
      { number: 10, kanji: "10本", reading: "じゅっぽん", isSpecial: true },
    ],
  },
  {
    id: "ko",
    kanji: "個",
    emoji: "🍎",
    meaning: "Vật nhỏ",
    description: "Dùng để đếm những vật nhỏ, tròn hoặc không có hình dạng cụ thể. (Ví dụ: quả táo, quả trứng, hòn đá, v.v.)",
    items: [
      { word: "りんご", reading: "りんご" },
      { word: "卵", reading: "たまご" },
      { word: "石", reading: "いし" },
      { word: "消しゴム", reading: "けしごむ" },
      { word: "みかん", reading: "みかん" }
    ],
    conjugations: [
      { number: 1, kanji: "1個", reading: "いっこ", isSpecial: true },
      { number: 2, kanji: "2個", reading: "にこ", isSpecial: false },
      { number: 3, kanji: "3個", reading: "さんこ", isSpecial: false },
      { number: 4, kanji: "4個", reading: "よんこ", isSpecial: false },
      { number: 5, kanji: "5個", reading: "ごこ", isSpecial: false },
      { number: 6, kanji: "6個", reading: "ろっこ", isSpecial: true },
      { number: 7, kanji: "7個", reading: "ななこ", isSpecial: false },
      { number: 8, kanji: "8個", reading: "はっこ", isSpecial: true },
      { number: 9, kanji: "9個", reading: "きゅうこ", isSpecial: false },
      { number: 10, kanji: "10個", reading: "じゅっこ", isSpecial: true },
    ],
  },
  {
    id: "hiki",
    kanji: "匹",
    emoji: "🐶",
    meaning: "Động vật nhỏ, cá, côn trùng",
    description: "Dùng để đếm các loài động vật nhỏ, cá, côn trùng. (Ví dụ: chó, mèo, cá, côn trùng, v.v.)",
    items: [
      { word: "犬", reading: "いぬ" },
      { word: "猫", reading: "ねこ" },
      { word: "魚", reading: "さかな" },
      { word: "虫", reading: "むし" },
      { word: "ネズミ", reading: "ねずみ" }
    ],
    conjugations: [
      { number: 1, kanji: "1匹", reading: "いっぴき", isSpecial: true },
      { number: 2, kanji: "2匹", reading: "にひき", isSpecial: false },
      { number: 3, kanji: "3匹", reading: "さんびき", isSpecial: true },
      { number: 4, kanji: "4匹", reading: "よんひき", isSpecial: false },
      { number: 5, kanji: "5匹", reading: "ごひき", isSpecial: false },
      { number: 6, kanji: "6匹", reading: "ろっぴき", isSpecial: true },
      { number: 7, kanji: "7匹", reading: "ななひき", isSpecial: false },
      { number: 8, kanji: "8匹", reading: "はっぴき", isSpecial: true },
      { number: 9, kanji: "9匹", reading: "きゅうひき", isSpecial: false },
      { number: 10, kanji: "10匹", reading: "じゅっぴき", isSpecial: true },
    ],
  },
  {
    id: "mai",
    kanji: "枚",
    emoji: "📄",
    meaning: "Vật mỏng và phẳng",
    description: "Dùng để đếm các vật mỏng và phẳng. (Ví dụ: giấy, áo sơ mi, đĩa, v.v.)",
    items: [
      { word: "紙", reading: "かみ" },
      { word: "シャツ", reading: "しゃつ" },
      { word: "お皿", reading: "おさら" },
      { word: "切手", reading: "きって" },
      { word: "チケット", reading: "ちけっと" }
    ],
    conjugations: [
      { number: 1, kanji: "1枚", reading: "いちまい", isSpecial: false },
      { number: 2, kanji: "2枚", reading: "にまい", isSpecial: false },
      { number: 3, kanji: "3枚", reading: "さんまい", isSpecial: false },
      { number: 4, kanji: "4枚", reading: "よんまい", isSpecial: false },
      { number: 5, kanji: "5枚", reading: "ごまい", isSpecial: false },
      { number: 6, kanji: "6枚", reading: "ろくまい", isSpecial: false },
      { number: 7, kanji: "7枚", reading: "ななまい", isSpecial: false },
      { number: 8, kanji: "8枚", reading: "はちまい", isSpecial: false },
      { number: 9, kanji: "9枚", reading: "きゅうまい", isSpecial: false },
      { number: 10, kanji: "10枚", reading: "じゅうまい", isSpecial: false },
    ],
  },
  {
    id: "nin",
    kanji: "人",
    emoji: "🧑",
    meaning: "Người",
    description: "Dùng để đếm người.",
    items: [
      { word: "男の人", reading: "おとこのひと" },
      { word: "女の人", reading: "おんなのひと" },
      { word: "子供", reading: "こども" },
      { word: "学生", reading: "がくせい" },
      { word: "先生", reading: "せんせい" }
    ],
    conjugations: [
      { number: 1, kanji: "1人", reading: "ひとり", isSpecial: true },
      { number: 2, kanji: "2人", reading: "ふたり", isSpecial: true },
      { number: 3, kanji: "3人", reading: "さんにん", isSpecial: false },
      { number: 4, kanji: "4人", reading: "よにん", isSpecial: true },
      { number: 5, kanji: "5人", reading: "ごにん", isSpecial: false },
      { number: 6, kanji: "6人", reading: "ろくにん", isSpecial: false },
      { number: 7, kanji: "7人", reading: "ななにん", isSpecial: false },
      { number: 8, kanji: "8人", reading: "はちにん", isSpecial: false },
      { number: 9, kanji: "9人", reading: "きゅうにん", isSpecial: false },
      { number: 10, kanji: "10人", reading: "じゅうにん", isSpecial: false },
    ],
  },
  {
    id: "dai",
    kanji: "台",
    emoji: "🚗",
    meaning: "Máy móc và xe cộ",
    description: "Dùng để đếm máy móc hoặc phương tiện giao thông. (Ví dụ: ô tô, xe đạp, tivi, v.v.)",
    items: [
      { word: "車", reading: "くるま" },
      { word: "自転車", reading: "じてんしゃ" },
      { word: "テレビ", reading: "てれび" },
      { word: "パソコン", reading: "ぱそこん" },
      { word: "カメラ", reading: "かめら" }
    ],
    conjugations: [
      { number: 1, kanji: "1台", reading: "いちだい", isSpecial: false },
      { number: 2, kanji: "2台", reading: "にだい", isSpecial: false },
      { number: 3, kanji: "3台", reading: "さんだい", isSpecial: false },
      { number: 4, kanji: "4台", reading: "よんだい", isSpecial: false },
      { number: 5, kanji: "5台", reading: "ごだい", isSpecial: false },
      { number: 6, kanji: "6台", reading: "ろくだい", isSpecial: false },
      { number: 7, kanji: "7台", reading: "ななだい", isSpecial: false },
      { number: 8, kanji: "8台", reading: "はちだい", isSpecial: false },
      { number: 9, kanji: "9台", reading: "きゅうだい", isSpecial: false },
      { number: 10, kanji: "10台", reading: "じゅうだい", isSpecial: false },
    ],
  },
  {
    id: "hai",
    kanji: "杯",
    emoji: "☕",
    meaning: "Đồ uống trong cốc, ly",
    description: "Dùng để đếm đồ uống được đựng trong cốc hoặc ly.",
    items: [
      { word: "水", reading: "みず" },
      { word: "コーヒー", reading: "こーひー" },
      { word: "お茶", reading: "おちゃ" },
      { word: "ジュース", reading: "じゅーす" },
      { word: "ビール", reading: "びーる" }
    ],
    conjugations: [
      { number: 1, kanji: "1杯", reading: "いっぱい", isSpecial: true },
      { number: 2, kanji: "2杯", reading: "にはい", isSpecial: false },
      { number: 3, kanji: "3杯", reading: "さんばい", isSpecial: true },
      { number: 4, kanji: "4杯", reading: "よんはい", isSpecial: false },
      { number: 5, kanji: "5杯", reading: "ごはい", isSpecial: false },
      { number: 6, kanji: "6杯", reading: "ろっぱい", isSpecial: true },
      { number: 7, kanji: "7杯", reading: "ななはい", isSpecial: false },
      { number: 8, kanji: "8杯", reading: "はっぱい", isSpecial: true },
      { number: 9, kanji: "9杯", reading: "きゅうはい", isSpecial: false },
      { number: 10, kanji: "10杯", reading: "じゅっぱい", isSpecial: true },
    ],
  },
  {
    id: "kai",
    kanji: "回",
    emoji: "🔄",
    meaning: "Số lần, tần suất",
    description: "Dùng để đếm số lần hoặc tần suất.",
    items: [
      { word: "旅行", reading: "りょこう" },
      { word: "食事", reading: "しょくじ" },
      { word: "練習", reading: "れんしゅう" },
      { word: "シャワー", reading: "しゃわー" },
      { word: "電話", reading: "でんわ" }
    ],
    conjugations: [
      { number: 1, kanji: "1回", reading: "いっかい", isSpecial: true },
      { number: 2, kanji: "2回", reading: "にかい", isSpecial: false },
      { number: 3, kanji: "3回", reading: "さんかい", isSpecial: false },
      { number: 4, kanji: "4回", reading: "よんかい", isSpecial: false },
      { number: 5, kanji: "5回", reading: "ごかい", isSpecial: false },
      { number: 6, kanji: "6回", reading: "ろっかい", isSpecial: true },
      { number: 7, kanji: "7回", reading: "ななかい", isSpecial: false },
      { number: 8, kanji: "8回", reading: "はっかい", isSpecial: true },
      { number: 9, kanji: "9回", reading: "きゅうかい", isSpecial: false },
      { number: 10, kanji: "10回", reading: "じゅっかい", isSpecial: true },
    ],
  },
  {
    id: "satsu",
    kanji: "冊",
    emoji: "📚",
    meaning: "Sách và vở",
    description: "Dùng để đếm sách, vở và các loại giấy được đóng thành cuốn.",
    items: [
      { word: "本", reading: "ほん" },
      { word: "ノート", reading: "のーと" },
      { word: "雑誌", reading: "ざっし" },
      { word: "辞書", reading: "じしょ" },
      { word: "教科書", reading: "きょうかしょ" }
    ],
    conjugations: [
      { number: 1, kanji: "1冊", reading: "いっさつ", isSpecial: true },
      { number: 2, kanji: "2冊", reading: "にさつ", isSpecial: false },
      { number: 3, kanji: "3冊", reading: "さんさつ", isSpecial: false },
      { number: 4, kanji: "4冊", reading: "よんさつ", isSpecial: false },
      { number: 5, kanji: "5冊", reading: "ごさつ", isSpecial: false },
      { number: 6, kanji: "6冊", reading: "ろくさつ", isSpecial: false },
      { number: 7, kanji: "7冊", reading: "ななさつ", isSpecial: false },
      { number: 8, kanji: "8冊", reading: "はっさつ", isSpecial: true },
      { number: 9, kanji: "9冊", reading: "きゅうさつ", isSpecial: false },
      { number: 10, kanji: "10冊", reading: "じゅっさつ", isSpecial: true },
    ],
  },
  {
    id: "chaku",
    kanji: "着",
    emoji: "👕",
    meaning: "Quần áo",
    description: "Dùng để đếm quần áo, trang phục.",
    items: [
      { word: "シャツ", reading: "しゃつ" },
      { word: "コート", reading: "こーート" },
      { word: "スーツ", reading: "すーつ" },
      { word: "ドレス", reading: "どれす" },
      { word: "制服", reading: "せいふく" }
    ],
    conjugations: [
      { number: 1, kanji: "1着", reading: "いっちゃく", isSpecial: true },
      { number: 2, kanji: "2着", reading: "にちゃく", isSpecial: false },
      { number: 3, kanji: "3着", reading: "さんちゃく", isSpecial: false },
      { number: 4, kanji: "4着", reading: "よんちゃく", isSpecial: false },
      { number: 5, kanji: "5着", reading: "ごちゃく", isSpecial: false },
      { number: 6, kanji: "6着", reading: "ろくちゃく", isSpecial: false },
      { number: 7, kanji: "7着", reading: "ななちゃく", isSpecial: false },
      { number: 8, kanji: "8着", reading: "はっちゃく", isSpecial: true },
      { number: 9, kanji: "9着", reading: "きゅうちゃく", isSpecial: false },
      { number: 10, kanji: "10着", reading: "じゅっちゃく", isSpecial: true },
    ],
  },
  {
    id: "soku",
    kanji: "足",
    emoji: "👟",
    meaning: "Giày và tất",
    description: "Dùng để đếm những thứ mang ở chân. (Một đôi tính là 1 足)",
    items: [
      { word: "靴", reading: "くつ" },
      { word: "靴下", reading: "くつした" },
      { word: "スリッパ", reading: "すりっぱ" },
      { word: "ブーツ", reading: "ぶーつ" },
      { word: "サンダル", reading: "さんだる" }
    ],
    conjugations: [
      { number: 1, kanji: "1足", reading: "いっそく", isSpecial: true },
      { number: 2, kanji: "2足", reading: "にそく", isSpecial: false },
      { number: 3, kanji: "3足", reading: "さんぞく", isSpecial: true },
      { number: 4, kanji: "4足", reading: "よんそく", isSpecial: false },
      { number: 5, kanji: "5足", reading: "ごそく", isSpecial: false },
      { number: 6, kanji: "6足", reading: "ろくそく", isSpecial: false },
      { number: 7, kanji: "7足", reading: "ななそく", isSpecial: false },
      { number: 8, kanji: "8足", reading: "はっそく", isSpecial: true },
      { number: 9, kanji: "9足", reading: "きゅうそく", isSpecial: false },
      { number: 10, kanji: "10足", reading: "じゅっそく", isSpecial: true },
    ],
  },
  {
    id: "ken",
    kanji: "軒",
    emoji: "🏠",
    meaning: "Ngôi nhà",
    description: "Dùng để đếm nhà cửa hoặc các tòa nhà.",
    items: [
      { word: "家", reading: "いえ" },
      { word: "店", reading: "みせ" },
      { word: "レストラン", reading: "れすとらん" },
      { word: "スーパー", reading: "すーぱー" },
      { word: "本屋", reading: "ほんや" }
    ],
    conjugations: [
      { number: 1, kanji: "1軒", reading: "いっけん", isSpecial: true },
      { number: 2, kanji: "2軒", reading: "にけん", isSpecial: false },
      { number: 3, kanji: "3軒", reading: "さんげん", isSpecial: true },
      { number: 4, kanji: "4軒", reading: "よんけん", isSpecial: false },
      { number: 5, kanji: "5軒", reading: "ごけん", isSpecial: false },
      { number: 6, kanji: "6軒", reading: "ろっけん", isSpecial: true },
      { number: 7, kanji: "7軒", reading: "ななけん", isSpecial: false },
      { number: 8, kanji: "8軒", reading: "はっけん", isSpecial: true },
      { number: 9, kanji: "9軒", reading: "きゅうけん", isSpecial: false },
      { number: 10, kanji: "10軒", reading: "じゅっけん", isSpecial: true },
    ],
  },
];
