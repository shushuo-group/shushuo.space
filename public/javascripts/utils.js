/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

//增加小模块的申请模块
function centerLeftTopButtonAdd(e) {
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    $('body').after('<div class="mask"></div>');
    $('.mask').after(`
    <div class="addsmallM_part">
        <div class="addsmallM_part_article">
            <div class="addsmallM_part_article_part">
                <div id="bigM" bigMid="${$(e).parents('.centerLeftTopButton').attr('bigmid')}">大模块名称：</div>
                <div id="bigMName">${$(e).parents('.centerLeftTopButton').find('.bigMname').text()}</div>
            </div>
            <div class="addsmallM_part_article_part">
                <div id="smallM" articleid="undefined">小模块名称：</div>
                <div id="smallMName">
                    <input maxlength="5">
                </div>
            </div>
        </div>
        <div class="addsmallM_part_reason">
            <div class="addsmallM_part_reason_part">
                <span id="reason">申请原因：(如审核通过，默认您为管理员)</span>
                <div id="reasonPart" onpaste="pasteRemoveCss(this)" contenteditable="true"></div>
            </div>
        </div>
        <div class="addsmallM_part_submit">
            <button id="addsmallM_submit">确认发送</button>
        </div>
    </div>
    `);
    $('html').css({
        'overflow': 'hidden',
        'margin-right': window.innerWidth - $('body')[0].offsetWidth + 'px'
    });
    $('#addsmallM_submit').click(function () {
        if ($(this).parents('.addsmallM_part').find('#smallMName').find('input')[0].value == '') {
            alert('请填写 "小模块名称"!')
            return
        }
        if ($(this).parents('.addsmallM_part').find('#reasonPart').text() == '') {
            alert('请填写 "申请原因"!')
            return
        }
        $.ajax({
            type: "post",
            url: "/complete/addsmallM",
            data: {
                token: window.localStorage.token,
                bigMId: $(this).parents('.addsmallM_part').find('#bigM').attr('bigmid'),
                smallMName: $(this).parents('.addsmallM_part').find('#smallMName').text(),
                reason: $(this).parents('.addsmallM_part').find('#reasonPart').text()
            },
            success: function (response) {
                if (response.isLogin == false) {
                    noLogin()
                    return
                }

                if (response.isUpAdd == true) {
                    $('.mask').remove();
                    $('.addsmallM_part').remove();
                    $('html').css({
                        'overflow': 'unset',
                        'margin-right': 'unset'
                    });
                    $('.web-font').append('<div style="position: fixed;z-index: 10000000000; top: 53px; right: 0; width: auto; background-color: rgb(255 77 77); font-size: 12px; text-align: center; line-height: 30px; height: 30px; font-weight: bold; color: #feeded; border-radius: 5px;">已成功申请，请等待1-3个工作日的审核，谢谢<div>');
                    setTimeout(() => {
                        $('.web-font').find('div').remove();
                    }, 4000);
                }
            }
        });
    });
    $('.mask').click(function () {
        $('.mask').remove();
        $('.addsmallM_part').remove();
        $('html').css({
            'overflow': 'unset',
            'margin-right': 'unset'
        });
    });
    window.event.stopPropagation()
}

//大模块点击事件
function bigPart(e) {
    window.event.stopPropagation()

    $('.centerLeftBottom').html('');
    $(window).scrollTop('0px')
    $('.navigation').remove();
    $('.addArticle').remove();
    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>')

    $(e).find('.centerLeftTopButton_smallbuttons').hide();

    if (is_touch_client) {
        // 触屏设备

        $('.centerLeftTop').after(`
        <div
        style="background: #fdfdfd;padding: 2px;border-radius: 3px;width: 98%;margin: auto;position: sticky;top: 80px;z-index: 2;white-space: nowrap;overflow-x: scroll;"
        class="navigation"
        slide_way="big_part"
        big_part_id="${$(e).attr('bigmid')}"
        >
            <span
            style="border-radius: 5px;background: #e7f9f5;color: #138bfb;margin: 3px 2px;padding: 0 5px;"
            class="navigation-bigM"
            >
            ${$(e).find('.bigMname').text()}
            </span>
        </div>
        `);

        let temp_data = $(e).find('.smp')

        for (let i = 0; i < temp_data.length; i++) {
            $('.navigation-bigM').after(`
            <span
            onclick="smp(this)"
            style="border-radius: 5px;background: #ededed;color: #2a4d6d;margin: 3px 2px;padding: 0 5px;"
            class="navigation-smallM"
            small_part_id="${$(temp_data[i]).attr('id')}">${$(temp_data[i]).text()}</span>
            `);
        }

    } else {
        // 非触屏设备

        $('.centerLeftTop').append(`
        <div
        style="margin: 0 3px;"
        class="navigation"
        slide_way="big_part"
        big_part_id="${$(e).attr('bigmid')}"
        >
            <span
            class="navigation-bigM">
            ${$(e).find('.bigMname').text()}
            </span>
            >
        </div>
        `);

    }

    $.ajax({
        type: "post",
        url: "mainApp/bigModule",
        data: {
            token: window.localStorage.token,
            bigModuleId: $('.navigation').attr('big_part_id'),
        },
        success: function (response) {
            $('.commentSection_wait').remove();
            if (response.articles.length == 0) {
                $('.navigation').after(`<div class="addArticle"><a class="addArticle-a"><div class="addArticle-word">空空如也，来添加第一篇文章吧</div><svg class="addArticle-icon" t="1617944956553" viewBox="0 0 1147 1024" version="1.1"  p-id="4251" width="200" height="200"><path fill="#707070" d="M0 956.865864 1146.877993 956.865864 1146.877993 1020.7232 0 1020.7232 0 956.865864ZM0 912.775537 300.529213 827.452006 85.868257 614.103613 0 912.775537ZM802.673951 328.370422 588.010209 115.019284 115.744481 584.378491 330.405437 797.708861 802.673951 328.370422ZM902.442885 149.154775 768.272343 15.818629C746.042941-6.277693 708.804076-5.074616 685.091594 18.484019L620.682076 82.476319 835.34721 295.826104 899.75255 231.814349C923.465032 208.254362 924.668109 171.253883 902.442885 149.154775Z" p-id="4252"></path></svg></a></div>`);
                // 进行创作中心入口的提示用户登录操作
                $('.addArticle').click(function (e) {
                    if (window.localStorage.isLogin == 'false') {
                        //未登录
                        noLogin()
                    } else {
                        window.location.href = `${web_url}writer`
                    }
                });
                return
            }
            for (let i = 0; i < response.articles.length; i++) {
                square_smallPart_create(i, response, i)
            }
            //首次刷新的时候加上一个待接点
            $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');
        }
    });

}

//小模块点击事件
function smp(e) {
    window.event.stopPropagation()

    $('.centerLeftBottom').html('');
    $(window).scrollTop('0px')
    $('.addArticle').remove();
    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>')

    if (is_touch_client) {
        // 触屏设备
        $('.navigation-smallM').css('color', '#2a4d6d');
        $(e).css('color', '#ff7272');
        $('.navigation').attr('small_part_id', $(e).attr('small_part_id'));
        $('.navigation').attr('slide_way', 'small_part');
    } else {
        // 非触屏设备
        $('.navigation').remove();
        $('.centerLeftBottom').html('');
        $('.backPast').hide();
        $(e).parents('.centerLeftTopButton_smallbuttons').hide();
        $('.centerLeftTop').append(`
        <div
        style="margin: 0 3px;"
        class="navigation"
        slide_way="small_part"
        big_part_id="${$(e).parents('.centerLeftTopButton').attr('bigmid')}"
        small_part_id="${$(e).attr('id')}"
        >
            <span
            class="navigation-bigM"
            >
            ${$(e).parents('.centerLeftTopButton').find('.bigMname').text()}
            </span>
            >
            <span
            class="navigation-smallM"
            >
            ${$(e).text()}
            </span>
        </div>
        `);
    }

    $.ajax({
        type: "post",
        url: "mainApp/smallModule",
        data: {
            bigModuleId: $('.navigation').attr('big_part_id'),
            smallModuleId: $('.navigation').attr('small_part_id'),
            token: window.localStorage.token
        },
        success: function (response) {
            $('.commentSection_wait').remove();
            if (response.articles.length == 0) {
                $('.navigation').after(`
                <div
                class="addArticle">
                    <a
                    class="addArticle-a">
                        <div class="addArticle-word">空空如也，来添加第一篇文章吧</div>
                        <svg class="addArticle-icon" t="1617944956553" viewBox="0 0 1147 1024" version="1.1"  p-id="4251" width="200" height="200"><path fill="#707070" d="M0 956.865864 1146.877993 956.865864 1146.877993 1020.7232 0 1020.7232 0 956.865864ZM0 912.775537 300.529213 827.452006 85.868257 614.103613 0 912.775537ZM802.673951 328.370422 588.010209 115.019284 115.744481 584.378491 330.405437 797.708861 802.673951 328.370422ZM902.442885 149.154775 768.272343 15.818629C746.042941-6.277693 708.804076-5.074616 685.091594 18.484019L620.682076 82.476319 835.34721 295.826104 899.75255 231.814349C923.465032 208.254362 924.668109 171.253883 902.442885 149.154775Z" p-id="4252"></path></svg>
                    </a>
                </div>
                `);
                // 进行创作中心入口的提示用户登录操作
                $('.addArticle').click(function () {
                    if (window.localStorage.isLogin == 'false') {
                        //未登录
                        noLogin()
                    } else {
                        window.location.href = `${web_url}writer`
                    }
                });
                return
            }
            for (let i = 0; i < response.articles.length; i++) {
                square_smallPart_create(i, response, i)
            }
            //首次刷新的时候加上一个待接点
            $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');
        }
    });

}

//除了树洞模块的滑动刷新（时间排序）
function slideFlushBytime(slideWay, bigMidData, smallMidData) {

    if ($('.stopFlush').length == 1) {
        return
    }

    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>')
    $.ajax({
        type: "post",
        url: "/mainApp/slideFlush",
        data: {
            bigMid: bigMidData,
            smallMid: smallMidData,
            number: $('.waitAfter').length,
            token: window.localStorage.token,
            way: slideWay
        },
        success: function (response) {
            if (response.articles.length == 0) {
                $('.centerLeftBottom').append(`<div class="contentSmallPart stopFlush">天呐，帖子竟然被你刷完了！！！</div>`)
            }

            $('.centerLeftBottom>.commentSection_wait').remove();

            for (let i = 0; i < response.articles.length; i++) {
                square_smallPart_create(i, response, $('.contentSmallPart').length)
            }
            $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');
        }
    });
}

//树洞模块的滑动刷新（时间排序）
function slideFlushBytime_shuDong(slideWay, bigMidData, smallMidData) {
    if ($('.stopFlush').length == 1) {
        return
    }

    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>')

    $.ajax({
        type: "post",
        url: "/mainApp/slideFlush",
        data: {
            bigMid: bigMidData,
            smallMid: smallMidData,
            number: $('.waitAfter').length,
            token: window.localStorage.token,
            way: slideWay
        },
        success: function (response) {
            if (response.articles.length == 0) {
                $('.centerLeftBottom').append(`<div class="contentSmallPart stopFlush">天呐，帖子竟然被你刷完了！！！</div>`)
            }

            $('.centerLeftBottom>.commentSection_wait').remove();

            for (let i = 0; i < response.articles.length; i++) {
                shuDong_smallPart_create(i, response, $('.contentSmallPart').length)
            }
            $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');
        }
    });
}

//增加蒙版模块/以及其他对每个小模块的公共事件
function firstFlush_hidden(data) {

    $('.contentSmallPart:nth(' + data + ')').append(`
    <div class="card loading">
        <div class="loading_content">
            <h4 class="loading_h4"></h4>
            <div class="loading_description"></div>
        </div>
    </div>
    `)

    //增加蒙版的限制 需要在每篇文章内的图片均加载完成才进行增加蒙版的判断
    let imgs = $('.contentSmallPart:nth(' + data + ')').find('.innerContent').find('img')

    let links = $('.contentSmallPart:nth(' + data + ')').find('.innerContent').find('a')

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

    if (imgs.length == 0) {
        //所有均渲染好

        setTimeout(() => {
            $('.contentSmallPart:nth(' + data + ')').find('.card').remove();
            $('.contentSmallPart:nth(' + data + ')>*').show();

            //纯文字的加蒙版模式
            if ($('.contentSmallPart:nth(' + data + ')').find('.innerContent')[0].offsetHeight == 200) {
                $('.contentSmallPart:nth(' + data + ')').find('.innerContent').after(`
                <div
                class="contentExploreMask"
                onclick="readAllButton(this)"
                >
                    <div class="contentExploreButton">阅读全文</div>
                </div>
                `);
            }

            //对代码块进行数字标识
            let codePartNum = $('.contentSmallPart:nth(' + data + ')').find('code').length
            for (let i = 0; i < codePartNum; i++) {

                $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').css({
                    'font-size': '15px',
                    'line-height': '2'
                });
                let tmpStyle = $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').attr('style')
                tmpStyle = tmpStyle.replace(/font-size:/gi, '')
                tmpStyle = tmpStyle.replace(/line-height:/gi, '')
                tmpStyle = tmpStyle.replace(/px/gi, '')
                tmpStyle = tmpStyle.split(';')
                let num = tmpStyle[0] * tmpStyle[1]
                let lineNum = $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')')[0].clientHeight / num

                $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').parent().prepend(`<ul class="code_number"></ul>`);
                for (let j = 0; j < lineNum; j++) {
                    $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').siblings('.code_number').append(`<li style="line-height:${num}px;font-size:${tmpStyle[0]}px;">${j+1}</li>`);
                }


                $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').parent().hover(function () {
                    // over
                    $(this).css('position', 'relative');
                    $(this).prepend(`<span class="code_repeat" onclick="codeCopy(this)">复制</span>`);
                }, function () {
                    // out
                    $(this).css('position', '');
                    $('.code_repeat').remove();
                });
            }

        }, 500);

    } else {

        let j = 0
        for (let i = 0; i < imgs.length; i++) {

            // 此处仅用于本站丢失图片
            $(imgs[i]).attr('onerror', 'picError(this)');

            // 给文章内的图片添加上时间戳
            let temp_src = $(imgs[i]).attr('src')
            if (is_third_pic(imgs[i])) {
                // 非本站存储图片
                $(imgs[i]).attr('src', 'illeagal_picture_2022_01_23');
            } else {
                // 本站存储图片
                $(imgs[i]).attr('src', pic_src_solve(temp_src));
            }

            let temp_pic_css = {
                'user-select': 'none',
                'cursor': 'zoom-in',
                'margin': 'auto',
                'display': 'block',
                'border-radius': '5px',
                'width': '50%'
            }

            // 对小屏幕设备适配
            if (is_small_client) {
                temp_pic_css = {
                    'user-select': 'none',
                    'margin': 'auto',
                    'display': 'block',
                    'border-radius': '5px',
                    'width': '100%'
                }
            }

            $(imgs[i]).css(temp_pic_css);

            // 图片放大浏览
            imgs[i].onclick = function () {
                window.event.stopPropagation()
                if ($(this).attr('pic_bad') === 'true') {
                    return
                }
                pic_read(this)
            }

            imgs[i].onload = function () {

                j = j + 1

                if (j == imgs.length) {

                    setTimeout(() => {
                        //所有均渲染好
                        $('.contentSmallPart:nth(' + data + ')').find('.card').remove();
                        $('.contentSmallPart:nth(' + data + ')>*').show();

                        //携带图片的增加蒙版模式

                        if ($('.contentSmallPart:nth(' + data + ')').find('.innerContent').height() == 200) {
                            $('.contentSmallPart:nth(' + data + ')').find('.innerContent').after(`
                            <div
                            class="contentExploreMask"
                            onclick="readAllButton(this)"
                            >
                                <div class="contentExploreButton">阅读全文</div>
                            </div>
                            `);
                        }

                        //对代码块进行数字标识
                        let codePartNum = $('.contentSmallPart:nth(' + data + ')').find('code').length
                        for (let i = 0; i < codePartNum; i++) {

                            $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').css({
                                'font-size': '15px',
                                'line-height': '2'
                            });
                            let tmpStyle = $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').attr('style')
                            tmpStyle = tmpStyle.replace(/font-size:/gi, '')
                            tmpStyle = tmpStyle.replace(/line-height:/gi, '')
                            tmpStyle = tmpStyle.replace(/px/gi, '')
                            tmpStyle = tmpStyle.split(';')
                            let num = tmpStyle[0] * tmpStyle[1]
                            let lineNum = $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')')[0].clientHeight / num

                            $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').parent().prepend(`<ul class="code_number"></ul>`);
                            for (let j = 0; j < lineNum; j++) {
                                $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').siblings('.code_number').append(`<li style="line-height:${num}px;font-size:${tmpStyle[0]}px;">${j+1}</li>`);
                            }


                            $('.contentSmallPart:nth(' + data + ')').find('code:nth(' + i + ')').parent().hover(function () {
                                // over
                                $(this).css('position', 'relative');
                                $(this).prepend(`<span class="code_repeat" onclick="codeCopy(this)">复制</span>`);
                            }, function () {
                                // out
                                $(this).css('position', '');
                                $('.code_repeat').remove();
                            });
                        }

                    }, 500);

                }

            }

        }

    }
}

/**
 * 
 * @param {pic_read} 公共放大图片浏览
 */
