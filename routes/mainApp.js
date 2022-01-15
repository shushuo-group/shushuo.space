/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const db = require('../mongodb/mongodb');
const date = require("silly-datetime");
const router = express.Router();
const write = require('../middleware/consolelog');

// 小模块点击事件
router.post('/smallModule', async function (req, res, next) {
    //登录状态下的初始数据返回
    let userSee = await db.user.findOne({
        token: req.body.token
    })
    if (userSee !== null) {
        let article = []
        let articles = await db.article.find({
            isShow: true,
            bigmid: req.body.bigModuleId,
            smallmid: req.body.smallModuleId,
            isOk: true,
            isPublic: true,
            isShow: true
        }).sort({
            time: -1
        }).limit(10)
        for (let i = 0; i < articles.length; i++) {
            let user = await db.user.find({
                userEmail: articles[i].writerEmail
            })
            //验证用户是否点赞过
            let isLike = false
            if (articles[i].likers.find((ele) => (ele.name == userSee.userEmail))) {
                isLike = true
            }
            //验证用户是否踩一踩过
            let isunLike = false
            if (articles[i].unlikers.find((ele) => (ele.name == userSee.userEmail))) {
                isunLike = true
            }
            //验证用户是否收藏过
            let isCollect = false
            if (articles[i].collectors.find((ele) => (ele.name == userSee.userEmail))) {
                isCollect = true
            }
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                }
            }
            article.push({
                articleContent: articles[i].content,
                articleId: articles[i]._id,
                articleTitle: articles[i].name,
                articleTime: articles[i].time,
                articleName: articles[i].name,
                articleComNumber: commentsNumber,
                like: articles[i].likers.length,
                islike: isLike,
                isunlike: isunLike,
                iscollect: isCollect,
                unlike: articles[i].unlikers.length,
                writerHead: user[0].headImg,
                writerName: user[0].userName,
                writerId: user[0]._id,
                writerWord: user[0].word
            })
        }
        res.send({
            articles: article
        })
        return
    }
    let article = []
    let articles = await db.article.find({
        isShow: true,
        bigmid: req.body.bigModuleId,
        smallmid: req.body.smallModuleId,
        isOk: true,
        isPublic: true,
        isShow: true
    }).sort({
        time: -1
    }).limit(10)
    for (let i = 0; i < articles.length; i++) {
        let articleWriter = await db.user.find({
            userEmail: articles[i].writerEmail
        })
        let commentsNumber = articles[i].comments.length
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments) {
                commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
            }
        }
        article.push({
            articleComNumber: commentsNumber,
            articleContent: articles[i].content,
            articleName: articles[i].name,
            articleId: articles[i]._id,
            articleTime: articles[i].time,
            iscollect: false,
            islike: false,
            isunlike: false,
            like: articles[i].likers.length,
            unlike: articles[i].unlikers.length,
            writerHead: articleWriter[0].headImg,
            writerName: articleWriter[0].userName,
            writerId: articleWriter[0]._id,
            writerWord: articleWriter[0].word
        })
    }
    res.send({
        articles: article
    })
});

