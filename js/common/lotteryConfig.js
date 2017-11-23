var arrLines = ["mobile.tlbet6.com","mobile.tlbet8.com","mobile.9tl8.com"];
//首页
var IndexLottery = [
	{
		category:"时时彩",
		lottery: ["12", "71", "14", "86", "73", "90", "56", "44", "43", "66", "58", "48","49"]
	},
	{
		category:"竞速彩",
		lottery:["50","51","53","55"]
	},
	{
		category:"快乐彩",
		lottery:["26","82","83","15","10","9","79","80","81"]
	},
	{
		category:"低频彩",
		lottery:["19","84","17","18"]
	},
	{
		category:"11选5",
		lottery:["61","63","85","4","78","16","5","77"]
	}
];

//Lottery Category
var LC = {
	"ssc":{
		jsffc:{name:"HT 1分彩",lotteryId:"51",logo:"images/ffc.png",type:"ssc"},
		jssfc:{name:"HT 3分彩",lotteryId:"53",logo:"images/3fc.png",type:"ssc"},
		bxwfc:{name:"HT 5分彩",lotteryId:"55",logo:"images/5fc.png",type:"ssc"},
		mmc:{name:"极限秒秒彩",lotteryId:"50",logo:"images/mmc.png",type:"ssc"},
		cqssc:{name:"重庆时时彩",lotteryId:"12",logo:"images/cqssc.png",type:"ssc"},
		tjssc:{name:"天津时时彩",lotteryId:"71",logo:"images/tjssc.png",type:"ssc"},
		xjssc:{name:"新疆时时彩",lotteryId:"14",logo:"images/xjssc.png",type:"ssc"},
		hgydwfc:{name:"老韩国1.5分彩",lotteryId:"72",logo:"images/hgydwfc.png",type:"ssc"},
		blydwfc:{name:"韩国1.5分彩",lotteryId:"56",logo:"images/blydwfc.png",type:"ssc"},
		djydwfc:{name:"东京1.5分彩",lotteryId:"75",logo:"images/djydwfc.png",type:"ssc"},
		twwfc:{name:"台湾五分彩",lotteryId:"73",logo:"images/twwfc.png",type:"ssc"},
		jndsdwfc:{name:"加拿大3.5分彩",lotteryId:"76",logo:"images/jndsdwfc.png",type:"ssc"},
		xjplfc:{name:"新加坡2分彩",lotteryId:"74",logo:"images/xjplfc.png",type:"ssc"},
		txffc:{name:"腾讯分分彩",lotteryId:"57",logo:"images/txffc.png",type:"ssc"},
		qqffc:{name:"QQ分分彩",lotteryId:"58",logo:"images/qqffc.png",type:"ssc"},
		bjssc:{name:"北京时时彩",lotteryId:"86",logo:"images/bjssc.png",type:"ssc"},
		blanydwfc:{name:"菲律宾1.5分彩",lotteryId:"66",logo:"images/blanydwfc.png",type:"ssc"},
		wxydwfc:{name:"微信1.5分彩",lotteryId:"43",logo:"images/wxydwfc.png",type:"ssc"},
		ldydwfc:{name:"巴黎1.5分彩",lotteryId:"44",logo:"images/ldydwfc.png",type:"ssc"},
		tenxffc:{name:"腾讯分分彩",lotteryId:"48",logo:"images/tenxffc.png",type:"ssc"},
		wbffc:{name:"微博分分彩",lotteryId:"49",logo:"images/wbffc.png",type:"ssc"}
	},
	"esf":{
		jsesf:{name:"11选5分分彩",lotteryId:"61",logo:"images/jsesf.png",type:"esf"},
		ksesf:{name:"11选5三分彩",lotteryId:"63",logo:"images/ksesf.png",type:"esf"},
		gdesf:{name:"广东11选5",lotteryId:"4",logo:"images/gd11xuan5.png",type:"esf"},
		jxesf:{name:"江西11选5",lotteryId:"5",logo:"images/jx11xuan5.png",type:"esf"},
		shesf:{name:"上海11选5",lotteryId:"77",logo:"images/sh11xuan5.png",type:"esf"},
		ahesf:{name:"安徽11选5",lotteryId:"78",logo:"images/ah11xuan5.png",type:"esf"},
		sdesf:{name:"山东11选5",lotteryId:"16",logo:"images/sd11xuan5.png",type:"esf"},
		jsuesf:{name:"江苏11选5",lotteryId:"85",logo:"images/jsuesf.png",type:"esf"}
	},
	"sd":{
		fcsd:{name:"福彩3D",lotteryId:"19",logo:"images/fc_sd.png",type:"sd"},
		ffsd:{name:"3D分分彩",lotteryId:"84",logo:"images/ff_sd.png",type:"sd"}
	},
	"pls":{
		pls:{name:"排列三",lotteryId:"17",logo:"images/pl3.png",type:"pls"}
	},
	"plw":{
		plw:{name:"排列五",lotteryId:"18",logo:"images/pl5.png",type:"plw"}
	},
	"ssl":{
		shssl:{name:"上海时时乐",lotteryId:"15",logo:"images/shssl.png",type:"ssl"}
	},
	"kl8":{
		bjklb:{name:"北京快乐8",lotteryId:"9",logo:"images/bjkl8.png",type:"kl8"},
		hgklb:{name:"韩国快乐8",lotteryId:"79",logo:"images/hgkl8.png",type:"kl8"},
		twklb:{name:"台湾快乐8",lotteryId:"80",logo:"images/twkl8.png",type:"kl8"}
	},
	"pks":{
		pks:{name:"北京PK拾",lotteryId:"10",logo:"images/pkshi.png",type:"pks"}
	},
	"k3":{
		jsks:{name:"江苏快3",lotteryId:"26",logo:"images/jsks.png",type:"k3"},
		jlks:{name:"吉林快3",lotteryId:"81",logo:"images/jlks.png",type:"k3"},
		ahks:{name:"安徽快3",lotteryId:"82",logo:"images/ahks.png",type:"k3"},
		hbks:{name:"湖北快3",lotteryId:"83",logo:"images/hbks.png",type:"k3"}
	},
	"tb":{
		jskstb:{name:"江苏骰宝",lotteryId:"21",logo:"images/jsks.png",type:"tb"},
		jlkstb:{name:"吉林骰宝",lotteryId:"87",logo:"images/jlks.png",type:"tb"},
		ahkstb:{name:"安徽骰宝",lotteryId:"88",logo:"images/ahks.png",type:"tb"},
		hbkstb:{name:"湖北骰宝",lotteryId:"89",logo:"images/hbks.png",type:"tb"}
	},
	"klsf":{
		cqklsf:{name:"重庆幸运农场",lotteryId:"90",logo:"images/cqklsf.png",type:"klsf"}
	}
};
//Play Category
var PC = {
	"ssc":{
		playType:[
			{name:"五星",typeId:0},
			{name:"四星",typeId:1},
			{name:"后三",typeId:2},
			{name:"中三",typeId:3},
			{name:"前三",typeId:4},
			{name:"后二",typeId:5},
			{name:"前二",typeId:6},
			{name:"定位胆",typeId:7},
			{name:"不定位",typeId:8},
			{name:"大小单双",typeId:9},
			{name:"任选二",typeId:10},
			{name:"任选三",typeId:11},
			{name:"任选四",typeId:12},
			{name:"趣味",typeId:13},
			{name:"龙虎",typeId:14},
			{name:"骰宝龙虎",typeId:15}
		],

		playMethod:[
			{typeId:0,name:"直选复式", methodId:"01",index:0},
			{typeId:0,name:"直选单式", methodId:"01",index:1},
			{typeId:0,name:"组选120", methodId:"41",index:2},
			{typeId:0,name:"组选60", methodId:"42",index:3},
			{typeId:0,name:"组选30", methodId:"43",index:4},
			{typeId:0,name:"组选20", methodId:"44",index:5},
			{typeId:0,name:"组选10", methodId:"45",index:6},
			{typeId:0,name:"组选5", methodId:"46",index:7},
			{typeId:0,name:"总和大小单双", methodId:"82",index:8},

			{typeId:1,name:"直选复式", methodId:"32",index:9},
			{typeId:1,name:"直选单式", methodId:"32",index:10},
			{typeId:1,name:"组选24", methodId:"51",index:11},
			{typeId:1,name:"组选12", methodId:"52",index:12},
			{typeId:1,name:"组选6", methodId:"53",index:13},
			{typeId:1,name:"组选4", methodId:"54",index:14},

			{typeId:2,name:"直选复式", methodId:"03",index:15},
			{typeId:2,name:"直选单式", methodId:"03",index:16},
			{typeId:2,name:"直选和值", methodId:"04",index:17},
			{typeId:2,name:"直选跨度", methodId:"89",index:18},
			{typeId:2,name:"组三复式", methodId:"05",index:19},
			{typeId:2,name:"组六复式", methodId:"06",index:20},
			{typeId:2,name:"组选和值", methodId:"17",index:21},
			{typeId:2,name:"组选包胆", methodId:"104",index:22},
			{typeId:2,name:"混合组选", methodId:"36",index:23},
			{typeId:2,name:"和值尾数", methodId:"90",index:24},
			{typeId:2,name:"特殊号", methodId:"91",index:25},

			{typeId:3,name:"直选复式", methodId:"25",index:26},
			{typeId:3,name:"直选单式", methodId:"25",index:27},
			{typeId:3,name:"直选和值", methodId:"26",index:28},
			{typeId:3,name:"直选跨度", methodId:"86",index:29},
			{typeId:3,name:"组三复式", methodId:"27",index:30},
			{typeId:3,name:"组六复式", methodId:"28",index:31},
			{typeId:3,name:"组选和值", methodId:"29",index:32},
			{typeId:3,name:"组选包胆", methodId:"105",index:33},
			{typeId:3,name:"混合组选", methodId:"35",index:34},
			{typeId:3,name:"和值尾数", methodId:"87",index:35},
			{typeId:3,name:"特殊号", methodId:"88",index:36},

			{typeId:4,name:"直选复式", methodId:"12",index:37},
			{typeId:4,name:"直选单式", methodId:"12",index:38},
			{typeId:4,name:"直选和值", methodId:"13",index:39},
			{typeId:4,name:"直选跨度", methodId:"83",index:40},
			{typeId:4,name:"组三复式", methodId:"14",index:41},
			{typeId:4,name:"组六复式", methodId:"15",index:42},
			{typeId:4,name:"组选和值", methodId:"16",index:43},
			{typeId:4,name:"组选包胆", methodId:"106",index:44},
			{typeId:4,name:"混合组选", methodId:"34",index:45},
			{typeId:4,name:"和值尾数", methodId:"84",index:46},
			{typeId:4,name:"特殊号", methodId:"85",index:47},

			{typeId:5,name:"直选复式", methodId:"07",index:48},
			{typeId:5,name:"直选单式", methodId:"07",index:49},
			{typeId:5,name:"直选和值", methodId:"08",index:50},
			{typeId:5,name:"直选跨度", methodId:"93",index:51},
			{typeId:5,name:"组选复式", methodId:"09",index:52},
			{typeId:5,name:"组选和值", methodId:"22",index:53},
			{typeId:5,name:"组选包胆", methodId:"107",index:54},

			{typeId:6,name:"直选复式", methodId:"18",index:55},
			{typeId:6,name:"直选单式", methodId:"18",index:56},
			{typeId:6,name:"直选和值", methodId:"19",index:57},
			{typeId:6,name:"直选跨度", methodId:"92",index:58},
			{typeId:6,name:"组选复式", methodId:"20",index:59},
			{typeId:6,name:"组选和值", methodId:"21",index:60},
			{typeId:6,name:"组选包胆", methodId:"108",index:61},

			{typeId:7,name:"定位胆", methodId:"10",index:62},

			{typeId:8,name:"后三一码", methodId:"24",index:63},
			{typeId:8,name:"后三二码", methodId:"71",index:64},
			{typeId:8,name:"前三一码", methodId:"23",index:65},
			{typeId:8,name:"前三二码", methodId:"70",index:66},
			{typeId:8,name:"后四一码", methodId:"74",index:67},
			{typeId:8,name:"后四二码", methodId:"75",index:68},
			{typeId:8,name:"前四一码", methodId:"72",index:69},
			{typeId:8,name:"前四二码", methodId:"73",index:70},
			{typeId:8,name:"五星一码", methodId:"76",index:71},
			{typeId:8,name:"五星二码", methodId:"77",index:72},
			{typeId:8,name:"五星三码", methodId:"78",index:73},

			{typeId:9,name:"后二", methodId:"11",index:74},
			{typeId:9,name:"后三", methodId:"79",index:75},
			{typeId:9,name:"前二", methodId:"80",index:76},
			{typeId:9,name:"前三", methodId:"81",index:77},

			{typeId:10,name:"直选复式", methodId:"37",index:78},
			{typeId:10,name:"直选单式", methodId:"37",index:79},
			{typeId:10,name:"直选和值", methodId:"59",index:80},
			{typeId:10,name:"组选复式", methodId:"60",index:81},
			{typeId:10,name:"组选单式", methodId:"60",index:82},
			{typeId:10,name:"组选和值", methodId:"61",index:83},

			{typeId:11,name:"直选复式", methodId:"38",index:84},
			{typeId:11,name:"直选单式", methodId:"38",index:85},
			{typeId:11,name:"直选和值", methodId:"62",index:86},
			{typeId:11,name:"组三复式", methodId:"39",index:87},
			{typeId:11,name:"组三单式", methodId:"39",index:88},
			{typeId:11,name:"组六复式", methodId:"40",index:89},
			{typeId:11,name:"组六单式", methodId:"40",index:90},
			{typeId:11,name:"混合组选", methodId:"63",index:91},
			{typeId:11,name:"组选和值", methodId:"64",index:92},

			{typeId:12,name:"直选复式", methodId:"65",index:93},
			{typeId:12,name:"直选单式", methodId:"65",index:94},
			{typeId:12,name:"组选24", methodId:"66",index:95},
			{typeId:12,name:"组选12", methodId:"67",index:96},
			{typeId:12,name:"组选6", methodId:"68",index:97},
			{typeId:12,name:"组选4", methodId:"69",index:98},

			{typeId:13,name:"一帆风顺", methodId:"47",index:99},
			{typeId:13,name:"好事成双", methodId:"48",index:100},
			{typeId:13,name:"三星报喜", methodId:"49",index:101},
			{typeId:13,name:"四季发财", methodId:"50",index:102},

			{typeId:14,name:"万千", methodId:"94",index:103},
			{typeId:14,name:"万百", methodId:"95",index:104},
			{typeId:14,name:"万十", methodId:"96",index:105},
			{typeId:14,name:"万个", methodId:"97",index:106},
			{typeId:14,name:"千百", methodId:"98",index:107},
			{typeId:14,name:"千十", methodId:"99",index:108},
			{typeId:14,name:"千个", methodId:"100",index:109},
			{typeId:14,name:"百十", methodId:"101",index:110},
			{typeId:14,name:"百个", methodId:"102",index:111},
			{typeId:14,name:"十个", methodId:"103",index:112},

			{typeId:15,name:"万千", methodId:"109",index:113},
			{typeId:15,name:"万百", methodId:"110",index:114},
			{typeId:15,name:"万十", methodId:"111",index:115},
			{typeId:15,name:"万个", methodId:"112",index:116},
			{typeId:15,name:"千百", methodId:"113",index:117},
			{typeId:15,name:"千十", methodId:"114",index:118},
			{typeId:15,name:"千个", methodId:"115",index:119},
			{typeId:15,name:"百十", methodId:"116",index:120},
			{typeId:15,name:"百个", methodId:"117",index:121},
			{typeId:15,name:"十个", methodId:"118",index:122}
		]
	},
	"esf":{
		playType:[
			{"name":"前三","typeId":0},
			{"name":"前二","typeId":1},
			{"name":"前一","typeId":2},
			{"name":"定位胆","typeId":3},
			{"name":"不定胆","typeId":4},
			{"name":"趣味型","typeId":5},
			{"name":"任选复式","typeId":6},
			{"name":"任选单式","typeId":7},
			{"name":"任选胆拖","typeId":8}
		],
		playMethod:[
			{typeId:0,name:"直选复式", methodId:"11",index:0},
			{typeId:0,name:"直选单式", methodId:"11",index:1},
			{typeId:0,name:"直选组合", methodId:"11",index:2},
			{typeId:0,name:"直选胆拖", methodId:"11",index:3},
			{typeId:0,name:"组选复式", methodId:"12",index:4},
			{typeId:0,name:"组选单式", methodId:"12",index:5},
			{typeId:0,name:"组选胆拖", methodId:"12",index:6},

			{typeId:1,name:"直选复式", methodId:"09",index:7},
			{typeId:1,name:"直选单式", methodId:"09",index:8},
			{typeId:1,name:"直选组合", methodId:"09",index:9},
			{typeId:1,name:"直选胆拖", methodId:"09",index:10},
			{typeId:1,name:"组选复式", methodId:"10",index:11},
			{typeId:1,name:"组选单式", methodId:"10",index:12},
			{typeId:1,name:"组选胆拖", methodId:"10",index:13},

			{typeId:2,name:"直选复式", methodId:"13",index:14},

			{typeId:3,name:"前三位", methodId:"15",index:15},

			{typeId:4,name:"前三位", methodId:"14",index:16},

			{typeId:5,name:"定单双", methodId:"1000",index:17},
			{typeId:5,name:"猜中位", methodId:"1000",index:18},

			{typeId:6,name:"一中一", methodId:"01",index:19},
			{typeId:6,name:"二中二", methodId:"02",index:20},
			{typeId:6,name:"三中三", methodId:"03",index:21},
			{typeId:6,name:"四中四", methodId:"04",index:22},
			{typeId:6,name:"五中五", methodId:"05",index:23},
			{typeId:6,name:"六中五", methodId:"06",index:24},
			{typeId:6,name:"七中五", methodId:"07",index:25},
			{typeId:6,name:"八中五", methodId:"08",index:26},

			{typeId:7,name:"一中一", methodId:"01",index:27},
			{typeId:7,name:"二中二", methodId:"02",index:28},
			{typeId:7,name:"三中三", methodId:"03",index:29},
			{typeId:7,name:"四中四", methodId:"04",index:30},
			{typeId:7,name:"五中五", methodId:"05",index:31},
			{typeId:7,name:"六中五", methodId:"06",index:32},
			{typeId:7,name:"七中五", methodId:"07",index:33},
			{typeId:7,name:"八中五", methodId:"08",index:34},

			{typeId:8,name:"二中二", methodId:"02",index:35},
			{typeId:8,name:"三中三", methodId:"03",index:36},
			{typeId:8,name:"四中四", methodId:"04",index:37},
			{typeId:8,name:"五中五", methodId:"05",index:38},
			{typeId:8,name:"六中五", methodId:"06",index:39},
			{typeId:8,name:"七中五", methodId:"07",index:40},
			{typeId:8,name:"八中五", methodId:"08",index:41}
		]
	},
	"sd":{
		playType:[
			{"name":"三星","typeId":0},
			{"name":"前二","typeId":1},
			{"name":"后二","typeId":2},
			{"name":"定位胆","typeId":3},
			{"name":"不定胆","typeId":4},
			{"name":"大小单双","typeId":5}
		],
		playMethod:[
			{typeId:0,name:"直选复式", methodId:"01",index:0},
			{typeId:0,name:"直选单式", methodId:"01",index:1},
			{typeId:0,name:"直选和值", methodId:"02",index:2},
			{typeId:0,name:"直选跨度", methodId:"1000",index:3},
			{typeId:0,name:"组三", methodId:"03",index:4},
			{typeId:0,name:"组六", methodId:"05",index:5},
			{typeId:0,name:"混合组选", methodId:"16",index:6},
			{typeId:0,name:"组选和值", methodId:"1000",index:7},
			{typeId:0,name:"组选包胆", methodId:"1000",index:8},
			{typeId:0,name:"和值尾数", methodId:"1000",index:9},
			{typeId:0,name:"特殊号码", methodId:"1000",index:10},

			{typeId:1,name:"直选复式", methodId:"09",index:11},
			{typeId:1,name:"直选单式", methodId:"09",index:12},
			{typeId:1,name:"直选和值", methodId:"1000",index:13},
			{typeId:1,name:"直选跨度", methodId:"1000",index:14},
			{typeId:1,name:"组选复式", methodId:"1000",index:15},
			{typeId:1,name:"组选单式", methodId:"1000",index:16},
			{typeId:1,name:"组选和值", methodId:"1000",index:17},
			{typeId:1,name:"组选包胆", methodId:"1000",index:18},

			{typeId:2,name:"直选复式", methodId:"11",index:19},
			{typeId:2,name:"直选单式", methodId:"11",index:20},
			{typeId:2,name:"直选和值", methodId:"1000",index:21},
			{typeId:2,name:"直选跨度", methodId:"1000",index:22},
			{typeId:2,name:"组选复式", methodId:"1000",index:23},
			{typeId:2,name:"组选单式", methodId:"1000",index:24},
			{typeId:2,name:"组选和值", methodId:"1000",index:25},
			{typeId:2,name:"组选包胆", methodId:"1000",index:26},

			{typeId:3,name:"定位胆", methodId:"07",index:27},

			{typeId:4,name:"一码不定胆", methodId:"08",index:28},
			{typeId:4,name:"二码不定胆", methodId:"15",index:29},

			{typeId:5,name:"三星大小单双", methodId:"1000",index:30},
			{typeId:5,name:"前二大小单双", methodId:"1000",index:31},
			{typeId:5,name:"后二大小单双", methodId:"1000",index:32}
		]
	},
	"pls":{
		playType:[
			{"name":"三星","typeId":0},
			{"name":"前二","typeId":1},
			{"name":"后二","typeId":2},
			{"name":"定位胆","typeId":3},
			{"name":"不定胆","typeId":4},
			{"name":"大小单双","typeId":5}
		],
		playMethod:[
			{typeId:0,name:"直选复式", methodId:"01",index:0},
			{typeId:0,name:"直选单式", methodId:"01",index:1},
			{typeId:0,name:"直选和值", methodId:"02",index:2},
			{typeId:0,name:"直选跨度", methodId:"1000",index:3},
			{typeId:0,name:"组三", methodId:"03",index:4},
			{typeId:0,name:"组六", methodId:"05",index:5},
			{typeId:0,name:"组选和值", methodId:"1000",index:6},
			{typeId:0,name:"组选包胆", methodId:"1000",index:7},
			{typeId:0,name:"和值尾数", methodId:"1000",index:8},
			{typeId:0,name:"特殊号码", methodId:"1000",index:9},

			{typeId:1,name:"直选复式", methodId:"09",index:10},
			{typeId:1,name:"直选单式", methodId:"09",index:11},
			{typeId:1,name:"直选和值", methodId:"1000",index:12},
			{typeId:1,name:"直选跨度", methodId:"1000",index:13},
			{typeId:1,name:"组选复式", methodId:"1000",index:14},
			{typeId:1,name:"组选单式", methodId:"1000",index:15},
			{typeId:1,name:"组选和值", methodId:"1000",index:16},
			{typeId:1,name:"组选包胆", methodId:"1000",index:17},

			{typeId:2,name:"直选复式", methodId:"11",index:18},
			{typeId:2,name:"直选单式", methodId:"11",index:19},
			{typeId:2,name:"直选和值", methodId:"1000",index:20},
			{typeId:2,name:"直选跨度", methodId:"1000",index:21},
			{typeId:2,name:"组选复式", methodId:"1000",index:22},
			{typeId:2,name:"组选单式", methodId:"1000",index:23},
			{typeId:2,name:"组选和值", methodId:"1000",index:24},
			{typeId:2,name:"组选包胆", methodId:"1000",index:25},

			{typeId:3,name:"定位胆", methodId:"07",index:26},

			{typeId:4,name:"一码不定胆", methodId:"08",index:27},
			{typeId:4,name:"二码不定胆", methodId:"15",index:28},

			{typeId:5,name:"三星大小单双", methodId:"16",index:29},
			{typeId:5,name:"前二大小单双", methodId:"16",index:30},
			{typeId:5,name:"后二大小单双", methodId:"16",index:31}
		]
	},
	"plw":{
		playType:[
			{"name":"五星","typeId":0},
			{"name":"定位胆","typeId":1},
			{"name":"不定胆","typeId":2}
		],
		playMethod:[
			{typeId:0,name:"直选复式", methodId:"01",index:0},
			{typeId:0,name:"直选单式", methodId:"01",index:1},
			{typeId:1,name:"定位胆", methodId:"02",index:2},
			{typeId:2,name:"一码", methodId:"03",index:3}
		]
	},
	"ssl":{
		playType:[
			{"name":"三星","typeId":0},
			{"name":"前二","typeId":1},
			{"name":"后二","typeId":2},
			{"name":"前一","typeId":3},
			{"name":"后一","typeId":4}],
		playMethod:[
			{typeId:0,name:"直选复式", methodId:"01",index:0},
			{typeId:0,name:"直选单式", methodId:"01",index:1},
			{typeId:0,name:"直选和值", methodId:"03",index:2},
			{typeId:0,name:"组三", methodId:"04",index:3},
			{typeId:0,name:"组六", methodId:"06",index:4},

			{typeId:1,name:"直选复式", methodId:"08",index:5},
			{typeId:1,name:"直选单式", methodId:"08",index:6},
			{typeId:1,name:"直选和值", methodId:"12",index:7},
			{typeId:1,name:"组选复式", methodId:"13",index:8},
			{typeId:1,name:"组选单式", methodId:"13",index:9},

			{typeId:2,name:"直选复式", methodId:"09",index:10},
			{typeId:2,name:"直选单式", methodId:"09",index:11},
			{typeId:2,name:"直选和值", methodId:"14",index:12},
			{typeId:2,name:"组选复式", methodId:"15",index:13},
			{typeId:2,name:"组选单式", methodId:"15",index:14},

			{typeId:3,name:"直选复式", methodId:"10",index:15},

			{typeId:4,name:"直选复式", methodId:"11",index:16}
		]
	},
	"kl8":{
		playType:[
			{"name":"任选","typeId":0},
			{"name":"趣味","typeId":1},
			{"name":"五行","typeId":2}],
		playMethod:[
			{typeId:0,name:"任选1", methodId:"01",index:0},
			{typeId:0,name:"任选2", methodId:"02",index:1},
			{typeId:0,name:"任选3", methodId:"03",index:2},
			{typeId:0,name:"任选4", methodId:"04",index:3},
			{typeId:0,name:"任选5", methodId:"05",index:4},
			{typeId:0,name:"任选6", methodId:"06",index:5},
			{typeId:0,name:"任选7", methodId:"07",index:6},

			{typeId:1,name:"上下盘", methodId:"14",index:7},
			{typeId:1,name:"奇偶盘", methodId:"13",index:8},
			{typeId:1,name:"和值大小", methodId:"12",index:9},
			{typeId:1,name:"和值单双", methodId:"11",index:10},
			{typeId:1,name:"和值大小单双", methodId:"15",index:11},

			{typeId:2,name:"五行", methodId:"16",index:12}
		]
	},
	"pks":{
		playType:[
			{"name":"猜冠军","typeId":0},
			{"name":"猜冠亚军","typeId":1},
			{"name":"猜前三名","typeId":2},
			{"name":"定位胆","typeId":3},
			{"name":"大小","typeId":4},
			{"name":"单双","typeId":5},
			{"name":"龙虎","typeId":6}
		],
		playMethod:[
			{typeId:0,name:"猜冠军", methodId:"11",index:0},

			{typeId:1,name:"复式", methodId:"12",index:1},
			{typeId:1,name:"单式", methodId:"12",index:2},

			{typeId:2,name:"复式", methodId:"13",index:3},
			{typeId:2,name:"单式", methodId:"13",index:4},

			{typeId:3,name:"1~5名", methodId:"14",index:5},
			{typeId:3,name:"6~10名", methodId:"15",index:6},

			{typeId:4,name:"冠军", methodId:"16",index:7},
			{typeId:4,name:"亚军", methodId:"17",index:8},
			{typeId:4,name:"季军", methodId:"18",index:9},

			{typeId:5,name:"冠军", methodId:"19",index:10},
			{typeId:5,name:"亚军", methodId:"20",index:11},
			{typeId:5,name:"季军", methodId:"21",index:12},

			{typeId:6,name:"冠亚军", methodId:"22",index:13},
			{typeId:6,name:"冠季军", methodId:"23",index:14},
			{typeId:6,name:"亚季军", methodId:"24",index:15}
		]
	},
	"k3":{
		playType:[
			{"name":"和值","typeId":0},
			{"name":"三同号","typeId":1},
			{"name":"三不同号","typeId":2},
			{"name":"三连号","typeId":3},
			{"name":"二同号","typeId":4},
			{"name":"二不同号","typeId":5},
			{"name":"单挑一骰","typeId":6}],
		playMethod:[
			{typeId:0,name:"和值", methodId:"01",index:0},
			{typeId:0,name:"大小单双", methodId:"18",index:1},

			{typeId:1,name:"单选", methodId:"03",index:2},
			{typeId:1,name:"通选", methodId:"02",index:3},

			{typeId:2,name:"标准", methodId:"06",index:4},
			{typeId:2,name:"胆拖", methodId:"06",index:5},

			{typeId:3,name:"通选", methodId:"08",index:6},

			{typeId:4,name:"单选", methodId:"05",index:7},
			{typeId:4,name:"复选", methodId:"04",index:8},

			{typeId:5,name:"标准", methodId:"07",index:9},
			{typeId:5,name:"胆拖", methodId:"07",index:10},

			{typeId:6,name:"单挑一骰", methodId:"09",index:11}
		]
	},
	"tb":{
		playType:[
			{"name":"和值","typeId":0},
			{"name":"三同号","typeId":1},
			{"name":"二同号","typeId":2},
			{"name":"二不同号","typeId":3},
			{"name":"猜一个号","typeId":4},
			{"name":"和值","typeId":5}],
		playMethod:[
			{typeId:0,name:"和值", methodId:"10",index:0},

			{typeId:1,name:"单选", methodId:"11",index:1},
			{typeId:1,name:"通选", methodId:"12",index:2},

			{typeId:2,name:"复选", methodId:"13",index:3},
			{typeId:3,name:"二不同号", methodId:"14",index:4},

			{typeId:4,name:"猜一个号", methodId:"15",index:5},

			{typeId:5,name:"大小", methodId:"16",index:6},
			{typeId:5,name:"单双", methodId:"17",index:7}
		]
	},
	"klsf":{
		playType:[
            {"name":"三星","typeId":0},
            {"name":"二星","typeId":1},
            {"name":"定位胆","typeId":2},
            {"name":"任选复式","typeId":3},
            {"name":"任选胆拖","typeId":4},
            {"name":"大小单双","typeId":5},
            {"name":"四季方位","typeId":6},
            {"name":"五行","typeId":7},
            {"name":"龙虎","typeId":8}
		],
		playMethod:[
            {typeId:0,name:"前三直选", methodId:"01",index:0},
            {typeId:0,name:"后三直选", methodId:"02",index:1},
            {typeId:0,name:"前三组选", methodId:"03",index:2},
            {typeId:0,name:"后三组选", methodId:"04",index:3},

            {typeId:1,name:"二星直选", methodId:"05",index:4},
            {typeId:1,name:"二星组选", methodId:"06",index:5},

            {typeId:2,name:"第一位", methodId:"07",index:6},
            {typeId:2,name:"第二位", methodId:"08",index:7},
            {typeId:2,name:"第三位", methodId:"09",index:8},
            {typeId:2,name:"第四位", methodId:"10",index:9},
            {typeId:2,name:"第五位", methodId:"11",index:10},
            {typeId:2,name:"第六位", methodId:"12",index:11},
            {typeId:2,name:"第七位", methodId:"13",index:12},
            {typeId:2,name:"第八位", methodId:"14",index:13},

            {typeId:3,name:"一中一", methodId:"15",index:14},
            {typeId:3,name:"二中二", methodId:"16",index:15},
            {typeId:3,name:"三中三", methodId:"17",index:16},
            {typeId:3,name:"四中四", methodId:"18",index:17},
            {typeId:3,name:"五中五", methodId:"19",index:18},

            {typeId:4,name:"二中二", methodId:"16",index:19},
            {typeId:4,name:"三中三", methodId:"17",index:20},
            {typeId:4,name:"四中四", methodId:"18",index:21},
            {typeId:4,name:"五中五", methodId:"19",index:22},

            {typeId:5,name:"大小单双", methodId:"20",index:23},
            {typeId:5,name:"大小和", methodId:"21",index:24},

            {typeId:6,name:"四季方位", methodId:"22",index:25},

            {typeId:7,name:"五行", methodId:"23",index:26},

            {typeId:8,name:"龙", methodId:"24",index:27},
            {typeId:8,name:"虎", methodId:"25",index:28}
		]
	}
};

