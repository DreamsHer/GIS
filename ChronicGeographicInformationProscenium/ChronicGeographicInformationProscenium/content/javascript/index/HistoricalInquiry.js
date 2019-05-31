
/****************************************军-历年火灾详情统计控制页面 Bengin**********************************************************/
//显示详情模板
function showCaseStatistics() {
    StatisticsTable();//统计表
    StatisticsChart();//统计图
    //左往右移
    $('#CaseStatistics')
        .animate({ left: '-280px' }, 0, function () {
            $('#CaseStatistics').show();
        })
        .animate({ left: '0px' }, 1000, function () {
        });
}
//关闭详情模板
function closeCaseStatistics() {
    // 右往左移
    $('#CaseStatistics')
        .animate({ left: '0px' }, 0)
        .animate({ left: '-280px' }, 1000, function () {
            $('#CaseStatistics').hide();
        });
}
/****************************************军-历年火灾详情统计控制页面 End**********************************************************/
//<!-*************************************- 彦-右侧数据详情火灾事件详情控制 Begin-****************************************************->
//清除图层方法
function clearFeatures() {
    vectorLayer_H.removeAllFeatures();
    //vectorLayer1_H.removeAllFeatures();
    markerLayer_H.clearMarkers();
    ClosePersonMessageed();//清除弹框
    SmX.length = null;
    SmY.length = null;
}
//显示详情模板
var newhistory;//存储数组公共类
var CurPage = 1;//默认页数
var pagenumber = 5;//每页的数据量
var AlarmAssemble = new Array();
var AlarmIDQuanJu = null;//全局变量——警情ID
var newnumber = 0;
function showFireInformation(number) {
    map.removeAllPopup();//移除所有弹出窗体
    var strBianHao = $("#One").val();//获取事故编号
    var strName = $("#o").val();//获取事发单位名称
    var beginTime = $("#Begin_datetime").html();//获取开始时间
    var endTime = $("#End_datetime").html();//获取结束时间
    newnumber = number;
    if (number == 0) {
        CurPage = 1;
    }
    markerLayer_H.clearMarkers();//清除上一次显示的气泡
    //map.setCenter(new SuperMap.LonLat(113.91365, 22.55169), 0);//地图全屏
    //重新初始化
    $("#BasicTableTwo tr:gt(0)").remove();//清空Table数据
    $(".FenYe ul li span").unbind("click");//清除单击事件
    if (ScopeP == true)//判断范围锁是否开启
    {
        if (SmX.length > 0 || SmY.length > 0 || FireGrade.length > 0 || beginTime != "" || endTime != "" || strBianHao != "" || strName != "") {
            if (SmX.length <= 0) {
                SmX = new Array("");
            }
            if (SmY.length <= 0) {
                SmY = new Array("");
            }
            if (FireGrade.length <= 0) {
                FireGrade = new Array("");
            }
            //根据火灾等级及画图画出的点查询绑定Table数据
            $.post("/index/getAll", { FireGrade: FireGrade, SmX: SmX, SmY: SmY, beginTime: beginTime, endTime: endTime, strBianHao: strBianHao, strName: strName, PageSize: pagenumber, CurPage: CurPage }, function (data) {
                SelectAll(data);
                if (data['db'].length) {
                    leftToright();
                }
            });
        }
        else {
            alert("请选择查询条件！");
            ////无条件查询绑定Table数据
            //$.post('/index/getFireEvent_One', { PageSize: pagenumber, CurPage: CurPage }, function (data) {
            //    SelectAll(data);
            //    if (data['db'].length) {
            //        leftToright();
            //    }
            //});
        }
    }
    else {
        //alert("当前条件没有查询到数据，请重新选择条件！");
        CurPage = 1;
        $('#lblZongJiLuShu').html(0);
        $("#lblZongYeShu").html(0);
        $('#txtSkipPage').attr('max', 0);
        $('#_Paging').css('display', 'none');
        alert('当前范围没有获取到数据！请重新选择范围！');
        rightToleft();//关闭火灾事件详情窗体
        //closeFireInformation();//重置按钮
        //SmX.length = null;
        //SmY.length = null;
        //clearFeatures();//清除图层方法
        //ScopeP = true;//划范围的锁
    }
    //左往右移    
}
function leftToright() {
    //左往右移
    if (newnumber == 0) {
        $('#FireInformation')
        .animate({ left: '-280px' }, 0, function () {
            closeCaseStatistics();
            $('#FireInformation').show();
        })
        .animate({ left: '0px' }, 1000, function () { });
    }
}
//添加数据
function addEnterpriseMarkerSelectAll(AlarmID, XCoordinate, YCoordinate, boolOpen) {
    var size = new SuperMap.Size(28, 20),
                  offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
    icon = new SuperMap.Icon("/SuperMap/images/bus-H.png", size, offset);
    var marker = new SuperMap.Marker(new SuperMap.LonLat(XCoordinate, YCoordinate), icon);  //初始化标记覆盖物类  
    marker.AlarmID = AlarmID;//警情ID
    marker.XCoordinate = XCoordinate;//X轴
    marker.YCoordinate = YCoordinate;//Y轴
    marker.bool = boolOpen;//自动打开
    marker.events.on({
        "click": openInfoSelectAll,
        "touchstart": openInfoSelectAll, //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
        "scope": marker
    });
    markerLayer_H.addMarker(marker);//添加覆盖物到标记图层      
    if (boolOpen == true) {
        openInfoSelectAll(marker);
    }
}
var openInfoSelectAllIofo = null;
function openInfoSelectAll(t) {
    closeInfoWinPoliceIntelligenceAll();
    var marker = this;//接收参数
    var AlarmID;//警情ID
    var AlarmNumber1;//编号
    var XCoordinate;//X轴
    var YCoordinate;//Y轴
    //把上一次选中的报警点图片换点
    for (var i = 0; i < markerLayer_H.markers.length; i++) {//未出警
        markerLayer_H.markers[i].setUrl('/SuperMap/images/bus-H.png');
    }
    if (t.bool == true) {
        AlarmID = t.AlarmID;
        XCoordinate = t.XCoordinate;
        YCoordinate = t.YCoordinate;
        marker = t;
        t.setUrl('/SuperMap/images/bus-H.png');
    }
    else {
        AlarmID = marker.AlarmID;
        XCoordinate = marker.XCoordinate;
        YCoordinate = marker.YCoordinate;
        marker.setUrl('/SuperMap/images/bus-H.png');
    }
    CloseDetail();//关闭详情弹框方法
    DetailsFire(AlarmID);//弹出详情页面
    $.getJSON("/index/getAlarm?AlarmID=" + AlarmID, function (data) {
        if (data.length > 0) {
            closeInfoWinPoliceIntelligenceAll();
            var datetime = new Date(parseInt(data[0].TimeOfTheIncident.substr(6)));
            var contentHTML = "<div class='popwin_titleDiv' style=''><span class='popwin_title'>案件点</span></div>" +
                  "<div style='font-size:12px;color:#222;max-width:500px;word-break: break-all;margin:0px auto;padding-left: 2px;'><div><b>事发单位：</b>" + data[0].IncidentUnit +
                  "</div><div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>事件编号：</b>" + data[0].AlarmNumber +
                  "</div><div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>发生时间：</b>" + datetime.getFullYear() + "年" + (datetime.getMonth() + 1) + "月" + datetime.getDate() + "日" + datetime.getHours() + "时" + datetime.getMinutes() + "分" + datetime.getSeconds() + "秒" +
                 "</div><div class='popwin_border_bottom'></div>" + "<div style='padding-top:5px;'><b>火灾等级：</b>" + data[0].PropertyDetail +
                 "</div><div class='popwin_border_bottom'></div>" + "</div></div>";
            var size = new SuperMap.Size(28, 20);
            var offset = new SuperMap.Pixel(-((size.w / 2) + 10), -(size.h - 8));
            var icon = new SuperMap.Icon("/SuperMap/images/bus-H.png", size, offset);
            var popupOne = new SuperMap.Popup.FramedCloud("popwin_w",
                     new SuperMap.LonLat(XCoordinate, YCoordinate),
                   null,
                   contentHTML,
                   icon,
                   true,
                   function () {
                       closeInfoWinPoliceIntelligenceAll();
                   },
                   true);
            openInfoSelectAllIofo = popupOne;
            map.addPopup(popupOne);
            map.panTo(new SuperMap.LonLat(XCoordinate, YCoordinate));
            map.zoomTo(3);
        }
    })
}
//关闭信息框
function closeInfoWinPoliceIntelligenceAll() {
    if (openInfoSelectAllIofo) {
        try {
            openInfoSelectAllIofo.hide();
            openInfoSelectAllIofo.destroy();
            openInfoSelectAllIofo = null;
        }
        catch (e) { }
    }
}
//组合查询总方法
function SelectAll(data) {
    if (data.sumCount <= 0 || data == "") {
        //CurPage = 1;
        $('#lblZongJiLuShu').html(0);
        $("#lblZongYeShu").html(0);
        $('#txtSkipPage').attr('max', 0);
        $('#_Paging').css('display', 'none');
        alert('查询不到数据！请更换条件试试。');
        rightToleft();//关闭火灾事件详情窗体
    } else {
        for (var p = 0; p < data['db'].length; p++) {
            addEnterpriseMarkerSelectAll(data['db'][p].AlarmID, data['db'][p].XCoordinate, data['db'][p].YCoordinate, false);
        }
        $('#_Paging').css('display', 'block');
        var table = $("#BasicTableTwo tbody");
        for (var i = 0; i < data['db'].length; i++) {
            if (i <= pagenumber) {
                var tr = "<tr><td><span>" + (i + 1) + "</span></td><td><span>" + data['db'][i].IncidentUnit + "</span></td><td><a href='javascript:;' id=" + data['db'][i].AlarmID + ">详情</a></td></tr>";
                table.append(tr);
            }
        }
        $('#lblZongJiLuShu').html(data.sumCount);
        $("#lblZongYeShu").html(Math.ceil(data.sumCount / pagenumber));
        $('#txtSkipPage').attr('max', Math.ceil(data.sumCount / pagenumber));
    }
    $('#txtSkipPage').val(CurPage);
    $(".BasicTableTwo tr td a").click(function () {
        vectorLayer_H.removeAllFeatures();//清除画图图层样式
        SmX.length = null;
        SmY.length = null;
        AlarmIDQuanJu = this.id;
        ShowConflagration_Details(this);
        for (var i = 0; i < markerLayer_H.markers.length; i++) {
            if (markerLayer_H.markers[i].AlarmID == AlarmIDQuanJu) {
                markerLayer_H.markers[i].bool = true;
                openInfoSelectAll(markerLayer_H.markers[i]);
                break;
            }
        }
    })
}
function skipPage(ev) {
    var oEvent = ev || event;   //处理兼容
    var keyCode = oEvent.keyCode;
    if (keyCode != 13) { return; }
    if ($("#txtSkipPage").val() == "") {
        alert("请输入您要跳转的页数");
        return;
    }
    if (Number($.trim($("#txtSkipPage").val())) > Number($.trim($("#lblZongYeShu").html()))) {
        alert("您输入的页数大于当前总页数");
        $("#txtSkipPage").val('');
        return;
    }
    if (Number($.trim($("#txtSkipPage").val())) <= 0) {
        alert("您输入的页数应大于零");
        $("#txtSkipPage").val('');
        return;
    }
    CurPage = $("#txtSkipPage").val();
    showFireInformation(1);
}
//下一页
function nextPage() {
    if ($("#lblZongYeShu").html() <= CurPage) {
        alert("已到最后一页");
        return;
    }
    CurPage++;
    showFireInformation(2);
}
//上一页
function previousPage() {
    if (1 >= CurPage) {
        alert("已到第一页");
        return;
    }
    CurPage--;
    showFireInformation(3);
}
//首页
function homePage() {
    if (CurPage == 1) {
        alert("当前页已是首页"); return;
    }
    CurPage = 1;
    showFireInformation(4);
}
//尾页
function lastPage() {
    if (CurPage == $("#lblZongYeShu").html()) {
        alert("当前页已是尾页"); return;
    }
    CurPage = $("#lblZongYeShu").html();
    showFireInformation(5);
}
//更换显示行数
function changePage() {
    CurPage = 1;
    showFireInformation(6);
}
//var Point_X;
//var Point_Y;
////气泡弹出，标记信息
//function processCompletedTen(queryEventArgs) {
//    markerLayer_H.clearMarkers();//清除上一次显示的气泡
//    var i, j, feature, result = queryEventArgs.result;
//    if (result && result.recordsets) {
//        for (i = 0; i < result.recordsets.length; i++) {
//            if (result.recordsets[i].features) {
//                for (j = 0; j < result.recordsets[i].features.length; j++) {
//                    feature = result.recordsets[i].features[j];
//                    Point_X = feature.geometry.x;
//                    Point_Y = feature.geometry.y;
//                    var size = new SuperMap.Size(28, 20),
//                         offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
//                    icon = new SuperMap.Icon("/SuperMap/images/bus-H.png", size, offset);
//                    marker = new SuperMap.Marker(new SuperMap.LonLat(Point_X, Point_Y), icon);  //初始化标记覆盖物类    
//                    marker.FLoorID = feature.attributes.SmID;//获取场所ID
//                    map.setCenter(new SuperMap.LonLat(Point_X, Point_Y), 3);//地图全屏
//                    //AlarmIDQuanJu = feature.data.AlarmID;
//                    marker.events.on({
//                        "click": openInfoWin,
//                        "touchstart": openInfoWin,//假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
//                        "scope": marker
//                    });
//                    markerLayer_H.addMarker(marker);//添加覆盖物到标记图层
//                    openInfoWin();//弹出信息
//                }
//            }
//        }
//    }
//}
//var infowined = null;
////点击气泡显示内容
//function openInfoWin() {
//    ClosePersonMessageed();
//    $.getJSON("/index/getAlarm?AlarmID=" + AlarmIDQuanJu, function (data) {
//        var datetime = new Date(parseInt(data[0].TimeOfTheIncident.substr(6)));
//        var contentHTML = "<div class='popwin_titleDiv' style=''><span class='popwin_title'>案件点</span></div>" +
//              "<div style='font-size:12px;color:#222;max-width:500px;word-break: break-all;margin:0px auto;padding-left: 2px;'><div><b>事发单位：</b>" + data[0].IncidentUnit +
//              "</div><div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>事件编号：</b>" + data[0].AlarmNumber +
//              "</div><div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>发生时间：</b>" + datetime.getFullYear() + "年" + (datetime.getMonth() + 1) + "月" + datetime.getDate() + "日" + datetime.getHours() + "时" + datetime.getMinutes() + "分" + datetime.getSeconds() + "秒" +
//             "</div><div class='popwin_border_bottom'></div>" + "<div style='padding-top:5px;'><b>火灾等级：</b>" + data[0].PropertyDetail +
//             "</div><div class='popwin_border_bottom'></div>" + "</div></div>";
//        var size = new SuperMap.Size(28, 20);
//        var offset = new SuperMap.Pixel(-((size.w / 2) + 10), -(size.h - 8));
//        var icon = new SuperMap.Icon("/SuperMap/images/bus-H.png", size, offset);
//        var popupOne = new SuperMap.Popup.FramedCloud("popwin_w",
//                new SuperMap.LonLat(Point_X, Point_Y), null, contentHTML, icon, true);
//        infowined = popupOne;
//        map.addPopup(popupOne);
//        map.panTo(new SuperMap.LonLat(Point_X, Point_Y));
//        map.zoomTo(3);
//    })
//}
////关闭气泡
//function ClosePersonMessageed() {
//    if (infowined) {
//        try {
//            infowined.hide();//隐藏气泡
//            infowined.destroy();//释放资源
//        }
//        catch (e) { }
//    }
//}
////SQL查询失败时出发的事件
//function processFailed(e) {
//    //alert(e.error.errorMsg);//弹出查询错误的原因
//}
//关闭详情模板--重置按钮
function closeFireInformation() {//重置按钮
    ScopeP = true;//划范围的锁
    closeConflagration_Details();//关闭详情页面
    clearFeatures();//清除图层方法
    map.setCenter(new SuperMap.LonLat(113.91365, 22.55169), 0);//地图全屏
    //FireGrade = new Array("0,1,2,3,4");//初始化数组
    //var selectInputsed = document.getElementsByClassName('checkOne'); //根据获取到的类名查询操作
    //for (var i = 0; i < selectInputsed.length; i++) {
    //    selectInputsed[i].checked = true;
    //}
    FireGrade.length = null;
    $("#Operate_second_checkbox input").removeAttr("checked");//去除复选框所有的勾选
    $('#One').val("");//清空事故编号文本框
    $('#o').val("");//清空事故名称文本框
    $("#Begin_datetime").html("");//清空日期框
    $("#End_datetime").html("");//清空日期框
    SmX.length = null;
    SmY.length = null;
    rightToleft();//关闭火灾事件详情窗体
}
function rightToleft() {
    //右往左移
    $('#FireInformation')
        .animate({ left: '0px' }, 0)
        .animate({ left: '-280px' }, 1000, function () {
            $('#FireInformation').hide();
        });
}
//<!-****************************************************- 彦-右侧数据详情火灾事件详情控制 End-****************************************************->
/************************************金橘-火灾详细页面控制 Begin********************************************************/
//打开详情界面
function ShowConflagration_Details(t) {
    pw_seriousMarkerLayer.clearMarkers();
    var xx = Number($(t).attr('xx'));
    var yy = Number($(t).attr('yy'));
    //左往右移           
    $('#Conflagration_Details')
       .animate({ left: '100%', right: '-100%' }, 0)
       .animate({ left: '0%', right: '0%' }, 1000);
    $('#Conflagration_Details').show();
}
//关闭详情界面
function closeConflagration_Details() {
    CloseDetail();//关闭详情弹框方法
    //左往右移
    $('#Conflagration_Details')
        .animate({ left: '0%', right: '0%' }, 0)
        .animate({ left: '100%', right: '-100%' }, 1000, function () {
            $('#Conflagration_Details').hide();
        });
}
function mouover(t) {
    t.setAttribute("src", "/content/images/Redclose.png");
}
function mouout(t) {
    t.setAttribute("src", "/content/images/close.png");
}
var zhankaifou = true;
function zhankai() {
    document.getElementById("huozai_img").style.display = 'block'//显示治安检查历史信息窗体
    if (zhankaifou) {
        document.getElementById("tubiaoTwo").style.marginTop = '-20px'//展开图标
        document.getElementById("huozai_img").style.height = '200px';//展开治安检查历史信息窗体
        zhankaifou = false;
    } else {
        document.getElementById("tubiaoTwo").style.marginTop = '0px'//合上图标
        document.getElementById("huozai_img").style.height = '20px';//收缩治安检查历史信息窗体
        zhankaifou = true;
        document.getElementById("huozai_img").style.display = 'none'//隐藏治安检查历史信息窗体
    }
}
/************************************金橘-火灾详细页面控制 End********************************************************/
/**************************************************金橘-火灾详情 Begin***************************************************/
function LZstatisticsShow() {//点击事故处理详情按钮
    $('#Popup_Detail').show();
    addShoDuiTangKangBaseOne();
    //ClosedID结案ID
    $.getJSON("/index/getFireAccidentDetails?AlarmIDQuanJu=" + AlarmIDQuanJu, function (dataTwo) {
        if (dataTwo.length > 0) {
            $("#DetailedTableTwo tbody").remove();
            var fireStationMC = "";
            var ThePoliceID = 0;
            var tr = "";
            for (i = 0; i < dataTwo.length; i++) {
                if (fireStationMC != dataTwo[i].FireStationMC) {
                    fireStationMC = dataTwo[i].FireStationMC;
                    ThePoliceID = dataTwo[i].ThePoliceID;
                    var personnelMC = "";
                    var toolMC = "";
                    var Model = "";
                    var seating = "";
                    var wholeMission = "";
                    for (j = 0; j < dataTwo.length; j++) {
                        if (fireStationMC == dataTwo[j].FireStationMC) {
                            var sdkfj = dataTwo[j].PersonnelMC;
                            if (!personnelMC.match(sdkfj)) {
                                personnelMC += dataTwo[j].PersonnelMC + "、";
                            }
                            if (!toolMC.match(dataTwo[j].ToolMC)) {
                                if (dataTwo[j].Seating != "" && dataTwo[j].Model != null) {
                                    Model += dataTwo[j].Model + "、";//车辆
                                }
                                toolMC += dataTwo[j].ToolMC + "、";
                            }
                            if (!seating.match(dataTwo[j].Seating)) {
                                seating += dataTwo[j].Seating + "、";
                            }
                            if (!wholeMission.match(dataTwo[j].WholeMission)) {
                                wholeMission += dataTwo[j].WholeMission + "、";
                            }
                        }
                    }
                    tr += "<tr><td>" + fireStationMC + "</td><td><a href='#' onclick='showLeftDetailPolice(" + ThePoliceID + ")'>个人具体任务安排详细</a><br />" + personnelMC.substr(0, personnelMC.length - 1) + "</td><td>" + Model.substr(0, Model.length - 1) + "</td><td>" + toolMC.substr(0, toolMC.length - 1) + "</td><td>" + wholeMission.substr(0, wholeMission.length - 1) + "</td></tr>";
                }
            }
            $("#DetailedTableTwo").append("<tbody>" + tr + "</tbody>");
        }
    });
    //更多信息
    $.getJSON("/index/getFireAccidentDetails_MoreInformation?AlarmIDQuanJu=" + AlarmIDQuanJu, function (data) {
        $("#ResponsibilityAndHandlingP").text(data[0].FireResponsibilityAndHandling);//火灾责任及处理
        $("#CauseOfFireP").text(data[0].CauseOfFire);//起火原因
        $("#RescueProcessP").text(data[0].DisasterReliefProcess);//救援经过
        $("#DisasterTreatmentP").text(data[0].ProcessingReport);//灾情处理
    })
}
//显示警员分配任务模板
function showLeftDetailPolice(values) {
    $("#TablePolice_title tr:gt(0)").remove();
    $.getJSON("/index/TaskDetails?thePoliceID=" + values, function (data) {
        if (data.length > 0) {
            var tablePolice = $("#TablePolice_title");

            for (i = 0; i < data.length; i++) {
                $(tablePolice).append("<tr><td><span>" + (i + 1) + "</span></td><td><span class='polic_color'>" + data[i].PersonnelMC + "</span></td><td><span>" + (data[i].Task == null ? "无任务" : data[i].Task) + "</span></td></tr>");
            }
        }
    })
    //左往右移
    $('#Police_renwu')
        .animate({ left: '-280px' }, 0, function () {
            closeCaseStatistics();
            $('#Police_renwu').show();
        })
        .animate({ left: '0px' }, 1000, function () { });
}
//关闭警员分配任务模板
function closePolice_renwu() {
    // 右往左移
    $('#Police_renwu')
        .animate({ left: '0px' }, 0)
        .animate({ left: '-280px' }, 1000, function () {
            $('#Police_renwu').hide();
        });
}
/**************************************************金橘-火灾详情 End***************************************************/
/*---------------------------------------------------------彭-历史查询模块 Begin-------------------------------------------------------------*/
/////////////////彭-弹出框控制-Bengin/////////////////////////////
function CloseDetail() {//点击关闭按钮
    closePolice_renwu();
    $('#Popup_Detail').hide();
}
/////////////////彭-弹出框控制-End/////////////////////////////
/************************************************ 彭-调用弹出框显示事故处理详情页面-Begin ************************************************/
function Popup_Detail(oDrag, handle) {
    var disX = dixY = 0;
    handle = handle || oDrag;
    handle.style.cursor = "move";
    handle.onmousedown = function (event) {
        var event = event || window.event;
        disX = event.clientX - oDrag.offsetLeft;
        disY = event.clientY - oDrag.offsetTop;
        document.onmousemove = function (event) {
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            //最大高度和最大宽度
            var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
            var maxT = document.documentElement.clientHeight - oDrag.offsetHeight - 10;
            iL <= 0 && (iL = 0);
            iT <= 0 && (iT = 0);
            iL >= maxL && (iL = maxL);
            iT >= maxT && (iT = maxT);
            oDrag.style.left = iL + "px";
            oDrag.style.top = iT + "px";
            return false
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            this.releaseCapture && this.releaseCapture()
        };
        this.setCapture && this.setCapture();
        return false
    };
}
function addShoDuiTangKangBaseOne() {
    var oDrag = document.getElementById("Popup_Detail");
    var oTitle = get.byClass("CeShiTwo", oDrag)[0];
    ShoDuiTangKang(oDrag, oTitle);
    oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 - 10 + "px";
    oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 - 50 + "px";
}
/************************************************ 彭-调用弹出框显示事故处理详情页面-End **************************************************/
//复选框操作事件
var FireGrade = new Array("0,20,21,22,23");//初始化数组
$(document).ready(function () {
    var selectInputsed = document.getElementsByClassName('checkOne'); //根据获取到的类名查询操作
    $(".check-alled").click(function () {//点选全部
        if (this.checked) {//全部选中          
            for (var i = 0; i < selectInputsed.length; i++) {
                selectInputsed[i].checked = true;
            }
        }
        else {//取消全部选中
            $("#Operate_second_checkbox input").removeAttr("checked");
        }
    })
    $("#Operate_second_checkbox input").click(function (e) {//单选一个
        var all = $("#Operate_second_checkbox input").length;
        for (var i = 1; i < $("#Operate_second_checkbox input").length; i++) {
            if (!$("#Operate_second_checkbox input")[i].checked) {//只要是有一个没勾选，就取消勾选“全选”
                $(".check-alled").removeAttr("checked");
                break;
            }
            else {
                if (all == i + 1) {//判断循环每点击一次勾选一个复选框
                    for (var i = 0; i < selectInputsed.length; i++) {
                        selectInputsed[i].checked = true;
                    }
                }
            }
        }
        if (this.checked || !this.checked) {
            FireGrade = "";//清空接收数组
            FireGrade = new Array();//创建接收数组
            for (var i = 0; i < selectInputsed.length; i++) {
                if (selectInputsed[i].checked == true) {
                    FireGrade.push(selectInputsed[i].defaultValue);//数组接收勾选的信息
                }
            }
        }
        //if (SmX.length <= 0) {
        //    SmX = new Array("");
        //}
        //if (SmY.length <= 0) {
        //    SmY = new Array("");
        //}
        var strBianHao = $("#One").val();//获取事故编号
        var strName = $("#o").val();//获取事发单位名称
        var beginTime = $("#Begin_datetime").html();//获取开始时间
        var endTime = $("#End_datetime").html();//获取结束时间
        if (SmX[0] == "" && SmY[0] == "" && FireGrade.length <= 0 && beginTime == "" && endTime == "" && strBianHao == "" && strName == "") {
            closeFireInformation();//重置按钮
        }
        else {
            showFireInformation(0);//查询按钮
        }
    })
});
/*---------------------------------------------------------彭-历史查询模块 End-------------------------------------------------------------*/
//统计图
function StatisticsChart() {
    $.getJSON("/index/StatisticsChart", function (data) {
        var ChangSuoZongShu = 0;//记录最大值
        var nowDate = new Date();//获取现在时间
        var nowYear = nowDate.getFullYear();//获得现在的年份
        //设置统计图的横坐标：最大坐标是今年，最小是前2年
        $(".YearBeforeLast").text((nowYear - 2) + "年");
        $(".YearLast").text((nowYear - 1) + "年");
        $(".YearNow").text(nowYear + "年");
        //遍历前2年到今年的数据
        for (var i = 0; i < data.length; i++) {
            if (data[i].year == nowYear || data[i].year == (nowYear - 1) || data[i].year == (nowYear - 2)) {
                if (ChangSuoZongShu < Math.max(data[i].ordinary, data[i].larger, data[i].grave, data[i].particularly)) {
                    ChangSuoZongShu = Math.max(data[i].ordinary, data[i].larger, data[i].grave, data[i].particularly);
                }
            }
        }
        var ChangSuoZongShuLength = ChangSuoZongShu.toString().length;//获取最大值的位数
        var minlength = ChangSuoZongShuLength > 2 ? Math.pow(10, parseInt(ChangSuoZongShuLength) - 2) : 10;
        ChangSuoZongShu = Math.ceil(ChangSuoZongShu / minlength) * minlength;
        var pingjunzhi = ChangSuoZongShu / 5;
        $("#MaximalValue").text(ChangSuoZongShu);
        $("#NumericalValue_first").text(Math.floor(pingjunzhi * 4));//Math.floor(num)向下取整
        $("#NumericalValue_second").text(Math.floor(pingjunzhi * 3));
        $("#NumericalValue_third").text(Math.floor(pingjunzhi * 2));
        $("#LeastValue").text(Math.floor(pingjunzhi));
        $(".leixingdivOne div div").mousemove(function (e) {
            $("#contentw").remove();
            var left = $(this).offset().left;
            var titleheight = $(".leftOperate_title").height();
            var height = $(this).height();
            var contentHTML = "<div id='contentw' style='padding: 2px; color: #000; background-color: #d1eeee;position:absolute;left:" + (left - 12) + "px;top:" + (titleheight + 150 - height) + "px;z-index:99999;'><strong style='color:red;'>" + $(this).attr("zhi") + "</strong>(起)</div>";
            $(contentHTML).insertBefore($("#leixingdiv1"));
        });
        $(".leixingdivOne div div").mouseout(function () {
            $("#contentw").remove();
        })
        for (var i = 0; i < data.length; i++) {
            if (data[i].year == (nowYear - 2)) {//2年前
                $("#InformationOne").css("height", parseInt(data[i].ordinary / ChangSuoZongShu * 180) + "px");
                $("#InformationTwo").css("height", parseInt(data[i].larger / ChangSuoZongShu * 180) + "px");
                $("#InformationThree").css("height", parseInt(data[i].grave / ChangSuoZongShu * 180) + "px");
                $("#InformationFour").css("height", parseInt(data[i].particularly / ChangSuoZongShu * 180) + "px");
                $("#InformationOne").attr("zhi", data[i].ordinary);
                $("#InformationTwo").attr("zhi", data[i].larger);
                $("#InformationThree").attr("zhi", data[i].grave);
                $("#InformationFour").attr("zhi", data[i].particularly);
            }
            else if (data[i].year == (nowYear - 1)) {//1年前
                $("#InformationFive").css("height", parseInt(data[i].ordinary / ChangSuoZongShu * 180) + "px");
                $("#InformationSix").css("height", parseInt(data[i].larger / ChangSuoZongShu * 180) + "px");
                $("#InformationSever").css("height", parseInt(data[i].grave / ChangSuoZongShu * 180) + "px");
                $("#InformationEight").css("height", parseInt(data[i].particularly / ChangSuoZongShu * 180) + "px");
                $("#InformationFive").attr("zhi", data[i].ordinary);
                $("#InformationSix").attr("zhi", data[i].larger);
                $("#InformationSever").attr("zhi", data[i].grave);
                $("#InformationEight").attr("zhi", data[i].particularly);
            }
            else if (data[i].year == nowYear) {//今年
                $("#InformationNine").css("height", parseInt(data[i].ordinary / ChangSuoZongShu * 180) + "px");
                $("#InformationTen").css("height", parseInt(data[i].larger / ChangSuoZongShu * 180) + "px");
                $("#InformationEleven").css("height", parseInt(data[i].grave / ChangSuoZongShu * 180) + "px");
                $("#InformationTwelve").css("height", parseInt(data[i].particularly / ChangSuoZongShu * 180) + "px");
                $("#InformationNine").attr("zhi", data[i].ordinary);
                $("#InformationTen").attr("zhi", data[i].larger);
                $("#InformationEleven").attr("zhi", data[i].grave);
                $("#InformationTwelve").attr("zhi", data[i].particularly);
            }
        }
    })
}
//统计图的table
function StatisticsTable() {
    $("#Count_tableed tbody tr").remove();
    $.getJSON("/index/StatisticsTable", function (data) {
        var woundeds;
        var dies;
        var damages;
        var nowDate = new Date();//获取现在时间
        var nowYear = nowDate.getFullYear();//获得现在的年份
        for (var i = 0; i < data.length; i++) {
            woundeds = 0;
            dies = 0;
            damages = 0;
            if (data[i].year == nowYear || data[i].year == (nowYear - 1) || data[i].year == (nowYear - 2)) {
                for (var w = 0; w < data[i].wounded.length; w++) {
                    woundeds += zhuanghua(data[i].wounded[w].NumberOfCasualties);
                    dies += zhuanghua(data[i].die[w].DeathToll);
                    damages += zhuanghua(data[i].damage[w].EconomicLoss);
                }
                var tbody = $("#Count_tableed tbody");
                var tr = "<tr><td>" + data[i].year + "</td><td>" + woundeds + "</td><td>" + dies + "</td><td>" + damages + "</td></tr>";
                tbody.append(tr);
            }
        }
    })
}
function zhuanghua(strings) {
    strings = strings.replace(/[,]+/g, "");
    if (strings.toString() != "") {
        return parseInt(strings);
    }
    else {
        return 0;
    }
}
$(function () {
    var start = {
        max: laydate.now(),
        istoday: false,
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        choose: function (datas) {
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas //将结束日的初始值设定为开始日
        }
    };

    var end = {
        max: laydate.now(),
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss',
        choose: function (datas) {
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    $("#Begin_datetime").click(function () {
        if ($("#End_datetime").html() != "") {
            start.max = $("#End_datetime").html();
        }
        else {
            start.max = laydate.now();
        }
        laydate(start);

    });
    $("#End_datetime").click(function () {
        if ($("#Begin_datetime").html() == "") {
            end.min = null;
        }
        else {
            end.min = $("#Begin_datetime").html();
        }
        laydate(end);
    });
    var nearlyTime = function NearlyTime(delivery) {
        var data = new Date();//获取现在的时间
        var nearlyDate;
        if (data.getMonth() + 1 > delivery) {
            var newMonth = nowDate(data.getMonth() + 1 - delivery);
            var newDay = nowDate(data.getDate());
            nearlyDate = data.getFullYear() + "-" + newMonth + "-" + newDay + " 00:00:00";
        }
        else {
            var newYear = parseInt((delivery - data.getMonth() - 1) / 12) + 1;
            var newMonth = nowDate(newYear * 12 + data.getMonth() + 1 - delivery);
            var newDay = nowDate(data.getDate());
            nearlyDate = (data.getFullYear() - newYear) + "-" + newMonth + "-" + newDay + " 00:00:00";
        }
        $("#Begin_datetime").html(nearlyDate);
        $("#End_datetime").html(data.getFullYear() + "-" + nowDate(data.getMonth() + 1) + "-" + nowDate(data.getDate()) + " " + nowDate(data.getHours()) + ":" + nowDate(data.getMinutes()) + ":" + nowDate(data.getSeconds()));
    }
    var nowDate = function (time) {
        return time < 10 ? "0" + time : time;
    }
    $(".HistoryTime_div input").click(function () {
        nearlyTime($(this).attr("delivery"));
    });
})
//详情页面代码
function DetailsFire(intClosedID) {
    zhankaifou = false;
    zhankai();//点击详情控制查看图片按钮
    $.getJSON("/index/FireDetails?AlarmID=" + intClosedID, function (data) {
        if (data.length > 0) {
            $("#incidentUnit").text(data[0].IncidentUnit);
            $("#alarmNumber").text(data[0].AlarmNumber);
            var datetime = new Date(parseInt(data[0].TimeOfTheIncident.substr(6)));
            $("#timeOfTheIncident").text(datetime.getFullYear() + "年" + (datetime.getMonth() + 1) + "月" + datetime.getDate() + "日" + datetime.getHours() + "时" + datetime.getMinutes() + "分" + datetime.getSeconds() + "秒");
            $("#addressOfTheCrime").text(data[0].AddressOfTheCrime);
            $("#propertyDetailMC").text(data[0].PropertyDetailMC);
            $("#personnelMC").text(data[0].PersonnelMC);
            $("#numberOfCasualties").text(data[0].NumberOfCasualties);
            $("#deathToll").text(data[0].DeathToll);
            $("#economicLoss").text(data[0].EconomicLoss);
            $("#fireSite").text(data[0].FireSite);
            $("#DeploymentMan").text(data[0].PersonnelMC);
            $("#TheNumberOfPolice").text(data[0].TheNumberOfPolice);
            var datetimel = new Date(parseInt(data[0].EndOfProcessingTime.substr(6)));
            $("#TerminalTime").text(datetimel.getFullYear() + "年" + (datetimel.getMonth() + 1) + "月" + datetimel.getDate() + "日" + datetimel.getHours() + "时" + datetimel.getMinutes() + "分" + datetimel.getSeconds() + "秒");
            $("#burningArea").text(data[0].BurningArea + "平方米");
            var picture = "";
            for (p = 0; p < data.length; p++) {
                picture += "<img src='" + data[p].PicturePath + "'/>";
            }
            document.getElementById("huozai_img").innerHTML = picture;
        }

    })
}