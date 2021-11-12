const express = require('express');
const router = express.Router();
const db = require('../mongodb/mongodb')
const multer = require('multer')
const fs = require('fs');
const jwt = require("jsonwebtoken");
const random = require('string-random');
const write = require('../middleware/consolelog');

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, '/www/wwwroot/shushuo.space/upload/head/');
    },
    filename: async function (req, file, cb) {
        //文件名携带了token
        let fileName = file.originalname.substr(0, file.originalname.length - 4)
        let user = await db.user.findOne({
            token: fileName
        })
        if (user !== null) {
            //成功实现将用户头像只限定保存在硬盘内一张
            fs.unlink(`./upload/head/${user.headImg}`, function (err, data) {
                if (err) {
                    write.logerr(err)
                }
            });
            let datenow = Date.now()
            //图片名称
            let headimgname = datenow + "-" + random(4) + '.png'
            cb(null, headimgname);
            //更新头像名称
            db.user.updateMany({
                userEmail: user.userEmail,
                isRegister: true
            }, {
                $set: {
                    headImg: headimgname
                }
            }, (err, doc) => {
                if (err) {
                    write.logerr(err)
                }
            })
        }
    }
});

// 创建文件夹
let createFolder = function (folder) {
    try {
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    } catch (e) {
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

let uploadFolder = './upload/';
createFolder(uploadFolder);

// 创建 multer 对象
let upload = multer({
    storage: storage
});

router.post('/sendHeadImg', upload.single('file'), async function (req, res, next) {
    let file = req.file;
    //文件名携带了token
    let fileName = file.originalname.substr(0, file.originalname.length - 4)
    let tokenString = jwt.verify(fileName, 'www.shushuo.space is built by Mr.Ge');
    let user = await db.user.findOne({
        userEmail: tokenString.Email
    })
    // 接收文件成功后返回数据给前端
    if (user == null) {
        res.send({
            isUpload: false
        })
    } else {
        let userHeadimgName = user.headImg
        res.send({
            isUpload: true,
            userHeadName: userHeadimgName
        })
    }
});

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
let picimgname
let storage_article = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/www/wwwroot/shushuo.space/upload/pic');
    },
    filename: function (req, file, cb) {
        let type = file.mimetype.split('/')[1]
        let datenow = Date.now()
        //图片名称
        picimgname = datenow + "-" + random(4) + '.' + type
        cb(null, picimgname);
    }
});
// 创建 multer 对象
let upload_articleimg = multer({
    storage: storage_article
});

router.post('/sendImg', upload_articleimg.single('file'), function (req, res, next) {
    res.send({
        "errno": 0,
        "data": [{
            url: picimgname,
            alt: "图片文字说明",
            href: "跳转链接"
        }]
    })
});

/*router.post('/ImgDelete', async function (req, res, next) {
    let a = JSON.parse(req.body.DATA)
    if (req.body.token == undefined) {
        //未进行任何文章存储的进行删除多余图片的操作代码
        for (let i = 0; i < a.length; i++) {
            fs.unlink(`./upload/pic/${a[i].src.split('/')[4]}`, function (err, data) { //成功实现将用户头像只限定保存在硬盘内一张
                if (err) {
                    write.logerr(err)
                }
                
            });
        }
        res.send('0')
    } else {
        let user = await db.user.findOne({
            token: req.body.token
        })
        if (user !== null) {
            for (let i = 0; i < a.length; i++) {
                fs.unlink(`./upload/pic/${a[i].src.split('/')[4]}`, function (err, data) { //成功实现将用户头像只限定保存在硬盘内一张
                    if (err) {
                        write.logerr(err)
                    }
                });
            }
            res.send('0')
        }
    }
});*/

module.exports = router;