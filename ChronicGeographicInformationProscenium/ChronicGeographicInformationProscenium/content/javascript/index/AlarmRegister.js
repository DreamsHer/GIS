//================================================警情点==============================================
function nowShow2() {
    var realwarning = document.getElementsByClassName('realWarning');
    realwarning[0].style.bottom = '20px';
    realwarning[0].style.right = '2px';
    var LZReaShow = document.getElementById('LZReaShow');
    LZReaShow.style.display = "none";

}
function closeNow() {
    var realwarning = document.getElementsByClassName('realWarning');
    realwarning[0].style.bottom = '-335px';
    var LZReaShow = document.getElementById('LZReaShow');
    LZReaShow.style.display = "block";
}

//点击右侧巡逻计划的单元格定位到巡逻计划
function locationMilitaryPatrol(t) {
    var xx = $(t).attr('xx');
    var yy = $(t).attr('yy');
    var id = $(t).attr('id');
    map.setCenter(new SuperMap.LonLat(xx, yy), 1);//最大放大倍数是15
    map.removeAllPopup();//移除其他消息框
    for (var i = 0; i < alarmMarkerLayeraa.markers.length; i++) {
        if (alarmMarkerLayeraa.markers[i].AlarmID == id) {
            alarmMarkerLayeraa.markers[i].bool = true;//改变状态
            openInfoWinPoliceIntelligence(alarmMarkerLayeraa.markers[i]);//调用方法打开
            break;
        }
    }
    $('#realWarning_table tr').css('background-color', '#fff');
    $(t).css('background-color', 'rgba(132, 255, 227, 0.41)');

}

//查询地址
var GYAddressOfTheCrime, GYReportTime, GYAlarmDescribe, GYAlarmSourceTypeMC, GYAlarmSourceTypeID, GYAlarmTypeMC, GYFireResistanceGradeMC, strAddress_T, GYAlarmID, GYAlarmStateID, GYAlarmNumber1, GYXCoordinate, GYYCoordinate, GYboolOpen, GYEndOfProcessingTime, GYFireGradeMC, GYAddressDescribe;
function selectAddress_Y(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, boolOpen, EndOfProcessingTime, FireGradeMC, AddressDescribe) {

    GYAlarmStateID = AlarmStateID;
    GYReportTime = ReportTime;
    GYAlarmDescribe = AlarmDescribe;
    GYAlarmSourceTypeMC = AlarmSourceTypeMC;
    GYAlarmSourceTypeID = AlarmSourceTypeID;
    GYAlarmTypeMC = AlarmTypeMC;
    GYFireResistanceGradeMC = FireResistanceGradeMC,
    GYAddressOfTheCrime = AddressOfTheCrime;
    GYAlarmID = AlarmID;
    GYAlarmStateID = AlarmStateID;
    GYAlarmNumber1 = AlarmNumber1;
    GYXCoordinate = XCoordinate;
    GYYCoordinate = YCoordinate;
    GYboolOpen = boolOpen;
    GYEndOfProcessingTime = EndOfProcessingTime;
    GYFireGradeMC = FireGradeMC;
    GYAddressDescribe = AddressDescribe;

    strAddress_T = AlarmTitle;

    if (strAddress_T != "") {
        var queryParams = [], queryBySQLParams, queryBySQLService;
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P01政府机构_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P02机场_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P03火车站地铁站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P04汽车站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P05公交车站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P07停车场_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P08高速服务区_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P09收费站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P10金融服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P11商业大厦_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P12零售行业_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P13宾馆酒店_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P14休闲娱乐_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P15医疗服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P16科研教育_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P17公司企业_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P18公园广场_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P19住宅小区_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%'  or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P20综合信息_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P21餐饮服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P22汽车服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P23省市区县政府_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P24风景名胜_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P25电讯服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P26公共厕所_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P27港口码头_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "村庄_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "区县_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "乡镇_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "地级市_point_1@ShenZhenNanShan_Data#2", attributeFilter: "NAME like '%" + strAddress_T + "%' or ADDRESS like '%" + strAddress_T + "%'" }));

        //SQL 查询参数类。 该类用于设置 SQL 查询的相关参数。
        queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
            expectCount: 99999,
            queryParams: queryParams//查询过滤条件参数数组
        });

        //SQL 查询服务类。 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
        queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {//url 服务的访问地址
            eventListeners: {
                "processCompleted": completedAddress_Y,
                "processFailed": processFailed_T
            }
        });

        queryBySQLService.processAsync(queryBySQLParams);
    }
}
//查询成功
function completedAddress_Y(queryEventArgs) {
    var i, j, z = 0, result = queryEventArgs.result;
    var count = 0;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    var feature = result.recordsets[i].features[j];
                    if (feature.data.NAME != "" && feature.data.NAME == strAddress_T) {
                        var x = feature.geometry.x,
                            y = feature.geometry.y;
                        if (x != "" && y != "") {
                            count++;
                            $.getJSON('/index/UpdateAlarem', { AlarmID: GYAlarmID, x: x, y: y }, function (data) {
                                if (data == 1) {
                                    $('#realWarning_table tbody').append("<tr xx=" + x + " yy=" + y + " id=" + GYAlarmID + " onclick='locationMilitaryPatrol(this)'><td>" + GYAddressOfTheCrime + "</td><td>" + GYAlarmDescribe + "</td></tr>");
                                    nowShow2();
                                    if (nowSelectAlarm.AlarmStateID != 9) {
                                        addEnterpriseMarker(GYAddressOfTheCrime, GYReportTime, GYAlarmDescribe, GYAlarmSourceTypeMC, GYAlarmSourceTypeID, GYAlarmTypeMC, GYFireResistanceGradeMC, strAddress_T, GYAlarmID, GYAlarmStateID, GYAlarmNumber1, x, y, true, GYEndOfProcessingTime, GYFireGradeMC, GYAddressDescribe);
                                    } else {
                                        addEnterpriseMarker(GYAddressOfTheCrime, GYReportTime, GYAlarmDescribe, GYAlarmSourceTypeMC, GYAlarmSourceTypeID, GYAlarmTypeMC, GYFireResistanceGradeMC, strAddress_T, GYAlarmID, GYAlarmStateID, GYAlarmNumber1, x, y, false, GYEndOfProcessingTime, GYFireGradeMC, GYAddressDescribe);
                                    }

                                    sendNoticeInfo(GYAlarmID, x, y);//发送通知信息
                                }
                            });
                            break;
                        }
                    }
                }
                if (count > 0) {
                    break;
                }
            }
        }
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>警情点>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>搜索警点>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
var fireMarker_T,
    fireX_T,//报警点x
    fireY_T,//报警点y
    data_T,//地址数据，数组
    index_T,//地址数据，索引
    xyna_T = [];//选点数据
