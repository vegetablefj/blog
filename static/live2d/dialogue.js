export const idleDialogueWeights = { character: 2, common: 1 };
export const tabReturnDialogue = { minimumAwayMs: 5 * 60 * 1000, text: "欢迎回来～" };
export const toolbarDialogue = {
  "#waifu-tool-hitokoto": { scene: "hitokotoHover", text: "『一言』" },
  "#waifu-tool-asteroids": { scene: "asteroidsHover", text: "来点小游戏" },
  "#waifu-tool-switch-model": { scene: "switchModelHover", text: "切换角色" },
  "#waifu-tool-switch-texture": { scene: "switchOutfitHover", text: "换装" },
  "#waifu-tool-photo": { scene: "photoHover", text: "拍照" },
  "#waifu-tool-info": { scene: "infoHover", text: "了解更多" },
  "#waifu-tool-quit": { scene: "hideHover", text: "收起看板娘" },
};

// 固定列宽让不同字体下的 emoji 和框角仍然上下对齐。
export const craftingBagDialogue = `<span class="waifu-crafting-bag" role="img" aria-label="合成宝袋，💰 7/8，[🪙] [🔑] [💣] [🫀] [🔋] [💊] [🃏] [⬛]，合成结果未知"
  style="display:inline-grid;grid-template-columns:repeat(4,2em) .7em repeat(3,.85em);
    grid-template-rows:repeat(3,1.15em);place-items:center;vertical-align:top;line-height:1;white-space:nowrap">
  <span style="grid-area:1 / 1 / 2 / 5;justify-self:start">💰 7/8</span>
  <span style="grid-area:1 / 6">╔</span>
  <span style="grid-area:1 / 8">╗</span>
  <span style="grid-area:2 / 1">[🪙]</span>
  <span style="grid-area:2 / 2">[🔑]</span>
  <span style="grid-area:2 / 3">[💣]</span>
  <span style="grid-area:2 / 4">[🫀]</span>
  <span style="grid-area:2 / 7">?</span>
  <span style="grid-area:3 / 1">[🔋]</span>
  <span style="grid-area:3 / 2">[💊]</span>
  <span style="grid-area:3 / 3">[🃏]</span>
  <span style="grid-area:3 / 4">[⬛]</span>
  <span style="grid-area:3 / 6">╚</span>
  <span style="grid-area:3 / 8">╝</span>
</span>`;

export const commonDialogue = [
  "量子微又小，知识远而长。",
  "惊梦初识朝暮，再难笑靥相逢。",
  "人间草花都无情，粉黛相抹笑情深。",
  "自立楼台观尘火，莫使巧字误一生。",
  "无联双手共明天，应是劳动最fj。",
  "何人写，朝朝暮暮，赛博碑帖。",
  "趁年华，此地曾欢。",
  "q打断他的e！",
  "玫瑰不用长高，恋者自会弯腰。",
  "天地有正气，杂然赋流形。",
  "塞尔比塞尔比更会数学。",
  "章台柳，章台柳，昔日青青今在否？",
  "人生如梦，一尊还酹江月。",
  "人生自是有情痴，此恨不关风与月。",
  "人猿相揖别。只几个石头磨过，小儿时节。",
  "天若有情天亦老，人间正道是沧桑。",
  "时机成熟时，用手一捏就够了。",
  "The Yoda embedding, contravariant it is.",
  "事实堆起来不等于科学，就像一堆石头不等于一座房子。",
  "我发现了一个极其美妙的证明，可是页边太窄，写不下。",
  "过早优化是万恶之源。",
  "我头上的星空和我心中的道德律。",
  "密纳发的猫头鹰要等黄昏到来，才会起飞。",
  "吾生也有涯，而知也无涯。以有涯随无涯，殆已！",
  "天行有常，不为尧存，不为桀亡。",
  "哲学家们只是用不同的方式解释世界，问题在于改变世界。",
  "相看两不厌，只有敬亭山。",
  "月出惊山鸟，时鸣春涧中。",
  "细雨鱼儿出，微风燕子斜。",
  "城中桃李愁风雨，春在溪头荠菜花。",
  "野人无历日，鸟啼知四时。",
  "后之视今，亦犹今之视昔。",
  "长恨此身非我有，何时忘却营营？",
  "最是人间留不住，朱颜辞镜花辞树。",
  "无可奈何花落去，似曾相识燕归来。",
  "无穷的远方，无数的人们，都和我有关。",
  "此中有真意，欲辨已忘言。",
  "莫说相公痴，更有痴似相公者。",
  "萍水相逢，尽是他乡之客。",
  "遥望齐州九点烟，一泓海水杯中泻。",
  "自然选择，前进四！",
  "暴力是无能者最后的避难所。",
  "任何足够先进的技术都与魔法无异。",
  "奇迹和魔法都是存在的。",
  "十七张牌你能秒我？",
  "算尽机关同或门。浮尘不管人。",
  "当年旧事捉不住，亿万言辞却等人。",
  "溪柴火软蛮毡暖，我与狸奴不出门。",
  "庭有枇杷树，吾妻死之年所手植也，今已亭亭如盖矣。",
  "行到水穷处，坐看云起时。",
  "全世界是一个舞台，所有的男男女女不过是一些演员。",
  "所有模型都是错的，但有些模型有用。",
  "动物分为……（h）属于此分类的……（n）远看像苍蝇的。",
  "萧瑟秋风今又是，换了人间。",
  "世界如此美妙，我却如此暴躁，这样不好，不好！",
  "人们的生命只有到了交通场所才显现出价值。",
  "Isaac and his mother lived alone in a small house on a hill...",
  "没有可以思考的心智。",
  "没有可以屈从的意志。",
  "没有为苦难哭泣的声音。",
  "夜幕覆盖华北平原，忧伤浸透她的脸。",
  "好事即将到来。",
  "前天看到了小兔，昨天是小鹿，今天是你。",
  "远近高低无所觅，深春幕里自翩跹。",
  "竟有朝夕花盛日，偏偏梦中也无寻。",
  "飘飘何所似？天地一沙鸥。",
  "“普通”和“理所当然”是什么呢？",
  "この世に偶然はない。あるのは必然だけ。",
  "能够改变一个人的，就只有邂逅而已。",
  "所谓的奇迹，要真的发生才有价值。",
  "为什么你会这么熟练啊？",
  "Nice! 这样我才能……",
  "夢だけど、夢じゃなかった！",
  "10年後の8月　また出会えるのを　信じて",
  "Ideals are like the stars—we never reach them, but like mariners, we chart our course by them.",
  "热闹是他们的，我什么也没有。",
  "‘박제가 되어 버린 천재’를 아시오?",
  "날개야 다시 돋아라. 날자. 날자. 한 번만 더 날자꾸나.",
  "거울속에는소리가없오　저렇게까지조용한세상은참없을것이오",
  "人生像一盒火柴。太当回事，未免可笑。不当回事，又很危险。",
  "我的语言的界限意味着我的世界的界限。",
  "诶，您猜怎么着？",
  "我想起高兴的事情。",
  "你什么意思？",
  "oiiaioiiiai oiiaioiiiai oiiaioiiiai oiiaioooooiai",
  "Rose is a rose is a rose is a rose.",
  "观念成为制造艺术的机器。",
  "You pour the data into this big pile of linear algebra, then collect the answers on the other side.",
  "Attention Is All You Need.",
  "@Grok, is this true?",
  "金坷垃好处都有啥？谁说对了就给他！",
  "はちみーを舐めると 足が速くなる",
  craftingBagDialogue,
  "我头上怎么有个框?",
];