function pic_read(e) {

    /**
     * this_pic_unclear@指代本次的模糊图片操作对象
     */
    let this_pic_unclear = e
    $(this_pic_unclear).css('visibility', 'hidden');

    $('html').css({
        'overflow': 'hidden',
        'margin-right': window.innerWidth - $('body')[0].offsetWidth + 'px'
    });

    let temp_html = `
        <div class="img_bigshow_part">
            <div class="img_bigshow_part_part">
                <div class="img_bigshow_part_top">
                    ${$(this_pic_unclear)[0].outerHTML}
                </div>
                <div class="img_bigshow_part_bottom">
                    <div class="img_bigshow_part_bottom_center">
                        <span class="img_bigshow_part_bottom_center_button">
                            <a class="img_bigshow_part_buttons img_bigshow_part_round">
                                <svg t="1638070345436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2306" width="200" height="200"><path d="M482.773333 66.517333l148.181334 151.168a21.333333 21.333333 0 0 1 0 29.866667l-147.84 150.826667a21.333333 21.333333 0 0 1-28.16 2.090666l-2.346667-2.090666-27.050667-27.605334a21.333333 21.333333 0 0 1 0-29.866666l69.888-71.338667a304.64 304.64 0 1 0 318.421334 352.682667l1.024-6.826667c0.170667-1.408 0.426667-3.285333 0.64-5.632a21.333333 21.333333 0 0 1 22.314666-19.114667l42.666667 2.261334a21.333333 21.333333 0 0 1 20.224 22.4l-0.085333 1.024-1.194667 10.496A389.973333 389.973333 0 1 1 484.821333 184.746667l-59.306666-60.458667a21.333333 21.333333 0 0 1 0-29.866667l27.093333-27.605333a21.333333 21.333333 0 0 1 30.165333-0.298667z" p-id="2307" fill="#f1f3f4"></path></svg>
                            </a>
                        </span>
                        <span class="img_bigshow_part_bottom_center_button">
                            <a class="img_bigshow_part_buttons img_bigshow_part_down" href="${$(this_pic_unclear).attr('src').replace(/zipped_pic/gi,'pic')}" download>
                                <svg t="1621226978872" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="200" height="200"><path d="M1024 645.248v330.752a48 48 0 0 1-48 48H48a48 48 0 0 1-48-48v-330.752a48 48 0 0 1 96 0V928h832v-282.752a48 48 0 0 1 96 0z m-545.152 145.984a47.936 47.936 0 0 0 67.904 0l299.904-299.84a48 48 0 1 0-67.968-67.904l-217.792 217.856V48a48.064 48.064 0 0 0-96.064 0v593.472L246.912 423.552a48 48 0 1 0-67.904 67.904l299.84 299.776z" p-id="1903" fill="#f1f3f4"></path></svg>
                            </a>
                        </span>
                        <span class="img_bigshow_part_bottom_center_button">
                            <a class="img_bigshow_part_hight">
                                查看原图
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `


    jump_window({}, temp_html, () => {

        $('#jump_window').addClass('img_open');

        $('.img_bigshow_part').click(function (e) {
            e.stopPropagation()
        });

        $('#jump_window').click(function () {
            $('#jump_window').removeClass('img_open');
            $('#jump_window').attr('style', '');
            $('#jump_window').html('');
            $('#jump_window').unbind();
            $('body').unbind();

            $(this_pic_unclear).css('visibility', 'visible');
            $('html').css({
                'overflow': 'unset',
                'margin-right': 'unset'
            });
        });

        // 清除图片原有自带html的属性样式
        $('.img_bigshow_part_top>img').attr('style', '');

        // 俩个按钮的 hover 效果
        $('.img_bigshow_part_buttons').hover(function () {
            // over
            $(this).find('path').attr('fill', '#03a9f4');
        }, function () {
            // out
            $(this).find('path').attr('fill', '#f1f3f4');
        });

        //图片旋转功能
        let temp_degree = 0
        $('.img_bigshow_part_round').click(function () {
            temp_degree += 90
            $(this).parents('.img_bigshow_part_part').find('img').css('transform', `rotate(${temp_degree}deg)`);
        });

        // 如果满足小屏幕条件则进行手机样式适配
        if (is_small_client) {
            $('#jump_window').css('background', 'black');
        }

    })


    // 图片加载完毕再进行后续操作
    $('.img_bigshow_part_top > img')[0].onload = function () {

        // 进行 gif图片 的查看原图功能的取消
        let pic_zip_src = $(this_pic_unclear).attr('src')
        let fin_3_word = pic_zip_src.substr(pic_zip_src.length - 3, pic_zip_src.length)
        if (fin_3_word === 'gif') {
            $('.img_bigshow_part_hight').css('cursor', 'not-allowed');
        } else {
            $('.img_bigshow_part_hight').click(function () {
                let temp_src = pic_zip_src.replace(zip_dir, nozip_dir)
                $('.img_bigshow_part_top>img').attr('src', temp_src);
            });
        }

        /**
         * container_x_y@图片容器的宽高比
         * pic_x_y@实际图片的宽高比
         */
        let container_x_y = $('.img_bigshow_part_top').width() / $('.img_bigshow_part_top').height()
        let pic_x_y = $('.img_bigshow_part_top > img').width() / $('.img_bigshow_part_top > img').height()

        // 进行图片类型判定 以决定具体的图片展示方式
        if (container_x_y > pic_x_y) {
            // 瘦高形图片
            $('.img_bigshow_part_top>img').addClass('img_bigshow_part_top_img_y');
        } else {
            // 矮胖形图片
            $('.img_bigshow_part_top>img').addClass('img_bigshow_part_top_img_x');
        }

        // 定位后 进行图片的显示 避免闪烁
        $('.img_bigshow_part_top>img').css('visibility', 'visible');

    }

}

//粗略阅读全文事件
function readAllButton(e) {

    // 应对登陆引起的多次点击阅读全文bug
    if ($(e).parents('.content').find('.contentExploreMask').length == 2) {
        let temp_target = $(e).parents('.content').find('.contentExploreMask')
        $(temp_target[0]).remove();
    }

    //存在过被打开的文章    之后需要对模块进行初始化
    $('.contentExploreButton_close').remove();
    $('.innerContent').css('max-height', '200px');
    $('.contentExploreButton').show();
    $('.contentExploreMask').show();
    $('.contentSmallPart').removeAttr('style');

    let scroll01 = $(window).scrollTop()

    let num = scroll01 + $(e).parents('.contentSmallPart')[0].getBoundingClientRect().top - $('.top')[0].clientHeight;

    if (is_small_client) {
        //mobile
        num -= $('.centerLeftTop')[0].clientHeight
        let temp = $('.navigation')
        if (temp.length === 1) {
            //mobile_navigation is show
            num -= temp[0].clientHeight
        }
    } else {
        //pc
        num -= $('.centerLeftTop')[0].clientHeight
    }
    //进行调整滚动条以达到准确保持打开的文章处于文章顶部的功能  这个 34 有需要进行适配
    $(window).scrollTop(num);

    $(e).parents('.contentSmallPart').css({
        'box-sizing': 'content-box',
        'box-shadow': '0px 0px 1px 2px rgb(3 169 244)'
    });

    $(e).hide();
    $(e).siblings('.innerContent').css('max-height', 'unset');
    $(e).parents('.contentSmallPart').find('.contentMoveArea').append('<div onclick="contentExploreButton_button(this)" class="contentExploreButton_close">收起</div>')

    $(window).bind('scroll.a', function () {
        if ($(e).parents('.contentSmallPart')[0].getBoundingClientRect().bottom > $(window).height()) {
            $('.contentExploreButton_close').css({
                'position': 'fixed',
                'top': 'unset',
                'bottom': '100px',
                'border': '50px',
                'margin': '0',
                'left': ($(window).width() - $('.center').width()) / 2 - ($('.centerLeft').width() - $('.centerLeftBottom').width()) + $('.centerLeft').width() - $('.contentExploreButton_close').width() + 'px'
            });

            if ($('.contentExploreButton_close')[0].getBoundingClientRect().top < $(e).parents('.contentSmallPart')[0].getBoundingClientRect().top) {
                $('.contentExploreButton_close').css({
                    'position': '',
                    'top': '',
                    'bottom': '',
                    'border': '',
                    'margin': '',
                    'left': ''
                });
            } else {
                $('.contentExploreButton_close').css({
                    'position': 'fixed',
                    'top': 'unset',
                    'bottom': '100px',
                    'border': '50px',
                    'margin': '0',
                    'left': ($(window).width() - $('.center').width()) / 2 - ($('.centerLeft').width() - $('.centerLeftBottom').width()) + $('.centerLeft').width() - $('.contentExploreButton_close').width() + 'px'
                });
            }

        } else {
            $('.contentExploreButton_close').css({
                'position': '',
                'top': '',
                'bottom': '',
                'border': '',
                'margin': '',
                'left': ''
            });
        }
    });

    window.localStorage.scrollTop = $(window).scrollTop()

}

//粗略阅读全文收起事件
function contentExploreButton_button(e) {
    $(e).parents('.contentSmallPart').removeAttr('style');
    $(e).parents('.contentSmallPart').find('.contentExploreMask').show()
    $(e).parents('.contentSmallPart').find('.innerContent').css('max-height', '200px');
    $(e).remove();
    $(window).scrollTop(window.localStorage.scrollTop)
    window.localStorage.removeItem('scrollTop')
    $(window).unbind('scroll.a');
}

//代码复制按钮
function codeCopy(e) {
    $(e).append(`<textarea readonly="readonly" style="text-indent: 0;background: transparent;border: 0 none;resize:none;outline:none;-webkit-appearance:none;line-height: normal;position: fixed;width: 1px;top: 0;height: 1px;"></textarea>`);
    let temp = $(e).find('textarea')[0];
    temp.value = `${$(e).siblings('code')[0].outerText}`
    temp.select();
    document.execCommand("Copy");
    $(e).find('textarea').remove();
    $(e).css('color', 'rgb(81 255 216)');
    $(e).html('已复制');
    setTimeout(() => {
        $(e).css('color', '');
        $(e).html('复制');
    }, 2000);
}

//除树洞以外所有的生成小卡片的公共代码
function square_smallPart_create(i, response, i2) {
    // 部分元素有待继续补充
    $('.centerLeftBottom').append(`<div class="contentSmallPart">
                        <div class="contentSmallPartTop" articleId="${response.articles[i].articleId}">
                            <div>
                                <span 
                                id="${response.articles[i].writerId}" 
                                class="contentSmallPartTopSmall contentSmallPartHead" 
                                onclick="toUserMainPage(this)">
                                    <img
                                    onerror=\'picError(this)\'
                                    src="${pic_src_solve(zip_dir + response.articles[i].writerHead)}"
                                    >
                                </span>
                                <span class="contentSmallPartTopSmall contentSmallPartID">${xssFilter(response.articles[i].writerName)}</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDsign">${response.articles[i].writerWord}</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDtime">${timeSet(response.articles[i].articleTime)}</span>
                                
                            ${response.articles[i].small_name==undefined?'':'<div class="contentposition"><span>'+response.articles[i].big_name+'</span>><span>'+response.articles[i].small_name+'</span></div>'}
                            </div>
                            <div class="contentSmallPartTitle">
                            ${xssFilter(response.articles[i].articleName)}
                            </div>
                        </div>
                        <div class="content">
                            <div class="innerContent">
                            ${response.articles[i].articleContent}
                            </div>
                        </div>
                        <div class="contentMoveArea">
                            <div id="like" title="赞一下" onclick="like(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M222.5 438h-74.1c-46.4 0-84 37.6-84 84v286.3c0 46.4 37.6 84 84 84h74.1V438zM896.6 438H691c-23.7 0-38.1-26.3-25.1-46.1 34.7-52.9 65.4-113.9 71.7-181.1 10.2-109.4-136.2-148.2-190.3-33.2-9.9 21.1-23.4 57.9-37 97.4-32 93.2-117.3 156.9-214.8 162.5v455H736c55.7 0 105.2-35.4 123.1-88.1L955.9 521c13.9-40.7-16.3-83-59.3-83z" fill="${response.articles[i].islike == false ? "#bfbfbf" : '#138bfb'}"></path></svg>
                                <p>${response.articles[i].like}</p>
                            </div>
                            <div id="unlike" title="踩一踩" onclick="unlike(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M633.038704 108.536972 269.922592 108.536972c-33.487695 0-62.133106 20.37505-74.236771 49.222051L74.04132 442.201308c-3.63069 9.279341-5.850242 19.164478-5.850242 29.452799l0 77.262688 0.403183 0.403183-0.403183 3.025916c0 44.582381 36.109406 80.69281 80.69281 80.69281l254.786871 0-38.530548 184.382381c-0.807389 4.034896-1.412163 8.271384-1.412163 12.709463 0 16.743336 6.859221 31.873941 17.752316 42.767036l42.968627 42.565445L690.128957 649.78204c14.524808-14.7264 23.602557-34.899858 23.602557-57.090253L713.731514 189.229782C713.731514 144.647401 677.621085 108.536972 633.038704 108.536972zM794.423301 108.536972l0 484.154815 161.384597 0L955.807898 108.536972 794.423301 108.536972z" fill="${response.articles[i].isunlike == false ? "#bfbfbf" : '#707070'}"></path></svg>
                                <p>${response.articles[i].unlike}</p>
                            </div>
                            <div id="collect" title="收藏" onclick="collect(this)">
                                <svg viewBox="0 0 1126 1024"><path d="M742.4 0h-358.4C199.68 0 51.2 148.48 51.2 332.8v358.4C51.2 875.52 199.68 1024 384 1024h358.4C926.72 1024 1075.2 875.52 1075.2 691.2v-358.4C1075.2 148.48 926.72 0 742.4 0zM904.533333 471.04c-3.413333 22.186667-13.653333 42.666667-29.013333 59.733333l-81.92 81.92 18.773333 114.346667c10.24 56.32-27.306667 109.226667-83.626666 119.466667-22.186667 3.413333-44.373333 0-64.853334-10.24l-102.4-54.613334L460.8 836.266667c-49.493333 27.306667-110.933333 6.826667-136.533333-42.666667-10.24-20.48-13.653333-42.666667-10.24-64.853333l18.773333-114.346667-81.92-81.92c-40.96-39.253333-40.96-105.813333-1.706667-146.773333 15.36-15.36 35.84-27.306667 58.026667-30.72l114.346667-17.066667 51.2-104.106667c25.6-51.2 85.333333-71.68 136.533333-46.08 20.48 10.24 35.84 27.306667 46.08 46.08l51.2 104.106667 114.346667 17.066667c52.906667 8.533333 92.16 59.733333 83.626666 116.053333z" fill="${response.articles[i].iscollect == false ? "#bfbfbf" : '#138bfb'}"></path><path d="M810.666667 406.186667l-119.466667-17.066667c-13.653333-1.706667-25.6-10.24-30.72-22.186667L607.573333 256c-5.12-10.24-13.653333-18.773333-22.186666-23.893333-23.893333-11.946667-54.613333-1.706667-66.56 23.893333l-52.906667 109.226667c-5.12 11.946667-17.066667 20.48-30.72 22.186666l-119.466667 17.066667c-10.24 1.706667-20.48 6.826667-29.013333 15.36-20.48 20.48-18.773333 52.906667 1.706667 73.386667l85.333333 85.333333c10.24 10.24 13.653333 22.186667 11.946667 35.84l-20.48 119.466667c-1.706667 11.946667 0 22.186667 5.12 32.426666 13.653333 25.6 42.666667 34.133333 68.266666 22.186667l105.813334-56.32c11.946667-6.826667 27.306667-6.826667 39.253333 0l105.813333 56.32c10.24 5.12 20.48 6.826667 30.72 5.12 27.306667-5.12 46.08-30.72 40.96-59.733333l-20.48-119.466667c-1.706667-13.653333 1.706667-27.306667 11.946667-35.84l85.333333-85.333333c8.533333-8.533333 13.653333-18.773333 15.36-29.013334 5.12-27.306667-13.653333-54.613333-42.666666-58.026666z" fill="${response.articles[i].iscollect == false ? "#bfbfbf" : '#138bfb'}"></path></svg>
                            </div>
                            <div id="share" title="分享" onclick="share(this)">
                                
                                <svg viewBox="0 0 1024 1024"><path d="M892.7 896.1H131.3c-18.4 0-33.3-14.9-33.3-33.3V696.4c0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3 0 4.5-0.9 8.9-2.6 12.8l-13 64.9c0 18.4 14.9 33.3 33.3 33.3h599.3c18.4 0 33.3-14.9 33.3-33.3l-13-64.9c-1.7-4-2.6-8.3-2.6-12.8 0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3v166.5c0.1 18.3-14.8 33.2-33.2 33.2zM580 582h1l-1 0.9v-0.9z m247.2-228.6l1.6 0.1-234.7 216.4v-2.3h-0.1c-0.3 3.7-3.4 6.7-7.2 6.7-4 0-7.2-3.2-7.2-7.2 0-0.7 0.1-1.3 0.3-1.9V433.3c-11.4-0.7-23-1.1-34.7-1.1-134.7 0-247.2 95.2-273.7 222.1-12.1-18.3-17.1-49.1-17.1-100 0-154.5 125.2-294.1 279.7-294.1 15.8 0 31.1 0.1 45.8 0.4V136.1c-0.2-0.6-0.3-1.2-0.3-1.9 0-4 3.2-7.2 7.2-7.2 3.8 0 6.9 2.9 7.2 6.7h0.1v-1.8L829.6 339h-2.4v0.1c3.7 0.3 6.7 3.4 6.7 7.2 0 3.7-3 6.8-6.7 7.1z" fill="#bfbfbf"></path></svg>
                            </div>
                            <div id="remark" title="评论一下" class="commentOpen" onclick="remark(this)" isOpen="false">
                                <svg viewBox="0 0 1024 1024"><path d="M512 67C266.24 67 67 241.33 67 456.37c0 122.9 65.23 232.32 166.87 303.69V957l195-118.3a508.35 508.35 0 0 0 83.17 7c245.77 0 445-174.32 445-389.37S757.77 67 512 67zM289.5 512a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 289.5 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 512 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 734.5 512z" fill="#bfbfbf"></path></svg>
                                <p class="commentOpen_number">${response.articles[i].articleComNumber}</p>
                            </div>
                            <div id="report" title="举报" onclick="report(this)">
                                <svg viewBox="0 0 1024 1024"><path d="M960.288 787.488c-98.88-154.08-287.36-469.568-385.76-622.912-21.44-27.968-71.872-44-102.88 0L61.504 803.872c-23.36 33.888-23.008 79.872 49.376 82.432h824.64c48.416-2.784 48.416-62.496 24.768-98.816z m-437.44-27.776a47.296 47.296 0 1 1 0-94.592 47.296 47.296 0 0 1 0 94.592z m35.456-165.536c0.448 11.52-10.944 23.68-23.648 23.68h-23.648c-12.672 0-23.2-12.16-23.616-23.68l-23.68-224.64c0-19.552 15.904-35.456 35.488-35.456h47.296c19.584 0 35.456 15.904 35.456 35.488l-23.648 224.64z" fill="#bfbfbf"></path></svg>
                            </div>
                        </div>
                    </div>`);
    firstFlush_hidden(i2)
}

