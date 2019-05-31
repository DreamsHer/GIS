
$(function () {
    $('#PerimeterQueryController').css("display", 'none ');
    $('#PerimeterQuerySelectDivController').css("display", 'none');
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@周边查询代码@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//查询周边分析拖拽
function dragAndDropThePerimeterQuery() {
    var ifmove = false;//判断是否移动
    var x1, y1;//鼠标离控件左上角的相对位置
    $("#PerimeterQueryTatle").mousedown(function (e) {
        ifmove = true;
        x1 = e.pageX - parseInt($("#PerimeterQueryController").css("left"));
        y1 = e.pageY - parseInt($("#PerimeterQueryController").css("top"));
        $("#PerimeterQueryTatle").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (ifmove) {
            var x = e.pageX - x1;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - y1;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#PerimeterQueryController").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#PerimeterQueryController").css("height"));
            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            if (y > height - height1) {
                y = height - height1;
            }
            if (x > width - width1) {
                x = width - width1;

            }
            $("#PerimeterQueryController").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        ifmove = false;
        $("#PerimeterQueryTatle").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}
//查询结果拖拽
function dragAndDropThePerimeterSelectDivQuery() {
    var ifmove = false;//判断是否移动
    var x1, y1;//鼠标离控件左上角的相对位置
    $("#PerimeterQuerySelectDivTatle").mousedown(function (e) {
        ifmove = true;
        x1 = e.pageX - parseInt($("#PerimeterQuerySelectDivController").css("left"));
        y1 = e.pageY - parseInt($("#PerimeterQuerySelectDivController").css("top"));
        $("#PerimeterQuerySelectDivTatle").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (ifmove) {
            var x = e.pageX - x1;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - y1;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#PerimeterQuerySelectDivController").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#PerimeterQuerySelectDivController").css("height"));
            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            if (y > height - height1) {
                y = height - height1;
            }
            if (x > width - width1) {
                x = width - width1;
            }
            $("#PerimeterQuerySelectDivController").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        ifmove = false;
        $("#PerimeterQuerySelectDivTatle").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}
//更多查询方式
function MoreQueryMode() {
    $("#SelectTool").css("display", "block");
}
var tag = -1;
//获得黄色标签的X Y坐标 从别人拿到2379
function chen_DrawS(X, Y) {
    Jia_x = X;
    Jia_y = Y;
    ClearAll();
    $("#CloseZhouBian").hide();
    chen_centerPoint = new SuperMap.Geometry.Point(X, Y);

    if (tag != 1 && tag != 2) {
        DraCri($("#SelectOp").val() / 1000000);
    }
}
var tag = 0;
// 清 空 
function chen_ClearDraw() {
    strDiv = "";

    $('#PerimeterQuerySelectDivController').css("display", 'none');
    $('[name="SelectE"]').text("选择");
    ClearAll();
    if (tag == 1) {
        $("input[name='selectcheck']:checked").each(function () {
            $(this).removeAttr("checked");
        });
    } else {
        tag = 1;
    }

}
//点击重选 
function Gravity() {

    $('[name="SelectE"]').text("重选");
    ClearAll();
    chen_draw_point();
    PeripheralAnalysis(-1, -1);//再次选点
}
//清除所有我弄的图
function ClearAll() {
    chen_CustomPoint.deactivate();
    chen_CustompointLayer.removeAllFeatures();
    chen_CustompointRouteLayer.removeAllFeatures();
    chen_DangerousMarkers.clearMarkers();
    chen_DangerousPoerMarkers.clearMarkers();
    Jia_markers.clearMarkers();
    map.removeAllPopup();//移除所有弹窗
}
var boolSwithSmallZhouBian = true;
//缩小周边面板
function SmallZhouBian() {
    // Panl-Content
    if (boolSwithSmallZhouBian) {
        $('#PerimeterQueryControllerContent').hide();
        $('#SmallZhouBian').css("background-image", "url(/content/images/bigwin.png)");
        boolSwithSmallZhouBian = false;
    } else {
        $('#PerimeterQueryControllerContent').show();
        $('#SmallZhouBian').css("background-image", "url(/content/images/small.png)");
        boolSwithSmallZhouBian = true;
    }

    if ($("#PerimeterQueryController").css("left") == "1021px" && $("#PerimeterQueryControllerContent").css("display") == "block"
      && $("#PerimeterQuerySelectDivController").css("top") == "28px") {
        $("#PerimeterQuerySelectDivController").css("top", "270px");
        $("#PerimeterQuerySelectDivController").css("left", "1024px");

    } else {
        $("#PerimeterQuerySelectDivController").css("top", "28px");
        $("#PerimeterQuerySelectDivController").css("left", "1022px");
    }
}
//关闭周边面板
function CloseZhouBian() {

    $('#PerimeterQueryController').hide();
    $('#moveResult').hide();
    chen_ClearDraw();//清空所有
}
//点击周边分析
var stata = 0;
function PeripheralAnalysis(a, b) {
    stata = a;
    setTimeout(function () {
        $('.toolLi').removeClass('active');
    }, 100);

    if (a == 0) {
        if (nowSelectAlarm.AlarmID > 0 && nowSelectAlarm.AlarmStateID == 9) {
            alert('你还没有结束新警情分析！');
            return false;
        } else {

            $("#CloseZhouBian").show();
            $('#PerimeterQuerySelectDivController').css("display", 'none');
            $('[name="SelectE"]').text("选择");
            $('[name="SelectE"]').show();
            $("input[name='selectcheck']:checked").each(function () {
                $(this).removeAttr("checked");
            });
            $('#PerimeterQueryController').attr("style", 'top:0;left:217px;display:block');//设置周边分析面版初始化位置
        }
    }
    $('#PerimeterQuerySelectDivController').attr("style", 'top:28px;left:1022px;');//设置周边分析查询面版初始化位置 
    $('#PerimeterQueryController').attr("style", 'top:0;left:1021px;display:block');//设置周边分析面版初始化位置
    $('#PerimeterQuerySelectDivController').css("display", 'none');
    //出现周边查询面板
    $('#PerimeterQueryController').show();

    if ($('#moveResult').css('display') != 'none') {
        $('#moveResult').show();
    }
    if (a == 1) {

        chen_CustomPointFeatureCompleted(null);
        $("#CloseZhouBian").hide();
        $("#SelectE").hide();
        $('[name="SelectE"]').hide();
        CheckboxNum();

        $("#PoliceJiGuan").attr("checked", "checked");//发生警情 默认选中
        $("#GovernmentOffice").attr("checked", "checked");
        $("#HospitalAuthority").attr("checked", "checked");
    }
    if (a == 10) {

        chen_CustomPointFeatureCompleted(null);
        $("#CloseZhouBian").hide();
        $("#SelectE").hide();
        $('[name="SelectE"]').hide();
        $('#PerimeterQueryController').attr("style", 'top:0;left:233px;display:block');//设置周边分析面版初始化位置
    }
    if (a == 11) {

        chen_CustomPointFeatureCompleted(null);
        $("#CloseZhouBian").hide();
        $("#SelectE").hide();
        $('[name="SelectE"]').hide();
        $('#PerimeterQueryController').attr("style", 'top:0;left:233px;display:block');//设置周边分析面版初始化位置
    }
    if (a == 12) {
        CloseZhouBian();
    }

    $('#SmallZhouBian').css("background-image", "url(/content/images/small.png)");
    //chen_draw_point();//先绘点
    SmallZhouBian();
    NarrowResult();
    if ($('#PerimeterQueryControllerContent').css("display") == "none") {
       
        $('#SmallZhouBian').css("background-image", "url(/content/images/bigwin.png)");
        boolSwithSmallZhouBian = false;
    }

    if (a == -1) {
        $('#PerimeterQueryControllerContent').css("display", "block");
    }

}
//关闭结果窗体
function CloseResult() {
    $('#PerimeterQuerySelectDivController').hide();
}
//缩小结果窗体
var boolSwith = true;
function NarrowResult() {
    if (boolSwith) {
        $('#content_result').hide();
        $('#NarrowWindow').css("background-image", "url(/content/images/bigwin.png)");
        boolSwith = false;
    } else {
        $('#content_result').show();
        $('#NarrowWindow').css("background-image", "url(/content/images/small.png)");
        boolSwith = true;
    }

}
//拖拽工具js代码

var ObjectA;//装查询点的数组
var strMeters;//路径
var strDiv = "";//装在查询窗体的容器
var idtime;//时钟

function CheckboxNum() {


    boolKi = true;
    var ArryId = [];
    ArryId.length = 0;
    var rou = $("#SelectOp").val() / 100000;
    ObjectA = [];
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#) (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=) (\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/) (\<)(\>)(\ )(\)]+/);
    if (!reg.test($("#SelectOp").val()) && !containSpecial.test($("#SelectOp").val())) {
        $('#PerimeterQuerySelectDivController').show();
        $('#accordion_result').empty(); //清空之前生成的div
        var strCheckArry = new Array();
        var i = 0;
        //找出所有选中的checked
        $("input[name='selectcheck']:checked").each(function () {
            //记录下它的this
            ArryId.push(this);
        });
        if (ArryId.length > 0) {
            try { closeInfoWin(); } catch (e) { }//点击查询关闭所有弹出框
            if (stata > 0) {
                chen_DangerousPoerMarkers.clearMarkers();
            }
            chen_DangerousMarkers.clearMarkers();
            $("#loadMap").show();
            //最后一步 根据设置的范围画圆圈
            strDiv += "<i style='display:block;font-style:normal;text-align: center;'>查询范围:<a  style='color:red;'>" + $("#SelectOp").val() + "</a>米内 </i>";
            DraCri(rou);
            idtime = setInterval(function () {
                if (boolKi) {
                    if (ArryId.length > 0) {
                        if (tagAddstrDiv) {
                          
                            tagAddstrDiv = false;
                        }
                        boolKi = false;
                        var GetID = ArryId[ArryNumber];
                        var LayerName = ScreeningConditions($(GetID).context.labels[0].innerText.trim());
                        if (LayerName != null) {
                            var strType = $(GetID).parent().parent().parent().parent().parent().parent().parent().parent().parent().html();
                            if ($('#accordion_result').html().indexOf("查询范围") < 0) {
                                if (strDiv.indexOf("查询范围") < 0) {
                                    strDiv += "<i style='display:block;font-style:normal;text-align: center;'>查询范围:<a  style='color:red;'>" + $("#SelectOp").val() + "</a>米内 </i>";

                                }
                            }

                            strDiv += "<div class='panel panel-primary' style='border-radius:0'>";
                            strDiv += "<div class='panel-heading' style='height:20px;border-radius:0'>";
                            strDiv += "<h4 class='panel-title ' style='margin-top:-8px;font-size:14px'>";
                            strDiv += " <a data-toggle='collapse' data-parent='#accordion_result' href='#collapseOne" + i + "xt' style='font-style:normal;'>" + $(GetID).context.labels[0].innerText + "<i class='redNubmer'>%number%</i></a><a style='width: 16px;height: 15px;float: right;display: block; background: url(/content/images/jiantou.png) no-repeat round;background-repeat: round;' ;></a></h4></div> ";
                            strDiv += " <div id='collapseOne" + i + "xt' class='panel-collapse collapse '> <div class='panel-body' style='padding-top: 0px;overflow: auto;max-height: 200px;'> ";
                            strDiv += "<table id='Jia_table'";
                            strDiv += "&" + FilterString(strType) + "$&";
                            strDiv += "*" + $(GetID).context.labels[0].innerText + "*&";
                            //第一步  筛选一下条件找对应的图层
                            //第二步 找距离多少米 和路径分析路径 分为两种情况 一、自己选则危险源的时候 二、是否是点击源的时候
                            CurdrawCompleted(LayerName, rou);//查询出圆圈里面的指定点
                        }
                        i++;
                        ArryNumber++;
                        if (ArryId.length == ArryNumber) {
                            ArryNumber = 0;
                            window.clearTimeout(idtime);//清除时钟
                            $("#loadMap").hide();
                        }
                    }
                }
            }, 50);
        } 
    } else {
        alert("不能输入中文和特殊符号！");
    }
}
var ArryNumber = 0;
var boolKi = true;
//筛选条件
function FilterString(strType) {
    if (strType.indexOf("装备措施") > 0) {
        return "装备措施";
    }
    if (strType.indexOf("救缓单位") > 0) {
        return "救缓单位";
    }
    if (strType.indexOf("公共场所") > 0) {
        return "公共场所";
    }
    if (strType.indexOf("特殊行业") > 0) {
        return "特殊行业";
    }
    if (strType.indexOf("交通措施") > 0) {
        return "交通措施";
    }
}

var QstrNameType = "";
var strScreeningConditions = "";
//判断选了什么类型
function ScreeningConditions(strNameType) {
    var strType = null;
    QstrNameType = strNameType;
    //救缓单位strNameType.indexOf
    if (strNameType == "公安机关") {
        strType = "P01政府机构_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = " TYPE=7102";//编号

    }
    if (strNameType == "政府机关") {
        strType = "P01政府机构_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = 'TYPE!=7102';//编号
    }
    if (strNameType == "消防机关") {

        strType = "消防站点@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "医院机关") {
        strType = "P15医疗服务_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = 'TYPE=2800';//编号
    }
    //公共场所

    if (strNameType == "餐饮服务") {
        //P21餐饮服务_point_1
        strType = "P21餐饮服务_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "宾馆酒店") {
        //P13宾馆酒店_point_1
        strType = "P13宾馆酒店_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "公交车站") {
        //P05公交车站_point_1
        strType = "P05公交车站_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "休闲娱乐") {
        //P14休闲娱乐_point_1
        strType = "P14休闲娱乐_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "公司企业") {
        //P17公司企业_point_1
        strType = "P17公司企业_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "风景名胜") {
        //P24风景名胜_point_1
        strType = "P24风景名胜_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "火车/地铁站") {
        //P24风景名胜_point_1
        strType = "P03火车站地铁站_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }

    if (strNameType == "金融机构") {
        //P24风景名胜_point_1
        strType = "P10金融服务_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "住宅小区") {
        //P24风景名胜_point_1
        strType = "P19住宅小区_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "科研教育") {
        //P24风景名胜_point_1
        strType = "P16科研教育_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "公园广场") {
        //P24风景名胜_point_1
        strType = "P18公园广场_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "商业大厦") {
        //P24风景名胜_point_1
        strType = "P11商业大厦_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "电讯服务") {
        //P24风景名胜_point_1
        strType = "P25电讯服务_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "零售行业") {
        //P24风景名胜_point_1
        strType = "P12零售行业_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "港口码头") {
        //P24风景名胜_point_1
        strType = "P27港口码头_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '';//编号
    }
    if (strNameType == "停车场") {
        //P24风景名胜_point_1
        strType = "P07停车场_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '1=1';//编号
    }
    if (strNameType == "加油/加气站") {
        //P24风景名胜_point_1
        strType = "P06加油站加气站_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '1=1';//编号
    }
    if (strNameType == "汽车修理") {
        //P24风景名胜_point_1
        strType = "P22汽车服务_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '1=1';//编号
    }
    if (strNameType == "汽车站") {
        //P24风景名胜_point_1
        strType = "P04汽车站_point_1@ShenZhenNanShan_Data#2";
        strScreeningConditions = '1=1';//编号
    }
    if (strType == null) {
        tagAddstrDiv = true;
        boolKi = true;
        strDiv = "";

    }

    return strType;
}
//CurdrawCompleted 几何查询
function CurdrawCompleted(StrSelectCondition, strdistance) {

    var queryByDistanceParams = new SuperMap.REST.QueryByDistanceParameters({
        queryParams: new Array(new SuperMap.REST.FilterParameter({
            name: StrSelectCondition,
            attributeFilter: strScreeningConditions
        })),
        expectCount: 100,
        returnContent: true,
        distance: strdistance,//strdistance
        geometry: chen_centerPoint,
    });

    //AlarmFeatureGeometry
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(url);
    queryByDistanceService.events.on({
        "processCompleted": chen_processCompleted,
        "processFailed": processFailed
    });
    queryByDistanceService.processAsync(queryByDistanceParams);
 
}
//根据圆形来查询的形状
function xCurdrawCompleted(StrSelectCondition, strdistance) {

    var queryByDistanceParams = new SuperMap.REST.QueryByDistanceParameters({
        queryParams: new Array(new SuperMap.REST.FilterParameter({
            name: StrSelectCondition,
            attributeFilter: strScreeningConditions
        })),
        expectCount: 100,
        returnContent: true,
        distance: 0.0065,//strdistance
        geometry: chen_centerPoint,
    });

    //AlarmFeatureGeometry
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(url);
    queryByDistanceService.events.on({
        "processCompleted": chen_processCompleted,
        "processFailed": processFailed
    });
    queryByDistanceService.processAsync(queryByDistanceParams);
}
//根据园查询完成事件
function chen_processCompleted(queryEventArgs) {
    BitFailed = 0;
    var i, j, result = queryEventArgs.result;
  
    if (result.recordsets[0].features.length > 0) {
        //分割上面拼接的字符串 获取类型 
        var StrBumit = strDiv.substring(strDiv.indexOf('&') + 1, strDiv.indexOf('$&'));
        strDiv = strDiv.replace('&' + StrBumit + "$&", "");
        //分割上面拼接的字符串 获取个数
        strDiv = strDiv.replace('%number%', "(" + result.recordsets[0].features.length + ")");
        ObjectA.length = 0;

        var StrTypy = strDiv.substring(strDiv.indexOf('*') + 1, strDiv.indexOf('*&'));
        strDiv = strDiv.replace('*' + StrTypy + "*&", "");

        for (j = 0; j < result.recordsets[0].features.length; j++) {
            var feature = result.recordsets[0].features[j];
            var point = feature.data;
            var size = new SuperMap.Size(18, 20),
            offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
            icon = new SuperMap.Icon("/SuperMap/images/maker_L _Red2.png", size, offset);
            //这里为空的 就是查地图消防站的图层
            if (point.SmX == null || point.SmY == null) {
                point.SmX = point.SmX;
                point.SmY = point.SmY;
            }

            if (feature.data["NAME"] == null) {
                feature.data["NAME"] = point.Name;
            }
            if (point.ADDRESS == null) {
                point.ADDRESS = point.address;
            }
            if (point.TELEPHONE == null) {
                point.TELEPHONE = "无";
            }
            var SuperMapLonLat = new SuperMap.LonLat(point.SmX, point.SmY);
            var SuperMapMarker = new SuperMap.Marker(SuperMapLonLat, icon);
            SuperMapMarker.SmID = point.SmID;
            SuperMapMarker.ADDRESS = point.ADDRESS;
            SuperMapMarker.NAME = point.NAME;
            SuperMapMarker.TELEPHONE = point.TELEPHONE;
            SuperMapMarker.ScreeningType = StrBumit;
            SuperMapMarker.StrTypy = StrTypy;

            SuperMapMarker.events.on({  //注册监听点击事件
                "click": jia_mouseClickHandler,//单击触发
                "scope": SuperMapMarker,   //大概是传参数把
            });
            chen_DangerousMarkers.addMarker(SuperMapMarker);

            var chen_MarkerPoint = new SuperMap.Geometry.Point(point.SmX, point.SmY);

            // xnodeArray.push(chen_MarkerPoint);//查询出来的点
            //打入对象数组里面
            var aObject = [{ "SmID": point.SmID, "Name": feature.data["NAME"], "recordsets": result.currentCount, "x": point.SmX, "y": point.SmY }];
   
            ObjectA.push(aObject);
        }
        //第三步 找距离多少米 和路径分析路径 分为两种情况 一、自己选则危险源的时候 二、是否是点击源的时候
        for (ObjectANubm = 0; ObjectANubm < ObjectA.length; ObjectANubm++) {
            xnodeArray.length = 0;
            xnodeArray.push(AlarmPoint);

            var chen_TargetMarkerPoint = new SuperMap.Geometry.Point(ObjectA[ObjectANubm][0].x, ObjectA[ObjectANubm][0].y);
            xnodeArray.push(chen_TargetMarkerPoint);


            xfindPath();//x y坐标一方面在别人的点拿 一个是自己设置的点获取

        }
    } else {
        boolKi = true;
        strDiv = "";
        tagAddstrDiv = true;
    }
    ////AppendNewGeneration(ObjectA[ObjectANubm][0].Name, "正在获取..", ObjectANubm);

}
var tagAddstrDiv = false;
var boolyes = false;
//追加div
function AppendNewGeneration(SmID, strName, strRoute, ObjectANubm) {
    //追加生成新的div
    if (strRoute == -1) {
        strRoute = "分析失败";
    } else {
        strRoute = parseInt(strRoute) + "米";
    }
    strDiv += "  <tr><td><a id=" + SmID + " style='font-style:no' SmID=" + SmID + " strRoute='" + strRoute + "'  onclick='Jia_markersSelect(this)'>" + strName + "--------------><i style='font-style:normal;color:red;' id=" + ObjectANubm + ">" + strRoute + "</i></a></td></tr>";
}
//数值循环当前数
var ObjectANubm;
//路径分析
function xfindPath() {
    var findPathService, parameter, analystParameter, resultSetting;
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
        returnEdgeFeatures: false,
        returnEdgeGeometry: false,
        returnEdgeIDs: false,
        returnNodeFeatures: false,
        returnNodeGeometry: false,
        returnNodeIDs: false,
        returnPathGuides: true,
        returnRoutes: true
    });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting
    });
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,
        nodes: xnodeArray,
        hasLeastEdgeCount: false,
        parameter: analystParameter
    });
   
    if (xnodeArray.length <= 1) {
        alert("站点数目有误");
    }
    findPathService = new SuperMap.REST.FindPathService(urlNetwork, {
        eventListeners: {
            "processCompleted": xprocessCompleted,
            "processFailed": processFailedxprocess
        }
    });
    findPathService.processAsync(parameter);
 

}
//失败
function processFailedxprocess(er) {

    for (var r = xxxxxx; r < ObjectA.length; r++) {
        ObjectA[r][0].distance = -1;
        AppendNewGeneration(ObjectA[r][0].SmID, ObjectA[r][0].Name, ObjectA[r][0].distance, r);
    }
    xxxxxx = 0;
    $("#loadMap").hide();
    jkjjk = 0;
    strDiv += " </table>";
    strDiv += "</div></div> </div>";
    $("#accordion_result").append(strDiv);
    timeOutId = null;
    boolKi = true;
    strDiv = "";
}
function chen_deactiveAll() {
    chen_CustomPoint.deactivate();
}
//陈陆亮自定义报警点
function chen_draw_point() {
    chen_deactiveAll();
    chen_CustomPoint.activate();
}
var chen_centerPoint;
//用选择 绘制点完成事件
var AlarmPoint;
var AlarmFeatureGeometry;
function chen_CustomPointFeatureCompleted(chen_CustomPointEvent) {
    if (chen_CustomPointEvent != null) {
        $("#PerimeterQueryControllerContent").css("display", "block");
    }
    if (stata == 0) {
        DraCri($("#SelectOp").val() / 100000);
    }
    var x, y;
    chen_CustompointLayer.removeAllFeatures();
    chen_CustompointRouteLayer.removeAllFeatures();
    //清空所有
    chen_deactiveAll();
    if (chen_CustomPointEvent != null) {
        x = chen_CustomPointEvent.feature.geometry.components[0].x;
        y = chen_CustomPointEvent.feature.geometry.components[0].y;

        var Count = [
           [x, y, "消防员(黄树海)登记警情", 15706672289, "危险源", "2016/11/30 9:20:57", "2016/11/29 9:20:57", "中山公园发生火灾", 2, 0, 201611292]]
        for (var i = 0; i < Count.length; i++) {
            var provinceInfo = Count[i];
            var size = new SuperMap.Size(32, 35),//指定图标的大小
        offset = new SuperMap.Pixel(-(size.w / 2), -size.h);//指定图标的偏移量
            var icon;
            icon = new SuperMap.Icon("/content/images/weixian.png", size, offset);//图标类，表示显示在屏幕上的图标
            Callthepolicemarker = new SuperMap.Marker(SuperMap.LonLat.fromString(provinceInfo[0] + "," + provinceInfo[1]), icon);
            Callthepolicemarker.alarmPeople = provinceInfo[2];
            Callthepolicemarker.alarmPhone = provinceInfo[3];
            Callthepolicemarker.OccurAddress = provinceInfo[4];
            Callthepolicemarker.CallTime = provinceInfo[5];
            Callthepolicemarker.OccurTime = provinceInfo[6];
            Callthepolicemarker.Filedes = provinceInfo[7];
            Callthepolicemarker.number = provinceInfo[10];
            Callthepolicemarker.bool = false;//自定义参数赋值
            Callthepolicemarker.id = provinceInfo[8];
            //Callthepolicemarker.events.on({  //注册监听点击事件
            //    "click": jia_mouseClickHandler,//单击触发
            //    "scope": Callthepolicemarker,   //大概是传参数把
            //});
            chen_DangerousPoerMarkers.addMarker(Callthepolicemarker);//添加覆盖物到标记图层}
        }
    } else {
        x = nowSelectAlarm.x;
        y = nowSelectAlarm.y;
    }

    chen_centerPoint = new SuperMap.Geometry.Point(x, y);
    AlarmPoint = chen_centerPoint;

}
var Jia_x;
var Jia_y;//3572 ClearLayer();//清除

//根据SmID筛选出marker把泡泡选中
function Jia_markersSelect(t) {
    var SmID = parseInt($(t).attr('SmID'));
    var strRou = $(t).attr('strRoute');

    for (var e = 0; e < chen_DangerousMarkers.markers.length; e++) {
        if (chen_DangerousMarkers.markers[e].SmID == SmID) {
            chen_marker = chen_DangerousMarkers.markers[e];//接收参数
            //strRou = "分析失败";
            if (strRou != "分析失败") {
                jia_mouseClickHandler(strRou);
            }
            break;
        }
    }
    if (strRou != "分析失败") {
        chen_CustompointRouteLayer.removeAllFeatures();
        //点击画路线
        for (var ki = 0; ki < xallSchemeObject.length; ki++) {
            if (xallSchemeObject[ki][0].SmID == SmID) {
                // chen_CustompointLayer.removeAllFeatures();
                try {
                    xallScheme(xallSchemeObject[ki][0].result);
                } catch (e) {
                    alert("出错" + e);
                }
                break;
            }
        }
    }

}
//截取网页上的路径长度
function ReplacestrRou(aa) {
    var strRoute = $("#" + aa.SmID).attr('strRoute');
    chen_CustompointRouteLayer.removeAllFeatures();
    //点击画路线
    for (var ki = 0; ki < xallSchemeObject.length; ki++) {
        if (xallSchemeObject[ki][0].SmID == aa.SmID) {
            // chen_CustompointLayer.removeAllFeatures();
            xallScheme(xallSchemeObject[ki][0].result);
            break;
        }
    }
    return strRoute;
}
var marKers;
//弹出泡泡框
var chen_marker;
function jia_mouseClickHandler(strRou) {
    if (chen_marker == null) {
        chen_marker = this;
        strRou = ReplacestrRou(this);
    }
    if (strRou == null && strRou==undefined) {
        strRou = "计算失败！";
    }
    var ADDRESS;
    var NAME;
    var TELEPHONE;
    var ScreeningType;
    var X;
    var Y;
    var number;
    var xStrTypy;

    xStrTypy = chen_marker.StrTypy;
    ADDRESS = chen_marker.ADDRESS;
    NAME = chen_marker.NAME;
    TELEPHONE = chen_marker.TELEPHONE;
    ScreeningType = chen_marker.ScreeningType;
    X = chen_marker.getLonLat().lon;
    Y = chen_marker.getLonLat().lat;
    number = chen_marker.number;
    //  /^[A-Za-z0-9]+$/
    var size = new SuperMap.Size(8, 20),//标记的大小
                               offset = new SuperMap.Pixel(-(size.w / 2), -(size.h * 2)),//此类用x,y坐标描绘屏幕坐标（像素点）
                               icon = new SuperMap.Icon("/content/images/smasll.png", size, offset);//图标类，表示显示在屏幕上的图标（弹窗的偏移量）
    contentHTML = "<div class='popwin_titleDiv' style=''><span class='popwin_title'>" + ScreeningType + "</span></div>";
    contentHTML += '<div style="font-size:12px;color:#222;max-width:500px;word-break: break-all;margin:0px auto;padding-left: 5px;">'
    contentHTML += "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>查找类型：</b>"
       + xStrTypy + "</div><div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>单位名称：</b>"
        + NAME + "</div><div class='popwin_border_bottom'></div><div> <b>单位地址：</b>"
        + ADDRESS + "</div><div class='popwin_border_bottom'></div>"
             + "<div style='padding-top:5px;'><b>联系电话：</b>"
             + TELEPHONE + "</div><div class='popwin_border_bottom'></div><div> <b>离危险源距离：</b>"
           + strRou + "</div>";

    //组织需要嵌入的HTML字符串表达
    //初始化popup类
    var popup = new SuperMap.Popup.FramedCloud(
        "popwin_c",//弹窗ID
        new SuperMap.LonLat(X, Y),//坐标
        null,//大小SuperMap.Size
        contentHTML,//弹窗内容HTML的字符串表达，其用法同
        icon,//锚点
        true,//Boolean 是否显示关闭按钮。
        function () {
            closeInfoWin();
        },//关闭弹窗触发该回调函数
        false);//是否显示阴影
    popup.autoSize = true;//根据弹窗内容自动调整弹窗大小
    popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
    map.removeAllPopup();//移除所有弹窗
    infowin = popup;//赋值
    map.addPopup(popup);//添加弹窗到map图层
    chen_marker = null;
}
function mouseClickHandler() {
}
//?圆方法
function DraCri(Range) {
    chen_CustompointRouteLayer.removeAllFeatures();
    chen_CustompointLayer.removeAllFeatures();
    var polygon = SuperMap.Geometry.Polygon.createRegularPolygon(chen_centerPoint, Range, 360, 360);
    //alert(chen_centerPoint);
    // var circleP = chen_createCircle(chen_centerPoint, Range, 256, 360, 360);//画园圈
    var circleVector = new SuperMap.Feature.Vector(polygon);
    circleVector.style = {
        strokeColor: "#DE5145",
        fillColor: "#EA7454",
        strokeWidth: 2,
        fillOpacity: 0.3,
        strokeOpacity: 0.5
    };

    chen_CustompointLayer.addFeatures(circleVector);
    AlarmFeatureGeometry = circleVector;
    // map.zoomToExtent(circleVector.geometry.bounds);//缩放到指定范围，重新定位中心点。
}


function processFailed(e) {
    alert(e.error.errorMsg);
}
//报警点单击事件
function CallthepolicepopAlarmaa(t) {
    var chen_marker = this;//接收参数
    var alarmPeople;
    var alarmPhone;
    var OccurAddress;
    var CallTime;
    var OccurTime;
    var Filedes;
    var X;
    var Y;
    var number;
    if (t.bool == true) {
        alarmPeople = t.alarmPeople;
        alarmPhone = t.alarmPhone;
        OccurAddress = t.OccurAddress;
        CallTime = t.CallTime;
        OccurTime = t.OccurTime;
        Filedes = t.Filedes;
        X = t.lonlat.lon;
        Y = t.lonlat.lat;
        number = t.number;
    } else {
        alarmPeople = chen_marker.alarmPeople;
        alarmPhone = chen_marker.alarmPhone;
        OccurAddress = chen_marker.OccurAddress;
        CallTime = chen_marker.CallTime;
        OccurTime = chen_marker.OccurTime;
        Filedes = chen_marker.Filedes;
        X = chen_marker.getLonLat().lon;
        Y = chen_marker.getLonLat().lat;
        number = chen_marker.number;
    }
    var size = new SuperMap.Size(8, 20),//标记的大小
                               offset = new SuperMap.Pixel(-(size.w / 2), -(size.h * 2)),//此类用x,y坐标描绘屏幕坐标（像素点）
                               icon = new SuperMap.Icon("/content/images/smasll.png", size, offset);//图标类，表示显示在屏幕上的图标（弹窗的偏移量）
    var contentHTML = '<div style="font-size:15px;color:#222;max-width:500px;word-break: break-all;margin:0px auto;"><div><b>危险源地址：</b>' + OccurAddress + "</div></div>";

    //组织需要嵌入的HTML字符串表达
    //初始化popup类
    var popup = new SuperMap.Popup.FramedCloud(
        "popwin",//弹窗ID
        new SuperMap.LonLat(X, Y),//坐标
        null,//大小SuperMap.Size
        contentHTML,//弹窗内容HTML的字符串表达，其用法同
        icon,//锚点
        true,//Boolean 是否显示关闭按钮。
        function () {
            closeInfoWin();
        },//关闭弹窗触发该回调函数
        false);//是否显示阴影
    popup.autoSize = true;//根据弹窗内容自动调整弹窗大小
    popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
    map.removeAllPopup();//移除所有弹窗
    infowin = popup;//赋值
    map.addPopup(popup);//添加弹窗到map图层

} //关闭信息框
function closeInfoWin() {
    if (infowin) {
        try {
            infowin.hide();
            infowin.destroy();
        }
        catch (e) { }
    }
}
var xnodeArray = [];
//创建一个圆
function chen_createCircle(origin, radius, sides, r, angel) {
    var rR = r * Math.PI / (180 * sides);
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        rotatedAngle = rR * i;
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new SuperMap.Geometry.Point(x, y));
    }
    rotatedAngle = r * Math.PI / 180;
    x = origin.x + (radius * Math.cos(rotatedAngle));
    y = origin.y + (radius * Math.sin(rotatedAngle));
    points.push(new SuperMap.Geometry.Point(x, y));

    var ring = new SuperMap.Geometry.LinearRing(points);
    ring.rotate(parseFloat(angel), origin);
    var geo = new SuperMap.Geometry.Collection([ring]);
    geo.origin = origin;
    geo.radius = radius;
    geo.r = r;
    geo.angel = angel;
    geo.sides = sides;
    geo.polygonType = "Curve";
    return geo;
}

var jkjjk = 0;
var xxxxxx = 0;
var BitFailed = 0;
function FindID(pathGuideItems, result) {
    //var x = pathGuideItems.route.components[0].components[pathGuideItems.route.components[0].components.length - 1].x;
    //var y = pathGuideItems.route.components[0].components[pathGuideItems.route.components[0].components.length - 1].y;
    try {
        if (pathGuideItems.pathGuideItems.length != null) {
            var x = pathGuideItems.pathGuideItems[pathGuideItems.pathGuideItems.length - 1].geometry.x;
            var y = pathGuideItems.pathGuideItems[pathGuideItems.pathGuideItems.length - 1].geometry.y;
            for (var r = 0; r < ObjectA.length; r++) {
                if (x == ObjectA[r][0].x && y == ObjectA[r][0].y) {
                    ObjectA[r][0].distance = pathGuideItems.route.length;
                    AppendNewGeneration(ObjectA[r][0].SmID, ObjectA[r][0].Name, ObjectA[r][0].distance, r);
                    var aObject = [{ "result": result, "SmID": ObjectA[r][0].SmID }];
                    xallSchemeObject.push(aObject);
                    xxxxxx++;//断开计算时让失败继续
                    break;
                }
            }
            jkjjk++;
        } else {
            BitFailed++;
            processFailedxprocess("1");//调用失败方法

        }
    } catch (t) {
        BitFailed++;
        processFailedxprocess("1");//调用失败方法

    }

}
var xallSchemeObject = [];
function xprocessCompleted(findPathEventArgs) {

    var result = findPathEventArgs.result;
    if (result != null) {
        FindID(result.pathList[0], result);
        TimerJian();
    }
    //xallScheme(result);
}
function TimerJian() {
    var timeOutId = setTimeout(function () {
        if (jkjjk == ObjectA.length) {
            jkjjk = 0;
            strDiv += " </table>";
            strDiv += "</div></div> </div>";
            $("#accordion_result").append(strDiv);
            timeOutId = null;
            boolKi = true;
            strDiv = "";

        }
    }, 10);
}
function xallScheme(result) {

    if (pathListIndex < result.pathList.length) {
        chen_addPath(result);
    } else {
        pathListIndex = 0;
        //线绘制完成后会绘制关于路径指引点的信息
        xaddPathGuideItems(result);
    }

}
var routeCompsIndex = 0;
//以动画效果显示分析结果
function chen_addPath(result) {
    if (routeCompsIndex < result.pathList[pathListIndex].route.components.length) {
        var pathFeature = new SuperMap.Feature.Vector();
        var points = [];
        for (var k = 0; k < 2; k++) {
            if (result.pathList[pathListIndex].route.components[routeCompsIndex + k]) {
                points.push(new SuperMap.Geometry.Point(result.pathList[pathListIndex].route.components[routeCompsIndex + k].x, result.pathList[pathListIndex].route.components[routeCompsIndex + k].y));
            }
        }
        var curLine = new SuperMap.Geometry.LinearRing(points);
        pathFeature.geometry = curLine;
        pathFeature.style = style;
        //获取路径
        strMeters = result.pathList[pathListIndex].route;
        chen_CustompointRouteLayer.addFeatures(pathFeature);
        //每隔0.001毫秒加载一条弧段
        pathTime = setTimeout(function () { chen_addPath(result); }, 0.001);
        routeCompsIndex++;
    } else {
        routeCompsIndex = 0;
        pathListIndex++;
        xallScheme(result);
    }

}

var styleGuidePoint;
var ints = 0;
var pathListIndex = 0;
var DistanceLength;
//画路径
function xaddPathGuideItems(result) {
    ints++;
   

      
            styleGuidePoint = {              
                fillColor: "red",
                strokeColor: '#3586D7',
                strokeWidth: 2,
                fillOpacity: 1,
                strokeOpacity: 0.9
            
            };
      
    //显示每个pathGuideItem和对应的描述信息
    for (var k = 0; k < result.pathList.length; k++) {
        var pathGuideItems = result.pathList[pathListIndex].pathGuideItems, len = pathGuideItems.length;
        for (var m = 0; m < len; m++) {
            var guideFeature = new SuperMap.Feature.Vector();
            guideFeature.geometry = pathGuideItems[m].geometry;
            guideFeature.attributes = { description: pathGuideItems[m].description };
            if (guideFeature.geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
                guideFeature.style = styleGuidePoint;
            }
            else {
                guideFeature.style = styleGuidePoint;
            }
            DistanceLength = result.pathList[pathListIndex].route.length;
        
            chen_CustompointRouteLayer.addFeatures(guideFeature);
        }
    }

}