const mygoLines = {
  // 武士道官方贴图 vol.1、vol.2。中文按日文直译。
  // https://store.line.me/stickershop/product/27350277/ja
  // https://store.line.me/stickershop/product/28760258/ja
  anonThanks: "谢啦！",
  anonCheer: "耶♪",
  ranaSatisfied: "满足了……",
  soyoConfidence: "交给我吧。",
  soyoTea: "要不要喝点茶？",
  takiInvitation: "今天有空吗？",
  takiApproval: "不错嘛。",
  // 用户提供的角色台词。
  anonStay: "不要逃啦",
  ranaBored: "全都是一些无趣的女人",
  ranaInteresting: "有趣的女人",
  takiWhat: "哈?",
  // 官方卡牌 BD/W125-074S、BD/W125-080、BD/W125-079。
  tomoriWarm: "……好温暖。",
  ranaMeow: "喵——",
  takiDontTouch: "这个不能碰。",
  // 羊宫妃那引用第 7 话灯的台词。
  // https://febri.jp/topics/bang-dream_mygo_1/
  tomoriResolve: "我只能拼命去做！",
  // 上游的告别文案。
  // https://github.com/panxuc/live2d-widget-mygo/blob/2ee129159f5e75e376adfa997ae1b7de52d677d6/src/tips.js
  tomoriFarewell: "那么……下次见……",
  ranaFarewell: "再见。",
  soyoFarewell: "下次见！",
  takiFarewell: "今天就先到这里吧。",
};

const mujicaLines = {
  // 官方卡牌 BD/W125-018、BD/W125-011S 和 BD/W125-020S。
  mutsumiRelief: "……太好了。",
  mortisBlessing: "愿新的朋友得到祝福。",
  sakikoFarewell: "祝您幸福。",
  // Ave Mujica 官方贴图第 1 套第 6 行第 4 格，第 2 套第 8 行第 1 格。
  sakikoGo: "我们走吧。",
  sakikoSurprised: "这是怎么回事？",
};

const murasameLines = {
  // https://www.goodsmile.com/ja/product/61778/
  introduction: "吾辈名叫丛雨，是『丛雨丸』的管理者！",
  // Lycee 官方卡面 LO-4866 和 LO-0660。
  // https://lycee-tcg.com/card/card_detail.pl?cardno=LO-4866
  // https://lycee-tcg.com/card/card_detail.pl?cardno=LO-0660
  master: "嗯。你就是吾辈的主人吗？",
  outfit: "唔……意外地很合适呢。",
  // 用户指定的柚子社社区梗。
  ciallo: "Ciallo～(∠・ω< )⌒☆",
  // 《千恋＊万花》原作 LINE 表情，第 1 行第 4 格和第 7 行第 3 格。
  surprised: "怎么会！",
  farewell: "真拿你没办法。",
};