//树洞的生成小卡片的公共代码
function shuDong_smallPart_create(i, response, i2) {

    $('.centerLeftBottom').append(`<div class="contentSmallPart">
    <div class="contentSmallPartTop" articleId="${response.articles[i].articleId}">
        <div>
            <span class="contentSmallPartTopSmall contentSmallPartHead">                        <svg class="anonymity" viewBox="0 0 1024 1024">
            <path
                d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z"
                fill="#707070"></path>
        </svg></span>
            <span class="contentSmallPartTopSmall contentSmallPartID">匿名</span>
            <span class="contentSmallPartTopSmall contentSmallPartIDsign"></span>
            <span class="contentSmallPartTopSmall contentSmallPartIDtime">${timeSet(response.articles[i].articleTime)}</span>
        </div>
        <div class="contentSmallPartTitle">
        ${xssFilter(response.articles[i].articleName)}
        </div>
    </div>
    <div class="content">
        <div class="innerContent">
        ${response.articles[i].articleContent}
        </div>
    </div>
    <div class="contentMoveArea">
        <div id="like" title="赞一下" onclick="like(this)">
            <svg viewBox="0 0 1024 1024"><path d="M222.5 438h-74.1c-46.4 0-84 37.6-84 84v286.3c0 46.4 37.6 84 84 84h74.1V438zM896.6 438H691c-23.7 0-38.1-26.3-25.1-46.1 34.7-52.9 65.4-113.9 71.7-181.1 10.2-109.4-136.2-148.2-190.3-33.2-9.9 21.1-23.4 57.9-37 97.4-32 93.2-117.3 156.9-214.8 162.5v455H736c55.7 0 105.2-35.4 123.1-88.1L955.9 521c13.9-40.7-16.3-83-59.3-83z" fill="${response.articles[i].islike == false ? "#bfbfbf" : '#138bfb'}"></path></svg>
            <p>${response.articles[i].like}</p>
        </div>
        <div id="unlike" title="踩一踩" onclick="unlike(this)">
            <svg viewBox="0 0 1024 1024"><path d="M633.038704 108.536972 269.922592 108.536972c-33.487695 0-62.133106 20.37505-74.236771 49.222051L74.04132 442.201308c-3.63069 9.279341-5.850242 19.164478-5.850242 29.452799l0 77.262688 0.403183 0.403183-0.403183 3.025916c0 44.582381 36.109406 80.69281 80.69281 80.69281l254.786871 0-38.530548 184.382381c-0.807389 4.034896-1.412163 8.271384-1.412163 12.709463 0 16.743336 6.859221 31.873941 17.752316 42.767036l42.968627 42.565445L690.128957 649.78204c14.524808-14.7264 23.602557-34.899858 23.602557-57.090253L713.731514 189.229782C713.731514 144.647401 677.621085 108.536972 633.038704 108.536972zM794.423301 108.536972l0 484.154815 161.384597 0L955.807898 108.536972 794.423301 108.536972z" fill="${response.articles[i].isunlike == false ? "#bfbfbf" : '#707070'}"></path></svg>
            <p>${response.articles[i].unlike}</p>
        </div>
        <div id="collect" title="收藏" onclick="collect(this)">
            <svg viewBox="0 0 1126 1024"><path d="M742.4 0h-358.4C199.68 0 51.2 148.48 51.2 332.8v358.4C51.2 875.52 199.68 1024 384 1024h358.4C926.72 1024 1075.2 875.52 1075.2 691.2v-358.4C1075.2 148.48 926.72 0 742.4 0zM904.533333 471.04c-3.413333 22.186667-13.653333 42.666667-29.013333 59.733333l-81.92 81.92 18.773333 114.346667c10.24 56.32-27.306667 109.226667-83.626666 119.466667-22.186667 3.413333-44.373333 0-64.853334-10.24l-102.4-54.613334L460.8 836.266667c-49.493333 27.306667-110.933333 6.826667-136.533333-42.666667-10.24-20.48-13.653333-42.666667-10.24-64.853333l18.773333-114.346667-81.92-81.92c-40.96-39.253333-40.96-105.813333-1.706667-146.773333 15.36-15.36 35.84-27.306667 58.026667-30.72l114.346667-17.066667 51.2-104.106667c25.6-51.2 85.333333-71.68 136.533333-46.08 20.48 10.24 35.84 27.306667 46.08 46.08l51.2 104.106667 114.346667 17.066667c52.906667 8.533333 92.16 59.733333 83.626666 116.053333z" fill="${response.articles[i].iscollect == false ? "#bfbfbf" : '#138bfb'}"></path><path d="M810.666667 406.186667l-119.466667-17.066667c-13.653333-1.706667-25.6-10.24-30.72-22.186667L607.573333 256c-5.12-10.24-13.653333-18.773333-22.186666-23.893333-23.893333-11.946667-54.613333-1.706667-66.56 23.893333l-52.906667 109.226667c-5.12 11.946667-17.066667 20.48-30.72 22.186666l-119.466667 17.066667c-10.24 1.706667-20.48 6.826667-29.013333 15.36-20.48 20.48-18.773333 52.906667 1.706667 73.386667l85.333333 85.333333c10.24 10.24 13.653333 22.186667 11.946667 35.84l-20.48 119.466667c-1.706667 11.946667 0 22.186667 5.12 32.426666 13.653333 25.6 42.666667 34.133333 68.266666 22.186667l105.813334-56.32c11.946667-6.826667 27.306667-6.826667 39.253333 0l105.813333 56.32c10.24 5.12 20.48 6.826667 30.72 5.12 27.306667-5.12 46.08-30.72 40.96-59.733333l-20.48-119.466667c-1.706667-13.653333 1.706667-27.306667 11.946667-35.84l85.333333-85.333333c8.533333-8.533333 13.653333-18.773333 15.36-29.013334 5.12-27.306667-13.653333-54.613333-42.666666-58.026666z" fill="${response.articles[i].iscollect == false ? "#bfbfbf" : '#138bfb'}"></path></svg>
        </div>
        <div id="share" title="分享" onclick="share(this)">
            <svg viewBox="0 0 1024 1024"><path d="M892.7 896.1H131.3c-18.4 0-33.3-14.9-33.3-33.3V696.4c0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3 0 4.5-0.9 8.9-2.6 12.8l-13 64.9c0 18.4 14.9 33.3 33.3 33.3h599.3c18.4 0 33.3-14.9 33.3-33.3l-13-64.9c-1.7-4-2.6-8.3-2.6-12.8 0-18.4 14.9-33.3 33.3-33.3h30c18.4 0 33.3 14.9 33.3 33.3v166.5c0.1 18.3-14.8 33.2-33.2 33.2zM580 582h1l-1 0.9v-0.9z m247.2-228.6l1.6 0.1-234.7 216.4v-2.3h-0.1c-0.3 3.7-3.4 6.7-7.2 6.7-4 0-7.2-3.2-7.2-7.2 0-0.7 0.1-1.3 0.3-1.9V433.3c-11.4-0.7-23-1.1-34.7-1.1-134.7 0-247.2 95.2-273.7 222.1-12.1-18.3-17.1-49.1-17.1-100 0-154.5 125.2-294.1 279.7-294.1 15.8 0 31.1 0.1 45.8 0.4V136.1c-0.2-0.6-0.3-1.2-0.3-1.9 0-4 3.2-7.2 7.2-7.2 3.8 0 6.9 2.9 7.2 6.7h0.1v-1.8L829.6 339h-2.4v0.1c3.7 0.3 6.7 3.4 6.7 7.2 0 3.7-3 6.8-6.7 7.1z" fill="#bfbfbf"></path></svg>
        </div>
        <div id="remark" title="评论一下" class="commentOpen" onclick="remark(this)" isOpen="false">
            <svg viewBox="0 0 1024 1024"><path d="M512 67C266.24 67 67 241.33 67 456.37c0 122.9 65.23 232.32 166.87 303.69V957l195-118.3a508.35 508.35 0 0 0 83.17 7c245.77 0 445-174.32 445-389.37S757.77 67 512 67zM289.5 512a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 289.5 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 512 512z m222.5 0a55.62 55.62 0 1 1 55.62-55.62A55.62 55.62 0 0 1 734.5 512z" fill="#bfbfbf"></path></svg>
            <p class="commentOpen_number">${response.articles[i].articleComNumber}</p>
        </div>
        <div id="report" title="举报" onclick="report(this)">
            <svg viewBox="0 0 1024 1024"><path d="M960.288 787.488c-98.88-154.08-287.36-469.568-385.76-622.912-21.44-27.968-71.872-44-102.88 0L61.504 803.872c-23.36 33.888-23.008 79.872 49.376 82.432h824.64c48.416-2.784 48.416-62.496 24.768-98.816z m-437.44-27.776a47.296 47.296 0 1 1 0-94.592 47.296 47.296 0 0 1 0 94.592z m35.456-165.536c0.448 11.52-10.944 23.68-23.648 23.68h-23.648c-12.672 0-23.2-12.16-23.616-23.68l-23.68-224.64c0-19.552 15.904-35.456 35.488-35.456h47.296c19.584 0 35.456 15.904 35.456 35.488l-23.648 224.64z" fill="#8a8a8a"></path></svg>
        </div>
    </div>
</div>`);
    firstFlush_hidden(i2)
}

//点赞
function like(e) {
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    $.ajax({
        type: "post",
        url: "/complete/like",
        data: {
            token: window.localStorage.token,
            articleId: $(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId'),
        },
        success: function (response) {
            if (response.isLogin == false) {
                noLogin()
                return
            }

            // 异常的点赞
            $(e).attr('isLike', response.isLike);
            if (response.isCommen == false) {
                $(e).siblings('#unlike').attr('isunLike', response.isunLike);
                if (response.isLike == true) {

                    // 点赞成功
                    $(e).find('path').attr('fill', '#138bfb');
                    $(e).find('p').text(Number($(e).find('p').text()) + 1);
                    $('.centerRightTopPart1_number').html(`${numEasy(Number($('.centerRightTopPart1_number').text()) + 1)}`);

                    $(e).siblings('#unlike').find('path').attr('fill', '#bfbfbf');
                    $(e).siblings('#unlike').find('p').text(Number($(e).find('p').text()) - 1);
                } else {

                    // 取消点赞
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${numEasy(Number($('.centerRightTopPart1_number').text()) - 1)}`);
                }
            } else {

                // 正常的点赞
                if (response.isLike == true) {

                    // 点赞成功
                    $(e).find('path').attr('fill', '#138bfb');
                    $(e).find('p').text(Number($(e).find('p').text()) + 1);
                    $('.centerRightTopPart1_number').html(`${numEasy(Number($('.centerRightTopPart1_number').text()) + 1)}`);
                } else {

                    // 取消点赞
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${numEasy(Number($('.centerRightTopPart1_number').text()) - 1)}`);
                }
            }
        }
    });
}

