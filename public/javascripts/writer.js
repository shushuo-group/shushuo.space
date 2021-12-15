/**
 * author: Jun_jie Ge
 * email:1109189702@qq.com
 */

$(document).ready(async function () {

    //登录验证
    await $.ajax({
        type: "post",
        url: "/CheckLogin",
        data: {
            token: window.localStorage.token
        },
        success: function (response) {
            if (response.isLogin == false) {
                //识别未登录
                window.location.href = web_url
                return
            }
            $('.headImgPart').html(`<a style="cursor:pointer;" onclick='window.open("/person?userId=${response.data_id}")'><img onerror=\'picError(this)\'  onload=\'pic_load(this)\' class="head" src=${zip_dir}${response.userHeadimg}></a>`);
        }
    });

    function convertBase64UrlToBlob(urlData, callback) {
        const arr = urlData.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        callback(new Blob([u8arr], {
            type: mime
        }));
    }

    function canvasDataURL(file, callback) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            const img = new Image();
            var quality = 0.2;
            const canvas = document.createElement('canvas');
            const drawer = canvas.getContext('2d');
            img.src = this.result;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                convertBase64UrlToBlob(canvas.toDataURL(file.type, quality), callback);
            }
        }
    }

    // 创建富文本编辑器
    const E = window.wangEditor
    const editor = new E(".writerInputPart")
    editor.highlight = hljs
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024

    editor.config.customUploadImg = async function (resultFiles, insertImgFn) {

        if (resultFiles[0].type == 'image/gif') {

            function compressGif(file, colors) {
                var _file = file;
                var Blob2ImageFileForWXBrowser
                var fr = new FileReader();
                fr.readAsArrayBuffer(_file);
                fr.onload = function (e) {
                    var result = gifmin(fr.result, colors);
                    var obj = new Blob([result], { //转化Blob对象
                        type: 'application/octet-stream'
                    });
                    Blob2ImageFileForWXBrowser = new window.File([obj], _file.name, { //将压缩好的GIF转化成file文件
                        type: _file.type
                    });
                    var data = new FormData();
                    data.append('file', Blob2ImageFileForWXBrowser);
                    data.append('token', window.localStorage.token);


                    //GIF
                    $.ajax({
                        type: "post",
                        url: "http://localhost:6788/uploadfile/",
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            insertImgFn(`${zip_dir}${response.path}`)

                            $('.commentSection_wait').remove();

                            $('img[src="/pic/' + response.path + '"]').css({
                                'margin': '0 auto',
                                'margin-top': '10px',
                                'display': 'block'
                            });
                            $('img[src="/pic/' + response.path + '"]').attr('width', '50%');
                            editor.txt.append('<p><br></p>')
                        }
                    });
                }
            }
            $('.w-e-toolbar').append(`
            <div class="commentSection_wait">正在上传中...</div>
            `);

            compressGif(resultFiles[0], 20)
            return
        }
        canvasDataURL(resultFiles[0], function (blob) {

            $('.w-e-toolbar').append(`
            <div class="commentSection_wait">正在上传中...</div>
            `);

            var compresFile = new File([blob], resultFiles[0].name, {
                type: resultFiles[0].type
            })
            var data = new FormData();
            data.append('file', compresFile);
            data.append('token', window.localStorage.token);

            //普通图片
            $.ajax({
                type: "post",
                url: "http://localhost:6788/uploadfile/",
                data: data,
                processData: false,
                contentType: false,
                success: function (response) {
                    insertImgFn(`${zip_dir}${response.path}`)

                    $('.commentSection_wait').remove();

                    $('img[src="/pic/' + response.path + '"]').css({
                        'margin': '0 auto',
                        'margin-top': '10px',
                        'display': 'block'
                    });
                    $('img[src="/pic/' + response.path + '"]').attr('width', '50%');
                    editor.txt.append('<p><br></p>')
                }
            });
        })

    }
    editor.config.showLinkImg = false
    editor.config.uploadImgMaxLength = 1
    editor.config.menus = [
        'head',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'link',
        'quote',
        'image',
        'table',
        'list',
        'code',
        'splitLine',
        'undo',
        'redo'
    ]

    //取消全屏功能
    editor.config.showFullScreen = false
    editor.create()

    let temp_height = $(window).height() - $('.w-e-text-container')[0].getBoundingClientRect().top
    if (!is_small_client) {
        temp_height -= 10
    }
    $('.w-e-text-container').css('height', temp_height);

    titleMaxNumber = $('#title').attr('maxlength')

    // “发布路径” 的 “大厅” 点击事件
    $('#dating').click(async function () {
        if (!$('.datingSelectPart')[0]) {

            //未曾出现过可选择区域模块
            $('.subWays').after(`<div class="datingSelectPart"><div><div class="subWays-part">选择区域 ：</div><div class="datingSelect"><div><div>大区域</div><select id="bigModule"><option id="bigModule-white">------</option></select></div><div><div>小区间</div><select id="smallModule"><option id="smallModule-white">------</option></select></div></div></div></div>
            `);
            await $.ajax({
                type: "post",
                url: "/writer/getBigModule",
                success: function (response) {
                    var data = response.sendData
                    for (let i = 0; i < data.length; i++) {
                        $('#bigModule-white').after(`<option bigMname = "${data[i].bigMname}" class="bigMbutton" bigMid=${data[i].bigMid}>${data[i].bigMname}</option>`);
                        $('.bigMbutton[bigMname="' + data[i].bigMname + '"]').data('smallMinfors', data[i].smallM);
                    }
                }
            });
            $('#bigModule').change(function (e) {
                if (this.value !== '------') {
                    //点击非空白大模块
                    var smallMinor = $('.bigMbutton[bigmname="' + this.value + '"]').data('smallMinfors');
                    $('.smallModuleButton').remove();
                    for (let i = 0; i < smallMinor.length; i++) {
                        $('#smallModule-white').after(`<option smallmname = "${smallMinor[i].smallMname}" class="smallModuleButton" smallid="${smallMinor[i].smallMid}">${smallMinor[i].smallMname}</option>`);
                    }
                } else {
                    //点击空白大模块
                    $('.smallModuleButton').remove();
                }
            });
        } else {
            $('.datingSelectPart').show();
        }
    });

    // “发布路径” 的 “树洞” 点击事件
    $('#shudong').click(function () {
        if ($('.datingSelectPart')[0]) {
            $('.datingSelectPart').hide();
            return
        }
    });

    if (window.location.search.split('&&')[0] == '?articleChange') { //进入已发布文档编辑功能
        $('#submitButton').html('确认更改');
        $('#title').attr('disabled', 'true');
        $.ajax({
            type: "post",
            url: "/article/articleDetail03",
            data: {
                token: window.localStorage.token,
                articleId: window.location.search.split('=')[1]
            },
            success: function (response) {
                if (response.isLogin == false) {
                    alert('请本人登陆')
                    window.location.href = web_url
                    return
                }

                if (response.big !== 0) {
                    // 非树洞
                    $('#dating').attr('checked', 'checked').attr('disabled', 'true');
                    $('#shudong').attr('disabled', 'true');
                    $('.subWays').after(`<div class="datingSelectPart"><div><div class="subWays-part">选择区域 ：</div><div class="datingSelect"><div><div>大区域</div><select disabled="true" id="bigModule"><option id="bigModule-white">${response.big.name}</option></select></div><div><div>小区间</div><select disabled="true" id="smallModule"><option id="smallModule-white">${response.small.name}</option></select></div></div></div></div>`);
                } else {
                    // 树洞
                    $('#shudong').attr('checked', 'checked').attr('disabled', 'true');
                    $('#dating').attr('disabled', 'true');
                }

                $('#title').val(`${response.title}`);
                $('.w-e-text').html(`${response.conntent.length==0?`<p data-we-empty-p=""><br></p>`:response.conntent}`);
                $('#submitButton').attr('articleId', `${response.id}`);

                var imgs = $('.w-e-text').find('img')
                $('.w-e-text').find('img').hide();
                for (let i = 0; i < imgs.length; i++) {

                    $(imgs[i]).attr('onerror', 'picError(this)');

                    $(imgs[i]).parent().append(`<div class="img_uploading">图片正在加载中...</div>`);

                    imgs[i].onload = function () {

                        $(imgs[i]).siblings('div').remove();
                        $(imgs[i]).show();

                        // 此处仅用于过滤非法第三方图片
                        if (is_third_pic(this)) {
                            $('.writePart-select-part').css('position', 'relative').addClass('pic_3rd');
                            $(this).css({
                                'border': '3px solid red',
                                'box-sizing': 'content-box'
                            });
                        }

                    }
                }

                $('#submitButton').click(async function () {
                    for (let i = 0; i < $('img').length; i++) {
                        if ($('img:nth(' + i + ')').siblings('input').val() == '') {
                            $('img:nth(' + i + ')').siblings('input').remove();
                        }
                    }
                    $.ajax({
                        type: "post",
                        url: "/writer/articleUpDating03",
                        data: {
                            articleId: $('#submitButton').attr('articleid'),
                            content: editor.txt.html(), //文章所有结构css内容
                            token: window.localStorage.token //发送终端的token
                        },
                        success: function (response) {
                            if (response.isLogin == false) { //识别未登录
                                window.location.href = web_url
                                return
                            }
                            if (response.isUp == true) {
                                alert('更改文章成功')
                                window.location.href = web_url
                            }
                        }
                    });

                });

                //存入草稿
                $('#writeDraft').click(async function (e) {
                    if ($('#title')[0].value.length > titleMaxNumber) {
                        alert('文章标题请勿超过30个字符')
                        $('.titlePart').css('border-color', 'red');
                        return
                    }
                    //采用直接覆盖的目的是增加了一个存储历史草稿版本的功能
                    $.ajax({
                        type: "post",
                        url: "/writer/articleUpDating",
                        data: {
                            content: editor.txt.html(), //文章所有结构css内容
                            token: window.localStorage.token, //发送终端的token
                            ispublic: 'false', //大区域的模块id
                            articleTitle: $('#title')[0].value, //文章标题
                            isshow: false //文章隐私与否状态
                        },
                        success: function (response) {
                            if (response.isLogin == false) { //识别未登录
                                window.location.href = web_url
                                return
                            }
                            if (response.isUp == true) {
                                alert('存入草稿成功')
                                window.location.href = web_url
                            } else {
                                alert('上传失败')
                            }
                        }
                    });


                });
            }
        });
        return
    }

    if (window.location.search.split('=')[0] == '?articleId') { //草稿箱重新编辑的上传操作需要修改
        $.ajax({
            type: "post",
            url: "/article/articleDetail02",
            data: {
                token: window.localStorage.token,
                articleId: window.location.search.split('=')[1]
            },
            success: function (response) {

                if (response.isLogin == false) {
                    alert('请本人登陆')
                    window.location.href = web_url
                    return
                }

                $('#title').val(`${response.title}`);
                $('.w-e-text').html(`${response.conntent.length==0?`<p data-we-empty-p=""><br></p>`:response.conntent}`);
                $('#submitButton').attr('articleId', `${response.id}`);

                var imgs = $('.w-e-text').find('img')
                $('.w-e-text').find('img').hide();
                for (let i = 0; i < imgs.length; i++) {

                    $(imgs[i]).attr('onerror', 'picError(this)');

                    $(imgs[i]).parent().append(`<div class="img_uploading">图片正在加载中...</div>`);

                    imgs[i].onload = function () {

                        $(imgs[i]).siblings('div').remove();
                        $(imgs[i]).show();

                        // 此处仅用于过滤非法第三方图片
                        if (is_third_pic(this)) {
                            $('.writePart-select-part').css('position', 'relative').addClass('pic_3rd');
                            $(this).css({
                                'border': '3px solid red',
                                'box-sizing': 'content-box'
                            });
                        }

                    }
                }
                
                $('#submitButton').click(function (e) {
                    if ($('#dating')[0].checked == false && $('#shudong')[0].checked == false) {
                        alert('请检查发布信息')
                        return
                    }
                    if ($('#dating')[0].checked == true) {
                        if ($('#bigModule')[0].value == '------' || $('#smallModule')[0].value == '------') {
                            alert('请检查发布信息')
                            return
                        }
                    }
                    if ($('#title')[0].value == '') {
                        alert('请填写标题！')
                        return
                    }

                    if ($('#shudong')[0].checked == true) {
                        if ($('#title')[0].value.length > titleMaxNumber) {
                            alert('文章标题请勿超过30个字符')
                            $('.titlePart').css('border-color', 'red');
                            return
                        }
                        for (let i = 0; i < $('img').length; i++) {
                            if ($('img:nth(' + i + ')').siblings('input').val() == '') {
                                $('img:nth(' + i + ')').siblings('input').remove();
                            }
                        }
                        //树洞的ajax
                        $.ajax({
                            type: "post",
                            url: "/writer/articleUpDating02",
                            data: {
                                articleId: $('#submitButton').attr('articleid'),
                                content: editor.txt.html(), //文章所有结构css内容
                                token: window.localStorage.token, //发送终端的token
                                smallMid: 'shuDong', //大区域的模块id
                                bigMid: 'shuDong',
                                articleTitle: $('#title')[0].value, //文章标题
                                isshow: false //设置文章不show
                            },
                            success: function (response) {
                                if (response.isLogin == false) {
                                    //识别未登录
                                    window.location.href = web_url
                                    return
                                }
                                if (response.isUp == true) {
                                    alert('存入树洞成功')
                                    window.location.href = web_url
                                }
                            }
                        });
                    } else {
                        //大厅传送信息的ajax
                        var isShow = true
                        if ($('#title')[0].value.length > titleMaxNumber) {
                            alert('文章标题请勿超过30个字符')
                            $('.titlePart').css('border-color', 'red');
                            return
                        }
                        $.ajax({
                            type: "post",
                            url: "/writer/articleUpDating02",
                            data: {
                                articleId: $('#submitButton').attr('articleid'),
                                content: editor.txt.html(), //文章所有结构css内容
                                token: window.localStorage.token, //发送终端的token
                                bigMid: $('.bigMbutton[bigmname="' + $('#bigModule')[0].value + '"]').attr('bigmid'), //大区域的模块id
                                smallMid: $('.smallModuleButton[smallmname="' + $('#smallModule')[0].value + '"]').attr('smallid'), //小区域的模块id
                                articleTitle: $('#title')[0].value, //文章标题
                                isshow: isShow //文章隐私与否状态
                            },
                            success: function (response) {
                                if (response.isLogin == false) { //识别未登录
                                    window.location.href = web_url
                                    return
                                }
                                if (response.isUp == true) {
                                    alert('发表文章成功')
                                    window.location.href = web_url
                                }
                            }
                        });
                    }
                });

                //存入草稿
                $('#writeDraft').click(async function (e) {
                    if ($('#title')[0].value.length > titleMaxNumber) {
                        alert('文章标题请勿超过30个字符')
                        $('.titlePart').css('border-color', 'red');
                        return
                    }
                    //采用直接覆盖的目的是增加了一个存储历史草稿版本的功能
                    $.ajax({
                        type: "post",
                        url: "/writer/articleUpDating",
                        data: {
                            content: editor.txt.html(), //文章所有结构css内容
                            token: window.localStorage.token, //发送终端的token
                            ispublic: 'false', //大区域的模块id
                            articleTitle: $('#title')[0].value, //文章标题
                            isshow: false //文章隐私与否状态
                        },
                        success: function (response) {
                            if (response.isLogin == false) { //识别未登录
                                window.location.href = web_url
                                return
                            }
                            if (response.isUp == true) {
                                alert('存入草稿成功')
                                window.location.href = web_url
                            } else {
                                alert('上传失败')
                            }
                        }
                    });


                });
            }
        });

        return
    }

    /**
     * 初次进入编辑页面
     * 成功登录后进行绑定事件   如果进入以上俩个 if 将无法进行以下事件绑定
     */
    $('#submitButton').click(function (e) {
        if ($('#dating')[0].checked == false && $('#shudong')[0].checked == false) {
            alert('请检查发布信息')
            return
        }
        if ($('#dating')[0].checked == true) {
            if ($('#bigModule')[0].value == '------' || $('#smallModule')[0].value == '------') {
                alert('请检查发布信息')
                return
            }
        }
        if ($('#title')[0].value == '') {
            alert('请填写标题！')
            return
        }
        if ($('#shudong')[0].checked == true) {
            if ($('#title')[0].value.length > titleMaxNumber) {
                alert('文章标题请勿超过30个字符')
                $('.titlePart').css('border-color', 'red');
                return
            }
            for (let i = 0; i < $('img').length; i++) {
                if ($('img:nth(' + i + ')').siblings('input').val() == '') {
                    $('img:nth(' + i + ')').siblings('input').remove();
                }
            }
            //树洞的ajax
            $.ajax({
                type: "post",
                url: "/writer/articleUpDating",
                data: {
                    content: editor.txt.html(), //文章所有结构css内容
                    token: window.localStorage.token, //发送终端的token
                    smallMid: 'shuDong', //大区域的模块id
                    bigMid: 'shuDong',
                    ispublic: true,
                    articleTitle: $('#title')[0].value, //文章标题
                    isshow: false //设置文章不show
                },
                success: function (response) {
                    if (response.isLogin == false) {
                        //识别未登录
                        window.location.href = web_url
                        return
                    }
                    if (response.isUp == true) {
                        alert('存入树洞成功')
                        window.location.href = window.location.href
                    }
                }
            });
        } else {
            //大厅传送信息的ajax
            var isShow = true
            if ($('#title')[0].value.length > titleMaxNumber) {
                alert('文章标题请勿超过30个字符')
                $('.titlePart').css('border-color', 'red');
                return
            }
            $.ajax({
                type: "post",
                url: "/writer/articleUpDating",
                data: {
                    content: editor.txt.html(), //文章所有结构css内容
                    token: window.localStorage.token, //发送终端的token
                    bigMid: $('.bigMbutton[bigmname="' + $('#bigModule')[0].value + '"]').attr('bigmid'), //大区域的模块id
                    smallMid: $('.smallModuleButton[smallmname="' + $('#smallModule')[0].value + '"]').attr('smallid'), //小区域的模块id
                    articleTitle: $('#title')[0].value, //文章标题
                    isshow: isShow //文章隐私与否状态
                },
                success: function (response) {
                    if (response.isLogin == false) { //识别未登录
                        window.location.href = web_url
                        return
                    }
                    if (response.isUp == true) {
                        alert('发表文章成功')
                        window.location.href = window.location.href
                    }
                }
            });
        }
    });

    //存入草稿
    $('#writeDraft').click(function (e) {
        if ($('#title')[0].value.length > titleMaxNumber) {
            alert('文章标题请勿超过30个字符')
            $('.titlePart').css('border-color', 'red');
            return
        }
        //采用直接覆盖的目的是增加了一个存储历史草稿版本的功能
        $.ajax({
            type: "post",
            url: "/writer/articleUpDating",
            data: {
                content: editor.txt.html(), //文章所有结构css内容
                token: window.localStorage.token, //发送终端的token
                ispublic: 'false', //大区域的模块id
                articleTitle: $('#title')[0].value, //文章标题
                isshow: false //文章隐私与否状态
            },
            success: function (response) {
                if (response.isLogin == false) { //识别未登录
                    window.location.href = web_url
                    return
                }
                if (response.isUp == true) {
                    alert('存入草稿成功')
                    window.location.href = web_url
                } else {
                    alert('上传失败')
                }
            }
        });
    });

});