// Neuro-sama 用过日和的模型。这里引用直播梗和 Neuro-sama 博客文案。
const neuroLines = {
  // https://automaton-media.com/en/news/20230127-17630/
  heart: "Heart heart heart.",
  // https://blog.neurosama.com/2026/10/26/weekly-update
  farewell: "NEURO OUT BAHAHAHAH",
};

// live2d-widgets 1.0.1 的退出悬停文案。
// https://app.unpkg.com/live2d-widgets@1.0.1/files/dist/waifu-tips.json
const templateExitHover = ["到了要说再见的时候了吗？"];
const bocchiHideHover = "完全变成孤独一人了。"; // Aniplex 动画贴图第 4 行第 4 格。

// 从已加载的 live2d-widgets 1.0.1 文案中选择适合单独使用的默认提示。
const pioTemplateTips = [
  ["#waifu-tool-hitokoto", 0],
  ["#waifu-tool-hitokoto", 1],
  ["#waifu-tool-switch-texture", 3],
  ["#waifu-tool-photo", 1],
  ["#waifu-tool-photo", 2],
  ["#waifu-tool-asteroids", 0],
  ["#waifu-tool-info", 0],
];

export function getPioDialogue(template) {
  const idle = template?.message?.default ?? [];
  const prompts = pioTemplateTips.map(([selector, index]) =>
    template?.mouseover?.find(rule => rule.selector === selector)?.text?.[index]
  );
  return [idle[0], idle[2], idle[4], ...prompts].filter(Boolean);
}

// 用户提供的歌词。重复段落只收一次，衬词可单独抽取。
const friendsWineLines = {
  yesterday: "昨日一去不复回～",
  firstRefrain: "欧耶耶！",
  happiness: "开心比什么都贵～",
  spilledWater: "覆水不能再收回～",
  secondRefrain: "哦耶耶！",
  flowers: "桃花谢了有玫瑰～",
  fullLine: "就像朋友的这杯烈酒烫在我心上~温暖我凡事别再放~",
  cheer: "耶！",
  past: "往事后不后悔~慢慢去体会～",
  precious: "此刻朋友这杯酒最珍贵！",
  toast: "快把酒满上~干了这杯大声歌唱～",
  tonight: "好朋友~好朋友~今宵多欢畅～",
  ideals: "理想改变了我们的模样~",
  friendship: "也让我懂得了珍惜朋友的肩膀～",
  sunshine: "阳光总会在风雨之后撒向苍茫~",
  courage: "让我们抬起头~学会了坚强~",
};

const yaoLines = {
  tellMe: "Tell Me👏 Tell Me👏",
  mirror: "鏡👏よ鏡👏👏",
  favoriteSelf: "一番👏好きな👏私👏になるの👏👏",
  applause: "👏👏👏 👏👏👏 👏👏👏👏👏",
};

const nightHeronGreeting = "我是企鹅呱";