//弹窗上下
var bolupdown_T = true;
function updown_T() {
    if (bolupdown_T) {
        $('#content_T').hide();
        $('#updown_T').css("background-image", "url(/content/images/bigwin.png)");
        bolupdown_T = false;
    } else {
        $('#content_T').show();
        $('#updown_T').css("background-image", "url(/content/images/small.png)");
        bolupdown_T = true;
    }
}
//拖拽
function dragAndDrop_T() {

    $('#search_T').css("top", '56px');//设置周边分析查询面版初始化位置 
    $('#search_T').css("left", '1022px');
    var ifmove = false;//判断是否移动
    var x1, y1;//鼠标离控件左上角的相对位置
    $("#title_T").mousedown(function (e) {
        ifmove = true;
        x1 = e.pageX - parseInt($("#search_T").css("left"));
        y1 = e.pageY - parseInt($("#search_T").css("top"));
        $("#title_T").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (ifmove) {
            var x = e.pageX - x1;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - y1;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#search_T").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#search_T").css("height"));
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
            $("#search_T").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        ifmove = false;
        $("#title_T").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}
//创建搜索警点弹窗
function showDialog_T(marker) {//显示搜索警点弹窗
    $("#search_T").show();
    updown_T();
    fireX_T = marker.lonlat.lon, fireY_T = marker.lonlat.lat;//报警点x，y，全局化

    $("#dictate_T").html("<strong>口述：</strong>" + marker.AddressDescribe);//口述
    $("#address_T").val(marker.AddressOfTheCrime);//地址

    fireMarker_T = marker;
}
function onClickEnsure_T() {
    var x = $("input:radio[name='fireRadios']:checked").attr("SmX"),
    y = $("input:radio[name='fireRadios']:checked").attr("SmY"),
    id = $("input:radio[name='fireRadios']:checked").attr("id"),
    name = $("label[for='" + id + "']").text(),
    address = $("label[for='" + id + "']").parent().text().substr(name.length);
    if (x != "" && y != "" && name != "" && address != "") {//即为查询数据
        ok_T(fireMarker_T, x, y, address);
    } else {
        $("#prompt_T").modal('show');
    }
}
//模板确定
function modalOk_T() {
    $('#prompt_T').modal('hide');
    if (xyna_T.length == 4) {//即为选点数据
        ok_T(fireMarker_T, xyna_T[0], xyna_T[1], xyna_T[3]);
    } else {//即为报警数据
        ok_T(fireMarker_T, fireX_T, fireY_T, fireMarker_T.AddressOfTheCrime);
    }
    closeDialog_T();
}
//提交控制台
function ok_T(marker, x, y, address) {
    $.getJSON('/index/updateAlarm_T', { AlarmID: marker.AlarmID, x: x, y: y, address: address }, function (data) {
        if (data == 1) {
            closeInfoWinPoliceIntelligence();//关闭标记弹窗提示
            alarmMarkerLayeraa.removeMarker(marker);//移除选中警灯标记
            blueLayer_T.clearMarkers();//清空二次定位标记
            $("#realWarning_table tr[id=" + marker.AlarmID + "]").remove();//移除指定行

            //添加未出警
            addEnterpriseMarker(address, marker.ReportTime, marker.AlarmDescribe, marker.AlarmSourceTypeMC, marker.AlarmSourceTypeID, marker.AlarmTypeMC, marker.FireResistanceGradeMC, marker.AlarmTitle, marker.AlarmID, 10, marker.AlarmNumber1, x, y, true, marker.EndOfProcessingTime, marker.FireGradeMC, marker.AddressDescribe);

            //console.log($("#realWarning_table tr").length)
            if ($("#realWarning_table tr").length == 1) {
                closeNow();//关闭警情表格
            }

            document.getElementById('alarmPointPink').checked = true;//选中未处理
            alarmPointPink(1);//显示未处理
        } else {
            alert('确定失败！');
        }
    });
}
//关闭搜索警点弹窗
function closeDialog_T() {
    $('#search_T').hide();
}
//查询地址
function selectAddress_T() {
    vectorPoint_T.removeAllFeatures();//清除当前图层所有的要素。
    drawPoint_T.deactivate();//注销控件

    var strAddress_T = document.getElementById("address_T").value;//获取输入框地址名称
    if (strAddress_T != "") {
        var queryParams = [], queryBySQLParams, queryBySQLService;
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P01政府机构_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P02机场_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P03火车站地铁站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P04汽车站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P05公交车站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P07停车场_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P08高速服务区_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P09收费站_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P10金融服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P11商业大厦_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P12零售行业_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P13宾馆酒店_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P14休闲娱乐_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P15医疗服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P16科研教育_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P17公司企业_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P18公园广场_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P19住宅小区_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P20综合信息_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P21餐饮服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P22汽车服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P23省市区县政府_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P24风景名胜_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P27港口码头_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P26公共厕所_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        queryParams.push(new SuperMap.REST.FilterParameter({ name: "P25电讯服务_point_1@ShenZhenNanShan_Data#2", attributeFilter: "ltrim(rtrim(NAME)) like '%" + strAddress_T + "%' or ltrim(rtrim(ADDRESS)) like '%" + strAddress_T + "%'" }));
        //queryParams.push(new SuperMap.REST.FilterParameter({ name: "消防站点@ShenZhenNanShan_Data", attributeFilter: "ltrim(rtrim(Name)) like '%" + strAddress_T + "%' or ltrim(rtrim(address)) like '%" + strAddress_T + "%'" }));

        //SQL 查询参数类。 该类用于设置 SQL 查询的相关参数。
        queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
            expectCount: 99999,
            queryParams: queryParams//查询过滤条件参数数组
        });

        //SQL 查询服务类。 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
        queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {//url 服务的访问地址
            eventListeners: {
                "processCompleted": completedAddress_T,
                "processFailed": processFailed_T
            }
        });

        queryBySQLService.processAsync(queryBySQLParams);
    }
}
//失败  
function processFailed_T(e) {
    $("#loadMap").hide();//隐藏加载界面

    //清空table表格除首行外的所有数据
    $("#selectAddress_T tr:not(:first)").html("");
    data_T = [];//清空记录地址数据的数组
    index_T = 0;//还原地址数据的索引
    alert(e.error.errorMsg);//弹窗显示失败原因
}
//查询成功
function completedAddress_T(queryEventArgs) {
    data_T = [];//清空记录地址数据的数组
    index_T = 0;//还原地址数据的索引
    var i, j, result = queryEventArgs.result, z = 0;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    var feature = result.recordsets[i].features[j];
                    
                    if (feature.data.NAME != "" && feature.data.ADDRESS != "") {
                        data_T[z] = new Array();
                        data_T[z][0] = feature.data.SmX;
                        data_T[z][1] = feature.data.SmY;
                        data_T[z][2] = feature.data.NAME;
                        data_T[z][3] = feature.data.ADDRESS;
                        data_T[z][4] = judgeN_T(fireX_T, feature.data.SmX, true) + judgeN_T(fireY_T, feature.data.SmY, false);
                        z++;

                        findPath_T(feature.geometry);//分析
                    }
                }
            }
        }
        if (data_T.length == 0) {
            alert('暂无该地址！');
        }
    }
}
//判断方位
function judgeN_T(a, b, bol) {
    //console.log(a - b);
    if (bol) {
        if (a - b > 0) {
            return "西";
        } else if (a - b < 0) {
            return "东";
        } else {
            return "正";
        }
    } else {
        if (a - b > 0) {
            return "南";
        } else if (a - b < 0) {
            return "北";
        } else {
            return "正";
        }
    }
}
//最佳路径分析
function findPath_T(selectPoint) {
    var firePoint = new SuperMap.Geometry.Point(fireX_T, fireY_T),//创建报警点
        pointArray = [];//点组
    pointArray.push(firePoint);//报警点
    pointArray.push(selectPoint);//查询点

    var findPathService,//最佳路径分析服务类
        parameter,//最佳路径分析参数类
        analystParameter,//交通网络分析通用参数
        resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({//交通网络分析结果参数类
            returnEdgeFeatures: false,//是否在分析结果中包含弧段要素集合。弧段要素包括弧段的空间信息和属性信息。
            returnEdgeGeometry: false,//返回的弧段要素集合中是否包含几何对象信息。默认为 false。
            returnEdgeIDs: false,//返回结果中是否包含经过弧段 ID 集合。默认为 false。
            returnNodeFeatures: false,//是否在分析结果中包含结点要素集合。 
            returnNodeGeometry: false,//返回的结点要素集合中是否包含几何对象信息。默认为 false。
            returnNodeIDs: false,// 返回结果中是否包含经过结点 ID 集合。默认为 false。
            returnPathGuides: false,// 返回分析结果中是否包含行驶导引集合。
            returnRoutes: true//返回分析结果中是否包含路由对象的集合。
        });
    analystParameter = new SuperMap.REST.TransportationAnalystParameter({
        resultSetting: resultSetting,//分析结果返回内容
        weightFieldName: "SmLength"//,阻力字段的名称，标识了进行网络分析时所使用的阻力字段，例如表示时间、长度等的字段都可以用作阻力字段。 该字段默值为服务器发布的所有耗费字段的第一个字段。
        //turnWeightField: 'TurnCost'//  转向权重字段名称:  TurnCost
    });
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,//是否通过节点 ID 指定路径分析的结点
        nodes: pointArray,//分析点组
        hasLeastEdgeCount: false,//是否按照弧段数最少的进行最佳路径分析
        parameter: analystParameter//交通网络分析通用参数
    });

    findPathService = new SuperMap.REST.FindPathService(urlNetwork, {
        eventListeners: {
            "processCompleted": pathCompleted_T,
            "processFailed": processFailed_T
        }
    });
    findPathService.processAsync(parameter);//提交服务
}
//分析成功
function pathCompleted_T(findPathEventArgs) {
    data_T[index_T][5] = Math.round(findPathEventArgs.result.pathList[0].weight);
    index_T++;
    if (data_T.length == index_T) {
        endData_T();
    }
}
//绑定地址数据
function endData_T() {
    $("#selectAddress_T tr:not(:first)").html("");//清空selectAddress_T表格除首行外的所有数据
    data_T.sort(function (x, y) { return x[5] - y[5] });
    for (var i = 0; i < data_T.length; i++) {
        $("#selectAddress_T").append('<tr><td><div class="radio"><label><input type="radio" name="fireRadios" id="fireRadios' + i + '" SmX="' + data_T[i][0] + '" SmY="' + data_T[i][1] + '"></label></div></td><td><label for="fireRadios' + i + '">' + data_T[i][2] + '</label><br>' + data_T[i][3] + '<td>' + data_T[i][4] + '</td></td><td>' + data_T[i][5] + '米</td></tr>');
    }

    //radio注册change更改事件
    $("input:radio[name='fireRadios']").change(function () {
        var x = $(this).attr("SmX"),
            y = $(this).attr("SmY"),
            id = $(this).attr("id");
        if (x != "" && y != "" && id != "") {
            blueLayer_T.clearMarkers();//清空二次定位标记
            var size = new SuperMap.Size(20, 20),
                offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                icon = new SuperMap.Icon("/SuperMap/images/maker_L _Red.png", size, offset),
                blueMarker = new SuperMap.Marker(new SuperMap.LonLat(x, y), icon);
            blueMarker.name = $("label[for='" + id + "']").text(),
            blueMarker.address = $("label[for='" + id + "']").parent().text().substr(name.length);
            blueMarker.events.on({
                "click": openInfoWin_T,
                "touchstart": openInfoWin_T,        //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
                "scope": blueMarker
            });
            blueLayer_T.addMarker(blueMarker);//添加二次定位标记
            openInfoWin_T(blueMarker, true);//打开对应弹窗


        }
    });
}