var LotteryId = {
	"4":{tag:"gdesf",type:"esf",name:"广东11选5"},
	"5":{tag:"jxesf",type:"esf",name:"江西11选5"},
	"16":{tag:"sdesf",type:"esf",name:"山东11选5"},
	"61":{tag:"jsesf",type:"esf",name:"11选5分分彩"},
	"63":{tag:"ksesf",type:"esf",name:"11选5三分彩"},
	"77":{tag:"shesf",type:"esf",name:"上海11选5"},
	"78":{tag:"ahesf",type:"esf",name:"安徽11选5"},
	"85":{tag:"jsuesf",type:"esf",name:"江苏11选5"},

	"12":{tag:"cqssc",type:"ssc",name:"重庆时时彩"},
	"14":{tag:"xjssc",type:"ssc",name:"新疆时时彩"},
	"56":{tag:"blydwfc",type:"ssc",name:"韩国1.5分彩"},
	"71":{tag:"tjssc",type:"ssc",name:"天津时时彩"},
	"72":{tag:"hgydwfc",type:"ssc",name:"老韩国1.5分彩"},
	"73":{tag:"twwfc",type:"ssc",name:"台湾五分彩"},
	"74":{tag:"xjplfc",type:"ssc",name:"新加坡2分彩"},
	"75":{tag:"djydwfc",type:"ssc",name:"东京1.5分彩"},
	"76":{tag:"jndsdwfc",type:"ssc",name:"加拿大3.5分彩"},
	"50":{tag:"mmc",type:"ssc",name:"极限秒秒彩"},
	"51":{tag:"jsffc",type:"ssc",name:"HT 1分彩"},
	"53":{tag:"jssfc",type:"ssc",name:"HT 3分彩"},
	"55":{tag:"bxwfc",type:"ssc",name:"HT 5分彩"},
	"57":{tag:"txffc",type:"ssc",name:"腾讯分分彩"},
	"58":{tag:"qqffc",type:"ssc",name:"QQ分分彩"},
	"86":{tag:"bjssc",type:"ssc",name:"北京时时彩"},
	"66":{tag:"blanydwfc",type:"ssc",name:"菲律宾1.5分彩"},
	"43":{tag:"wxydwfc",type:"ssc",name:"微信1.5分彩"},
	"44":{tag:"ldydwfc",type:"ssc",name:"巴黎1.5分彩"},
	"48":{tag:"tenxffc",type:"ssc",name:"腾讯分分彩"},
	"49":{tag:"wbffc",type:"ssc",name:"微博分分彩"},

	"9":{tag:"bjklb",type:"kl8",name:"北京快乐8"},
	"79":{tag:"hgklb",type:"kl8",name:"韩国快乐8"},
	"80":{tag:"twklb",type:"kl8",name:"台湾快乐8"},

	"10":{tag:"pks",type:"pks",name:"北京PK拾"},
	"15":{tag:"shssl",type:"ssl",name:"上海时时乐"},
	"17":{tag:"pls",type:"pls",name:"排列三"},
	"18":{tag:"plw",type:"plw",name:"排列五"},
	"84":{tag:"ffsd",type:"sd",name:"3D分分彩"},
	"19":{tag:"fcsd",type:"sd",name:"福彩3D"},

	"26":{tag:"jsks",type:"k3",name:"江苏快3"},
	"81":{tag:"jlks",type:"k3",name:"吉林快3"},
	"82":{tag:"ahks",type:"k3",name:"安徽快3"},
	"83":{tag:"hbks",type:"k3",name:"湖北快3"},
	"21":{tag:"jskstb",type:"tb",name:"江苏骰宝"},
	"87":{tag:"jlkstb",type:"tb",name:"吉林骰宝"},
	"88":{tag:"ahkstb",type:"tb",name:"安徽骰宝"},
	"89":{tag:"hbkstb",type:"tb",name:"湖北骰宝"},
	"90":{tag:"cqklsf",type:"klsf",name:"重庆幸运农场"}
};