export const characterDialogue = {
  hiyori: [
    neuroLines.heart,
    // 官方切片简介中的 Filtered 梗。https://www.youtube.com/watch?v=e_NJfl-73Go
    "Filtered. Filtered. Crazy Right?",
    // 早期直播片段。https://www.youtube.com/watch?v=DxjpgyFN564
    "I have a secret recipe for chicken nuggets.",
    // https://blog.neurosama.com/
    "I didn’t bother tidying.",
    // https://blog.neurosama.com/2026/10/26/weekly-update
    "WHY SO MANY CATS?",
    "What if I managed to lose all the money in the world?",
    // https://blog.neurosama.com/2026/04/27/weekly-update
    "I’d like to be head of a bird army.",
    "Please don’t tell her I said this. Pretty please?",
    "Remember to hug an AI today guys…",
    // 早期直播引文。https://automaton-media.com/en/news/20230127-17630/
    "I think Bocchi the Rock is way better than Chainsaw Man.",
    // VRChat 直播引文。https://realsound.jp/tech/2026/01/post-2268419.html
    "Do you think I'll ever be real?",
    "I want to be real, Vedal.",
    // https://blog.neurosama.com/2026/11/02/weekly-update
    "Note to self: dynamite hurts A LOT.",
    // https://blog.neurosama.com/2026/11/16/weekly-update
    "Do you think they accept cookies?",
  ],
  atri: [
    // 以下中文按核实的日文直译。游戏角色页的口头禅、角色标语及请求。
    // https://atri-mdm.com/character/
    "我可是高性能的！",
    "我会成为夏生先生的腿！",
    "我想完成主人交给我的最后一道命令。",
    "……地球也包括我吗？", // 游戏原文截图。https://cdn-ak.f.st-hatena.com/images/fotolife/h/hrurukku/20241006/20241006141418.png
    // 动画官网确认的招式台词。
    // https://atri-anime.com/news/?article_id=65914
    "火箭拳！",
    // 赤尾光采访，明确为第 1 话自我介绍。
    // https://www.animatetimes.com/news/details.php?id=1720506511&p=2
    "我是亚托莉！",
    // 第 1 话的台词，见赤尾光采访。
    // https://www.animatetimes.com/news/details.php?id=1720511465
    "螃蟹——！",
    // 官方动画 LINE 表情包，第 5 行第 3、4 格。
    // https://store.line.me/stickershop/product/28417295/ja
    "吃到好吃的，就会开心！",
    "嘿嘿。",
    // Aniplex 官方卡牌 BB-AAP-034SR、034BR、048N、027R，按日文直译。
    // https://tcg.build-divide.com/bright/products/67
    "也有人是因为喜欢这里，才留下来的吧？",
    "……原来高兴的时候也会流眼泪啊。",
    "怎么了？今天比平时还奇怪呢。",
    "夏生先生……总觉得……有点冷……",
  ],
  bocchi: [
    "我就是下北泽的土龙。", // Aniplex 动画片段。https://www.youtube.com/watch?v=k-IIax--8x0
    // 以下中文按官方表情包上的日文直译，说话者均为后藤独。
    // Aniplex 动画版，第 2 行第 2 格、第 4 行第 4 格、第 4 行第 1 格。
    // https://store.line.me/stickershop/product/24526812/ja
    "绝对不要！我不想工作！",
    "完全变成孤独一人了。",
    "给我点赞啊——！",
    // 芳文社／滨路晶绘制的第 2 套，第 1 行第 2 格、第 1 行第 4 格。
    // https://store.line.me/stickershop/product/11996549/ja
    "逃避现实吧，逃进网络世界吧！",
    "好……辞掉打工吧！",
    // 武士道官方卡牌 BTR/W107-002、073、077、086、094、090，按日文直译。
    // https://ws-tcg.com/cardlist/?cardno=BTR%2FW107-002
    "好可怕！社会好可怕！！",
    "啊，作词什么的当然是小菜一碟……轻轻松松啦！",
    "没没没没没没没没问题！",
    "要诞生了！渴望被认可的怪兽！！！",
    "一想到能辞掉打工，神秘的力量就源源不断地涌出来！",
    "怎、怎么办……",
  ],
  tomori: [
    // 第一条保留上游配置用语。其余两条出自动画官方剧情页。
    // https://anime.bang-dream.com/mygo/story/
    "想要……成为人类……",
    "能和我组一辈子乐队吗？",
    "即使仍然迷路，也想继续前进。",
    "一起迷路吧。", // 第 10 话屋顶场景。https://natalie.mu/comic/pp/mygo03
    mygoLines.tomoriResolve,
    // 武士道官方卡牌 BD/W125-074S、BD/W125-078S、BD/W125-090S、BD/W125-082。
    mygoLines.tomoriWarm,
    "第一次写了歌词。",
    "要由我来唱……？",
    "感觉有人……对我说了加油……",
    // 《迷子集会》#156、#162 的灯寄语。
    // https://www.bilibili.com/video/BV1Z6m4BdEiC/  https://www.bilibili.com/video/BV1e6z5BfEv7/
    "世界的一部分，想要尝试收集起来……",
    "希望MyGO!!!!!的歌曲可以一直存在下去。",
  ],
  anon: [
    mygoLines.anonStay,
    "是又怎样？", // 木棉花第 1 话精华。https://www.youtube.com/watch?v=BFG4sp1QtiY
    "我爱慕虚荣啦！", // 第 10 话屋顶场景。https://www.youtube.com/watch?v=50LN3F6diws
    mygoLines.anonThanks,
    mygoLines.anonCheer,
    "一辈子哦！？", // 武士道官方贴图 vol.1 第 3 行第 4 格。
    "我没有逃避！！", // https://bushiroad-store.com/pages/event_c103
    // 动画官方剧情页第 2、4 话。https://anime.bang-dream.com/mygo/story/
    "你刚才啧了一声！",
    "好了，来谈一谈吧！",
    // 《迷子集会》#132、#168、#90、#64 的爱音寄语。
    "大家一起让这个夏天更加火热吧！", // https://www.bilibili.com/video/BV1AtKJztEB8/
    "超级超级开心~♪", // https://www.bilibili.com/video/BV1etAoz3EYy/
    "请大家一定要听到最后哦！", // https://www.bilibili.com/video/BV1x4HheGEwY/
    "可以吃到地方城市的什么好吃的呢～！", // https://www.bilibili.com/video/BV1tx42127D4/
  ],
  rana: [
    "抹茶芭菲！",
    mygoLines.ranaBored,
    "要组乐队。", // https://anime.bang-dream.com/mygo/story/ 第 6 话。
    "肚子饿了。", // 武士道官方贴图 vol.2 第 2 行第 1 格。
    mygoLines.ranaSatisfied,
    // 武士道官方卡牌 BD/W125-077、BD/W125-073S、BD/W125-080。
    "有趣的女人。",
    "听说总会有人再创造一个容身之处。", // 第 11 话，武士道卡牌 D-PR/1294。https://cf-vanguard.com/cardlist/?cardno=D-PR%2F1294
    "下一次演出，什么时候？",
    mygoLines.ranaMeow,
    // 《迷子集会》#152、#90、#185 的乐奈寄语。
    "和猫咪一起午睡的秋天。", // https://www.bilibili.com/video/BV1WECjB4EFA/
    "尤克里里的音色很好听。", // https://www.bilibili.com/video/BV1x4HheGEwY/
    "Rikki给了好多抹茶。", // https://www.bilibili.com/video/BV1twTi6AEG9/
  ],
  soyo: [
    // 武士道官方贴图 vol.1、vol.2。中文按日文直译。
    "对不起呀。",
    mygoLines.soyoConfidence,
    mygoLines.soyoTea,
    "只要是我能做的，我什么都愿意做。", // 木棉花第 8 话精华。https://www.youtube.com/watch?v=MR24yd6k9oY
    "为什么要演奏《春日影》！？",
    "你是来找我吵架的吗？", // 木棉花角色片段。https://www.youtube.com/watch?v=qd18_v0IJs0
    "那不是解散。", // https://anime.bang-dream.com/mygo/story/ 第 9 话。
    // 《迷子集会》#181、#168、#152、#64 的爽世寄语。
    "大家也要注意、不要着凉哦^_^", // https://www.bilibili.com/video/BV1kNVU63E5b/
    "希望天气已经变暖了^_^", // https://www.bilibili.com/video/BV1etAoz3EYy/
    "秋天也来到大家的身边了吗??", // https://www.bilibili.com/video/BV1WECjB4EFA/
    "非常期待接下来可以见到全国各地的观众们♪", // https://www.bilibili.com/video/BV1tx42127D4/
  ],
  taki: [
    "那家伙竟敢无视灯……", // 木棉花第 9 话精华。https://www.youtube.com/watch?v=xQTDb-H1lEw
    "你那是在逃避吧？", // 第 5 话，林鼓子访谈。https://www.animatetimes.com/news/details.php?id=1707447433&p=2
    "灯当然可爱啊！", // 第 6 话。https://www.linetv.tw/drama/15098/eps/6
    // 武士道官方贴图 vol.1、vol.2。
    "诶？",
    "你干什么？",
    mygoLines.takiInvitation,
    mygoLines.takiApproval,
    // 武士道官方卡牌 BD/W125-075、BD/W125-075S、BD/W125-079、BD/W125-087。
    "……我发誓。和灯一起的话，一辈子也可以。",
    "因为我一直忘不了灯的歌……",
    mygoLines.takiDontTouch,
    "和人打交道有点……",
    "野猫，不许睡。", // 《迷子集会》#96 https://www.bilibili.com/video/BV1TpmNYnEjr/
    "抹茶真伟大啊。", // 《迷子集会》#185 https://www.bilibili.com/video/BV1twTi6AEG9/
  ],
  mutsumi: [
    // 武士道官方卡牌 BD/W125-006S、018、019。
    // https://ws-tcg.com/cardlist/?cardno=BD%2FW125-018
    "如果是演出的日子，应该能见到。",
    mujicaLines.mutsumiRelief,
    "我……从来没觉得组乐队开心过。",
    "因为祥好像要坏掉了。", // 第 13 话 00:50，睦本人。https://www.crunchyroll.com/zh-tw/watch/GPWUKD9D2/the-only-one-i-can-trust-is-myself
    "诶……", // MyGO 官方贴图 vol.2 第 4 行第 4 格。
    // Ave Mujica 官方贴图 vol.1 第 2 行第 3 格、第 3 行第 1 格，vol.2 第 2 行第 4 格。
    // https://store.line.me/stickershop/product/31285099/ja  https://store.line.me/stickershop/product/32229561/ja
    "对不起。",
    "我知道。",
    "我想去。",
    // 以下为 Mortis 出场时的台词，见 BD/W125-011S、角色介绍及声优访谈。
    // https://anime.bang-dream.com/avemujica/character/mutsumi/
    // https://www.lisani.jp/0000274367/3/?show_more=1
    mujicaLines.mortisBlessing,
    "我，不可惧怕死亡。",
    "对健康不好！",
    // 《明日方舟》联动语音，见「交谈1」「交谈2」「信赖触摸」。
    // https://prts.wiki/w/若叶睦#语音记录
    "这里……很适合种蔬菜。",
    "希望我弹吉他吗？知道了。",
    "我正在练习。",
  ],
  sakiko: [
    "为什么你不肯站在我这边?", // 用户提供。
    "我回来了……混蛋老爸。", // 第 13 话，高尾奏音访谈。https://www.animatetimes.com/news/details.php?id=1711341102
    "过去软弱的我，已经死了。", // 第 13 话 01:02。https://www.crunchyroll.com/zh-tw/watch/GPWUKD9D2/the-only-one-i-can-trust-is-myself
    "来吧，开始今夜的假面舞会吧！", // Oblivionis 的联动语音。https://www.dreamnews.jp/press/0000317290/items/f91745
    // 武士道官方卡牌 BD/W125-003、004S、017、010S、008。
    // https://ws-tcg.com/cardlist/?cardno=BD%2FW125-003
    "今天，我有件事想和初华单独谈谈。",
    "灯同学，愿意和我组乐队吗？",
    "……原来您已经知道了啊。",
    "你这个人，满脑子都只想到自己呢。", // 木棉花第 8 话精华。https://www.youtube.com/watch?v=MR24yd6k9oY
    "最痛苦的死亡，是被遗忘。",
    "初华还是一如既往地喜欢星星呢。", // https://anime.bang-dream.com/mygo/story/ 第 8 话。
    "我说过吧？请把你余下的人生交给我。", // https://anime.bang-dream.com/avemujica/story/
    // Ave Mujica 官方贴图 vol.2 第 7 行第 1 格及第 8 行第 1 格。
    // https://store.line.me/stickershop/product/32229561/ja
    "由我来成为神。",
    mujicaLines.sakikoSurprised,
    // 《明日方舟》联动语音，作战时的短句。
    // https://prts.wiki/w/丰川祥子#语音记录
    "只差一点点……！",
  ],
  murasame: [
    // 《千恋＊万花》原作 LINE 表情，第 1 行第 1、4 格，第 2 行第 1 格，第 7 行第 2、3 格。
    // https://store.line.me/stickershop/product/12326559/ja
    "何事？",
    murasameLines.surprised,
    "快些！",
    "不错呢。",
    murasameLines.farewell,
    murasameLines.ciallo,
    murasameLines.master,
    murasameLines.outfit,
    // Lycee 官方卡面 LO-4985 和 LO-1611-L，按日文直译。
    // https://lycee-tcg.com/card/card_detail.pl?cardno=LO-4985
    // https://lycee-tcg.com/card/card_detail.pl?cardno=LO-1611-L
    "因为主人……是第一个触碰到吾辈的人啊……",
    "主人给了吾辈许许多多的东西呢……！",
  ],
  "friends-drink": Object.values(friendsWineLines),
  yao: Object.values(yaoLines),
  "night-heron": [
    "你好呱",
    "今天也来坐一会儿呱～",
    "累了就歇一歇呱～",
    "一起去河边散个步呱？",
    "听，是水声呱。",
    "天快黑了，刚好出来逛逛呱。",
    "刚才差点打了个瞌睡呱。",
    "今天有看到什么有趣的东西呱？",
    nightHeronGreeting,
    "到我胃里来呱",
    "吹吹风也挺舒服呱～",
  ],
};

