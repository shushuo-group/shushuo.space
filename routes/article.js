const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const write = require('../middleware/consolelog');
router.get('/', async function (req, res, next) {
    res.render('article.html');
})

async function commentDelete(articleid, fatherid, seccommentid) {
    let a = await db.article.findOne({
        '_id': articleid //文章id
    }, {
        comments: 1
    })
    let b = a.comments.find(ele => ele.id == fatherid).secComments
    let c = a.comments.find(ele => ele.id == fatherid).secComments.find(ele => ele.id == seccommentid)
    let index = b.indexOf(c)
    c.isOK = false
    b[index] = c

    db.article.updateOne({
        'comments.secComments.id': seccommentid
    }, {
        $set: {
            'comments.$.secComments': b
        }
    }, function (err) {
        if (err) {
            write.logerr(err)
        }
    })
}



//获取文章信息
router.post('/articleDetail', async function (req, res, next) {
    let article = await db.article.findOne({
        _id: req.body.articleId,
        isOk: true,
        isPublic: true
    })
    //作者信息
    let user = await db.user.findOne({
        userEmail: article.writerEmail
    }, {
        userAccount: 1,
        headImg: 1,
        userName: 1,
        _id: 1,
        word: 1
    })
    //浏览者信息
    let userWatch = await db.user.findOne({
        token: req.body.token,
        isRegister: true
    }, {
        token: 1,
        userEmail: 1
    })
    let isLogin = false
    let islike = false
    let isunlike = false
    let iscollect = false
    if (userWatch !== null) {
        if (req.body.token == userWatch.token) {
            isLogin = true
        }
        if (article.likers.find(item => item.name == userWatch.userEmail)) {
            islike = true
        }
        if (article.unlikers.find(item => item.name == userWatch.userEmail)) {
            isunlike = true
        }
        if (article.collectors.find(item => item.name == userWatch.userEmail)) {
            iscollect = true
        }
    }
    if (article.isShow === true) {
        //非树洞内的文章
        let bigM = await db.largeModule.findOne({
            _id: article.bigmid
        }, {
            name: 1
        })
        let smallM = await db.smallModule.findOne({
            _id: article.smallmid
        }, {
            name: 1
        })
        let commentsHead = []
        for (let i = 0; i < article.comments.length; i++) {

            if (article.comments[i].isOK == false) {
                article.comments[i].content = '<i><b><u>该评论已删除</u></b></i>'
            }

            let commentsuser = await db.user.findOne({
                userEmail: article.comments[i].comUser
            }, {
                headImg: 1
            })
            commentsHead.push({
                headImg: commentsuser.headImg
            })
        }
        let comments = article.comments
        let commentsNumber = article.comments.length
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].secComments) {
                for (let j = 0; j < comments[i].secComments.length; j++) {

                    if (comments[i].secComments[j].isOK == false) {
                        comments[i].secComments[j].content = '<i><b><u>该评论已删除</u></b></i>'
                    }


                    let secUser = await db.user.findOne({
                        userEmail: comments[i].secComments[j].comUserEmail
                    }, {
                        userAccount: 1,
                        headImg: 1,
                        userName: 1
                    })

                    delete comments[i].secComments[j].comUserEmail
                    delete comments[i].secComments[j].isOK

                    comments[i].secComments[j].user_id = secUser._id
                    comments[i].secComments[j].accountId = secUser.userAccount
                    comments[i].secComments[j].comUserHead = secUser.headImg
                    comments[i].secComments[j].comUserName = secUser.userName
                }
                commentsNumber += comments[i].secComments.length
                comments[i].secComments_number = comments[i].secComments.length
            }

            let usercommen = await db.user.findOne({
                userEmail: comments[i].comUser
            }, {
                userName: 1,
                userAccount: 1
            })
            comments[i].comUser = usercommen.userName
            comments[i].accountId = usercommen.userAccount
            comments[i].user_id = usercommen._id

        }

        let articleSend = {
            content: article.content,
            title: article.name,
            time: article.time,
            comments,
            likersNumber: article.likers.length,
            unlikersNumber: article.unlikers.length,
            collectorsNumber: article.collectors.length,
            commentsNumber: commentsNumber,
            bigMname: bigM.name,
            smallMname: smallM.name,
            writerId: user._id,
            writerHead: user.headImg,
            writerName: user.userName,
            writerSign: user.word,
            headImgs: commentsHead
        }
        res.send({
            islogin: isLogin,
            isShuDong: false,
            sendData: articleSend,
            isLike: islike,
            isCollect: iscollect,
            isUnlike: isunlike
        })
    } else {
        // 树洞内的文章
        let commentsHead = []
        for (let i = 0; i < article.comments.length; i++) {

            if (article.comments[i].isOK == false) {
                article.comments[i].content = '<i><b><u>该评论已删除</u></b></i>'
            }

            let commentsuser = await db.user.findOne({
                userEmail: article.comments[i].comUser
            }, {
                headImg: 1
            })
            commentsHead.push({
                headImg: commentsuser.headImg
            })
        }
        let comments = article.comments
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].secComments) {
                for (let j = 0; j < comments[i].secComments.length; j++) {

                    if (comments[i].secComments[j].isOK == false) {
                        comments[i].secComments[j].content = '<i><b><u>该评论已删除</u></b></i>'
                    }

                    let secUser = await db.user.findOne({
                        userEmail: comments[i].secComments[j].comUserEmail
                    }, {
                        userAccount: 1,
                        headImg: 1,
                        userName: 1
                    })

                    delete comments[i].secComments[j].comUserEmail
                    delete comments[i].secComments[j].id
                    delete comments[i].secComments[j].isOK

                    comments[i].secComments[j].accountId = secUser.userAccount
                    comments[i].secComments[j].comUserHead = secUser.headImg
                    comments[i].secComments[j].comUserName = secUser.userName
                    comments[i].secComments[j].user_id = secUser._id
                }
                comments[i].secComments_number = comments[i].secComments.length
            }

            let usercommen = await db.user.findOne({
                userEmail: comments[i].comUser
            }, {
                userName: 1,
                userAccount: 1
            })
            comments[i].comUser = usercommen.userName
            comments[i].accountId = usercommen.userAccount
            comments[i].user_id = usercommen._id

        }
        let articleSend = {
            content: article.content,
            title: article.name,
            time: article.time,
            comments,
            comments: article.comments,
            likersNumber: article.likers.length,
            unlikersNumber: article.unlikers.length,
            collectorsNumber: article.collectors.length,
            commentsNumber: article.comments.length,
            headImgs: commentsHead
        }
        res.send({
            islogin: isLogin,
            isShuDong: true,
            sendData: articleSend,
            isLike: islike,
            isCollect: iscollect,
            isUnlike: isunlike
        })
    }
})