var LotteryTag = {
	"ahesf":{id:"78",type:"esf",name:"安徽11选5"},
	"jsesf":{id:"61",type:"esf",name:"11选5分分彩"},
	"ksesf":{id:"63",type:"esf",name:"11选5三分彩"},
	"gdesf":{id:"4",type:"esf",name:"广东11选5"},
	"shesf":{id:"77",type:"esf",name:"上海11选5"},
	"jxesf":{id:"5",type:"esf",name:"江西11选5"},
	"sdesf":{id:"16",type:"esf",name:"山东11选5"},
	"jsuesf":{id:"85",type:"esf",name:"江苏11选5"},

	"mmc":{id:"50",type:"ssc",name:"极限秒秒彩"},
	"jsffc":{id:"51",type:"ssc",name:"HT 1分彩"},
	"jssfc":{id:"53",type:"ssc",name:"HT 3分彩"},
	"bxwfc":{id:"55",type:"ssc",name:"HT 5分彩"},
	"cqssc":{id:"12",type:"ssc",name:"重庆时时彩"},
	"xjssc":{id:"14",type:"ssc",name:"新疆时时彩"},
	"tjssc":{id:"71",type:"ssc",name:"天津时时彩"},
	"hgydwfc":{id:"72",type:"ssc",name:"老韩国1.5分彩"},
	"blydwfc":{id:"56",type:"ssc",name:"韩国1.5分彩"},
	"twwfc":{id:"73",type:"ssc",name:"台湾五分彩"},
	"djydwfc":{id:"75",type:"ssc",name:"东京1.5分彩"},
	"jndsdwfc":{id:"76",type:"ssc",name:"加拿大3.5分彩"},
	"xjplfc":{id:"74",type:"ssc",name:"新加坡2分彩"},
	"txffc":{id:"57",type:"ssc",name:"腾讯分分彩"},
	"qqffc":{id:"58",type:"ssc",name:"QQ分分彩"},
	"bjssc":{id:"86",type:"ssc",name:"北京时时彩"},
	"blanydwfc":{id:"66",type:"ssc",name:"菲律宾1.5分彩"},
	"wxydwfc":{id:"43",type:"ssc",name:"微信1.5分彩"},
	"ldydwfc":{id:"44",type:"ssc",name:"巴黎1.5分彩"},
	"tenxffc":{id:"48",type:"ssc",name:"腾讯分分彩"},
	"wbffc":{id:"49",type:"ssc",name:"微博分分彩"},

	"bjklb":{id:"9",type:"kl8",name:"北京快乐8"},
	"hgklb":{id:"79",type:"kl8",name:"韩国快乐8"},
	"twklb":{id:"80",type:"kl8",name:"台湾快乐8"},

	"pks":{id:"10",type:"pks",name:"北京PK拾"},
	"shssl":{id:"15",type:"ssl",name:"上海时时乐"},
	"pls":{id:"17",type:"pls",name:"排列三"},
	"plw":{id:"18",type:"plw",name:"排列五"},
	"ffsd":{id:"84",type:"sd",name:"3D分分彩"},
	"fcsd":{id:"19",type:"sd",name:"福彩3D"},

	"jsks":{id:"26",type:"k3",name:"江苏快3"},
	"jlks":{id:"81",type:"k3",name:"吉林快3"},
	"ahks":{id:"82",type:"k3",name:"安徽快3"},
	"hbks":{id:"83",type:"k3",name:"湖北快3"},
	"jskstb":{id:"21",type:"tb",name:"江苏骰宝"},
	"jlkstb":{id:"87",type:"tb",name:"吉林骰宝"},
	"ahkstb":{id:"88",type:"tb",name:"安徽骰宝"},
	"hbkstb":{id:"89",type:"tb",name:"湖北骰宝"},
	"cqklsf":{id:"90",type:"klsf",name:"重庆幸运农场"}
};

