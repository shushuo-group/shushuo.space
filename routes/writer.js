const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const jwt = require("jsonwebtoken");
const date = require("silly-datetime");
const write = require('../middleware/consolelog');
const xss = require("xss");

router.get('/', function (req, res, next) {
    res.render('writer.html');
});

router.post('/articleUpDating', async function (req, res, next) {
    //未解密token
    let tokenGet = req.body.token
    if (tokenGet == undefined) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    let user = await db.user.findOne({
        token: tokenGet,
        isOk: true
    })
    if (user == null) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    //正常进行上传
    if (req.body.articleTitle.length > 30) {
        res.send({
            isUp: false
        })
        return
    }
    //解密的token
    let tokenInfors = jwt.verify(tokenGet, 'www.shushuo.space is built by Mr.Ge')
    //文章ID
    let articleIdNum = Date.now() + '-' + tokenInfors.Email
    let html = xss(req.body.content);
    db.article.create({
        name: req.body.articleTitle,
        completeTime: Date.now(),
        articleID: articleIdNum,
        isShow: req.body.isshow,
        content: html,
        writerEmail: tokenInfors.Email,
        isPublic: req.body.ispublic,
        smallmid: req.body.smallMid,
        bigmid: req.body.bigMid,
        writerHeadimg: user.headImg,
        time: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
    })
    res.send({
        isUp: true,
        isLogin: true
    })
});

// 草稿箱上传
router.post('/articleUpDating02', async function (req, res, next) {
    //未解密token
    let tokenGet = req.body.token
    if (tokenGet == undefined) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    //操作者
    let user = await db.user.findOne({
        token: tokenGet,
        isOk: true
    })
    if (user == null) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    let article = await db.article.findOne({
        _id: req.body.articleId
    })
    if (article == null) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    if (article.writerEmail !== user.userEmail) {
        return
    }
    if (req.body.articleTitle.length > 30) {
        res.send({
            isUp: false
        })
        return
    }
    //解密的token
    let tokenInfors = jwt.verify(tokenGet, 'www.shushuo.space is built by Mr.Ge')
    //文章ID
    let articleIdNum = Date.now() + '-' + tokenInfors.Email
    let html = xss(req.body.content);
    db.article.updateOne({
        _id: req.body.articleId
    }, {
        $set: {
            name: req.body.articleTitle,
            completeTime: Date.now(),
            articleID: articleIdNum,
            isShow: req.body.isshow,
            content: html,
            writerEmail: tokenInfors.Email,
            isPublic: true,
            smallmid: req.body.smallMid,
            bigmid: req.body.bigMid,
            writerHeadimg: user.headImg,
            time: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    res.send({
        isUp: true,
        isLogin: true
    })
});

// 已发布文章修改编辑文章
router.post('/articleUpDating03', async function (req, res, next) {
    //未解密token
    let tokenGet = req.body.token
    if (tokenGet == undefined) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    //操作者
    let user = await db.user.findOne({
        token: tokenGet,
        isOk: true
    })
    if (user == null) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    let article = await db.article.findOne({
        _id: req.body.articleId
    })
    if (article == null) {
        //上传异常
        res.send({
            isLogin: false
        })
        return
    }
    if (article.writerEmail !== user.userEmail) {
        return
    }
    let html = xss(req.body.content);
    db.article.updateOne({
        _id: req.body.articleId
    }, {
        $set: {
            completeTime: Date.now(),
            content: html
        }
    }, (err, doc) => {
        if (err) {
            write.logerr(err)
        }
    })
    res.send({
        isUp: true,
        isLogin: true
    })
});

router.post('/getBigModule', async function (req, res, next) {
    //所有的大模块
    let largeModule = await db.largeModule.find({
        isShow: true
    })
    let data = []
    for (let i = 0; i < largeModule.length; i++) {
        //各个小模块
        let smallModule = await db.smallModule.find({
            father: largeModule[i].name,
            isShow: true
        })
        let smallMInfors = []
        for (let j = 0; j < smallModule.length; j++) {
            //各个小模块的某个信息
            smallMInfors.push({
                smallMname: smallModule[j].name,
                smallMid: smallModule[j]._id,
            })
        }
        data.push({
            bigMid: largeModule[i]._id,
            bigMname: largeModule[i].name,
            smallM: smallMInfors
        })
    }
    res.send({
        sendData: data
    })
});

router.post('/personInfors', async function (req, res, next) {
    let tokenGet = req.body.token
    let user = await db.user.findOne({
        token: tokenGet
    })
    res.send({
        writerHeadimg: user.headImg
    })
});

module.exports = router;