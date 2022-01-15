/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const md5 = require('../middleware/md5')
const jwt = require("jsonwebtoken");
const random = require('string-random');
const sendEmail = require('../middleware/emailSend')
const date = require("silly-datetime");
const write = require('../middleware/consolelog');

// 账户密码登录
router.post('/loginAcc', async function (req, res, next) {
    if (req.body.userName == '' || req.body.passWord == '') {
        // 有存在未输入账户或者密码的情况
        res.send({
            isLogin: false
        })
    } else {
        //开始进行提取密码验证
        let user = await db.user.findOne({
            userAccount: req.body.userName,
            isRegister: true
        })
        //不存在该账户 提示检查密码或账号
        if (user == null) {
            res.send({
                isLogin: false
            })
        } else {
            //存在该账户 进行密码验证
            if (user.userPassword == md5.md1(req.body.passWord)) {
                //密码匹配成功
                //更新tokentime时间
                let tokenNum = jwt.sign({
                    Email: user.userEmail,
                    buidTime: Date.now(),
                    tokenKey: "i love coding forever"
                }, "www.shushuo.space is built by Mr.Ge")

                //获取个人信息返回客户端
                let userInfor = user
                let myArticles = await db.article.find({
                    writerEmail: user.userEmail,
                    isPublic: true,
                    isOk: true
                })
                let likeArticles = []
                for (let i = 0; i < userInfor.likeArticles.length; i++) {
                    likeArticles.push({
                        articleId: userInfor.likeArticles[i].articleId
                    })
                }
                let unlikeArticles = []
                for (let i = 0; i < userInfor.unlikeArticles.length; i++) {
                    unlikeArticles.push({
                        articleId: userInfor.unlikeArticles[i].articleId
                    })
                }
                let collectArticles = []
                for (let i = 0; i < userInfor.collectArticles.length; i++) {
                    collectArticles.push({
                        articleId: userInfor.collectArticles[i].articleId
                    })
                }
                let number3 = 0
                for (let i = 0; i < userInfor.commentArticles.length; i++) {
                    if (userInfor.commentArticles[i].isOK == true) {
                        number3 += 1
                    }
                }
                let userS_H = []
                for (let i = 0; i < userInfor.search_history.length; i++) {
                    if (userInfor.search_history[i].isOk == true) {
                        userS_H.push({
                            'name': userInfor.search_history[i].name
                        })
                    }
                }
                if (userInfor.FreeCss == undefined) {
                    userInfor.FreeCss = ''
                }
                let userInfors = {
                    FreeCss: userInfor.FreeCss,
                    headImg: userInfor.headImg,
                    userName: userInfor.userName,
                    id: userInfor.userAccount,
                    data_id: userInfor._id,
                    userFinLog: userInfor.finLogTime,
                    userS_H: userS_H,
                    number1: userInfor.likeArticles.length,
                    number2: userInfor.collectArticles.length,
                    number3: number3,
                    number4: myArticles.length
                }

                res.send({
                    type: 'log_password',
                    token: tokenNum,
                    user: userInfors,
                    isLogin: true
                })

                db.user.updateMany({
                    userAccount: req.body.userName,
                    isRegister: true
                }, {
                    $set: {
                        tokenTime: Date.now() + 1000 * 60 * 60 * 24 * 3,
                        token: tokenNum,
                        finLogTime: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                    }
                }, (err, doc) => {
                    if (err) {
                        write.logerr(err)
                    }
                })
            } else {
                res.send({
                    isLogin: false
                })
            }
        }
    }
});

// 邮箱登录_发送验证码
router.post('/loginEmail', async function (req, res, next) {
    let user = await db.user.findOne({
        userEmail: req.body.userEmail,
        isRegister: true
    })
    if (user == null) {
        //找不到该用户
        res.send({
            isLogin: false
        })
    } else {
        //进行邮箱验证
        if (user.userEmail == req.body.userEmail) {
            //邮箱确认成功 开始发送登录验证码
            let RegNumber = random(6)
            sendEmail(req.body.userEmail, '登录验证码', RegNumber)
            db.user.updateOne({
                userEmail: user.userEmail,
                isRegister: true
            }, {
                loginNumber: RegNumber
            }, function (err, docs) {
                if (err) {
                    write.logerr(err)
                }
            })

            res.send({
                isSend: true
            })
        } else {
            //邮箱确认失败 提示前端检查邮箱
            res.send({
                isSend: false
            })
        }
    }
})

// 邮箱登录_确认登陆
router.post('/loginEmailCheck', async function (req, res, next) {
    let user = await db.user.findOne({
        userEmail: req.body.userEmail,
        isRegister: true
    })
    if (user == null) {
        //找不到该用户
        res.send({
            isLogin: false
        })
    } else {
        let str1 = user.loginNumber.toUpperCase()
        let str2 = req.body.logEmailNum.toUpperCase()
        if (str1 == str2) {
            //验证成功 登录成功 双端生成token 数据库存储token过期时间
            let tokenNum = jwt.sign({
                Email: req.body.userEmail,
                buidTime: Date.now(),
                tokenKey: "i love coding forever"
            }, "www.shushuo.space is built by Mr.Ge")

            //获取个人信息返回客户端
            let userInfor = user
            let myArticles = await db.article.find({
                writerEmail: user.userEmail,
                isPublic: true,
                isOk: true
            })
            let likeArticles = []
            for (let i = 0; i < userInfor.likeArticles.length; i++) {
                likeArticles.push({
                    articleId: userInfor.likeArticles[i].articleId
                })
            }
            let unlikeArticles = []
            for (let i = 0; i < userInfor.unlikeArticles.length; i++) {
                unlikeArticles.push({
                    articleId: userInfor.unlikeArticles[i].articleId
                })
            }
            let collectArticles = []
            for (let i = 0; i < userInfor.collectArticles.length; i++) {
                collectArticles.push({
                    articleId: userInfor.collectArticles[i].articleId
                })
            }
            let number3 = 0
            for (let i = 0; i < userInfor.commentArticles.length; i++) {
                if (userInfor.commentArticles[i].isOK == true) {
                    number3 += 1
                }
            }
            let userS_H = []
            for (let i = 0; i < userInfor.search_history.length; i++) {
                if (userInfor.search_history[i].isOk == true) {
                    userS_H.push({
                        'name': userInfor.search_history[i].name
                    })
                }
            }
            if (userInfor.FreeCss == undefined) {
                userInfor.FreeCss = ''
            }
            let userInfors = {
                FreeCss: userInfor.FreeCss,
                headImg: userInfor.headImg,
                userName: userInfor.userName,
                id: userInfor.userAccount,
                data_id: userInfor._id,
                userFinLog: userInfor.finLogTime,
                userS_H: userS_H,
                number1: userInfor.likeArticles.length,
                number2: userInfor.collectArticles.length,
                number3: number3,
                number4: myArticles.length
            }

            res.send({
                type: 'log_email',
                token: tokenNum,
                user: userInfors,
                isLogin: true
            })

            db.user.updateMany({
                userEmail: req.body.userEmail
            }, {
                $set: {
                    //设置过期天数为3天
                    tokenTime: Date.now() + 1000 * 60 * 60 * 24 * 3,
                    token: tokenNum,
                    finLogTime: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })

        } else {
            res.send({
                isLogin: false
            })
        }
    }
})

module.exports = router;