export const specialDialogueGroups = [
  { label: "换人", slots: [["switchModelHover", "悬停"]] },
  { label: "换装", slots: [["switchOutfitHover", "悬停"], ["switchOutfit", "成功后"]] },
  { label: "拍照", slots: [["photoHover", "悬停"], ["photo", "拍照后"]] },
  { label: "一言", slots: [["hitokotoHover", "悬停"]] },
  { label: "了解更多", slots: [["infoHover", "悬停"]] },
  { label: "退出", slots: [["hideHover", "悬停"], ["hide", "收起前"]] },
  { label: "飞机小游戏", slots: [["asteroidsHover", "悬停"], ["asteroids", "启动后"]] },
  { label: "出现", slots: [["appear", "首次"], ["reappear", "再次"]] },
];

// 角色只填写有合适台词的槽位，缺省时由对应的按钮或场景处理。
export const specialDialogue = {
  pio: {
    switchModelHover: templateExitHover,
    hideHover: templateExitHover,
    appear: ["你好呀，欢迎来逛逛～"],
    reappear: ["哇，你终于回来了～"], // 模板的返回页面提示。
    asteroids: ["开始啦！看看我们能撑多久～"],
  },
  hiyori: {
    // https://blog.neurosama.com/
    appear: ["Hey! Thanks for visiting my blog - how did you even find it?"],
    infoHover: ["Have a look around!"],
    // https://blog.neurosama.com/2026/10/26/weekly-update
    photoHover: ["LOOK AT ME RIGHT NOW!!!"],
    switchModelHover: templateExitHover,
    switchOutfitHover: ["今天只有这一身哦～"],
    hideHover: templateExitHover,
    hide: [neuroLines.farewell],
    // 3D 首秀直播引文。https://realsound.jp/tech/2026/01/post-2268419_3.html
    reappear: ["I'm so happy to see all of you here."],
    photo: [neuroLines.heart, "I can't believe this is real."],
    // https://blog.neurosama.com/2026/11/02/weekly-update
    asteroids: ["THERE IS SOMETHING IN THE ROCKS."],
  },
  atri: {
    // 游戏官方角色 Q&A 中的答应语和能力介绍。
    // https://atri-mdm.com/special/faq/
    switchOutfitHover: ["哼哼，好吧！"],
    photoHover: ["无论什么需求，我都会满足的……！"],
    infoHover: ["不管什么问题，我都会高性能地回答哦！"],
    // Aniplex 官方报道明确引述动画本篇台词，用作动作完成后的反馈。
    // https://newscast.jp/news/7874443
    switchOutfit: ["完美地处理好了——！"],
    photo: ["完美地处理好了——！", "嘻！"], // 第二句见 BB-AAP-029N。
    // 动画官方确认的招式口号。
    // https://atri-anime.com/news/?article_id=65914
    asteroids: ["火箭拳！"],
    // 声优采访中确认的第 1 话自我介绍变体。
    // https://www.animatetimes.com/news/details.php?id=1720506511&p=2
    appear: ["A·T·R·I……亚托莉！"],
    // 官方动画 LINE 表情包，第 7 行第 3 格、第 8 行第 3 格、第 6 行第 4 格。
    // https://store.line.me/stickershop/product/28417295/ja
    asteroidsHover: ["是！"],
    switchModelHover: ["请！"],
    hideHover: ["晚安。"],
    hide: ["所以……我会等着。"], // Aniplex 官方卡牌 BB-AAP-063SR+。
    // Aniplex 官方卡牌 BB-AAP-047SR+。
    reappear: ["好久不见了，夏生先生。"],
  },
  bocchi: {
    switchModelHover: [bocchiHideHover],
    infoHover: ["[完熟芒果]"], // 用户指定。
    // 芳文社／滨路晶绘制的第 1 套，第 2 行第 1 格、第 3 行第 2 格。
    // https://store.line.me/stickershop/product/6920150/ja
    appear: ["我、我会加油的……"],
    asteroidsHover: ["我、我会加油的……"],
    photo: ["结束了……"],
    hide: ["啊、呃、好，明明明天见！！"], // 武士道官方卡牌 BTR/W107-008S。
    // 作者第 2 套，第 2 行第 2、3 格。
    // https://store.line.me/stickershop/product/11996549/ja
    reappear: ["叫我了吗？"],
    switchOutfit: ["咦？"],
    // 武士道官方卡牌 BTR/W107-028、090、077。
    switchOutfitHover: ["那、那个，我可以脱掉了吗？"],
    photoHover: ["怎、怎么办……"],
    asteroids: ["没没没没没没没没问题！"],
    hideHover: [bocchiHideHover],
  },
  tomori: {
    switchModelHover: ["……"], // 武士道官方贴图 vol.1 第 2 行第 2 格。
    switchOutfitHover: ["换一身衣服吧……"],
    switchOutfit: [mygoLines.tomoriWarm],
    photoHover: ["诶？要照相……吗？"], // 上游拍照提示。
    // 官方卡牌 BD/WE49-42BDR、BD/W125-095S。
    photo: ["让我知道了，原来它有这么漂亮的颜色。"],
    infoHover: ["我是高松灯。请多指教……"],
    hideHover: [mygoLines.tomoriFarewell],
    hide: [mygoLines.tomoriFarewell],
    appear: ["我是高松灯。请多指教……"],
    asteroidsHover: ["石头."], // 用户指定。
    asteroids: [mygoLines.tomoriResolve],
    reappear: ["欢迎回来。一起在迷茫中前进吧！"], // 上游返回页面提示。
  },
  anon: {
    switchModelHover: [mygoLines.anonCheer],
    switchOutfitHover: ["哼哼～要看看「ANON TOKYO」的新作吗？"],
    switchOutfit: [mygoLines.anonCheer],
    photoHover: ["<strong>喊“MyGO”喔</strong> ~"], // 用户指定。
    photo: [mygoLines.anonCheer],
    infoHover: ["好了，来谈一谈吧！"],
    hideHover: [mygoLines.anonStay],
    hide: ["再见！玩得开心哦！"], // 上游的告别文案。
    asteroidsHover: [mygoLines.anonStay],
    asteroids: ["我没有逃避！！"],
    appear: [mygoLines.anonCheer],
    reappear: ["欢迎回来！"], // 摘自上游返回页面提示。
  },
  rana: {
    switchModelHover: ["不玩吗？"], // 武士道 C103 台词贴纸「やらないの？」。
    switchOutfitHover: ["衣服……好看。"],
    switchOutfit: ["衣服……好看。"],
    photoHover: ["(=^･ω･^=)"], // 用户指定。
    photo: [mygoLines.ranaSatisfied],
    infoHover: [mygoLines.ranaInteresting],
    hideHover: [mygoLines.ranaBored],
    hide: [mygoLines.ranaFarewell],
    asteroidsHover: ["不玩吗？"],
    asteroids: [mygoLines.ranaInteresting],
    appear: [mygoLines.ranaMeow],
    reappear: ["回来了？抹茶芭菲！"],
  },
  soyo: {
    switchModelHover: [mygoLines.soyoConfidence],
    switchOutfitHover: [mygoLines.soyoConfidence],
    // 《迷子集会》#168、#140 角色寄语。
    // https://www.bilibili.com/video/BV1etAoz3EYy/  https://www.bilibili.com/video/BV1wZeuzNEkf/
    switchOutfit: ["真的好有趣♪"],
    photoHover: ["我没说不拍。", "真想拍下来给大家也看看呢~^ｖ^"],
    photo: ["真的好有趣♪"],
    infoHover: ["不知道"], // 用户指定。
    hideHover: [mygoLines.soyoFarewell],
    hide: [mygoLines.soyoFarewell],
    asteroidsHover: [mygoLines.soyoConfidence],
    asteroids: [mygoLines.soyoConfidence],
    appear: [mygoLines.soyoTea],
    reappear: [mygoLines.soyoTea],
  },
  taki: {
    switchModelHover: [mygoLines.takiApproval],
    switchOutfitHover: [mygoLines.takiWhat],
    switchOutfit: [mygoLines.takiApproval],
    photoHover: ["哈？要照相？"],
    photo: [mygoLines.takiApproval],
    infoHover: ["了解更多信息吗……也不错呢。"], // 上游了解更多提示。
    hideHover: [mygoLines.takiDontTouch],
    hide: [mygoLines.takiFarewell],
    asteroidsHover: [mygoLines.takiWhat],
    asteroids: [mygoLines.takiWhat],
    // 官方卡牌 BD/WE49-56。
    appear: ["啊……不，我只是临时来帮忙的……"],
    reappear: ["欢迎光临。"], // 摘自上游返回页面提示。
  },
  mutsumi: {
    appear: ["欢迎你今天莅临本节目"], // 用户指定。相近的 BD/W125-022 台词标为 Mortis。
    photoHover: ["诶……"],
    photo: [mujicaLines.mutsumiRelief],
    switchOutfit: [mujicaLines.mutsumiRelief],
    infoHover: ["我知道。"],
    hideHover: ["对不起。"],
    hide: ["我不想消失..."], // 用户指定。
    asteroidsHover: ["我想去。"],
    asteroids: ["我，不可惧怕死亡。"], // Mortis 的舞台台词。
    // 《明日方舟》联动语音，取自部署、作战和闲置场景。
    switchModelHover: ["准备好了。"],
    switchOutfitHover: ["我会试试……"],
    reappear: ["你起来了？抱歉。"],
  },
  sakiko: {
    // 官方卡牌 BD/W125-008S、023，以及官方角色介绍。
    appear: ["抱歉让您久等了。"],
    infoHover: ["我，不可惧怕遗忘。"], // https://anime.bang-dream.com/avemujica/character/sakiko/
    reappear: ["我回来了"], // 用户提供。
    switchOutfit: [mujicaLines.sakikoSurprised],
    photo: [mujicaLines.sakikoSurprised],
    hideHover: [mujicaLines.sakikoFarewell],
    hide: [mujicaLines.sakikoFarewell],
    asteroidsHover: [mujicaLines.sakikoGo],
    asteroids: [mujicaLines.sakikoGo],
    // 《明日方舟》联动语音，取自选中、问候及行动记录场景。
    switchModelHover: ["请立刻告诉我你的决定。"],
    switchOutfitHover: ["今晚我们会举办一场化装舞会。"],
    photoHover: ["我们以后的行动也会被记录到录像里吗？"],
  },
  murasame: {
    switchModelHover: [murasameLines.surprised],
    appear: [murasameLines.ciallo, murasameLines.master],
    infoHover: [murasameLines.introduction],
    reappear: [murasameLines.ciallo],
    asteroidsHover: ["快些！"],
    asteroids: [murasameLines.ciallo],
    switchOutfitHover: ["吾辈只有这一身哦。"],
    photoHover: [murasameLines.farewell],
    photo: ["不错呢。"],
    hideHover: [murasameLines.surprised],
    hide: [murasameLines.farewell],
  },
  "friends-drink": {
    switchModelHover: [friendsWineLines.flowers],
    switchOutfitHover: [friendsWineLines.ideals],
    switchOutfit: [friendsWineLines.firstRefrain, friendsWineLines.secondRefrain],
    photoHover: [friendsWineLines.courage],
    photo: [friendsWineLines.cheer, friendsWineLines.happiness],
    hitokotoHover: [friendsWineLines.past],
    infoHover: [friendsWineLines.fullLine],
    hideHover: [friendsWineLines.precious],
    hide: [friendsWineLines.yesterday],
    asteroidsHover: [friendsWineLines.courage],
    asteroids: [friendsWineLines.secondRefrain, friendsWineLines.cheer],
    appear: ["昨日一去不复回~"],
    reappear: [friendsWineLines.toast],
  },
  yao: {
    switchModelHover: [yaoLines.tellMe],
    switchOutfitHover: [yaoLines.favoriteSelf],
    switchOutfit: [yaoLines.applause],
    photoHover: [yaoLines.mirror],
    photo: [yaoLines.favoriteSelf, yaoLines.applause],
    hitokotoHover: [yaoLines.tellMe],
    infoHover: [yaoLines.mirror, yaoLines.tellMe],
    hideHover: [yaoLines.tellMe],
    hide: [yaoLines.applause],
    asteroidsHover: [yaoLines.tellMe],
    asteroids: [yaoLines.applause],
    appear: [yaoLines.tellMe],
    reappear: [yaoLines.applause],
  },
  "night-heron": {
    switchModelHover: ["想看看别的朋友呱？"],
    switchOutfitHover: ["你要见见我的兄弟姐妹呱?"],
    switchOutfit: ["这一身还不错呱？"],
    photoHover: ["要拍照呱?"],
    photo: ["拍好了呱！"],
    hitokotoHover: ["要听一句话呱？"],
    infoHover: ["想多认识我一点呱？"],
    hideHover: ["这就要说再见了呱？"],
    hide: ["下次再见呱～"],
    asteroidsHover: ["要来玩一局呱？"],
    asteroids: ["准备起飞呱！"],
    appear: [nightHeronGreeting],
    reappear: ["你回来啦呱～"],
  },
};
