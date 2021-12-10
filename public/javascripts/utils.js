/*
 * @Author: Ge junjie
 * @Description: All commen tools
 */

// 争对小屏幕(phone)
let arr = [screen.width, screen.height]
arr = arr.sort()

let is_mobile = false

// is_mobile == true ? 小屏幕设备 ： 大屏幕设备
if (arr[0] < 600) {
    is_mobile = true
}

let is_touch = false
if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    is_touch = true
}

//增加小模块的申请模块
function centerLeftTopButtonAdd(e) {
    if (!$('.toPerson>img')[0]) {
        //未登录
        noLogin()
        return
    }
    $('body').after('<div class="mask"></div>');
    $('.mask').after(`<div class="addsmallM_part">
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
        </div></div>
    <div class="addsmallM_part_reason">
        <div class="addsmallM_part_reason_part">
            <span id="reason">申请原因：(如审核通过，默认您为管理员)</span>
            <div id="reasonPart" onpaste="pasteRemoveCss(this)" contenteditable="true"></div>
        </div>
    </div>
    <div class="addsmallM_part_submit">
        <button id="addsmallM_submit">确认发送</button>
    </div>
</div>`);
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

    $(window).scrollTop('0px')

    $('.centerLeftBottom').html('');

    $('.addArticle').remove();

    $('.centerLeftTopButton>div:nth-child(2)').hide();

    if (!$('.navigation')[0]) {
        //不存在navigation
        if (is_touch) {
            //mobile
            $('.centerLeftTop').after(`<div style="background: #fdfdfd;padding: 2px;border-radius: 3px;width: 98%;margin: auto;position: sticky;top: 80px;z-index: 2;white-space: nowrap;overflow-x: scroll;" class="navigation"><span style="border-radius: 5px;background: #e7f9f5;color: #138bfb;margin: 3px 2px;padding: 0 5px;" bigMid="${$(e).attr('bigmid')}" class="navigation-bigM">${$(e).find('.bigMname').text()}</span></div>`);
            //进行小模块的搜索请求
            let data = $('.navigation-bigM').text()

            $.ajax({
                type: "post",
                url: "/smallModulesGet",
                data: {
                    name: data
                },
                success: function (response) {
                    for (let i = 0; i < response.length; i++) {
                        $('.navigation-bigM').after(`
                        <span onclick="smp(this)" style="border-radius: 5px;background: #ededed;color: #2a4d6d;margin: 3px 2px;padding: 0 5px;" class="navigation-smallM" id="${response[i].id}">${response[i].name}</span>
                        `);
                    }
                }
            });

        } else {
            //pc
            $('.centerLeftTop').append(`<div style="margin: 0 3px;" class="navigation"><span bigMid="${$(e).attr('bigmid')}" class="navigation-bigM">${$(e).find('.bigMname').text()}</span>><span class="navigation-smallM"></span></div>`);
        }
    } else {
        //存在navigation
        if (is_touch) {
            //mobile
            $('.navigation-smallM').remove();
            $('.navigation-bigM').text($(e).find('.bigMname').text()).attr('bigMid', $(e).attr('bigmid'));
            //进行小模块的搜索请求
            let data = $('.navigation-bigM').text()

            $.ajax({
                type: "post",
                url: "/smallModulesGet",
                data: {
                    name: data
                },
                success: function (response) {
                    for (let i = 0; i < response.length; i++) {
                        $('.navigation-bigM').after(`
                        <span onclick="smp(this)" style="border-radius: 5px;background: #ededed;color: #2a4d6d;margin: 3px 2px;padding: 0 5px;" class="navigation-smallM" id='${response[i].id}'>${response[i].name}</span>
                        `);
                    }
                }
            });
        } else {
            //pc
            $('.navigation-bigM').attr('bigMid', `${$(e).attr('bigmid')}`);
            $('.navigation-bigM').html(`${$(e).find('.bigMname').text()}`);
            $('.navigation-smallM').html(``);
        }
    }

    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>')

    $.ajax({
        type: "post",
        url: "mainApp/bigModule",
        data: {
            token: window.localStorage.token,
            bigModuleId: $(e).attr('bigmid'),
        },
        success: function (response) {
            $('.centerLeftBottom>.commentSection_wait').remove();
            if (response.articles.length == 0) {
                $('.navigation').after(`<div class="addArticle"><a class="addArticle-a"><div class="addArticle-word">空空如也，来添加第一篇文章吧</div><svg class="addArticle-icon" t="1617944956553" viewBox="0 0 1147 1024" version="1.1"  p-id="4251" width="200" height="200"><path fill="#707070" d="M0 956.865864 1146.877993 956.865864 1146.877993 1020.7232 0 1020.7232 0 956.865864ZM0 912.775537 300.529213 827.452006 85.868257 614.103613 0 912.775537ZM802.673951 328.370422 588.010209 115.019284 115.744481 584.378491 330.405437 797.708861 802.673951 328.370422ZM902.442885 149.154775 768.272343 15.818629C746.042941-6.277693 708.804076-5.074616 685.091594 18.484019L620.682076 82.476319 835.34721 295.826104 899.75255 231.814349C923.465032 208.254362 924.668109 171.253883 902.442885 149.154775Z" p-id="4252"></path></svg></a></div>`);
                // 进行创作中心入口的提示用户登录操作
                $('.addArticle').click(function (e) {
                    if ($('#loginButton')[0]) {
                        //未登录
                        noLogin()
                    } else {
                        location.href = 'https://www.shushuo.space/writer'
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
    //mobile
    if (is_touch) {
        $('.smallm_chosen').css('color', '#2a4d6d');
        $(e).css('color', '#ff7272');
        $(e).addClass('smallm_chosen');
        $('.contentSmallPart').remove();
        $('.addArticle').remove();
        $.ajax({
            type: "post",
            url: "mainApp/smallModule",
            data: {
                bigModuleId: $('.navigation-bigM').attr('bigmid'),
                smallModuleId: e.id,
                token: window.localStorage.token
            },
            success: function (response) {
                if (response.articles.length == 0) {
                    $('.navigation').after(`<div class="addArticle"><a class="addArticle-a"><div class="addArticle-word">空空如也，来添加第一篇文章吧</div><svg class="addArticle-icon" t="1617944956553" viewBox="0 0 1147 1024" version="1.1"  p-id="4251" width="200" height="200"><path fill="#707070" d="M0 956.865864 1146.877993 956.865864 1146.877993 1020.7232 0 1020.7232 0 956.865864ZM0 912.775537 300.529213 827.452006 85.868257 614.103613 0 912.775537ZM802.673951 328.370422 588.010209 115.019284 115.744481 584.378491 330.405437 797.708861 802.673951 328.370422ZM902.442885 149.154775 768.272343 15.818629C746.042941-6.277693 708.804076-5.074616 685.091594 18.484019L620.682076 82.476319 835.34721 295.826104 899.75255 231.814349C923.465032 208.254362 924.668109 171.253883 902.442885 149.154775Z" p-id="4252"></path></svg></a></div>`);
                    // 进行创作中心入口的提示用户登录操作
                    $('.addArticle').click(function (e) {
                        if ($('#loginButton')[0]) {
                            //未登录
                            noLogin()
                        } else {
                            location.href = 'https://www.shushuo.space/writer'
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
        return
    }

    $('.centerLeftBottom').html('');

    $('.backPast').hide();
    if ($('.addArticle')) {
        $('.addArticle').remove();
    }
    if ($('.contentSmallPart')) {
        $('.contentSmallPart').remove();
    }
    $('.centerLeftTopButton>div:nth-child(2)').hide();
    if (!$('.navigation')[0]) {
        //初始时不存在
        $('.centerLeftTop').append(`<div style="margin: 0 3px;" class="navigation"><span bigmid="${$(e).parents('.centerLeftTopButton').attr('bigmid')}" class="navigation-bigM">${$(e).parents('.centerLeftTopButton').find('.bigMname').text()}</span>><span smallMId="${e.id}" class="navigation-smallM">${e.innerText}</span></div>`);
    } else {
        //初始时存在
        $('.navigation-bigM').attr('bigmid', `${$(e).parents('.centerLeftTopButton').attr('bigmid')}`);
        $('.navigation-smallM').attr('smallmid', `${e.id}`);
        $('.navigation-bigM').html(`${$(e).parents('.centerLeftTopButton').find('.bigMname').text()}`);
        $('.navigation-smallM').html(`${e.innerText}`);
    }
    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
        $('.bigMmask').show();
        $('.mask02').remove();
    }

    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>')
    $.ajax({
        type: "post",
        url: "mainApp/smallModule",
        data: {
            bigModuleId: $(e).parents('.centerLeftTopButton').attr('bigmid'),
            smallModuleId: e.id,
            token: window.localStorage.token
        },
        success: function (response) {
            $('.centerLeftBottom>.commentSection_wait').remove();
            if (response.articles.length == 0) {
                $('.navigation').after(`<div class="addArticle"><a class="addArticle-a"><div class="addArticle-word">空空如也，来添加第一篇文章吧</div><svg class="addArticle-icon" t="1617944956553" viewBox="0 0 1147 1024" version="1.1"  p-id="4251" width="200" height="200"><path fill="#707070" d="M0 956.865864 1146.877993 956.865864 1146.877993 1020.7232 0 1020.7232 0 956.865864ZM0 912.775537 300.529213 827.452006 85.868257 614.103613 0 912.775537ZM802.673951 328.370422 588.010209 115.019284 115.744481 584.378491 330.405437 797.708861 802.673951 328.370422ZM902.442885 149.154775 768.272343 15.818629C746.042941-6.277693 708.804076-5.074616 685.091594 18.484019L620.682076 82.476319 835.34721 295.826104 899.75255 231.814349C923.465032 208.254362 924.668109 171.253883 902.442885 149.154775Z" p-id="4252"></path></svg></a></div>`);
                // 进行创作中心入口的提示用户登录操作
                $('.addArticle').click(function (e) {
                    if ($('#loginButton')[0]) {
                        //未登录
                        noLogin()
                    } else {
                        location.href = 'https://www.shushuo.space/writer'
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
    $(window).scrollTop('0px')
}
// 前端处理传回的token的方法 将token存入window.localStorage
function tokenWork(data) {
    if (data.isLogin == true || data.isReg == true || data.isCheck == true) {
        window.localStorage.token = data.token
        location.href = 'https://www.shushuo.space/'
    }
}
// 前端处理传回的token的方法 将token存入window.localStorage
function tokenWork_article(data) {
    if (data.isLogin == true || data.isReg == true || data.isCheck == true) {
        window.localStorage.token = data.token
    }
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

// 窗口滑动TOP按钮显示
function TopButtonShowHide() {
    let scrollt = $(window).scrollTop();
    if (scrollt > 200) {
        $(".Totop").fadeIn(400);
    } else {
        $(".Totop").stop().fadeOut(400);
    }
}

//图片加载失败的方法
function picError(e) {
    e.src = "data:image/png;base64,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"
    $(e).css({
        'width': 'unset',
        'max-width': '100px'
    });
    // 去除掉使用js绑定的鼠标点击事件，故以后迭代需要注意不要直接在img上添加点击事件
    $(e).unbind('click');
    $(e).removeAttr('onerror');
}

//增加蒙版模块/以及其他对每个小模块的公共事件
function firstFlush_hidden(data) {

    $('.contentSmallPart:nth(' + data + ')').append(`
    <div class="card loading">
        
    <div class="loading_content">
        <h4 class="loading_h4"></h4>
        <div class="loading_description">
        </div>
    </div>
</div>
    `)

    //增加蒙版的限制 需要在每篇文章内的图片均加载完成才进行增加蒙版的判断
    let imgs = $('.contentSmallPart:nth(' + data + ')>div[class=content]>div[class=innerContent]').find('img')

    let links = $('.contentSmallPart:nth(' + data + ')>div[class=content]>div[class=innerContent]').find('a')
    if (links.length !== 0) {
        for (let i = 0; i < links.length; i++) {
            $(links[i]).attr('target', '_blank');
            if (links[i].href.substr(0, location.href.length) !== location.href) {
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
            if ($('.contentSmallPart:nth(' + data + ')>div[class=content]>div[class=innerContent]')[0].offsetHeight == 200) {
                $('.contentSmallPart:nth(' + data + ')>div[class=content]>div[class=innerContent]').after('<div class="contentExploreMask"></div><div class="contentExploreButton" onclick="readAllButton(this)">阅读全文</div>');
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

            $(imgs[i]).attr('onerror', "picError(this)");

            let temp = 'https://www.shushuo.space/'
            let temp_str = $(imgs[i]).attr('src').substr(0, temp.length)

            if (($(imgs[i]).attr('src').substr(0, 5) !== '/pic/') && (temp !== temp_str)) {
                //非法图片
                $(imgs[i]).attr({
                    src: '0702',
                    means: '3rd'
                });
            }

            $(imgs[i]).css({
                'user-select': 'none',
                'cursor': 'zoom-in',
                'margin': 'auto',
                'position': 'relative',
                'display': 'block',
                'left': '0',
                'right': '0',
                'width': '50%'
            });

            $(imgs[i]).click(function (e) {
                e.stopPropagation()

                $('html').css({
                    'overflow': 'hidden',
                    'margin-right': window.innerWidth - $('body')[0].offsetWidth + 'px'
                });

                let temp_html = `
                <div class="img_bigshow_part">
                <a class="img_bigshow_part_down" href="${$(imgs[i]).attr('src')}" download>
                <svg t="1621226978872" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1902" width="200" height="200"><path d="M1024 645.248v330.752a48 48 0 0 1-48 48H48a48 48 0 0 1-48-48v-330.752a48 48 0 0 1 96 0V928h832v-282.752a48 48 0 0 1 96 0z m-545.152 145.984a47.936 47.936 0 0 0 67.904 0l299.904-299.84a48 48 0 1 0-67.968-67.904l-217.792 217.856V48a48.064 48.064 0 0 0-96.064 0v593.472L246.912 423.552a48 48 0 1 0-67.904 67.904l299.84 299.776z" p-id="1903" fill="#f1f3f4"></path></svg>
                </a>
                <span class="img_bigshow_part_round">
                <svg t="1638070345436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2306" width="200" height="200"><path d="M482.773333 66.517333l148.181334 151.168a21.333333 21.333333 0 0 1 0 29.866667l-147.84 150.826667a21.333333 21.333333 0 0 1-28.16 2.090666l-2.346667-2.090666-27.050667-27.605334a21.333333 21.333333 0 0 1 0-29.866666l69.888-71.338667a304.64 304.64 0 1 0 318.421334 352.682667l1.024-6.826667c0.170667-1.408 0.426667-3.285333 0.64-5.632a21.333333 21.333333 0 0 1 22.314666-19.114667l42.666667 2.261334a21.333333 21.333333 0 0 1 20.224 22.4l-0.085333 1.024-1.194667 10.496A389.973333 389.973333 0 1 1 484.821333 184.746667l-59.306666-60.458667a21.333333 21.333333 0 0 1 0-29.866667l27.093333-27.605333a21.333333 21.333333 0 0 1 30.165333-0.298667z" p-id="2307" fill="#f1f3f4"></path></svg>
                </span>
                ${$(imgs[i])[0].outerHTML}
                </div>
                `
                jump_window({}, temp_html)

                //防止点击按钮造成页面弹出
                $('.img_bigshow_part_down').click(function () {
                    window.event.stopPropagation()
                });

                //图片旋转函数
                let temp_degree = 0
                $('.img_bigshow_part_round').click(function () {
                    window.event.stopPropagation()
                    temp_degree += 90
                    $(this).siblings('img').css('transform', `rotate(${temp_degree}deg)`);
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
                    $(imgs[i]).show();
                    $(this).remove();
                    $('html').css({
                        'overflow': '',
                        'margin-right': ''
                    });
                });

                // 防止点击图片造成浏览退出
                $('.img_bigshow_part>img').click(function () {
                    window.event.stopPropagation()
                });

                $('.img_bigshow_part>img').attr('style', '');

                $('.img_bigshow_part>img').css({
                    'width': '70%',
                    'margin': 'auto',
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'right': '0',
                    'bottom': '0',
                    'user-select': 'none',
                    'cursor': 'default'
                });

                // 长图片的一些样式适配
                if ($('.img_bigshow_part>img').height() > $(window).height()) {

                    $('.img_bigshow_part').addClass('img_bigshow_part_long');

                    $('.img_bigshow_part>img').css({
                        'top': '0',
                        'left': '0',
                        'bottom': 'unset',
                        'right': '0'
                    });
                }

                $('.img_bigshow_part').css({
                    'overflow-y': 'auto',
                    'cursor': 'pointer'
                });

            });

            imgs[i].onload = function () {

                j = j + 1

                if (j == imgs.length) {
                    setTimeout(() => {
                        //所有均渲染好
                        $('.contentSmallPart:nth(' + data + ')').find('.card').remove();
                        $('.contentSmallPart:nth(' + data + ')>*').show();

                        //携带图片的增加蒙版模式
                        if ($('.contentSmallPart:nth(' + data + ')>div[class=content]>div[class=innerContent]')[0].offsetHeight == 200) {
                            $('.contentSmallPart:nth(' + data + ')>div[class=content]>div[class=innerContent]').after('<div class="contentExploreMask"></div><div class="contentExploreButton" onclick="readAllButton(this)">阅读全文</div>');
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

//粗略阅读全文事件
function readAllButton(e) {

    //存在过被打开的文章    之后需要对模块进行初始化
    $('.contentExploreButton_close').remove();
    $('.innerContent').css('max-height', '200px');
    $('.contentExploreButton').show();
    $('.contentExploreMask').show();
    $('.contentSmallPart').css({
        'box-sizing': '',
        'border': ''
    });

    let scroll01 = $(window).scrollTop()

    let num = scroll01 + $(e).parents('.contentSmallPart')[0].getBoundingClientRect().top - $('.top')[0].clientHeight;

    if (is_mobile) {
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
        'border': '2px solid #03a9f4'
    });

    $(e).hide();
    $(e).siblings('.contentExploreMask').hide();
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
    $(e).parents('.contentSmallPart').css({
        'box-sizing': '',
        'border': ''
    });
    $(e).parents('.contentSmallPart').find('.contentExploreMask').show()
    $(e).parents('.contentSmallPart').find('.contentExploreButton').show()
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
                                <span id="${response.articles[i].writerId}" class="contentSmallPartTopSmall contentSmallPartHead" onclick="toUserMainPage(this)"><img onerror=\'picError(this)\' onerror=\'picError(this)\' src="/head/${response.articles[i].writerHead == "NaN.png" ? "staticIMG/NaN.png" : response.articles[i].writerHead}" alt=""></span>
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
    if (!$('.toPerson>img')[0]) {
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
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) + 1}`);

                    $(e).siblings('#unlike').find('path').attr('fill', '#bfbfbf');
                    $(e).siblings('#unlike').find('p').text(Number($(e).find('p').text()) - 1);
                } else {

                    // 取消点赞
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) - 1}`);
                }
            } else {

                // 正常的点赞
                if (response.isLike == true) {

                    // 点赞成功
                    $(e).find('path').attr('fill', '#138bfb');
                    $(e).find('p').text(Number($(e).find('p').text()) + 1);
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) + 1}`);
                } else {

                    // 取消点赞
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) - 1}`);
                }
            }
        }
    });
}
//点赞
function like_person(e) {
    if (!$('#userHead>img')[0]) {
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
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) + 1}`);

                    $(e).siblings('#unlike').find('path').attr('fill', '#bfbfbf');
                    $(e).siblings('#unlike').find('p').text(Number($(e).find('p').text()) - 1);
                } else {

                    // 取消点赞
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) - 1}`);
                }
            } else {

                // 正常的点赞
                if (response.isLike == true) {

                    // 点赞成功
                    $(e).find('path').attr('fill', '#138bfb');
                    $(e).find('p').text(Number($(e).find('p').text()) + 1);
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) + 1}`);
                } else {

                    // 取消点赞
                    $(e).find('path').attr('fill', '#bfbfbf');
                    $(e).find('p').text(Number($(e).find('p').text()) - 1);
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) - 1}`);
                }
            }
        }
    });
}

//踩一下
function unlike(e) {
    if (!$('.toPerson>img')[0]) {
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
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) - 1}`);
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
//踩一下
function unlike_person(e) {
    if (!$('#userHead>img')[0]) {
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
                    $('.centerRightTopPart1_number').html(`${Number($('.centerRightTopPart1_number').text()) - 1}`);
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
    if (!$('.toPerson>img')[0]) {

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
                $('.centerRightTopPart2_number').html(`${Number($('.centerRightTopPart2_number').text()) + 1}`);
            } else {
                $(e).find('path').attr('fill', '#bfbfbf')
                $('.centerRightTopPart2_number').html(`${Number($('.centerRightTopPart2_number').text()) - 1}`);
            }
        }
    });
}
// 收藏内容按钮
function collect_person(e) {
    if (!$('#userHead>img')[0]) {
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
                $('.centerRightTopPart2_number').html(`${Number($('.centerRightTopPart2_number').text()) + 1}`);
            } else {
                $(e).find('path').attr('fill', '#bfbfbf')
                $('.centerRightTopPart2_number').html(`${Number($('.centerRightTopPart2_number').text()) - 1}`);
            }
        }
    });
}

//分享按钮
function share(e) {
    $(e).append(`<input readonly="readonly" style="text-indent: 0;background: transparent;border: 0 none;resize:none;outline:none;-webkit-appearance:none;line-height: normal;position: fixed;width: 1px;top: 0;height: 1px;">`);
    let temp = $(e).find('input')[0];
    temp.value = `https://www.shushuo.space/article?articleId=${$(e).parents('.contentSmallPart').find('.contentSmallPartTop').attr('articleId')}`
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
    if ($('.toPerson>img')[0]) {
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
//举报按钮
function report_person(e) {
    window.event.stopPropagation()
    if ($('#userHead>img')[0]) {
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
            $(e).parents('.contentSmallPart').find('.commentSectionArea').html(`<div class="othersComment"><div><span class="othersComment_number">0</span> 条评论</div><div class="Comments"><section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section></div></div><div class="CommentInputArea"><div><span><span onpaste="pasteRemoveCss(this)" contenteditable="true" id="commentContent"></span></span></div><div><div><span class="commentSubmit" onclick="commmentSubmit(this)">发&nbsp布</span></div></div></div>`)

            $(e).parents('.contentSmallPart').find('#commentContent').keydown(function (e) {
                if (e.keyCode === 13) {
                    document.execCommand('insertHTML', false, '<br></br>')
                    return false
                }
            });

            if (data.comment.length == 0) {
                //评论数为0
                $(e).parents('.contentSmallPart').find('.Comments').prepend(`<div class="commentWhite">空空如也，快来评论吧！</div>`);
            } else {
                //二次评论计数器
                let num1 = 0

                for (let i = 0; i < data.comment.length; i++) {
                    $(e).parents('.contentSmallPart').find('.Comments').append(`
                    <div class="Comments_small">
                        <img onerror=\'picError(this)\' onclick="head_to_detail(this)" src="/head/${data.comment[i].headimg == "NaN.png" ? "staticIMG/NaN.png" : data.comment[i].headimg}" id="${data.comment[i].comUserId}" class="Comments_small_head">
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
                            <img onerror=\'picError(this)\' onclick="head_to_detail(this)" src="/head/${data.comment[i].secComments[j].comUserHead == "NaN.png" ? "staticIMG/NaN.png" : data.comment[i].secComments[j].comUserHead}" id="${data.comment[i].secComments[j].comUserId}" class="Comments_small_head">
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
                $(e).parents('.contentSmallPart').find('.othersComment_number').html(`${data.comment.length+num1}`);
            }
            // 去除缓存特效
            $(e).parents('.contentSmallPart').find('.commentSection_wait').remove();
        }, 200);

    } else {
        //关闭评论区
        $(e).attr('isopen', 'false')
        $(e).find('path').attr('fill', '#bfbfbf')
        $(e).parents('.contentSmallPart').find('.commentSection').remove();
    }
}

// 评论上传功能
function commmentSubmit(e) {
    if ($(e).parents('.CommentInputArea').find('#commentContent').text().replace(/\s*/g, "").length == 0) {
        alert('请输入评论')
        return
    }
    let subcontent = $(e).parents('.commentSectionArea').find('#commentContent').html().replace(/<br>/gi, '\n')
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
                <img onerror=\'picError(this)\' src="${$('.toPerson').find('img').attr('src')}" class="Comments_small_head">
                <span class="Comments_small_name">${xssFilter($('.toPerson').attr('userName'))}：</span>
                <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(subcontent)}</div>
                <div commentId="${response.commentId}" class="firstComment">
                    <span class="Comments_small_comment" style="cursor:pointer;" onclick="secondComment(this)">回复</span>
                    <span class="Comments_small_time">${timeSet(response.time)}</span>
                </div>
            </div>
                `);
                $(e).parents('.commentSectionArea').find('#commentContent').html('');
                $(e).parents('.commentSectionArea').find('.othersComment_number').html(`${Number($(e).parents('.commentSectionArea').find('.othersComment_number').text())+1}`);
                $('.centerRightTopPart3_number').html(`${Number($('.centerRightTopPart3_number').text()) + 1}`);

                $(e).append('<div style="position: fixed;z-index: 10000000000; top: 53px; right: 0; width: auto; background-color: rgb(255 77 77); font-size: 12px; text-align: center; line-height: 30px; height: 30px; font-weight: bold; color: #feeded; border-radius: 5px;">评论成功<div>');
                setTimeout(() => {
                    $(e).find('div').remove();
                }, 4000);
            }
        }
    });
}
// 评论上传功能
function commmentSubmit_article(e) {
    if ($(e).parents('.CommentInputArea').find('#commentContent').text().replace(/\s*/g, "").length == 0) {
        alert('请输入评论')
        return
    }
    let subcontent = $(e).parents('.commentSectionArea').find('#commentContent').html().replace(/<br>/gi, '\n')
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
                <img onerror=\'picError(this)\' src="${$('#userHead').find('img').attr('src')}" class="Comments_small_head">
                <span class="Comments_small_name">${xssFilter($('#userHead').find('img').attr('username'))}：</span>
                <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(subcontent)}</div>
                <div commentId="${response.commentId}" class="firstComment">
                    <span class="Comments_small_comment" style="cursor:pointer;" onclick="secondComment(this)">回复</span>
                    <span class="Comments_small_time">${timeSet(response.time)}</span>
                </div>
            </div>
                `);
                $(e).parents('.commentSectionArea').find('#commentContent').html('');
                $(e).parents('.commentSectionArea').find('.othersComment_number').html(`${Number($(e).parents('.commentSectionArea').find('.othersComment_number').text())+1}`);
                $('.centerRightTopPart3_number').html(`${Number($('.centerRightTopPart3_number').text()) + 1}`);

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
    if (!$('.toPerson>img')[0]) {
        //未登录
        noLogin()
        return
    }
    window.open(`/person?userId=${$('.toPerson').attr('id')}&&way=${$(e).attr('id')}`)
}

//person页面详情点击按钮
function getDetail(e) {
    window.open(`https://www.shushuo.space/article?articleId=${$(e).parents('.article_smallCard').attr('articleid')}`)
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
                    location.href = 'https://www.shushuo.space/'
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
            <div class="articleChange"><a href="/writer?articleChange&&articleId=${$(e).parents('.article_smallCard').attr('articleid')}">编辑</a></div>
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
                    location.href = 'https://www.shushuo.space/'
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
                    location.href = 'https://www.shushuo.space/'
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

//适配手机端的点击功能
function bigMmask(e) {
    if (!is_touch) {
        $(e).hide();
        $(e).siblings('.centerLeftTopButton_smallbuttons').show().css('z-index', '3');
        $('.centerLeftTop').after('<div class="mask02"></div>');
        $('.mask02').click(function () {
            $(e).show();
            $(e).siblings('.centerLeftTopButton_smallbuttons').hide().css('z-index', '');
            $('.mask02').remove();
            window.event.stopPropagation()
        });
        window.event.stopPropagation()
    }
}

//二级评论
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

//首页二级评论
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
                        <img onerror=\'picError(this)\' src="/head/${response.comUserHead == "NaN.png" ? "staticIMG/NaN.png" : response.comUserHead}" class="Comments_small_head">
                        <span class="Comments_small_name">${xssFilter(response.comUserName)}：</span>
                        <div style="white-space: pre-line;margin-left: 20px;">${xssFilter(subContent)}</div>
                        <div commentid="${response.id}" class="firstComment">
                        <span class="Comments_small_time">${timeSet(response.time)}</span>
                        </div>
                        </div>
                        `)
                $(e).parents('.commentSectionArea').find('.othersComment_number').html(`${Number($(e).parents('.commentSectionArea').find('.othersComment_number').text())+1}`)
                $('.centerRightTopPart3_number').html(`${Number($('.centerRightTopPart3_number').text()) + 1}`);
            }
            $(e).parents('.commentSectionArea').find('#commentContent').html('')
            if (window.location.href == 'https://www.shushuo.space/') {
                $(e).attr('onclick', 'commmentSubmit(this)');
            } else {
                $(e).attr('onclick', 'commmentSubmit_article(this)');
            }
        }
    });
}

//点击进入小头像进入用户主页模块
function toUserMainPage(e) {
    if (!$('.toPerson>img')[0]) {
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
                    location.href = 'https://www.shushuo.space/'
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
    if (!(document.querySelector('#loginButton') === null)) {
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
                                    <img onerror=\'picError(this)\' src="/head/${response.user_search[i].headImg == "NaN.png" ? "staticIMG/NaN.png" : response.user_search[i].headImg}" class="user_small_main_img">
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
                        let b = 'staticIMG/NaN.png'
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
                                       ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\' src='/head/"+a(i)+"'>"}
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
                        <a target="_blank" href="https://www.shushuo.space/article?articleId=${response.article_search[i].articleId}">
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

    if (!$('.toPerson>img')[0]) {
        //未登录
        noLogin()
        return
    }

    let temp_html = `
                    <span class="notice_part_span"></span>
                    <div class="notice_part">
                     <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
                     </div>`
    if (is_mobile) {
        temp_html = `
        <div style="z-index: 2;" class='mask'></div>
        <div class="notice_part">
        <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
        </div>
        `
    }

    let temp_css = {
        'position': 'fixed',
        'top': `${$('.top').height()}px`,
        'right': '0',
        'z-index': '1'
    }
    if (is_mobile) {
        temp_css = {}
    }

    jump_window(temp_css, temp_html)

    let temp_left = $('.notice')[0].getBoundingClientRect().right - $('.notice').width() / 2 - 10

    if (!is_mobile) {
        $('.notice_part_span').css({
            'position': 'fixed',
            'left': `${temp_left}px`
        });
        $('#jump_window').css('left', `${temp_left-$('#jump_window').width()+20}px`);
        $('.notice_part').css('border-top-right-radius', '0');
    } else {
        $('.notice_part').css('top', `${$('.top').height()}px`);
        $('.mask').click(function (e) {
            $('#jump_window').html('');
        });
    }

    $('.notice_part').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('.head').css('z-index', 0);

    $.ajax({
        type: "post",
        url: "/mainApp/webNotice",
        data: {
            token: window.localStorage.token,
            type: 'webNoticeDetail'
        },
        success: function (response) {
            if (response.isLogin == false) {
                window.location.href = 'https://www.shushuo.space/'
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
            if (!is_mobile) {
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
                window.location.href = 'https://www.shushuo.space/'
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
                window.location.href = 'https://www.shushuo.space/'
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
                window.location.href = 'https://www.shushuo.space/'
                return
            }
            if (response.isCheck == true) {
                $('#jump_window').html('');
                if (!is_mobile) {
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
                <span style='font-weight: bold;font-size: 17px;'>评论</span>了您的文章
                <span style='font-weight: bold;font-size: 17px;'>《${xssFilter(data.articleName)}》</span>`
            break;
        default:
            break;
    }
    return a
}
// 信箱点击事件
function messageClick(e) {

    e.stopPropagation()

    if (!$('.toPerson>img')[0]) {
        //未登录
        noLogin()
        return
    }

    let temp_html = `
    <span class="message_part_span"></span>
    <div class="message_part"><section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section></div>`
    if (is_mobile) {
        temp_html = `
        <div style="z-index: 2;" class='mask'></div>
        <div class="message_part">
        <section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>
        </div>
        `
    }
    let temp_css = {
        'position': 'fixed',
        'top': `${$('.top').height()}px`,
        'z-index': '1'
    }
    if (is_mobile) {
        temp_css = {}
    }

    jump_window(temp_css, temp_html)

    let temp_left = $('.message')[0].getBoundingClientRect().right - $('.message').width() / 2 - 10

    if (!is_mobile) {
        $('.message_part_span').css({
            'position': 'fixed',
            'left': `${temp_left}px`
        });
        $('#jump_window').css('left', `${temp_left-$('#jump_window').width()+20}px`);
        $('.message_part').css('border-top-right-radius', '0');
    } else {
        $('.message_part').css('top', `${$('.top').height()}px`);
        $('.mask').click(function (e) {
            $('#jump_window').html('');
        });
    }

    $('.message_part').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('.head').css('z-index', 0);

    $.ajax({
        type: "post",
        url: "/mainApp/webEmail",
        data: {
            token: window.localStorage.token,
            type: 'webEmailDetail'
        },
        success: function (response) {
            if (response.isLogin == false) {
                window.location.href = 'https://www.shushuo.space/'
                return
            }

            $('#message_number').html(response.length);

            $('.message_part').append(`
            <div style='display:none;' class="message_part_small message_part_top">
              <span>信息(${response.length})</span>
              <span>
                <div onclick="notSingleCheck_email(this)">全部已读</div>
              </span>
            </div>
            </div>
            <div style='display:none;' class="message_part_small message_part_bottom"></div>
            `);

            if (!is_mobile) {
                $('.message_part_top').css('border-top-right-radius', '0');
            }

            for (let i = 0; i < response.length; i++) {
                $('.message_part_bottom').prepend(`
                <div class="pcTouch02 message_part_bottom_small" type="${response[i].type}">
                    <div class="message_part_bottom_part_time">${timeSet(response[i].time)}</div>
                    <div articleId="${response[i].articleId}" class="message_part_bottom_part_content">${messageCreate(response[i])}</div>
                </div>
                `);
                $('.message_part_bottom_part_content:nth(' + i + ')').data({
                    '_id': response[i]._id,
                    'type': response[i].type,
                });
            }
            $('.message_part_small').show();
            $('.commentSection_wait').remove();

        }
    });

}

// number to 99+
function numEasy(data) {
    if (data > 100 || data == 100) {
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
    if (!$('.toPerson>img')[0]) {

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

    if (!$('.toPerson>img')[0]) {

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

    let temp_html = `<div class="logReg"><div><div class="waitChange"><div class="logByAcc" name="账号登录？"><div><div><div><span>账号：</span><span><div><input type="text" id="userName"></div></span></div></div></div><div><div><div><span>密码：</span><span><div><input type="password" autocomplete="new-password"  id="passWord"></div></span><a href="/findPassword">忘记密码？</a></div></div></div></div></div><div class="ChangeButton"><div><span>邮箱登录？</span><span>/</span><span>注册？</span></div></div></div><div><div id="logRegButton">登 录</div></div></div>`

    jump_window({}, temp_html)

    //以下为弹窗内部实际业务代码 与 弹窗代码结构无关

    //登录 注册功能切换模块
    $('.ChangeButton>div>span:nth-child(1),.ChangeButton>div>span:nth-child(3)').click(function () {
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
                        success: function (response) {
                            tokenWork(response)
                        }
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
                        success: function (response) {
                            tokenWork(response)
                        }
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
                        tokenWork(response)
                        if (response.isLogin == false) {
                            alert('请检查账户或密码')
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
                        tokenWork(response)
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
                        tokenWork(response)
                        if (response.isLogin == false) {
                            alert('请检查邮箱或验证码')
                        }
                    }
                });
                break;
            default:
                break;
        }
    });
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
                    <img onerror=\'picError(this)\'  class="article_small_imgpart_img" src="${$('.article_small_color:nth(' + i + ')').find('img')[1].src.substr(0, location.href.length)==location.href?$('.article_small_color:nth(' + i + ')').find('img')[1].src:0702}">
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
        <img onerror=\'picError(this)\'  class="article_small_imgpart_img" src="${$('.article_small_color:nth(' + i + ')').find('img')[0].src.substr(0, location.href.length)==location.href?$('.article_small_color:nth(' + i + ')').find('img')[0].src:0702}">
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