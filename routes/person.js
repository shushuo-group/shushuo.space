const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const write = require('../middleware/consolelog');

router.get('/', function (req, res, next) {
    res.render('person.html');
});

router.post('/sendToken', async function (req, res, next) {
    if (req.body.token == undefined) {
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
            let isOwn = null;
            if(user._id.toString() === req.body.userId){
                //本人账号
                isOwn = true
            }else{
                //非本人账号
                isOwn = false
            }
            let userInfors = {
                userName: user.userName,
                userEmail: user.userEmail,
                registerDate: user.registerDate,
                finLogTime: user.finLogTime,
                emailShow: user.emailShow,
                finLogTime: user.finLogTime,
                headImg: user.headImg
            }
            //到这一步已经确定了可以根据本地token找到用户信息
            res.send({
                isLogin: true,
                isOwn: isOwn,
                user: userInfors
            })
        }
    }
})

router.post('/sendToken_travel', async function (req, res, next) {
    let user = await db.user.findOne({
        _id: req.body.userId,
        isOk: true
    }, {
        headImg: 1
    })

    let data = user.headImg
    if (data === 'NaN.png') {
        data = 'staticIMG/NaN.png'
    }

    res.send(data)
})

//查看个人信息
router.post('/person', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        }, {
            userName: 1,
            userEmail: 1,
            word: 1,
            userAccount: 1
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            res.send({
                userName: user.userName,
                userEmail: user.userEmail,
                userAccount: user.userAccount,
                word: user.word
            })
        }
    }
})

//游客查看文章信息
router.post('/article_travel', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        _id: req.body.userId
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let article = []
    let articles = await db.article.find({
        writerEmail: user.userEmail,
        isShow: true,
        isOk: true,
        isPublic: true
    }).sort({
        _id: -1
    })
    for (let i = 0; i < articles.length; i++) {
        let commentsNumber = articles[i].comments.length
        for (let j = 0; j < articles[i].comments.length; j++) {
            if (articles[i].comments[j].secComments) {
                commentsNumber += articles[i].comments[j].secComments.length
            }
        }
        if (articles[i].smallmid == 'shuDong') {
            article.push({
                _id: articles[i]._id,
                name: articles[i].name,
                content: articles[i].content,
                bigmName: '树洞',
                smallName: '',
                time: articles[i].time,
                likerslength: articles[i].likers.length,
                unlikerslength: articles[i].unlikers.length,
                collectorslength: articles[i].collectors.length,
                commentslength: commentsNumber
            })
        } else {
            let smallM = await db.smallModule.findOne({
                _id: articles[i].smallmid
            })
            article.push({
                _id: articles[i]._id,
                name: articles[i].name,
                content: articles[i].content,
                bigmName: smallM.father,
                smallName: smallM.name,
                time: articles[i].time,
                likerslength: articles[i].likers.length,
                unlikerslength: articles[i].unlikers.length,
                collectorslength: articles[i].collectors.length,
                commentslength: commentsNumber
            })
        }
    }
    res.send({
        data: article
    })
})

//游客评论信息
router.post('/comment_travel', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        _id: req.body.userId
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let article = []
    for (let i = 0; i < user.commentArticles.length; i++) {
        let articles = await db.article.findOne({
            _id: user.commentArticles[i].articleId,
            isOk: true,
            isPublic: true
        })
        if (articles == null) {
            continue
        }
        let Writer = await db.user.findOne({
            userEmail: articles.writerEmail
        })
        article.push({
            articleName: articles.name,
            articleContent: articles.content,
            articleId: articles._id,
            articleTime: articles.time,
            articleWriter: Writer.userName,
            contentTime: user.commentArticles[i].time,
            content: user.commentArticles[i].content,
            contentType: user.commentArticles[i].type
        })
    }
    res.send({
        data: article
    })
})

//查看个人信息
router.post('/person', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            res.send({
                userName: user.userName,
                userEmail: user.userEmail,
                word: user.word
            })
        }
    }
})

