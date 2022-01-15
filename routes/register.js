/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const sendEmail = require('../middleware/emailSend')
const random = require('string-random');
const date = require("silly-datetime");
const md5 = require("../middleware/md5");
const jwt = require("jsonwebtoken");
const write = require('../middleware/consolelog');

router.post('/', async (req, res) => {
    if (req.body.email == '') {
        res.send({
            isSend: false
        })
    } else {
        let user = await db.user.findOne({
            userEmail: req.body.email
        })
        if (user == null) {
            // 如果为null则向数据库内写入信息以及验证码
            let number = random(6)
            db.user.create({
                userEmail: req.body.email,
                RegNumber: number,
                emailShow: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            })
            sendEmail(req.body.email, '验证码', number)
            res.send({
                isSendCheckEmail: true
            })
        } else {
            if (user.isRegister == true) {
                // 如果有一组信息对 则判断 isRigster属性 true 则返回客户端该账户以及注册
                res.send({
                    haveReg: true
                })
            } else {
                // false则发送新验证码 并且修改数据库中的验证码
                let number = random(6)
                db.user.updateOne({
                    userEmail: req.body.email
                }, {
                    RegNumber: number
                }, function (err, docs) {
                    if (err) {
                        write.logerr(err)
                    }
                })
                sendEmail(req.body.email, '验证码', number)
            }
        }
    }
})

router.post('/registerCheck', async (req, res) => {
    const user = await db.user.findOne({
        userEmail: req.body.userEmail
    })
    let str1 = user.RegNumber.toUpperCase()
    let str2 = req.body.regYanZhen.toUpperCase()
    if (str1 !== str2) {
        //验证码匹配出错
        res.send({
            isReg: false
        })
    } else {
        //验证码匹配正确 注册成功
        let tokenNum = jwt.sign({
            Email: req.body.userEmail,
            buidTime: Date.now(),
            tokenKey: "i love coding forever"
        }, "www.shushuo.space is built by Mr.Ge")
        db.user.updateMany({
            userEmail: req.body.userEmail
        }, {
            $set: {
                isRegister: true,
                registerDate: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
                //设置过期天数为3天
                tokenTime: Date.now() + 1000 * 60 * 60 * 24 * 3,
                token: tokenNum
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })
        // 注册的位次
        let users = await db.user.find({
            isRegister: true
        })
        let usersNumber = users.length
        let usersAccount = users.length + 10000
        let usersPassword = random(6)
        let username = `${usersAccount}_${random(4)}`
        db.user.updateOne({
            userEmail: req.body.userEmail
        }, {
            $set: {
                userNumber: usersNumber,
                userName: username,
                userAccount: usersAccount,
                userPassword: md5.md1(usersPassword)
            }
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })

        sendEmail(req.body.userEmail, '注册成功', '恭喜您注册成功,您的账号为' + usersAccount + ',初始密码为' + usersPassword + ',为了您的账户安全 请及时修改密码')

        let userInfor = await db.user.findOne({
            userAccount: usersAccount,
            isRegister: true
        })

        let userInfors = {
            FreeCss: '',
            headImg: userInfor.headImg,
            userName: userInfor.userName,
            id: userInfor.userAccount,
            data_id: userInfor._id,
            userFinLog: '--',
            number1: 0,
            number2: 0,
            number3: 0,
            number4: 0
        }

        res.send({
            type: 'register',
            token: tokenNum,
            user: userInfors,
            isReg: true
        })
    }
})

module.exports = router;