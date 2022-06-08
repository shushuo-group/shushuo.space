const write = require('./consolelog');
const date = require("silly-datetime");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: 'shushuo9527@qq.com',
        pass: 'ofuvbycznirchgci'
    }
});
module.exports = function sendEmail(receiver, subject, html) {
    transporter.sendMail({
        from: 'shushuo9527@qq.com',
        to: receiver,
        subject: subject,
        html: html
    }, (err, info) => {
        if (err) {
            write.logerr(err)
        }
    });
}

function sendEmail(receiver, subject, html) {
    transporter.sendMail({
        from: 'shushuo9527@qq.com',
        to: receiver,
        subject: subject,
        html: html
    }, (err, info) => {
        if (err) {
            write.logerr(err)
        }
    });
}

//计划创建一个计时任务 每4小时测试一下邮件功能
var array = [0, 4, 8, 12, 16, 20, 24]
var hourNow = date.format(new Date(), 'HH')
var hourNow01 = date.format(new Date(), 'HH:mm:ss')

var newArray = []
for (let i = 0; i < array.length; i++) {
    var absNumber = array[i] - hourNow
    newArray.push(absNumber)
}
var compare = function (x, y) {
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
}
var array01 = newArray.sort(compare)
var array02 = []
for (let i = 0; i < array01.length; i++) {
    if (array01[i] < 0 || array01[i] === 0) {
        continue;
    }
    array02.push(array01[i])
}
var hourNow02 = Number(hourNow) + array02[0]
var time01 = hourNow02 * 60 * 60
var time02 = hourNow01.split(':')
time02 = Number(time02[0]) * 60 * 60 + Number(time02[1]) * 60 + Number(time02[2])
var timeAbs = Math.abs(time01 - time02)
timeAbs = timeAbs * 1000

var timeGap = 1000 * 60 * 60 * 4

sendEmail('1109189702@qq.com', '邮箱功能验证',
    `
    当前邮件发送时间：${date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
    <br>
    邮件验证功能开始执行时间：${timeAbs/1000/60/60}后
    <br>
    邮件发送间隔时间：${timeGap/1000/60/60}时
    `
)

setTimeout(() => {

    setInterval(() => {
        sendEmail('1109189702@qq.com', '邮箱功能验证',
            `
            当前邮件发送时间：${date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}
            <br>
            邮件下次发送时间：${timeGap/1000/60/60}后
            `
        )
    }, timeGap); //计时程序间隔时间(4小时)

}, timeAbs); //计时程序开始执行的等待时间