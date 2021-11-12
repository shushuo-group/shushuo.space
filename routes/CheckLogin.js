const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')

router.post('/', async function (req, res, next) {
    var token = req.body.token
    if (token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        var user = await db.user.findOne({
            token: token,
            isOk: true
        })
        if (user !== null) {
            //找到了用户
            res.send({
                isLogin: true,
                userHeadimg: user.headImg,
                userName: user.userName,
            })
        } else {
            //没找到用户
            res.send({
                isLogin: false
            })
        }
    }
});
module.exports = router;