var md5 = require('md5');

//对密码的加密模块
function md1(data) {
    return (md5(data + 'mimajiamimiyaojiushizhigeya233'))
}
module.exports = {
    md1
}