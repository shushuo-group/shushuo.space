/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const db = require('../mongodb/mongodb');
const router = express.Router();
const jwt = require("jsonwebtoken");
const date = require("silly-datetime");
const write = require('../middleware/consolelog');

// 定向到 index.html页面
router.get('/', function (req, res, next) {
    res.render('index');
});

// 接收前端请求获取与个人用户无关的资源
router.post('/webIndexStatic', async function (req, res, next) {
    let data1 = await db.hotList.find({}).sort({
        'order': '-1'
    }).limit(30);
    let bigMs = await db.largeModule.find({
        isShow: true
    });
    let data2 = [];
    for (let i = 0; i < bigMs.length; i++) {
        let smllM = await db.smallModule.find({
            isShow: true,
            father: bigMs[i].name
        });
        data2.push({
            bigMname: bigMs[i].name,
            bigMid: bigMs[i]._id,
            smallM: []
        });
        for (let j = 0; j < smllM.length; j++) {
            data2[i].smallM.push({
                smallMname: smllM[j].name,
                smallMid: smllM[j]._id
            });
        }
    }
    let userNumber = await db.user.find({
        isRegister: true
    })
    let articleNumber = await db.article.find({
        isPublic: true,
        isOk: true
    })
    let data = {
        hotList: data1,
        largeModule: data2,
        usernumber: userNumber.length,
        articlenumber: articleNumber.length,
    };
    res.send(data);
});

//进行小模块的搜索
router.post('/smallModulesGet', async function (req, res, next) {
    let temp = await db.smallModule.find({
        'father': `${req.body.name}`,
        'isShow': true
    })
    let data = []
    for (let i = 0; i < temp.length; i++) {
        data.push({
            name: temp[i].name,
            id: temp[i]._id
        })
    }
    res.send(data);
});

// 使用token实现登录
router.post('/isLogin', async function (req, res, next) {
    if (req.body.token == undefined) {
        // 不存在token则一定没有登录
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: req.body.token,
            isRegister: true,
            isOk: true
        })
        if (user == null) {
            //无法根据本地token查找到此人
            res.send({
                isLogin: false
            })
            return
        }
        if (Date.now() > user.tokenTime) {
            //过期
            res.send({
                isLogin: false
            })
        } else {
            //进行token验证
            if (req.body.token == user.token) {
                //验证成功 成功登录 双端同时更新token
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
                    //token登录成功
                    token: tokenNum,
                    isLogin: true,
                    user: userInfors
                })

                //更新数据库新token
                db.user.updateMany({
                    userEmail: user.userEmail,
                    isRegister: true
                }, {
                    $set: {
                        //延长token过期时间 -->3天
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
                //使用token登录失败
                res.send({
                    isLogin: false
                })
            }
        }
    }
});

module.exports = router;