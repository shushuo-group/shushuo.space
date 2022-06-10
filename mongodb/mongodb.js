var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/shushuo';
mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


var user = mongoose.model('user', new mongoose.Schema({
    userName: {
        type: String,
        default: NaN
    },
    userAccount: {
        type: String,
        default: NaN
    },
    userPassword: {
        type: String,
        default: NaN
    },
    userEmail: {
        type: String,
        default: NaN
    },
    registerDate: {
        type: String,
        default: NaN
    },
    finLogTime: {
        type: String,
        default: NaN
    },
    userNumber: {
        type: Number,
        default: 0
    },
    RegNumber: {
        type: String,
        default: NaN
    },
    isRegister: {
        type: Boolean,
        default: false
    },
    emailShow: {
        type: String,
        default: NaN
    },
    token: {
        type: String,
        default: NaN
    },
    tokenTime: {
        type: Number,
        default: 0
    },
    loginNumber: {
        type: String,
        default: NaN
    },
    headImg: {
        type: String,
        default: 'NaN.png'
    },
    word: {
        type: String,
        default: ''
    },
    likeArticles: {
        type: Object,
        default: []
    },
    unlikeArticles: {
        type: Object,
        default: []
    },
    collectArticles: {
        type: Object,
        default: []
    },
    commentArticles: {
        type: Object,
        default: []
    },
    search_history: {
        type: Object,
        default: []
    },
    isOk: {
        type: Boolean,
        default: true
    },
    FreeCss: String
}))

var webRunInfors = mongoose.model('webRunInfors', new mongoose.Schema({
    hotListCompleteTime: {
        type: Number,
        default: 0
    },
}))
var hotList = mongoose.model('hotList', new mongoose.Schema({
    name: String,
    smallname: String,
    bigmname: String,
    id: String,
    order: Number
}))

var largeModule = mongoose.model('largeModule', new mongoose.Schema({
    name: String,
    isShow: {
        type: Boolean,
        default: true
    }
}))
var smallModule = mongoose.model('smallModule', new mongoose.Schema({
    name: String,
    smallPart: Object,
    father: String,
    isShow: {
        type: Boolean,
        default: true
    }
}))

var article = mongoose.model('article', new mongoose.Schema({
    name: String,
    scores: {
        type: Number,
        default: 0
    },
    completeTime: Number,
    articleID: String,
    isShow: {
        type: Boolean,
        default: true
    },
    content: String,
    writerEmail: String,
    bigmid: String,
    smallmid: String,
    isOk: {
        type: Boolean,
        default: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    time: String,
    likers: {
        type: Object,
        default: []
    },
    unlikers: {
        type: Object,
        default: []
    },
    collectors: {
        type: Object,
        default: []
    },
    comments: {
        type: Object,
        default: []
    }
}))

var illegalArticle = mongoose.model('illegalArticle', new mongoose.Schema({
    Name: String,
    Callemail: String,
    articleID: String,
    time: String,
    reason: String
}))

var waitAddSmallModule = mongoose.model('waitAddSmallModule', new mongoose.Schema({
    smallMname: String,
    Callemail: String,
    bigMiD: String,
    time: String,
    reason: String
}))

var webNotice = mongoose.model('webNotice', new mongoose.Schema({
    order: Number,
    type: String,
    content: String,
    listener: Array,
    sendTime: String
}))

var webUserComments = mongoose.model('webUserComments', new mongoose.Schema({
    myName: String,
    articleId: String,
    anotherName: String,
    isCheck: String,
    date: String,
    Checkdate: String
}))


module.exports = {
    user,
    hotList,
    largeModule,
    article,
    smallModule,
    illegalArticle,
    waitAddSmallModule,
    webRunInfors,
    webNotice,
    webUserComments
}