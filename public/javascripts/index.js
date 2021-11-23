$(document).ready(async function () {

    $('.index_content').append(`
    <div onmouseover="$('#uiSetFree>svg').css('animation', 'rotate 0.5s linear');" onmouseout="$('#uiSetFree>svg').css('animation', 'unset');" onclick="uiSetFree(this)" id="uiSetFree">
        <svg viewBox="0 0 1024 1024">
            <path d="M450.8 932.8L175.4 775.4c-38.6-22.1-62.4-62.9-62.4-107.1V354c0-44.2 23.8-85 62.4-107.1L450.8 89.5c38.5-22 85.8-22 124.3 0l275.4 157.4C889.2 269 913 309.8 913 354v314.2c0 44.2-23.8 85-62.4 107.1L575.2 932.8c-38.5 22-85.9 22-124.4 0z" fill="#37AFFA"></path><path d="M118.7 317.1c7.6-15.5 16.1-30.5 25.5-44.9-11.6 13-20.3 28.3-25.5 44.9zM585.5 95.4l-10.3-5.9c-36.2-20.7-80.3-21.9-117.4-3.7 10.9-0.9 22-1.3 33.1-1.3 32.5 0.1 64.2 3.8 94.6 10.9zM113 668.3c0 44.2 23.8 85 62.4 107.1l16.6 9.5c-32.6-34-59.4-73.6-79-117.1v0.5zM913 668.3V354c0-44.2-23.8-85-62.4-107.1l-60.8-34.7c71.2 74.3 115 175.2 115 286.3 0 228.6-185.3 413.9-413.9 413.9-32.6 0-64.3-3.8-94.7-10.9l54.7 31.2c38.5 22 85.8 22 124.3 0l275.4-157.4c38.6-22 62.4-62.8 62.4-107z" fill="#37AFFA"></path><path d="M904.8 498.5c0-111.1-43.8-211.9-115-286.3L585.5 95.4c-30.4-7.1-62-10.9-94.6-10.9-11.1 0-22.2 0.4-33.1 1.3-2.3 1.1-4.6 2.4-6.9 3.7l-85.6 48.9c34.1-10.8 70.3-16.6 108-16.6 197.3 0 357.2 159.9 357.2 357.2s-160 357.3-357.3 357.3S116 676.3 116 479c0-105.8 46-200.8 119-266.2l-59.6 34.1c-11.9 6.8-22.4 15.4-31.2 25.3-9.4 14.4-17.9 29.3-25.5 44.9-3.7 11.8-5.7 24.2-5.7 36.9v313.7c19.5 43.6 46.4 83.1 79 117.1l204.2 116.7c30.4 7.1 62.1 10.9 94.7 10.9 228.6 0 413.9-185.3 413.9-413.9z" fill="#41B6FB"></path><path d="M116 479c0 197.3 159.9 357.2 357.2 357.2S830.5 676.3 830.5 479s-160-357.2-357.3-357.2c-37.6 0-73.9 5.8-108 16.6L235 212.9C162 278.3 116 373.3 116 479z m339.6-319.9c166 0 300.5 134.5 300.5 300.5S621.6 760.1 455.6 760.1 155.1 625.6 155.1 459.6s134.6-300.5 300.5-300.5z" fill="#4CBCFC"></path><path d="M455.6 760.1c166 0 300.5-134.5 300.5-300.5S621.6 159.1 455.6 159.1 155.1 293.6 155.1 459.6s134.6 300.5 300.5 300.5zM438 196.4c134.6 0 243.8 109.1 243.8 243.8S572.6 683.9 438 683.9 194.2 574.8 194.2 440.1 303.4 196.4 438 196.4z" fill="#56C3FD"></path><path d="M438 683.9c134.6 0 243.8-109.1 243.8-243.8S572.6 196.4 438 196.4 194.2 305.5 194.2 440.1 303.4 683.9 438 683.9z m-17.6-450.3c103.3 0 187.1 83.7 187.1 187.1s-83.7 187.1-187.1 187.1S233.3 524 233.3 420.7s83.8-187.1 187.1-187.1z" fill="#60C9FD"></path><path d="M420.4 607.7c103.3 0 187.1-83.7 187.1-187.1s-83.7-187.1-187.1-187.1-187.1 83.7-187.1 187.1 83.8 187.1 187.1 187.1z m-17.7-336.8c72 0 130.3 58.4 130.3 130.3s-58.4 130.3-130.3 130.3-130.3-58.4-130.3-130.3 58.4-130.3 130.3-130.3z" fill="#6BCFFE"></path><path d="M402.7 401.2m-130.3 0a130.3 130.3 0 1 0 260.6 0 130.3 130.3 0 1 0-260.6 0Z" fill="#75D6FF"></path><path d="M513 91.1c18.7 0 37.1 4.9 53.2 14.1l275.4 157.4c32.9 18.8 53.3 53.9 53.3 91.5v314.2c0 37.6-20.4 72.7-53.3 91.5L566.2 917.2c-16.2 9.2-34.6 14.1-53.2 14.1-18.7 0-37.1-4.9-53.2-14.1L184.3 759.8C151.4 741 131 705.9 131 668.3V354c0-37.6 20.4-72.7 53.3-91.5l275.5-157.4c16.1-9.2 34.5-14 53.2-14m0-18c-21.5 0-42.9 5.5-62.2 16.5L175.4 246.9C136.8 269 113 309.8 113 354v314.2c0 44.2 23.8 85 62.4 107.1l275.4 157.4c19.2 11 40.7 16.5 62.2 16.5s42.9-5.5 62.2-16.5l275.4-157.4c38.6-22.1 62.4-62.9 62.4-107.1V354c0-44.2-23.8-85-62.4-107.1L575.2 89.5c-19.3-10.9-40.7-16.4-62.2-16.4z" fill="#37AFFA"></path><path d="M483.3 712.1l-131.7-75c-18.5-10.5-29.8-30-29.8-51V436.3c0-21.1 11.4-40.5 29.8-51l131.7-75c18.4-10.5 41-10.5 59.4 0l131.7 75c18.5 10.5 29.8 30 29.8 51V586c0 21.1-11.4 40.5-29.8 51l-131.7 75c-18.4 10.6-41 10.6-59.4 0.1z" fill="#B9E8FF"></path><path d="M172.2 417.5c-9.9 0-18-8.1-18-18V361c0-29.2 14.8-55.9 39.7-71.3l34.6-21.5c8.5-5.2 19.5-2.6 24.8 5.8 5.2 8.5 2.6 19.5-5.8 24.8l-34.6 21.5c-14.2 8.8-22.7 24-22.7 40.7v38.5c0 9.9-8.1 18-18 18zM172.2 487.1c-9.9 0-18-8.1-18-18v-10.5c0-9.9 8.1-18 18-18s18 8.1 18 18v10.5c0 9.9-8.1 18-18 18z" fill="#FFFFFF"></path>
        </svg>
    </div>
    `);
    // 针对所有触屏设备(pc,phone,ipad)
    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
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

    // 争对小屏幕触屏设备(phone)
    let arr = [screen.width, screen.height]
    arr = arr.sort()
    if (arr[0] < 600) {

        $('body').after(`<div id="preventTran" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; background-color: rgb(46, 46, 46); text-align: center; z-index: 99999; visibility: hidden;"><img onerror=\'picError(this)\' src="data:image/png;base64,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" style="margin: 60px auto 30px;"><p style="width: 100%; height: auto; font-size: 22px; color: rgb(98, 98, 98); line-height: 34px; text-align: center;">为了您的良好体验<br>请将手机竖屏操作</p></div>`);
        if (window.orientation == 90 || window.orientation == -90) {
            $('#preventTran').css('visibility', 'visible');
        } else {
            $('#preventTran').css('visibility', 'hidden');
        }
        window.onorientationchange = function () {
            if (window.orientation == 90 || window.orientation == -90) {
                $('#preventTran').css('visibility', 'visible');
            } else {
                $('#preventTran').css('visibility', 'hidden');
            }
        };

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

        $('body').after(`
        <div style="visibility:hidden;" class="searchpart_mobile">
                
        <div class="search_base_value_father"><input type="search" placeholder="用户/文章" id="search_base_value"></div>
                        <span id="searchPartInput_search">
                            <svg viewBox="0 0 1024 1024">
                                <path d="M407.9 98.2c-170.7 0-309 138.3-309 309s138.3 309 309 309 309-138.3 309-309c0-170.6-138.3-309-309-309z m0 564c-140.8 0-255-114.2-255-255s114.2-255 255-255 255 114.2 255 255-114.2 255-255 255zM602.3 615.9c-7.7 7.8-7.6 20.6 0.2 28.3l274.1 270.1c7.8 7.7 20.6 7.6 28.3-0.2l8-8.1c7.7-7.8 7.6-20.6-0.2-28.3L638.6 607.5c-7.8-7.7-20.6-7.6-28.3 0.2l-8 8.2z" fill="#2680F0" class="searchPartInputIconKEY">
                                </path>
                            </svg>
                        </span>
                    </div>
        `);

        $('#searchPartInput_search').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.mask').remove();
            $('.searchpart_mobile').css('visibility', 'hidden');
            $('.searchPartInput_searchlist').css('visibility', 'hidden');
            $(window).unbind('keydown');
            $('.searchPartInput_searchlist').scrollTop(0);
            $('.searchPartInput').css('visibility', 'visible');
        });

        $('#searchPartInput_search_fake').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.searchPartInput').css('visibility', 'hidden');
            $('.searchpart_mobile').css('visibility', 'visible');
            $('body').after(`<div class="mask"></div>`);

            $('.mask').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('.searchpart_mobile').css('visibility', 'hidden');
                $('.searchPartInput_searchlist').css('visibility', 'hidden');
                $(window).unbind('keydown');
                $('.searchPartInput_searchlist').scrollTop(0);
                $('.searchPartInput').css('visibility', 'visible');
                $('.mask').remove();
            });

            $('.searchpart_mobile').show();
        });
        $('.top>.web-font').append(`<div id='mobile_hot_button' isOpen=false onclick="moblie_hot(this)" style="position: fixed;right: 0;background: rgb(255 214 214);width: 33px;height: 15px;top: 52px;right: 2px;font-size: 0;border: 1px solid #d2c0c0;box-sizing: content-box;border-radius: 10px;"><svg viewBox="0 0 1024 1024" style="width: 100%;height: 150%;position: relative;top: -9px;"><path d="M675.994 463.72c-55.56-66.232-34.5-155.088-34.312-155.916l8.124-32.36-32.748 6.188c-57.498 10.828-103.372 35.266-136.372 72.624-26.092 29.546-44.31 67.436-54.326 112.918-1.968-1.11-3.578-2.204-4.454-3.282l-23.202-28.92-13.344 34.608c-14.344 37.25-19.984 73.264-16.766 107.044 2.954 31.122 13.266 59.746 30.672 85.122 36.138 52.624 101.746 86.684 167.228 86.808H588.37v-1.438c23.248-3.062 46.436-11 66.934-23.124 28.562-16.872 50.562-40.496 63.562-68.372 15.754-33.812 31.126-103.682-42.872-191.9z" fill="#fc6e51"></path><path d="M277.334 301.6c-11.78 0-21.326 9.546-21.326 21.328v170.666H42.686v-170.666c0-11.782-9.562-21.328-21.344-21.328S0.016 311.146 0.016 322.928v384.004c0 11.75 9.544 21.308 21.326 21.308s21.344-9.558 21.344-21.308v-170.668h213.322v170.668c0 11.75 9.546 21.308 21.326 21.308 11.782 0 21.344-9.558 21.344-21.308V322.928c0-11.78-9.562-21.328-21.344-21.328zM1002.674 301.6H746.68c-11.81 0-21.374 9.546-21.374 21.328 0 11.78 9.562 21.342 21.374 21.342h106.624v362.664c0 11.75 9.562 21.308 21.376 21.308 11.748 0 21.31-9.558 21.31-21.308V344.27h106.686c11.748 0 21.31-9.562 21.31-21.342-0.002-11.78-9.564-21.328-21.312-21.328z" fill="#ff7272"></path></svg></div>`);

        $('#square').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.centerRight').hide();
            $('#mobile_hot_button').attr('isOpen', 'false');
        });
        $('#toShudong').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('.centerRight').hide();
            $('#mobile_hot_button').attr('isOpen', 'false');
        });
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
                $('.webInfors').prepend(`<div class="finLogTime"> <span>LAST LOGIN:</span><span class="finLogTime_number">${timeSet(response.user.userFinLog)}</span></div>`);
                $('.centerRightTopPart1_number').html(`${numEasy(response.user.number1)}`);
                $('.centerRightTopPart2_number').html(`${numEasy(response.user.number2)}`);
                $('.centerRightTopPart3_number').html(`${numEasy(response.user.number3)}`);
                $('.centerRightTopPart4_number').html(`${numEasy(response.user.number4)}`);

                window.localStorage.name = response.user.userName
                window.localStorage.token = response.token
                window.localStorage.search = JSON.stringify(response.user.userS_H)

                //头像进行设置
                $('#loginButton').remove();
                $('#userHead').prepend(`<a userId="${response.user.id}" userName="${response.user.userName}" class="toPerson" href="/person"></a>`);

                if (response.user.headImg == 'NaN.png') {
                    $('.toPerson').prepend('<img style="border: 2px solid green;border-radius: 50%;" onerror=\'picError(this)\'  src="/head/staticIMG/' + response.user.headImg + '">');
                } else {
                    $('.toPerson').prepend('<img style="border: 2px solid green;border-radius: 50%;" onerror=\'picError(this)\'  src="/head/' + response.user.headImg + '">');
                }

                // 登录状态下即会有退出登录按钮
                $('#userHead').after(`
                <div class="head-part">
                    <span id="outLogin" class="pcTouch">退 出 登 录</span>
                </div>
                `);

                // 针对所有触屏设备
                if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                    // $('.head-part').toggleClass('head-part02');
                    $('.head-part').addClass('head-part02');
                    $('.head-part02').removeClass('head-part');
                    $('.head-part02').css({
                        'position': 'fixed',
                        'right': '0',
                        'font-size': '17px',
                        'width': '100px',
                        'visibility': 'hidden'
                    });
                    $('.toPerson').removeAttr('href');
                    $('.head-part02').prepend(`<span><a href="/person">个 人 主 页<a></span>`);
                    $('.head').click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();


                        $('.head-part02').css('visibility', 'visible');
                        $('.head-part02').after('<div class="mask02"></div>');

                        $('.mask02').click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $('.head-part02').css('visibility', 'hidden');
                            $('.mask02').remove();
                        });

                    });
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

                if (arr[0] < 600) {
                    $('.head-part02').prepend(`
                        <span onclick="noticeClick(event)" class='notice smallp'>通&nbsp&nbsp知</span>
                        <span onclick="messageClick(event)" class='message smallp'>信&nbsp&nbsp箱</span>
                    `);
                }

                $('#search_base_value').parent().after(`
                        <div class="searchPartInput_searchlist">
                            <div class="searchPartInput_searchlist_sma_word">搜索记录：</div>
                            <div class="searchPartInput_searchlist_sma_clear">清空列表</div>
                        </div>
                `);

                for (let i = 0; i < response.user.userS_H.length; i++) {

                    $('.searchPartInput_searchlist_sma_clear').after(`
                    <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter(response.user.userS_H[i].name)}</div>
                    `);

                }

                //点击退出登录按钮本地去除本地缓存
                $('#outLogin').click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    localStorage.clear();
                    location.href = 'https://www.shushuo.space/'
                });

                // 登录状态下的搜索
                $("#search_base_value").focus(function (e) {
                    e.stopPropagation()
                    $('.mask02').remove();

                    //非触屏设备
                    $('.searchPartInput').mouseleave(function (e) {
                        e.stopPropagation()
                        e.preventDefault()
                        $("#search_base_value").blur();

                        $('.searchPartInput_searchlist').css('visibility', 'hidden');
                        $(window).unbind('keydown');
                        $('.searchPartInput_searchlist').scrollTop(0);

                        if ($("#search_base_value")[0].value == "") {
                            //没有输入搜索信息
                            $(".searchPartInput_search_pc>svg>path").attr('fill', "#bfbfbf");

                            $('.searchPartInput>span').css({
                                "border": ""
                            });
                        }

                    });

                    $(window).keydown(function (event) {
                        event.stopPropagation()
                        if (event.keyCode == '13') {
                            if ($('#search_base_value').val().trim().length == 0) {
                                alert('请输入有效信息')
                                return
                            }

                            $(window).scrollTop('0px');

                            if (window.localStorage.search !== undefined) { //登录状态下的操作
                                let data = JSON.parse(window.localStorage.search)
                                data.push({
                                    name: $('#search_base_value').val()
                                })
                                window.localStorage.search = JSON.stringify(data)
                                $('.searchPartInput_searchlist_sma_clear').after(`
                                <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter($('#search_base_value').val())}</div>
                                `);
                            }

                            $('.mask').remove();
                            $('.mask02').remove();
                            $('.searchpart_mobile').css('visibility', 'hidden');
                            $('.searchPartInput_searchlist').css('visibility', 'hidden');
                            $(window).unbind('keydown');
                            $('.searchPartInput_searchlist').scrollTop(0);
                            $('.searchPartInput').css('visibility', 'visible');

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
                                                <img onerror=\'picError(this)\'  src="/head/${response.user_search[i].headImg == "NaN.png" ? "staticIMG/NaN.png" : response.user_search[i].headImg}" class="user_small_main_img">
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
                                                <a target="_blank" class="contentSmallPartTopSmall contentSmallPartHead" ${response.article_search[i].writerName == "匿名" ?'':'href=/person?userName='+response.article_search[i].writerId+''}>
                                                   ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  src='/head/"+a(i)+"'>"}
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

                            $("#search_base_value").blur()
                            $(window).unbind('keydown');
                        }
                    });


                    if (window.localStorage.search !== undefined) {

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


                        $('.searchPartInput_searchlist').css('visibility', 'visible');

                        $('.searchPartInput_searchlist_sma_clear').click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            //为手机端而写
                            $('.searchpart_mobile').css('visibility', 'hidden');
                            $('.mask').remove();
                            $('.searchPartInput').css('visibility', 'visible');


                            $.ajax({
                                type: "post",
                                url: "/mainApp/searchRemove",
                                data: {
                                    token: window.localStorage.token
                                },
                                success: function (response) {
                                    if (response.isDelete == true) {

                                        $('.searchPartInput_searchlist').css('visibility', 'hidden');
                                        $(window).unbind('keydown');

                                        window.localStorage.search = JSON.stringify([])

                                        $('.searchPartInput_searchlist_sma').remove();
                                    }
                                }
                            });
                        });

                    }

                    $("#searchPartInput_search>svg>path").attr('fill', "#2680F0");
                    $('.searchPartInput>span').css({
                        "border-color": "#03a9f4"
                    });

                });

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
                            window.location.href = 'https://www.shushuo.space/'
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
                            window.location.href = 'https://www.shushuo.space/'
                            return
                        }
                        if (response.number == 0) {
                            return
                        }
                        $('.message').prepend(`
                            <span id="message_number">${numEasy(response.number)}</span>
                        `);
                    }
                });



                $('head').append(`
                <style id='free_style'>${escape2Html(response.user.FreeCss)}</style>
                `);

            } else {
                // 登录失败
                $('.head-part').remove();

                //自动清除本地缓存
                localStorage.clear();

                // 非登录状态下的搜索
                $("#search_base_value").focus(function () {
                    $(window).keydown(function (event) {
                        event.stopPropagation()
                        if (event.keyCode == '13') {
                            if ($('#search_base_value').val().trim().length == 0) {
                                alert('请输入有效信息')
                                return
                            }

                            $(window).scrollTop('0px');

                            if (window.localStorage.search !== undefined) { //登录状态下的操作
                                let data = JSON.parse(window.localStorage.search)
                                data.push({
                                    name: $('#search_base_value').val()
                                })
                                window.localStorage.search = JSON.stringify(data)
                                $('.searchPartInput_searchlist_sma_clear').after(`
                                <div onclick="search_history(this)" class="pcTouch searchPartInput_searchlist_sma">${xssFilter($('#search_base_value').val())}</div>
                                `);
                            }

                            $('.mask').remove();
                            $('.mask02').remove();
                            $('.searchpart_mobile').css('visibility', 'hidden');
                            $('.searchPartInput').css('visibility', 'visible');

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
                                                <img onerror=\'picError(this)\'  src="/head/${response.user_search[i].headImg == "NaN.png" ? "staticIMG/NaN.png" : response.user_search[i].headImg}" class="user_small_main_img">
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
                                                <a target="_blank" class="contentSmallPartTopSmall contentSmallPartHead" ${response.article_search[i].writerName == "匿名" ?'':'href=/person?userName='+response.article_search[i].writerId+''}>
                                                   ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  src='/head/"+a(i)+"'>"}
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
                                    <a target="_blank" href="https://www.shushuo.space/article?articleId=${response.article_search[i].articleId}">
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

                            $("#search_base_value").blur()

                            $(window).unbind('keydown');
                        }
                    });

                    $(".searchPartInputIconKEY").attr('fill', "#2680F0");
                    $('.searchPartInput>span').css({
                        "border-color": "#03a9f4"
                    });

                });
                $("#search_base_value").blur(function () {

                    if ($("#search_base_value")[0].value == "") {
                        //没有输入搜索信息
                        $(".searchPartInput_search_pc>svg>path").attr('fill', "#bfbfbf");

                        $('.searchPartInput>span').css({
                            "border": ""
                        });
                    }
                });
            }
        }
    });
    //搜索按钮
    $('#searchPartInput_search').click(function (e) {
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
                            <img onerror=\'picError(this)\'  src="/head/${response.user_search[i].headImg == "NaN.png" ? "staticIMG/NaN.png" : response.user_search[i].headImg}" class="user_small_main_img">
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
                            <a target="_blank" class="contentSmallPartTopSmall contentSmallPartHead" ${response.article_search[i].writerName == "匿名" ?'':'href=/person?userName='+response.article_search[i].writerId+''}>
                               ${response.article_search[i].writerName == "匿名" ? '<svg class="anonymity" viewBox="0 0 1024 1024"> <path d="M512 538.1c130.9 0 237-106.1 237-237s-106.1-237-237-237-237 106.1-237 237 106.1 237 237 237z m0 110.6c-218.2 0-395.1 69.7-395.1 155.6S293.8 960 512 960s395.1-69.7 395.1-155.6S730.2 648.7 512 648.7z" fill="#707070"></path> </svg>' : "<img onerror=\'picError(this)\'  src='/head/"+a(i)+"'>"}
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
                <div onclick='window.open("https://www.shushuo.space/article?articleId=${response.article_search[i].articleId}")' style='cursor:pointer;min-height: 100px;'>
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

    // 请求静态文件
    await $.ajax({
        type: "post",
        url: "/webIndexStatic",
        success: function (response) {
            //创建大模块以及内部的小模块 并且进行事件绑定
            for (let i = 0; i < response.largeModule.length; i++) {
                $('.centerLeftTop').append(`<span bigMid="${response.largeModule[i].bigMid}" onclick="bigPart(this)" class="centerLeftTopButton centerLeftTopButtonIsHot"><span class="bigMname">${response.largeModule[i].bigMname}</span><div class="centerLeftTopButton_smallbuttons"><div class="smallbuttons_white"></div></div></span>`)
                //对ipad,mobile进行适配
                if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
                    if (!($(window).width() < 600)) {
                        //适配ipad
                        $(".centerLeftTopButton:nth(" + i + ")").append(`<span class="bigMmask" onclick="bigMmask(this)"></span>`);
                    }
                } else {
                    // PC
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

                // 每个大模块内部添加一个小模块并且进行事件绑定
                $('.centerLeftTopButton_smallbuttons:nth(' + i + ')').append('<span  onclick="centerLeftTopButtonAdd(this)" class="centerLeftTopButtonAdd"><svg t="1612847930683" class="pcTouch icon" viewBox="0 0 1024 1024" version="1.1"  p-id="5052"><path d="M0 128C0 57.6 57.6 0 128 0h768c70.4 0 128 57.6 128 128v768c0 70.4-57.6 128-128 128H128C57.6 1024 0 966.4 0 896V128z m64 0v768c0 32 25.6 64 64 64h768c32 0 64-25.6 64-64V128c0-32-25.6-64-64-64H128c-38.4 0-64 25.6-64 64z" fill="#8a8a8a" p-id="5053"></path><path d="M256 512.8c0-19.2 12.8-32 32-32h447.2c19.2 0 32 12.8 32 32s-12.8 32-32 32h-448c-19.2 0-31.2-12.8-31.2-32z" fill="#8a8a8a" p-id="5054"></path><path d="M511.2 256.8c19.2 0 32 12.8 32 32V736c0 19.2-12.8 32-32 32s-32-12.8-32-32V288.8c0-19.2 12.8-32 32-32z" fill="#8a8a8a" p-id="5055"></path></svg></span>')
            }

            // 热榜
            for (let i = 0; i < response.hotList.length; i++) {
                $('.chart').append(`<div onclick="window.open('/article?articleId=${response.hotList[i].id}')" class="pcTouch toArticleDetail" articleId="${response.hotList[i].id}"><span>NO.${(i + 1)}
                <span style="color: black;font-weight: 100;font-size: 12px;">${response.hotList[i].bigmname}${response.hotList[i].bigmname=='树洞'? '':'/'}${response.hotList[i].smallname}</span>
                </span><span title="${xssFilter(response.hotList[i].name)}">${xssFilter(response.hotList[i].name)}</span>
                </div>`);
            }

            $('.webInfors').append(`
    <div class="webInfors_regNumber"><span>注册人数：</span><span class="webInfors_regNumber_number">${response.usernumber}</span></div>
    <div class="webInfors_articleNumber"><span>文章总数：</span><span class="webInfors_articleNumber_number">${response.articlenumber}</span></div>
    <div class="webInfors_webNumber"><span>备案号：</span><span class="webInfors_webNumber_number"><a href="http://beian.miit.gov.cn">闽ICP备2020019079号</a></span></div>
    `);
        }
    });

    $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>')
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
    let posPast
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
        if ($('.navigation_search').length == 1) {
            return
        }

        TopButtonShowHide()
        if ($('.contentSmallPart').length == 0) {
            //一定不进行懒加载事件
            return
        }
        if ($(this).scrollTop() + $(this).height() + 1 >= $(document).height()) {
            //触底则进行懒加载事件
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
        e.preventDefault();
        e.stopPropagation();
        $('.navigation').remove();
        $('.addArticle').remove();
        $('.backPast').hide();
        $('.centerLeftTop').hide();

        $(window).scrollTop(0)

        // 小蓝条的一个切换
        $('#square').attr('isactive', false)
        $('#toShudong').attr('isactive', true)

        $('.centerLeftBottom').html('');

        $('.centerLeftBottom').append('<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>')
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
        e.preventDefault();
        e.stopPropagation();
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
        if ($('#loginButton')[0]) {
            //未登录
            noLogin()
        } else {
            location.href = 'https://www.shushuo.space/writer'
        }
    });

    $('#loginButton').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        noLogin()
    });

    // 热榜的展开与收起
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
                        window.location.href = `https://www.shushuo.space/article?articleId=${response[i].id}`
                    });
                }

                $('.chartTitle_flesh').css('animation', 'unset');
                $('.chartTitle>.commentSection_wait').remove();
                $('.chart>div:nth-child(1)').css('border-bottom', '');
            }
        });
    });

});