// 大模块点击事件
router.post('/bigModule', async function (req, res, next) {
    //登录状态下的初始数据返回
    let userSee = await db.user.findOne({
        token: req.body.token
    })
    if (userSee !== null) {
        let article = []
        let articles = await db.article.find({
            bigmid: req.body.bigModuleId,
            isShow: true,
            isOk: true,
            isPublic: true
        }).sort({
            time: -1
        }).limit(10)
        for (let i = 0; i < articles.length; i++) {
            let user = await db.user.find({
                userEmail: articles[i].writerEmail
            })
            //验证用户是否点赞过
            let isLike = false
            if (articles[i].likers.find((ele) => (ele.name == userSee.userEmail))) {
                isLike = true
            }
            //验证用户是否踩一踩过
            let isunLike = false
            if (articles[i].unlikers.find((ele) => (ele.name == userSee.userEmail))) {
                isunLike = true
            }
            //验证用户是否收藏过
            let isCollect = false
            if (articles[i].collectors.find((ele) => (ele.name == userSee.userEmail))) {
                isCollect = true
            }
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                }
            }
            article.push({
                articleContent: articles[i].content,
                articleId: articles[i]._id,
                articleTitle: articles[i].name,
                articleTime: articles[i].time,
                articleName: articles[i].name,
                articleComNumber: commentsNumber,
                like: articles[i].likers.length,
                islike: isLike,
                isunlike: isunLike,
                iscollect: isCollect,
                unlike: articles[i].unlikers.length,
                writerHead: user[0].headImg,
                writerName: user[0].userName,
                writerId: user[0]._id,
                writerWord: user[0].word
            })
        }
        res.send({
            articles: article
        })
        return
    }
    let article = []
    let articles = await db.article.find({
        bigmid: req.body.bigModuleId,
        isShow: true,
        isOk: true,
        isPublic: true
    }).sort({
        time: -1
    }).limit(10)
    for (let i = 0; i < articles.length; i++) {
        let articleWriter = await db.user.find({
            userEmail: articles[i].writerEmail
        })
        let commentsNumber = articles[i].comments.length
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments) {
                commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
            }
        }
        article.push({
            articleComNumber: commentsNumber,
            articleContent: articles[i].content,
            articleName: articles[i].name,
            articleId: articles[i]._id,
            articleTime: articles[i].time,
            islike: false,
            isunlike: false,
            iscollect: false,
            like: articles[i].likers.length,
            unlike: articles[i].unlikers.length,
            writerHead: articleWriter[0].headImg,
            writerName: articleWriter[0].userName,
            writerId: articleWriter[0]._id,
            writerWord: articleWriter[0].word
        })
    }
    res.send({
        articles: article
    })
});

// 树洞点击事件
router.post('/toshuDong', async function (req, res, next) {
    //登录状态下的初始数据返回
    let userSee = await db.user.findOne({
        token: req.body.token
    })
    if (userSee !== null) {
        let articles = await db.article.find({
            isShow: false,
            isOk: true,
            isPublic: true
        }).sort({
            time: -1
        }).limit(10)
        let article = []
        for (let i = 0; i < articles.length; i++) {
            let user = await db.user.find({
                userEmail: articles[i].writerEmail
            })
            //验证用户是否点赞过
            let isLike = false
            if (articles[i].likers.find((ele) => (ele.name == userSee.userEmail))) {
                isLike = true
            }
            //验证用户是否踩一踩过
            let isunLike = false
            if (articles[i].unlikers.find((ele) => (ele.name == userSee.userEmail))) {
                isunLike = true
            }
            //验证用户是否收藏过
            let isCollect = false
            if (articles[i].collectors.find((ele) => (ele.name == userSee.userEmail))) {
                isCollect = true
            }
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                }
            }
            article.push({
                articleComNumber: commentsNumber,
                articleContent: articles[i].content,
                articleId: articles[i]._id,
                articleName: articles[i].name,
                like: articles[i].likers.length,
                unlike: articles[i].unlikers.length,
                articleTime: articles[i].time,
                islike: isLike,
                isunlike: isunLike,
                iscollect: isCollect,
            })
        }
        res.send({
            articles: article
        })
        return
    }
    let articles = await db.article.find({
        isShow: false,
        isOk: true,
        isPublic: true
    }).sort({
        time: -1
    }).limit(10)
    let article = []
    for (let i = 0; i < articles.length; i++) {
        let commentsNumber = articles[i].comments.length
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments) {
                commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
            }
        }
        article.push({
            articleComNumber: commentsNumber,
            articleContent: articles[i].content,
            articleId: articles[i]._id,
            articleName: articles[i].name,
            like: articles[i].likers.length,
            unlike: articles[i].unlikers.length,
            articleTime: articles[i].time,
            islike: false,
            isunlike: false,
            iscollect: false,
        })
    }
    res.send({
        articles: article
    })
});

