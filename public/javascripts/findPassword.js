$(document).ready(async function () {
    $('#getCheckNum').click(function () {
        if ($('#userEmail').val() == '') {
            alert('请输入邮箱')
            return
        }

        $.ajax({
            type: "post",
            url: "/findPassword/getCheckNum",
            data: {
                Email: $('#userEmail')[0].value
            },
            success: function (response) {}
        });

        for (let i = 0; i < 61; i++) {
            setTimeout(() => {
                $('#getCheckNum').html(`(${60-i})秒`);
                if (i < 60) {
                    $('#getCheckNum').attr('disabled', 'true');
                }
                if (i == 60) {
                    $('#getCheckNum').removeAttr('disabled');
                    $('#getCheckNum').html('获取验证码');
                }
            }, i * 1000);
        }
    });
    $('#Check').click(function () {
        $.ajax({
            type: "post",
            url: "/findPassword/Check",
            data: {
                Email: $('#userEmail')[0].value,
                CheckNum: $('#CheckNum')[0].value,
                password: $('#password')[0].value
            },
            success: function (response) {
                tokenWork(response)
                                if (response.isCheck == false) {
                    alert('请注意验证码大小写!')
                    return
                }
                if (response.token !== undefined) {
                    location.href = 'https://www.shushuo.space/'
                }
            }
        });
    });
});