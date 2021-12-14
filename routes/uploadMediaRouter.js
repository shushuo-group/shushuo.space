/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const write = require('../middleware/consolelog');

//此api原先被安排成进行头像上传 先转为头像的数据库写入
router.post('/sendHeadImg', async function (req, res, next) {
    let user = await db.user.findOne({
        token: req.body.token
    })
    // 接收文件成功后返回数据给前端
    if (user == null) {
        res.send({
            isUpload: false
        })
    } else {

        db.user.updateOne({
            token: req.body.token
        }, {
            headImg: req.body.pic_dir
        }, (err, doc) => {
            if (err) {
                write.logerr(err)
            }
        })

        res.send({
            isUpload: true
        })
    }
});

module.exports = router;