// 广场点击事件
router.post('/toSquare', async function (req, res, next) {
    //登录状态下的初始数据返回
    let userSee = await db.user.findOne({
        token: req.body.token
    })
    if (userSee !== null) {
        //可以根据本地token查找到此人
        let articles = await db.article.find({
            isShow: true,
            isOk: true,
            isPublic: true
        }).sort({
            time: -1
        }).limit(10)
        let article = []
        for (let i = 0; i < articles.length; i++) {
            let user = await db.user.find({
                userEmail: articles[i].writerEmail
            })
            //验证用户是否点赞过
            let isLike = false
            if (articles[i].likers.find((ele) => (ele.name == userSee.userEmail))) {
                isLike = true
            }
            //验证用户是否踩一踩过
            let isunLike = false
            if (articles[i].unlikers.find((ele) => (ele.name == userSee.userEmail))) {
                isunLike = true
            }
            //验证用户是否收藏过
            let isCollect = false
            if (articles[i].collectors.find((ele) => (ele.name == userSee.userEmail))) {
                isCollect = true
            }
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                }
            }
            let small = await db.smallModule.findOne({
                _id: articles[i].smallmid
            })
            article.push({
                small_name: small.name,
                big_name: small.father,
                articleContent: articles[i].content,
                articleId: articles[i]._id,
                articleTitle: articles[i].name,
                articleTime: articles[i].time,
                articleName: articles[i].name,
                articleComNumber: commentsNumber,
                like: articles[i].likers.length,
                islike: isLike,
                isunlike: isunLike,
                iscollect: isCollect,
                unlike: articles[i].unlikers.length,
                writerHead: user[0].headImg,
                writerName: user[0].userName,
                writerId: user[0]._id,
                writerWord: user[0].word
            })
        }
        res.send({
            articles: article
        })
        return
    }
    //非登录状态下的初始数据返回
    let articles = await db.article.find({
        isShow: true,
        isOk: true,
        isPublic: true
    }).sort({
        time: -1
    }).limit(10)
    let article = []
    for (let i = 0; i < articles.length; i++) {
        let user = await db.user.find({
            userEmail: articles[i].writerEmail
        })
        let commentsNumber = articles[i].comments.length
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments) {
                commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
            }
        }
        let small = await db.smallModule.findOne({
            _id: articles[i].smallmid
        })
        article.push({
            small_name: small.name,
            big_name: small.father,
            articleContent: articles[i].content,
            articleId: articles[i]._id,
            articleTitle: articles[i].name,
            articleTime: articles[i].time,
            articleName: articles[i].name,
            articleComNumber: commentsNumber,
            like: articles[i].likers.length,
            islike: false,
            isunlike: false,
            iscollect: false,
            unlike: articles[i].unlikers.length,
            writerHead: user[0].headImg,
            writerName: user[0].userName,
            writerId: user[0]._id,
            writerWord: user[0].word
        })
    }
    res.send({
        articles: article
    })
});

