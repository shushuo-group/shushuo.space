/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')

router.post('/', async function (req, res, next) {
    let token = req.body.token
    if (token == undefined) {
        res.send({
            isLogin: false
        })
    } else {
        let user = await db.user.findOne({
            token: token,
            isOk: true
        })
        if (user !== null) {
            //找到了用户
            res.send({
                isLogin: true,
                userHeadimg: user.headImg,
                userName: user.userName,
                data_id:user._id
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