//踩一下
function unlike(e) {
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    $.ajax({
        type: "post",
        url: "/complete/unlike",
        data: {
            token: window.localStorage.token,
            articleId: $(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId'),
        },
        success: function (response) {
            if (response.isLogin == false) {
                noLogin()
                return
            }

            // 异常的踩一踩
            $(e).attr('isunLike', response.isunLike);
            if (response.isCommen == false) {
                $(e).siblings('#like').attr('isLike', response.isLike);
                if (response.isunLike == true) {

                    // 踩一踩成功
                    $(e).find('path').attr('fill', '#707070');
                    $(e).find('p').text(Number($(e).find('p').text()) + 1);
                    $(e).siblings('#like').find('path').attr('fill', '#bfbfbf');
                    $(e).siblings('#like').find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${numEasy(Number($('.centerRightTopPart1_number').text()) - 1)}`);
                } else {

                    // 取消踩一踩
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                }
            } else {

                // 正常的踩一踩
                if (response.isunLike == true) {

                    // 踩一踩成功
                    $(e).find('path').attr('fill', '#707070');
                    $(e).find('p').text(Number($(e).find('p').text()) + 1);
                } else {

                    // 取消踩一踩
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                }
            }
        }
    });
}

// 收藏内容按钮
function collect(e) {
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    $.ajax({
        type: "post",
        url: "/complete/collect",
        data: {
            token: window.localStorage.token,
            articleId: $(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId'),
        },
        success: function (response) {
            if (response.isLogin == false) {
                noLogin()
                return
            }
            $(e).attr('iscollect', `${response.isCollect}`);
            if (response.isCollect == true) {
                $(e).find('path').attr('fill', '#138bfb')
                $('.centerRightTopPart2_number').html(`${numEasy(Number($('.centerRightTopPart2_number').text()) + 1)}`);
            } else {
                $(e).find('path').attr('fill', '#bfbfbf')
                $('.centerRightTopPart2_number').html(`${numEasy(Number($('.centerRightTopPart2_number').text()) - 1)}`);
            }
        }
    });
}

//分享按钮
function share(e) {
    $(e).append(`<input readonly="readonly" style="text-indent: 0;background: transparent;border: 0 none;resize:none;outline:none;-webkit-appearance:none;line-height: normal;position: fixed;width: 1px;top: 0;height: 1px;">`);
    let temp = $(e).find('input')[0];
    temp.value = `${web_url}article?articleId=${$(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId')}`
    temp.select();
    document.execCommand("Copy");
    $(e).find('input').remove();
    $(e).find('path').attr('fill', '#ff4d4d');
    $(e).append('<div style="position: fixed;z-index: 10000000000; top: 53px; right: 0; width: auto; background-color: rgb(255 77 77); font-size: 12px; text-align: center; line-height: 30px; height: 30px; font-weight: bold; color: #feeded; border-radius: 5px;">已复制文章链接<div>');
    setTimeout(() => {
        $(e).find('div').remove();
    }, 4000);
}

//举报按钮
function report(e) {
    window.event.stopPropagation()
    if (window.localStorage.isLogin == 'true') {
        //已登录
        let temp_html = `
        <div class="mask"></div>
        <div class="report_part">
        <div class="report_part_article">
            <div class="report_part_article_part">
                <div id="article" articleId="${$(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId')}">文章标题：</div>
                <div id="articleName">${$(e).parents('.contentSmallPart').find('.contentSmallPartTitle').text()}</div>
            </div>
        </div>
        <div class="report_part_reason">
            <div class="report_part_reason_part">
                <span id="reason">举报原因：</span>
                <div id="reasonPart" onpaste="pasteRemoveCss(this)" contenteditable="true"></div>
            </div>
        </div>
        <div class="report_part_submit">
            <button style="cursor:pointer;" id="report_submit">确认发送</button>
        </div>
    </div>
        `
        jump_window({}, temp_html, function () {
            $('.mask').click(function (e) {
                $('body').unbind();
                $('#jump_window').html('');
            });
        })

        $('#report_submit').click(function () {
            $.ajax({
                type: "post",
                url: "/complete/report",
                data: {
                    token: window.localStorage.token,
                    articleId: $(this).parents('.report_part').find('#article').attr('articleid'),
                    articleName: $(this).parents('.report_part').find('#articleName').text(),
                    reason: $(this).parents('.report_part').find('#reasonPart').text()
                },
                success: function (response) {
                    if (response.isLogin == false) {
                        noLogin()
                        return
                    }
                    if (response.isReport == true) {
                        $('body').unbind();
                        $('#jump_window').html('');

                        $(e).find('path').attr('fill', '#f44336');
                        $(e).append('<div style="position: fixed;z-index: 10000000000; top: 53px; right: 0; width: auto; background-color: rgb(255 77 77); font-size: 12px; text-align: center; line-height: 30px; height: 30px; font-weight: bold; color: #feeded; border-radius: 5px;">已举报成功<div>');
                        setTimeout(() => {
                            $(e).find('div').remove();
                        }, 4000);
                    }
                }
            });
        });
    } else {
        //未登录
        noLogin()
    }
}

//解决黏贴样式叠加问题
function pasteRemoveCss(e) {
    event.preventDefault();
    let clipboardData = event.clipboardData || window.clipboardData, // IE 兼容
        plainText = clipboardData.getData('text'); // 无格式文本

    document.execCommand('insertText', false, plainText); // 插入无格式文本
    document.execCommand('paste', false, plainText); // IE 兼容

    let temp_html = $(e).html()
    temp_html = temp_html.replace(/<div>/gi, '<br>')
    temp_html = temp_html.replace(/<\/div>/gi, '')
    temp_html = temp_html.replace(/\n/gi, '')
    temp_html = temp_html.replace(/\r/gi, '')
    $(e).html(temp_html)
}

//评论收到按钮
async function remark(e) {
    if ($(e).attr('isopen') == 'false') {
        //打开评论区

        // 进行基础样式设置
        $(e).addClass('comment_click');
        $(e).attr('isopen', 'true')
        $(e).find('path').attr('fill', '#138bfb')
        $(e).parent().after(`<div class="commentSection"><div class="commentSectionArea">
        <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
        </div></div>
        `)

        // 接着进行ajax事件
        let data = null
        await $.ajax({
            type: "post",
            url: "/complete/commentGet",
            data: {
                articleId: $(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId'),
                token: window.localStorage.token
            },
            success: function (response) {
                data = response
                return
            }
        });

        setTimeout(() => {
            $(e).parents('.contentSmallPart').find('.commentSectionArea').html(`
            <div class="othersComment">
                <div>
                    <span class="othersComment_number">0</span>
                     条评论
                </div>
                <div class="Comments">
                    <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
                </div>
            </div>
            <div class="CommentInputArea">
                <div>
                    <span>
                        <span onpaste="pasteRemoveCss(this)" contenteditable="true" id="commentContent"></span>
                    </span>
                </div>
                <div>
                    <div class="commentSubmit_father">
                        <span class="commentSubmit" onclick="commmentSubmit(this)">发&nbsp布</span>
                    </div>
                </div>
            </div>`)

            // 设置按钮的样式
            let temp_height = $(e).parents('.contentSmallPart').find('.CommentInputArea').height()
            $(e).parents('.contentSmallPart').find('.commentSubmit_father').css('height', `${temp_height}px`);
            $(e).parents('.contentSmallPart').find('.commentSubmit').css('line-height', `${temp_height}px`);

            $(e).parents('.contentSmallPart').find('#commentContent').keydown(function (e) {
                if (e.keyCode === 13) {
                    document.execCommand('insertHTML', false, '<br></br>')
                    return false
                }
            });

            // 仅当 删除标志 为true 时 才进行已删除提示
            if (data.comment_isdelete === true) {
                $(e).parents('.contentSmallPart').find('.othersComment').append(`
                <span style="
                position: absolute;
                top: 0;
                right: 0;
                color: #9f1d1d;
                font-style: italic;
                font-weight: bold;
                ">部分评论已删除</span>
                `);
            }

            if (data.comment.length == 0) {
                //评论数为0
                $(e).parents('.contentSmallPart').find('.Comments').prepend(`<div class="commentWhite">空空如也，快来评论吧！</div>`);
            } else {
                //二次评论计数器
                let num1 = 0

                for (let i = 0; i < data.comment.length; i++) {
                    $(e).parents('.contentSmallPart').find('.Comments').append(`
                    <div class="Comments_small">
                        <img
                        onerror=\'picError(this)\'
                        onclick="head_to_detail(this)"
                        src="${pic_src_solve(zip_dir + data.comment[i].headimg)}"
                        id="${data.comment[i].comUserId}"
                        class="Comments_small_head">
                        <span class="Comments_small_name">${xssFilter(data.comment[i].comUser)}：</span>
                        <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(data.comment[i].content)}</div>
                        <div commentId="${data.comment[i].id}" class="firstComment">
                            <span class="Comments_small_comment" style="cursor:pointer;" onclick="secondComment(this)">回复</span>
                            <span class="Comments_small_time">${timeSet(data.comment[i].time)}</span>
                        </div>
                    </div>
                    `);
                    //如果存在二次评论
                    if (data.comment[i].secComments !== undefined) {
                        num1 += data.comment[i].secComments_number
                        for (let j = 0; j < data.comment[i].secComments.length; j++) {
                            $(e).parents('.contentSmallPart').find('.Comments_small:nth(' + i + ')').append(`
                            <div class="Comments_small_second">
                            <img
                            onerror=\'picError(this)\'
                            onclick="head_to_detail(this)"
                            src="${pic_src_solve(zip_dir + data.comment[i].secComments[j].comUserHead)}"
                            id="${data.comment[i].secComments[j].comUserId}"
                            class="Comments_small_head">
                            <span class="Comments_small_name">${xssFilter(data.comment[i].secComments[j].comUserName)}：</span>
                            <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(data.comment[i].secComments[j].content)}</div>
                            <div commentid="${data.comment[i].secComments[j].id}" class="firstComment">
                            <span class="Comments_small_time">${timeSet(data.comment[i].secComments[j].time)}</span>
                            </div>
                            </div>
                            `)
                        }
                        $(e).parents('.contentSmallPart').find(`.Comments_small_comment:nth(${i})`).html(`回复(${data.comment[i].secComments_number})`);
                    }
                }

                // 实时获取的总评论数量
                let commen_length = data.comment.length + num1

                // 实时生成实际评论数量结构
                $(e).parents('.contentSmallPart').find('.othersComment_number').html(`${commen_length}`);
                $(e).parents('.contentSmallPart').find('.commentOpen_number').html(`${data.comment_all_length}`);

            }

            // 去除缓存特效
            $(e).parents('.contentSmallPart').find('.commentSection_wait').remove();

        }, 200);

    } else {
        //关闭评论区

        // 恢复非评论区工作模式
        $(e).attr('isopen', 'false')
        $(e).find('path').attr('fill', '#bfbfbf')
        $(e).parents('.contentSmallPart').find('.commentSection').remove();
        $(e).removeClass('comment_click');

    }
}

// 评论上传功能
function commmentSubmit(e) {

    if (window.localStorage.isLogin == 'false') {
        noLogin()
        return
    }

    if ($(e).parents('.CommentInputArea').find('#commentContent').text().replace(/\s*/g, "").length == 0) {
        alert('请输入评论')
        return
    }

    // 待提交评论信息
    let subcontent = $(e).parents('.commentSectionArea').find('#commentContent').html().replace(/<br>/gi, '\n')

    // 防止出现用户因为快速点击而引起多次评论的情景
    $(e).parents('.commentSectionArea').find('#commentContent').html('');

    $.ajax({
        type: "post",
        url: "/complete/commentSub",
        data: {
            token: window.localStorage.token,
            articleId: $(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId'),
            content: subcontent
        },
        success: function (response) {

            if (response.isLogin == false) {
                noLogin()
                return
            }

            // 确认了登录身份合法
            if (response.isComment == true) {
                if ($(e).parents('.commentSectionArea').find('.commentWhite')[0]) {
                    $(e).parents('.commentSectionArea').find('.commentWhite').remove();
                }
                $(e).parents('.commentSectionArea').find('.Comments').append(`
                <div class="Comments_small">
                    <img
                    onerror=\'picError(this)\'
                    src="${pic_src_solve($('.person_head_pic').attr('src'))}"
                    class="Comments_small_head">
                    <span class="Comments_small_name">${xssFilter($('.person_head_pic').attr('userName'))}：</span>
                    <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(subcontent)}</div>
                    <div commentId="${response.commentId}" class="firstComment">
                        <span class="Comments_small_comment" style="cursor:pointer;" onclick="secondComment(this)">回复</span>
                        <span class="Comments_small_time">${timeSet(response.time)}</span>
                    </div>
                </div>
                `);

                $(e).parents('.commentSectionArea')
                    .find('.othersComment_number')
                    .html(`${Number($(e).parents('.commentSectionArea').find('.othersComment_number').text())+1}`)

                $(e).parents('.contentSmallPart')
                    .find('.commentOpen_number')
                    .html(`${Number($(e).parents('.contentSmallPart').find('.commentOpen_number').text())+1}`)

                // 识别为首页
                if (window.page_type == 'index' && (!is_small_client)) {
                    $('.centerRightTopPart3_number').html(`${numEasy(Number($('.centerRightTopPart3_number').text()) + 1)}`);
                }

                // 进行提示评论成功
                $(e).append('<div style="position: fixed;z-index: 10000000000; top: 53px; right: 0; width: auto; background-color: rgb(255 77 77); font-size: 12px; text-align: center; line-height: 30px; height: 30px; font-weight: bold; color: #feeded; border-radius: 5px;">评论成功<div>');
                setTimeout(() => {
                    $(e).find('div').remove();
                }, 4000);

            }
        }
    });

}

//去个人主页
function toPerson(e) {
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    window.open(`/person?userId=${$('.person_head_pic').attr('id')}&&way=${$(e).attr('id')}`)
}

//person页面详情点击按钮
function getDetail(e) {
    window.open(`${web_url}article?articleId=${$(e).parents('.article_smallCard').attr('articleid')}`)
}

//草稿箱的删除功能
function draftBoxDelete(e) {
    if ($(e).attr('isopen') == 'true') {
        //进行关闭
        $(e).css('color', '');
        $(e).find('.actionPart').remove();
        $(e).attr('isopen', 'false')
    } else {
        //进行打开
        $(e).append(`
        <div class="actionPart">
            <div class="articleDelete" onclick="draftBox_delete(this)">删除</div>
        </div>
        `);
        $(e).attr('isopen', 'true')
        $(e).css('color', '#59bdfa');
    }
    window.event.stopPropagation()
}

function draftBox_delete(e) {
    if (window.confirm(`永久删除文章《${$(e).parents('.article_smallCard').find('.innercontent_title').text()}》？`)) {
        $.ajax({
            type: "post",
            url: "/article/draftBoxDelete",
            data: {
                token: window.localStorage.token,
                articleId: $(e).parents('.article_smallCard').attr('articleid')
            },
            success: function (response) {
                if (response.isLogin == false) {
                    window.location.href = web_url
                    return
                }
                if (response.isDelete == true) {
                    $(e).parents('.article_smallCard').remove();
                }
            }
        });
    } else {
        $(e).parents('.article_smallCard').find('.innercontent_action').attr('isopen', 'false')
        $(e).parents('.article_smallCard').find('.actionPart').remove();
    }
    window.event.stopPropagation()
}

//文章 编辑/删除 功能
function articleaction(e) {
    if ($(e).attr('isopen') == 'true') {
        //进行关闭
        $(e).css('color', '');
        $(e).find('.actionPart').remove();
        $(e).attr('isopen', 'false')
    } else {
        //进行打开
        $(e).append(`
        <div class="actionPart">
            <div class="articleChange"><a target="_blank" href="/writer?articleChange&&articleId=${$(e).parents('.article_smallCard').attr('articleid')}">编辑</a></div>
            <div class="articleDelete" onclick="articleaction_delete(this)">删除</div>
        </div>
        `);
        $(e).attr('isopen', 'true')
        $(e).css('color', '#59bdfa');
    }
    window.event.stopPropagation()
}

function articleaction_delete(e) {
    if (window.confirm(`确认删除文章《${$(e).parents('.article_smallCard').find('.innercontent_title').text()}》？`)) {
        $.ajax({
            type: "post",
            url: "/article/articleDelete",
            data: {
                token: window.localStorage.token,
                articleId: $(e).parents('.article_smallCard').attr('articleid')
            },
            success: function (response) {
                if (response.isLogin == false) {
                    window.location.href = web_url
                    return
                }
                if (response.isDelete == true) {
                    $(e).parents('.article_smallCard').remove();
                }
            }
        });
    } else {
        $(e).parents('.article_smallCard').find('.innercontent_action').attr('isopen', 'false')
        $(e).parents('.article_smallCard').find('.actionPart').remove();
    }
    window.event.stopPropagation()
}

//评论 编辑/删除 功能
function commentaction(e) {
    if ($(e).attr('isopen') == 'true') {
        //进行关闭
        $(e).css('color', '');
        $(e).find('.actionPart').remove();
        $(e).attr('isopen', 'false')
    } else {
        //进行打开
        $(e).append(`
        <div class="actionPart">
            <div class="articleDelete" onclick="commentaction_delete(this)">删除</div>
        </div>
        `);
        $(e).attr('isopen', 'true')
        $(e).css('color', '#59bdfa');
    }
    window.event.stopPropagation()
}

function commentaction_delete(e) {
    if (window.confirm(`确认删除评论《${$(e).parents('.article_smallCard').find('.innercontent_title').text()}》\n--"${$(e).parents('.article_smallCard').find('.innercontent_content').text()}"?`)) {
        $.ajax({
            type: "post",
            url: "/article/commentDelete",
            data: {
                isSec: $(e).parents('.article_smallCard').attr('issec'),
                token: window.localStorage.token,
                commentid: $(e).parents('.article_smallCard').attr('commentid'),
                fatherid: $(e).parents('.article_smallCard').attr('fatherid'),
                articleid: $(e).parents('.article_smallCard').attr('articleid')
            },
            success: function (response) {
                if (response.isLogin == false) {
                    window.location.href = web_url
                    return
                }
                if (response.isDelete == true) {
                    $(e).parents('.article_smallCard').remove();
                }
            }
        });
    } else {
        $(e).parents('.article_smallCard').find('.innercontent_action').attr('isopen', 'false')
        $(e).parents('.article_smallCard').find('.actionPart').remove();
    }
    window.event.stopPropagation()
}

//时间处理
function timeSet(dataServe) {
    let a = dataServe //time1 serveTime
    let datenow = new Date() //time2 localTime
    if (Math.abs(a.split(' ')[0].split('-')[0] - datenow.getFullYear()) == 0) {
        if (Math.abs(a.split(' ')[0].split('-')[1] - (datenow.getMonth() + 1)) == 0) {
            switch (Math.abs(a.split(' ')[0].split('-')[2] - datenow.getDate())) {
                case 0:
                    return `今天 ${a.split(' ')[1].split(':')[0]}:${a.split(' ')[1].split(':')[1]}`
                    break;
                case 1:
                    return `昨天 ${a.split(' ')[1].split(':')[0]}:${a.split(' ')[1].split(':')[1]}`
                    break;
                case 2:
                    return `前天 ${a.split(' ')[1].split(':')[0]}:${a.split(' ')[1].split(':')[1]}`
                    break;
                default:
                    return a
            }
        } else {
            return a
        }
    } else {
        return a
    }
}

//进入二级评论状态
function secondComment(e) {

    $(e).parents('.contentSmallPart').find('.Comments_small_comment').attr('is_chosen', 'false')

    $(e).attr('is_chosen', 'true');

    $(e).parents('.Comments').find('.Comments_small_comment').css('color', '')

    $(e).css('color', '#138bfb');

    $(e).parents('.commentSectionArea').find('#commentContent')
        .attr('oninput', 'commentInput(this)')
        .html('')
        .attr('commentid', $(e).parent().attr('commentId'))
        .attr('flagnum', $(e).parent().siblings('.Comments_small_name').text().trim().length + 1)
        .html(`@${$(e).parent().siblings('.Comments_small_name').text().trim()}`);

    $(e).parents('.commentSectionArea').find('.commentSubmit').attr('onclick', 'secCommmentSubmit(this)');

    $(e).parents('.commentSectionArea').find('.commentSecondHead').attr({
        'flag': $(e).parents('.commentSectionArea').find('#commentContent').text().replace(/\s*/g, ""),
        'flagnum': $(e).parents('.commentSectionArea').find('#commentContent').text().replace(/\s*/g, "").length
    });
}

//二级评论上传
function secCommmentSubmit(e) {
    let a = $(e).parents('.commentSectionArea').find('#commentContent').attr('flagnum')
    a = Number(a)
    let subContent = $(e).parents('.commentSectionArea').find('#commentContent').html().trim().replace(/<br>/gi, '\n').substr(a)
    $.ajax({
        type: "post",
        url: "/complete/secCommentSub",
        data: {
            token: window.localStorage.token,
            articleId: $(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleid'),
            floorCommentId: $(e).parents('.CommentInputArea').find('#commentContent').attr('commentid'),
            content: subContent
        },
        success: function (response) {
            if (response.isLogin == false) {
                noLogin()
                return
            }
            if (response.isSuccess == true) {
                $(e).parents('.commentSectionArea').find('.Comments_small_comment[is_chosen="true"]').parents('.Comments_small').append(`
                <div class="Comments_small_second">
                        <img
                        onerror=\'picError(this)\'
                        src="${pic_src_solve(zip_dir + response.comUserHead)}"
                        class="Comments_small_head">
                        <span class="Comments_small_name">${xssFilter(response.comUserName)}：</span>
                        <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(subContent)}</div>
                        <div commentid="${response.id}" class="firstComment">
                        <span class="Comments_small_time">${timeSet(response.time)}</span>
                        </div>
                        </div>
                        `)
                $(e).parents('.commentSectionArea').find('.othersComment_number').html(`${Number($(e).parents('.commentSectionArea').find('.othersComment_number').text())+1}`)
                $('.centerRightTopPart3_number').html(`${numEasy(Number($('.centerRightTopPart3_number').text()) + 1)}`);
            }
            $(e).parents('.commentSectionArea').find('#commentContent').html('')
            $(e).attr('onclick', 'commmentSubmit(this)');
        }
    });
}

//点击进入小头像进入用户主页模块
function toUserMainPage(e) {
    if (window.localStorage.isLogin == 'false') {
        noLogin()
        return
    }
    $(e).append(`
    <div class="contentSmallPartHead_part">
        <span>
            <a target='blank' href="/person?userId=${$(e).attr('id')}">个 人 主 页</a>
        </span>
    </div>
    <div class="mask02"></div>
    `);

    $('.mask02').click(function () {
        $(e).find('.contentSmallPartHead_part').remove()
        $(e).find('.mask02').remove()
        window.event.stopPropagation()
    });
}

//恢复被删除的文章
function backRemove(e) {
    if (window.confirm(`确认恢复文章《${$(e).parents('.article_smallCard').find('.innercontent_title').text()}》？`)) {
        $.ajax({
            type: "post",
            url: "/article/articleBack",
            data: {
                token: window.localStorage.token,
                articleId: $(e).parents('.article_smallCard').attr('articleid')
            },
            success: function (response) {
                if (response.isLogin == false) {
                    window.location.href = web_url
                    return
                }
                if (response.isBack == true) {
                    $(e).parents('.article_smallCard').remove();
                }
            }
        });
    }
}

//搜索过程对搜索结果的高亮
function searchHlt(goal, target) {
    let a = xssFilter(goal)
    a = a.replace(/>/g, "&gt;")

    let t = xssFilter(target)
    t = t.replace(/>/g, "&gt;")

    let reg = new RegExp(`${t}`, 'gi')
    a = xssFilter(a).replace(reg, search => {
        return `<span style="color:red">${search}</span>`
    })
    return a
}

//搜索结果点击头像进行跳转
function head_to_detail(e) {
    if (window.localStorage.isLogin == 'false') {
        //非登陆状态
        noLogin()
        return
    }
    window.open(`/person?userId=${e.id}`)
}

// 点击历史记录进行搜索
function search_history(e) {
    $('#search_base_value').val($(e).text().trim());
    //为手机端而写
    if ($(e).text().trim().length == 0) {
        alert('请输入有效信息')
        return
    }

    $(window).scrollTop('0px');
    $(window).unbind('keydown');

    $('.centerLeftBottom').html('');
    $('.centerLeftBottom').prepend(`<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>`);

    $.ajax({
        type: "post",
        url: "/mainApp/search",
        data: {
            token: window.localStorage.token,
            name: $(e).text().trim()
        },
        success: function (response) {
            $('.navigation').remove();
            $('.addArticle').remove();
            $('.centerLeftBottom>.commentSection_wait').remove();
            $('.centerLeftBottom').append(`
            <div class="centerLeftBottom_show contentSmallPart" >
                <div class="navigation">
                    <span class="navigation_search">搜索结果：
                        <span class='navigation_search_number navigation_search_user_button'>用户(${response.user_search.length>90?'99+':response.user_search.length})</span>
                        <span class='navigation_search_number navigation_search_article_button'>文章(${response.article_search.length>90?'99+':response.article_search.length})</span>
                    </span>
                </div>
            </div>`);

            $('.navigation_search_user_button').click(function (e) {
                $('.centerLeftBottom_article_line').hide();
                $('.article_small_color').hide();

                $('.centerLeftBottom_user_line').show();
                $('.user_small').show();

                window.event.stopPropagation()
            });

            $('.navigation_search_article_button').click(function (e) {
                $('.centerLeftBottom_user_line').hide();
                $('.user_small').hide();

                $('.centerLeftBottom_article_line').show();
                $('.article_small_color').show();

                window.event.stopPropagation()
            });

            $('.navigation_search').click(function () {
                $('.centerLeftBottom_user_line').show();
                $('.user_small').show();

                $('.centerLeftBottom_article_line').show();
                $('.article_small_color').show();

                window.event.stopPropagation()

            });

            //用户
            if (response.user_search.length !== 0) {
                $('.navigation').after(`
                <div class="contentSmallPart centerLeftBottom_user_line">用户</div>
                `);
                for (let i = 0; i < response.user_search.length; i++) {
                    $('.centerLeftBottom_user_line').after(`
                    <div class="contentSmallPart user_small">
                    <div>
                        <div class="user_small_main">
                            <span>
                                <a id ='${response.user_search[i].id}' onclick="head_to_detail(this)">
                                    <img
                                    onerror=\'picError(this)\'
                                    src="${pic_src_solve(zip_dir + response.user_search[i].headImg)}"
                                    class="user_small_main_img">
                                </a>
                            </span>
                            <span class="user_small_main_name">${searchHlt(response.user_search[i].userName,$('#search_base_value').val())}</span>
                            <span class="user_small_main_word">${response.user_search[i].word}</span>
                            <span class="user_small_main_commentNum">评论(${response.user_search[i].commentsNum>99?'99+':response.user_search[i].commentsNum})</span>
                            <span class="user_small_main_articleNum">文章(${response.user_search[i].articleNum>99?'99+':response.user_search[i].articleNum})</span>
                        </div>
                    </div>
                </div>
                    `);
                }
            }

            //文章
            if (response.article_search.length !== 0) {
                $('.centerLeftBottom_show').append(`
                <div class="centerLeftBottom_article_line contentSmallPart">文章</div>
                `);

                function a(data) {
                    if (response.article_search[data].writerHead == 'NaN.png') {
                        let b = 'NaN.png'
                        return b
                    } else {
                        return response.article_search[data].writerHead
                    }
                }
                for (let i = 0; i < response.article_search.length; i++) {
                    $('.centerLeftBottom_show').append(`
                    <div class="contentSmallPart article_small_color">
                        <div style="display:block;" class="contentSmallPartTop">
                            <div>
                                <span id="6097c9f92347ed2f9cdd4d18">
                                    <a target="_blank" class="contentSmallPartTopSmall contentSmallPartHead" ${response.article_search[i].writerName == "匿名" ?'':'href=/person?userId='+response.article_search[i].writerId+''}>
                                       ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\' src='"+ pic_src_solve(zip_dir + a(i)) +"'>"}
                                    </a>
                                </span>
                                <span class="contentSmallPartTopSmall contentSmallPartID">${xssFilter(response.article_search[i].writerName)}</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDsign">${response.article_search[i].writerWord}</span>
                                <span class="contentSmallPartTopSmall contentSmallPartIDtime">${timeSet(response.article_search[i].articleTime)}</span>
                                <div class="contentposition">
                                    <span>
                                        ${response.article_search[i].articleBigM=='树洞'?'树洞':response.article_search[i].articleBigM}
                                    </span>
                                    ${response.article_search[i].articleBigM=='树洞'?'':'/'}
                                    <span>
                                        ${response.article_search[i].articleBigM=='树洞'?'':response.article_search[i].articleSmM}
                                    </span>
                                </div>
                            </div>
                            <div class="contentSmallPartTitle">
                                ${searchHlt(response.article_search[i].articleName,$('#search_base_value').val())}
                            </div>
                        </div>
                        <a target="_blank" href="${web_url}article?articleId=${response.article_search[i].articleId}">
                            <div style="display: block;" class="content">
                                <div class="article_small">
                                    ${response.article_search[i].articleContent}
                                </div>
                                <div>
                                    <a class="contentExploreMask_article_contentExploreButton">阅读全文</a>
                                </div>
                            </div>
                        </a>
                    </div>
                    `);

                    searchCommen(i)

                    $('.article_small_color:nth(' + i + ')').find('.article_small').show();

                }
            }

            if (response.article_search.length == 0 && response.user_search.length == 0) {
                $('.centerLeftBottom_show').html(`
                <div class="search_empty">对不起，俺找遍了整片森林也没找到ta呐 /(ㄒoㄒ)/~~~~</div>
                `);
            }

            let data = JSON.parse(window.localStorage.search)
            data.push({
                name: $(e).text().trim()
            })
            window.localStorage.search = JSON.stringify(data)


            $('#jump_window').html('');
            $('.searchPartInput>span').attr('style', '')
            $("#searchPartInput_search>svg>path").attr('fill', '#bfbfbf');
            $('body').unbind();

        }
    });

}

// 通知点击事件
function noticeClick(e) {

    e.stopPropagation()

    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }

    let temp_html = `
        <span class="notice_part_span" style="visibility: hidden;"></span>
        <div class="notice_part" style="visibility: hidden;">
            <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
        </div>`
    let temp_css = {
        'position': 'fixed',
        'top': `${$('.top').height()}px`,
        'right': '0',
        'z-index': '1'
    }

    // 小屏幕设备
    if (is_small_client) {
        temp_html = `
        <div style="z-index: 2;" class='mask' style="visibility: hidden;"></div>
        <div class="notice_part" style="visibility: hidden;">
            <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
        </div>
        `
        temp_css = {}
    }

    jump_window(temp_css, temp_html, () => {

        if (!is_small_client) {
            // 大屏幕设备
            let temp_left = $('.notice')[0].getBoundingClientRect().right - $('.notice').width() / 2 - 10
            $('.notice_part_span').css({
                'position': 'fixed',
                'left': `${temp_left}px`
            });
            $('#jump_window').css('left', `${temp_left-$('#jump_window').width()+20}px`);
            $('.notice_part').css('border-top-right-radius', '0');

            $('.notice_part_span').css('visibility', 'visible');
            $('.notice_part').css('visibility', 'visible');

        } else {
            // 小屏幕设备
            $('.notice_part').css('top', `${$('.top').height()}px`);
            $('.mask').click(function (e) {
                $('#jump_window').html('');
            });

            $('.mask').css('visibility', 'visible');
            $('.notice_part').css('visibility', 'visible');

        }

        $('.notice_part').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $('.head').css('z-index', 0);

    })

    $.ajax({
        type: "post",
        url: "/mainApp/webNotice",
        data: {
            token: window.localStorage.token,
            type: 'webNoticeDetail'
        },
        success: function (response) {
            if (response.isLogin == false) {
                window.location.href = web_url
                return
            }
            $('#notice_number').html(response.length);
            $('.notice_part').append(`
            <div class="notice_part_small notice_part_top">
              <span>通知(${response.length})</span>
              <span>
                <div onclick="notSingleCheck(this)">全部已读</div>
              </span>
            </div>
            </div>
            <div class="notice_part_small notice_part_bottom"></div>
            `);
            if (!is_small_client) {
                $('.notice_part_top').css('border-top-right-radius', '0');
            }
            for (let i = 0; i < response.length; i++) {
                $('.notice_part_bottom').append(`
                <div class="pcTouch02 notice_part_bottom_small">
                    <div class="notice_part_bottom_part_time">${timeSet(response[i].sendTime)}</div>
                    <div class="notice_part_bottom_part_content" onclick="readNoticeDetail(this)">${response[i].content}</div>
                    <div class="notice_part_bottom_part_check" onclick='singleCheck(this)'>已读</div>
                </div>
                `);
                $('.notice_part_bottom_part_content:nth(' + i + ')').data({
                    '_id': response[i]._id,
                    'type': response[i].type,
                });
            }
            $('.commentSection_wait').remove();
        }
    });

}

// 通知单独确认已读按钮
function singleCheck(e) {
    $.ajax({
        type: "post",
        url: "/mainApp/webNoticeCheck",
        data: {
            token: window.localStorage.token,
            checkType: 'single',
            noticeId: $(e).parents('.notice_part_bottom_small').find('.notice_part_bottom_part_content').data('_id'),
            noticeType: $(e).parents('.notice_part_bottom_small').find('.notice_part_bottom_part_content').data('type'),
        },
        success: function (response) {
            if (response.isLogin == false) {
                window.location.href = web_url
                return
            }
            if (response.isCheck == true) {
                $(e).parents('.notice_part_bottom_small').animate({
                    right: $(".notice_part_bottom_small").width(),
                }, 1000, function () {
                    $(e).parents('.notice_part_bottom_small').remove();
                    $('.notice_part_top>span:nth-child(1)').html(`通知(${$('.notice_part_top>span:nth-child(1)').html().split('通知(')[1].split(')')[0]-1})`);
                    $('#notice_number').html(`${($('#notice_number').html() - 1)==0?'':($('#notice_number').html() - 1)}`);
                    $('.noticeDetail').remove();
                    $('.mask').remove();
                });
            }
        }
    });
}

// 全部已读按钮(通知)
async function notSingleCheck(e) {
    let infos = []
    for (let i = 0; i < $('.notice_part_bottom_part_content').length; i++) {
        infos.push({
            noticeId: $('.notice_part_bottom_part_content:nth(' + i + ')').data('_id'),
            noticeType: $('.notice_part_bottom_part_content:nth(' + i + ')').data('type'),
        })
    }

    await $.ajax({
        type: "post",
        url: "/mainApp/webNoticeCheck",
        data: {
            token: window.localStorage.token,
            checkType: 'notSingle',
            Data: JSON.stringify(infos)
        },
        success: function (response) {
            if (response.isLogin == false) {
                window.location.href = web_url
                return
            }
            if (response.isCheck == true) {
                $('#jump_window').html('').attr('style', '');
            }
        }
    });
}

// 全部已读按钮(信箱)
async function notSingleCheck_email() {
    let infos = []
    for (let i = 0; i < $('.message_part_bottom_small[type=comment]').length; i++) {
        infos.push({
            id: $('span[type=info_comment_id]:nth(' + i + ')').attr('id')
        })
    }
    await $.ajax({
        type: "post",
        url: "/mainApp/webEmailCheck",
        data: {
            token: window.localStorage.token,
            checkType: 'notSingle',
            Data: JSON.stringify(infos)
        },
        success: function (response) {
            if (response.isLogin == false) {
                window.location.href = web_url
                return
            }
            if (response.isCheck == true) {
                $('#jump_window').html('');
                if (!is_small_client) {
                    $('#message_number').html('');
                }
            }
        }
    });
}

// 信箱内部事件
function messageCreate(data) {
    let a
    switch (data.type) {
        case 'like':
            a = `<span style="font-size: 16px;font-weight: bold;color: #464140;">${xssFilter(data.name)}</span>
            <span style='font-weight: bold;font-size: 17px;'>点赞</span>了您的文章
            <span style='font-weight: bold;font-size: 17px;'>《${xssFilter(data.articleName)}》</span>`
            break;
        case 'unlike':
            a = `<span style="font-size: 16px;font-weight: bold;color: #464140;">${xssFilter(data.name)}</span>
            <span style='font-weight: bold;font-size: 17px;'>踩了踩</span>了您的文章
            <span style='font-weight: bold;font-size: 17px;'>《${xssFilter(data.articleName)}》</span>`
            break;
        case 'collect':
            a = `<span style="font-size: 16px;font-weight: bold;color: #464140;">${xssFilter(data.name)}</span>
            <span style='font-weight: bold;font-size: 17px;'>收藏</span>了您的文章
            <span style='font-weight: bold;font-size: 17px;'>《${xssFilter(data.articleName)}》</span>`
            break;
        case 'comment':
            a = `<span id='${data.id}' type='info_comment_id' style="font-size: 16px;font-weight: bold;color: #464140;">${xssFilter(data.anotherName)}</span>
                <span style='font-weight: bold;font-size: 17px;'>评论</span>了您，于
                <span style='font-weight: bold;font-size: 17px;'>“${xssFilter(data.articleName)}”</span>`
            break;
        default:
            break;
    }
    return a
}

// 信箱点击事件
function messageClick(e) {

    e.stopPropagation()

    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }

    let temp_html = `
    <span class="message_part_span" style="visibility: hidden;"></span>
    <div class="message_part" style="visibility: hidden;">
        <section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>
    </div>`

    let temp_css = {
        'position': 'fixed',
        'top': `${$('.top').height()}px`,
        'z-index': '1'
    }

    // 适配小屏幕
    if (is_small_client) {
        temp_html = `
        <div style="z-index: 2;" class='mask' style="visibility: hidden;"></div>
        <div class="message_part" style="visibility: hidden;">
            <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
        </div>
        `
        temp_css = {}
    }

    jump_window(temp_css, temp_html, () => {

        if (!is_small_client) {
            // 大屏幕设备

            let temp_left = $('.message')[0].getBoundingClientRect().right - $('.message').width() / 2 - 10
            $('.message_part_span').css({
                'position': 'fixed',
                'left': `${temp_left}px`
            });
            $('#jump_window').css('left', `${temp_left-$('#jump_window').width()+20}px`);
            $('.message_part').css('border-top-right-radius', '0');

            $('.message_part_span').css('visibility', 'visible');
            $('.message_part').css('visibility', 'visible');

        } else {
            // 小屏幕设备

            $('.message_part').css('top', `${$('.top').height()}px`);
            $('.mask').click(function (e) {
                $('#jump_window').html('');
            });

            $('.mask').css('visibility', 'visible');
            $('.message_part').css('visibility', 'visible');

        }

        $('.message_part').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $('.head').css('z-index', 0);

    })

    $.ajax({
        type: "post",
        url: "/mainApp/webEmail",
        data: {
            token: window.localStorage.token,
            type: 'webEmailDetail'
        },
        success: function (response) {


            if (response.isLogin == false) {
                window.location.href = web_url
                return
            }

            if (response.length == 0) {
                $('#message_number').html(``);
            } else {
                $('#message_number').html(`${numEasy(response.length)}`);
            }

            $('.message_part').append(`
            <div class="message_part_small message_part_top">
              <span>信息(${response.length})</span>
              <span>
                <div onclick="notSingleCheck_email(this)">全部已读</div>
              </span>
            </div>
            </div>
            <div class="message_part_small message_part_bottom"></div>
            `);

            if (!is_small_client) {
                // 大屏幕设备
                $('.message_part_top').css('border-top-right-radius', '0');
            }

            for (let i = 0; i < response.length; i++) {
                $('.message_part_bottom').prepend(`
                <div
                class="pcTouch02 message_part_bottom_small"
                type="${response[i].type}"
                onclick="window.open('${web_url}article?articleId=${response[i].articleId}')"
                >
                    <div class="message_part_bottom_part_time">${timeSet(response[i].time)}</div>
                    <div
                    articleId="${response[i].articleId}"
                    class="message_part_bottom_part_content"
                    >
                        ${messageCreate(response[i])}
                    </div>
                </div>
                `);
                $('.message_part_bottom_part_content:nth(' + i + ')').data({
                    '_id': response[i]._id,
                    'type': response[i].type,
                });
            }

            $('.commentSection_wait').remove();

        }
    });

}

// number to 99+
function numEasy(data) {
    if (data > 100 || data == 100 || isNaN(data)) {
        return '99+'
    }
    return data
}

// 读取详细通知内容
function readNoticeDetail(e) {
    $('.head').css('z-index', '0');
    $(e).after(`
    <div class="noticeDetail">
        <div class="noticeDetail_top">
                <div class="noticeDetail_top_title">通&nbsp知</div>
                <div class="noticeDetail_top_time">${$(e).siblings('.notice_part_bottom_part_time').html()}</div>
        </div>
        <div class="noticeDetail_bottm">
            <div class="noticeDetail_bottm_inner">
                ${$(e).html()}
            </div>
        </div>
        <div class="noticeDetail_bottm_button">
            <div onclick="singleCheck(this)">已&nbsp&nbsp读</div>
        </div>
    </div>
    <div class='mask'></div>
    `);
    $('.mask').click(function (e) {
        e.preventDefault();
        $('.noticeDetail').remove();
        $(this).remove();
        $('.head').css('z-index', '');
    });
}

// ui设计按钮
function uiSetFree(e) {
    window.event.stopPropagation()
    $(e).attr('onclick', '');
    $(e).attr('onmouseover', '');
    $(e).css('z-index', '1');
    $(e).append(`
    <span onclick="uiSetFree_buttton_check(this)" class="uiSetFree_buttton uiSetFree_buttton_check">确&nbsp;认</span>
    <span onclick="uiSetFree_buttton_cancel(this)" class="uiSetFree_buttton uiSetFree_buttton_cancel">取&nbsp;消</span>
    <span onclick="uiSetFree_buttton_default(this)" class="uiSetFree_buttton uiSetFree_buttton_default">默&nbsp;认</span>
    `)

    diyBackColor('unset', '.top', '70px', '62px', 'unset', 'unset', '45px', '13px', '-12px', '136deg', '22px', '-29px', '51px', 1)
    diyBackColor('unset', 'body', '70px', '260px', 'unset', 'unset', '45px', '-34px', '-12px', '226deg', '22px', '-30px', '-49px', 1)
    diyBackColor('1', '.centerLeftTop', 'unset', 'unset', '0', 'unset', '45px', '-34px', '-12px', '226deg', '22px', '-30px', '-49px', 1)
    diyBackColor('unset', '.centerLeftBottom', '-25px', '100px', 'unset', 'unset', '45px', '4px', '-20px', '297deg', '10px', '-42px', '36px', 1)
    diyBackColor('unset', '.contentSmallPart', 'unset', 'unset', '0', '70px', '45px', '-37px', '-7px', '34deg', '21px', '-22px', '-54px', 2)
    diyBackColor('unset', '.contentMoveArea', 'unset', '-39px', '180px', '38px', '60px', '-51px', '38px', '323deg', '21px', '54px', '-66px', 2)
    diyBackColor('unset', '.centerRight_part', 'unset', 'unset', '13px', '121px', '60px', '-51px', '38px', '323deg', '21px', '54px', '-66px', 2)
    diyBackColor('1', '.centerRightTopPart>div', '100px', 'unset', 'unset', '0', '60px', '-51px', '38px', '323deg', '21px', '54px', '-66px', 2)
    diyBackColor('unset', '.chart', 'unset', '40px', '0', 'unset', '60px', '-51px', '38px', '323deg', '21px', '54px', '-66px', 1)
    diyFontsize('unset', '.contentSmallPartTitle', '195px', '-33px', 'unset', 'unset', '25px', '-2px', '31px', '323deg', '13px', '37px', '-12px')
    diyFontsize('unset', '.innerContent', '283px', '-33px', 'unset', 'unset', '25px', '-2px', '31px', '323deg', '13px', '37px', '-12px')
    diyFontsize('unset', '.chart>div>span:nth-child(2)', '118px', 'unset', 'unset', 'unset', '25px', '-2px', '31px', '323deg', '13px', '37px', '-12px')
}

// 进行背景颜色diy的函数
function diyBackColor(zIndex, flag, posX, posY, posX2, posY2, noline_width, noline_left, noline_top, noline_reg, line_width, line_top, line_left, type) {
    if (type == 1) {
        $(flag).append(`
        <div class="freeUiButton" style="
        position: absolute;
        left: ${posX};
        top: ${posY};
        right: ${posX2};
        bottom: ${posY2};
        z-index: ${zIndex};
    ">
        <div style="
        width: 25px;
        height: 25px;
        position: absolute;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid #37affa;
    "><input value="#fdfdfd" oninput="$('${flag}').css('background-color', $(this).val());$('${flag}').attr('diy_background-color', $(this).val());$('${flag}').attr('freeUi_tag', '${flag}');"  type="color" style="
        display: block;
        width: 53px;
        position: absolute;
        height: 51px;
        top: 0;
        left: -9px;
        right: 0;
        bottom: 0;
        margin: auto;
        cursor:pointer;
    ">
    </div>
    <div  style="
        height: 0px;
        border: 1px solid #138bfb;
        width: ${noline_width};
        transform: rotate(${noline_reg});
        -o-transform: rotate(${noline_reg});
        -moz-transform: rotate(${noline_reg});
        -webkit-transform: rotate(${noline_reg});
        position: relative;
        left: ${noline_left};
        top: ${noline_top};
    "></div>
    <div  style="
        height: 0px;
        border: 1px solid #138bfb;
        position: relative;
        top: ${line_top};
        left: ${line_left};
        width: ${line_width};
    "></div>
        </div>
        `);
    } else {
        $(flag + ':nth(0)').append(`
        <div class="freeUiButton" style="
        position: absolute;
        left: ${posX};
        top: ${posY};
        right: ${posX2};
        bottom: ${posY2};
        z-index: ${zIndex};
    ">
        <div style="
        width: 25px;
        height: 25px;
        position: absolute;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid #37affa;
    "><input value="#fdfdfd" oninput="$('${flag}').attr('freeUi_tag', '${flag}');$('${flag}').css('background-color', $(this).val());$('${flag}').attr('diy_background-color', $(this).val());"  type="color" style="
        display: block;
        width: 53px;
        position: absolute;
        height: 51px;
        top: 0;
        left: -9px;
        right: 0;
        bottom: 0;
        margin: auto;
        cursor:pointer;
    ">
    </div>
    <div  style="
        height: 0px;
        border: 1px solid #138bfb;
        width: ${noline_width};
        transform: rotate(${noline_reg});
        -o-transform: rotate(${noline_reg});
        -moz-transform: rotate(${noline_reg});
        -webkit-transform: rotate(${noline_reg});
        position: relative;
        left: ${noline_left};
        top: ${noline_top};
    "></div>
    <div  style="
        height: 0px;
        border: 1px solid #138bfb;
        position: relative;
        top: ${line_top};
        left: ${line_left};
        width: ${line_width};
    "></div>
        </div>
        `);
    }
}

// 进行文字大小的diy函数(默认此为大于1)
function diyFontsize(zIndex, flag, posX, posY, posX2, posY2, noline_width, noline_left, noline_top, noline_reg, line_width, line_top, line_left) {
    $(flag + ':nth(0)').append(`
    <div class="freeUiButton" style="
    position: absolute;
    left: ${posX};
    top: ${posY};
    right: ${posX2};
    bottom: ${posY2};
    z-index: ${zIndex};
"
onclick="window.event.stopPropagation()"
>
    <div style="
    width: 50px;
    height: 25px;
    position: absolute;
    overflow: hidden;
    border-radius: 5px;
    border: 2px solid #37affa;
">
<input oninput="$('${flag}').attr('freeUi_tag', '${flag}');$('${flag}').css('font-size', $(this).val()+'px');$('${flag}'+':nth(0)').attr('diy_font-size', $(this).val()+'px');" type="number" max="40" min="12" placeholder="12px"
style="
display: block;
width: 100%;
position: absolute;
height: 51px;
top: 0;
bottom: 0;
margin: auto;
font-weight: bold;
text-align: center;
cursor:pointer;
"
>
</div>
<div  style="
    height: 0px;
    border: 1px solid #138bfb;
    width: ${noline_width};
    transform: rotate(${noline_reg});
    -o-transform: rotate(${noline_reg});
    -moz-transform: rotate(${noline_reg});
    -webkit-transform: rotate(${noline_reg});
    position: relative;
    left: ${noline_left};
    top: ${noline_top};
"></div>
<div  style="
    height: 0px;
    border: 1px solid #138bfb;
    position: relative;
    top: ${line_top};
    left: ${line_left};
    width: ${line_width};
"></div>
    </div>
    `);
}

// UI_确定按钮
async function uiSetFree_buttton_check(e) {
    window.event.stopPropagation()
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    // 进行ajax上传对应所设置的ui代码块
    let subCss = '' //待上传存储的自定义css
    for (let i = 0; i < $("[diy_background-color]").length; i++) {
        let str = $("[diy_background-color]:nth(" + i + ")").attr('freeUi_tag') + '{' + 'background-color:' + $("[diy_background-color]:nth(" + i + ")").attr('diy_background-color') + ';' + '}'
        subCss = subCss + str
    }
    for (let i = 0; i < $("[diy_font-size]").length; i++) {
        let str = $("[diy_font-size]:nth(" + i + ")").attr('freeUi_tag') + '{' + 'font-size:' + $("[diy_font-size]:nth(" + i + ")").attr('diy_font-size') + ';' + '}'
        subCss = subCss + str
    }
    await $.ajax({
        type: "post",
        url: "/mainApp/FreeCss",
        data: {
            token: window.localStorage.token,
            css: subCss
        },
        success: function (response) {
            if (response.isDiy == true) {
                $('.freeUiButton').remove();
                $(e).css('z-index', '');
                $(e).parent().attr('onclick', 'uiSetFree(this)');
                $(e).parent().attr('onmouseover', `$('#uiSetFree>svg').css('animation', 'rotate 0.5s linear');`);
                $('.uiSetFree_buttton').remove();
                alert('修改成功~')
            }
        }
    });
}

// UI_取消按钮
function uiSetFree_buttton_cancel(e) {
    window.event.stopPropagation()
    //以及把ui style 代码块去除

    $('.freeUiButton').remove();
    $(e).css('z-index', '');
    $(e).parent().attr('onclick', 'uiSetFree(this)');
    $(e).parent().attr('onmouseover', `$('#uiSetFree>svg').css('animation', 'rotate 0.5s linear');`);
    $('.uiSetFree_buttton').remove();

    $("[diy_font-size]").css('font-size', '');

    $("[diy_background-color]").css('background-color', '');

    $("[diy_background-color]").removeAttr('diy_background-color');

    $("[diy_font-size]").removeAttr('diy_font-size');

}

// UI_默认按钮
function uiSetFree_buttton_default(e) {
    window.event.stopPropagation()
    if (window.localStorage.isLogin == 'false') {
        //未登录
        noLogin()
        return
    }
    $.ajax({
        type: "post",
        url: "/mainApp/FreeCss_Default",
        data: {
            token: window.localStorage.token
        },
        success: function (response) {
            if (response.isDiy == true) {
                $('.freeUiButton').remove();
                $(e).css('z-index', '');
                $(e).parent().attr('onclick', 'uiSetFree(this)');
                $(e).parent().attr('onmouseover', `$('#uiSetFree>svg').css('animation', 'rotate 0.5s linear');`);
                $('.uiSetFree_buttton').remove();

                $("[diy_font-size]").css('font-size', '');

                $("[diy_background-color]").css('background-color', '');

                $("[diy_background-color]").removeAttr('diy_background-color');

                $("[diy_font-size]").removeAttr('diy_font-size');

                $('#free_style').remove();

                alert('恢复成功~')
            }
        }
    });

}

// diycss处理转义字符的用处
function escape2Html(str) {
    let arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
}

// 这也是改用了非mask方案的一个重要demo 之后的弹窗编写主要遵循一下实例
function noLogin() {
    window.event.stopPropagation()

    let temp_html = `<div class="logReg"><div><div class="waitChange"><div class="logByAcc" name="账号登录？"><div><div><div><span>账号：</span><span><div><input type="text" id="userName"></div></span></div></div></div><div><div><div><span>密码：</span><span><div><input type="password" autocomplete="new-password"  id="passWord"></div></span><a href="/findPassword">忘记密码？</a></div></div></div></div></div><div class="ChangeButton"><div><span class="part_change">邮箱登录？</span><span>/</span><span class="part_change">注册？</span></div></div></div><div><div id="logRegButton">登 录</div></div></div>`
    jump_window({}, temp_html)
    //以下为弹窗内部实际业务代码 与 弹窗代码结构无关

    //邮箱登录 注册 账号密码登陆 三者 切换模块
    $('.part_change').click(function () {
        switch (this.innerText) {
            case '邮箱登录？':
                this.innerText = $('.waitChange>div').attr('name')
                $('.waitChange>div').remove();
                $('.waitChange').prepend('<div class="logByEmail" name="邮箱登录？"><div><div><div class="emailNum"><div>邮&nbsp&nbsp&nbsp箱：</div><div><div><input type="text" id="logEmail"></div></div></div></div><div><div><button id="yanzheng">获取验证码</button></div></div><div><div class="yanzheni"><div>验证码：</div><div><div><input type="text" id="logEmailNum"></div></div></div></div></div></div>');
                $('#yanzheng').click(function () {

                    $('#logEmailNum')[0].placeholder = '未区分大小写'

                    if ($('#logEmail').val() == '') {
                        alert('请输入邮箱')
                        return
                    }
                    $('#yanzheng').attr('disabled', 'true');

                    $.ajax({
                        type: "post",
                        url: "login/loginEmail",
                        data: {
                            userEmail: $('#logEmail')[0].value
                        },
                        success: function (response) {}
                    });

                    for (let i = 0; i < 61; i++) {
                        setTimeout(() => {
                            $('#yanzheng').html(`(${60-i})秒`);
                            if (i < 60) {
                                $('#yanzheng').attr('disabled', 'true');
                            }
                            if (i == 60) {
                                $('#yanzheng').removeAttr('disabled');
                                $('#yanzheng').html('获取验证码');
                            }
                        }, i * 1000);
                    }

                });
                break;
            case '注册？':
                this.innerText = $('.waitChange>div').attr('name')
                $('.waitChange>div').remove();
                $('.waitChange').prepend('<div class="register" name="注册？"><div><div><div class="regemailNum"><div>邮&nbsp&nbsp&nbsp箱：</div><div><div><input type="text" id="email"></div></div></div></div><div><div><button id="regyanzheng">获取验证码</button></div></div><div><div class="regyanzheni"><div>验证码：</div><div><div><input type="text" id="regYanZhen"></div></div></div></div></div></div>');
                $('#regyanzheng').click(function () {

                    $('#regYanZhen')[0].placeholder = "未区分大小写"

                    if ($('#email').val() == '') {
                        alert('请输入邮箱')
                        return
                    }
                    $.ajax({
                        type: "post",
                        url: "register",
                        data: {
                            email: $('#email')[0].value
                        },
                        success: function (response) {}
                    });

                    for (let i = 0; i < 61; i++) {
                        setTimeout(() => {
                            $('#regyanzheng').html(`(${60-i})秒`);
                            if (i < 60) {
                                $('#regyanzheng').attr('disabled', 'true');
                            }
                            if (i == 60) {
                                $('#regyanzheng').removeAttr('disabled');
                                $('#regyanzheng').html('获取验证码');
                            }
                        }, i * 1000);
                    }
                });
                break;
            case '账号登录？':
                this.innerText = $('.waitChange>div').attr('name')
                $('.waitChange>div').remove();
                $('.waitChange').prepend(`<div class="logByAcc" name="账号登录？"><div><div><div><span>账号：</span><span><div><input type="text" id="userName"></div></span></div></div></div><div><div><div><span>密码：</span><span><div><input autocomplete="new-password" type="password"  id="passWord"></div></span><a href="/findPassword">忘记密码？</a></div></div></div></div>`);
                break;
            default:
                break;
        }
    });

    //登陆按钮
    $('#logRegButton').click(function () {

        if ($('#passWord').val() == '' || $('#regYanZhen').val() == '' || $('#logEmailNum').val() == '' || $('#userName').val() == '' || $('#logEmail').val() == '' || $('#email').val() == '') {
            alert('请检查相关登录信息是否完整')
            return
        }

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
                        if (response.isLogin == false) {
                            alert('请检查账户或密码')
                        } else {
                            noLogin_then(response)
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
                        if (response.isLogin == false) {
                            alert('请检查邮箱或验证码')
                        } else {
                            noLogin_then(response)
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
                        if (response.isLogin == false) {
                            alert('请检查邮箱或验证码')
                        } else {
                            noLogin_then(response)
                        }
                    }
                });
                break;
            default:
                break;
        }

    });
}

// 处理登陆验证返回数据以适配所有页面
function noLogin_then(e) {

    let DATA = e

    // 清除 登陆 注册 弹窗结构
    if ((DATA.isLogin == true) || (DATA.isReg == true)) {
        $('#jump_window').attr('style', '');
        $('#jump_window').html('');
        $('body').unbind();
    }

    switch (DATA.type) {
        case 'log_password':
            //登录成功 更新本地资源 但是更新资源也需要根据实际页面类型进行更新

            switch (window.page_type) {
                case 'index':
                    // 首页的软登陆成功响应事件

                    // 上一次登陆时间
                    $('.webInfors').prepend(`<div class="finLogTime"> <span>LAST LOGIN:</span><span class="finLogTime_number">${timeSet(DATA.user.userFinLog)}</span></div>`);

                    // 点赞 收藏 评论 文章 的数据值
                    $('.centerRightTopPart1_number').html(`${numEasy(DATA.user.number1)}`);
                    $('.centerRightTopPart2_number').html(`${numEasy(DATA.user.number2)}`);
                    $('.centerRightTopPart3_number').html(`${numEasy(DATA.user.number3)}`);
                    $('.centerRightTopPart4_number').html(`${numEasy(DATA.user.number4)}`);

                    // 本地 localStorage 的更新
                    window.localStorage.name = DATA.user.userName
                    window.localStorage.token = DATA.token
                    window.localStorage.search = JSON.stringify(DATA.user.userS_H)
                    window.localStorage.isLogin = true

                    // 用户头像设置
                    $('#userHead').html(`<a
                    class="toPerson"
                    onclick="window.open('/person?userId=${DATA.user.data_id}')">
                    <img
                        class="person_head_pic"
                        userId="${DATA.user.id}"
                        userName="${DATA.user.userName}"
                        id="${DATA.user.data_id}"
                        style="border: 2px solid green;border-radius: 50%;"
                        onerror=\'picError(this)\'
                        src="${pic_src_solve(zip_dir + DATA.user.headImg)}">
                    </a>`);

                    // 设置退出登陆按钮
                    $('#userHead').after(`
                    <div class="head-part">
                        <span id="outLogin" class="pcTouch">退 出 登 录</span>
                    </div>
                    `);

                    // 针对所有触屏设备
                    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                        $('.toPerson').attr('onclick', 'return false');
                        $('.head-part').remove();
                        $('.toPerson').removeAttr('href');

                        //通过接口请求的方式获取数据 不必担心代码的修改 接口已经写好

                        //接下来需要完成争对于小屏幕设备的信箱点击事件进行优化
                        if (!is_small_client) {
                            //适配ipad

                            $('.toPerson').click(function (e) {
                                e.stopPropagation()
                                let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;"><span style="color: #004eff;" onclick="window.open('/person?userId=${DATA.user.data_id}')">个 人 主 页</span>
                            <span id="outLogin" class="pcTouch">退 出 登 录</span>
                        </div>`
                                jump_window({}, temp_html)

                                //点击退出登录按钮本地去除本地缓存
                                $('#outLogin').click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    localStorage.clear();
                                    window.localStorage.isLogin = false;
                                    window.location.href = web_url
                                });

                            });

                        } else {
                            //适配phone

                            $('.toPerson').click(function (e) {
                                e.stopPropagation()
                                let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;">
                            <span onclick="noticeClick(event)" class="notice smallp">通&nbsp;&nbsp;知</span>
                            <span onclick="messageClick(event)" class="message smallp">
                                <span id="message_number"></span>
                                信&nbsp;&nbsp;箱
                            </span>
                                <span style="color: #004eff;" onclick="window.open('/person?userId=${DATA.user.data_id}')">个 人 主 页</span>
                                <span id="outLogin" class="pcTouch">退 出 登 录</span>
                            </div>`
                                jump_window({}, temp_html)

                                //进行内置信箱的读取
                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/webEmail",
                                    data: {
                                        token: window.localStorage.token,
                                        type: 'webEmailNumber'
                                    },
                                    success: function (DATA) {
                                        if (DATA.isLogin == false) {
                                            window.location.href = web_url
                                            return
                                        }
                                        if (DATA.number == 0) {
                                            return
                                        }
                                        $('#message_number').html(numEasy(DATA.number));
                                    }
                                });

                                //点击退出登录按钮本地去除本地缓存
                                $('#outLogin').click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    localStorage.clear();
                                    window.localStorage.isLogin = false;
                                    window.location.href = web_url
                                });

                            });

                        }

                    } else {
                        // 针对所有非触屏设备
                        $('.head-part').css({
                            'left': -$('.head-part')[0].clientWidth / 2 + $('.head')[0].clientWidth / 2,
                            'top': $('.head')[0].clientHeight + 'px',
                            'visibility': 'hidden'
                        });
                        $('.head').hover(function () {
                            $('.head-part').css('visibility', 'visible');
                        }, function () {
                            $('.head-part').css('visibility', 'hidden');
                        });
                    }

                    //点击退出登录按钮本地去除本地缓存
                    $('#outLogin').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        localStorage.clear();
                        window.localStorage.isLogin = false;
                        window.location.href = web_url
                    });

                    // 登录状态下的搜索(just for pc & ipad , not support for ipad)
                    if (!is_small_client) {
                        $("#search_base_value").click(function (e) {

                            e.stopPropagation()
                            e.preventDefault()

                            $(".searchPartInput_search_pc>svg>path").attr('fill', "#2680F0");
                            $('.searchPartInput>span').css({
                                "border-color": "rgb(3,166,244)"
                            });

                            //弹窗生成历史记录
                            let temp_search_data = JSON.parse(window.localStorage.search)
                            let temp_html = `<div class="searchPartInput_searchlist">
                        <div class="searchPartInput_searchlist_sma_word">搜索记录：</div>
                        <div class="searchPartInput_searchlist_sma_clear">清空列表</div>
                    </div>`
                            let temp_pos = {
                                'top': `${$('.searchPartInput')[0].getBoundingClientRect().bottom}px`,
                                'left': `${$('.searchPartInput')[0].getBoundingClientRect().left}px`,
                                'position': 'fixed',
                                'width': `${$('.searchPartInput').width()}px`,
                                'z-index': '1'
                            }
                            jump_window(temp_pos, temp_html, function () {
                                $('body').click(function () {
                                    $('.searchPartInput>span').attr('style', '');
                                });
                            })

                            for (let i = 0; i < temp_search_data.length; i++) {

                                $('.searchPartInput_searchlist_sma_clear').after(`
                            <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter(temp_search_data[i].name)}</div>
                            `);

                            }

                            $('.searchPartInput_searchlist_sma').click(function (e) {
                                $('.searchPartInput>span').attr('style', '');
                            });

                            $('.searchPartInput_searchlist').css({
                                'border-top-left-radius': '0',
                                'border-top-right-radius': '0'
                            });

                            $('.searchPartInput>span').css({
                                'border-bottom-left-radius': '0',
                                'border-bottom-right-radius': '0'
                            });

                            if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                                $('.searchPartInput').append(`<div class="mask02" style="
                            z-index: -1;
                        "></div>`);
                                $('.mask02').click(function (e) {
                                    e.preventDefault();
                                    $('.mask02').remove();
                                    $('.searchPartInput_searchlist').css('visibility', 'hidden');
                                    $(window).unbind('keydown');
                                });
                            }

                            $('.searchPartInput_searchlist_sma_clear').click(function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                $('#jump_window').html('');
                                $('body').unbind();

                                if (!is_small_client) {
                                    $('.searchPartInput>span').attr('style', '');
                                    $('.searchPartInputIconKEY').attr('fill', '#bfbfbf');
                                }

                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/searchRemove",
                                    data: {
                                        token: window.localStorage.token
                                    },
                                    success: function (DATA) {
                                        if (DATA.isDelete == true) {

                                            $(window).unbind('keydown');
                                            window.localStorage.search = JSON.stringify([])

                                        }
                                    }
                                });

                            });

                        });
                    }

                    //进行待收通知的读取
                    $.ajax({
                        type: "post",
                        url: "/mainApp/webNotice",
                        data: {
                            token: window.localStorage.token,
                            type: 'webNoticeNumber'
                        },
                        success: function (DATA) {
                            if (DATA.isLogin == false) {
                                window.location.href = web_url
                                return
                            }
                            if (DATA.number == 0) {
                                return
                            }
                            $('.notice').prepend(`
                        <span id="notice_number">${numEasy(DATA.number)}</span>
                        `);
                        }
                    });

                    //进行内置信箱的读取
                    $.ajax({
                        type: "post",
                        url: "/mainApp/webEmail",
                        data: {
                            token: window.localStorage.token,
                            type: 'webEmailNumber'
                        },
                        success: function (DATA) {
                            if (DATA.isLogin == false) {
                                window.location.href = web_url
                                return
                            }
                            if (DATA.number == 0) {
                                return
                            }
                            $('.message').prepend(`
                            <span id="message_number">${numEasy(DATA.number)}</span>
                        `);
                        }
                    });

                    $('head').append(`
                <style id='free_style'>${escape2Html(DATA.user.FreeCss)}</style>
                    `);

                    // 取消文字变化在小屏幕设备上的应用
                    if (is_small_client) {
                        let temp_str = $('#free_style').html()
                        temp_str = temp_str.replace(/font-size/g, 'error')
                        $('#free_style').html(temp_str)
                    }

                    // 对于由于自定义 css 事件所引起的 可视区域被隐藏 问题作出的适配
                    let temp_innerContents = $('.innerContent')
                    for (let i = 0; i < temp_innerContents.length; i++) {
                        if ($(temp_innerContents[i]).height() == 200) {
                            $(temp_innerContents[i]).after(`
                            <div
                            class="contentExploreMask"
                            onclick="readAllButton(this)"
                            >
                                <div class="contentExploreButton">阅读全文</div>
                            </div>
                            `);
                        }
                    }

                    break;
                case 'article':
                    // 文章页面的软登陆成功响应事件

                    // 本地 localStorage 的更新
                    window.localStorage.name = DATA.user.userName
                    window.localStorage.token = DATA.token
                    window.localStorage.search = JSON.stringify(DATA.user.userS_H)
                    window.localStorage.isLogin = true

                    // 用户头像设置
                    $('#userHead').html(`<a
                    class="toPerson" 
                    onclick="window.open('/person?userId=${DATA.user.data_id}')">
                    <img
                        class="person_head_pic"
                        id="${DATA.user.data_id}"
                        userId="${DATA.user.id}"
                        userName="${DATA.user.userName}"
                        style="border: 2px solid green;border-radius: 50%;"
                        onerror=\'picError(this)\'
                        username='${DATA.user.userName}'
                        src="${pic_src_solve(zip_dir + DATA.user.headImg)}">
                    </a>`);

                    break;
                default:
                    break;
            }

            break;
        case 'log_email':
            // 邮箱登陆 更新本地资源 但是更新资源也需要根据实际页面类型进行更新

            switch (window.page_type) {
                case 'index':
                    // 首页的软登陆成功响应事件

                    // 上一次登陆时间
                    $('.webInfors').prepend(`<div class="finLogTime"> <span>LAST LOGIN:</span><span class="finLogTime_number">${timeSet(DATA.user.userFinLog)}</span></div>`);

                    // 点赞 收藏 评论 文章 的数据值
                    $('.centerRightTopPart1_number').html(`${numEasy(DATA.user.number1)}`);
                    $('.centerRightTopPart2_number').html(`${numEasy(DATA.user.number2)}`);
                    $('.centerRightTopPart3_number').html(`${numEasy(DATA.user.number3)}`);
                    $('.centerRightTopPart4_number').html(`${numEasy(DATA.user.number4)}`);

                    // 本地 localStorage 的更新
                    window.localStorage.name = DATA.user.userName
                    window.localStorage.token = DATA.token
                    window.localStorage.search = JSON.stringify(DATA.user.userS_H)
                    window.localStorage.isLogin = true

                    // 用户头像设置
                    $('#userHead').html(`<a
                    class="toPerson"
                    onclick="window.open('/person?userId=${DATA.user.data_id}')">
                    <img
                        class="person_head_pic"
                        id="${DATA.user.data_id}"
                        userId="${DATA.user.id}"
                        userName="${DATA.user.userName}"
                        style="border: 2px solid green;border-radius: 50%;" 
                        onerror=\'picError(this)\'
                        src="${pic_src_solve(zip_dir + DATA.user.headImg)}">
                    </a>`);

                    // 设置退出登陆按钮
                    $('#userHead').after(`
                    <div class="head-part">
                        <span id="outLogin" class="pcTouch">退 出 登 录</span>
                    </div>
                    `);

                    // 针对所有触屏设备
                    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                        $('.toPerson').attr('onclick', 'return false');
                        $('.head-part').remove();
                        $('.toPerson').removeAttr('href');

                        //通过接口请求的方式获取数据 不必担心代码的修改 接口已经写好

                        //接下来需要完成争对于小屏幕设备的信箱点击事件进行优化
                        if (!is_small_client) {
                            //适配ipad

                            $('.toPerson').click(function (e) {
                                e.stopPropagation()
                                let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;"><span style="color: #004eff;" onclick="window.open('/person?userId=${DATA.user.data_id}')">个 人 主 页</span>
                            <span id="outLogin" class="pcTouch">退 出 登 录</span>
                        </div>`
                                jump_window({}, temp_html)

                                //点击退出登录按钮本地去除本地缓存
                                $('#outLogin').click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    localStorage.clear();
                                    window.localStorage.isLogin = false;
                                    window.location.href = web_url
                                });

                            });

                        } else {
                            //适配phone

                            $('.toPerson').click(function (e) {
                                e.stopPropagation()
                                let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;">
                            <span onclick="noticeClick(event)" class="notice smallp">通&nbsp;&nbsp;知</span>
                            <span onclick="messageClick(event)" class="message smallp">
                                <span id="message_number"></span>
                                信&nbsp;&nbsp;箱
                            </span>
                                <span style="color: #004eff;" onclick="window.open('/person?userId=${DATA.user.data_id}')">个 人 主 页</span>
                                <span id="outLogin" class="pcTouch">退 出 登 录</span>
                            </div>`
                                jump_window({}, temp_html)

                                //进行内置信箱的读取
                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/webEmail",
                                    data: {
                                        token: window.localStorage.token,
                                        type: 'webEmailNumber'
                                    },
                                    success: function (DATA) {
                                        if (DATA.isLogin == false) {
                                            window.location.href = web_url
                                            return
                                        }
                                        if (DATA.number == 0) {
                                            return
                                        }
                                        $('#message_number').html(numEasy(DATA.number));
                                    }
                                });

                                //点击退出登录按钮本地去除本地缓存
                                $('#outLogin').click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    localStorage.clear();
                                    window.localStorage.isLogin = false;
                                    window.location.href = web_url
                                });

                            });

                        }

                    } else {
                        // 针对所有非触屏设备
                        $('.head-part').css({
                            'left': -$('.head-part')[0].clientWidth / 2 + $('.head')[0].clientWidth / 2,
                            'top': $('.head')[0].clientHeight + 'px',
                            'visibility': 'hidden'
                        });
                        $('.head').hover(function () {
                            $('.head-part').css('visibility', 'visible');
                        }, function () {
                            $('.head-part').css('visibility', 'hidden');
                        });
                    }

                    //点击退出登录按钮本地去除本地缓存
                    $('#outLogin').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        localStorage.clear();
                        window.localStorage.isLogin = false;
                        window.location.href = web_url
                    });

                    // 登录状态下的搜索(just for pc & ipad , not support for ipad)
                    if (!is_small_client) {
                        $("#search_base_value").click(function (e) {

                            e.stopPropagation()
                            e.preventDefault()

                            $(".searchPartInput_search_pc>svg>path").attr('fill', "#2680F0");
                            $('.searchPartInput>span').css({
                                "border-color": "rgb(3,166,244)"
                            });

                            //弹窗生成历史记录
                            let temp_search_data = JSON.parse(window.localStorage.search)
                            let temp_html = `<div class="searchPartInput_searchlist">
                        <div class="searchPartInput_searchlist_sma_word">搜索记录：</div>
                        <div class="searchPartInput_searchlist_sma_clear">清空列表</div>
                    </div>`
                            let temp_pos = {
                                'top': `${$('.searchPartInput')[0].getBoundingClientRect().bottom}px`,
                                'left': `${$('.searchPartInput')[0].getBoundingClientRect().left}px`,
                                'position': 'fixed',
                                'width': `${$('.searchPartInput').width()}px`,
                                'z-index': '1'
                            }
                            jump_window(temp_pos, temp_html, function () {
                                $('body').click(function () {
                                    $('.searchPartInput>span').attr('style', '');
                                });
                            })

                            for (let i = 0; i < temp_search_data.length; i++) {

                                $('.searchPartInput_searchlist_sma_clear').after(`
                            <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter(temp_search_data[i].name)}</div>
                            `);

                            }

                            $('.searchPartInput_searchlist_sma').click(function (e) {
                                $('.searchPartInput>span').attr('style', '');
                            });

                            $('.searchPartInput_searchlist').css({
                                'border-top-left-radius': '0',
                                'border-top-right-radius': '0'
                            });

                            $('.searchPartInput>span').css({
                                'border-bottom-left-radius': '0',
                                'border-bottom-right-radius': '0'
                            });

                            if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                                $('.searchPartInput').append(`<div class="mask02" style="
                            z-index: -1;
                        "></div>`);
                                $('.mask02').click(function (e) {
                                    e.preventDefault();
                                    $('.mask02').remove();
                                    $('.searchPartInput_searchlist').css('visibility', 'hidden');
                                    $(window).unbind('keydown');
                                });
                            }

                            $('.searchPartInput_searchlist_sma_clear').click(function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                $('#jump_window').html('');
                                $('body').unbind();

                                if (!is_small_client) {
                                    $('.searchPartInput>span').attr('style', '');
                                    $('.searchPartInputIconKEY').attr('fill', '#bfbfbf');
                                }

                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/searchRemove",
                                    data: {
                                        token: window.localStorage.token
                                    },
                                    success: function (DATA) {
                                        if (DATA.isDelete == true) {

                                            $(window).unbind('keydown');
                                            window.localStorage.search = JSON.stringify([])

                                        }
                                    }
                                });

                            });

                        });
                    }

                    //进行待收通知的读取
                    $.ajax({
                        type: "post",
                        url: "/mainApp/webNotice",
                        data: {
                            token: window.localStorage.token,
                            type: 'webNoticeNumber'
                        },
                        success: function (DATA) {
                            if (DATA.isLogin == false) {
                                window.location.href = web_url
                                return
                            }
                            if (DATA.number == 0) {
                                return
                            }
                            $('.notice').prepend(`
                        <span id="notice_number">${numEasy(DATA.number)}</span>
                        `);
                        }
                    });

                    //进行内置信箱的读取
                    $.ajax({
                        type: "post",
                        url: "/mainApp/webEmail",
                        data: {
                            token: window.localStorage.token,
                            type: 'webEmailNumber'
                        },
                        success: function (DATA) {
                            if (DATA.isLogin == false) {
                                window.location.href = web_url
                                return
                            }
                            if (DATA.number == 0) {
                                return
                            }
                            $('.message').prepend(`
                            <span id="message_number">${numEasy(DATA.number)}</span>
                        `);
                        }
                    });

                    $('head').append(`
                <style id='free_style'>${escape2Html(DATA.user.FreeCss)}</style>
                    `);

                    // 取消文字变化在小屏幕设备上的应用
                    if (is_small_client) {
                        let temp_str = $('#free_style').html()
                        temp_str = temp_str.replace(/font-size/g, 'error')
                        $('#free_style').html(temp_str)
                    }

                    // 对于由于自定义 css 事件所引起的 可视区域被隐藏 问题作出的适配
                    let temp_innerContents = $('.innerContent')
                    for (let i = 0; i < temp_innerContents.length; i++) {
                        if ($(temp_innerContents[i]).height() == 200) {
                            $(temp_innerContents[i]).after(`
                            <div
                            class="contentExploreMask"
                            onclick="readAllButton(this)"
                            >
                                <div class="contentExploreButton">阅读全文</div>
                            </div>
                            `);
                        }
                    }

                    break;
                case 'article':
                    // 文章页面的软登陆成功响应事件

                    // 本地 localStorage 的更新
                    window.localStorage.name = DATA.user.userName
                    window.localStorage.token = DATA.token
                    window.localStorage.search = JSON.stringify(DATA.user.userS_H)
                    window.localStorage.isLogin = true

                    // 用户头像设置
                    $('#userHead').html(`<a
                    class="toPerson" 
                    onclick="window.open('/person?userId=${DATA.user.data_id}')">
                    <img
                        class="person_head_pic"
                        id="${DATA.user.data_id}"
                        userId="${DATA.user.id}"
                        userName="${DATA.user.userName}"
                        style="border: 2px solid green;border-radius: 50%;"
                        onerror=\'picError(this)\'
                        username='${DATA.user.userName}'
                        src="${pic_src_solve(zip_dir + DATA.user.headImg)}">
                    </a>`);

                    break;
                default:
                    break;
            }

            break;
        case 'register':
            // 注册

            switch (window.page_type) {
                case 'index':
                    // 首页的软登陆成功响应事件

                    // 上一次登陆时间
                    $('.webInfors').prepend(`<div class="finLogTime"> <span>LAST LOGIN:</span><span class="finLogTime_number">${DATA.user.userFinLog}</span></div>`);

                    // 点赞 收藏 评论 文章 的数据值
                    $('.centerRightTopPart1_number').html(`${numEasy(DATA.user.number1)}`);
                    $('.centerRightTopPart2_number').html(`${numEasy(DATA.user.number2)}`);
                    $('.centerRightTopPart3_number').html(`${numEasy(DATA.user.number3)}`);
                    $('.centerRightTopPart4_number').html(`${numEasy(DATA.user.number4)}`);

                    // 本地 localStorage 的更新
                    window.localStorage.name = DATA.user.userName
                    window.localStorage.token = DATA.token
                    window.localStorage.isLogin = true

                    // 用户头像设置
                    $('#userHead').html(`<a
                    class="toPerson"
                    onclick="window.open('/person?userId=${DATA.user.data_id}')"
                    <img
                        class="person_head_pic"
                        userName="${DATA.user.userName}"
                        id="${DATA.user.data_id}">
                        style="border: 2px solid green;border-radius: 50%;"
                        onerror=\'picError(this)\'
                        src="${pic_src_solve(zip_dir + DATA.user.headImg)}">
                    </a>`);

                    // 设置退出登陆按钮
                    $('#userHead').after(`
                    <div class="head-part">
                        <span id="outLogin" class="pcTouch">退 出 登 录</span>
                    </div>
                    `);

                    // 针对所有触屏设备
                    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                        $('.toPerson').attr('onclick', 'return false');
                        $('.head-part').remove();
                        $('.toPerson').removeAttr('href');

                        //通过接口请求的方式获取数据 不必担心代码的修改 接口已经写好

                        //接下来需要完成争对于小屏幕设备的信箱点击事件进行优化
                        if (!is_small_client) {
                            //适配ipad

                            $('.toPerson').click(function (e) {
                                e.stopPropagation()
                                let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;"><span style="color: #004eff;" onclick="window.open('/person?userId=${DATA.user.data_id}')">个 人 主 页</span>
                            <span id="outLogin" class="pcTouch">退 出 登 录</span>
                        </div>`
                                jump_window({}, temp_html)

                                //点击退出登录按钮本地去除本地缓存
                                $('#outLogin').click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    localStorage.clear();
                                    window.localStorage.isLogin = false;
                                    window.location.href = web_url
                                });

                            });

                        } else {
                            //适配phone

                            $('.toPerson').click(function (e) {
                                e.stopPropagation()
                                let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;">
                            <span onclick="noticeClick(event)" class="notice smallp">通&nbsp;&nbsp;知</span>
                            <span onclick="messageClick(event)" class="message smallp">
                                <span id="message_number"></span>
                                信&nbsp;&nbsp;箱
                            </span>
                                <span style="color: #004eff;" onclick="window.open('/person?userId=${DATA.user.data_id}')">个 人 主 页</span>
                                <span id="outLogin" class="pcTouch">退 出 登 录</span>
                            </div>`
                                jump_window({}, temp_html)

                                //进行内置信箱的读取
                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/webEmail",
                                    data: {
                                        token: window.localStorage.token,
                                        type: 'webEmailNumber'
                                    },
                                    success: function (DATA) {
                                        if (DATA.isLogin == false) {
                                            window.location.href = web_url
                                            return
                                        }
                                        if (DATA.number == 0) {
                                            return
                                        }
                                        $('#message_number').html(numEasy(DATA.number));
                                    }
                                });

                                //点击退出登录按钮本地去除本地缓存
                                $('#outLogin').click(function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    localStorage.clear();
                                    window.localStorage.isLogin = false;
                                    window.location.href = web_url
                                });

                            });

                        }

                    } else {
                        // 针对所有非触屏设备
                        $('.head-part').css({
                            'left': -$('.head-part')[0].clientWidth / 2 + $('.head')[0].clientWidth / 2,
                            'top': $('.head')[0].clientHeight + 'px',
                            'visibility': 'hidden'
                        });
                        $('.head').hover(function () {
                            $('.head-part').css('visibility', 'visible');
                        }, function () {
                            $('.head-part').css('visibility', 'hidden');
                        });
                    }

                    //点击退出登录按钮本地去除本地缓存
                    $('#outLogin').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        localStorage.clear();
                        window.localStorage.isLogin = false;
                        window.location.href = web_url
                    });

                    // 登录状态下的搜索(just for pc & ipad , not support for ipad)
                    if (!is_small_client) {
                        $("#search_base_value").click(function (e) {

                            e.stopPropagation()
                            e.preventDefault()

                            $(".searchPartInput_search_pc>svg>path").attr('fill', "#2680F0");
                            $('.searchPartInput>span').css({
                                "border-color": "rgb(3,166,244)"
                            });

                            //弹窗生成历史记录
                            let temp_search_data = JSON.parse(window.localStorage.search)
                            let temp_html = `
                            <div class="searchPartInput_searchlist">
                               <div class="searchPartInput_searchlist_sma_word">搜索记录：</div>
                               <div class="searchPartInput_searchlist_sma_clear">清空列表</div>
                            </div>
                            `
                            let temp_pos = {
                                'top': `${$('.searchPartInput')[0].getBoundingClientRect().bottom}px`,
                                'left': `${$('.searchPartInput')[0].getBoundingClientRect().left}px`,
                                'position': 'fixed',
                                'width': `${$('.searchPartInput').width()}px`,
                                'z-index': '1'
                            }
                            jump_window(temp_pos, temp_html, function () {
                                $('body').click(function () {
                                    $('.searchPartInput>span').attr('style', '');
                                });
                            })

                            for (let i = 0; i < temp_search_data.length; i++) {
                                $('.searchPartInput_searchlist_sma_clear').after(`<div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter(temp_search_data[i].name)}</div>`);
                            }

                            $('.searchPartInput_searchlist_sma').click(function (e) {
                                $('.searchPartInput>span').attr('style', '');
                            });

                            $('.searchPartInput_searchlist').css({
                                'border-top-left-radius': '0',
                                'border-top-right-radius': '0'
                            });

                            $('.searchPartInput>span').css({
                                'border-bottom-left-radius': '0',
                                'border-bottom-right-radius': '0'
                            });

                            if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                                $('.searchPartInput').append(`<div class="mask02" style="
                            z-index: -1;
                        "></div>`);
                                $('.mask02').click(function (e) {
                                    e.preventDefault();
                                    $('.mask02').remove();
                                    $('.searchPartInput_searchlist').css('visibility', 'hidden');
                                    $(window).unbind('keydown');
                                });
                            }

                            $('.searchPartInput_searchlist_sma_clear').click(function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                                $('#jump_window').html('');
                                $('body').unbind();

                                if (!is_small_client) {
                                    $('.searchPartInput>span').attr('style', '');
                                    $('.searchPartInputIconKEY').attr('fill', '#bfbfbf');
                                }

                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/searchRemove",
                                    data: {
                                        token: window.localStorage.token
                                    },
                                    success: function (DATA) {
                                        if (DATA.isDelete == true) {

                                            $(window).unbind('keydown');
                                            window.localStorage.search = JSON.stringify([])

                                        }
                                    }
                                });

                            });

                        });
                    }

                    //进行待收通知的读取
                    $.ajax({
                        type: "post",
                        url: "/mainApp/webNotice",
                        data: {
                            token: window.localStorage.token,
                            type: 'webNoticeNumber'
                        },
                        success: function (DATA) {
                            if (DATA.isLogin == false) {
                                window.location.href = web_url
                                return
                            }
                            if (DATA.number == 0) {
                                return
                            }
                            $('.notice').prepend(`
                        <span id="notice_number">${numEasy(DATA.number)}</span>
                        `);
                        }
                    });

                    //进行内置信箱的读取
                    $.ajax({
                        type: "post",
                        url: "/mainApp/webEmail",
                        data: {
                            token: window.localStorage.token,
                            type: 'webEmailNumber'
                        },
                        success: function (DATA) {
                            if (DATA.isLogin == false) {
                                window.location.href = web_url
                                return
                            }
                            if (DATA.number == 0) {
                                return
                            }
                            $('.message').prepend(`
                            <span id="message_number">${numEasy(DATA.number)}</span>
                        `);
                        }
                    });

                    $('head').append(`
                <style id='free_style'>${escape2Html(DATA.user.FreeCss)}</style>
                    `);

                    // 取消文字变化在小屏幕设备上的应用
                    if (is_small_client) {
                        let temp_str = $('#free_style').html()
                        temp_str = temp_str.replace(/font-size/g, 'error')
                        $('#free_style').html(temp_str)
                    }

                    // 对于由于自定义 css 事件所引起的 可视区域被隐藏 问题作出的适配
                    let temp_innerContents = $('.innerContent')
                    for (let i = 0; i < temp_innerContents.length; i++) {
                        if ($(temp_innerContents[i]).height() == 200) {
                            $(temp_innerContents[i]).after(`
                            <div
                            class="contentExploreMask"
                            onclick="readAllButton(this)"
                            >
                                <div class="contentExploreButton">阅读全文</div>
                            </div>
                            `);
                        }
                    }

                    break;
                case 'article':
                    // 文章页面的软登陆成功响应事件

                    // 本地 localStorage 的更新
                    window.localStorage.name = DATA.user.userName
                    window.localStorage.token = DATA.token
                    window.localStorage.isLogin = true

                    // 用户头像设置
                    $('#userHead').html(`<a
                    class="toPerson"
                    onclick="window.open('/person?userId=${DATA.user.data_id}')">
                    <img
                        class="person_head_pic"
                        id="${DATA.user.data_id}"
                        userId="${DATA.user.id}"
                        userName="${DATA.user.userName}"
                        style="border: 2px solid green;border-radius: 50%;"
                        onerror=\'picError(this)\'
                        username='${DATA.user.userName}'
                        src="${pic_src_solve(zip_dir + DATA.user.headImg)}">
                    </a>`);

                    break;
                default:
                    break;
            }

            break;
        default:
            break;
    }

}

