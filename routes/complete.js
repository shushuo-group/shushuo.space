/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const db = require('../mongodb/mongodb');
const router = express.Router();
const random = require('string-random');
const date = require("silly-datetime");
const write = require('../middleware/consolelog');

// like按钮的事件
router.post('/like', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        likeArticles: 1,
        unlikeArticles: 1,
        userEmail: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //确定了操作对象后 进行对数据库的操作
    if (user.unlikeArticles.find(item => item.articleId == req.body.articleId) !== undefined) {
        //该文章正处于踩一踩状态
        //取消踩一踩
        let Time = user.unlikeArticles.find(item => item.articleId == req.body.articleId).time
        db.user.updateOne({
            token: req.body.token
        }, {
            $pull: {
                unlikeArticles: {
                    articleId: req.body.articleId,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        db.article.updateOne({
            '_id': req.body.articleId
        }, {
            $pull: {
                unlikers: {
                    name: user.userEmail,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        //点赞
        Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        db.user.updateOne({
            token: req.body.token
        }, {
            $push: {
                likeArticles: {
                    articleId: req.body.articleId,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        db.article.updateOne({
            '_id': req.body.articleId
        }, {
            $push: {
                likers: {
                    name: user.userEmail,
                    isCheck: false,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        res.send({
            isunLike: false,
            isLike: true,
            isLogin: true,
            isCommen: false
        })
    } else {
        if (user.likeArticles.find(item => item.articleId == req.body.articleId) == undefined) {
            //点赞
            let Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            db.user.updateOne({
                token: req.body.token
            }, {
                $push: {
                    likeArticles: {
                        articleId: req.body.articleId,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            db.article.updateOne({
                '_id': req.body.articleId
            }, {
                $push: {
                    likers: {
                        name: user.userEmail,
                        isCheck: false,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            let userInfor = await db.user.findOne({
                userEmail: user.userEmail
            }, {
                likeArticles: 1
            })
            let likeArticles = []
            for (let i = 0; i < userInfor.likeArticles.length; i++) {
                likeArticles.push({
                    articleId: userInfor.likeArticles[i].articleId
                })
            }
            res.send({
                isLike: true,
                isLogin: true,
                isCommen: true
            })
        } else {
            //取消点赞
            let Time = user.likeArticles.find(item => item.articleId == req.body.articleId).time
            db.user.updateOne({
                token: req.body.token
            }, {
                $pull: {
                    likeArticles: {
                        articleId: req.body.articleId,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            db.article.updateOne({
                '_id': req.body.articleId
            }, {
                $pull: {
                    likers: {
                        name: user.userEmail,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            let userInfor = await db.user.findOne({
                userEmail: user.userEmail
            }, {
                likeArticles: 1
            })
            let likeArticles = []
            for (let i = 0; i < userInfor.likeArticles.length; i++) {
                likeArticles.push({
                    articleId: userInfor.likeArticles[i].articleId
                })
            }
            res.send({
                isLike: false,
                isLogin: true,
                isCommen: true
            })
        }
    }
});

// unlike按钮的事件
router.post('/unlike', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        unlikeArticles: 1,
        likeArticles: 1,
        userEmail: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //确定了操作对象后 进行对数据库的操作
    if (user.likeArticles.find(item => item.articleId == req.body.articleId) !== undefined) {
        //该文章正处于点赞状态
        //取消点赞
        let Time = user.likeArticles.find(item => item.articleId == req.body.articleId).time
        db.user.updateOne({
            token: req.body.token
        }, {
            $pull: {
                likeArticles: {
                    articleId: req.body.articleId,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        db.article.updateOne({
            '_id': req.body.articleId
        }, {
            $pull: {
                likers: {
                    name: user.userEmail,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        //踩
        Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        db.user.updateOne({
            token: req.body.token
        }, {
            $push: {
                unlikeArticles: {
                    articleId: req.body.articleId,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        db.article.updateOne({
            '_id': req.body.articleId
        }, {
            $push: {
                unlikers: {
                    name: user.userEmail,
                    isCheck: false,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        res.send({
            isunLike: true,
            isLike: false,
            isLogin: true,
            isCommen: false
        })
    } else {
        if (user.unlikeArticles.find(item => item.articleId == req.body.articleId) == undefined) {
            //踩
            let Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            db.user.updateOne({
                token: req.body.token
            }, {
                $push: {
                    unlikeArticles: {
                        articleId: req.body.articleId,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            db.article.updateOne({
                '_id': req.body.articleId
            }, {
                $push: {
                    unlikers: {
                        name: user.userEmail,
                        isCheck: false,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            res.send({
                isunLike: true,
                isLogin: true,
                isCommen: true
            })
        } else {
            //取消踩
            let Time = user.unlikeArticles.find(item => item.articleId == req.body.articleId).time
            db.user.updateOne({
                token: req.body.token
            }, {
                $pull: {
                    unlikeArticles: {
                        articleId: req.body.articleId,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            db.article.updateOne({
                '_id': req.body.articleId
            }, {
                $pull: {
                    unlikers: {
                        name: user.userEmail,
                        time: Time
                    }
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            res.send({
                isunLike: false,
                isLogin: true,
                isCommen: true
            })
        }
    }
});

// 收藏文章事件
router.post('/collect', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        collectArticles: 1,
        userEmail: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //确定了操作对象后 进行对数据库的操作
    if (user.collectArticles.find(item => item.articleId == req.body.articleId) == undefined) {
        //内容还没有被作者收藏
        let Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        db.article.updateOne({
            '_id': req.body.articleId
        }, {
            $push: {
                collectors: {
                    name: user.userEmail,
                    isCheck: false,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        db.user.updateOne({
            token: req.body.token
        }, {
            $push: {
                collectArticles: {
                    articleId: req.body.articleId,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        res.send({
            isCollect: true,
            isLogin: true
        })
    } else {
        //已经收藏了 接下来将进行取消收藏
        let Time = user.collectArticles.find(item => item.articleId == req.body.articleId).time
        db.article.updateOne({
            '_id': req.body.articleId
        }, {
            $pull: {
                collectors: {
                    name: user.userEmail,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        db.user.updateOne({
            token: req.body.token
        }, {
            $pull: {
                collectArticles: {
                    articleId: req.body.articleId,
                    time: Time
                }
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        res.send({
            isCollect: false,
            isLogin: true
        })
    }
})

//举报事件
router.post('/report', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        userEmail: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //确定了操作对象后 进行对数据库的操作
    db.illegalArticle.create({
        Name: req.body.articleName,
        Callemail: user.userEmail,
        articleID: req.body.articleId,
        time: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        reason: req.body.reason
    })
    res.send({
        isReport: true
    })
})

//查看评论区事件
router.post('/commentGet', async function (req, res, next) {
    //确定了操作对象后 进行对数据库的操作
    let article = await db.article.findOne({
        _id: req.body.articleId
    }, {
        comments: 1
    })
    let comments = article.comments
    for (let i = 0; i < comments.length; i++) {
        if (comments[i].isOK == false) {
            comments[i].content = '/*该评论已删除*/'
        }
        let smallUser = await db.user.findOne({
            userEmail: comments[i].comUser
        }, {
            headImg: 1,
            userName: 1
        })
        comments[i].headimg = smallUser.headImg
        comments[i].comUser = smallUser.userName
        comments[i].comUserId = smallUser._id
        if (comments[i].secComments) {
            for (let j = 0; j < comments[i].secComments.length; j++) {
                if (comments[i].secComments[j].isOK == false) {
                    comments[i].secComments[j].content = '/*该评论已删除*/'
                }
                let smallUser = await db.user.findOne({
                    userEmail: comments[i].secComments[j].comUserEmail
                }, {
                    headImg: 1,
                    userName: 1
                })
                comments[i].secComments[j].comUserHead = smallUser.headImg
                comments[i].secComments[j].comUserName = smallUser.userName
                comments[i].secComments[j].comUserId = smallUser._id
            }
            comments[i].secComments_number = comments[i].secComments.length
        }
    }
    res.send({
        comment: comments
    })
})

//上传评论功能
router.post('/commentSub', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        userEmail: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //确定了操作对象后 进行对数据库的操作
    let Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let commentId = Date.now() + random(4)
    db.article.updateOne({
        _id: req.body.articleId
    }, {
        $push: {
            comments: {
                id: commentId,
                content: req.body.content,
                comUser: user.userEmail,
                time: Time,
                isOK: true
            }
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    let article = await db.article.findOne({
        _id: req.body.articleId
    }, {
        writerEmail: 1,
        _id: 1
    })
    db.webUserComments.create({
        myName: article.writerEmail,
        articleId: article._id,
        anotherName: user.userEmail,
        isCheck: false,
        date: Time
    })
    db.user.updateOne({
        token: req.body.token
    }, {
        $push: {
            commentArticles: {
                articleId: req.body.articleId,
                id: commentId,
                content: req.body.content,
                type: 'firstComment',
                time: Time,
                isOK: true
            }
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    res.send({
        isComment: true,
        time: Time,
        commentId
    })
})

//层内评论功能
router.post('/secCommentSub', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        userEmail: 1,
        headImg: 1,
        userName: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //该层内 的评论的实时数量
    let Time = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    let commentId = Date.now() + random(4)
    //就是这段代码实现了二次评论功能
    db.article.updateOne({
        'comments.id': req.body.floorCommentId
    }, {
        $push: {
            'comments.$.secComments': {
                id: commentId, //评论id
                content: req.body.content, //评论内容
                comUserEmail: user.userEmail, //评论者唯一标志 email
                time: Time, //评论时间
                isOK: true
            }
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    let article = await db.article.findOne({
        _id: req.body.articleId
    }, {
        comments: 1
    })
    let becomment = article.comments.find(item => item.id == req.body.floorCommentId)
    db.webUserComments.create({
        myName: becomment.comUser,
        articleId: req.body.articleId,
        anotherName: user.userEmail,
        isCheck: false,
        date: Time
    })
    //这里需要写什么还需要根据业务具体需求决定
    db.user.updateOne({
        token: req.body.token
    }, {
        $push: {
            commentArticles: {
                fatherid: req.body.floorCommentId, //父亲评论id
                articleId: req.body.articleId,
                id: commentId,
                content: req.body.content,
                type: 'secondComment',
                time: Time,
                isOK: true,
                isSec: true
            }
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    res.send({
        isSuccess: true,
        time: Time,
        comUserHead: user.headImg,
        id: commentId,
        comUserName: user.userName
    })
})

//添加小模块功能
router.post('/addsmallM', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    }, {
        userEmail: 1
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    //确定了操作对象后 进行对数据库的操作
    db.waitAddSmallModule.create({
        smallMname: req.body.smallMName,
        Callemail: user.userEmail,
        bigMiD: req.body.bigMId,
        time: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        reason: req.body.reason
    })
    res.send({
        isUpAdd: true
    })
})

//主动刷新热榜模块
router.post('/hotFlesh', async function (req, res, next) {
    let articles = await db.article.find({
        isPublic: true,
        isOk: true
    })
    //清空所有热榜信息
    await db.hotList.deleteMany({}, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    for (let i = 0; i < articles.length; i++) {
        let commentsLength = articles[i].comments.length //总评论数 二级评论 ＋ 一级评论
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments !== undefined) {
                commentsLength += articles[i].comments[j].secComments.length
            }
        }
        //仅由评论点赞的基础分数
        let tempNow = articles[i].likers.length * 1 + articles[i].unlikers.length * (-1) + articles[i].collectors.length * 2 + commentsLength * 0.5
        let tempPass = Math.floor((Date.now() - new Date(articles[i].time).getTime()) / 1000 / 3600 / 24) //随时间过去而冷却的天数
        let score = 5 * (tempNow  + 1) / Math.pow(tempPass + 1, 1.8) //当前分数  写到文章表里
        //1.8衰减参数，1作者影响因子

        await db.article.updateOne({
            _id: articles[i]._id
        }, {
            $set: {
                scores: score,
            }
        }, function (err, docs) {
            if (err) {
                write.logerr(err)
            }
        })
        //添加热榜的内容
        let bigm = {
            name: '树洞'
        }
        let smallm = {
            name: ''
        }
        if (articles[i].smallmid !== 'shuDong') {
            bigm = await db.largeModule.findOne({
                _id: articles[i].bigmid
            }, {
                name: 1
            })
            smallm = await db.smallModule.findOne({
                _id: articles[i].smallmid
            }, {
                name: 1
            })
        }
        await db.hotList.create({
            name: articles[i].name,
            smallname: smallm.name,
            bigmname: bigm.name,
            id: articles[i]._id,
            order: score
        })
    }
    let data = await db.hotList.find({}).sort({
        'order': '-1'
    }).limit(30)
    res.send(data)
})

module.exports = router;

setInterval(() => {
    hot()
}, 1000 * 60 * 5); //每隔五分钟进行一次热度计算

//通过统计文章数据 进行分析热度排名
async function hot() {
    let articles = await db.article.find({
        isPublic: true,
        isOk: true
    })
    //清空所有热榜信息
    db.hotList.deleteMany({}, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    for (let i = 0; i < articles.length; i++) {
        let commentsLength = articles[i].comments.length //总评论数 二级评论 ＋ 一级评论
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments !== undefined) {
                commentsLength += articles[i].comments[j].secComments.length
            }
        }
        let tempNow = articles[i].likers.length * 1 + articles[i].unlikers.length * (-1) + articles[i].collectors.length * 2 + commentsLength * 0.5
        let tempPass = Math.floor((Date.now() - new Date(articles[i].time).getTime()) / 1000 / 3600 / 24) //随时间过去而冷却的天数
        let score = 5 * (tempNow  + 1) / Math.pow(tempPass + 1, 1.8)

        db.article.updateOne({
            _id: articles[i]._id
        }, {
            scores: score
        }, function (err, docs) {
            if (err) {
                write.logerr(err)
            }
        })
        //添加热榜的内容
        let bigm = {
            name: '树洞'
        }
        let smallm = {
            name: ''
        }
        if (articles[i].smallmid !== 'shuDong') {
            bigm = await db.largeModule.findOne({
                _id: articles[i].bigmid
            }, {
                name: 1
            })
            smallm = await db.smallModule.findOne({
                _id: articles[i].smallmid
            }, {
                name: 1
            })
        }
        //目前有进行热度冷却
        db.hotList.create({
            name: articles[i].name,
            smallname: smallm.name,
            bigmname: bigm.name,
            id: articles[i]._id,
            order: score
        })
    }
}