//查看点赞信息
router.post('/like', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            let article = []
            for (let i = 0; i < user.likeArticles.length; i++) {
                let articles = await db.article.findOne({
                    _id: user.likeArticles[i].articleId,
                    isOk: true,
                    isPublic: true
                })
                if (articles == null) {
                    continue
                }
                let Writer = await db.user.findOne({
                    userEmail: articles.writerEmail
                })
                if (articles.smallmid == 'shuDong') {
                    article.push({
                        bigmName: '树洞',
                        smallName: '',
                        articleName: articles.name,
                        articleContent: articles.content,
                        articleId: articles._id,
                        articleTime: articles.time,
                        articleWriter: Writer.userName
                    })
                } else {
                    let smallM = await db.smallModule.findOne({
                        _id: articles.smallmid
                    })
                    article.push({
                        bigmName: smallM.father,
                        smallName: smallM.name,
                        articleName: articles.name,
                        articleContent: articles.content,
                        articleId: articles._id,
                        articleTime: articles.time,
                        articleWriter: Writer.userName
                    })
                }
            }
            res.send({
                data: article
            })
        }
    }
})

//查看收藏信息
router.post('/collect', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            let article = []
            for (let i = 0; i < user.collectArticles.length; i++) {
                let articles = await db.article.findOne({
                    _id: user.collectArticles[i].articleId,
                    isOk: true,
                    isPublic: true
                })
                if (articles == null) {
                    continue
                }
                let Writer = await db.user.findOne({
                    userEmail: articles.writerEmail
                })
                if (articles.smallmid == 'shuDong') {
                    article.push({
                        bigmName: '树洞',
                        smallName: '',
                        articleName: articles.name,
                        articleContent: articles.content,
                        articleId: articles._id,
                        articleTime: articles.time,
                        articleWriter: Writer.userName
                    })
                } else {
                    let smallM = await db.smallModule.findOne({
                        _id: articles.smallmid
                    })
                    article.push({
                        bigmName: smallM.father,
                        smallName: smallM.name,
                        articleName: articles.name,
                        articleContent: articles.content,
                        articleId: articles._id,
                        articleTime: articles.time,
                        articleWriter: Writer.userName
                    })
                }
            }
            res.send({
                data: article
            })
        }
    }
})

//查看评论信息
router.post('/comment', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            let article = []
            for (let i = 0; i < user.commentArticles.length; i++) {
                let articles = await db.article.findOne({
                    _id: user.commentArticles[i].articleId,
                    isOk: true,
                    isPublic: true
                })
                if (articles == null) {
                    continue
                }
                let Writer = await db.user.findOne({
                    userEmail: articles.writerEmail
                })
                if (articles.smallmid == 'shuDong') {
                    if (user.commentArticles[i].isOK == false) {
                        continue
                    }
                    if (user.commentArticles[i].isSec == true) {
                        fatherid = user.commentArticles[i].fatherid
                        isSec = true
                    } else {
                        isSec = false
                        fatherid = NaN
                    }
                    article.push({
                        fatherid: fatherid,
                        isSec: isSec,
                        bigmName: '树洞',
                        smallName: '',
                        articleName: articles.name,
                        articleId: articles._id,
                        articleContent: articles.content,
                        commentId: user.commentArticles[i].id,
                        articleTime: articles.time,
                        articleWriter: Writer.userName,
                        contentTime: user.commentArticles[i].time,
                        content: user.commentArticles[i].content,
                        contentType: user.commentArticles[i].type
                    })
                } else {
                    if (user.commentArticles[i].isOK == false) {
                        continue
                    }
                    if (user.commentArticles[i].isSec == true) {
                        fatherid = user.commentArticles[i].fatherid
                        isSec = true
                    } else {
                        isSec = false
                        fatherid = NaN
                    }
                    let smallM = await db.smallModule.findOne({
                        _id: articles.smallmid
                    })
                    article.push({
                        fatherid: fatherid,
                        isSec: isSec,
                        articleId: articles._id,
                        bigmName: smallM.father,
                        smallName: smallM.name,
                        articleName: articles.name,
                        articleContent: articles.content,
                        commentId: user.commentArticles[i].id,
                        articleTime: articles.time,
                        articleWriter: Writer.userName,
                        contentTime: user.commentArticles[i].time,
                        content: user.commentArticles[i].content,
                        contentType: user.commentArticles[i].type
                    })
                }
            }
            res.send({
                data: article
            })
        }
    }
})