//前端进行xss过滤之基础
function xssFilter(e) {
    if (e === null) {
        //应对一次评论无法上传处理所做的暂时性修改
        return '/*该评论暂时失效，抱歉*/'
    }
    return e.replace(/</gi, '&lt;')
}

//跳转提醒
function jumpWeb(e) {

    window.event.stopPropagation()

    let temp_html = `
    <div class="mask"></div>
    <div class="jumpWebPart">
            <div class="jumpWebPart_loading-others">
                <div class="jumpWebPart_loading-others_part01">请注意您的账号和财产安全</div>
                <div class="jumpWebPart_loading-others_part02">
                    <div>您即将离开 树说，去往：</div>
                    <a>${$(e).attr('data')}</a>
                </div>
                <div class="jumpWebPart_loading-others_part03">
                    <a>继 续</a>
                </div>
            </div>
    </div>
    `

    jump_window({}, temp_html, function () {
        $('.jumpWebPart_loading-others_part03>a').click(function () {
            window.open(`${$(e).attr('data')}`)
            $('#jump_window').html('');
            $('body').unbind();
        });

        $('.mask').click(function (e) {
            $('#jump_window').html('');
            $('body').unbind();
        });
    })

}

//评论区小优化
function commentInput(e) {

    let str0 = $(e).parents('.commentSectionArea').find('#commentContent').attr('flagnum');
    let str1 = $(e).parents('.commentSectionArea').find('#commentContent').text().trim().length;

    if (str0 > str1) {
        //退出二次评论模式
        $('#commentContent').html('');

        $(e).parents('.commentSectionArea').find('#commentContent').attr('oninput', '')

        $(e).parents('.commentSectionArea').find('.Comments_small_comment').css('color', 'unset')

        $(e).parents('.commentSectionArea').find('.commentSubmit').attr('onclick', 'commmentSubmit(this)');
    }
}

