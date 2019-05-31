var oFReader = new FileReader();
var arrOperaAuthorityData = { insert: false, update: false, Delete: false, select: false };//修改基础资料
var arrOperaAuthorityPassword = { insert: false, update: false, Delete: false, select: false };//修改登录密码
//查询用户权限
function selectAuthority() {

}

$(function () {
   
    selectAuthority();

    //用户确定修改
    $("#update").click(function () {
        //获取数据
        var txtPhone = $("#phone").val();//手机
        var txtMail = $("#email").val();//邮箱
        //var txtPoliceID = $("#UserroleID").val();//角色类型
        
        var CallNumTxtVerification = /^\d{3,4}\-\d{7,8}$/;//电话码验证
        var varphoneCode = /^[1]+[3,8,5,7]+\d{9}$/;//手机号码验证

        var reg = /^([a-zA-Z0-9_-])+@@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;  //邮箱

        if (txtPhone != '' && !CallNumTxtVerification.exec(txtPhone) && !varphoneCode.exec(txtPhone)) {
            alert('手机电话格式有误，请重新输入！');
            $('#phone').focus();//输入框获得焦点
            return false;
        }

        else if (txtMail != '' && !reg.exec(txtMail) == false) {
            alert('请输入正确的邮箱地址！');
            $('#email').focus();//输入框获得焦点
            return false;
        }

        else {
            //打开确定框
            $('#myUserData').modal('show');
        }
    });   

    //密码确定修改
    $("#UpdatePassword").click(function () {
        //获取数据
        var usernameID = $("#usernameID").val();//用户ID
        var oldPassword = $("#oldpassword").val();//旧密码
        var boolOldPassword = parseInt($('#oldpassword').attr('bool'));//获取当前密码是否输入正确
        var newPassword1 = $("#newpassword1").val();//新密码1
        var newPassword2 = $("#newpassword2").val();//新密码2
        if (oldPassword == '') {//判断不为空
            alert('请输入当前密码！');
            return false;
        }
        if (boolOldPassword == 0) {
            alert('当前密码错误！');
            return false;
        }
        if (newPassword1 == '') {//判断不为空
            alert('请输入新密码！');
            return false;
        }
        if (newPassword2 == '') {//判断不为空
            alert('请输入确认密码！');
            return false;
        }

        //判断长度是否在范围内
        if (newPassword1.length <= 18 && newPassword2.length <= 18 && oldPassword.length <= 18) {
            if (newPassword1.length >= 6 && newPassword2.length >= 6 && oldPassword.length >= 6) {
                if (oldPassword == newPassword1) {
                    alert('新密码不能跟当前密码一样');
                    return false;
                }
                //判断两次新密码输入是否一致
                if (newPassword1 == newPassword2) {
                    //打开确定框
                    $('#myPassword').modal('show');
                }
                else {
                    alert("新密码两次输入不一致，请重新输入！");
                }
            }
            else {

                alert("密码长度为6-18位，输入密码过短，请重新输入！");
            }
        }
        else {
            alert("密码长度为6-18位，输入密码过长，请重新输入！");
        }
    });
           
})


//确定修改资料
function confirmUserData() {
   
    //判断浏览器缓存是不是清空了
    $.post('/index/getUserID', function (data) {
        if (parseInt(data) > 0) {
            $('#myUserData').modal('hide');
            //获取数据
            var txtPhone = $("#phone").val();//手机
            var txtMail = $("#email").val();//邮箱
            //var txtPoliceID = $("#UserroleID").val();  //角色ID       strUserroleID: txtPoliceID
           
            $.post('/index/UpdateUser', {
                phone: txtPhone, email: txtMail, 
            }, function (data) {
                if (data == "ok") {
                    alert("修改资料成功！");
                    location.reload();//刷新当前页面
                }
                else {
                    location.reload();//刷新当前页面
                    alert("修改资料失败！");
                }
            });
        } else {
            window.location.href = '/index/Erro';
            return false;
        }
    });
}


//手机号码限制输入
function keypressPhone(ev, t) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 8) {
        t.value = t.value.replace(/[^\d]/g, '');
    }

}