// 滑动刷新事件
router.post('/slideFlush', async function (req, res, next) {
    async function slideFlush(data) {
        //登录状态下的初始数据返回
        let userSee = await db.user.findOne({
            token: req.body.token
        })
        if (userSee !== null) {
            let article = []
            let articles = data.slice(req.body.number * 10, req.body.number * 10 + 10)
            for (let i = 0; i < articles.length; i++) {
                //验证用户是否点赞过
                let isLike = false
                if (articles[i].likers.find((ele) => (ele.name == userSee.userEmail))) {
                    isLike = true
                }
                //验证用户是否踩一踩过
                let isunLike = false
                if (articles[i].unlikers.find((ele) => (ele.name == userSee.userEmail))) {
                    isunLike = true
                }
                //验证用户是否收藏过
                let isCollect = false
                if (articles[i].collectors.find((ele) => (ele.name == userSee.userEmail))) {
                    isCollect = true
                }
                let articleWriter = await db.user.find({
                    userEmail: articles[i].writerEmail
                })
                let commentsNumber = articles[i].comments.length
                for (let j = 0; j < articles[i].comments.length; j++) {
                    if (articles[i].comments[j].secComments) {
                        commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                    }
                }
                article.push({
                    articleComNumber: commentsNumber,
                    articleContent: articles[i].content,
                    articleName: articles[i].name,
                    articleId: articles[i]._id,
                    articleTime: articles[i].time,
                    like: articles[i].likers.length,
                    unlike: articles[i].unlikers.length,
                    writerHead: articleWriter[0].headImg,
                    writerName: articleWriter[0].userName,
                    writerId: articleWriter[0]._id,
                    writerWord: articleWriter[0].word,
                    islike: isLike,
                    isunlike: isunLike,
                    iscollect: isCollect,
                })
            }
            res.send({
                articles: article
            })
            return
        }
        let article = []
        let articles = data.slice(req.body.number * 10, req.body.number * 10 + 10)
        for (let i = 0; i < articles.length; i++) {
            let articleWriter = await db.user.find({
                userEmail: articles[i].writerEmail
            })
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                }
            }
            article.push({
                articleComNumber: commentsNumber,
                articleContent: articles[i].content,
                articleName: articles[i].name,
                articleId: articles[i]._id,
                articleTime: articles[i].time,
                islike: false,
                isunlike: false,
                iscollect: false,
                like: articles[i].likers.length,
                unlike: articles[i].unlikers.length,
                writerHead: articleWriter[0].headImg,
                writerName: articleWriter[0].userName,
                writerId: articleWriter[0]._id,
                writerWord: articleWriter[0].word
            })
        }
        res.send({
            articles: article,
            number: req.body.number
        })
    }
    async function slideFlush_shuDong(data) {
        //登录状态下的初始数据返回
        let userSee = await db.user.findOne({
            token: req.body.token
        })
        if (userSee !== null) {
            let article = []
            let articles = data.slice(req.body.number * 10, req.body.number * 10 + 10)
            for (let i = 0; i < articles.length; i++) {
                //验证用户是否点赞过
                let isLike = false
                if (articles[i].likers.find((ele) => (ele.name == userSee.userEmail))) {
                    isLike = true
                }
                //验证用户是否踩一踩过
                let isunLike = false
                if (articles[i].unlikers.find((ele) => (ele.name == userSee.userEmail))) {
                    isunLike = true
                }
                //验证用户是否收藏过
                let isCollect = false
                if (articles[i].collectors.find((ele) => (ele.name == userSee.userEmail))) {
                    isCollect = true
                }

                let commentsNumber = articles[i].comments.length
                for (let j = 0; j < articles[i].comments.length; j++) {
                    if (articles[i].comments[j].secComments) {
                        commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                    }
                }
                article.push({
                    islike: isLike,
                    isunlike: isunLike,
                    iscollect: isCollect,
                    articleTime: articles[i].time,
                    articleComNumber: commentsNumber,
                    articleContent: articles[i].content,
                    articleName: articles[i].name,
                    articleId: articles[i]._id,
                    like: articles[i].likers.length,
                    unlike: articles[i].unlikers.length,
                })
            }
            res.send({
                articles: article
            })
            return
        }
        let article = []
        let articles = data.slice(req.body.number * 10, req.body.number * 10 + 10)
        for (let i = 0; i < articles.length; i++) {
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber = commentsNumber + articles[i].comments[j].secComments.length
                }
            }
            article.push({
                articleComNumber: commentsNumber,
                articleContent: articles[i].content,
                articleTime: articles[i].time,
                articleName: articles[i].name,
                articleId: articles[i]._id,
                islike: false,
                isunlike: false,
                iscollect: false,
                like: articles[i].likers.length,
                unlike: articles[i].unlikers.length,
            })
        }
        res.send({
            articles: article,
            number: req.body.number
        })
    }
    let articless = null
    switch (req.body.way) {
        case 'bigMway':
            articless = await db.article.find({
                bigmid: req.body.bigMid,
                isShow: true,
                isOk: true,
                isPublic: true
            }).sort({
                _id: -1
            })
            slideFlush(articless)
            break;
        case 'smallMway':
            articless = await db.article.find({
                bigmid: req.body.bigMid,
                smallmid: req.body.smallMid,
                isShow: true,
                isOk: true,
                isPublic: true
            }).sort({
                _id: -1
            })
            slideFlush(articless)
            break;
        case 'squareMway':
            articless = await db.article.find({
                isShow: true,
                isOk: true,
                isPublic: true
            }).sort({
                _id: -1
            })
            slideFlush(articless)
            break;
        case 'shuDongMway':
            articless = await db.article.find({
                isShow: false,
                isOk: true,
                isPublic: true
            }).sort({
                _id: -1
            })
            slideFlush_shuDong(articless)
            break;
        default:
            break;
    }
});

