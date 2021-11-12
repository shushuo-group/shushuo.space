const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const sendEmail = require('../middleware/emailSend')
const random = require('string-random');
const md5 = require("../middleware/md5");
const jwt = require("jsonwebtoken");
const write = require('../middleware/consolelog');

router.get('/', function (req, res, next) {
    res.render('findPassword.html');
});

router.post('/getCheckNum', async function (req, res, next) {
    const Emailget = req.body.Email
    const user = await db.user.findOne({
        userEmail: Emailget
    })
    if (user == null) {
        res.send({
            isRegister: false
        })
    } else {
        const CheckNum = random(6)
        db.user.updateOne({
            userEmail: Emailget
        }, {
            RegNumber: CheckNum
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        sendEmail(Emailget, '修改密码验证码', CheckNum)
        res.send({
            isSend: true
        })
    }
});

router.post('/Check', async function (req, res, next) {
    const Emailget = req.body.Email
    const password = req.body.password
    const user = await db.user.findOne({
        userEmail: Emailget
    })
    if (user == null) {
        res.send({
            isCheck: false
        })
    } else {
        if (req.body.Email == user.userEmail && req.body.CheckNum == user.RegNumber) {
            let tokenNum = jwt.sign({
                Email: Emailget,
                buidTime: Date.now(),
                tokenKey: "i love cxy forever"
            }, "www.shushuo.space is built by Mr.Ge")
            db.user.updateMany({
                userEmail: Emailget
            }, {
                $set: {
                    //设置过期天数为3天
                    tokenTime: Date.now() + 1000 * 60 * 60 * 24 * 3,
                    token: tokenNum,
                    userPassword: md5.md1(password)
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
            res.send({
                isCheck: true,
                token: tokenNum
            })
        } else {
            res.send({
                isCheck: false
            })
        }
    }
});

module.exports = router;