//删除文章的操作(去回收站)
router.post('/articleDelete', async function (req, res, next) {
    if (req.body.token === undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token,
            isOk: true
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            //到这一步已经确定了可以根据本地token找到用户信息
            db.article.updateOne({
                _id: req.body.articleId
            }, {
                isOk: false
            }, function (err) {
                if (err) {
                    write.logerr(err)
                }
            })

            res.send({
                isLogin: true,
                isDelete: true
            })
        }
    }
})

//草稿箱_删除文章的操作(不会去回收站)
router.post('/draftBoxDelete', async function (req, res, next) {
    if (req.body.token === undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token,
            isOk: true
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            //到这一步已经确定了可以根据本地token找到用户信息
            db.article.updateOne({
                _id: req.body.articleId
            }, {
                isOk: false
            }, function (err) {
                if (err) {
                    write.logerr(err)
                }
            })

            res.send({
                isLogin: true,
                isDelete: true
            })
        }
    }
})

//恢复文章的操作(出回收站)
router.post('/articleBack', async function (req, res, next) {
    if (req.body.token === undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token,
            isOk: true
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            //到这一步已经确定了可以根据本地token找到用户信息
            db.article.updateOne({
                _id: req.body.articleId
            }, {
                isOk: true
            }, function (err) {
                if (err) {
                    write.logerr(err)
                }
            })

            res.send({
                isLogin: true,
                isBack: true
            })
        }
    }
})

//删除评论的操作
router.post('/commentDelete', async function (req, res, next) {
    if (req.body.token === undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token,
            isOk: true
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {

            switch (req.body.isSec) {
                case 'false':

                    db.user.updateOne({
                        'commentArticles.id': req.body.commentid
                    }, {
                        'commentArticles.$.isOK': false
                    }, function (err) {
                        if (err) {
                            write.logerr(err)
                        }
                    })

                    db.article.updateOne({
                        'comments.id': req.body.commentid
                    }, {
                        'comments.$.isOK': false
                    }, function (err) {
                        if (err) {
                            write.logerr(err)
                        }
                    })

                    break;
                case 'true':

                    db.user.updateOne({
                        'commentArticles.id': req.body.commentid
                    }, {
                        'commentArticles.$.isOK': false
                    }, function (err) {
                        if (err) {
                            write.logerr(err)
                        }
                    })

                    commentDelete(req.body.articleid, req.body.fatherid, req.body.commentid)

                    break;
                default:
                    break;
            }


            res.send({
                isLogin: true,
                isDelete: true
            })
        }
    }
})

//草稿箱_编辑_获取文章信息
router.post('/articleDetail02', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let userMove = await db.user.findOne({
        token: req.body.token
    }, {
        userEmail: 1
    })
    if (userMove == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let article = await db.article.findOne({
        _id: req.body.articleId,
        isPublic: false
    })
    if (article == null) {
        res.send({
            isLogin: false
        })
        return
    }
    if (article.writerEmail !== userMove.userEmail) { //确认操作者不是本人
        return
    }
    let data = {
        id: article._id,
        title: article.name,
        conntent: article.content,
        time: article.time
    }
    res.send(data)
})

//已发布文章_编辑_获取文章信息
router.post('/articleDetail03', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let userMove = await db.user.findOne({
        token: req.body.token
    }, {
        userEmail: 1
    })
    if (userMove == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let article = await db.article.findOne({
        _id: req.body.articleId
    }, {
        writerEmail: 1,
        _id: 1,
        name: 1,
        content: 1,
    })
    if (article == null) {
        res.send({
            isLogin: false
        })
        return
    }
    if (article.writerEmail !== userMove.userEmail) { //确认操作者不是本人
        return
    }
    let data = {
        id: article._id,
        title: article.name,
        conntent: article.content
    }
    res.send(data)
})

module.exports = router;