//searchCommen
function searchCommen(i) {
    switch ($('.article_small_color:nth(' + i + ')').find('.anonymity').length == 0) {
        // 非匿名
        case true:
            //无图
            if ($('.article_small_color:nth(' + i + ')').find('img').length == 1) {
                $('.article_small_color:nth(' + i + ')').find('.article_small').html(`
                    <div style="width:0;"  class="article_small_imgpart"></div>
                    <div style="width:100%;" class="article_small_wordpart">
                        ${xssFilter($('.article_small_color:nth(' + i + ')').find('.article_small')[0].innerText)}
                    </div>
                    `);
                break
            }
            //有图（显示第一张图片即可）
            $('.article_small_color:nth(' + i + ')').find('.article_small').html(`
                <div class="article_small_imgpart">
                    <img
                    onerror=\'picError(this)\'
                    class="article_small_imgpart_img"
                    src="${pic_src_solve($('.article_small_color:nth(' + i + ')').find('img')[1].src)}">
                </div>
                <div class="article_small_wordpart">
                    ${xssFilter($('.article_small_color:nth(' + i + ')').find('.article_small')[0].innerText)}
                </div>
            `);

            break;
            // 匿名
        case false:
            if ($('.article_small_color:nth(' + i + ')').find('img').length == 0) {
                $('.article_small_color:nth(' + i + ')').find('.article_small').html(`
                    <div style="width:0;" class="article_small_imgpart">
                    </div>
                    <div style="width:100%;" class="article_small_wordpart">
                        ${xssFilter($('.article_small_color:nth(' + i + ')').find('.article_small')[0].innerText)}
                    </div>
                `);
                break
            }
            $('.article_small_color:nth(' + i + ')').find('.article_small').html(`
    <div class="article_small_imgpart">
        <img
        onerror=\'picError(this)\'
        class="article_small_imgpart_img"
        src="${pic_src_solve($('.article_small_color:nth(' + i + ')').find('img')[0].src)}">
    </div>
    <div class="article_small_wordpart">
        ${xssFilter($('.article_small_color:nth(' + i + ')').find('.article_small')[0].innerText)}
    </div>
`);

            break;
        default:
            break;
    }
}