var infowin_T = null;
//打开标记弹窗
function openInfoWin_T(blueMarker, bol) {
    closeInfoWin_T();
    var marker;
    if (bol) {
        marker = blueMarker;
    } else {
        marker = this;
    }

    var lonlat = marker.getLonLat();
    var contentHTML = "<div class='popwin_titleDiv'><span class='popwin_title'>地址</span></div>" +
            "<div style='font-size:15px;color:#222;word-break: break-all;margin:0px auto;padding-left: 5px;'><div style='text-align:center;'><strong>" + marker.name + '</strong><br>' + marker.address + "</div>";
    var size = new SuperMap.Size(20, 20);
    var offset = new SuperMap.Pixel(-size.w, -(size.h - 8));
    var icon = new SuperMap.Icon("/SuperMap/images/maker_L _Red.png", size, offset);
    var popup = new SuperMap.Popup.FramedCloud("popwin_add",
            new SuperMap.LonLat(lonlat.lon, lonlat.lat),
            null,
            contentHTML,
            icon,
            true);

    infowin_T = popup;
    map.addPopup(popup);
}
//关闭标记弹窗
function closeInfoWin_T() {
    if (infowin_T) {
        try {
            infowin_T.hide();
            infowin_T.destroy();
        }
        catch (e) { }
    }
}

