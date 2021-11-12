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
                    tokenKey: "i love cxy forever"
                }, "www.shushuo.space is built by Mr.Ge")
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
                res.send({
                    token: tokenNum,
                    userHeadimg: user.headImg,
                    userName: user.userName,
                    isLogin: true
                })
            } else {
                res.send({
                    isLogin: false
                })
            }
        }
    }
});

// 邮箱登录
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
                tokenKey: "i love cxy forever"
            }, "www.shushuo.space is built by Mr.Ge")
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
            res.send({
                token: tokenNum,
                userHeadimg: user.headImg,
                userName: user.userName,
                isLogin: true
            })
        } else {
            res.send({
                isLogin: false
            })
        }
    }
})

module.exports = router;