//查看文章信息
router.post('/article', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
            return
        }
        let article = []
        let articles = await db.article.find({
            writerEmail: user.userEmail,
            isOk: true,
            isPublic: true
        }).sort({
            _id: -1
        })
        for (let i = 0; i < articles.length; i++) {
            let commentsNumber = articles[i].comments.length
            for (let j = 0; j < articles[i].comments.length; j++) {
                if (articles[i].comments[j].secComments) {
                    commentsNumber += articles[i].comments[j].secComments.length
                }
            }
            if (articles[i].smallmid == 'shuDong') {
                article.push({
                    _id: articles[i]._id,
                    name: articles[i].name,
                    content: articles[i].content,
                    bigmName: '树洞',
                    smallName: '',
                    time: articles[i].time,
                    likerslength: articles[i].likers.length,
                    unlikerslength: articles[i].unlikers.length,
                    collectorslength: articles[i].collectors.length,
                    commentslength: commentsNumber
                })
            } else {
                let smallM = await db.smallModule.findOne({
                    _id: articles[i].smallmid
                })
                article.push({
                    _id: articles[i]._id,
                    name: articles[i].name,
                    content: articles[i].content,
                    bigmName: smallM.father,
                    smallName: smallM.name,
                    time: articles[i].time,
                    likerslength: articles[i].likers.length,
                    unlikerslength: articles[i].unlikers.length,
                    collectorslength: articles[i].collectors.length,
                    commentslength: commentsNumber
                })
            }
        }
        res.send({
            data: article
        })
    }
})

//查看草稿箱信息
router.post('/waitPublish', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
            return
        }
        let article = []
        let articles = await db.article.find({
            writerEmail: user.userEmail,
            isPublic: false,
            isOk: true
        }).sort({
            _id: -1
        })
        for (let i = 0; i < articles.length; i++) {
            article.push({
                _id: articles[i]._id,
                name: articles[i].name,
                time: articles[i].time,
            })
        }
        res.send({
            data: article
        })
    }
})

//查看回收站信息
router.post('/haveDelete', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user == null) {
            res.send({
                isLogin: false
            })
            return
        }
        let article = []
        let articles = await db.article.find({
            writerEmail: user.userEmail,
            isOk: false,
            isPublic: true
        }).sort({
            _id: -1
        })
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].smallmid == 'shuDong') {
                article.push({
                    _id: articles[i]._id,
                    name: articles[i].name,
                    content: articles[i].content,
                    bigmName: '树洞',
                    smallName: '',
                    time: articles[i].time,
                    likerslength: articles[i].likers.length,
                    unlikerslength: articles[i].unlikers.length,
                    collectorslength: articles[i].collectors.length,
                    commentslength: articles[i].comments.length
                })
            } else {
                let smallM = await db.smallModule.findOne({
                    _id: articles[i].smallmid
                })
                article.push({
                    _id: articles[i]._id,
                    name: articles[i].name,
                    content: articles[i].content,
                    bigmName: smallM.father,
                    smallName: smallM.name,
                    time: articles[i].time,
                    likerslength: articles[i].likers.length,
                    unlikerslength: articles[i].unlikers.length,
                    collectorslength: articles[i].collectors.length,
                    commentslength: articles[i].comments.length
                })
            }
        }
        res.send({
            data: article
        })
    }
})

//修改个人资料
router.post('/personChange', async function (req, res, next) {
    if (req.body.token == undefined) {
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: req.body.token
    })
    if (user == null) {
        res.send({
            isLogin: false
        })
        return
    }
    let user02 = await db.user.findOne({
        userName: req.body.nickName
    })
    if (user02 !== null) {
        if (user02.userEmail !== user.userEmail) { //有另外一个人先用了这个ID
            res.send({
                isHave: true
            })
            return
        }
    }
    db.user.updateMany({
        token: req.body.token
    }, {
        $set: {
            userName: req.body.nickName,
            word: req.body.signWord,
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        } else {
            res.send({
                isChange: true
            })
        }
    })
})

module.exports = router;