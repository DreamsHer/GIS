$(function () {
    //绑定账号和密码
    if ($('#load_UserName').val() != '') {
        $('#UserName').val($('#load_UserName').val());
    }

    $('#UserName').val("sa");
    $('#PassWord').val("123456");


    $('#UserName').focus();//用户名输入框获得焦点
    //提交登录
    $('#submit').click(function (event) {
        var UserName = $('#UserName').val().trim();
        var PassWord = $('#PassWord').val().trim();
        if (UserName == '') {
            alert('请输入账号！');
            return false;
        }
        else if (PassWord == '') {
            alert('请输入密码！');
            return false;
        }
        else {

            $('#loadMap').show();//显示加载界面
            $.post('/MobileTerminal/LoginChecking', { strName: UserName, strPassword: PassWord }, function (data) {
                $('#loadMap').hide();//隐藏加载界面
                if (data == 'ok') {
                    event.preventDefault();
                    $('form').fadeOut(500);
                    $('.wrapper').addClass('form-success');
                    window.location.href = '/MobileTerminal/Index';
                } else if (data == '1') {
                    alert('请输入用户名!');
                }
                else if (data == '2') {
                    alert('请输入密码!');
                }
                else if (data == '3') {
                    alert('账号或者密码错误!');
                }
                else if (data == '4') {
                    alert('登录失败，服务器繁忙!');
                }
                else if (data == '5') {
                    alert('登录失败，账号未启用，请与管理员联系！');
                }

            });
        }
    });
});

//限制账号输入
function keypressUserName(ev) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode == 13) {
        $('#submit').click();
    } else {
        var UserName = document.getElementById('UserName');
        if (keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 8) {
            UserName.value = UserName.value.replace(/[\W]/g, '');
        }
    }
}
//输入密码回车快捷登录
function keypressPassword(ev) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode == 13) {
        $('#submit').click();
    }
    else if (keyCode == 32) {
        var PassWord = document.getElementById('PassWord');
        PassWord.value = PassWord.value.replace(/[\s]/g, '');
    }
}