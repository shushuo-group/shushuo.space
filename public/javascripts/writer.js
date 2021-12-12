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
                location.href = 'https://www.shushuo.space/'
                return
            }
            $('.headImgPart').html(`<a style="cursor:pointer;" onclick='window.open("/person?userId=${response.data_id}")'><img onerror=\'picError(this)\' class="head" src=/zipped_pic/${response.userHeadimg == "NaN.png" ? "NaN.png" : response.userHeadimg}></a>`);
        }
    });

    $('body').data('img', [])
    $('body').data('img02', [])

    async function removeimg() {
        var imgsub = []
        var imgnew = $('body').data('img02')

        for (let i = 0; i < imgnew.length; i++) {
            imgsub.push({
                src: imgnew[i].imgSrc
            })
        }

    }

    window.onbeforeunload = function () {
        removeimg()
    }

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

    setTimeout(() => {
        $('.loading').remove();
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
                            url: "https://www.shushuo.space/:6788/uploadfile/",
                            data: data,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                insertImgFn(`/zipped_pic/${response.path}`)

                                $('.commentSection_wait').remove();

                                $('img[src="/pic/' + response.path + '"]').css({
                                    'margin': '0 auto',
                                    'margin-top': '10px',
                                    'display': 'block'
                                });
                                $('img[src="/pic/' + response.path + '"]').attr('width', '50%');

                                editor.txt.append('<p><br></p>')

                                var a = $('body').data('img02')
                                a.push({
                                    imgSrc: 'https://www.shushuo.space/pic/' + response.path
                                })
                                $('body').data('img02', a)
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
                    url: "https://www.shushuo.space/:6788/uploadfile/",
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        insertImgFn(`/zipped_pic/${response.path}`)

                        $('.commentSection_wait').remove();

                        $('img[src="/pic/' + response.path + '"]').css({
                            'margin': '0 auto',
                            'margin-top': '10px',
                            'display': 'block'
                        });
                        $('img[src="/pic/' + response.path + '"]').attr('width', '50%');


                        editor.txt.append('<p><br></p>')

                        var a = $('body').data('img02')
                        a.push({
                            imgSrc: 'https://www.shushuo.space/pic/' + response.path
                        })
                        $('body').data('img02', a)
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
        editor.create()

        $('.w-e-text-container').css({
            'min-height': '700px',
            'height': 'unset'
        });
        $('.w-e-toolbar').css({
            'position': 'sticky',
            'top': '0px'
        });
        $('.w-e-text').css({
            'overflow-y': 'unset'
        });

        titleMaxNumber = $('#title').attr('maxlength')

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
        $('#shudong').click(function () {
            if ($('.datingSelectPart')[0]) {
                $('.datingSelectPart').hide();
                return
            }
        });

        if (location.search.split('&&')[0] == '?articleChange') { //进入已发布文档编辑功能
            $('#submitButton').html('确认更改');
            $('#title').attr('disabled', 'true');
            $('.writePart-select-part').remove();
            $.ajax({
                type: "post",
                url: "/article/articleDetail03",
                data: {
                    token: window.localStorage.token,
                    articleId: location.search.split('=')[1]
                },
                success: function (response) {
                    if (response.isLogin == true) {
                        alert('操作失败')
                        location.href = "https://www.shushuo.space/"
                        return
                    }
                    $('#title').val(`${response.title}`);
                    $('.w-e-text').html(`${response.conntent.length==0?`<p data-we-empty-p=""><br></p>`:response.conntent}`);
                    $('#submitButton').attr('articleId', `${response.id}`);

                    var imgs = $('.w-e-text').find('img')
                    imgs.hide();
                    for (let i = 0; i < imgs.length; i++) {
                        $(imgs[i]).attr('onerror', 'picError(this)');

                        $(imgs[i]).parent().append(`<div class="img_uploading">图片正在加载中...</div>`);
                        imgs[i].onload = function () {
                            $(imgs[i]).siblings('div').remove();
                            $(imgs[i]).show();
                        }
                    }


                    var a = []
                    for (let i = 0; i < $('img').length; i++) {
                        a.push({
                            imgSrc: $('img')[i].src
                        })
                    }
                    $('body').data('img', a);

                    $('#submitButton').click(async function () {
                        window.onbeforeunload = null
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
                                    location.href = 'https://www.shushuo.space/'
                                    return
                                }
                                if (response.isUp == true) {
                                    alert('更改文章成功')

                                    var imgold = $('body').data('img')
                                    var imgnew = $('body').data('img02')
                                    var img = imgold.concat(imgnew) //big
                                    var imgsub = [] //small
                                    for (let i = 0; i < $('img').length; i++) {
                                        imgsub.push({
                                            src: $('img')[i].src
                                        })
                                    }
                                    var waitdelete = []
                                    for (let i = 0; i < img.length; i++) {
                                        if (imgsub.find(item => item.src == img[i].imgSrc)) {
                                            continue
                                        }
                                        waitdelete.push({
                                            src: img[i].imgSrc
                                        })
                                    }

                                    location.href = 'https://www.shushuo.space/'
                                }
                            }
                        });



                    });

                    //存入草稿
                    $('#writeDraft').click(async function (e) {
                        window.onbeforeunload = null
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
                                    location.href = 'https://www.shushuo.space/'
                                    return
                                }
                                if (response.isUp == true) {
                                    alert('存入草稿成功')
                                    location.href = 'https://www.shushuo.space/'

                                    var imgold = $('body').data('img')
                                    var imgnew = $('body').data('img02')
                                    var img = imgold.concat(imgnew) //big
                                    var imgsub = [] //small
                                    for (let i = 0; i < $('img').length; i++) {
                                        imgsub.push({
                                            src: $('img')[i].src
                                        })
                                    }
                                    var waitdelete = []
                                    for (let i = 0; i < img.length; i++) {
                                        if (imgsub.find(item => item.src == img[i].imgSrc)) {
                                            continue
                                        }
                                        waitdelete.push({
                                            src: img[i].imgSrc
                                        })
                                    }

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

        if (location.search.split('=')[0] == '?articleId') { //草稿箱重新编辑的上传操作需要修改
            $.ajax({
                type: "post",
                url: "/article/articleDetail02",
                data: {
                    token: window.localStorage.token,
                    articleId: location.search.split('=')[1]
                },
                success: function (response) {
                    if (response.isLogin == true) {
                        alert('操作失败')
                        location.href = "https://www.shushuo.space/"
                        return
                    }
                    $('#title').val(`${response.title}`);
                    $('.w-e-text').html(`${response.conntent.length==0?`<p data-we-empty-p=""><br></p>`:response.conntent}`);
                    $('.subWaysSelect').append(`<div class="time"><div>上次编辑时间：${timeSet(response.time)}</div></div>`);
                    $('#submitButton').attr('articleId', `${response.id}`);

                    var a = []
                    for (let i = 0; i < $('img').length; i++) {
                        $($('img')[i]).attr('onerror', 'picError(this)');

                        a.push({
                            imgSrc: $('img')[i].src
                        })
                    }
                    $('body').data('img', a);

                    $('#submitButton').click(function (e) {
                        window.onbeforeunload = null;
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
                                        location.href = 'https://www.shushuo.space/'
                                        return
                                    }
                                    if (response.isUp == true) {
                                        alert('存入树洞成功')
                                        location.href = 'https://www.shushuo.space/'
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
                                        location.href = 'https://www.shushuo.space/'
                                        return
                                    }
                                    if (response.isUp == true) {
                                        alert('发表文章成功')
                                        var imgold = $('body').data('img')
                                        var imgnew = $('body').data('img02')
                                        var img = imgold.concat(imgnew) //big
                                        var imgsub = [] //small
                                        for (let i = 0; i < $('img').length; i++) {
                                            imgsub.push({
                                                src: $('img')[i].src
                                            })
                                        }
                                        var waitdelete = []
                                        for (let i = 0; i < img.length; i++) {
                                            if (imgsub.find(item => item.src == img[i].imgSrc)) {
                                                continue
                                            }
                                            waitdelete.push({
                                                src: img[i].imgSrc
                                            })
                                        }

                                        location.href = 'https://www.shushuo.space/'
                                    }
                                }
                            });
                        }
                    });

                    //存入草稿
                    $('#writeDraft').click(async function (e) {
                        window.onbeforeunload = null
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
                                    location.href = 'https://www.shushuo.space/'
                                    return
                                }
                                if (response.isUp == true) {
                                    alert('存入草稿成功')
                                    var imgold = $('body').data('img')
                                    var imgnew = $('body').data('img02')
                                    var img = imgold.concat(imgnew) //big
                                    var imgsub = [] //small
                                    for (let i = 0; i < $('img').length; i++) {
                                        imgsub.push({
                                            src: $('img')[i].src
                                        })
                                    }
                                    var waitdelete = []
                                    for (let i = 0; i < img.length; i++) {
                                        if (imgsub.find(item => item.src == img[i].imgSrc)) {
                                            continue
                                        }
                                        waitdelete.push({
                                            src: img[i].imgSrc
                                        })
                                    }

                                    location.href = 'https://www.shushuo.space/'

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

        //正常操作(即初次进入编辑页面)
        //成功登录后进行绑定事件
        $('#submitButton').click(function (e) {
            window.onbeforeunload = null
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
                            location.href = 'https://www.shushuo.space/'
                            return
                        }
                        if (response.isUp == true) {
                            alert('存入树洞成功')
                            location.href = location.href
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
                            location.href = 'https://www.shushuo.space/'
                            return
                        }
                        if (response.isUp == true) {
                            alert('发表文章成功')
                            location.href = location.href
                        }
                    }
                });
            }
        });

        //存入草稿
        $('#writeDraft').click(function (e) {
            window.onbeforeunload = null
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
                        location.href = 'https://www.shushuo.space/'
                        return
                    }
                    if (response.isUp == true) {
                        alert('存入草稿成功')
                        location.href = 'https://www.shushuo.space/'
                    } else {
                        alert('上传失败')
                    }
                }
            });
        });
    }, 500);

});