// 搜索记录
router.post('/search', async function (req, res, next) {
    if (req.body.name.replace(/\s*/g, "").length == 0) {
        res.send('fuck u')
        return
    }
    let q = req.body.name
    q = q.replace(/&lt;/g, "<")
    q = q.replace(/&gt;/g, ">")
    let key = q
    if (req.body.token !== undefined) { //登录状态下
        // 修改搜索记录
        db.user.updateOne({
            token: req.body.token
        }, {
            $push: {
                search_history: {
                    name: q,
                    time: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                    isOk: true
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
    }
    // 用户
    let result01 = await db.user.find({
        "userName": {
            $regex: key,
            $options: 'i'
        },
        "isOk": true
    })
    // 文章
    let result02 = await db.article.find({
        "name": {
            $regex: key,
            $options: 'i'
        },
        "isOk": true,
        "isPublic": true,
    })
    // user
    let data01 = []
    for (let i = 0; i < result01.length; i++) {
        let data01_articles = await db.article.find({
            "writerEmail": result01[i].userEmail,
            "isOk": true,
            "isPublic": true,
        })
        data01.push({
            userName: result01[i].userName,
            headImg: result01[i].headImg,
            articleNum: data01_articles.length,
            commentsNum: result01[i].commentArticles.length,
            id: result01[i]._id,
            word: result01[i].word
        })
    }
    // article
    let data02 = []
    for (let i = 0; i < result02.length; i++) {
        //作者信息
        let articleWriter = await db.user.find({
            userEmail: result02[i].writerEmail
        })
        // 评论数量
        let commentsNumber = result02[i].comments.length
        for (let j = 0; j < result02[i].comments.length; j++) {
            if (result02[i].comments[j].secComments) {
                commentsNumber = commentsNumber + result02[i].comments[j].secComments.length
            }
        }
        let writerHead = articleWriter[0].headImg
        let writerName = articleWriter[0].userName
        let writerId = articleWriter[0]._id
        let writerWord = articleWriter[0].word
        let articleBigM
        let articleSmM
        if (result02[i].isShow == false) { //树洞

            writerHead = 'NaN.png'
            writerName = '匿名'
            writerId = ''
            writerWord = ''
            articleSmM = '树洞'
            articleBigM = '树洞'

        } else {
            let data = await db.smallModule.findOne({
                _id: result02[i].smallmid
            })
            articleSmM = data.name
            articleBigM = data.father
        }
        data02.push({
            articleComNumber: commentsNumber,
            articleContent: result02[i].content,
            articleName: result02[i].name,
            articleId: result02[i]._id,
            articleTime: result02[i].time,
            like: result02[i].likers.length,
            unlike: result02[i].unlikers.length,
            articleBigM: articleBigM,
            articleSmM: articleSmM,
            BigM_id: result02[i].bigmid,
            SmM_id: result02[i].smallmid,
            writerHead: writerHead,
            writerName: writerName,
            writerId: writerId,
            writerWord: writerWord
        })
    }
    res.send({
        user_search: data01,
        article_search: data02
    })
});

router.post('/searchRemove', async function (req, res, next) {
    let data = await db.user.findOne({
        token: req.body.token
    })
    for (let i = 0; i < data.search_history.length; i++) {
        data.search_history[i].isOk = false
    }
    db.user.updateOne({
        token: req.body.token
    }, {
        $set: {
            search_history: data.search_history
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        } else {
            res.send({
                isDelete: true
            })
        }
    })
})

router.post('/webNotice', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let webNoticesNotAll = await db.webNotice.find({
        type: 'notAll',
        'listener.accountId': Number(user.userAccount),
        'listener.isCheck': false
    }, {
        order: 0,
        __v: 0
    })
    let infosNumber = webNoticesNotAll.length
    if (req.body.type == 'webNoticeNumber') {
        res.send({
            number: infosNumber
        })
    } else {
        let infos = []
        for (let i = 0; i < webNoticesNotAll.length; i++) {
            // 去除未包含本人的通知
            if (webNoticesNotAll[i].listener.find(item => item.accountId == user.userAccount) == undefined) {
                continue
            }
            // 进一步去除包含本人但是本人已阅读的通知
            if (webNoticesNotAll[i].listener.find(item => item.accountId == user.userAccount).isCheck == true) {
                continue
            }
            infos.push({
                content: webNoticesNotAll[i].content,
                type: webNoticesNotAll[i].type,
                sendTime: webNoticesNotAll[i].sendTime,
                _id: webNoticesNotAll[i]._id
            })
        }
        infos.sort((a, b) => (a.sendTime < b.sendTime) ? 1 : ((b.sendTime > a.sendTime) ? -1 : 0))
        res.send(infos)
    }
})

router.post('/webNoticeCheck', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    switch (req.body.checkType) {
        case 'single':
            db.webNotice.updateOne({
                _id: req.body.noticeId,
                type: req.body.noticeType,
                "listener.accountId": Number(user.userAccount)
            }, {
                $set: {
                    "listener.$.isCheck": true,
                    "listener.$.checkTime": date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                } else {
                    res.send({
                        isCheck: true
                    })
                }
            })
            break;
        case 'notSingle':
            let getData = JSON.parse(req.body.Data)
            for (let i = 0; i < getData.length; i++) {
                db.webNotice.updateOne({
                    _id: getData[i].noticeId,
                    type: getData[i].noticeType,
                    "listener.accountId": Number(user.userAccount)
                }, {
                    $set: {
                        "listener.$.isCheck": true,
                        "listener.$.checkTime": date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                    }
                }, (err, doc) => {
                    if (err) {
                        write.logerr(err)
                    }
                })
            }
            res.send({
                isCheck: true
            })
            break;
        default:
            break;
    }
})

router.post('/webEmailCheck', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let getData = JSON.parse(req.body.Data)
    for (let i = 0; i < getData.length; i++) {
        db.webUserComments.updateOne({
            _id: getData[i].id,
            isCheck: false
        }, {
            isCheck: true,
            Checkdate: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
    }
    res.send({
        isCheck: true
    })
})

router.post('/webEmail', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let data = await db.article.find({
        writerEmail: user.userEmail
    }, {
        _id: 1,
        name: 1,
        likers: 1,
        unlikers: 1,
        collectors: 1
    })
    if (req.body.type == 'webEmailNumber') {
        let infosNumber = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i].likers.length !== 0) {
                let num1 = data[i].likers.filter(item => item.isCheck == false).length
                infosNumber = infosNumber + num1
            }
            if (data[i].unlikers.length !== 0) {
                let num1 = data[i].unlikers.filter(item => item.isCheck == false).length
                infosNumber = infosNumber + num1
            }
            if (data[i].collectors.length !== 0) {
                let num1 = data[i].collectors.filter(item => item.isCheck == false).length
                infosNumber = infosNumber + num1
            }
        }
        //评论数量
        let comments = await db.webUserComments.find({
            myName: user.userEmail,
            isCheck: false
        })
        infosNumber = infosNumber + comments.length
        res.send({
            number: infosNumber
        })
    } else {
        let DATA = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].likers.length !== 0) {
                //点赞
                let smallData = data[i].likers.filter(item => item.isCheck == false)
                for (let j = 0; j < smallData.length; j++) {
                    let doUser = await db.user.findOne({
                        userEmail: smallData[j].name
                    }, {
                        userName: 1,
                        userAccount: 1
                    })
                    db.article.updateOne({
                        _id: data[i]._id,
                        'likers.name': smallData[j].name
                    }, {
                        $set: {
                            "likers.$.isCheck": true
                        }
                    }, (err, doc) => {
                        if (err) {
                            write.logerr(err)
                        }
                    })
                    smallData[j].name = doUser.userName
                    smallData[j].type = 'like'
                    DATA.push({
                        userAccount: doUser.userAccount,
                        articleId: data[i]._id,
                        articleName: data[i].name,
                        name: smallData[j].name,
                        type: smallData[j].type,
                        time: smallData[j].time
                    })
                }
            }
            if (data[i].unlikers.length !== 0) {
                // 踩一踩
                let smallData = data[i].unlikers.filter(item => item.isCheck == false)
                for (let j = 0; j < smallData.length; j++) {
                    let doUser = await db.user.findOne({
                        userEmail: smallData[j].name
                    }, {
                        userName: 1,
                        userAccount: 1
                    })
                    db.article.updateOne({
                        _id: data[i]._id,
                        'unlikers.name': smallData[j].name
                    }, {
                        $set: {
                            "unlikers.$.isCheck": true
                        }
                    }, (err, doc) => {
                        if (err) {
                            write.logerr(err)
                        }
                    })
                    smallData[j].name = doUser.userName
                    smallData[j].type = 'unlike'
                    DATA.push({
                        userAccount: doUser.userAccount,
                        articleId: data[i]._id,
                        articleName: data[i].name,
                        name: smallData[j].name,
                        type: smallData[j].type,
                        time: smallData[j].time
                    })
                }
            }
            if (data[i].collectors.length !== 0) {
                // 收藏
                let smallData = data[i].collectors.filter(item => item.isCheck == false)
                for (let j = 0; j < smallData.length; j++) {
                    let doUser = await db.user.findOne({
                        userEmail: smallData[j].name
                    }, {
                        userName: 1,
                        userAccount: 1
                    })
                    db.article.updateOne({
                        _id: data[i]._id,
                        'collectors.name': smallData[j].name
                    }, {
                        $set: {
                            "collectors.$.isCheck": true
                        }
                    }, (err, doc) => {
                        if (err) {
                            write.logerr(err)
                        }
                    })
                    smallData[j].name = doUser.userName
                    smallData[j].type = 'collect'
                    DATA.push({
                        userAccount: doUser.userAccount,
                        articleId: data[i]._id,
                        articleName: data[i].name,
                        name: smallData[j].name,
                        type: smallData[j].type,
                        time: smallData[j].time
                    })
                }
            }
        }
        //评论
        let comments = await db.webUserComments.find({
            myName: user.userEmail,
            isCheck: false
        }, {
            _id: 1,
            articleId: 1,
            myName: 1,
            anotherName: 1,
            date: 1
        })
        for (let i = 0; i < comments.length; i++) {
            let article = await db.article.findOne({
                _id: comments[i].articleId
            }, {
                name: 1
            })
            //被评论者
            let user01 = await db.user.findOne({
                userEmail: comments[i].myName
            }, {
                userName: 1
            })
            //评论者
            let user02 = await db.user.findOne({
                userEmail: comments[i].anotherName
            }, {
                userAccount: 1,
                userName: 1
            })
            DATA.push({
                userAccount: user02.userAccount,
                articleId: article._id,
                myName: user01.userName,
                anotherName: user02.userName,
                articleName: article.name,
                time: comments[i].date,
                id: comments[i]._id,
                type: "comment"
            })
        }
        DATA.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
        res.send(DATA)
    }
})

// diycss
router.post('/FreeCss', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let oldCss = user.FreeCss
    if (oldCss == undefined) {
        oldCss = ''
    }
    let newCss = oldCss + req.body.css
    db.user.updateOne({
        token: req.body.token
    }, {
        $set: {
            FreeCss: newCss
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        } else {
            res.send({
                isDiy: true
            })
        }
    })
})

// cancel_css
router.post('/FreeCss_Default', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    db.user.updateOne({
        token: req.body.token
    }, {
        $set: {
            FreeCss: undefined
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        } else {
            res.send({
                isDiy: true
            })
        }
    })
})

module.exports = router;