/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

$(document).ready(async function () {
    //代码块复制及编辑以及增加了左侧序号
    function codeRepeat() {

        //增加蒙版的限制 需要在每篇文章内的图片均加载完成才进行增加蒙版的判断
        var imgs = $('.innerContent').find('img')

        let links = $('.innerContent').find('a')
        if (links.length !== 0) {
            for (let i = 0; i < links.length; i++) {
                $(links[i]).attr('target', '_blank');
                $(links[i]).css('color', '#002bff');
                if (links[i].href.substr(0, web_url.length) !== web_url) {
                    $(links[i]).attr('data', links[i].href);
                    $(links[i]).attr('onclick', 'jumpWeb(this)');
                    $(links[i]).removeAttr('target');
                    links[i].href = "javascript:void(0);"
                }
            }
        }

        for (let i = 0; i < imgs.length; i++) {

            $(imgs[i]).after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>`);
            $(imgs[i]).hide();

            $(imgs[i]).attr('onerror', 'picError(this)');

            let temp_pic_css = {
                'user-select': 'none',
                'cursor': 'zoom-in',
                'margin': 'auto',
                'display': 'block',
                'width': '50%'
            }

            if (is_small_client) {
                temp_pic_css = {
                    'user-select': 'none',
                    'cursor': 'zoom-in',
                    'margin': 'auto',
                    'display': 'block',
                    'width': '100%'
                }
            }

            $(imgs[i]).css(temp_pic_css);

            imgs[i].onload = function () {

                $(imgs[i]).siblings('.commentSection_wait').remove();
                $(imgs[i]).show();

                // 此处仅用于过滤非法第三方图片
                if (is_third_pic(this)) {
                    $(this).attr('src', pic_error);
                    $(this).css({
                        'max-width': '100px',
                        'cursor': 'not-allowed'
                    });
                    $(imgs[i]).siblings('.commentSection_wait').remove();
                    $(imgs[i]).show();
                    $(this).unbind();
                }

                $(this).removeAttr('onerror');
                $(this).removeAttr('onload');

            }

            $(imgs[i]).click(function (e) {

                e.stopPropagation()

                $(this).css('visibility', 'hidden');

                $('html').css({
                    'overflow': 'hidden',
                    'margin-right': window.innerWidth - $('body')[0].offsetWidth + 'px'
                });

                let temp_html = `
                    <div class="img_bigshow_part">
                        <div class="img_bigshow_part_part">
                            <div class="img_bigshow_part_top">
                                ${$(imgs[i])[0].outerHTML}
                            </div>
                            <div class="img_bigshow_part_bottom">
                                <div class="img_bigshow_part_bottom_center">
                                    <a class="img_bigshow_part_down" href="${$(imgs[i]).attr('src')}" download>
                                        <svg t="1621226978872" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="200" height="200"><path d="M1024 645.248v330.752a48 48 0 0 1-48 48H48a48 48 0 0 1-48-48v-330.752a48 48 0 0 1 96 0V928h832v-282.752a48 48 0 0 1 96 0z m-545.152 145.984a47.936 47.936 0 0 0 67.904 0l299.904-299.84a48 48 0 1 0-67.968-67.904l-217.792 217.856V48a48.064 48.064 0 0 0-96.064 0v593.472L246.912 423.552a48 48 0 1 0-67.904 67.904l299.84 299.776z" p-id="1903" fill="#f1f3f4"></path></svg>
                                    </a>
                                    <a class="img_bigshow_part_round">
                                        <svg t="1638070345436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2306" width="200" height="200"><path d="M482.773333 66.517333l148.181334 151.168a21.333333 21.333333 0 0 1 0 29.866667l-147.84 150.826667a21.333333 21.333333 0 0 1-28.16 2.090666l-2.346667-2.090666-27.050667-27.605334a21.333333 21.333333 0 0 1 0-29.866666l69.888-71.338667a304.64 304.64 0 1 0 318.421334 352.682667l1.024-6.826667c0.170667-1.408 0.426667-3.285333 0.64-5.632a21.333333 21.333333 0 0 1 22.314666-19.114667l42.666667 2.261334a21.333333 21.333333 0 0 1 20.224 22.4l-0.085333 1.024-1.194667 10.496A389.973333 389.973333 0 1 1 484.821333 184.746667l-59.306666-60.458667a21.333333 21.333333 0 0 1 0-29.866667l27.093333-27.605333a21.333333 21.333333 0 0 1 30.165333-0.298667z" p-id="2307" fill="#f1f3f4"></path></svg>
                                    </a>
                                    <a class="img_bigshow_part_hight">
                                        查看原图
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `

                jump_window({}, temp_html)

                $('.img_bigshow_part_round>svg').css('height', `${$('.img_bigshow_part_round').height()}px`);
                $('.img_bigshow_part_down>svg').css('height', `${$('.img_bigshow_part_down').height()}px`);

                let pic_zip_src = $('.img_bigshow_part_top>img').attr('src')
                let fin_3_word = pic_zip_src.substr(pic_zip_src.length - 3, pic_zip_src.length)
                if (fin_3_word === 'gif') {
                    $('.img_bigshow_part_hight').css('cursor', 'not-allowed');
                } else {
                    $('.img_bigshow_part_hight').click(function () {
                        let temp_src = pic_zip_src.replace(zip_dir, nozip_dir)
                        $('.img_bigshow_part_top>img').attr('src', temp_src);
                    });
                }


                $('.img_bigshow_part_top>img').attr('style', '');

                //防止点击按钮造成页面弹出
                $('.img_bigshow_part_part').click(function () {
                    window.event.stopPropagation()
                });

                //图片旋转函数
                let temp_degree = 0
                $('.img_bigshow_part_round').click(function () {
                    temp_degree += 90
                    $(this).parents('.img_bigshow_part_part').find('img').css('transform',
                        `rotate(${temp_degree}deg)`);
                });

                $('.img_bigshow_part_down').hover(function () {
                    // over
                    $('.img_bigshow_part_down').find('path').attr('fill', '#03a9f4');
                }, function () {
                    // out
                    $('.img_bigshow_part_down').find('path').attr('fill', '#f1f3f4');
                });

                $('.img_bigshow_part_round').hover(function () {
                    // over
                    $('.img_bigshow_part_round').find('path').attr('fill', '#03a9f4');
                }, function () {
                    // out
                    $('.img_bigshow_part_round').find('path').attr('fill', '#f1f3f4');
                });

                // 点击进行大张图片浏览
                $('.img_bigshow_part').click(function () {
                    $(imgs[i]).css('visibility', 'visible');
                    $(this).remove();
                    $('html').css({
                        'overflow': '',
                        'margin-right': ''
                    });
                });

                let temp_pic_big_css = {}

                if (is_small_client) {
                    $('.img_bigshow_part_part').css('width', '95%');
                    $('.img_bigshow_part_top>img').css({
                        'height': 'unset',
                        'width': '100%'
                    });
                }

                // 竖直图片的一些样式适配
                if ($(this).height() > $(this).width()) {

                    $('.img_bigshow_part').addClass('img_bigshow_part_long');

                    let temp_css = {
                        'width': '50%',
                        'height': 'max-content'
                    }
                    if (is_small_client) {
                        temp_css = {
                            'width': '80%'
                        }
                    }
                    $('.img_bigshow_part_top>img').css(temp_css);

                    $('.img_bigshow_part_top').css('overflow-y', 'auto');
                } else {
                    $('.img_bigshow_part_top').css('overflow-x', 'auto');
                }

            });

        }

        for (let i = 0; i < $('.innerContent').find('code').length; i++) {

            $('.innerContent').find('code:nth(' + i + ')').css({
                'font-size': '15px',
                'line-height': '2'
            });
            let tmpStyle = $('.innerContent').find('code:nth(' + i + ')').attr('style')
            tmpStyle = tmpStyle.replace(/font-size:/gi, '')
            tmpStyle = tmpStyle.replace(/line-height:/gi, '')
            tmpStyle = tmpStyle.replace(/px/gi, '')
            tmpStyle = tmpStyle.split(';')
            let num = tmpStyle[0] * tmpStyle[1]
            let lineNum = $('.innerContent').find('code:nth(' + i + ')')[0].clientHeight / num

            // 左侧序号
            $('.innerContent').find('code:nth(' + i + ')').parent().prepend(`<ul class="code_number"></ul>`);
            for (let j = 0; j < lineNum; j++) {
                $('.innerContent').find('code:nth(' + i + ')').siblings('.code_number').append(`<li style="line-height:${num}px;font-size:${tmpStyle[0]}px;">${j+1}</li>`);
            }

            $('.innerContent').find('code:nth(' + i + ')').parent().hover(function () {
                // over
                $(this).css('position', 'relative');
                $(this).prepend(`<span class="code_repeat" onclick="codeCopy(this)">复制</span>`);
            }, function () {
                // out
                $(this).css('position', '');
                $('.code_repeat').remove();
            });
        }
    }

    await $.ajax({
        type: "post",
        url: "/CheckLogin",
        data: {
            token: window.localStorage.token
        },
        success: function (response) {
            if (response.isLogin == true) {
                //登录成功
                $('#loginButton').remove();
                $('#userHead').append(`
                <img onerror=\'picError(this)\'  onload=\'pic_load(this)\' onclick="window.open('/person?userId=${response.data_id}')" username="${response.userName}" src="${zip_dir}${response.userHeadimg}">
                `);
            } else {
                localStorage.clear();
                $('#loginButton').click(function () {

                    noLogin()

                    //登录 注册功能切换模块
                    $('.ChangeButton>div>span:nth-child(1),.ChangeButton>div>span:nth-child(3)').click(function (e) {
                        switch (this.innerText) {
                            case '邮箱登录？':
                                this.innerText = $('.waitChange>div').attr('name')
                                $('.waitChange>div').remove();
                                $('.waitChange').prepend('<div class="logByEmail" name="邮箱登录？"><div><div><div class="emailNum"><div>邮&nbsp&nbsp&nbsp箱：</div><div><div><input type="text" id="logEmail"></div></div></div></div><div><div><button id="yanzheng">获取验证码</button></div></div><div><div class="yanzheni"><div>验证码：</div><div><div><input type="text" id="logEmailNum"></div></div></div></div></div></div>');
                                $('#yanzheng').click(function (e) {
                                    $.ajax({
                                        type: "post",
                                        url: "login/loginEmail",
                                        data: {
                                            userEmail: $('#logEmail')[0].value
                                        },
                                        success: function (response) {}
                                    });
                                });
                                break;
                            case '注册？':
                                this.innerText = $('.waitChange>div').attr('name')
                                $('.waitChange>div').remove();
                                $('.waitChange').prepend('<div class="register" name="注册？"><div><div><div class="regemailNum"><div>邮&nbsp&nbsp&nbsp箱：</div><div><div><input type="text" id="email"></div></div></div></div><div><div><button id="regyanzheng">获取验证码</button></div></div><div><div class="regyanzheni"><div>验证码：</div><div><div><input type="text" id="regYanZhen"></div></div></div></div></div></div>');
                                $('#regyanzheng').click(function (e) {
                                    $.ajax({
                                        type: "post",
                                        url: "register",
                                        data: {
                                            email: $('#email')[0].value
                                        },
                                        success: function (response) {}
                                    });
                                });
                                break;
                            case '账号登录？':
                                this.innerText = $('.waitChange>div').attr('name')
                                $('.waitChange>div').remove();
                                $('.waitChange').prepend(`<div class="logByAcc" name="账号登录？"><div><div><div><span>账号：</span><span><div><input type="text" id="userName"></div></span></div></div></div><div><div><div><span>密码：</span><span><div><input type="password" id="passWord"></div></span><a href="/findPassword">忘记密码？</a></div></div></div></div>`);
                                break;
                            default:
                                break;
                        }
                    });
                    $('#logRegButton').click(function (e) {
                        switch ($('.waitChange>div').attr('name')) {
                            case "账号登录？":
                                $.ajax({
                                    type: "post",
                                    url: "login/loginAcc",
                                    data: {
                                        userName: $('#userName')[0].value,
                                        passWord: $('#passWord')[0].value
                                    },
                                    success: function (response) {
                                        tokenWork_article(response)
                                        if (response.isLogin == true) {
                                            window.location.href = window.location.href
                                        } else {
                                            localStorage.clear();
                                            alert('请仔细验证登录信息')
                                        }
                                    }
                                });
                                break;
                            case "注册？":
                                $.ajax({
                                    type: "post",
                                    url: "register/registerCheck",
                                    data: {
                                        regYanZhen: $('#regYanZhen')[0].value,
                                        userEmail: $('#email')[0].value
                                    },
                                    success: function (response) {
                                        tokenWork_article(response)
                                        if (response.isLogin == true) {
                                            window.location.href = window.location.href
                                        } else {
                                            localStorage.clear();
                                            alert('请仔细验证登录信息')
                                        }
                                    }
                                });
                                break;
                            case "邮箱登录？":
                                $.ajax({
                                    type: "post",
                                    url: "login/loginEmailCheck",
                                    data: {
                                        userEmail: $('#logEmail')[0].value,
                                        logEmailNum: $('#logEmailNum')[0].value
                                    },
                                    success: function (response) {
                                        tokenWork_article(response)
                                        if (response.isLogin == true) {
                                            window.location.href = window.location.href
                                        } else {
                                            localStorage.clear();
                                            alert('请仔细验证登录信息')
                                        }
                                    }
                                });
                                break;
                            default:
                                break;
                        }
                    });
                    window.event.stopPropagation()
                });
            }
        }
    });

    function timeSolve(data) {
        return data.split(' ')[0] + '%20' + data.split(' ')[1]
    }

    $.ajax({
        type: "post",
        url: "/article/articleDetail",
        data: {
            token: window.localStorage.token,
            articleId: window.location.search.split('=')[1]
        },
        success: function (response) {

            if (response.isShuDong == true) {
                //为树洞
                $('body').append(`
                <div class="contentSmallPart waitAfter">
                        <div class="contentSmallPartTop" articleid="${window.location.search.split('=')[1]}">
                            <div>
                                <span class="contentSmallPartTopSmall contentSmallPartHead">
                                <svg class="anonymity" viewBox="0 0 1024 1024">
                                    <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path>
                                </svg>
                                </span>
                                <span class="contentSmallPartTopSmall contentSmallPartID">匿名</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDsign"></span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDtime">${timeSet(response.sendData.time)}</span>
                            </div>
                            <div class="contentSmallPartTitle">
                            ${xssFilter(response.sendData.title)}
                            </div>
                        </div>
                        <div class="content">
                            <div class="innerContent">
                            ${response.sendData.content}
                            </div>
                        </div>
                        <div class="contentMoveArea">
                            <div id="like" title="赞一下" onclick="like_person(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M222.5 438h-74.1c-46.4 0-84 37.6-84 84v286.3c0 46.4 37.6 84 84 84h74.1V438zM896.6 438H691c-23.7 0-38.1-26.3-25.1-46.1 34.7-52.9 65.4-113.9 71.7-181.1 10.2-109.4-136.2-148.2-190.3-33.2-9.9 21.1-23.4 57.9-37 97.4-32 93.2-117.3 156.9-214.8 162.5v455H736c55.7 0 105.2-35.4 123.1-88.1L955.9 521c13.9-40.7-16.3-83-59.3-83z" fill="#bfbfbf"></path></svg>
                                <p>${response.sendData.likersNumber}</p>
                            </div>
                            <div id="unlike" title="踩一踩" onclick="unlike_person(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M633.038704 108.536972 269.922592 108.536972c-33.487695 0-62.133106 20.37505-74.236771 49.222051L74.04132 442.201308c-3.63069 9.279341-5.850242 19.164478-5.850242 29.452799l0 77.262688 0.403183 0.403183-0.403183 3.025916c0 44.582381 36.109406 80.69281 80.69281 80.69281l254.786871 0-38.530548 184.382381c-0.807389 4.034896-1.412163 8.271384-1.412163 12.709463 0 16.743336 6.859221 31.873941 17.752316 42.767036l42.968627 42.565445L690.128957 649.78204c14.524808-14.7264 23.602557-34.899858 23.602557-57.090253L713.731514 189.229782C713.731514 144.647401 677.621085 108.536972 633.038704 108.536972zM794.423301 108.536972l0 484.154815 161.384597 0L955.807898 108.536972 794.423301 108.536972z" fill="#bfbfbf"></path></svg>
                                <p>${response.sendData.unlikersNumber}</p>
                            </div>
                            <div id="collect" title="收藏" onclick="collect_person(this)">
                                <svg viewBox="0 0 1126 1024"><path d="M742.4 0h-358.4C199.68 0 51.2 148.48 51.2 332.8v358.4C51.2 875.52 199.68 1024 384 1024h358.4C926.72 1024 1075.2 875.52 1075.2 691.2v-358.4C1075.2 148.48 926.72 0 742.4 0zM904.533333 471.04c-3.413333 22.186667-13.653333 42.666667-29.013333 59.733333l-81.92 81.92 18.773333 114.346667c10.24 56.32-27.306667 109.226667-83.626666 119.466667-22.186667 3.413333-44.373333 0-64.853334-10.24l-102.4-54.613334L460.8 836.266667c-49.493333 27.306667-110.933333 6.826667-136.533333-42.666667-10.24-20.48-13.653333-42.666667-10.24-64.853333l18.773333-114.346667-81.92-81.92c-40.96-39.253333-40.96-105.813333-1.706667-146.773333 15.36-15.36 35.84-27.306667 58.026667-30.72l114.346667-17.066667 51.2-104.106667c25.6-51.2 85.333333-71.68 136.533333-46.08 20.48 10.24 35.84 27.306667 46.08 46.08l51.2 104.106667 114.346667 17.066667c52.906667 8.533333 92.16 59.733333 83.626666 116.053333z" fill="#bfbfbf"></path><path d="M810.666667 406.186667l-119.466667-17.066667c-13.653333-1.706667-25.6-10.24-30.72-22.186667L607.573333 256c-5.12-10.24-13.653333-18.773333-22.186666-23.893333-23.893333-11.946667-54.613333-1.706667-66.56 23.893333l-52.906667 109.226667c-5.12 11.946667-17.066667 20.48-30.72 22.186666l-119.466667 17.066667c-10.24 1.706667-20.48 6.826667-29.013333 15.36-20.48 20.48-18.773333 52.906667 1.706667 73.386667l85.333333 85.333333c10.24 10.24 13.653333 22.186667 11.946667 35.84l-20.48 119.466667c-1.706667 11.946667 0 22.186667 5.12 32.426666 13.653333 25.6 42.666667 34.133333 68.266666 22.186667l105.813334-56.32c11.946667-6.826667 27.306667-6.826667 39.253333 0l105.813333 56.32c10.24 5.12 20.48 6.826667 30.72 5.12 27.306667-5.12 46.08-30.72 40.96-59.733333l-20.48-119.466667c-1.706667-13.653333 1.706667-27.306667 11.946667-35.84l85.333333-85.333333c8.533333-8.533333 13.653333-18.773333 15.36-29.013334 5.12-27.306667-13.653333-54.613333-42.666666-58.026666z" fill="#bfbfbf"></path></svg>
                            </div>
                            <div id="share" title="分享" onclick="share(this)" value="">
                                <svg viewBox="0 0 1024 1024"><path d="M892.7 896.1H131.3c-18.4 0-33.3-14.9-33.3-33.3V696.4c0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3 0 4.5-0.9 8.9-2.6 12.8l-13 64.9c0 18.4 14.9 33.3 33.3 33.3h599.3c18.4 0 33.3-14.9 33.3-33.3l-13-64.9c-1.7-4-2.6-8.3-2.6-12.8 0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3v166.5c0.1 18.3-14.8 33.2-33.2 33.2zM580 582h1l-1 0.9v-0.9z m247.2-228.6l1.6 0.1-234.7 216.4v-2.3h-0.1c-0.3 3.7-3.4 6.7-7.2 6.7-4 0-7.2-3.2-7.2-7.2 0-0.7 0.1-1.3 0.3-1.9V433.3c-11.4-0.7-23-1.1-34.7-1.1-134.7 0-247.2 95.2-273.7 222.1-12.1-18.3-17.1-49.1-17.1-100 0-154.5 125.2-294.1 279.7-294.1 15.8 0 31.1 0.1 45.8 0.4V136.1c-0.2-0.6-0.3-1.2-0.3-1.9 0-4 3.2-7.2 7.2-7.2 3.8 0 6.9 2.9 7.2 6.7h0.1v-1.8L829.6 339h-2.4v0.1c3.7 0.3 6.7 3.4 6.7 7.2 0 3.7-3 6.8-6.7 7.1z" fill="#bfbfbf"></path></svg>
                            </div>
                            <div id="report" title="举报" onclick="report_person(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M960.288 787.488c-98.88-154.08-287.36-469.568-385.76-622.912-21.44-27.968-71.872-44-102.88 0L61.504 803.872c-23.36 33.888-23.008 79.872 49.376 82.432h824.64c48.416-2.784 48.416-62.496 24.768-98.816z m-437.44-27.776a47.296 47.296 0 1 1 0-94.592 47.296 47.296 0 0 1 0 94.592z m35.456-165.536c0.448 11.52-10.944 23.68-23.648 23.68h-23.648c-12.672 0-23.2-12.16-23.616-23.68l-23.68-224.64c0-19.552 15.904-35.456 35.488-35.456h47.296c19.584 0 35.456 15.904 35.456 35.488l-23.648 224.64z" fill="#bfbfbf"></path></svg>
                            </div>
                        </div>
                        <div class="commentSection"><div class="commentSectionArea"><div class="othersComment"><div><span class="othersComment_number">${response.sendData.commentsNumber}</span> 条评论</div><div class="Comments"><div class="commentWhite">空空如也，快来评论吧！</div></div></div><div class="CommentInputArea"><div><span><span onpaste="pasteRemoveCss(this)" contenteditable="true"  id="commentContent"></span></span></div><div><div><span class="commentSubmit" onclick="commmentSubmit_article(this)">发&nbsp;布</span></div></div></div></div></div>

                    </div>
                `);

                codeRepeat()


                if (response.sendData.comments.length !== 0) {
                    $('.commentWhite').html('');
                }
                for (let i = 0; i < response.sendData.comments.length; i++) {
                    $('.Comments').append(`
                    <div class="Comments_small">
                    <img onerror=\'picError(this)\'  onload=\'pic_load(this)\' onclick="head_to_detail(this)" src="${zip_dir}${response.sendData.headImgs[i].headImg}" id="${response.sendData.comments[i].user_id}" class="Comments_small_head">
                    <span accountId="${response.sendData.comments[i].accountId}" idname="${response.sendData.comments[i].comUser}" class="Comments_small_name">${xssFilter(response.sendData.comments[i].comUser)}：</span>
                    <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(response.sendData.comments[i].content)}</div>
                    <div commentId="${response.sendData.comments[i].id}" class="firstComment">
                        <span class="Comments_small_comment" onclick="secondComment(this)" style="cursor:pointer;">回复${response.sendData.comments[i].secComments_number == undefined ? '' : '('+response.sendData.comments[i].secComments_number+')'}</span>
                        <span time=${timeSolve(response.sendData.comments[i].time)} class="Comments_small_time">${timeSet(response.sendData.comments[i].time)}</span>
                    </div>
                </div>
                    `);

                    if (response.sendData.comments[i].secComments) {
                        for (let j = 0; j < response.sendData.comments[i].secComments.length; j++) {
                            $('.Comments_small:nth(' + i + ')').append(`
                            <div class="Comments_small_second">
                            <img onerror=\'picError(this)\'  onload=\'pic_load(this)\' onclick="head_to_detail(this)" src="${zip_dir}${response.sendData.comments[i].secComments[j].comUserHead}" id="${response.sendData.comments[i].secComments[j].user_id}" class="Comments_small_head">
                            <span accountId="${response.sendData.comments[i].secComments[j].accountId}" idname="${response.sendData.comments[i].secComments[j].comUserName}" class="Comments_small_name">${xssFilter(response.sendData.comments[i].secComments[j].comUserName)}：</span>
                            <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(response.sendData.comments[i].secComments[j].content)}</div>
                            <div commentid="${response.sendData.comments[i].secComments[j].id}" class="firstComment">
                            <span time=${timeSolve(response.sendData.comments[i].secComments[j].time)} class="Comments_small_time">${timeSet(response.sendData.comments[i].secComments[j].time)}</span>
                            </div>
                            </div>
                            `)
                        }
                    }
                }
                if (response.isLike == true) {
                    $('#like').find('path').attr('fill', '#138bfb');
                }
                if (response.isUnlike == true) {
                    $('#unlike').find('path').attr('fill', '#707070');
                }
                if (response.isCollect == true) {
                    $('#collect').find('path').attr('fill', '#138bfb');
                }
            } else {
                //非树洞
                $('body').append(`
                <div class="contentSmallPart waitAfter">
                        <div class="contentSmallPartTop" articleid="${window.location.search.split('=')[1]}">
                            <div>
                                <span class="contentSmallPartTopSmall contentSmallPartHead"><a onclick="head_to_detail(this)" id="${response.sendData.writerId}"><img onerror=\'picError(this)\'  onload=\'pic_load(this)\' src="${zip_dir}${response.sendData.writerHead}"></a></span>
                                <span class="contentSmallPartTopSmall contentSmallPartID">${xssFilter(response.sendData.writerName)}</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDsign">${response.sendData.writerSign}</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDtime">${timeSet(response.sendData.time)}</span>
                            </div>
                            <div class="contentSmallPartTitle">
                            ${xssFilter(response.sendData.title)}
                            </div>
                        </div>
                        <div class="content">
                            <div class="innerContent">
                            ${response.sendData.content}
                            </div>
                        </div>
                        <div class="contentMoveArea">
                            <div id="like" title="赞一下" onclick="like_person(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M222.5 438h-74.1c-46.4 0-84 37.6-84 84v286.3c0 46.4 37.6 84 84 84h74.1V438zM896.6 438H691c-23.7 0-38.1-26.3-25.1-46.1 34.7-52.9 65.4-113.9 71.7-181.1 10.2-109.4-136.2-148.2-190.3-33.2-9.9 21.1-23.4 57.9-37 97.4-32 93.2-117.3 156.9-214.8 162.5v455H736c55.7 0 105.2-35.4 123.1-88.1L955.9 521c13.9-40.7-16.3-83-59.3-83z" fill="#bfbfbf"></path></svg>
                                <p>${response.sendData.likersNumber}</p>
                            </div>
                            <div id="unlike" title="踩一踩" onclick="unlike_person(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M633.038704 108.536972 269.922592 108.536972c-33.487695 0-62.133106 20.37505-74.236771 49.222051L74.04132 442.201308c-3.63069 9.279341-5.850242 19.164478-5.850242 29.452799l0 77.262688 0.403183 0.403183-0.403183 3.025916c0 44.582381 36.109406 80.69281 80.69281 80.69281l254.786871 0-38.530548 184.382381c-0.807389 4.034896-1.412163 8.271384-1.412163 12.709463 0 16.743336 6.859221 31.873941 17.752316 42.767036l42.968627 42.565445L690.128957 649.78204c14.524808-14.7264 23.602557-34.899858 23.602557-57.090253L713.731514 189.229782C713.731514 144.647401 677.621085 108.536972 633.038704 108.536972zM794.423301 108.536972l0 484.154815 161.384597 0L955.807898 108.536972 794.423301 108.536972z" fill="#bfbfbf"></path></svg>
                                <p>${response.sendData.unlikersNumber}</p>
                            </div>
                            <div id="collect" title="收藏" onclick="collect_person(this)">
                                <svg viewBox="0 0 1126 1024"><path d="M742.4 0h-358.4C199.68 0 51.2 148.48 51.2 332.8v358.4C51.2 875.52 199.68 1024 384 1024h358.4C926.72 1024 1075.2 875.52 1075.2 691.2v-358.4C1075.2 148.48 926.72 0 742.4 0zM904.533333 471.04c-3.413333 22.186667-13.653333 42.666667-29.013333 59.733333l-81.92 81.92 18.773333 114.346667c10.24 56.32-27.306667 109.226667-83.626666 119.466667-22.186667 3.413333-44.373333 0-64.853334-10.24l-102.4-54.613334L460.8 836.266667c-49.493333 27.306667-110.933333 6.826667-136.533333-42.666667-10.24-20.48-13.653333-42.666667-10.24-64.853333l18.773333-114.346667-81.92-81.92c-40.96-39.253333-40.96-105.813333-1.706667-146.773333 15.36-15.36 35.84-27.306667 58.026667-30.72l114.346667-17.066667 51.2-104.106667c25.6-51.2 85.333333-71.68 136.533333-46.08 20.48 10.24 35.84 27.306667 46.08 46.08l51.2 104.106667 114.346667 17.066667c52.906667 8.533333 92.16 59.733333 83.626666 116.053333z" fill="#bfbfbf"></path><path d="M810.666667 406.186667l-119.466667-17.066667c-13.653333-1.706667-25.6-10.24-30.72-22.186667L607.573333 256c-5.12-10.24-13.653333-18.773333-22.186666-23.893333-23.893333-11.946667-54.613333-1.706667-66.56 23.893333l-52.906667 109.226667c-5.12 11.946667-17.066667 20.48-30.72 22.186666l-119.466667 17.066667c-10.24 1.706667-20.48 6.826667-29.013333 15.36-20.48 20.48-18.773333 52.906667 1.706667 73.386667l85.333333 85.333333c10.24 10.24 13.653333 22.186667 11.946667 35.84l-20.48 119.466667c-1.706667 11.946667 0 22.186667 5.12 32.426666 13.653333 25.6 42.666667 34.133333 68.266666 22.186667l105.813334-56.32c11.946667-6.826667 27.306667-6.826667 39.253333 0l105.813333 56.32c10.24 5.12 20.48 6.826667 30.72 5.12 27.306667-5.12 46.08-30.72 40.96-59.733333l-20.48-119.466667c-1.706667-13.653333 1.706667-27.306667 11.946667-35.84l85.333333-85.333333c8.533333-8.533333 13.653333-18.773333 15.36-29.013334 5.12-27.306667-13.653333-54.613333-42.666666-58.026666z" fill="#bfbfbf"></path></svg>
                            </div>
                            <div id="share" title="分享" onclick="share(this)" value="">
                                <svg viewBox="0 0 1024 1024"><path d="M892.7 896.1H131.3c-18.4 0-33.3-14.9-33.3-33.3V696.4c0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3 0 4.5-0.9 8.9-2.6 12.8l-13 64.9c0 18.4 14.9 33.3 33.3 33.3h599.3c18.4 0 33.3-14.9 33.3-33.3l-13-64.9c-1.7-4-2.6-8.3-2.6-12.8 0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3v166.5c0.1 18.3-14.8 33.2-33.2 33.2zM580 582h1l-1 0.9v-0.9z m247.2-228.6l1.6 0.1-234.7 216.4v-2.3h-0.1c-0.3 3.7-3.4 6.7-7.2 6.7-4 0-7.2-3.2-7.2-7.2 0-0.7 0.1-1.3 0.3-1.9V433.3c-11.4-0.7-23-1.1-34.7-1.1-134.7 0-247.2 95.2-273.7 222.1-12.1-18.3-17.1-49.1-17.1-100 0-154.5 125.2-294.1 279.7-294.1 15.8 0 31.1 0.1 45.8 0.4V136.1c-0.2-0.6-0.3-1.2-0.3-1.9 0-4 3.2-7.2 7.2-7.2 3.8 0 6.9 2.9 7.2 6.7h0.1v-1.8L829.6 339h-2.4v0.1c3.7 0.3 6.7 3.4 6.7 7.2 0 3.7-3 6.8-6.7 7.1z" fill="#bfbfbf"></path></svg>
                            </div>
                            <div id="report" title="举报" onclick="report_person(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M960.288 787.488c-98.88-154.08-287.36-469.568-385.76-622.912-21.44-27.968-71.872-44-102.88 0L61.504 803.872c-23.36 33.888-23.008 79.872 49.376 82.432h824.64c48.416-2.784 48.416-62.496 24.768-98.816z m-437.44-27.776a47.296 47.296 0 1 1 0-94.592 47.296 47.296 0 0 1 0 94.592z m35.456-165.536c0.448 11.52-10.944 23.68-23.648 23.68h-23.648c-12.672 0-23.2-12.16-23.616-23.68l-23.68-224.64c0-19.552 15.904-35.456 35.488-35.456h47.296c19.584 0 35.456 15.904 35.456 35.488l-23.648 224.64z" fill="#bfbfbf"></path></svg>
                            </div>
                        </div>
                        <div class="commentSection"><div class="commentSectionArea"><div class="othersComment"><div><span class="othersComment_number">${response.sendData.commentsNumber}</span> 条评论</div><div class="Comments"><div class="commentWhite">空空如也，快来评论吧！</div></div></div><div class="CommentInputArea"><div><span><span onpaste="pasteRemoveCss(this)" contenteditable="true"  id="commentContent"></span></span></div><div><div><span class="commentSubmit" onclick="commmentSubmit_article(this)">发&nbsp;布</span></div></div></div></div></div>

                    </div>
                `);

                codeRepeat()


                if (response.sendData.comments.length !== 0) {
                    $('.commentWhite').html('');
                }
                for (let i = 0; i < response.sendData.comments.length; i++) {
                    $('.Comments').append(`
                    <div class="Comments_small">
                    <img onerror=\'picError(this)\'  onload=\'pic_load(this)\' onclick="head_to_detail(this)" src="${zip_dir}${response.sendData.headImgs[i].headImg}" id="${response.sendData.comments[i].user_id}" class="Comments_small_head">
                    <span accountId="${response.sendData.comments[i].accountId}" idname="${response.sendData.comments[i].comUser}" class="Comments_small_name">${xssFilter(response.sendData.comments[i].comUser)}：</span>
                    <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(response.sendData.comments[i].content)}</div>
                    <div commentId="${response.sendData.comments[i].id}" class="firstComment">
                        <span class="Comments_small_comment" onclick="secondComment(this)" style="cursor:pointer;">回复${response.sendData.comments[i].secComments_number == undefined ? '' : '('+response.sendData.comments[i].secComments_number+')'}</span>
                        <span time="${timeSolve(response.sendData.comments[i].time)}" class="Comments_small_time">${timeSet(response.sendData.comments[i].time)}</span>
                    </div>
                </div>
                    `);

                    if (response.sendData.comments[i].secComments) {
                        for (let j = 0; j < response.sendData.comments[i].secComments.length; j++) {

                            $('.Comments_small:nth(' + i + ')').append(`
                            <div class="Comments_small_second">
                            <img onerror=\'picError(this)\'  onload=\'pic_load(this)\' onclick="head_to_detail(this)" src="${zip_dir}${response.sendData.comments[i].secComments[j].comUserHead}" id="${response.sendData.comments[i].secComments[j].user_id}" class="Comments_small_head">
                            <span accountId="${response.sendData.comments[i].secComments[j].accountId}" idname="${response.sendData.comments[i].secComments[j].comUserName}" class="Comments_small_name">${xssFilter(response.sendData.comments[i].secComments[j].comUserName)}：</span>
                            <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(response.sendData.comments[i].secComments[j].content)}</div>
                            <div commentid="${response.sendData.comments[i].secComments[j].id}" class="firstComment">
                            <span time=${timeSolve(response.sendData.comments[i].secComments[j].time)} class="Comments_small_time">${timeSet(response.sendData.comments[i].secComments[j].time)}</span>
                            </div>
                            </div>
                            `)
                        }
                    }

                }
                if (response.isLike == true) {
                    $('#like').find('path').attr('fill', '#138bfb');
                }
                if (response.isUnlike == true) {
                    $('#unlike').find('path').attr('fill', '#707070');
                }
                if (response.isCollect == true) {
                    $('#collect').find('path').attr('fill', '#138bfb');
                }
            }

            let hlp = $('span[idname=' + window.localStorage.name + ']')
            for (let i = 0; i < hlp.length; i++) {
                $('span[idname=' + window.localStorage.name + ']:nth(' + i + ')').next().css({
                    'background-color': 'rgb(232 232 232)',
                    'font-weight': 'bold',
                    'font-size': 'large'
                });
            }

        }
    });
});