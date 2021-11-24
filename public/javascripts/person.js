$(document).ready(function () {
    //href规则化
    let search_data = {}
    let temp_search_data = location.search.split('?')[1].split('&&')
    for (let i = 0; i < temp_search_data.length; i++) {
        let key = temp_search_data[i].split('=')[0]
        let value = temp_search_data[i].split('=')[1]
        search_data[key] = value
    }

    if (window.location.search.length === 0) {
        //不允许这样的href进行个人页面的访问  运行的href格式应该明确包括了userId
        alert('权限失效，将为您跳转至首页...')
        location.href = 'https://www.shushuo.space/'
    }

    //本人主页面
    // 登录验证
    $.ajax({
        type: "post",
        url: "/person/sendToken",
        data: {
            token: window.localStorage.token,
            userId: search_data.userId
        },
        success: function (response) {
            //进入这种页面必须是在登录状态下
            if (response.isLogin == false) {
                alert('权限失效，将为您跳转至首页...')
                location.href = 'https://www.shushuo.space/'
            }

            //以区分游客抑或本人
            if (response.isOwn === true) {
                //本人
                $('.userid').html(`${xssFilter(response.user.userName)}`);
                $('.headpicSvg').attr('viewBox', "0 0 70 70");
                $('.headpicSvg>path').remove();
                $('.headpicSvg').append('<svg><text x="5" y="41" fill="white">更换头像</text></svg>');
                $('.otherInfos').append(`
            <div class="finLogTime">
            <span>LAST LOGIN:</span><span class="finLogTime_number">${timeSet(response.user.finLogTime)}</span></div>
            `);
                $('.headpicSvg').css({
                    'display': 'none',
                    'position': 'relative',
                    'z-index': '5',
                    'background-color': 'rgba(0,0,0,.5)'
                });
                $('.headpic').hover(function () {
                    // over
                    if ($('.headpic>img')[0]) {
                        $('.headpicSvg').show();
                    }
                }, function () {
                    // out
                    if ($('.headpic>img')[0]) {
                        $('.headpicSvg').hide();
                    }
                })
                if (response.user.headImg == 'NaN.png') {
                    $('.headpic').append('<img onerror=\'picError(this)\' src="/head/staticIMG/' + response.user.headImg + '">');
                } else {
                    $('.headpic').append('<img onerror=\'picError(this)\' src="/head/' + response.user.headImg + '">');
                }

                $('.articles').addClass('select');

                switch (search_data.way) {
                    case 'centerRightTopPart_like':
                        $('.select').removeClass('select');
                        $('.like').addClass('select');

                        $('.centerBottom').prepend('<div class="navigation">我的点赞</div>');
                        $.ajax({
                            type: "post",
                            url: "/person/like",
                            data: {
                                token: window.localStorage.token
                            },
                            success: function (response) {
                                if (response.isLogin == false) {
                                    alert('权限失效，将为您跳转至首页...')
                                    location.href = 'https://www.shushuo.space/'
                                }
                                $('.navigation').after(`<div class="likeArticle centerBottom-main"></div>`);
                                for (let i = 0; i < response.data.length; i++) {
                                    $('.likeArticle').append(`<div class="article_smallCard" articleId="${response.data[i].articleId}">
                                <div class="article_smallCard_innercontent">
                                <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                                <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                                <div class="innercontent_time">${timeSet(response.data[i].articleTime)}</div>
                                <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                                </div>
                                </div>`);
                                }
                            }
                        });
                        break;
                    case 'centerRightTopPart_collect':
                        $('.select').removeClass('select');
                        $('.collection').addClass('select');

                        $('.centerBottom').prepend('<div class="navigation">我的收藏</div>');
                        $.ajax({
                            type: "post",
                            url: "/person/collect",
                            data: {
                                token: window.localStorage.token
                            },
                            success: function (response) {
                                if (response.isLogin == false) {
                                    alert('权限失效，将为您跳转至首页...')
                                    location.href = 'https://www.shushuo.space/'
                                }
                                $('.navigation').after(`<div class="collectArticle centerBottom-main"></div>`);
                                for (let i = 0; i < response.data.length; i++) {
                                    $('.collectArticle').append(`<div class="article_smallCard" articleId="${response.data[i].articleId}">
                                <div class="article_smallCard_innercontent">
                                <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
        
                                <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                                <div class="innercontent_time">${timeSet(response.data[i].articleTime)}</div>
                                <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                                </div>
                                </div>`);
                                }
                            }
                        });
                        break;
                    case 'centerRightTopPart_comment':
                        $('.select').removeClass('select');
                        $('.comment').addClass('select');

                        $('.centerBottom').prepend('<div class="navigation">我的评论</div>');
                        $.ajax({
                            type: "post",
                            url: "/person/comment",
                            data: {
                                token: window.localStorage.token
                            },
                            success: function (response) {
                                if (response.isLogin == false) {
                                    alert('权限失效，将为您跳转至首页...')
                                    location.href = 'https://www.shushuo.space/'
                                }
                                $('.navigation').after(`<div class="commentArticle centerBottom-main"></div>`);
                                for (let i = 0; i < response.data.length; i++) {
                                    $('.commentArticle').append(`<div class="article_smallCard" fatherid="${response.data[i].fatherid}" isSec="${response.data[i].isSec}" commentId="${response.data[i].commentId}" articleId="${response.data[i].articleId}">
                                <div class="article_smallCard_innercontent">
        
                                <div class="innercontent_action" onclick="commentaction(this)" isopen="false"><span>. . .</span></div>
        
                                <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                                <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                                <div class="innercontent_time">${timeSet(response.data[i].contentTime)}</div>
                                <div class="innercontent_content">${xssFilter(response.data[i].content)}</div>
                                <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                                </div>
                                </div>`);
                                }
                            }
                        });
                        break;
                    case 'centerRightTopPart_article':
                        $('.centerBottom').prepend('<div class="navigation">我的文章</div>');
                        $.ajax({
                            type: "post",
                            url: "/person/article",
                            data: {
                                token: window.localStorage.token
                            },
                            success: function (response) {
                                if (response.isLogin == false) {
                                    alert('权限失效，将为您跳转至首页...')
                                    location.href = 'https://www.shushuo.space/'
                                }
                                $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                                for (let i = 0; i < response.data.length; i++) {
                                    $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                                <div class="article_smallCard_innercontent">
                                <div class="innercontent_action" onclick="articleaction(this)" isopen="false"><span>. . .</span></div>
                                <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                                <div class="innercontent_title">${xssFilter(response.data[i].name)}</div>
                                <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                                <div class="innercontent_data">赞（${response.data[i].likerslength}） 踩（${response.data[i].unlikerslength}） 评论（${response.data[i].commentslength}）收藏（${response.data[i].collectorslength}）</div>
                                <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                                </div>
                                </div>`);
                                }
                            }
                        });

                        break;

                    default:
                        break;
                }

                if ($('.navigation').length == 0) {
                    $('.centerBottom').prepend('<div class="navigation">我的文章</div>');
                    $.ajax({
                        type: "post",
                        url: "/person/article",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_action" onclick="articleaction(this)" isopen="false"><span>. . .</span></div>
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                            <div class="innercontent_title">${xssFilter(response.data[i].name)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                            <div class="innercontent_data">赞（${response.data[i].likerslength}） 踩（${response.data[i].unlikerslength}） 评论（${response.data[i].commentslength}）收藏（${response.data[i].collectorslength}）</div>
                            <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                }

                $('.headpicSvg').click(function (e) {
                    if ($('.headpic>img')) {
                        $('.headpicSvg').hide();
                    }
                    async function base64toFile(dataurl, filename = 'file') {
                        //定义了一个转换64编码的函数
                        let arr = dataurl.split(',')
                        let mime = arr[0].match(/:(.*?);/)[1]
                        let suffix = mime.split('/')[1]
                        let bstr = atob(arr[1])
                        let n = bstr.length
                        let u8arr = new Uint8Array(n)
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt(n)
                        }
                        return new File([u8arr], `${filename}.${suffix}`, {
                            type: mime
                        })
                    }
                    $('.bottom').after('<div class="mask"></div>');

                    console.log($(this).siblings('img').attr('src'));
                    // console.log(e);
                    $('.mask').after(`
                <div class="AvatarOperationArea"><div class="AOA-top"><div class="AOA-top-left"><div class="AOA-top-left-part"><div class="ATLP-Basic"><div class="ATLP-Basic-mask"></div><img src="">
                </div></div></div><span class="AOA-top-line"></span><div class="AOA-top-right"><div class="AOA-top-right-part"><div class="ATRP-container"><img src=""></div></div></div></div><div class="AOA-bottom"><div class="AOA-bottom-left"><button class="AOA-bottom-left-bottom">选择图片</button><input class="AOA-bottom-left-input" type="file" accept="image/png" style="display: none;"></div><div class="AOA-bottom-right"><input class="AOA-bottom-right-input" type="submit"></div></div></div>`);
                    $('.AOA-bottom-left-bottom').click(function () {
                        $('.AOA-bottom-left-input').click();
                    });
                    $('html').css({
                        overflow: 'hidden',
                        'margin-right': window.innerWidth - $('body')[0].offsetWidth + 'px'
                    });
                    $('.mask').click(function (e) {
                        $('.mask').remove();
                        $('.AvatarOperationArea').remove();
                        $('html').css({
                            overflow: 'unset',
                            'margin-right': 'unset'
                        });
                    });
                    $('.AOA-bottom-left-input').change(function (e) {
                        var reader = new FileReader()
                        reader.readAsDataURL(this.files[0])
                        reader.onload = function () {
                            //数据读取后
                            if (!$('.ATLP-Basic-cut')[0]) {
                                $('.ATLP-Basic').prepend('<div class="ATLP-Basic-cut"><img class="ATLP-Basic-cut-copy" src=""></div>');
                            }
                            $('.ATLP-Basic>img')[0].src = this.result
                            $('.ATRP-container>img')[0].src = this.result
                            $('.ATLP-Basic-cut>img')[0].src = this.result
                            $('.ATLP-Basic>img,.ATRP-container>img')[0].onload = function () {
                                //图片生成后
                                $('.ATLP-Basic-cut').unbind();
                                var prop = $('.ATLP-Basic>img')[0].naturalHeight / $('.ATLP-Basic>img')[0].naturalWidth
                                if (prop > 1) {
                                    //竖盒子
                                    $('.ATLP-Basic>img').css({
                                        width: 'unset',
                                        height: '170px'
                                    });
                                    $('.ATRP-container>img').css({
                                        width: '100%',
                                        height: 'unset',
                                        left: 'unset',
                                        top: '0'
                                    });
                                    $('.ATLP-Basic-cut-copy').css({
                                        left: '0',
                                        top: '0',
                                        width: $('.ATLP-Basic>img')[0].width,
                                        height: 'unset'
                                    });
                                    $('.ATLP-Basic-mask').css({
                                        width: $('.ATLP-Basic>img')[0].width,
                                        height: $('.ATLP-Basic>img')[0].height,
                                        display: "unset"
                                    });
                                    $('.ATLP-Basic-cut').css({
                                        width: $('.ATLP-Basic>img')[0].width,
                                        height: $('.ATLP-Basic>img')[0].width,
                                        top: '0'
                                    });
                                    $('.ATLP-Basic-cut').css('left', $('.AOA-top-left-part')[0].clientWidth / 2 - $('.ATLP-Basic-cut')[0].offsetWidth / 2);
                                    // pc
                                    $('.ATLP-Basic-cut').mousedown(function (e) {
                                        var posX1 = e.pageY
                                        var prop = $('.ATRP-container>img')[0].height / $('.ATLP-Basic>img')[0].height
                                        var picPosX1 = $('.ATLP-Basic-cut')[0].offsetTop
                                        var picPosX2 = $('.ATRP-container>img')[0].offsetTop
                                        var Xmin = 0
                                        var Xmax = $('.AOA-top-left-part')[0].clientHeight - $('.ATLP-Basic>img')[0].width
                                        var XRmin = -$('.ATRP-container>img')[0].height + $('.ATRP-container')[0].clientHeight
                                        var XRmax = 0
                                        $('body').css('cursor', 'move');
                                        $(window).mousemove(function (e) {
                                            var pos1 = e.pageY - posX1 + picPosX1
                                            var pos2 = picPosX2 - ((e.pageY - posX1) * prop)
                                            $('.ATLP-Basic-cut').css("top", pos1);
                                            //放慢移动的速度
                                            $('.ATLP-Basic-cut-copy').css("top", -pos1);
                                            //放慢移动的速度
                                            $('.ATRP-container>img').css("top", pos2);
                                            if (pos1 < Xmin || pos1 == Xmin) {
                                                $('.ATLP-Basic-cut').css("top", Xmin);
                                                $('.ATLP-Basic-cut-copy').css("top", -Xmin);
                                                $('.ATRP-container>img').css("top", XRmax);
                                                return
                                            }
                                            if (pos1 > Xmax || pos1 == Xmax) {
                                                $('.ATLP-Basic-cut').css("top", Xmax);
                                                $('.ATLP-Basic-cut-copy').css("top", -Xmax);
                                                $('.ATRP-container>img').css("top", XRmin);
                                            }
                                        });
                                        $(window).mouseup(function () {
                                            $(window).unbind('mousemove');
                                            $('body').css('cursor', 'unset');
                                        });
                                    });
                                    // mobile
                                    $('.ATLP-Basic-cut').on('touchstart', function (e) {
                                        var posX1 = e.touches[0].pageY
                                        var prop = $('.ATRP-container>img')[0].height / $('.ATLP-Basic>img')[0].height
                                        var picPosX1 = $('.ATLP-Basic-cut')[0].offsetTop
                                        var picPosX2 = $('.ATRP-container>img')[0].offsetTop
                                        var Xmin = 0
                                        var Xmax = $('.AOA-top-left-part')[0].clientHeight - $('.ATLP-Basic>img')[0].width
                                        var XRmin = -$('.ATRP-container>img')[0].height + $('.ATRP-container')[0].clientHeight
                                        var XRmax = 0
                                        $('body').css('cursor', 'move');
                                        $(window).on('touchmove', function (e) {
                                            var pos1 = e.touches[0].pageY - posX1 + picPosX1
                                            var pos2 = picPosX2 - ((e.touches[0].pageY - posX1) * prop)
                                            $('.ATLP-Basic-cut').css("top", pos1);
                                            //放慢移动的速度
                                            $('.ATLP-Basic-cut-copy').css("top", -pos1);
                                            //放慢移动的速度
                                            $('.ATRP-container>img').css("top", pos2);
                                            if (pos1 < Xmin || pos1 == Xmin) {
                                                $('.ATLP-Basic-cut').css("top", Xmin);
                                                $('.ATLP-Basic-cut-copy').css("top", -Xmin);
                                                $('.ATRP-container>img').css("top", XRmax);
                                                return
                                            }
                                            if (pos1 > Xmax || pos1 == Xmax) {
                                                $('.ATLP-Basic-cut').css("top", Xmax);
                                                $('.ATLP-Basic-cut-copy').css("top", -Xmax);
                                                $('.ATRP-container>img').css("top", XRmin);
                                            }
                                        });
                                        $(window).on('touchend', function () {
                                            $(window).unbind('touchmove');
                                            $('body').css('cursor', 'unset');
                                        });
                                    });
                                } else {
                                    //横盒子
                                    $('.ATLP-Basic>img').css({
                                        width: $('.AOA-top-left-part')[0].clientWidth,
                                        height: 'unset'
                                    });
                                    $('.ATLP-Basic-cut').css({
                                        width: $('.ATLP-Basic>img')[0].height,
                                        height: $('.ATLP-Basic>img')[0].height,
                                        top: 170 / 2 - $('.ATLP-Basic>img')[0].height / 2,
                                        left: '0'
                                    });
                                    $('.ATRP-container>img').css({
                                        width: 'unset',
                                        height: '100%',
                                        left: '0',
                                        top: 'unset'
                                    });
                                    $('.ATLP-Basic-cut-copy').css({
                                        left: '0',
                                        top: 'unset',
                                        width: $('.ATLP-Basic>img')[0].width,
                                        height: 'unset'
                                    });
                                    $('.ATLP-Basic-mask').css({
                                        width: '100%',
                                        height: $('.ATLP-Basic>img')[0].height,
                                        display: "unset"
                                    });
                                    // pc
                                    $('.ATLP-Basic-cut').mousedown(function (e) {
                                        var prop = $('.ATRP-container>img')[0].width / $('.ATLP-Basic>img')[0].width
                                        var posX1 = e.pageX
                                        var picPosX1 = this.offsetLeft
                                        var picPosX2 = $('.ATRP-container>img')[0].offsetLeft
                                        var Xmin = 0
                                        var Xmax = $('.AOA-top-left-part')[0].clientWidth - $('.ATLP-Basic-cut')[0].clientWidth
                                        var XRmin = -$('.ATRP-container>img')[0].width + $('.ATRP-container')[0].clientWidth
                                        var XRmax = 0
                                        $('body').css('cursor', 'move');
                                        $(window).mousemove(function (e) {
                                            var pos1 = e.pageX - posX1 + picPosX1
                                            var pos2 = -(e.pageX - posX1) * prop + picPosX2
                                            $('.ATLP-Basic-cut').css("left", pos1);
                                            //放慢移动的速度
                                            $('.ATLP-Basic-cut-copy').css("left", -pos1);
                                            //放慢移动的速度
                                            $('.ATRP-container>img').css("left", pos2);
                                            if (pos1 < Xmin || pos1 == Xmin) {
                                                $('.ATLP-Basic-cut').css("left", Xmin);
                                                $('.ATLP-Basic-cut-copy').css("left", -Xmin);
                                                $('.ATRP-container>img').css("left", XRmax);
                                                return
                                            }
                                            if (pos1 > Xmax || pos1 == Xmax) {
                                                $('.ATLP-Basic-cut').css("left", Xmax);
                                                $('.ATLP-Basic-cut-copy').css("left", -Xmax);
                                                $('.ATRP-container>img').css("left", XRmin);
                                            }
                                        });
                                        $(window).mouseup(function () {
                                            $(window).unbind('mousemove');
                                            $('body').css('cursor', 'unset');
                                        });
                                    });
                                    // mobile
                                    $('.ATLP-Basic-cut').on('touchstart', function (e) {
                                        var prop = $('.ATRP-container>img')[0].width / $('.ATLP-Basic>img')[0].width
                                        var posX1 = e.touches[0].pageX
                                        var picPosX1 = this.offsetLeft
                                        var picPosX2 = $('.ATRP-container>img')[0].offsetLeft
                                        var Xmin = 0
                                        var Xmax = $('.AOA-top-left-part')[0].clientWidth - $('.ATLP-Basic-cut')[0].clientWidth
                                        var XRmin = -$('.ATRP-container>img')[0].width + $('.ATRP-container')[0].clientWidth
                                        var XRmax = 0
                                        $('body').css('cursor', 'move');
                                        $(window).on('touchmove', function (e) {
                                            var pos1 = e.touches[0].pageX - posX1 + picPosX1
                                            var pos2 = -(e.touches[0].pageX - posX1) * prop + picPosX2
                                            $('.ATLP-Basic-cut').css("left", pos1);
                                            //放慢移动的速度
                                            $('.ATLP-Basic-cut-copy').css("left", -pos1);
                                            //放慢移动的速度
                                            $('.ATRP-container>img').css("left", pos2);
                                            if (pos1 < Xmin || pos1 == Xmin) {
                                                $('.ATLP-Basic-cut').css("left", Xmin);
                                                $('.ATLP-Basic-cut-copy').css("left", -Xmin);
                                                $('.ATRP-container>img').css("left", XRmax);
                                                return
                                            }
                                            if (pos1 > Xmax || pos1 == Xmax) {
                                                $('.ATLP-Basic-cut').css("left", Xmax);
                                                $('.ATLP-Basic-cut-copy').css("left", -Xmax);
                                                $('.ATRP-container>img').css("left", XRmin);
                                            }
                                        });
                                        $(window).on('touchend', function () {
                                            $(window).unbind('touchmove');
                                            $('body').css('cursor', 'unset');
                                        });
                                    });
                                }
                            }
                        }
                    });
                    $('.AOA-bottom-right-input').click(function (e) {
                        var getImage = function (b64) {
                            var image = new Image();
                            image.src = b64;
                            image.onload = function () {
                                var height = this.height;
                                var width = this.width;
                                canvas.height = height;
                                canvas.width = width;
                                content.drawImage(this, 0, 0, width, height);
                                drawRect();
                            }
                        };
                        var drawRect = async function () {
                            var w = clone[1].xx - clone[0].x;
                            var h = clone[1].yy - clone[0].y;
                            var cutImage = content.getImageData(clone[0].x, clone[0].y, w, h);
                            var newImage = createNewCanvas(cutImage, w, h);
                            var upgheadImg = await base64toFile(newImage, window.localStorage.token)
                            //文件名携带了本地token信息
                            var data = new FormData();
                            data.append('file', upgheadImg);
                            $('.AOA-bottom').prepend('<section style="position: absolute;bottom: 30px;" class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>');
                            $.ajax({
                                type: "post",
                                url: "/uploadMedia/sendHeadImg",
                                data: data,
                                processData: false,
                                contentType: false,
                                success: function (response) {
                                    if (response.isUpload == true) {
                                        $('.AOA-bottom>.commentSection_wait').remove();

                                        if ($('.headpic>img')[0]) {
                                            $('.headpic>img').remove();
                                        }
                                        $('.mask').remove();
                                        $('.AvatarOperationArea').remove();

                                        $('.headpicSvg').attr('viewBox', "0 0 70 70");
                                        $('.headpicSvg>path').remove();
                                        $('.headpicSvg').append('<svg><text x="5" y="41" fill="white">更换头像</text></svg>');
                                        $('.headpicSvg').css({
                                            'display': 'none',
                                            'position': 'relative',
                                            'z-index': '5',
                                            'background-color': 'rgba(0,0,0,.5)'
                                        });
                                        $('.headpic').append('<img onerror=\'picError(this)\' src="/head/' + response.userHeadName + '">');
                                        $('.headpic').hover(function () {
                                            // over
                                            if ($('.headpic>img')[0]) {
                                                $('.headpicSvg').show();
                                            }
                                        }, function () {
                                            // out
                                            if ($('.headpic>img')[0]) {
                                                $('.headpicSvg').hide();
                                            }
                                        })
                                    }
                                }
                            });
                        };
                        var createNewCanvas = function (content, width, height) {
                            var nCanvas = document.createElement('canvas');
                            var nCtx = nCanvas.getContext('2d');
                            nCanvas.width = width;
                            nCanvas.height = height;
                            nCtx.putImageData(content, 0, 0);
                            return nCanvas.toDataURL('image/png');
                        }
                        var prop = $('.ATLP-Basic>img')[0].naturalHeight / $('.ATLP-Basic>img')[0].naturalWidth
                        if (prop > 1) { //竖盒子
                            if ($('.ATLP-Basic-cut>img')[0]) {
                                getImage($('.ATLP-Basic>img')[0].src)
                                $('.later').css('width', '150px');
                                var canvas = document.createElement("canvas");
                                var content = canvas.getContext('2d');
                                var prop = $('.ATLP-Basic>img')[0].naturalHeight / $('.ATLP-Basic>img')[0].clientHeight
                                var clone = [{
                                    x: 0,
                                    y: $('.ATLP-Basic-cut')[0].offsetTop * prop
                                }, {
                                    xx: $('.ATLP-Basic>img')[0].naturalWidth,
                                    yy: $('.ATLP-Basic-cut')[0].offsetTop * prop + $('.ATLP-Basic-cut')[0].clientHeight * prop
                                }];
                            } else {
                                alert('请选择头像')
                            }
                        } else { //横盒子
                            if ($('.ATLP-Basic-cut>img')[0]) {
                                getImage($('.ATLP-Basic>img')[0].src)
                                $('.later').css('width', '150px');
                                var canvas = document.createElement("canvas");
                                var content = canvas.getContext('2d');
                                var prop = $('.ATLP-Basic>img')[0].naturalHeight / $('.ATLP-Basic>img')[0].clientHeight
                                var clone = [{
                                    x: $('.ATLP-Basic-cut')[0].offsetLeft * prop,
                                    y: 0
                                }, {
                                    xx: $('.ATLP-Basic-cut')[0].offsetLeft * prop + $('.ATLP-Basic-cut')[0].clientWidth * prop,
                                    yy: $('.ATLP-Basic>img')[0].naturalHeight
                                }];
                            } else {
                                alert('请选择头像')
                            }
                        }
                    });
                });

                //个人信息点击事件
                $('.person').click(function (e) {
                    $('.select').removeClass('select');
                    $('.person').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">个人信息</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/person",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="personPart centerBottom-main">
                        <button id="personChange">编辑</button>
                        <div id="accountId">
                            <span>账号：</span>
                            <div><input id="accountId-input" disabled type="text" value="${response.userAccount}"></div>
                        </div>
                        <div id="nickname">
                            <span>昵称：</span>
                            <div><input id="nickname-input" disabled type="text" value="${response.userName}"></div>
                        </div>
                        <div id="email">
                            <span>已绑邮箱：</span>
                            <div><input id="emal-input" disabled type="text" value="${response.userEmail}"></div>
                        </div>
                        <div id="sign">
                            <span>个性签名：</span>
                            <div><input id="sign-input" disabled type="text" value="${response.word}"></div>
                        </div>
                    </div>`);
                            $('#personChange').click(function (e) {
                                $('#nickname-input,#sign-input').css('color', 'black');
                                $('#nickname-input,#sign-input').attr('disabled', false);
                                if ($('#personSave').length == 0) {
                                    $('#personChange').after('<button id="personSave">保存</button>');
                                }
                                $('#personSave').click(function (e) {
                                    $.ajax({
                                        type: "post",
                                        url: "person/personChange",
                                        data: {
                                            token: window.localStorage.token,
                                            nickName: $('#nickname-input')[0].value,
                                            signWord: $('#sign-input')[0].value
                                        },
                                        success: function (response) {
                                            if (response.isHave == true) {
                                                alert('该昵称已被使用')
                                            }
                                            if (response.isChange == true) {
                                                $('#personSave').remove();
                                                $('#nickname-input,#sign-input').attr('disabled', true);
                                                $('#nickname-input,#sign-input').css('color', '');
                                                $('.userid').html(xssFilter($('#nickname-input')[0].value));
                                                alert('修改成功')
                                            }
                                        }
                                    });
                                });
                            });
                        }
                    });
                });

                //点赞点击事件
                $('.like').click(function (e) {
                    $('.select').removeClass('select');
                    $('.like').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">我的点赞</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/like",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="likeArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.likeArticle').append(`
                            <div class="article_smallCard" articleId="${response.data[i].articleId}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                            <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].articleTime)}</div>
                            <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                });

                //收藏点击事件
                $('.collection').click(function (e) {
                    $('.select').removeClass('select');
                    $('.collection').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">我的收藏</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/collect",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="collectArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.collectArticle').append(`<div class="article_smallCard" articleId="${response.data[i].articleId}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
        
                            <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].articleTime)}</div>
                            <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                });

                //评论点击事件
                $('.comment').click(function (e) {
                    $('.select').removeClass('select');
                    $('.comment').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">我的评论</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/comment",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="commentArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.commentArticle').append(`<div class="article_smallCard" fatherid="${response.data[i].fatherid}" isSec="${response.data[i].isSec}" commentId="${response.data[i].commentId}" articleId="${response.data[i].articleId}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_action" onclick="commentaction(this)" isopen="false"><span>. . .</span></div>
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                            <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].contentTime)}</div>
                            <div class="innercontent_content">${xssFilter(response.data[i].content)}</div>
                            <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                });

                //文章点击事件
                $('.articles').click(function (e) {
                    $('.select').removeClass('select');
                    $('.articles').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">我的文章</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/article",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_action" onclick="articleaction(this)" isopen="false"><span>. . .</span></div>
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                            <div class="innercontent_title">${xssFilter(response.data[i].name)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                            <div class="innercontent_data">赞（${response.data[i].likerslength}） 踩（${response.data[i].unlikerslength}） 评论（${response.data[i].commentslength}）收藏（${response.data[i].collectorslength}）</div>
                            <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                });

                //关注点击事件
                $('.follow').click(function (e) {
                    $('.select').removeClass('select');
                    $('.follow').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">我的关注</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').html('Coding...');
                    return
                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                });

                //草稿箱点击事件
                $('.draftBox').click(function (e) {
                    $('.select').removeClass('select');
                    $('.draftBox').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">草稿箱</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/waitPublish",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                            <div class="article_smallCard_innercontent">
        
                            <div class="innercontent_action" onclick="draftBoxDelete(this)" isopen="false"><span>. . .</span></div>
                            
                            <div class="innercontent_title">${response.data[i].name.length == 0?'<span style="color:#817a7a;">暂无标题</span>':xssFilter(response.data[i].name)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                            <div class="innercontent_detail"><a target="_blank" href="/writer?articleId=${response.data[i]._id}">编辑</a></div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                });

                //回收站点击事件
                $('.haveDelete').click(function (e) {
                    $('.select').removeClass('select');
                    $('.haveDelete').addClass('select');

                    $('.commentSection_wait').remove();
                    $('.navigation').remove();
                    $('.centerBottom').prepend('<div class="navigation">回收站</div>');
                    $('.centerBottom-main').remove();

                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $.ajax({
                        type: "post",
                        url: "/person/haveDelete",
                        data: {
                            token: window.localStorage.token
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                            <div class="innercontent_title">${xssFilter(response.data[i].name)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                            <div class="innercontent_data">赞（${response.data[i].likerslength}） 踩（${response.data[i].unlikerslength}） 评论（${response.data[i].commentslength}）收藏（${response.data[i].collectorslength}）</div>
                            <div class="innercontent_detail" onclick="backRemove(this)">恢复</div>
                            </div>
                            </div>`);
                            }
                        }
                    });
                });
            } else {
                //非本人
                $('.headpicSvg').remove();
                $('.centerTop').html('');
                $('.centerTop').append(`
                <div>
                <div class="articles">
                    <svg t="1617952066691" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     p-id="1156" width="200" height="200">F
                        <path d="M805.2 151.1c10 0 18.4 8.4 18.4 18.4v685.3c0 10-8.4 18.4-18.4 18.4H219c-10 0-18.4-8.4-18.4-18.4V169.5c0-10 8.4-18.4 18.4-18.4h586.2m0-55.1H219c-40.4 0-73.4 33.1-73.4 73.4v685.3c0 40.4 33.1 73.4 73.4 73.4h586.2c40.4 0 73.4-33.1 73.4-73.4V169.5c0-40.4-33-73.5-73.4-73.5z"
                        fill="#0C90F8" p-id="1157">
                        </path>
                        <path d="M633.9 328.5H294.2c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5h339.7c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5zM736.2 539.7H288.5c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5h447.7c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5zM736.2 750.8H288.5c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5h447.7c15.2 0 27.5 12.3 27.5 27.5s-12.3 27.5-27.5 27.5z"
                        fill="#4C4F54" p-id="1158">
                        </path>
                    </svg>
                    文章
                </div>
            </div>
            <div>
                <div class="comment">
                    <svg t="1618630282850" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     p-id="3626" width="200" height="200">
                        <path d="M193 317h-29a6 6 0 0 0-6 6v408a6 6 0 0 0 6 6h83.806v121.532a6 6 0 0 0 10.195 4.29L386.698 737h200.66l60.159 58.815A66.346 66.346 0 0 1 635 797H411.154L299.945 905.725c-26.064 25.482-67.85 25.01-93.332-1.054a66 66 0 0 1-18.807-46.14V797H164c-36.45 0-66-29.55-66-66V323c0-36.45 29.55-66 66-66h29v60z m642.194 449.532a66 66 0 0 1-18.807 46.139c-25.482 26.064-67.268 26.536-93.332 1.054L582.183 676H299c-36.45 0-66-29.55-66-66V164c0-36.45 29.55-66 66-66h560c36.45 0 66 29.55 66 66v446c0 36.45-29.55 66-66 66h-23.806v90.532z m-60-150.532H859a6 6 0 0 0 6-6V164a6 6 0 0 0-6-6H299a6 6 0 0 0-6 6v446a6 6 0 0 0 6 6h307.64L765 770.822a6 6 0 0 0 10.194-4.29V616z"
                        fill="#2F54EB" p-id="3627">
                        </path>
                        <path d="M757.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z"
                        fill="#85A5FF" p-id="3628">
                        </path>
                        <path d="M575.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z"
                        fill="#85A5FF" p-id="3629">
                        </path>
                        <path d="M392.5 384.5m0-49.5a49.5 49.5 0 1 0 0 99 49.5 49.5 0 1 0 0-99Z"
                        fill="#85A5FF" p-id="3630">
                        </path>
                    </svg>
                    评论
                </div>
            </div>
            <div>
                <div class="follow">
                    <svg t="1617157865883" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     p-id="4723" width="200" height="200">
                        <path d="M680.044 778.887L657.25 645.898c-5.78-33.726 5.415-68.134 29.94-92.026l96.71-94.21-133.687-19.448c-33.904-4.932-63.211-26.197-78.385-56.875l-59.831-120.97-59.832 120.97c-15.173 30.678-44.48 51.943-78.384 56.875l-133.688 19.447 96.71 94.211c24.526 23.892 35.72 58.3 29.94 92.026l-22.792 132.989 119.602-62.745a104.292 104.292 0 0 1 96.888 0l119.602 62.745z m-182.952 1.018l-191.41 100.417c-15.672 8.221-35.05 2.198-43.282-13.453a31.975 31.975 0 0 1-3.218-20.287l36.477-212.835a31.985 31.985 0 0 0-9.212-28.316L131.672 454.657c-12.672-12.345-12.925-32.612-0.564-45.268a32.068 32.068 0 0 1 18.325-9.324l213.954-31.124a32.05 32.05 0 0 0 24.119-17.5l95.754-193.6c7.84-15.85 27.062-22.353 42.933-14.523a32.032 32.032 0 0 1 14.543 14.523l95.754 193.6a32.05 32.05 0 0 0 24.118 17.5l213.955 31.124c17.517 2.548 29.65 18.796 27.098 36.29a31.997 31.997 0 0 1-9.337 18.302L737.549 605.43a31.985 31.985 0 0 0-9.212 28.316l36.477 212.835c2.986 17.426-8.738 33.97-26.186 36.953a32.09 32.09 0 0 1-20.314-3.213l-191.41-100.417a32.09 32.09 0 0 0-29.812 0z"
                        fill="#5090F1" p-id="4724">
                        </path>
                    </svg>
                    关注
                </div>
            </div>
                `);

                $.ajax({
                    type: "post",
                    url: "/person/sendToken_travel",
                    data: {
                        userId: window.location.search.split('=')[1]
                    },
                    success: function (response) {
                        $('.headpic').append('<img onerror=\'picError(this)\' src="/head/' + response + '">');
                    }
                });


                //先执行查询文章
                $('.centerBottom').prepend('<div class="navigation">文章</div>');
                $.ajax({
                    type: "post",
                    url: "/person/article_travel",
                    data: {
                        token: window.localStorage.token,
                        userId: window.location.search.split('=')[1]
                    },
                    success: function (response) {
                        if (response.isLogin == false) {
                            location.href = 'https://www.shushuo.space/'
                            return
                        }
                        $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                        for (let i = 0; i < response.data.length; i++) {
                            $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                            <div class="article_smallCard_innercontent">
                            <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                            <div class="innercontent_title">${xssFilter(response.data[i].name)}</div>
                            <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                            <div class="innercontent_data">赞（${response.data[i].likerslength}） 踩（${response.data[i].unlikerslength}） 评论（${response.data[i].commentslength}）收藏（${response.data[i].collectorslength}）</div>
                            <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                            </div>
                            </div>`);
                        }
                    }
                });

                $('.articles').click(function () {
                    $('.select').removeClass('select');
                    $('.articles').addClass('select');

                    $('.navigation').html('文章');
                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $('.centerBottom-main').remove();
                    $.ajax({
                        type: "post",
                        url: "/person/article_travel",
                        data: {
                            token: window.localStorage.token,
                            userId: window.location.search.split('=')[1]
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="personArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.personArticle').append(`<div class="article_smallCard" articleId="${response.data[i]._id}">
                                <div class="article_smallCard_innercontent">
                                <div class="innercontent_position">${response.data[i].bigmName}/${response.data[i].smallName}</div>
                                <div class="innercontent_title">${xssFilter(response.data[i].name)}</div>
                                <div class="innercontent_time">${timeSet(response.data[i].time)}</div>
                                <div class="innercontent_data">赞（${response.data[i].likerslength}） 踩（${response.data[i].unlikerslength}） 评论（${response.data[i].commentslength}）收藏（${response.data[i].collectorslength}）</div>
                                <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                                </div>
                                </div>`);
                            }
                        }
                    });
                });

                $('.comment').click(function () {
                    $('.select').removeClass('select');
                    $('.comment').addClass('select');

                    $('.navigation').html('评论');
                    $('.navigation').after(`<section class="commentSection_wait"><span class="commentSection_wait_loader"> </span></section>`);
                    $('.centerBottom-main').remove();
                    $.ajax({
                        type: "post",
                        url: "/person/comment_travel",
                        data: {
                            token: window.localStorage.token,
                            userId: window.location.search.split('=')[1]
                        },
                        success: function (response) {
                            if (response.isLogin == false) {
                                location.href = 'https://www.shushuo.space/'
                                return
                            }
                            $('.commentSection_wait').remove();
                            $('.navigation').after(`<div class="commentArticle centerBottom-main"></div>`);
                            for (let i = 0; i < response.data.length; i++) {
                                $('.commentArticle').append(`<div class="article_smallCard" articleId="${response.data[i].articleId}">
                                <div class="article_smallCard_innercontent">
                                <div class="innercontent_title">${xssFilter(response.data[i].articleName)}</div>
                                <div class="innercontent_time">${timeSet(response.data[i].contentTime)}</div>
                                <div class="innercontent_content">${xssFilter(response.data[i].content)}</div>
                                <div class="innercontent_detail" onclick="getDetail(this)">详情</div>
                                </div>
                                </div>`);
                            }
                        }
                    });
                });
                $('.follow').click(function (e) {
                    e.preventDefault();
                    $('.select').removeClass('select');
                    $('.follow').addClass('select');
                });

                $('.articles').addClass('select');
                return
            }

        }
    });

});