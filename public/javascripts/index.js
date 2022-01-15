/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

$(document).ready(async function () {

    $('.index_content').append(`
    <div onmouseover="$('#uiSetFree>svg').css('animation', 'rotate 0.5s linear');" onmouseout="$('#uiSetFree>svg').css('animation', 'unset');" onclick="uiSetFree(this)" id="uiSetFree">
        <svg viewBox="0 0 1024 1024">
            <path d="M450.8 932.8L175.4 775.4c-38.6-22.1-62.4-62.9-62.4-107.1V354c0-44.2 23.8-85 62.4-107.1L450.8 89.5c38.5-22 85.8-22 124.3 0l275.4 157.4C889.2 269 913 309.8 913 354v314.2c0 44.2-23.8 85-62.4 107.1L575.2 932.8c-38.5 22-85.9 22-124.4 0z" fill="#37AFFA"></path><path d="M118.7 317.1c7.6-15.5 16.1-30.5 25.5-44.9-11.6 13-20.3 28.3-25.5 44.9zM585.5 95.4l-10.3-5.9c-36.2-20.7-80.3-21.9-117.4-3.7 10.9-0.9 22-1.3 33.1-1.3 32.5 0.1 64.2 3.8 94.6 10.9zM113 668.3c0 44.2 23.8 85 62.4 107.1l16.6 9.5c-32.6-34-59.4-73.6-79-117.1v0.5zM913 668.3V354c0-44.2-23.8-85-62.4-107.1l-60.8-34.7c71.2 74.3 115 175.2 115 286.3 0 228.6-185.3 413.9-413.9 413.9-32.6 0-64.3-3.8-94.7-10.9l54.7 31.2c38.5 22 85.8 22 124.3 0l275.4-157.4c38.6-22 62.4-62.8 62.4-107z" fill="#37AFFA"></path><path d="M904.8 498.5c0-111.1-43.8-211.9-115-286.3L585.5 95.4c-30.4-7.1-62-10.9-94.6-10.9-11.1 0-22.2 0.4-33.1 1.3-2.3 1.1-4.6 2.4-6.9 3.7l-85.6 48.9c34.1-10.8 70.3-16.6 108-16.6 197.3 0 357.2 159.9 357.2 357.2s-160 357.3-357.3 357.3S116 676.3 116 479c0-105.8 46-200.8 119-266.2l-59.6 34.1c-11.9 6.8-22.4 15.4-31.2 25.3-9.4 14.4-17.9 29.3-25.5 44.9-3.7 11.8-5.7 24.2-5.7 36.9v313.7c19.5 43.6 46.4 83.1 79 117.1l204.2 116.7c30.4 7.1 62.1 10.9 94.7 10.9 228.6 0 413.9-185.3 413.9-413.9z" fill="#41B6FB"></path><path d="M116 479c0 197.3 159.9 357.2 357.2 357.2S830.5 676.3 830.5 479s-160-357.2-357.3-357.2c-37.6 0-73.9 5.8-108 16.6L235 212.9C162 278.3 116 373.3 116 479z m339.6-319.9c166 0 300.5 134.5 300.5 300.5S621.6 760.1 455.6 760.1 155.1 625.6 155.1 459.6s134.6-300.5 300.5-300.5z" fill="#4CBCFC"></path><path d="M455.6 760.1c166 0 300.5-134.5 300.5-300.5S621.6 159.1 455.6 159.1 155.1 293.6 155.1 459.6s134.6 300.5 300.5 300.5zM438 196.4c134.6 0 243.8 109.1 243.8 243.8S572.6 683.9 438 683.9 194.2 574.8 194.2 440.1 303.4 196.4 438 196.4z" fill="#56C3FD"></path><path d="M438 683.9c134.6 0 243.8-109.1 243.8-243.8S572.6 196.4 438 196.4 194.2 305.5 194.2 440.1 303.4 683.9 438 683.9z m-17.6-450.3c103.3 0 187.1 83.7 187.1 187.1s-83.7 187.1-187.1 187.1S233.3 524 233.3 420.7s83.8-187.1 187.1-187.1z" fill="#60C9FD"></path><path d="M420.4 607.7c103.3 0 187.1-83.7 187.1-187.1s-83.7-187.1-187.1-187.1-187.1 83.7-187.1 187.1 83.8 187.1 187.1 187.1z m-17.7-336.8c72 0 130.3 58.4 130.3 130.3s-58.4 130.3-130.3 130.3-130.3-58.4-130.3-130.3 58.4-130.3 130.3-130.3z" fill="#6BCFFE"></path><path d="M402.7 401.2m-130.3 0a130.3 130.3 0 1 0 260.6 0 130.3 130.3 0 1 0-260.6 0Z" fill="#75D6FF"></path><path d="M513 91.1c18.7 0 37.1 4.9 53.2 14.1l275.4 157.4c32.9 18.8 53.3 53.9 53.3 91.5v314.2c0 37.6-20.4 72.7-53.3 91.5L566.2 917.2c-16.2 9.2-34.6 14.1-53.2 14.1-18.7 0-37.1-4.9-53.2-14.1L184.3 759.8C151.4 741 131 705.9 131 668.3V354c0-37.6 20.4-72.7 53.3-91.5l275.5-157.4c16.1-9.2 34.5-14 53.2-14m0-18c-21.5 0-42.9 5.5-62.2 16.5L175.4 246.9C136.8 269 113 309.8 113 354v314.2c0 44.2 23.8 85 62.4 107.1l275.4 157.4c19.2 11 40.7 16.5 62.2 16.5s42.9-5.5 62.2-16.5l275.4-157.4c38.6-22.1 62.4-62.9 62.4-107.1V354c0-44.2-23.8-85-62.4-107.1L575.2 89.5c-19.3-10.9-40.7-16.4-62.2-16.4z" fill="#37AFFA"></path><path d="M483.3 712.1l-131.7-75c-18.5-10.5-29.8-30-29.8-51V436.3c0-21.1 11.4-40.5 29.8-51l131.7-75c18.4-10.5 41-10.5 59.4 0l131.7 75c18.5 10.5 29.8 30 29.8 51V586c0 21.1-11.4 40.5-29.8 51l-131.7 75c-18.4 10.6-41 10.6-59.4 0.1z" fill="#B9E8FF"></path><path d="M172.2 417.5c-9.9 0-18-8.1-18-18V361c0-29.2 14.8-55.9 39.7-71.3l34.6-21.5c8.5-5.2 19.5-2.6 24.8 5.8 5.2 8.5 2.6 19.5-5.8 24.8l-34.6 21.5c-14.2 8.8-22.7 24-22.7 40.7v38.5c0 9.9-8.1 18-18 18zM172.2 487.1c-9.9 0-18-8.1-18-18v-10.5c0-9.9 8.1-18 18-18s18 8.1 18 18v10.5c0 9.9-8.1 18-18 18z" fill="#FFFFFF"></path>
        </svg>
    </div>
    `);
    // 针对所有触屏设备(pc,phone,ipad)

    if (is_touch_client) {
        $('.head').css({
            'position': 'fixed',
            'right': '0'
        });
        $('.notice').css({
            'position': 'fixed',
            'right': '100px'
        });
        $('.message').css({
            'position': 'fixed',
            'right': '50px'
        });
    }

    if (is_small_client) {

        // 搜索按钮的适配
        $('#searchPartInput_search').hide();
        $('#searchPartInput_search').after(`
        <span id="searchPartInput_search_fake">
            <svg viewBox="0 0 1024 1024">
                <path d="M407.9 98.2c-170.7 0-309 138.3-309 309s138.3 309 309 309 309-138.3 309-309c0-170.6-138.3-309-309-309z m0 564c-140.8 0-255-114.2-255-255s114.2-255 255-255 255 114.2 255 255-114.2 255-255 255zM602.3 615.9c-7.7 7.8-7.6 20.6 0.2 28.3l274.1 270.1c7.8 7.7 20.6 7.6 28.3-0.2l8-8.1c7.7-7.8 7.6-20.6-0.2-28.3L638.6 607.5c-7.8-7.7-20.6-7.6-28.3 0.2l-8 8.2z" fill="#138bfb" class="searchPartInputIconKEY">
                </path>
            </svg>
        </span>`);

        $('.searchPartInput>span>input').remove();
        $('#searchPartInput_search').remove();

        $('#searchPartInput_search_fake').click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            let temp_html = `
            <div style="z-index: 2;" class="mask"></div>
            <div style="z-index: 2;" class="searchpart_mobile"><div class="search_base_value_father"><input type="search" placeholder="用户/文章" id="search_base_value"></div><span id="searchPartInput_search_mobile"><svg viewBox="0 0 1024 1024"><path d="M407.9 98.2c-170.7 0-309 138.3-309 309s138.3 309 309 309 309-138.3 309-309c0-170.6-138.3-309-309-309z m0 564c-140.8 0-255-114.2-255-255s114.2-255 255-255 255 114.2 255 255-114.2 255-255 255zM602.3 615.9c-7.7 7.8-7.6 20.6 0.2 28.3l274.1 270.1c7.8 7.7 20.6 7.6 28.3-0.2l8-8.1c7.7-7.8 7.6-20.6-0.2-28.3L638.6 607.5c-7.8-7.7-20.6-7.6-28.3 0.2l-8 8.2z" fill="#2680F0" class="searchPartInputIconKEY"></path></svg></span></div>
            `

            jump_window({}, temp_html)

            let temp_search_data = window.localStorage.search
            if (temp_search_data !== undefined) {
                // login status will build the list
                temp_search_data = JSON.parse(temp_search_data)
                if (temp_search_data.length !== 0) {
                    // data is not 0 , we can show the list
                    $('#searchPartInput_search_mobile').after(`
                    <div class="searchPartInput_searchlist">
                            <div class="searchPartInput_searchlist_sma_word">搜索记录：</div>
                            <div class="searchPartInput_searchlist_sma_clear">清空列表</div>
                    </div>
                    `);
                    for (let i = 0; i < temp_search_data.length; i++) {
                        $('.searchPartInput_searchlist_sma_clear').after(`
                        <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${temp_search_data[i].name}</div>
                        `);
                    }

                    //进行phone端的清空列表绑定事件
                    $('.searchPartInput_searchlist_sma_clear').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('#jump_window').html('');
                        $('body').unbind();

                        $.ajax({
                            type: "post",
                            url: "/mainApp/searchRemove",
                            data: {
                                token: window.localStorage.token
                            },
                            success: function (response) {
                                if (response.isDelete == true) {

                                    $(window).unbind('keydown');
                                    window.localStorage.search = JSON.stringify([])

                                }
                            }
                        });

                    });
                }
            }

            $('#searchPartInput_search_mobile').click(function (e) {
                e.preventDefault();
                e.stopPropagation();


                if ($('#search_base_value').val().trim().length == 0) {
                    alert('请输入有效信息')
                    return
                }

                //滚动条回到顶部
                $(window).scrollTop('0px');

                //前端对已登录用户进行搜索记录存储
                if (window.localStorage.search !== undefined) {
                    let data = JSON.parse(window.localStorage.search)
                    data.push({
                        name: $('#search_base_value').val()
                    })
                    window.localStorage.search = JSON.stringify(data)
                    $('.searchPartInput_searchlist_sma_clear').after(`
                    <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter($('#search_base_value').val())}</div>
                    `);
                }

                $('.centerLeftBottom').html('');
                $('.centerLeftBottom').prepend(`<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>`);

                $('#search_base_value').val($('#search_base_value').val().trim());

                $.ajax({
                    type: "post",
                    url: "/mainApp/search",
                    data: {
                        token: window.localStorage.token,
                        name: $('#search_base_value').val().trim()
                    },
                    success: function (response) {
                        $('.navigation').remove();
                        $('.addArticle').remove();
                        $('.centerLeftBottom>.commentSection_wait').remove();
                        $('.centerLeftBottom').append(`
                        <div class="centerLeftBottom_show" >
                            <div class="navigation">
                                <span class="navigation_search">搜索结果：
                                    <span class='navigation_search_number navigation_search_user_button'>用户(${response.user_search.length>90?'99+':response.user_search.length})</span>
                                    <span class='navigation_search_number navigation_search_article_button'>文章(${response.article_search.length>90?'99+':response.article_search.length})</span>
                                </span>
                            </div>
                        </div>`);

                        $('.navigation_search_user_button').click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $('.centerLeftBottom_article_line').hide();
                            $('.article_small_color').hide();

                            $('.centerLeftBottom_user_line').show();
                            $('.user_small').show();
                        });

                        $('.navigation_search_article_button').click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $('.centerLeftBottom_user_line').hide();
                            $('.user_small').hide();

                            $('.centerLeftBottom_article_line').show();
                            $('.article_small_color').show();
                        });

                        $('.navigation_search').click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $('.centerLeftBottom_user_line').show();
                            $('.user_small').show();

                            $('.centerLeftBottom_article_line').show();
                            $('.article_small_color').show();
                        });

                        if (response.user_search.length !== 0) {
                            $('.navigation').after(`
                <div class="centerLeftBottom_user_line">用户</div>
                `);
                            for (let i = 0; i < response.user_search.length; i++) {
                                $('.centerLeftBottom_user_line').after(`
                    <div class="contentSmallPart user_small">
                    <div>
                        <div class="user_small_main">
                            <span>
                                <a id ='${response.user_search[i].id}' onclick="head_to_detail(this)">
                                    <img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src="${zip_dir}${response.user_search[i].headImg}" class="user_small_main_img">
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

                        if (response.article_search.length !== 0) {
                            $('.centerLeftBottom_show').append(`
                <div class="centerLeftBottom_article_line">文章</div>
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
                                       ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src='"+zip_dir+a(i)+"'>"}
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
                        <div onclick='window.open("${web_url}article?articleId=${response.article_search[i].articleId}")' style='cursor:pointer;min-height: 100px;'>
                            <div style="display: block;" class="content">
                                <div class="article_small" style="display:none;">
                                    ${response.article_search[i].articleContent}
                                </div>
                                <div>
                                    <a class="contentExploreMask_article_contentExploreButton">阅读全文</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);

                                searchCommen(i)

                                $('.article_small_color:nth(' + i + ')').find('.article_small').show();

                            }
                        }

                        if (response.article_search.length == 0 && response.user_search.length == 0) {
                            $('.centerLeftBottom_show').html(`<div class="search_empty">对不起，俺找遍了整片森林也没找到ta呐 /(ㄒoㄒ)/~~~~</div>`);
                        }

                        $(window).unbind('keydown');
                        $('#jump_window').html('');
                    }

                });

            });

            $('.mask').click(function (e) {
                $('#jump_window').html('');
                $('body').unbind();
            });

        });

        // 对于小屏幕设备直接就把 通知、信箱模块 去除
        $('.notice,.message').remove();

    } else {
        // 退后操作对颜色进行的适配
        if ($("#search_base_value")[0].value !== "") { //没有输入搜索信息
            $(".searchPartInputIconKEY").attr('fill', "#2680F0");

            $('.searchPartInput>span').css({
                "border-color": "rgb(3, 169, 244)"
            });
        }
    }

    //token登录
    await $.ajax({
        type: "post",
        url: "/isLogin",
        data: {
            token: window.localStorage.token
        },
        success: function (response) {
            if (response.isLogin == true) {
                //登录成功 更新本地资源

                // 上一次登陆时间
                $('.webInfors').prepend(`<div class="finLogTime"> <span>LAST LOGIN:</span><span class="finLogTime_number">${timeSet(response.user.userFinLog)}</span></div>`);

                // 点赞 收藏 评论 文章 的数据值
                $('.centerRightTopPart1_number').html(`${numEasy(response.user.number1)}`);
                $('.centerRightTopPart2_number').html(`${numEasy(response.user.number2)}`);
                $('.centerRightTopPart3_number').html(`${numEasy(response.user.number3)}`);
                $('.centerRightTopPart4_number').html(`${numEasy(response.user.number4)}`);

                // 本地 localStorage 的更新
                window.localStorage.name = response.user.userName
                window.localStorage.token = response.token
                window.localStorage.search = JSON.stringify(response.user.userS_H)
                window.localStorage.isLogin = true

                // 用户头像设置
                $('#userHead').html(`<a
                class="toPerson"
                onclick="window.open('/person?userId=${response.user.data_id}')">
                <img
                    class="person_head_pic"
                    id="${response.user.data_id}"
                    userId="${response.user.id}"
                    userName="${response.user.userName}"
                    style="border: 2px solid green;border-radius: 50%;" 
                    onerror=\'picError(this)\'
                    onload=\'pic_load(this)\'
                    src="${zip_dir + response.user.headImg}">
                </a>`);

                // 设置退出登陆按钮
                $('#userHead').after(`<div 
                class="head-part">
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
                            let temp_html = `<div class="head-part02" style="top:${$('.top').height()}px;position: fixed; right: 0px; font-size: 17px; width: 100px; visibility: visible;"><span style="color: #004eff;" onclick="window.open('/person?userId=${response.user.data_id}')">个 人 主 页</span>
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
                                <span style="color: #004eff;" onclick="window.open('/person?userId=${response.user.data_id}')">个 人 主 页</span>
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
                                success: function (response) {
                                    if (response.isLogin == false) {
                                        window.location.href = web_url
                                        return
                                    }
                                    if (response.number == 0) {
                                        return
                                    }
                                    $('#message_number').html(numEasy(response.number));
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

                        //非触屏设备

                        $(window).keydown(function (event) {
                            event.stopPropagation()
                            if (event.keyCode == '13') {
                                if ($('#search_base_value').val().trim().length == 0) {
                                    alert('请输入有效信息')
                                    return
                                }

                                $(window).scrollTop('0px');

                                let data = JSON.parse(window.localStorage.search)
                                data.push({
                                    name: $('#search_base_value').val()
                                })
                                window.localStorage.search = JSON.stringify(data)

                                $(window).unbind('keydown');
                                $("#search_base_value").blur()
                                $('#jump_window').html('');
                                $('body').unbind();
                                $('.searchPartInput>span').attr('style', '');
                                $("#searchPartInput_search>svg>path").attr('fill', "#bfbfbf");

                                $('.centerLeftBottom').html('');
                                $('.centerLeftBottom').prepend(`<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>`);

                                $('#search_base_value').val($('#search_base_value').val().trim());

                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/search",
                                    data: {
                                        token: window.localStorage.token,
                                        name: $('#search_base_value').val().trim()
                                    },
                                    success: function (response) {
                                        $('.navigation').remove();
                                        $('.addArticle').remove();
                                        $('.centerLeftBottom>.commentSection_wait').remove();
                                        $('.centerLeftBottom').append(`
                                        <div class="centerLeftBottom_show" >
                                            <div class="navigation">
                                                <span class="navigation_search">搜索结果：
                                                    <span class='navigation_search_number navigation_search_user_button'>用户(${response.user_search.length>90?'99+':response.user_search.length})</span>
                                                    <span class='navigation_search_number navigation_search_article_button'>文章(${response.article_search.length>90?'99+':response.article_search.length})</span>
                                                </span>
                                            </div>
                                        </div>`);

                                        $('.navigation_search_user_button').click(function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $('.centerLeftBottom_article_line').hide();
                                            $('.article_small_color').hide();

                                            $('.centerLeftBottom_user_line').show();
                                            $('.user_small').show();
                                        });

                                        $('.navigation_search_article_button').click(function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $('.centerLeftBottom_user_line').hide();
                                            $('.user_small').hide();

                                            $('.centerLeftBottom_article_line').show();
                                            $('.article_small_color').show();
                                        });

                                        $('.navigation_search').click(function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $('.centerLeftBottom_user_line').show();
                                            $('.user_small').show();

                                            $('.centerLeftBottom_article_line').show();
                                            $('.article_small_color').show();
                                        });

                                        if (response.user_search.length !== 0) {
                                            $('.navigation').after(`
                                <div class="centerLeftBottom_user_line">用户</div>
                                `);
                                            for (let i = 0; i < response.user_search.length; i++) {
                                                $('.centerLeftBottom_user_line').after(`
                                    <div class="contentSmallPart user_small">
                                    <div>
                                        <div class="user_small_main">
                                            <span>
                                                <a id ='${response.user_search[i].id}' onclick="head_to_detail(this)">
                                                    <img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src="${zip_dir}${response.user_search[i].headImg}" class="user_small_main_img">
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

                                        if (response.article_search.length !== 0) {
                                            $('.centerLeftBottom_show').append(`
                                <div class="centerLeftBottom_article_line">文章</div>
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
                                                       ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src='"+zip_dir+a(i)+"'>"}
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
                                            <div class="content" style="display:block;">
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

                                    }
                                });

                            }
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
                                success: function (response) {
                                    if (response.isDelete == true) {

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
                    success: function (response) {
                        if (response.isLogin == false) {
                            window.location.href = web_url
                            return
                        }
                        if (response.number == 0) {
                            return
                        }
                        $('.notice').prepend(`
                        <span id="notice_number">${numEasy(response.number)}</span>
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
                    success: function (response) {
                        if (response.isLogin == false) {
                            window.location.href = web_url
                            return
                        }
                        $('.message').prepend(`
                        <span id="message_number"></span>
                        `);
                        if (response.number == 0) {
                            return
                        }
                        $('#message_number').html(`${numEasy(response.number)}`);
                    }
                });

                $('head').append(`
                <style id='free_style'>${escape2Html(response.user.FreeCss)}</style>
                `);

                // 取消文字变化在小屏幕设备上的应用
                if (is_small_client) {
                    let temp_str = $('#free_style').html()
                    temp_str = temp_str.replace(/font-size/g, 'error')
                    $('#free_style').html(temp_str)
                }

            } else {
                // nologin
                // just for pc and ipad ,not support for phone
                //自动清除本地缓存
                localStorage.clear();
                window.localStorage.isLogin = false;

                if (!is_small_client) {
                    $("#search_base_value").focus(function () {
                        $(window).keydown(function (event) {
                            event.stopPropagation()
                            if (event.keyCode == '13') {
                                if ($('#search_base_value').val().trim().length == 0) {
                                    alert('请输入有效信息')
                                    return
                                }

                                $(window).scrollTop('0px');

                                $('.centerLeftBottom').html('');
                                $('.centerLeftBottom').prepend(`<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>`);
                                $("#search_base_value").blur()
                                $(window).unbind('keydown');

                                $('#search_base_value').val($('#search_base_value').val().trim());

                                $.ajax({
                                    type: "post",
                                    url: "/mainApp/search",
                                    data: {
                                        token: window.localStorage.token,
                                        name: $('#search_base_value').val().trim()
                                    },
                                    success: function (response) {
                                        $('.navigation').remove();
                                        $('.addArticle').remove();
                                        $('.centerLeftBottom>.commentSection_wait').remove();
                                        $('.centerLeftBottom').append(`
                                        <div class="centerLeftBottom_show" >
                                            <div class="navigation">
                                                <span class="navigation_search">搜索结果：
                                                    <span class='navigation_search_number navigation_search_user_button'>用户(${response.user_search.length>90?'99+':response.user_search.length})</span>
                                                    <span class='navigation_search_number navigation_search_article_button'>文章(${response.article_search.length>90?'99+':response.article_search.length})</span>
                                                </span>
                                            </div>
                                        </div>`);

                                        $('.navigation_search_user_button').click(function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $('.centerLeftBottom_article_line').hide();
                                            $('.article_small_color').hide();

                                            $('.centerLeftBottom_user_line').show();
                                            $('.user_small').show();
                                        });

                                        $('.navigation_search_article_button').click(function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $('.centerLeftBottom_user_line').hide();
                                            $('.user_small').hide();

                                            $('.centerLeftBottom_article_line').show();
                                            $('.article_small_color').show();
                                        });

                                        $('.navigation_search').click(function (e) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $('.centerLeftBottom_user_line').show();
                                            $('.user_small').show();

                                            $('.centerLeftBottom_article_line').show();
                                            $('.article_small_color').show();
                                        });

                                        if (response.user_search.length !== 0) {
                                            $('.navigation').after(`
                                <div class="centerLeftBottom_user_line">用户</div>
                                `);
                                            for (let i = 0; i < response.user_search.length; i++) {
                                                $('.centerLeftBottom_user_line').after(`
                                    <div class="contentSmallPart user_small">
                                    <div>
                                        <div class="user_small_main">
                                            <span>
                                                <a id ='${response.user_search[i].id}' onclick="head_to_detail(this)">
                                                    <img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src="${zip_dir}${response.user_search[i].headImg}" class="user_small_main_img">
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

                                        if (response.article_search.length !== 0) {
                                            $('.centerLeftBottom_show').append(`
                                <div class="centerLeftBottom_article_line">文章</div>
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
                                                       ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src='"+zip_dir+a(i)+"'>"}
                                                    </a>
                                                </span>
                                                <span class="contentSmallPartTopSmall contentSmallPartID">${xssFilter(response.article_search[i].writerName)}</span>
                                                <span class="contentSmallPartTopSmall contentSmallPartIDsign">${xssFilter(response.article_search[i].writerWord)}</span>
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
                                            <div class="content" style="display:block;">
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
                                    }
                                });
                            }
                        });

                        $(".searchPartInputIconKEY").attr('fill', "#2680F0");
                        $('.searchPartInput>span').css({
                            "border-color": "#03a9f4"
                        });

                    });

                    $("#search_base_value").blur(function () {

                        $('.searchPartInput>span').attr('style', '');
                        $(".searchPartInput_search_pc>svg>path").attr('fill', "#bfbfbf");

                    });
                }

            }
        }
    });

    //搜索按钮 just for pc & ipad
    if (!is_small_client) {
        $('#searchPartInput_search').click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('#jump_window').html('');
            $('.searchPartInput>span').attr('style', '');
            $("#searchPartInput_search>svg>path").attr('fill', "#bfbfbf");

            if ($('#search_base_value').val().trim().length == 0) {
                alert('请输入有效信息')
                return
            }

            //滚动条回到顶部
            $(window).scrollTop('0px');

            //前端对已登录用户进行搜索记录存储
            if (window.localStorage.search !== undefined) {
                let data = JSON.parse(window.localStorage.search)
                data.push({
                    name: $('#search_base_value').val()
                })
                window.localStorage.search = JSON.stringify(data)
                $('.searchPartInput_searchlist_sma_clear').after(`
                <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter($('#search_base_value').val())}</div>
                `);
            }

            $('.centerLeftBottom').html('');
            $('.centerLeftBottom').prepend(`<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>`);

            $('.mask02').remove();

            $('#search_base_value').val($('#search_base_value').val().trim());

            $.ajax({
                type: "post",
                url: "/mainApp/search",
                data: {
                    token: window.localStorage.token,
                    name: $('#search_base_value').val().trim()
                },
                success: function (response) {
                    $('.navigation').remove();
                    $('.addArticle').remove();
                    $('.centerLeftBottom>.commentSection_wait').remove();
                    $('.centerLeftBottom').append(`
                    <div class="centerLeftBottom_show" >
                        <div class="navigation">
                            <span class="navigation_search">搜索结果：
                                <span class='navigation_search_number navigation_search_user_button'>用户(${response.user_search.length>90?'99+':response.user_search.length})</span>
                                <span class='navigation_search_number navigation_search_article_button'>文章(${response.article_search.length>90?'99+':response.article_search.length})</span>
                            </span>
                        </div>
                    </div>`);

                    $('.navigation_search_user_button').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('.centerLeftBottom_article_line').hide();
                        $('.article_small_color').hide();

                        $('.centerLeftBottom_user_line').show();
                        $('.user_small').show();
                    });

                    $('.navigation_search_article_button').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('.centerLeftBottom_user_line').hide();
                        $('.user_small').hide();

                        $('.centerLeftBottom_article_line').show();
                        $('.article_small_color').show();
                    });

                    $('.navigation_search').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('.centerLeftBottom_user_line').show();
                        $('.user_small').show();

                        $('.centerLeftBottom_article_line').show();
                        $('.article_small_color').show();
                    });

                    if (response.user_search.length !== 0) {
                        $('.navigation').after(`
            <div class="centerLeftBottom_user_line">用户</div>
            `);
                        for (let i = 0; i < response.user_search.length; i++) {
                            $('.centerLeftBottom_user_line').after(`
                <div class="contentSmallPart user_small">
                <div>
                    <div class="user_small_main">
                        <span>
                            <a id ='${response.user_search[i].id}' onclick="head_to_detail(this)">
                                <img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src="${zip_dir}${response.user_search[i].headImg}" class="user_small_main_img">
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

                    if (response.article_search.length !== 0) {
                        $('.centerLeftBottom_show').append(`
            <div class="centerLeftBottom_article_line">文章</div>
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
                                   ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  onload=\'pic_load(this)\'  src='"+zip_dir+a(i)+"'>"}
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
                    <div onclick='window.open("${web_url}article?articleId=${response.article_search[i].articleId}")' style='cursor:pointer;min-height: 100px;'>
                        <div style="display: block;" class="content">
                            <div class="article_small" style="display:none;">
                                ${response.article_search[i].articleContent}
                            </div>
                            <div>
                                <a class="contentExploreMask_article_contentExploreButton">阅读全文</a>
                            </div>
                        </div>
                    </div>
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

                    $('.searchPartInput_searchlist').scrollTop(0);
                    $('.searchPartInput_searchlist').css('visibility', 'hidden');
                    $(window).unbind('keydown');
                }
            });

        });
    }

    // 请求静态文件
    await $.ajax({
        type: "post",
        url: "/webIndexStatic",
        success: function (response) {
            //创建大模块以及内部的小模块 并且进行事件绑定
            for (let i = 0; i < response.largeModule.length; i++) {
                $('.centerLeftTop').append(`<span bigMid="${response.largeModule[i].bigMid}" onclick="bigPart(this)" class="centerLeftTopButton centerLeftTopButtonIsHot"><span class="bigMname">${response.largeModule[i].bigMname}</span><div style="border-radius: 5px;" class="centerLeftTopButton_smallbuttons"><div class="smallbuttons_white"></div></div></span>`)

                if (!is_touch_client) {
                    // 非触屏设备
                    $($($(".centerLeftTopButton")[i])).hover(function () {
                        // over
                        $(this).find('.centerLeftTopButton_smallbuttons').stop().show();
                    }, function () {
                        // out
                        $(this).find('.centerLeftTopButton_smallbuttons').stop().hide();
                    })
                }

                //创建小模块以及进行事件绑定
                for (let j = 0; j < response.largeModule[i].smallM.length; j++) {
                    $('.centerLeftTopButton_smallbuttons:nth(' + i + ')').find('.smallbuttons_white').after(`<span id="${response.largeModule[i].smallM[j].smallMid}" onclick="smp(this)" class="smp pcTouch">${response.largeModule[i].smallM[j].smallMname}</span>`)
                }

                // 每个大模块内部添加一个小模块并且进行事件绑定 (设置 display:none 暂时取消此功能 但是接口未摧毁 以后有待完善)
                $('.centerLeftTopButton_smallbuttons:nth(' + i + ')').append('<span  onclick="centerLeftTopButtonAdd(this)" class="centerLeftTopButtonAdd"  style="display:none;"><svg t="1612847930683" class="pcTouch icon" viewBox="0 0 1024 1024" version="1.1"  p-id="5052"><path d="M0 128C0 57.6 57.6 0 128 0h768c70.4 0 128 57.6 128 128v768c0 70.4-57.6 128-128 128H128C57.6 1024 0 966.4 0 896V128z m64 0v768c0 32 25.6 64 64 64h768c32 0 64-25.6 64-64V128c0-32-25.6-64-64-64H128c-38.4 0-64 25.6-64 64z" fill="#8a8a8a" p-id="5053"></path><path d="M256 512.8c0-19.2 12.8-32 32-32h447.2c19.2 0 32 12.8 32 32s-12.8 32-32 32h-448c-19.2 0-31.2-12.8-31.2-32z" fill="#8a8a8a" p-id="5054"></path><path d="M511.2 256.8c19.2 0 32 12.8 32 32V736c0 19.2-12.8 32-32 32s-32-12.8-32-32V288.8c0-19.2 12.8-32 32-32z" fill="#8a8a8a" p-id="5055"></path></svg></span>')
            }

            if (is_small_client) {
                $('.centerRight').remove();
                $('.centerLeftTop').prepend(`<span style="color: #f44336;font-weight: bold;background: #efefef;box-shadow: inset 0px 0px 2px 2px rgb(255 0 0);" id="req_hot" class="centerLeftTopButton centerLeftTopButtonIsHot"><span class="bigMname">热榜</span></span>`);

                $('#req_hot').click(function (e) {

                    $(window).scrollTop('0px')

                    $('.centerLeftBottom').html('');

                    $('.addArticle').remove();

                    $('.centerLeftTopButton>div:nth-child(2)').hide();

                    $('.navigation').remove();

                    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>')

                    $('.centerLeftBottom').prepend(`<div style="position: relative;font-size: 18px;font-weight: bold;color: #f44336;width: 98%;margin: auto;">热榜</div>`);

                    $.ajax({
                        type: "post",
                        url: "complete/hotFlesh",
                        success: function (response) {

                            for (let i = 0; i < response.length; i++) {

                                $('.centerLeftBottom').append(`
                                <div onclick="window.open('/article?articleId=${response[i].id}')" class="contentSmallPart hot_mobile toArticleDetail"><span style="display: block;position: relative;">NO.${(i + 1)}
                                <span style="color: black;font-size: 12px;position: absolute;bottom: 0;right: 0;">${response[i].bigmname}${response[i].bigmname=='树洞'? '':'/'}${response[i].smallname}</span>
                                </span><span>${xssFilter(response[i].name)}</span>
                                </div>
                                `);

                            }

                            //不删除的原因便是防止进行滚动加载的动作 这样可以少改动代码
                            $('.commentSection_wait').hide();

                        }
                    });

                });
                return
            }

            // 热榜
            for (let i = 0; i < response.hotList.length; i++) {
                $('.chart').append(`<div onclick="window.open('/article?articleId=${response.hotList[i].id}')" class="pcTouch toArticleDetail" articleId="${response.hotList[i].id}"><span>NO.${(i + 1)}
                <span style="color: black;font-weight: 100;font-size: 12px;">${response.hotList[i].bigmname}${response.hotList[i].bigmname=='树洞'? '':'/'}${response.hotList[i].smallname}</span>
                </span><span title="${xssFilter(response.hotList[i].name)}">${xssFilter(response.hotList[i].name)}</span>
                </div>`);
            }

            // 此处为展示注册人数以及备案号的区域
            $('.webInfors').append(`
    <div class="webInfors_regNumber"><span>注册人数：</span><span class="webInfors_regNumber_number">${response.usernumber}</span></div>
    <div class="webInfors_articleNumber"><span>文章总数：</span><span class="webInfors_articleNumber_number">${response.articlenumber}</span></div>
    <div class="webInfors_webNumber"><span>备案号：</span><span class="webInfors_webNumber_number"><a href="http://beian.miit.gov.cn">闽ICP备2020019079号</a></span></div>
    `);
        }
    });

    //缓存加载动画
    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>')

    // 刚刷新时候就应该执行查询广场事件
    await $.ajax({
        type: "post",
        url: "/mainApp/toSquare",
        data: {
            token: window.localStorage.token
        },
        success: function (response) {
            $('.centerLeftBottom>.commentSection_wait').remove();
            // 部分元素有待继续补充
            for (let i = 0; i < response.articles.length; i++) {
                square_smallPart_create(i, response, i)
            }

            //首次刷新的时候加上一个待接点
            $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');

        }
    });

    // 点击TOP按钮发送的事件
    let posPast = 0
    $(".Totop").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        posPast = $("html")[0].scrollTop;
        $("html").animate({
            scrollTop: "0px"
        }, 100, function () {
            $(".backPast").fadeIn(400)
            setTimeout(() => {
                $(".backPast").hide();
            }, 5000);
        });
    });

    // 点击backPast按钮发送的事件
    $('.backPast').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.backPast').hide();
        $("html").animate({
            scrollTop: posPast + "px"
        }, 100)
    });

    // 懒加载的实现
    $(window).scroll(function () {

        // 当处于搜索状态时 禁止进行懒加载 这是一个巧妙处理 但是也会对后续设计引发不适的地方
        if ($('.navigation_search').length == 1) {
            return
        }

        // 上滑顶部图标的出现与消失
        let scrollt = $(window).scrollTop();
        if (scrollt > 200) {
            $(".Totop").fadeIn(400);
        } else {
            $(".Totop").stop().fadeOut(400);
        }

        // 不存在 contentSmallPart 则不进行懒加载事件
        if ($('.contentSmallPart').length == 0) {
            return
        }

        //触底则进行懒加载事件
        let temp_length = --$('.contentSmallPart').length
        let target_length = $(document).height() - $('.contentSmallPart:nth(' + temp_length + ')').height()
        if ($(this).scrollTop() + $(this).height() + 1 >= target_length) {
            switch ($('#square').attr('isactive')) {
                case 'true':
                    //广场的懒加载
                    switch ($('.navigation').length == 0) {
                        case true:
                            if ($('.centerLeftBottom>.commentSection_wait')[0]) {
                                return
                            }
                            slideFlushBytime('squareMway')
                            break;
                        case false:
                            switch ($('.navigation-smallM')[0].innerText.length == 0) {
                                case true:
                                    //大模块的刷新
                                    if ($('.centerLeftBottom>.commentSection_wait')[0]) {
                                        return
                                    }
                                    slideFlushBytime('bigMway', $('.navigation-bigM').attr('bigmid'), $('.navigation-smallM').attr('smallmid'))
                                    break;
                                case false:
                                    //小模块的刷新
                                    if ($('.centerLeftBottom>.commentSection_wait')[0]) {
                                        return
                                    }
                                    slideFlushBytime('smallMway', $('.navigation-bigM').attr('bigmid'), $('.navigation-smallM').attr('smallmid'))
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 'false':
                    //树洞的懒加载
                    if ($('.centerLeftBottom>.commentSection_wait')[0]) {
                        return
                    }
                    slideFlushBytime_shuDong('shuDongMway')
                    break;
                default:
                    break;
            }
        }

    });

    //树洞按钮点击事件
    $('#toShudong').click(function (e) {
        $('.navigation').remove();
        $('.addArticle').remove();
        $('.backPast').hide();
        $('.centerLeftTop').hide();

        $(window).scrollTop(0)

        // 小蓝条的一个切换
        $('#square').attr('isactive', false)
        $('#toShudong').attr('isactive', true)

        $('.centerLeftBottom').html('');

        $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"></span></section>')

        $.ajax({
            type: "post",
            url: "/mainApp/toshuDong",
            data: {
                token: window.localStorage.token
            },
            success: function (response) {
                $('.centerLeftBottom>.commentSection_wait').remove();

                // 部分元素有待继续补充
                for (let i = 0; i < response.articles.length; i++) {
                    shuDong_smallPart_create(i, response, i)
                }

                //首次刷新的时候加上一个待接点
                $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');
            }
        });

    });

    // 广场按钮点击事件
    $('#square').click(function (e) {
        $('.navigation').remove();
        $('.addArticle').remove();
        $('.backPast').hide();
        $('.centerLeftTop').show();

        $(window).scrollTop(0)

        $('.centerLeftBottom').html('');

        $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>')
        // 小蓝条的一个切换
        $('#square').attr('isactive', true)
        $('#toShudong').attr('isactive', false)

        $.ajax({
            type: "post",
            url: "/mainApp/toSquare",
            data: {
                token: window.localStorage.token
            },
            success: function (response) {
                $('.centerLeftBottom>.commentSection_wait').remove();
                // 部分元素有待继续补充
                for (let i = 0; i < response.articles.length; i++) {
                    square_smallPart_create(i, response, i)
                }
                // 首次刷新的时候加上一个待接点 
                $('.contentSmallPart:nth(' + ($(".contentSmallPart").length - 1) + ')').addClass('waitAfter');
            }
        });

    });

    // 进行创作中心入口的提示用户登录操作
    $('#toWriter').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (window.localStorage.isLogin == 'false') {
            //未登录
            noLogin()
        } else {
            window.open(`${web_url}writer`)
        }
    });

    //登陆||注册入口
    $('#loginButton').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        noLogin()
    });

    // 热榜的展开与收起(just for pc & ipad ,not support for phone)
    if (!is_small_client) {
        $('.chartClose').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.centerRight>div:nth-child(2)').hide(0, function () {
                $('.centerRight>div:nth-child(1)').after('<span class="chartOpen">收起</span>');
                $('.chartOpen').css({
                    "text-align": "center",
                    "position": "sticky",
                    "color": "rgb(9 133 10)",
                    "background-color": "rgb(173 194 189)",
                    "font-weight": "bold",
                    "top": "55px",
                    "margin-top": "3px"
                }).html("展开");
                $('.webInfors').css('top', '80px');
                $(".chartOpen").click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(".chartOpen").remove();
                    $(".centerRight>div:nth-child(2)").show();
                    $('.webInfors').css('top', '');
                });
            });
        });
    }

    // 热榜刷新按钮(just for pc & ipad ,not support for phone)
    if (!is_small_client) {
        $('.chartTitle_flesh').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.chartTitle_flesh').css('animation', 'rotate 1s linear infinite');

            $('.toArticleDetail').remove();
            $('.chartTitle').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>');
            $('.chart>div:nth-child(1)').css('border-bottom', 'unset');

            $.ajax({
                type: "post",
                url: "complete/hotFlesh",
                success: function (response) {
                    for (let i = 0; i < response.length; i++) {
                        $('.chart').append(`<div class="pcTouch toArticleDetail" articleId="${response[i].id}"><span>NO.${(i + 1)}
                        <span style="color: black;font-weight: 100;font-size: 12px;">${response[i].bigmname}${response[i].bigmname=='树洞'? '':'/'}${response[i].smallname}</span>
                        </span><span title="${xssFilter(response[i].name)}">${xssFilter(response[i].name)}</span>
                        </div>`);

                        $('.toArticleDetail:nth(' + i + ')').click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `${web_url}article?articleId=${response[i].id}`
                        });
                    }

                    $('.chartTitle_flesh').css('animation', 'unset');
                    $('.chartTitle>.commentSection_wait').remove();
                    $('.chart>div:nth-child(1)').css('border-bottom', '');
                }
            });
        });
    }

});