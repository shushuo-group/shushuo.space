/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

/**
 * 此文件是为了鉴别访问设备 以达到全端适配的目的
 * 
 * 设计原则：以传统非触屏PC为设计原则 基于此进行其他设备端的适配
 * 设备区分的原则分为硬件以及软件部分
 * 硬件部分包括：设备的交互方式 设备的物理参数
 * 软件部分包括：浏览器内核 浏览器厂商
 */

/**
 * @is_small_client 小屏幕设备
 * @is_touch_client 可触控设备
 */
let is_small_client = false,
    is_touch_client = false

/**
 * 通过设备宽度区分小屏幕设备
 * 
 * @client_screen_data 获取设备信息
 * @is_small_client_tag 区分小屏幕设备的参考值
 */
let client_screen_data = [screen.width, screen.height]
let is_small_client_tag = 400
for (let i = 0; i < client_screen_data.length; i++) {
    if (client_screen_data[i] < is_small_client_tag) {
        is_small_client = true
        break
    }
}

/**
 * 通过浏览器默认方法区分可触控设备
 */
if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    is_touch_client = true
}

/**
 * GIF图片未压缩是因为该类型的图片已由前端进行压缩
 *
 * @zip_dir 压缩图片路径(普通图片 GIF图片)
 * @nozip_dir 未压缩图片路径(普通图片 无GIF图片)
 */
let zip_dir = '/zipped_pic/'
let nozip_dir = '/pic/'

/**
 * @web_url 网站首页url
 * @pic_error 网站图片丢失路径
 */
let web_url = `${window.location.origin}/`
let pic_error = `${web_url}${zip_dir}/pic_error.png`