//画点
function onClickPoint_T() {
    //清空table表格除首行外的所有数据
    $("#selectAddress_T tr:not(:first)").html("");
    bolSelect_T = true;
    vectorPoint_T.removeAllFeatures();//清除当前图层所有的要素。
    drawPoint_T.activate();//激活控件

}
//画点回调
function featureadded_T(drawGeometryArgs) {
    $("#loadMap").show();//显示加载界面
    drawPoint_T.deactivate();//注销控件

    var geometry = drawGeometryArgs.feature.geometry;//获取几何对象
    geometryCase = geometry;
    var queryParam, queryByGeometryParameters, queryService;//查询参数
    var point1 = new SuperMap.Geometry.Point(geometry.x, geometry.y);

    //查询过滤条件参数类。
    queryParam = new SuperMap.REST.FilterParameter({
        name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
        //fields: ["SmID"]//设置返回的字段
        attributeFilter: "far_Dat=0"//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
    });
    // Geometry 查询参数类  几何查询类
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        queryParams: [queryParam],//查询条件
        geometry: point1, //drawGeometryArgs.feature.geometry,//查询的几何对象
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT//查询的模式 intersect:相交，交叉
    })

    //Geometry 查询服务类。
    queryService = new SuperMap.REST.QueryByGeometryService(url,//查询的服务地址
        {
            eventListeners: {
                "processCompleted": streetCompleted_T,//成功
                "processFailed": processFailed_T//失败
            }
        });
    queryService.processAsync(queryByGeometryParameters);//向服务端传递参数，然后服务端返回对象
}
function streetCompleted_T(queryEventArgs) {
    var i, j, SmID, result = queryEventArgs.result;
    if (result.recordsets.length > 0) {
        for (i = 0; i < result.recordsets.length; i++) {
            for (j = 0; j < result.recordsets[i].features.length; j++) {
                var feature = result.recordsets[i].features[j];//获取结果对象的矢量
                var geometry = feature.geometry;//获取几何对象
                if (geometry.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME) {//判断返回的数据是不是这个数据

                } else {
                    SmID = feature.data.SmID;//获取结果对象的矢量
                }
            }
        }
        if (SmID > 0) {//判断是不是有警务网格ID
            var queryParams = [], queryByGeometryParameters, queryService;//查询参数
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P01政府机构_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P02机场_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P03火车站地铁站_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P04汽车站_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P05公交车站_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P07停车场_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P08高速服务区_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P09收费站_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P10金融服务_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P11商业大厦_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P12零售行业_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P13宾馆酒店_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P14休闲娱乐_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P15医疗服务_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P16科研教育_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P17公司企业_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P18公园广场_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P19住宅小区_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P20综合信息_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P21餐饮服务_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P22汽车服务_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P23省市区县政府_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P24风景名胜_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P27港口码头_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P26公共厕所_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));
            queryParams.push(new SuperMap.REST.FilterParameter({ name: "P25电讯服务_point_1", attributeFilter: "ltrim(rtrim(ADDRESS))!=''" }));

            //Distance 查询参数类
            var queryByDistanceParams = new SuperMap.REST.QueryByDistanceParameters({
                queryParams: queryParams,
                returnContent: true, //true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI
                distance: 1,//查询距离，默认为0，单位与所查询图层对应的数据集单位相同
                expectCount: 5,//期望返回结果记录个数
                isNearest: true,//是否为最近距离查询。
                geometry: geometryCase //用于查询的几何对象。
            });

            var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(url);
            queryByDistanceService.events.on({
                "processCompleted": placeCompleted_T,
                "processFailed": processFailed_T
            });
            queryByDistanceService.processAsync(queryByDistanceParams);
        } else {
            $("#loadMap").hide();//隐藏加载界面
            vectorPoint_T.removeAllFeatures();//清除当前图层所有的要素。
            alert('选择位置不在管辖区域内！');
        }
    }
}
function placeCompleted_T(queryEventArgs) {
    var i, j, result = queryEventArgs.result;
    if (result && result.recordsets) {
        if (recordsets[0].features) {
            var feature = result.recordsets[0].features[0];//获取结果对象的矢量
            var geometry = feature.geometry;//获取几何对象
            if (geometry.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME) {//判断返回的数据是不是这个数据
                xyna_T = [];
                xyna_T.push(geometry.x);
                xyna_T.push(geometry.y);
                xyna_T.push(feature.data.NAME);//获取返回数据中的ADDRESS值（名称）
                xyna_T.push(feature.data.ADDRESS); //获取返回数据中的ADDRESS值（地址）
                //console.log(xyna_T[0] + "," + xyna_T[1] + "," + xyna_T[2] + "," + xyna_T[3]);

                if (xyna_T.length == 4) {
                    vectorPoint_T.removeAllFeatures();//清除当前图层所有的要素。
                    blueLayer_T.clearMarkers();//清空二次定位标记
                    var size = new SuperMap.Size(20, 20),
                        offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                        icon = new SuperMap.Icon("/SuperMap/images/maker_L _Red.png", size, offset),
                        blueMarker = new SuperMap.Marker(new SuperMap.LonLat(xyna_T[0], xyna_T[1]), icon);
                    blueMarker.name = xyna_T[2];
                    blueMarker.address = xyna_T[3];
                    blueMarker.events.on({
                        "click": openInfoWin_T,
                        "touchstart": openInfoWin_T,        //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
                        "scope": blueMarker
                    });
                    blueLayer_T.addMarker(blueMarker);//添加二次定位标记
                    openInfoWin_T(blueMarker, true);//打开对应弹窗
                    map.setCenter(new SuperMap.LonLat(xyna_T[0], xyna_T[1]));
                } else {
                    xyna_T = [];
                    vectorPoint_T.removeAllFeatures();//清除当前图层所有的要素。
                    alert('选择位置失败！请手动查询。');
                }
                map.setCenter(new SuperMap.LonLat(geometry.x, geometry.y), 5);
                $("#loadMap").hide();//隐藏加载界面
                bolSelect_T = false;
            }
        }
    }
}
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/