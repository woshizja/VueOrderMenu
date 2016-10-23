import imgsrcs from './imgsrcs.js'

var dishs = [{
    catalog: "招牌鲜鱼",
    catalogID: 1100,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 100,
        dishName: "花鲢",
        dishDesc: "约350g，原产地当日直供。本店所有鱼均由省重点养殖企业 龙华渔场 提供。",
        dishPrice: 25,
        likeNum: 488,
        imgSrc: require('../img/hualian1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: ["招牌推荐", "鱼类", "热门"],
        dishNum: 0
    }, {
        dishID: 101,
        dishName: "鲶鱼",
        dishDesc: "约350g，精选鲶鱼，新鲜配送，美味直达。",
        dishPrice: 38,
        likeNum: 495,
        imgSrc: require('../img/nianyu1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["鱼类"],
        dishNum: 0
    }, {
        dishID: 102,
        dishName: "草鱼",
        dishDesc: "约350g，无污染养殖，肉质鲜嫩，味美色香。",
        dishPrice: 25,
        likeNum: 375,
        imgSrc: require('../img/caoyu1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: [ "热门", "鱼类"],
        dishNum: 0
    }, {
        dishID: 1021,
        dishName: "梭边鱼",
        dishDesc: "约300g，体小无鳞，肉多刺少，肉质细腻柔滑，异常鲜美。",
        dishPrice: 25,
        likeNum: 375,
        imgSrc: require('../img/suobianyu1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: ["招牌推荐", "鱼类"],
        dishNum: 0
    }, {
        dishID: 1022,
        dishName: "青鱼",
        dishDesc: "约300g，太湖青鱼，味极清隽。",
        dishPrice: 25,
        likeNum: 375,
        imgSrc: require('../img/qingyu1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: ["招牌推荐", "鱼类"],
        dishNum: 0
    }]
}, {
    catalog: "火锅必备",
    catalogID: 1101,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 103,
        dishName: "毛肚",
        dishDesc: "约120g，火锅必备，不多说，快上车。",
        dishPrice: 18,
        likeNum: 213,
        imgSrc: require('../img/maodu1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: [ "热门"],
        dishNum: 0
    }, {
        dishID: 104,
        dishName: "草原肥牛",
        dishDesc: "约150g，萌萌哒的小牛牛，你忍心吃吗？",
        dishPrice: 28,
        likeNum: 389,
        imgSrc: require('../img/feiniu1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["涮肉"],
        dishNum: 0
    }, {
        dishID: 1041,
        dishName: "五花肉",
        dishDesc: "约130g，五分肥五分瘦，美味不腻。",
        dishPrice: 28,
        likeNum: 389,
        imgSrc: require('../img/wuhuarou1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["涮肉"],
        dishNum: 0
    }, {
        dishID: 1042,
        dishName: "鹅肠",
        dishDesc: "约120g，涮七秒就可以哦！",
        dishPrice: 28,
        likeNum: 389,
        imgSrc: require('../img/echang1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["热门"],
        dishNum: 0
    }]
}, {
    catalog: "川湘经典",
    catalogID: 1102,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 105,
        dishName: "红糖糍粑",
        dishDesc: "六个，香香糯糯就是我。",
        dishPrice: 18,
        likeNum: 285,
        imgSrc: require('../img/ciba1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["主食"],
        dishNum: 0
    },{
        dishID: 1051,
        dishName: "四川凉粉",
        dishDesc: "麻辣香香",
        dishPrice: 18,
        likeNum: 285,
        imgSrc: require('../img/liangfen1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: [],
        dishNum: 0
    }]
}, {
    catalog: "浓香鱼汤",
    catalogID: 1103,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 106,
        dishName: "招牌鱼头汤",
        dishDesc: "历经六小时熬制，招牌鱼汤!",
        dishPrice: 48,
        likeNum: 885,
        imgSrc: require('../img/yutang1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["招牌推荐", "鱼类", "汤"],
        dishNum: 0
    },{
        dishID: 1061,
        dishName: "大骨鱼汤",
        dishDesc: "大骨加鲜鱼精心熬制!",
        dishPrice: 58,
        likeNum: 885,
        imgSrc: require('../img/daguyutang1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["招牌推荐", "鱼类", "汤"],
        dishNum: 0
    }]
}, {
    catalog: "爽口凉菜",
    catalogID: 1104,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 107,
        dishName: "凉拌黄瓜",
        dishDesc: "清爽怡人",
        dishPrice: 8,
        likeNum: 87,
        imgSrc: require('../img/huanggua1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["蔬菜"],
        dishNum: 0
    }]
}, {
    catalog: "时令鲜蔬",
    catalogID: 1105,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 108,
        dishName: "蔬菜拼盘",
        dishDesc: "约220g，精选五种时令蔬菜，吃遍四季的美味。",
        dishPrice: 16,
        likeNum: 185,
        imgSrc: require('../img/shucaipan1.jpg'),
        isCombo: true,
        isPromotion: true,
        searchKey: ["蔬菜"],
        dishNum: 0
    }]
}, {
    catalog: "主食",
    catalogID: 1106,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 109,
        dishName: "香蕉飞饼",
        dishDesc: "约6寸，香蕉与面饼完美融合。",
        dishPrice: 12,
        likeNum: 65,
        imgSrc: require('../img/xiangjiao1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: ["主食"],
        dishNum: 0
    },{
        dishID: 1091,
        dishName: "米饭",
        dishDesc: "东北大米",
        dishPrice: 3,
        likeNum: 65,
        imgSrc: require('../img/mifan1.jpg'),
        isCombo: false,
        isPromotion: true,
        searchKey: ["主食", "米饭"],
        dishNum: 0
    }]
}, {
    catalog: "饮料",
    catalogID: 1107,
    orderedDishs:{length:0},
    dishs: [{
        dishID: 110,
        dishName: "可乐",
        dishDesc: "250ml，可口可乐。",
        dishPrice: 8,
        likeNum: 11,
        imgSrc: require('../img/kele1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["饮品"],
        dishNum: 0
    }, {
        dishID: 111,
        dishName: "玉米汁",
        dishDesc: "一扎，冷热均有。",
        dishPrice: 26,
        likeNum: 85,
        imgSrc: require('../img/yumizhi1.jpg'),
        isCombo: false,
        isPromotion: false,
        searchKey: ["饮品"],
        dishNum: 0
    }]
}];

dishs.forEach(function(eles){
    eles.dishs.forEach(function(ele,index){
        ele.imgSrcs = imgsrcs;
    });
});

export default dishs;
