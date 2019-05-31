/**
 * jquery 根据json对象填充form表单
 * @author en
 * @param fromId form表单id
 * @param jsonDate json对象
 */
function loadDatatoForm(fromId, jsonDate) {
    var obj = jsonDate;
    var key, value, tagName, type, arr;
    for (x in obj) {//循环json对象
        key = x;
        value = obj[x];
        //$("[name='"+key+"'],[name='"+key+"[]']").each(function(){
        //更加form表单id 和 json对象中的key查找 表单控件
        $("#" + fromId + " [name='" + key + "'],#" + fromId + " [name='" + key + "[]']").each(function () {
            tagName = $(this)[0].tagName;
            type = $(this).attr('type');
            if (tagName == 'INPUT') {
                if (type == 'radio') {
                    $(this).attr('checked', $(this).val() == value);
                } else if (type == 'checkbox') {
                    try {
                        //数组
                        arr = value.split(',');
                        for (var i = 0; i < arr.length; i++) {
                            if ($(this).val() == arr[i]) {
                                $(this).prop('checked', true);
                                break;
                            }
                        }
                    } catch (e) {
                        //单个
                        $(this).prop('checked', value);
                    }
                } else {
                    $(this).val(value);
                }
            } else if (tagName == 'TEXTAREA') {
                $(this).val(value);
            } else if (tagName == 'SELECT') {
                //console.log($(this).hasClass("select2"));
                if ($(this).hasClass("select2")) {
                    //select2 插件的赋值方法
                    $(this).val(value).trigger("change");
                } else {
                    $(this).val(value);
                }
            }
        });
    }
}
/**
 * jquery 根据json对象创建Select下拉框
 * @author en
 * @param fromId form表单id
 * @param jsonDate json对象
 */
function selectLoadData(selectId, jsonData) {
    $("#" + selectId).empty();//清空该元素
    for (k in jsonData) {
       // console.log(jsonData[k]);
        $("#" + selectId).append('<option value="' + jsonData[k].id + '">' + jsonData[k].text + '</option>');
    }
}

//下拉框的绑定
function createSelect(selectId, url) {
    $.post(url, function (data) {
        selectLoadData(selectId, data);
    });
}

//验证数字的输入
function ConfirmationNumber(selectID) {

    var SelectText = $("#" + selectID).val();
    var reg = new RegExp('^[0-9]+$');
    var r = reg.test(SelectText);
    if (r == false) {
        layer.msg('您输入的字符串错误，<br>请输入正确的正整数！', {
            time: 2000, //2s后自动关闭
        });
        $("#" + selectID).val("");
        $("#" + selectID).focus();
        return false;
    }
}

//验证只有两位小数的正实数
function ConfirmationDecimal(selectID) {
    var SelectText = $("#" + selectID).val();
    var reg = new RegExp('^[0-9]+(.[0-9]{2})?$');
    var r = reg.test(SelectText);
    if (r == false) {
        layer.msg('您输入的字符串错误，<br>请输入正确的正整数或者带有两位小数的数字！', {
            time: 2000, //2s后自动关闭
        });
        $("#" + selectID).val("");
        $("#" + selectID).focus();
        return false;
    }
}

//验证只有两位小数的小数比1小

function ConfirmationDecimalDouble(selectID) {
    var SelectText = $("#" + selectID).val();
    var reg = new RegExp('^[0]+(.[0-9]{2})?$');
    var r = reg.test(SelectText);
    if (r == false) {
        layer.msg('您输入的字符串错误，<br>请输入比1小的两位小数！', {
            time: 2000, //2s后自动关闭
        });
        $("#" + selectID).val("");
        $("#" + selectID).focus();
        return false;
    }
}

//验证电话号
function ConfirmationTelephone(YanZhengID) {
    var YanZheng = $("#" + YanZhengID).val();
    var reg = new RegExp('^13[0-9]{1}[0-9]{8}$|^15[0-9]{1}[0-9]{8}$|^17[0-9]{1}[0-9]{8}$|^18[0-9]{1}[0-9]{8}$');
    var r = reg.test(YanZheng);
    if (r == false) {
        layer.msg('请输入您正确的手机号码哦！', {
            time: 3000,
        });
        $("#" + YanZhengID).val("");
        $("#" + YanZhengID).focus();
    }
}


//验证月份的输入
function ConfirmationMonthNumber(selectID) {
    var SelectText = $("#" + selectID).val();
    var reg = new RegExp('^(0?[1-9]|1[0-2])$');
    var r = reg.test(SelectText);
    if (r == false) {

        layer.msg('参考月输入的字符串错误，<br>请输入1~12或者01~09,10,11,12正整数！', {
            time: 2000, //2s后自动关闭
        });
        $("#" + selectID).val("");
        $("#" + selectID).focus();
    }
}

/**
 * 图片大小压缩
 * @param {} maxWidth 
 * @param {} maxHeight 
 * @param {} objImg 
 * @returns {} 
 */
function AutoResizeImage(maxWidth, maxHeight, objImg) {
    var img = new Image();
    img.src = objImg.src;
    var hRatio;
    var wRatio;
    var Ratio = 1;
    var w = img.width;
    var h = img.height;
    wRatio = maxWidth / w;
    hRatio = maxHeight / h;
    if (maxWidth == 0 && maxHeight == 0) {
        Ratio = 1;
    } else if (maxWidth == 0) {//
        if (hRatio < 1) Ratio = hRatio;
    } else if (maxHeight == 0) {
        if (wRatio < 1) Ratio = wRatio;
    } else if (wRatio < 1 || hRatio < 1) {
        Ratio = (wRatio <= hRatio ? wRatio : hRatio);
    }
    if (Ratio < 1) {
        w = w * Ratio;
        h = h * Ratio;
    }
    objImg.height = h;
    objImg.width = w;
}