//验证当前密码是否正确
function judgeOddPassword(ev,t) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode == 32) {
        t.value = t.value.replace(/[\s]/g, '');
    }
    var password = t.value.trim();
    var usernameID = $('#usernameID').val();
    if (password != '') {//判断是否输入当前密码
        $.getJSON('/index/judgeOddPassword', { usernameID: usernameID, password: password }, function (data) {
            $('#oldpasswordImg').show();
            if (data == 'ok') {//输入正确
                $(t).attr('bool', 1);
                $('#oldpasswordImg').attr('src', '/content/images/confirmGree.png');
            } else {//输入错误
                $(t).attr('bool', 0);
                $('#oldpasswordImg').attr('src', '/content/images/confirmGree.png');
            }
        });
    } else {
        $(t).attr('bool', 0);
        //隐藏当前密码提示
        $('#oldpasswordImg').hide();
    }
}


//确定修改密码
function confirmPassword() {

    //判断浏览器缓存是不是清空了
    $.post('/index/getUserID', function (data) {
        if (parseInt(data) > 0) {
            $('#myPassword').modal('hide');
            var usernameID = $("#usernameID").val();//用户ID
            var oldPassword = $("#oldpassword").val();//旧密码
            var newPassword2 = $("#newpassword2").val();//新密码2
            $.post('/index/UpdatePassword', {
                OldPassword: oldPassword, NewPassword: newPassword2, strUserID: usernameID
            }, function (data) {
                if (data = "ok") {
                    alert("修改成功，点击【确定】跳到登录界面");
                    window.location.href = "/index/Login";
                }
                else {

                    location.reload();//刷新当前页面
                    alert("修改失败");
                }
            });
        } else {
            window.location.href = '/index/Erro';
            return false;
        }
    });
}


//分析密码强度
function getPasswordLeveL(user_pwd) {
    var lvl = 0;
    if (user_pwd.length >= 6) {
        //1.如果密码长度超过6位强度+1
        if (user_pwd.length >= 6) {
            lvl++;
        }

        //2.如果密码中包含数字，则强度+1
        if (user_pwd.match(/\d+/)) {
            lvl++;
        }

        //3.如果密码中包含字母，则强度+1
        if (user_pwd.match(/[a-z|A-Z]+/)) {
            lvl++;
        }

        //4.如果密码中包含特殊符号，强度+1
        if (user_pwd.match(/[^0-9a-zA-Z]+/)) {
            lvl++;
        }
    }
    return lvl;
}


//提示密码长度
function verificationNewPassword(ev,t) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode == 32) {
        t.value = t.value.replace(/[\s]/g, '');
    }
    var tds = document.getElementById('passwordSafeShow').getElementsByTagName('td');
    //初始化颜色
    for (var i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = '';
    }
    //1.获取用户输入的内容
    var pwd = t.value;
    if (pwd.length > 0) {

        //2.根据用户输入的密码，校验强度
        var pwdLevel = getPasswordLeveL(pwd);
        if (pwdLevel > 0) {
            $('#passwordSafeShow').show();//显示密码强度提示
            //3.根据密码强度，设置显示强度
            switch (pwdLevel) {
                case 0:
                case 1:
                case 2:
                    //弱
                    $(tds[0]).show();
                    $(tds[0]).css('background-color', '#fa3e3e');
                    $(tds[1]).hide();
                    $(tds[2]).hide();
                    break;
                case 3:
                    $(tds[1]).show();
                    $(tds[1]).css('background-color', 'orange');
                    $(tds[0]).hide();
                    $(tds[2]).hide();
                    //中
                    break;
                case 4:
                    //强
                    $(tds[0]).hide();
                    $(tds[1]).hide();
                    $(tds[2]).show();
                    $(tds[2]).css('background-color', '#63B551');
                    break;
            }
        }

    } else {
        //如何没有输入新密码，就隐藏table密码强度提示
        $('#passwordSafeShow').hide();
    }
}


//判断第二次输入新密码是否和第一次新密码一样
function judgeNewPasswordTow(ev,t) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode == 32) {
        t.value = t.value.replace(/[\s]/g, '');
    }
    var tow = t.value.trim();
    var one = $('#newpassword1').val();
    if (tow != '') {//判断有没有输入第一次新密码
        $('#newpassword2Img').show();
        if (tow != one) {//判断第二次新密码是否和第一次一样
            $('#newpassword2Img').attr('src', '/content/images/cancelRed.png');
        } else {
            $('#newpassword2Img').attr('src', '/content/images/confirmGree.png');
        }
    } else {
        $('#newpassword2Img').hide();
    }
}


//关闭界面
function closeView() {
    var openType = parseInt($('#openType').val());
    if (openType==1) {
        window.location.href = "/index/index";
    } else if (openType == 2) {
        window.location.href = "/MobileTerminal/index";
    }
   
}