var LotteryStorage = {
	"fcsd" : {"line1" : [] , "line2" : [] , "line3" : []},
	"ffsd" : {"line1" : [] , "line2" : [] , "line3" : []},
	"pls" : {"line1" : [] , "line2" : [] , "line3" : []},
	"plw" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"jsesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"ksesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"gdesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"jxesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"sdesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"shesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"ahesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"jsuesf" : {"line1" : [] , "line2" : [] , "line3" : []},
	"shssl" : {"line1" : [] , "line2" : [] , "line3" : []},
	"jsffc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"bxwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"jssfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"mmc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"cqssc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"xjssc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"tjssc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"hgydwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"blydwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"twwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"djydwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"jndsdwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"xjplfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"txffc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"qqffc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"bjssc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"blanydwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"wxydwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"ldydwfc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"tenxffc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"wbffc" : {"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"bjklb":{"line1":[]},
	"hgklb":{"line1":[]},
	"twklb":{"line1":[]},
	"pks":{"line1" : [] , "line2" : [] , "line3" : [] , "line4" : [] , "line5" : []},
	"jsks":{"line1" : [] , "line2" : []},
	"jlks":{"line1" : [] , "line2" : []},
	"ahks":{"line1" : [] , "line2" : []},
	"hbks":{"line1" : [] , "line2" : []},
	"jskstb":{"line1" : [] , "line2" : []},
	"jlkstb":{"line1" : [] , "line2" : []},
	"ahkstb":{"line1" : [] , "line2" : []},
	"hbkstb":{"line1" : [] , "line2" : []},
	"cqklsf":{"line1" : [] , "line2" : [], "line3" : [] , "line4" : [] , "line5" : [], "line6" : [] , "line7" : [] , "line8" : []}
};

//判断购买方式  :普通投注、胆拖投注、组合投注、方案粘贴投注、复式投注
function getBuyMode1(id) {
	if ((Number(id) & 1)==1) {
		return "胆拖";
	} else if ((Number(id) & 16)==16) {
		return "组合";
	} else if ((Number(id) & 8)==8) {
		return "单式";
	} else if((Number(id) & 0)==0){
		return "复式";
	}
}
//判断 快3 - 胆拖 或者 标准
function getBuyMode2(id){
	if ((Number(id) & 1)==1) {
		return "胆拖";
	} else if((Number(id) & 0)==0){
		return "标准";
	}
}

var LotteryInfo = {
	//获取彩种名称
	getName:function (category,lottery){
		return LC[category][lottery]["name"];
	},
	//获取彩种ID
	getId:function (category,lottery) {
		return LC[category][lottery]["lotteryId"];
	},
	//获取彩种LOGO
	getLogo:function (category,lottery) {
		return LC[category][lottery]["logo"];
	},
	//获取彩种类型
	getType:function (category,lottery) {
		return LC[category][lottery]["type"];
	},
	//获取一级玩法名称
	getPlayName:function (category,typeId) {
		return PC[category]["playType"][typeId]["name"];
	},
	//获取一级玩法ID
	getPlayId:function (category,typeId) {
		return PC[category]["playType"][typeId]["typeId"];
	},
	//获取二级玩法名称
	getMethodName:function (category,index) {
		return PC[category]["playMethod"][index]["name"];
	},
	//获取二级玩法ID
	getMethodId:function (category,index) {
		return PC[category]["playMethod"][index]["methodId"];
	},
	//获取二级玩法索引
	getMethodIndex:function (category,index) {
		return PC[category]["playMethod"][index]["index"];
	},
	//获取彩种名称
	getLotteryNameById:function(lotteryId){
		if (LotteryId.hasOwnProperty(lotteryId)){
			return LotteryId[lotteryId]["name"];
		}
	},
	//获取彩种标识
	getLotteryTagById:function(lotteryId){
		if (LotteryId.hasOwnProperty(lotteryId)){
			return LotteryId[lotteryId]["tag"];
		}
	},
	//获取彩种类型
	getLotteryTypeById:function(lotteryId){
		if (LotteryId.hasOwnProperty(lotteryId)){
			return LotteryId[lotteryId]["type"];
		}
	},
	//获取彩种Logo
	getLotteryLogoById:function(lotteryId){
		if (LotteryId.hasOwnProperty(lotteryId)){
			return LC[this.getLotteryTypeById(lotteryId)][this.getLotteryTagById(lotteryId)]["logo"];
		}
	},
	//获取玩法ID
	getPlayMethodId:function (category,lottery,index) {
		return this.getId(category,lottery) + this.getMethodId(category,index);
	},
	//获取玩法名称
	getPlayMethodName:function(lotteryId,playMethodId,id){
		lotteryId = lotteryId.toString();
		playMethodId = playMethodId.toString();
		id = id.toString();
		var methodId = playMethodId.replace(lotteryId,'');
		var type = this.getLotteryTypeById(lotteryId);
		var result;
		var array = [];
		$.each(PC[type]["playMethod"],function (index,item) {
			if (item.methodId == methodId){ //匹配二级标题
				array.push(item);
				var playName = PC[type]["playType"][item["typeId"]]["name"];

				if((type == "pls" || type == "sd") && item["typeId"] == "4"){//排列3  3D不定胆
					result = playName+ "_" +item["name"].substring(0,2);
				}else if(type == "ssc" && item["typeId"] == "7"){//时时彩定位胆
					result = playName+ "_" +item["name"];
				}else if(type == "ssc" && item["typeId"] == "9"){//时时彩大小单双
					result = item["name"]+playName;
				}else if(type == "esf" && (item["typeId"] == "3" || item["typeId"] == "4")){//11选5定位胆/不定胆
					result = item["name"]+playName;
				}else if(type == "esf" && item["typeId"] == "2"){//11选5前一
					result = playName;
				}else if(type == "ssl" && (item["typeId"] == "3" || item["typeId"] == "4")){//上海时时乐前一/后一
					result = playName;
				}else if (playName != item["name"]){
					result = playName+ "_" +item["name"];
				}else{
					result = playName;
				}
			}
		});
		if (array.length > 1){
			if (type == 'esf'){
				$.each(array,function (index,item) {
					var Pname = PC[type]["playType"][item.typeId]["name"];
					if (Pname.indexOf(getBuyMode1(id))!=-1){  //如果 esf 一级标题含有“组合，复式，单式，胆拖”
						result = PC[type]["playType"][item.typeId]["name"] + "_" + item["name"];
						return false;
					}else{
						result = Pname + "_" + item["name"];
						if (item["name"].indexOf(getBuyMode1(id))!=-1){  //如果 esf 二级标题含有“组合，复式，单式，胆拖”
							result = Pname + "_" +	item["name"];
							return false;
						}
					}
				});
			}else{
				$.each(array,function (index,item) {
					var name = item["name"];
					if(type == "k3"){
						if (name.indexOf(getBuyMode2(id))!=-1){
							result = PC[type]["playType"][item.typeId]["name"] + "_" + name;
						}
					}else{
						if (name.indexOf(getBuyMode1(id))!=-1){
							result = PC[type]["playType"][item.typeId]["name"] + "_" + name;
						}
					}
				})
			}
		}
		return result;
	},
	//获取PlayType长度
	getPlayLength:function(type){
		return PC[type]["playType"].length;
	},
	//获取PlayMethod长度
	getMethodLength:function(type){
		return PC[type]["playMethod"].length;
	},
	//获取一级玩法typeId
	getPlayTypeId:function (type,index) {
		return PC[type]["playType"][index]["typeId"];
	},
	//获取二级玩法typeId
	getMethodTypeId:function (type,index) {
		return PC[type]["playMethod"][index]["typeId"];
	},
	//获取彩种ID（Tag）
	getLotteryIdByTag:function (lotteryTag) {
		return LotteryTag[lotteryTag]["id"];
	},
	//获取彩种名称（Tag）
	getLotteryNameByTag:function (lotteryTag) {
		return LotteryTag[lotteryTag]["name"];
	},
	//获取彩种类型（Tag）
	getLotteryTypeByTag:function (lotteryTag) {
		return LotteryTag[lotteryTag]["type"];
	}
};

/* ------------------- ↓ 个人中心配置项 ↓ ------------------- */

//@ 添加银行卡 - 银行名称及其图标路径
var bankValue = {
	icbc : {name:'中国工商银行',logo:'images/bank/icbc.png'},
	abc : {name:'中国农业银行',logo:'images/bank/abc.png'},
	ccb : {name:'中国建设银行',logo:'images/bank/ccb.png'},
	comm : {name:'交通银行',logo:'images/bank/comm.png'},
	cmb : {name:'招商银行',logo:'images/bank/cmb.png'},
	boc : {name:'中国银行',logo:'images/bank/boc.png'},
	cib : {name:'兴业银行',logo:'images/bank/cib.png'},
	bos : {name:'上海银行',logo:'images/bank/bos.png'},
	citic : {name:'中信银行',logo:'images/bank/citic.png'},
    ecitic : {name:'中信银行'},  //充值
	ceb : {name:'中国光大银行',logo:'images/bank/ceb.png'},
	psbc : {name:'邮政储蓄银行',logo:'images/bank/psbc.png'},
	sdb : {name:'平安银行',logo:'images/bank/sdb.png'},
    cpb : {name:'平安银行'},  //充值
	cmbc : {name:'民生银行',logo:'images/bank/cmbc.png'},
	hxb : {name:'华夏银行',logo:'images/bank/hxb.png'},
	spdb : {name:'上海浦东发展银行',logo:'images/bank/spdb.png'},
	bob : {name:'北京银行',logo:'images/bank/bob.png'},
	cbhb : {name:'渤海银行',logo:'images/bank/cbhb.png'},
	gzb : {name:'广州银行',logo:'images/bank/gzb.png'},
	bod : {name:'东莞银行',logo:'images/bank/bod.png'},
	hzb : {name:'杭州银行',logo:'images/bank/hzb.png'},
	czb : {name:'浙商银行',logo:'images/bank/czb.png'},
	gdb : {name:'广发银行',logo:'images/bank/gdb.png'},
	nbb : {name:'宁波银行',logo:'images/bank/nbb.png'}
};

/* * @ 充值记录配置表 - 所有银行的充值记录在 rechargeTypesObj 中配置即可
 *
 *  [16:易宝支付] - [17:汇潮支付] - [19:环讯支付] - [20:宝付支付] - [21:国付宝支付] - [22:卡卡连] - [23:摩宝（微信）] - [24:通汇] - [25:中联信通]
 *  [26:OPEN2PAY] - [27:新贝] - [28:新汇潮] - [29:快捷通] - [30:智付] - [31:国付宝APP] - [151:MY18工行] - [152:MY18招行] - [153:MY18建行]
 *  [154:MY18支付宝] - [155:MY18财付通] - [156:my18民生] - [32:新生支付] - [33:新生微信] - [34:汇付宝支付] - [35:汇付宝微信] - [36:通汇微信]
 *  [37:RFU银联方式支付] - [38:RFU微信] - [39:智付微信] - [40:首信易网银支付] - [41:首信易手机微信支付] - [42:乐付微信] - [43:乐付网银] - [44:乐付快捷]
 *  [45:乐付支付宝 ] - [47:汇博QQpay] - [50:汇博支付] - [157:乐付支付宝2 ] - [48:华仁支付(微信支付)] - [51:华仁支付] - [52:华仁支付(快捷支付)] - [53:多得宝支付]
 *  [54:多得宝支付(微信)] - [55:多得宝支付(支付宝)] - [57:华仁(Alipay)] - [58:华仁(QQPay)] - [59:乐付支付(QQPay)] - [61：汇博微信] - [62：速汇宝支付] - [63：速汇宝支付(微信)] -
 *  [64：速汇宝支付(QQPay)] - [65:扫码付(wechat)] - [66:扫码付(qqpay)] - [67:扫码付(alipay)] - [68:扫码付(网银)] - [69:泽圣支付(QQPay)] - [70:泽圣支付(微信)]
 *  [71:泽圣网银支付]
 *
 * */
var rechargeTypesObj = {
	"online_type_5":16,
	"online_type_8":17,
	"online_type_9":19,
	"online_type_14":20,
	"online_type_15":21,
	"online_type_16":22,
	"online_type_18":23,
	"online_type_19":24,
	"online_type_20":25,
	"online_type_21":26,
	"online_type_22":27,
	"online_type_23":28,
	"online_type_24":29,
	"online_type_25":30,
	"online_type_26":31,
	"online_type_32":32,
	"online_type_33":33,
	"online_type_34":34,
	"online_type_35":35,
	"online_type_36":36,
	"online_type_37":37,
	"online_type_38":38,
	"online_type_39":39,
	"online_type_40":40,
	"online_type_41":41,
	"online_type_42":42,
	"online_type_43":43,
	"online_type_44":44,
	"online_type_45":45,
	"online_type_47":47,
	"online_type_48":48,
	"online_type_50":50,
	"online_type_51":51,
	"online_type_52":52,
	"online_type_53":53,
	"online_type_54":54,
	"online_type_55":55,
	"online_type_57":57,
	"online_type_58":58,
	"online_type_59":59,
	"online_type_61":61,
	"online_type_62":62,
	"online_type_63":63,
	"online_type_64":64,
	"online_type_65":65,
	"online_type_66":66,
	"online_type_67":67,
	"online_type_68":68,
	"online_type_69":69,
	"online_type_70":70,
	"online_type_71":71,
	"online_type_6":151,
	"online_type_12":152,
	"online_type_11":153,
	"online_type_10":154,
	"online_type_13":155,
	"online_type_17":156,
	"online_type_157":157
};

/*  @ 充值方式配置表 - 添加新充值方式在 rechargeID 中配置即可
 * key：ID值
 * IsMobile:是否可在手机端充值（1是0否）; IsOnline:是否为在线充值方式（1是0否）; name:充值名称（String）; typeID:另一个ID值.
 */
var rechargeID = {
	'16': { IsMobile : 0, IsOnline : 0, typeID : 5, name : '在线支付' },
	'17': { IsMobile : 0, IsOnline : 0, typeID : 8, name : '在线支付' },
	'19': { IsMobile : 0, IsOnline : 0, typeID : 9, name : '在线支付' },
	'20': { IsMobile : 0, IsOnline : 0, typeID : 14, name : '在线支付' },
	'21': { IsMobile : 0, IsOnline : 0, typeID : 15, name : '' },
	'22': { IsMobile : 0, IsOnline : 0, typeID : 16, name : '' },
	'23': { IsMobile : 0, IsOnline : 0, typeID : 18, name : '' },
	'24': { IsMobile : 0, IsOnline : 0, typeID : 19, name : '' },
	'25': { IsMobile : 0, IsOnline : 0, typeID : 20, name : '' },
	'26': { IsMobile : 1, IsOnline : 1, typeID : 21, name : '' },
	'27': { IsMobile : 1, IsOnline : 1, typeID : 22, name : 'WECHAT' },
	'28': { IsMobile : 1, IsOnline : 1, typeID : 23, name : 'NOCARD' },
	'29': { IsMobile : 0, IsOnline : 0, typeID : 24, name : '' },
	'30': { IsMobile : 0, IsOnline : 0, typeID : 25, name : '' },
	'31': { IsMobile : 1, IsOnline : 1, typeID : 26, name : 'gfbapp' },
	'32': { IsMobile : 0, IsOnline : 0, typeID : 32, name : '' },
	'33': { IsMobile : 1, IsOnline : 1, typeID : 33, name : 'wechat' },
	'34': { IsMobile : 0, IsOnline : 0, typeID : 34, name : '' },
	'35': { IsMobile : 1, IsOnline : 1, typeID : 35, name : 'wechat' },
	'36': { IsMobile : 1, IsOnline : 1, typeID : 36, name : 'wechat' },
	'37': { IsMobile : 0, IsOnline : 0, typeID : 37, name : '' },
	'38': { IsMobile : 1, IsOnline : 1, typeID : 38, name : 'wechat' },
	'39': { IsMobile : 1, IsOnline : 1, typeID : 39, name : 'wechat' },
	'40': { IsMobile : 0, IsOnline : 0, typeID : 40, name : '' },
	'41': { IsMobile : 1, IsOnline : 1, typeID : 41, name : 'wechat' },
	'42': { IsMobile : 1, IsOnline : 1, typeID : 42, name : 'wechat' },
	'43': { IsMobile : 1, IsOnline : 1, typeID : 43, name : ['icbc','abc','ccb','cmb','spdb','cmbc','boc','ceb','psbc','hxb','cib','gdb','cpb','ecitic','comm'], onlinePay:true },
	'44': { IsMobile : 1, IsOnline : 1, typeID : 44, name : 'NOCARD' },
	'45': { IsMobile : 1, IsOnline : 1, typeID : 45, name : 'alipay' },
	'47': { IsMobile : 1, IsOnline : 1, typeID : 47, name : 'qqpay' },
	'48': { IsMobile : 1, IsOnline : 1, typeID : 48, name : 'wechat' },
	'50': { IsMobile : 0, IsOnline : 0, typeID : 50, name : '' },
	'51': { IsMobile : 0, IsOnline : 0, typeID : 51, name : 'HRPAY' },
    '52': { IsMobile : 1, IsOnline : 1, typeID : 52, name : ['icbc','abc','ccb','cmb','boc','ceb','hxb','gdb','ecitic','bob','cmbc'], fastPay:true },
	'53': { IsMobile : 1, IsOnline : 1, typeID : 53, name : ['icbc','abc','ccb','cmb','spdb','cmbc','boc','ceb','psbc','bos','nbb','hxb','cib','ecitic','comm'], onlinePay:true },
	'54': { IsMobile : 1, IsOnline : 1, typeID : 54, name : 'wechat' },
	'55': { IsMobile : 1, IsOnline : 1, typeID : 55, name : 'alipay' },
	'57': { IsMobile : 1, IsOnline : 1, typeID : 57, name : 'alipay' },
	'58': { IsMobile : 1, IsOnline : 1, typeID : 58, name : 'qqpay' },
	'59': { IsMobile : 1, IsOnline : 1, typeID : 59, name : 'qqpay' },
	'61': { IsMobile : 1, IsOnline : 1, typeID : 61, name : 'WECHAT' },
	'62': { IsMobile : 0, IsOnline : 0, typeID : 62, name : '' },
	'63': { IsMobile : 1, IsOnline : 1, typeID : 63, name : 'wechat' },
	'64': { IsMobile : 1, IsOnline : 1, typeID : 64, name : 'qqpay' },
	'65': { IsMobile : 1, IsOnline : 1, typeID : 65, name : 'wechat' },
	'66': { IsMobile : 1, IsOnline : 1, typeID : 66, name : 'qqpay' },
	'67': { IsMobile : 1, IsOnline : 1, typeID : 67, name : 'alipay' },
	'68': { IsMobile : 1, IsOnline : 1, typeID : 68, name : ['icbc','abc','ccb','boc','hxb','ceb','bos','cmb','cmbc','cib','psbc','comm','cpb','ecitic','spdb','gdb','bob'], onlinePay:true },
	'69': { IsMobile : 1, IsOnline : 1, typeID : 69, name : 'qqpay' },
	'70': { IsMobile : 1, IsOnline : 1, typeID : 70, name : 'wechat' },
	'71': { IsMobile : 1, IsOnline : 1, typeID : 71, name : ['icbc','abc','ccb','boc','ceb','cmb','cmbc','cib','psbc','ecitic','gdb','cpb','comm','bob'], onlinePay:true },
	'151': { IsMobile : 1, IsOnline : 0, typeID : 6, name : 'icbc' },
	'152': { IsMobile : 1, IsOnline : 0, typeID : 12, name : 'cmb' },
	'153': { IsMobile : 1, IsOnline : 0, typeID : 11, name : 'ccb' },
	'154': { IsMobile : 1, IsOnline : 0, typeID : 10, name : 'alipay' },
	'155': { IsMobile : 1, IsOnline : 0, typeID : 13, name : 'tenpay' },
	'156': { IsMobile : 1, IsOnline : 0, typeID : 17, name : 'cmbc' },
	'157': { IsMobile : 0, IsOnline : 0, typeID : 157, name : 'alipay' }
};

//@ 验证是否为充值银行的ID,用于账户明细显示
function IsBankId(RechargeType) {
	RechargeType = RechargeType + '';
	var allBankId = new Array();
	$.each(rechargeTypesObj,function (key,val) {
		allBankId.push(key.split('_')[2]);
	});
	if ($.inArray(RechargeType,allBankId) == -1){
		return false;
	}else{
		return true;
	}
}

//@ 获取后台银行名称，并将相应的选项展示到页面
function getAllBankName(RechargeType){
	var allRecType = jsonUtils.toJson(localStorageUtils.getParam("allRecType"));
	for (var j = 0; j < allRecType.length; j++) {
		var payName = allRecType[j].PayName;    //银行名称
		var payValue = allRecType[j].Pay;	//type值
		var payId = rechargeTypesObj['online_type_' + RechargeType];
		if(payValue == payId){
			return payName;
		}
	}
}