//弹窗结构函数  该函数并不会与弹窗内部实际代码产生关系
function jump_window(cssObj, html, callback = () => {}) {

    $('body').unbind().click(function () {
        window.event.stopPropagation()
        $('#jump_window').attr('style', '');
        $('#jump_window').html('');
        $('#jump_window').unbind();
        $('body').unbind();
    });

    $('#jump_window').html(html);

    $('#jump_window').click(function () {
        window.event.stopPropagation()
    });

    $('#jump_window').attr('style', '').css(cssObj);

    //默认回调函数  可省略不设置回调函数
    callback()

}

//图片加载失败的方法
function picError(e) {
    e.src = pic_error
    $(e).attr('pic_bad', 'true');
    $(e).unbind('click');
    $(e).removeAttr('onerror');
    $(e).css({
        'max-width': '100px',
        'cursor': 'not-allowed'
    });
}

/**
 * 第三方图片判断
 * @e img(图片)
 */
function is_third_pic(e) {
    let safe_img_src = web_url
    let temp_length = safe_img_src.length
    // 通过则说明为非法图片
    if (safe_img_src !== e.src.substr(0, temp_length)) {
        return true
    } else {
        return false
    }
}

// 图片路径处理
function pic_src_solve(e) {
    let temp = e
    return temp
}