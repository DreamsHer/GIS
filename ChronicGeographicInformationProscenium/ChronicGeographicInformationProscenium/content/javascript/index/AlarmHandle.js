//------------------出警js Begin ZJDM --------------------
//出警左侧详细弹出
function issleftDelShow(t) {
    //左往右移
    var tr = t.parentNode;
    var GISID = tr.getAttribute("myGISID");
    var Point = tr.getAttribute("Point");

    if (Point != null) {
        var pointstr = Point.split(',');
        var CurX = parseFloat(pointstr[0]);
        var CurY = parseFloat(pointstr[1]);


        map.removeAllPopup();
        CloseZhouBian();//关闭周边分析
        closeDialog_T();//关闭搜索警点弹窗

        if ($("#delIssue").is(":hidden") == true) {
            $('#delIssue')
            .animate({ left: '285px' }, 0, function () {
                $('#delIssue').show();
                $('#HDXChuJingMian').hide();
                $('#HDXdelIssue').hide();
                $('#HDXShouDuiMian').hide();
                $('#HDXShouDui').hide();
            })
            .animate({ left: '0px' }, 1000, function () {
            });
        }
        map.setCenter(new SuperMap.LonLat(CurX, CurY), 4);
        //通过GISID 来得到消防站弹窗！
        setTimeout(function () {
            var LZrsDemoArray1 = LZFireCarPoint.filter(function (value, index, self) {
                return value.GISID == GISID;
            });
            LZrsDemoArray1[0].bool = true;
            OpenZhanDianMessagepopupss1(LZrsDemoArray1[0]);
        }, 500);
    }




}
//出警左侧详细关闭
function outPoliceDelClose() {
    // 右往左移
    $('#delIssue')
        .animate({ left: '0px' }, 0)
        .animate({ left: '285px' }, 1000, function () {
            $('#delIssue').hide();
        });
}
//选择出警--点击确定

//选择出警--点击确定
function OutPlSelectContentAHide() {
    var OutPlSelectContentA = document.getElementById("OutPlSelectContentA");
    OutPlSelectContentA.style.display = "none";
    var OutPlSelectContentB = document.getElementById("OutPlSelectContentB");
    OutPlSelectContentB.style.display = "block";
    var myModalLabelQuickPl = document.getElementById("myModalLabelQuickPl");
    myModalLabelQuickPl.innerHTML = "确认出警";

    $('#OutPolicetableB tbody').html('');

    var OutPolicetableATbody = document.getElementById("OutPolicetableA").getElementsByTagName("tbody")[0];
    var selecttrs = OutPolicetableATbody.getElementsByTagName("tr");
    var OutPolicetableBTbody = document.getElementById("OutPolicetableB").getElementsByTagName("tbody")[0];
    for (var i = 0; i < selecttrs.length; i++) {
        var polisePeople = "";
        var poliseCar = "";
        var policeDet = "";//清空
        var tr = selecttrs[i];//获取tr
        var id = tr.getAttribute("id");//消防站ID
        var GISID = tr.getAttribute("GISID");
        var FireStationName = tr.getElementsByTagName("td")[0].innerText;//获取消防站名称
        var addresName = tr.getElementsByTagName("td")[4].getElementsByTagName("textarea")[0].innerText;//获取消防站任务
        var OutPolicetableATbodyPeople = selecttrs[i].getElementsByTagName("td")[1].getElementsByTagName("div")[0].getElementsByTagName("label");
        for (var j = 0; j < OutPolicetableATbodyPeople.length; j++) {
            var label = OutPolicetableATbodyPeople[j];
            var input = label.getElementsByTagName("input")[0];//获取div的input判断是否选中
            if ($(input).is(':checked') == true) {
                var peopleID = label.getAttribute("id");

                var PeopleName = label.innerText;
                polisePeople += "<div  id='" + peopleID + "' style='width:60px;height:23px;float:left;margin-left:10px;'>" + PeopleName + "</div>";
            }
        }
        var OutPolicetableATbodyCar = selecttrs[i].getElementsByTagName("td")[2].getElementsByTagName("div")[0].getElementsByTagName("label");
        for (var j = 0; j < OutPolicetableATbodyCar.length; j++) {
            var label = OutPolicetableATbodyCar[j];
            var input = label.getElementsByTagName("input")[0];//获取div的input判断是否选中
            if ($(input).is(':checked') == true) {
                var carID = label.getAttribute("id");
                var carName = label.innerText;
                poliseCar += '<div id="' + carID + '" style="width:100%;height:23px;">' + carName + '</div>';
            }
        }
        var OutPolicetableATbodyTools = selecttrs[i].getElementsByTagName("td")[3].getElementsByTagName("div")[0].getElementsByTagName("label");
        for (var j = 0; j < OutPolicetableATbodyTools.length; j++) {
            var label = OutPolicetableATbodyTools[j];
            var input = label.getElementsByTagName("input")[0];//获取div的input判断是否选中
            if ($(input).is(':checked') == true) {
                var toolsID = label.getAttribute("id");
                var toolsName = label.innerText;
                policeDet += '<div id="' + toolsID + '" style="width:100%;height:23px;">' + toolsName + '</div>';
            }
        }
        if (poliseCar == "") {
            poliseCar = "无";
        }
        if (policeDet == "") {
            policeDet = "无";
        }
        if (polisePeople != "") {
            $('#OutPolicetableB tbody').append('<tr id="' + id + '"  GISID="' + GISID + '"  ><td>' + FireStationName + '</td>' +
                   '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + polisePeople + '</div></td>' +
                   '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + poliseCar + '</div></td>' +
                   '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + policeDet + '</div></td></td>' +
                   '<td style="padding: 2px !important;"><textarea readonly="readonly" style="width:100%;height:100%;">' + addresName + '</textarea></td></tr>');
        }
    }

}

var isshowComePl = false;//判断是否打开选择出警
//打开选择出警
function showComePl() {

    var UserName_a = document.getElementById("UserName_a");
    var startOutPlTimeAPL = document.getElementById("startOutPlTimeAPL");
    startOutPlTimeAPL.innerHTML = "操作人员：" + UserName_a.innerHTML;
    var startOutPlTimeA = document.getElementById("startOutPlTime");
    startOutPlTimeA.innerHTML = "操作时间：" + convertDateS(new Date());


    var OutPlSelectContentA = document.getElementById("OutPlSelectContentA");
    OutPlSelectContentA.style.display = "block";
    var OutPlSelectContentB = document.getElementById("OutPlSelectContentB");
    OutPlSelectContentB.style.display = "none";
    var ZjselectReturn = document.getElementById("ZjselectReturn");
    ZjselectReturn.removeAttribute("data-dismiss");
    isshowComePl = true;
    var addresName = "立刻前往" + LZCurClickMarker.AddressOfTheCrime + "救援";
    $('#OutPolicetableA tbody').html('');
    var CheLiangXinXitableone = document.getElementById("CheLiangXinXitableone");
    var tbody = CheLiangXinXitableone.getElementsByTagName("tbody")[0];
    var trs = tbody.getElementsByTagName("tr");
    var gisID = [];
    for (var q = 0; q < trs.length; q++) {
        var ckb = trs[q].getElementsByTagName("td")[3].getElementsByTagName("input")[0];
        if ($(ckb).is(':checked') == true) {
            var tr = trs[q];
            gisID += tr.getAttribute("myGISID") + ",";
        }
    }
    gisID = gisID.substr(0, gisID.length - 1);
    var addnum = 0;
    $.getJSON("/index/SelectSheBei", { GISPointSet: gisID }, function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var polisePeople = "";
                var poliseCar = "";
                var policeDet = "";
                addnum--;
                if (data[i][2].length > 0) {
                    for (var j = 0; j < data[i][2].length; j++) {
                        addnum--;
                        polisePeople += "<label for='" + addnum + "' id='" + data[i][2][j].ID + "' style='width:60px;height:23px;float:left;margin-left:10px;'><input id='" + addnum + "' type='checkbox'/>" + data[i][2][j].MC + "</label>";
                    }
                } else {
                    polisePeople = "暂无人员";
                }

                if (data[i][3].length > 0) {
                    for (var k = 0; k < data[i][3].length; k++) {
                        addnum--;
                        poliseCar += '<label for="' + addnum + '" id="' + data[i][3][k].ID + '" style="cursor:pointer;width:100%;height:23px;"><input  id="' + addnum + '" type="checkbox" TYPE=' + data[i][3][k].type + '/>' + data[i][3][k].MC + '</label>';
                    }
                }
                else {
                    poliseCar = "暂无车辆";
                }

                if (data[i][4].length > 0) {
                    for (var l = 0; l < data[i][4].length; l++) {
                        addnum--;
                        policeDet += '<label for="' + addnum + '" id="' + data[i][4][l].ID + '" style="cursor:pointer;width:100%;height:23px;"><input  id="' + addnum + '" type="checkbox" TYPE=' + data[i][4][l].type + '/>' + data[i][4][l].MC + '</label>';
                    }
                } else {
                    policeDet = "暂无设备";
                }
                if (polisePeople != "暂无人员") {
                    var LZName;
                    if (data[i][1] != "") {
                        LZName = data[i][1].split(":");

                        $('#OutPolicetableA tbody').append('<tr id="' + data[i][0] + '"   GISID="' + LZName[1] + '"  ><td>' + LZName[0] + '</td>' +
                    '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + polisePeople + '</div></td>' +
                    '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + poliseCar + '</div></td>' +
                    '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + policeDet + '</div></td></td>' +
                    '<td style="padding: 2px !important;"><textarea style="width:100%;height:100%;">' + addresName + '</textarea></td></tr>');
                    }
                }
            }
        }
    });



}

//快速出警
function showQuickComePl() {
    var UserName_a = document.getElementById("UserName_a");
    var startOutPlTimeBPL = document.getElementById("startOutPlTimeBPL");
    startOutPlTimeBPL.innerHTML = "操作人员：" + UserName_a.innerHTML;
    var startOutPlTimeB = document.getElementById("startOutPlTimeB");
    startOutPlTimeB.innerHTML = "操作时间：" + convertDateS(new Date());


    var OutPlSelectContentA = document.getElementById("OutPlSelectContentA");
    OutPlSelectContentA.style.display = "none";
    var OutPlSelectContentB = document.getElementById("OutPlSelectContentB");
    OutPlSelectContentB.style.display = "block";
    var ZjselectReturn = document.getElementById("ZjselectReturn");
    ZjselectReturn.setAttribute("data-dismiss", "modal");
    isshowComePl = false;
    var myModalLabelQuickPl = document.getElementById("myModalLabelQuickPl");
    myModalLabelQuickPl.innerHTML = "快速出警";
    var addresName = "立刻前往" + LZCurClickMarker.AddressOfTheCrime + "救援";
    $('#OutPolicetableB tbody').html('');
    var CheLiangXinXitableone = document.getElementById("CheLiangXinXitableone");
    var tbody = CheLiangXinXitableone.getElementsByTagName("tbody")[0];
    var trs = tbody.getElementsByTagName("tr");
    var gisID = "";
    for (var q = 0; q < trs.length; q++) {
        var ckb = trs[q].getElementsByTagName("td")[3].getElementsByTagName("input")[0];
        if ($(ckb).is(':checked') == true) {
            var tr = trs[q];
            gisID += tr.getAttribute("myGISID") + ",";
        }
    }
    if (gisID == "") {
        alert("请先勾选消防站");
    } else {
        gisID = gisID.substr(0, gisID.length - 1);
        $.getJSON("/index/SelectSheBei", { GISPointSet: gisID }, function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var polisePeople = "";
                    var poliseCar = "";
                    var policeDet = "";

                    if (data[i][2].length > 0) {
                        for (var j = 0; j < data[i][2].length; j++) {
                            polisePeople += '<div  id="' + data[i][2][j].ID + '" style="width:60px;height:23px;float:left;margin-left:10px;"><label style="font-weight:200;">' + data[i][2][j].MC + '</label></div>';
                        }
                    } else {
                        polisePeople = "暂无人员";
                    }

                    if (data[i][3].length > 0) {
                        for (var k = 0; k < data[i][3].length; k++) {
                            poliseCar += '<div id="' + data[i][3][k].ID + '" style="width:100%;height:23px;"><label style="font-weight:200;" TYPE="' + data[i][3][k].type + '">' + data[i][3][k].MC + '</label></div>';
                        }
                    } else {
                        poliseCar = "暂无车辆";
                    }

                    if (data[i][4].length > 0) {
                        for (var l = 0; l < data[i][4].length; l++) {
                            policeDet += '<div  id="' + data[i][4][l].ID + '" style="width:100%;height:23px;"><label style="font-weight:200;"TYPE="' + data[i][4][l].type + '"> ' + data[i][4][l].MC + '</label></div>';
                        }
                    } else {
                        policeDet = "暂无设备";
                    }
                    var LZName;
                    if (data[i][1] != "") {
                        LZName = data[i][1].split(":");
                        $('#OutPolicetableB tbody').append('<tr id="' + data[i][0] + '"   GISID="' + LZName[1] + '"  ><td>' + LZName[0] + '</td>' +
                    '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + polisePeople + '</div></td>' +
                    '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + poliseCar + '</div></td>' +
                    '<td><div style="width:100%;height:100px;overflow-x:hidden;overflow-y:auto;">' + policeDet + '</div></td></td>' +
                    '<td style="padding: 2px !important;"><textarea style="width:100%;height:100%;">' + addresName + '</textarea></td></tr>');
                    }
                }
            }
        });
    }
}
//返回选择出警界面
function returnOutPlSelectContentA() {
    if (isshowComePl == true) {
        var OutPlSelectContentA = document.getElementById("OutPlSelectContentA");
        OutPlSelectContentA.style.display = "block";
        var OutPlSelectContentB = document.getElementById("OutPlSelectContentB");
        OutPlSelectContentB.style.display = "none";

    }
    else {
        var OutPlSelectContentB = document.getElementById("OutPlSelectContentB");
        OutPlSelectContentB.style.display = "none";
    }

}
//关闭出警
function fireOutPlClose() {
    // 右往左移
    $('#LZJieMian')
        .animate({ left: '0' }, 0)
        .animate({ left: '285px' }, 1000, function () {
            $('#LZJieMian').hide();
        });
}
function fireOutPlCloseOver(t) {
    t.setAttribute("src", "/content/images/Redclose.png");
}
function fireOutPlCloseOut(t) {
    t.setAttribute("src", "/content/images/close.png");
}
function ZJprint() {

}
function ComeSureClick() {
    //移除添加 ---   -- zjdm
    zjRemoveMarkerQ.type = 3;
    zjRemoveMarkerQ.setUrl('/SuperMap/images/maker_L_Green.png');
    moderateMarkerLayer.removeMarker(zjRemoveMarkerQ);
    safetyMarkerLayer.addMarker(zjRemoveMarkerQ);
    moderateMarkerLayer.setVisibility(false);
    moderateMarkerLayer.setVisibility(true);
    safetyMarkerLayer.setVisibility(false);
    safetyMarkerLayer.setVisibility(true);
    $('#ShoDuiTangKang').hide();
    if ($("#HDXShouDuiMian").is(":hidden") == true) {
        $('#HDXShouDuiMian').show();
        $('#HDXShouDuiMian')
     .animate({ left: '285px' }, 0)
     .animate({ left: '0' }, 1000, function () {
         $('#HDXChuJingMian').hide();
         $('#HDXdelIssue').hide();
         $('#LZJieMian').hide();
         $('#delIssue').hide();
     });
    }
    CloseZhouBian();//关闭周边分析
    ClearLayer();
}
//========================================================================================
//关闭出警
function close_HDXYiChuJingMian() {
    // 右往左移
    $('#HDXChuJingMian')
        .animate({ left: '0px' }, 0)
        .animate({ left: '285px' }, 1000, function () {
            $('#HDXChuJingMian').hide();
        });
}
function close_HDXShouDuiMian() {
    // 右往左移
    $('#HDXShouDuiMian')
        .animate({ left: '0px' }, 0)
        .animate({ left: '285px' }, 1000, function () {
            $('#HDXShouDuiMian').hide();
        });
}


//消防车详细信息
function openCarDetail(e) {

    //改变背景颜色
    var tabletbody = e.parentNode;
    var trs = tabletbody.getElementsByTagName("tr");
    for (var q = 0; q < trs.length; q++) {
        trs[q].style.backgroundColor = "#fff";
        trs[q].setAttribute("index", q);
    }
    e.style.backgroundColor = "#80b6f8";
    var index = e.getAttribute("index");
    if (index == 0) {
        //左往右移
        $('#HDXdelIssue')
            .animate({ left: '285px' }, 0, function () {
                $('#HDXdelIssue').show();
            })
            .animate({ left: '0px' }, 1000, function () {
            });
    }
}

function close_HDXdelIssue() {
    // 右往左移
    $('#HDXdelIssue')
        .animate({ left: '0px' }, 0)
        .animate({ left: '285px' }, 1000, function () {
            $('#HDXdelIssue').hide();
        });
}

//收队的
function open_ShouDuiCarDetail(t) {
    //改变背景颜色
    var tabletbody = t.parentNode;
    var trs = tabletbody.getElementsByTagName("tr");
    for (var q = 0; q < trs.length; q++) {
        trs[q].style.backgroundColor = "#fff";
        trs[q].setAttribute("index", q);
    }
    var index = t.getAttribute("index");
    if (index == 0) {
        //左往右移
        $('#HDXShouDui')
            .animate({ left: '285px' }, 0, function () {
                $('#HDXShouDui').show();
            })
            .animate({ left: '0px' }, 1000, function () {
            });
    }
    t.style.backgroundColor = "#80b6f8";
}

function close_HDXShouDui() {
    // 右往左移
    $('#HDXShouDui')
        .animate({ left: '0px' }, 0)
        .animate({ left: '285px' }, 1000, function () {
            $('#HDXShouDui').hide();
        });
}

function HDXzhenyuan() {
    isClickYellorM = true;
    if ($("#LZJieMian").is(":hidden") == true) {
        $('#LZJieMian')
        .animate({ left: '285px' }, 0)
        .animate({ left: '0' }, 1000, function () {
            $('#LZJieMian').show();
            $('#HDXChuJingMian').hide();
            $('#HDXShouDuiMian').hide();
            $('#HDXdelIssue').hide();
            //刷新数据
            LZAlarmClick(LZCurClickMarker);
            document.getElementById("LZJieMianLocationPl").innerHTML = LZCurClickMarker.AddressOfTheCrime;
        });
    }
}

//点击绿色点 - zjdm
var CurShouDuiAlarmID;
function HDXclickGreen(marker) {
    $('#HDXdelIssue').hide();
    $('#HDXShouDui').hide();
    $('#HDXChuJingMian').hide();



    isClickYellorM = false;
    CurShouDuiAlarmID = marker.AlarmID;
    LZCurClickMarker = marker;
    //绑定出警消防站信息
    $.getJSON("/index/SelectYellowmarker?AlarmID=" + CurShouDuiAlarmID, function (data) {
        // var TableTR = document.getElementById("YiChuJingTable").getElementsByTagName("tr");
        $('#ShouDuiTable tbody').html('');
        var HTML = "";
        for (var i = 0; i < data.length; i++) {
            var CurID = data[i][0];//消防站ID
            var FireName = data[i][1];//消防站名称
            var FireType = data[i][2];//消防站类别
            var FirePhone = data[i][3];//消防站电话
            var X = data[i][4];
            var Y = data[i][5];
            var GISID = data[i][6];
            HTML += "<tr X='" + X + "'Y='" + Y + "'GISID='" + GISID + "' onclick='FireStatioGISGreen(this)'><td>" + FireName + "</td><td>" + FireType + "</td><td>" + FirePhone + "</td><td><a  id='" + CurID + "' onclick='HDXShouDuiXiangQing(this)'>详情</a></td></tr>";
        }
        $('#ShouDuiTable tbody').append(HTML);
    });
}

//绿色定位
function FireStatioGISGreen(t) {

    CloseLayerPointPopup();
    CloseFireFightingApparatusXiangQing();
    ClosefirefighterXiangQing();
    CloseZhouBian();//关闭周边分析 
    closeDialog_T();//关闭搜索警点弹窗

    var X = t.getAttribute("X");
    var Y = t.getAttribute("Y");
    var GISID = t.getAttribute("GISID");
    if (SmallFireHouseLayer.markers.length > 0 || WeiXingFireHouseLayer.markers.length > 0) {
        LZFireCarPointIndex = 0;//初始化索引
        LZFireCarPoint = [];
        for (var i = 0; i < SmallFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(SmallFireHouseLayer.markers[i]);
        }
        for (var i = 0; i < WeiXingFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(WeiXingFireHouseLayer.markers[i]);
        }
    }

    map.setCenter(new SuperMap.LonLat(X, Y), 4);
    setTimeout(function () {
        var LZrsDemoArray1 = LZFireCarPoint.filter(function (value, index, self) {
            return value.GISID == GISID;
        });
        LZrsDemoArray1[0].bool = true;
        OpenZhanDianMessagepopupss1(LZrsDemoArray1[0]);
    }, 500);


}






//绿色详情
function HDXShouDuiXiangQing(t) {

    $('#listPersonnel_F').show();
    $('#listCarPoliceTools_F').show();
    $('#listOtherPoliceTools_F').show();

    var FireStationID = t.id;
    $.getJSON("/index/select_carDetail", { FireStationID: FireStationID, AlarmID: CurShouDuiAlarmID }, function (data) {
        if (data.length > 0) {
            $('#listPersonnel_F tbody').html("");
            $('#listCarPoliceTools_F tbody').html("");
            $('#listOtherPoliceTools_F tbody').html("");

            document.getElementById("PicturePath_F").innerHTML = "<img src='" + data[0][0].PicturePath + "' alt='图片加载失败' style='width:150px;height:100px;'/>";

            $('#FireStationMC_F').text(data[0][0].FireStationMC);
            $('#PropertyDetailMC_F').text(data[0][0].PropertyDetailMC);
            $('#Address_F').text(data[0][0].Address);
            $('#FixedTelePhone_F').text(data[0][0].FixedTelePhone);
            var listPersonnel = "";
            var listCarPoliceTools = "";
            var listOtherPoliceTools = "";


            if (data[1].length > 0) {
                for (var i = 0; i < data[1].length; i++) {
                    listPersonnel += '<tr><td>' + data[1][i].PersonnelMC +
                        '</td><td>' + data[1][i].Task +
                        '</td></tr>';
                }
            }
            if (data[2].length > 0) {
                for (var j = 0; j < data[2].length; j++) {
                    listCarPoliceTools += '<tr><td><img style="width:80px;height:60px;" src="' + data[2][j].PicturePath +
                                          '"/></td><td>' + data[2][j].MC + '</td><td>' + data[2][j].Number + '</td></tr>';
                }
            }

            if (data[3].length > 0) {
                for (var k = 0; k < data[3].length; k++) {
                    listOtherPoliceTools += '<tr><td><img style="width:80px;height:60px;" src="' + data[3][k].PicturePath +
                   '"/></td><td style="width:100px;">' + data[3][k].MC + '</td><td style="width:80px;">' + data[3][k].Number + '</td></tr>';
                }
            }
            $('#listPersonnel_F tbody').append(listPersonnel);
            $('#listCarPoliceTools_F tbody').html(listCarPoliceTools);
            $('#listOtherPoliceTools_F tbody').html(listOtherPoliceTools);
        }
        else {
            $('#listPersonnel_F tbody').html("");
            $('#listCarPoliceTools_F tbody').html("");
            $('#listOtherPoliceTools_F tbody').html("");
        }
    });
    $('#HDXShouDui')
    .animate({ left: '285px' }, 0, function () {
        $('#HDXShouDui').show();
    })
    .animate({ left: '0px' }, 1000, function () {
    });
}
//黄色详情
function weiChuJIngDanjiClick(t) {

    $('#listPersonnel').show();
    $('#listCarPoliceTools').show();
    $('#listOtherPoliceTools').show();




    var CurAlarmID = LZCurClickMarker.AlarmID;
    var FireStationID = t.id;
    $.getJSON("/index/select_carDetail", { FireStationID: FireStationID, AlarmID: CurAlarmID }, function (data) {
        if (data.length > 0) {
            $('#listPersonnel tbody').html("");
            $('#listCarPoliceTools tbody').html("");
            $('#listOtherPoliceTools tbody').html("");
            document.getElementById("PicturePath_C").innerHTML = "<img src='" + data[0][0].PicturePath + "' alt='图片加载失败' style='width:150px;height:100px;'/>";
            $('#FireStationMC').text(data[0][0].FireStationMC);
            $('#PropertyDetailMC').text(data[0][0].PropertyDetailMC);
            $('#Address').text(data[0][0].Address);
            $('#FixedTelePhone').text(data[0][0].FixedTelePhone);
            var listPersonnel = "";
            var listCarPoliceTools = "";
            var listOtherPoliceTools = "";
            //人员
            if (data[1].length > 0) {
                for (var i = 0; i < data[1].length; i++) {
                    var Task = data[1][i].Task;
                    if (Task == null || Task == "") {
                        Task = "暂无任务";
                    }
                    listPersonnel += '<tr><td>' + data[1][i].PersonnelMC +
                        '</td><td>' + Task +
                        '</td><td><input id="' + data[1][i].ThePoliceOfficersID + '" onclick="updatePeopleTask(this)"  class="UpdatebtnStyle" type="button" value="修改"/></td></tr>';
                }
            }
            //车辆
            if (data[2].length > 0) {
                for (var j = 0; j < data[2].length; j++) {
                    listCarPoliceTools += '<tr><td><img style="width:80px;height:60px;" src="' + data[2][j].PicturePath +
                        '"/></td><td>' + data[2][j].MC + '</td><td>' + data[2][j].Number + '</td></tr>';
                }
            }
            //设备
            if (data[3].length > 0) {
                for (var k = 0; k < data[3].length; k++) {
                    listOtherPoliceTools += '<tr><td><img style="width:80px;height:60px;" src="' + data[3][k].PicturePath +
                     '"/></td><td style="width:100px;">' + data[3][k].MC + '</td><td>' + data[3][k].Number + '</td></tr>';
                }
            }
            $('#listPersonnel tbody').append(listPersonnel);
            $('#listCarPoliceTools tbody').append(listCarPoliceTools);
            $('#listOtherPoliceTools tbody').append(listOtherPoliceTools);
        }
        else {
            $('#listPersonnel').html("");
            $('#listCarPoliceTools').html("");
            $('#listOtherPoliceTools').html("");
        }
    });
    $('#HDXdelIssue')
      .animate({ left: '285px' }, 0, function () {
          $('#HDXdelIssue').show();
      })
      .animate({ left: '0px' }, 1000, function () {
      });
}


//修改任务
function updatePeopleTask(t) {

    var btnText = t.value;
    var RenWuTextID = t.id;
    if (btnText == "修改") {
        var tds = t.parentNode.parentNode.getElementsByTagName("td")[1];

        tds.innerHTML = '<textarea style="width:99%;height:100%;padding: 2px;margin: 3px auto;">' + tds.innerHTML + '</textarea>';

        t.value = "保存";
    }
    else {
        var RenWuTextIDText = "";
        var tdss = t.parentNode.parentNode.getElementsByTagName("td")[1];
        RenWuTextIDText = tdss.getElementsByTagName("textarea")[0].value;
        $.getJSON("/index/UpdatepeopleRenWu", { peopleID: RenWuTextID, Task: RenWuTextIDText }, function (data) {
            if (data > 0) {

            }
        });
        tdss.innerHTML = RenWuTextIDText;
        t.value = "修改";
    }
}


var HDXlistPersonnelHiden = 0;
var HDXlistCarPoliceToolsHiden = 0;
var HDXlistOtherPoliceToolsHiden = 0;
var HDXlistPersonnel_F = 0;
var HDXlistCarPoliceTools_F = 0;
var HDXlistOtherPoliceTools_F = 0;


function listPersonnelHiden() {
    HDXlistPersonnelHiden++;
    if (HDXlistPersonnelHiden % 2 == 0) {

        $('#listPersonnel').show();
    }
    else {
        $('#listPersonnel').hide();
    }
}
function listCarPoliceToolsHiden() {
    HDXlistCarPoliceToolsHiden++;
    if (HDXlistCarPoliceToolsHiden % 2 == 0) {
        $('#listCarPoliceTools').show();
    }
    else {
        $('#listCarPoliceTools').hide();
    }
}
function listOtherPoliceToolsHiden() {
    HDXlistOtherPoliceToolsHiden++;
    if (HDXlistOtherPoliceToolsHiden % 2 == 0) {
        $('#listOtherPoliceTools').show();
    }
    else {
        $('#listOtherPoliceTools').hide();
    }
}

function listPersonnel_F() {
    HDXlistPersonnel_F++;
    if (HDXlistPersonnel_F % 2 == 0) {
        $('#listPersonnel_F').show();
    }
    else {
        $('#listPersonnel_F').hide();
    }
}
function listCarPoliceTools_F() {
    HDXlistCarPoliceTools_F++;
    if (HDXlistCarPoliceTools_F % 2 == 0) {
        $('#listCarPoliceTools_F').show();
    }
    else {
        $('#listCarPoliceTools_F').hide();
    }
}
function listOtherPoliceTools_F() {
    HDXlistOtherPoliceTools_F++;
    if (HDXlistOtherPoliceTools_F % 2 == 0) {
        $('#listOtherPoliceTools_F').show();
    }
    else {
        $('#listOtherPoliceTools_F').hide();
    }
}


//========================================================================================
//------------------出警js End--------------------


///**********************************************李志1204Sta******************************

//————————————————————————路径分析Sta——————————————————————
var LZCurClickMarker = null;//当前点击的火灾点！
var LZFireCarPoint = [];//要分析的点集合！
var LZarrElseFindplan = { x: 0, y: 0 }; //火灾点！
var LZFireCarPointIndex = 0;//  用于定位线路的准确位置！

var LineSet = [];//线集合
var Point = [];//小人集合 用于动画车

var myCarTextweight;//用于判断是否显示文字

//清除
function ClearLayer() {

    LayerSchemeeScheme.removeAllFeatures();//线路
    LayerSchemeeAnimation.removeAllFeatures();//小人 园
    LZcar_animatorVector.animator.pause();//停止监控
    LZcar_animatorVector.removeAllFeatures();//清除
    document.getElementById('iTunes_LT').pause();//暂停
}
//单击红色报警点
function LZAlarmClick(marker) {
    MyBaoJingDianbool = false;
    isClickYellorM = false;
    LineSet = [];//线集合
    Point = [];//小人集合

    ClearLayer();//清除我的！
    LZFireCarPointIndex = 0;//初始化索引
    LZFireCarPoint = [];
    myCarTextweight = true;//显示文字
    //需要的参数！ 
    //所有消防站的点！  得到点集合！ 

    //绑定火灾点
    if (marker.bool == true) {
        LZarrElseFindplan.x = marker.lonlat.lon;
        LZarrElseFindplan.y = marker.lonlat.lat;
    }
    else {
        LZarrElseFindplan.x = marker.getLonLat().lon;
        LZarrElseFindplan.y = marker.getLonLat().lat;
    }
    LZCurClickMarker = marker;//绑定点击的点！
    //得到点集合~~~    添加到 LZFireCarPoint

    if (SmallFireHouseLayer.markers.length > 0 || WeiXingFireHouseLayer.markers.length > 0) {
        LZFireCarPointIndex = 0;//初始化索引
        LZFireCarPoint = [];
        for (var i = 0; i < SmallFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(SmallFireHouseLayer.markers[i]);
        }
        for (var i = 0; i < WeiXingFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(WeiXingFireHouseLayer.markers[i]);
        }

        LZmeasureCompleted();//开始分析！
    }
    //~~~~~~~
    //遍历

}

//进行路径分析的参数设置 在 LZAlarmClick调用   LZdistanceSceneOK 成功方法 LZdistanceSceneover 失败方法
function LZmeasureCompleted() {
    $("#loadMap").show();
    var nodeArray = [];//分析的点
    var eventPoint = new SuperMap.Geometry.Point(LZarrElseFindplan.x, LZarrElseFindplan.y);//火灾点
    var node = new SuperMap.Geometry.Point(LZFireCarPoint[LZFireCarPointIndex].lonlat.lon,//当前索引点
        LZFireCarPoint[LZFireCarPointIndex].lonlat.lat);
    nodeArray.push(eventPoint);//报警点
    nodeArray.push(node);//巡逻队位置点
    //交通网络分析结果参数类。
    resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
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
        resultSetting: resultSetting//分析结果返回内容
        // , weightFieldName: 'SmLength',//阻力字段的名称，标识了进行网络分析时所使用的阻力字段，例如表示时间、长度等的字段都可以用作阻力字段。 该字段默值为服务器发布的所有耗费字段的第一个字段。
        //  , turnWeightField: 'SmLength'//  转向权重字段名称:  TurnCost
    });
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,//是否通过节点 ID 指定路径分析的结点
        nodes: nodeArray,//要分析的点
        hasLeastEdgeCount: false,//是否按照弧段数最少的进行最佳路径分析
        parameter: analystParameter//交通网络分析通用参数
    });
    findPathService = new SuperMap.REST.FindPathService(urlNetwork,
    {
        eventListeners: {
            "processCompleted": LZdistanceSceneOK,//成功方法
            "processFailed": LZdistanceSceneover//失败方法
        }
    });
    findPathService.processAsync(parameter);//提交服务
}


//路径分析成功后
var styleGuidePointLeft = {//在报警点的左边
    pointRadius: 10,
    externalGraphic: "/SuperMap/images/walk.png",
    graphicOpacity: 0.8
};
var styleGuidePointRight = {//在报警点的右边
    pointRadius: 10,
    externalGraphic: "/SuperMap/images/walk2.png",
    graphicOpacity: 0.8
};


function LZdistanceSceneOK(findPathEventArgs) {
    LZFireCarPointIndex++;//索引新增
    var result = findPathEventArgs.result;  //获取结果
    if (result.pathList) {
        var pathList = result.pathList; //再次获取结果
        if (pathList.length > 0) {
            var facilityPathList = pathList[0];//只有一条数据返回
            var feature = new SuperMap.Feature.Vector();//创建一个信息
            feature.geometry = facilityPathList.route;//赋值几何信息
            var weight = parseInt(facilityPathList.weight);//获取距离
            //赋值给点！距离！

            if (LZFireCarPointIndex <= LZFireCarPoint.length) {
                LZFireCarPoint[LZFireCarPointIndex - 1].Weight = weight;
            }

            //---------------------------------------------------------距离
            feature.weight = weight;//赋值
            feature.type = 3;//线路类型？
            //线路颜色
            var color = '#A6C9ED';
            //if (LZFireCarPointIndex % 2 == 0) {
            //    color = '#0ff70c';
            //}
            feature.style = {//赋值线路样式
                strokeColor: color,
                strokeWidth: 3,
                strokeOpacity: 0.9,
                fill: false
            };


            var points1 = [];
            var featureComps2 = facilityPathList.route.components[0].components;//获取线路节点
            for (var k = 0; k < featureComps2.length; k++) {
                points1.push(new SuperMap.Geometry.Point(featureComps2[k].x, featureComps2[k].y));
            }
            var lineVector;
            if (points1.length > 0) {
                var line = new SuperMap.Geometry.LineString(points1);
                lineVector = new SuperMap.Feature.Vector(line);
                lineVector.style = {
                    strokeColor: color,
                    strokeWidth: 3,
                    strokeOpacity: 0.9,
                    fill: false
                };

                var featureComps = facilityPathList.route.components[0].components;//获取线路节点
                if (featureComps != null && featureComps.length > 0) {
                    var point = new SuperMap.Geometry.Point(LZFireCarPoint[LZFireCarPointIndex - 1].lonlat.lon,
                        LZFireCarPoint[LZFireCarPointIndex - 1].lonlat.lat - 0.00014);//创建一个点图层
                    var sumCount = featureComps.length;//返回线路节点总数
                    var Now = 10;//只取10个节点导航
                    var divisor = parseInt(sumCount / 10);//计算取点的间隔

                    for (var k = featureComps.length - 1; k >= 0 ; k--) {
                        if (k == 0 || k == featureComps.length - 1)//开始点和结束点必取
                        {
                            //连接的点集合
                            var MyLinOnPoint = [];
                            var FID = -1;//用于判断是头或尾
                            var centerPoint = new SuperMap.Geometry.Point(featureComps[k].x, featureComps[k].y);
                            MyLinOnPoint.push(centerPoint);//添加点 用于连线
                            if (k == 0) {//与目的点连接
                                MyLinOnPoint.push(new SuperMap.Geometry.Point(LZarrElseFindplan.x, LZarrElseFindplan.y));
                                FID = 0;
                            } else {//与火灾点连接
                                MyLinOnPoint.push(point);
                                FID = 1;
                            }
                            var circleVector = new SuperMap.Feature.Vector(centerPoint);
                            if (Number(featureComps[k].x) > Number(LZarrElseFindplan.x)) {//判断巡逻队是否在报警点的右边
                                circleVector.style = styleGuidePointLeft;
                            } else {//判断巡逻队是否在报警点的左边
                                circleVector.style = styleGuidePointRight;
                            }
                            circleVector.type = 2;//导航节点图片类型

                            if (LZFireCarPointIndex <= LZFireCarPoint.length) {
                                circleVector.GISID = LZFireCarPoint[LZFireCarPointIndex - 1].GISID;//赋值 所属ID
                            }

                            //if (MyBaoJingDianbool == true) {
                            //    LayerSchemeeAnimation.addFeatures(circleVector);//图层显示
                            //}
                            //  Point.push(circleVector);//添加入 小人节点！ 用于动画！


                            //--------------------------------连接起点 和 终点  直线  
                            var roadLine = new SuperMap.Geometry.LineString(MyLinOnPoint);//绘制线

                            var LineVector = new SuperMap.Feature.Vector(roadLine);
                            LineVector.style =
                            {
                                strokeColor: color,
                                strokeWidth: 2,
                                strokeOpacity: 0.9,
                                fill: false
                            };
                            LineVector.GISID = LZFireCarPoint[LZFireCarPointIndex - 1].GISID;//-------------绑定数据
                            LineVector.FID = FID;//判断头尾
                            //if (MyBaoJingDianbool == true) {
                            //    LayerSchemeeScheme.addFeatures(LineVector);//图层显示
                            //}
                            LineSet.push(LineVector);
                        }
                        else {  //获取中间点
                            if (k % divisor <= 0) {
                                var centerPoint = new SuperMap.Geometry.Point(featureComps[k].x, featureComps[k].y);
                                var circleVector = new SuperMap.Feature.Vector(centerPoint);
                                if (Number(featureComps[k].x) > Number(LZarrElseFindplan.x)) {//判断巡逻队是否在报警点的右边
                                    circleVector.style = styleGuidePointLeft;
                                }
                                else {   //判断巡逻队是否在报警点的左边
                                    circleVector.style = styleGuidePointRight;
                                }
                                circleVector.type = 2;//导航节点图片类型
                                circleVector.GISID = LZFireCarPoint[LZFireCarPointIndex - 1].GISID;//-------------绑定数据
                                //if (MyBaoJingDianbool == true) {
                                //    LayerSchemeeAnimation.addFeatures(circleVector);//图层显示
                                //}
                                // Point.push(circleVector);//添加入 小人节点！ 用于动画！
                            }
                        }
                    }

                    lineVector.GISID = LZFireCarPoint[LZFireCarPointIndex - 1].GISID;//-------------绑定数据
                    lineVector.FID = 2;
                    //if (MyBaoJingDianbool == true)//报警点！
                    //{
                    //    LayerSchemeeScheme.addFeatures(feature);//线路图层 线路图层
                    //}
                    LineSet.push(lineVector);//线路集合！
                }

            } else {

            }
        }
    }
    LZLast();//继续递归或绑定数据！
}



//路径分析失败后！
function LZdistanceSceneover(e) {
    LZFireCarPointIndex++;//索引新增
    LZLast();
}
//递归判断绑定数据
function LZLast() {
    //递归完成全部
    if (LZFireCarPointIndex <= LZFireCarPoint.length - 1) {
        LZmeasureCompleted();
    }
    else {
        //完成路径分析后
        LayerSchemeeScheme.setVisibility(false);
        LayerSchemeeScheme.setVisibility(true);
        //绑定数据  按顺序 将点中的数据 绑定到  table
        var newArr = LZFireCarPoint.sort(function (o1, o2) {
            return o1.Weight - o2.Weight;
        });//升序！g
        if (LZFireCarPoint.length != 17)//暂时
        {
            if (SmallFireHouseLayer.markers.length > 0 || WeiXingFireHouseLayer.markers.length > 0) {
                LZFireCarPointIndex = 0;//初始化索引
                LZFireCarPoint = [];
                for (var i = 0; i < SmallFireHouseLayer.markers.length; i++) {
                    LZFireCarPoint.push(SmallFireHouseLayer.markers[i]);
                }
                for (var i = 0; i < WeiXingFireHouseLayer.markers.length; i++) {
                    LZFireCarPoint.push(WeiXingFireHouseLayer.markers[i]);
                }
            }
            setTimeout(function () {
                LZLast();//从新执行！
            }, 100)
        }
        else {
            var styleGuidePointLeft = {//在报警点的左边
                pointRadius: 10,
                externalGraphic: "/SuperMap/images/walk.png",
                graphicOpacity: 0.8
            };
            var styleGuidePointRight = {//在报警点的右边
                pointRadius: 10,
                externalGraphic: "/SuperMap/images/walk2.png",
                graphicOpacity: 0.8
            };
            if (MyBaoJingDianbool == true) {
                var LZXiaoXing = null;
                var LZWeiXing = null;
                for (var i = 0; i < newArr.length; i++) {
                    if (newArr[i].typeID == 34 && LZXiaoXing == null) {
                        LZXiaoXing = newArr[i];
                    }
                    if (newArr[i].typeID == 33 && LZWeiXing == null) {
                        LZWeiXing = newArr[i];
                    }
                }

                if (LZWeiXing != null && LZXiaoXing != null) {
                    //得到第一个最进的微型消防站 和小型消防站
                    var MyGISIDWX = LZWeiXing.GISID;
                    var MyGISIDXX = LZXiaoXing.GISID;

                    //用于小人的位置
                    //火灾点
                    var ClickPointX = LZCurClickMarker.lonlat.lon;
                    var ClickPointY = LZCurClickMarker.lonlat.lat;
                    //小
                    var XiaoPointX = LZXiaoXing.lonlat.lon;
                    var XiaoPointY = LZXiaoXing.lonlat.lat;
                    //微
                    var WeiPointX = LZWeiXing.lonlat.lon;
                    var WeiPointY = LZWeiXing.lonlat.lat;

                    //微
                    var centerPointWei = new SuperMap.Geometry.Point(WeiPointX, parseFloat(WeiPointY));
                    var circleVectorWei = new SuperMap.Feature.Vector(centerPointWei);
                    if (Number(WeiPointX) > Number(ClickPointX)) {
                        circleVectorWei.style = styleGuidePointLeft;
                    } else {
                        circleVectorWei.style = styleGuidePointRight;
                    }
                    circleVectorWei.type = 2;//导航节点图片类型
                    circleVectorWei.GISID = LZWeiXing.GISID;//赋值 所属ID
                    LayerSchemeeAnimation.addFeatures(circleVectorWei);//图层显示
                    //偏移量！  固定的数！
                    //火警点！
                    var centerPointWeiCur = new SuperMap.Geometry.Point(ClickPointX, ClickPointY);
                    var circleVectorWeiCur = new SuperMap.Feature.Vector(centerPointWeiCur);
                    if (Number(WeiPointX) > Number(ClickPointX)) {
                        circleVectorWeiCur.style = styleGuidePointLeft;
                    } else {
                        circleVectorWeiCur.style = styleGuidePointRight;
                    }
                    circleVectorWeiCur.type = 2;//导航节点图片类型
                    circleVectorWeiCur.GISID = LZWeiXing.GISID;//赋值 所属ID
                    LayerSchemeeAnimation.addFeatures(circleVectorWeiCur);//图层显示


                    var centerPointXiao = new SuperMap.Geometry.Point(XiaoPointX, parseFloat(XiaoPointY));
                    var circleVectorXiao = new SuperMap.Feature.Vector(centerPointXiao);
                    if (Number(XiaoPointX) > Number(ClickPointX)) {
                        circleVectorXiao.style = styleGuidePointLeft;
                    } else {
                        circleVectorXiao.style = styleGuidePointRight;
                    }
                    circleVectorXiao.type = 2;//导航节点图片类型
                    circleVectorXiao.GISID = LZWeiXing.GISID;//赋值 所属ID
                    LayerSchemeeAnimation.addFeatures(circleVectorXiao);//图层显示
                    //偏移量！  固定的数！
                    //火警点！
                    var centerPointXiaoCur = new SuperMap.Geometry.Point(ClickPointX, ClickPointY);
                    var circleVectorXiaoCur = new SuperMap.Feature.Vector(centerPointXiaoCur);
                    if (Number(XiaoPointX) > Number(ClickPointX)) {
                        circleVectorXiaoCur.style = styleGuidePointLeft;
                    } else {
                        circleVectorXiaoCur.style = styleGuidePointRight;
                    }
                    circleVectorXiaoCur.type = 2;//导航节点图片类型
                    circleVectorXiaoCur.GISID = LZWeiXing.GISID;//赋值 所属ID
                    LayerSchemeeAnimation.addFeatures(circleVectorXiaoCur);//图层显示
                    var NewLineSetOne = LineSet;
                    var rsDemoArray12 = NewLineSetOne.filter(function (value, index, self) {
                        if (value.GISID == MyGISIDXX || value.GISID == MyGISIDWX) {
                            LayerSchemeeScheme.addFeatures(value);//添加线路！
                            return value;
                        }
                    });
                    var NewLineSetTow = LineSet;
                    var rsDemoArray12 = NewLineSetTow.filter(function (value, index, self) {
                        if (value.GISID == MyGISIDWX) {
                            LayerSchemeeScheme.addFeatures(value);//添加线路！
                            return value;
                        }
                    });
                }
                $("#loadMap").hide();
            }
            else {
                if (myCarTextweight == false)//已出警！
                {//得到消防站的距离排序！然后查询数据得到相对应的 距离！ 车牌号 名称 指挥人
                    var myTable = document.getElementById("HDXChuJingMian").getElementsByTagName("tbody");
                    var TableHTMLstr = "";
                    for (var i = 0; i < newArr.length; i++) {

                    }
                }
                else {
                    Point = [];
                    $.getJSON("/Index/SelectFire", function (data) {
                        if (data[0].length == 0) {
                            $("#loadMap").hide();
                        }
                        else {
                            var CheLiangXinXitableone = document.getElementById("CheLiangXinXitableone");
                            var tbody = CheLiangXinXitableone.getElementsByTagName("tbody");
                            //未出警！得到距离排序后！消防站名称 类型 距离！
                            $(tbody).html('');

                            for (var i = 0; i < newArr.length; i++) {
                                var myWeight = newArr[i].Weight != undefined ? newArr[i].Weight + "米" : "无法计算";
                                var type = newArr[i].typeID == 33 ? "微型" : "小型";
                                var cur = newArr[i].GISID;
                                var result = data[0].some(function (value, index, self) {
                                    return value == cur + "";
                                });
                                if (result == true) {

                                    var ReAllup = data[1].some(function (value, index, self) {
                                        if (value + "" == cur + "") {
                                            return value;
                                        }
                                    });
                                    if (ReAllup == true) {

                                        TableHTMLstr += "<tr style='background: #F2F57E;'  myGISID='" + newArr[i].GISID + "'  Point='" + newArr[i].lonlat.lon + "," + newArr[i].lonlat.lat + "'><td onclick='issleftDelShow(this)' style='cursor:pointer;color:#0058EC;'>" + newArr[i].name
                                  + "</td><td>" + type + "</td><td>" + myWeight + "</td><td style='vertical-align:middle;'> <input type='checkbox' title='已全员出动' style='cursor:not-allowed'  onclick='LZcheckboxClick(this,event)' disabled='true'/></td></tr>";
                                    } else {
                                        TableHTMLstr += "<tr style='background: #F2F57E;'  myGISID='" + newArr[i].GISID + "'  Point='" + newArr[i].lonlat.lon + "," + newArr[i].lonlat.lat + "'><td onclick='issleftDelShow(this)' style='cursor:pointer;color:#0058EC;'>" + newArr[i].name
                              + "</td><td>" + type + "</td><td>" + myWeight + "</td><td style='vertical-align:middle;'> <input type='checkbox'   onclick='LZcheckboxClick(this,event)' /></td></tr>";
                                    }
                                }
                                else {
                                    TableHTMLstr += "<tr  myGISID='" + newArr[i].GISID + "'  Point='" + newArr[i].lonlat.lon + "," + newArr[i].lonlat.lat + "'><td onclick='issleftDelShow(this)' style='cursor:pointer;color:#0058EC;'>" + newArr[i].name + "</td><td>" + type + "</td><td>" + myWeight + "</td><td style='vertical-align:middle;'> <input type='checkbox'  onclick='LZcheckboxClick(this,event)' /></td></tr>";
                                }
                            }
                            $(tbody).html(TableHTMLstr);
                            if (isClickYellorM == true) {
                                // showComePl();//弹出选择出警界面
                            }
                            //默认显示3条数据！
                            var TableTRSet = CheLiangXinXitableone.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
                            var CurIndex = 0;
                            for (var i = 0; i < TableTRSet.length; i++) {


                                var LZDisebled = TableTRSet[i].getElementsByTagName("input")[0].getAttribute("disabled");

                                if (LZDisebled != "true") {

                                    CurIndex++;
                                    var MyGISID = TableTRSet[i].getAttribute("myGISID");
                                    TableTRSet[i].getElementsByTagName("input")[0].setAttribute("checked", "checked");
                                    //返回符合条件的新数组！ 
                                    var rsDemoArray1 = LineSet.filter(function (value, index, self) {
                                        if (value.GISID == MyGISID) {
                                            LayerSchemeeScheme.addFeatures(value);//添加线路！
                                            return value;
                                        }
                                    });
                                    LZShowNavigation(MyGISID);
                                }
                                if (CurIndex == 5 || CurIndex >= data) {
                                    $("#loadMap").hide();
                                    break;
                                }
                            }

                        }
                    });
                }
            }
        }
    }
}

//通过GIS定位 得到头尾小人！
function LZShowNavigation(GISID) {
    var ClickPointX = LZCurClickMarker.lonlat.lon;
    var ClickPointY = LZCurClickMarker.lonlat.lat;

    //通过GIS 得到小人！

    LZFireCarPoint.filter(function (value, index, self) {
        if (value.GISID == GISID) {
            var ClickMarkerX = value.lonlat.lon;
            var ClickMarkerY = value.lonlat.lat;
            var centerPointWeiCur = new SuperMap.Geometry.Point(ClickMarkerX, ClickMarkerY);
            var ClickPointX = LZCurClickMarker.lonlat.lon;
            var ClickPointY = LZCurClickMarker.lonlat.lat;
            var circleVectorWeiCur = new SuperMap.Feature.Vector(centerPointWeiCur);
            if (Number(ClickMarkerX) > Number(ClickPointX)) {
                circleVectorWeiCur.style = styleGuidePointLeft;
            } else {
                circleVectorWeiCur.style = styleGuidePointRight;
            }
            circleVectorWeiCur.type = 2;//导航节点图片类型
            circleVectorWeiCur.GISID = GISID;//赋值 所属ID
            LayerSchemeeAnimation.addFeatures(circleVectorWeiCur);//图层显示
            Point.push(circleVectorWeiCur);
            return value;
        }
    });
}


function LZHideNavigation(GISID) {
    var Index = -1;
    for (var i = 0; i < Point.length; i++) {
        Point[i].GISID == GISID;
        Index = i;
        break;
    }
    if (Index != -1) {
        Point = Point.splice(Index, 1);
    }

}


function LZcheckboxClick(obj, e, GISID) {
    //GISID 用于手动
    var CurInput = $(obj).parent().parent()[0];
    var MyGISID;
    if (GISID) {
        MyGISID = GISID;
    } else {
        MyGISID = CurInput.getAttribute("myGISID");
    }
    // $("#policeGrade_input2").is(':checked') == true
    if ($(obj).is(':checked') == false) {
        event = event || window.event; event.stopPropagation(); event.cancelBubble = true;
        var rsDemoArray1 = LineSet.filter(function (value, index, self) {
            if (value.GISID == MyGISID) {
                LayerSchemeeScheme.removeFeatures(value);//添加线路！
                return value;
            }
        });

        var rsDemoArray1 = Point.filter(function (value, index, self) {
            if (value.GISID == MyGISID) {
                try {
                    LayerSchemeeAnimation.removeFeatures(value);//移除小人！
                } catch (e) { }
                return value;
            }
        });
    }
    else {
        var rsDemoArray1 = LineSet.filter(function (value, index, self) {
            if (value.GISID == MyGISID) {
                LayerSchemeeScheme.addFeatures(value);//添加线路！
                return value;
            }
        });
        LZShowNavigation(MyGISID);//添加小人！
    }
    //防止冒泡！
}

//————————————————————————路径分析End——————————————————————

//————————————————————————路径绘制Sta——————————————————————
//开始绘制

//function LZDrawLineUpper() {
//    vectorLine_LZ.activate();//开启
//}
////绘制结束
//function drawCompleted_vectorLine_LZ(dr) {
//    vectorLine_LZ.deactivate();
//    var pointFeature = new SuperMap.Feature.Vector();
//    pointFeature = dr.feature;
//    pointFeature.style = {
//        strokeColor: "red",
//        strokeWidth: 3,
//        fill: false
//    };
//    LayerSchemeeScheme.removeFeatures(dr.feature);//移除
//    LayerSchemeeScheme.addFeatures(pointFeature);//添加新矢量图
//}
//————————————————————————路径绘制End——————————————————————

//————————————————————————出警Sta————————————————————————
//出警单击
function LZDepartPolice() {
    var k1 = document.getElementById('iTunes_LT');
    k1.loop = true;//循环！！
    k1.play();//-------------------------铃声提醒

    LZCurClickMarker.AlarmStateID = 11;
    seriousMarkerLayer.removeMarker(LZCurClickMarker);//从未出警移除！
    moderateMarkerLayer.addMarker(LZCurClickMarker);//添加到已出警

    //显示正在出警状态的界面！ 这里不能直接点击 界面默认显示界面！
    $('#HDXChuJingMian').show();
    $('#HDXChuJingMian')
   .animate({ left: '285px' }, 0)
   .animate({ left: '0' }, 1000, function () {
       $('#LZJieMian').hide();
       $('#HDXShouDuiMian').hide();
       $('#delIssue').hide();
       $('#HDXShouDui').hide();
   });

    moderateMarkerLayer.setVisibility(false);
    moderateMarkerLayer.setVisibility(true);
    seriousMarkerLayer.setVisibility(false);
    seriousMarkerLayer.setVisibility(true);

    LZcar_animatorVector.removeAllFeatures();//汽车动画



    LayerSchemeeScheme.removeAllFeatures();//先移除所有
    //----------------------------新增出警 zjdm Insert ---------------------------------
    document.getElementById("hdxPoliceLCTA").innerText = (LZCurClickMarker.AddressOfTheCrime);

    var AlarmID = zjRemoveMarkerQ.AlarmID;//点击的marker
    var insertCount = 0;
    var isShow = false;
    var CurTimeID = -1;
    if (AlarmID != undefined) {
        if (parseInt(AlarmID) > 0) {
            var OutPolicetableATbody = document.getElementById("OutPlSelectContentB").getElementsByTagName("tbody")[0];
            var trs = OutPolicetableATbody.getElementsByTagName("tr");
            for (var i = 0; i < trs.length; i++) {
                var FireStationID = trs[i].getAttribute("id");//消防站ID
                //李志 通过GISID 得到有多少辆车

                var MyGISID = trs[i].getAttribute("GISID");
                var rsDemoArray1 = LineSet.filter(function (value, index, self) {
                    if (value.GISID == MyGISID) {
                        LayerSchemeeScheme.addFeatures(value);//添加线路！
                        return value;
                    }
                });
                //移除小人！
                var rsDemoArray1 = Point.filter(function (value, index, self) {
                    if (value.GISID == MyGISID) {
                        try {
                            LayerSchemeeAnimation.removeFeatures(value);//移除小人！
                        } catch (e) { }
                        return value;
                    }
                });
                //----------------------添加线路！

                var ThePoliceStateID = 61;//出警状态
                var date = new Date();//
                var ThePoliceTime = convertDateS(date);//出警时间
                var WholeMission = trs[i].getElementsByTagName("td")[4].getElementsByTagName("textarea")[0].value;//整体任务
                var nowtr = trs[i];
                var Task = WholeMission;//任务
                $.getJSON("/index/InsertOutPolice", { AlarmID: AlarmID, FireStationID: FireStationID, ThePoliceStateID: ThePoliceStateID, ThePoliceTime: ThePoliceTime, WholeMission: WholeMission }, function (data) {
                    if (data != undefined) {
                        if (parseInt(data) > 0) {
                            var ThePoliceID = parseInt(data);
                            //保存人员
                            var peopleNum = nowtr.getElementsByTagName("td")[1].getElementsByTagName("div")[0].getElementsByTagName("div");
                            if (peopleNum.length > 0) {
                                for (var j = 0; j < peopleNum.length; j++) {
                                    var FireStationPersonnelID = peopleNum[j].getAttribute("id");
                                    $.getJSON("/index/InsertOutPolicePeople", { ThePoliceID: ThePoliceID, FireStationPersonnelID: FireStationPersonnelID, Task: Task }, function (data) {
                                        insertCount += parseInt(data);
                                        if (insertCount > 0 && isShow == false) {
                                            isShow = true;
                                            //zjdmxg - 1207 10:42

                                        }
                                    });
                                    $.getJSON("/index/UpdatexPeopleStateID", { peopleID: FireStationPersonnelID }, function (data) {

                                    });
                                }
                            }
                            //保存车辆
                            var toolsCarNum = nowtr.getElementsByTagName("td")[2].getElementsByTagName("div")[0].getElementsByTagName("div");
                            if (toolsCarNum.length > 0) {
                                for (var k = 0; k < toolsCarNum.length; k++) {
                                    var carFireStationToolsID = toolsCarNum[k].getAttribute("id");
                                    $.getJSON("/index/InsertOutPoliceTools", { ThePoliceID: ThePoliceID, FireStationToolsID: carFireStationToolsID }, function (data) {
                                        insertCount += parseInt(data);
                                        if (insertCount > 0 && isShow == false) {
                                            isShow = true;
                                        }
                                    });
                                    $.getJSON("/index/carUpdatexStationStateID", { carID: carFireStationToolsID }, function (data) {

                                    });
                                }
                            }
                            //保存设备
                            var toolsNum = nowtr.getElementsByTagName("td")[3].getElementsByTagName("div")[0].getElementsByTagName("div");
                            if (toolsNum.length > 0) {
                                for (var a = 0; a < toolsNum.length; a++) {
                                    var FireStationToolsID = toolsNum[a].getAttribute("id");
                                    $.getJSON("/index/InsertOutPoliceTools", { ThePoliceID: ThePoliceID, FireStationToolsID: FireStationToolsID }, function (data) {
                                        insertCount += parseInt(data);
                                        if (insertCount > 0 && isShow == false) {
                                            isShow = true;

                                        }
                                    });
                                    $.getJSON("/index/UpdatexStationStateID", { toolsID: FireStationToolsID }, function (data) {

                                    });
                                }
                            }
                            //修改警情状态
                            $.getJSON("/index/UpdateAlarmStateID", { AlarmID: AlarmID }, function (data) {
                                insertCount += parseInt(data);
                                if (insertCount > 0 && isShow == false) {
                                    isShow = true;

                                }
                            });
                            LZDataSoure(AlarmID);
                            LZcar_animatorVector.animator.start();//开始监控
                        }
                        else {
                            alert("出警失败!")
                        }
                    }
                });
            }
        }
        CurTimeID = setInterval(function () {
            if (isShow == true) {
                clearInterval(CurTimeID);
                var MyFeat = LayerSchemeeScheme.features;
                var Nameset = [];
                //祛除重复！
                for (var i = 0; i < MyFeat.length; i++) {
                    var CurName = MyFeat[i].GISID;
                    if (Nameset.indexOf(CurName) == -1)//查看当前数组是否存在元素！ 没有的话就新增！
                    {
                        Nameset.push(CurName);
                        carStartOnFire(CurName);
                    }
                }//得到名称
            }
        }, 100);
    }
    else {
        alert("请选择警情!");
    }
}
//格式化日期字符串
function convertDateS(date) {
    //获取年份
    var year = date.getFullYear();
    //获取月份
    var month = (date.getMonth() + 1).toString();
    if (month.length < 2) month = "0" + month;
    //获取日份
    var day = date.getDate().toString();
    if (day.length < 2) day = "0" + day;
    //获取小时
    var hour = date.getHours().toString();
    if (hour.length < 2) hour = "0" + hour;
    //获取分钟
    var minute = date.getMinutes().toString();
    if (minute.length < 2) minute = "0" + minute;
    //获取秒数
    var second = date.getSeconds().toString();
    if (second.length < 2) second = "0" + second;
    //拼接日期字符串
    var date_time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return date_time
}
//车的图片
var style_car = {
    externalGraphic: "/content/images/XFZ.png",
    allowRotate: true,
    graphicWidth: 30,
    graphicHeight: 44
}

//动画效果！
function carStartOnFire(Name) {
    var MyFeat = LayerSchemeeScheme.features;
    for (var i = 0; i < MyFeat.length; i++) {

    }
    //先得到线！  可能有3天同ID 的线
    var Lin = [];
    for (var i = 0; i < MyFeat.length; i++) {
        if (MyFeat[i].GISID == Name)//同ID 的线路
        {
            Lin.push(MyFeat[i]);
        }
    }
    //得到点！  头和尾的点
    var CurStaPoint; var CurEndPoint; var LineIndes = 0;
    var LZcar_cars = [];
    for (var i = 0; i < Lin.length; i++) {
        if (Lin[i].FID == 0) {//第二个点！
            CurStaPoint = new SuperMap.Geometry.Point(Lin[i].geometry.components[1].x, Lin[i].geometry.components[1].y)
        }
        else
            if (Lin[i].FID == 1) {
                CurEndPoint = new SuperMap.Geometry.Point(Lin[i].geometry.components[1].x, Lin[i].geometry.components[1].y)
            } else {
                LineIndes = i;//得到分析线
            }
        //------------------
    }

    //针对于  分析结果来说！
    var Pointset;
    Pointset = Lin[LineIndes].geometry.components;
    var componentsLength = Pointset.length;
    if (CurStaPoint) { componentsLength + 2 }
    var timeSum = componentsLength - 1;//获取实际的总节点，因为循环是从0开始，所有要减一
    var NowSum = 100;//以自定义50秒为总数
    var single = NowSum / timeSum;//单个时间
    var SuperpositionNumber = 0;//叠加时间
    for (var i = 0; i < Pointset.length; i++) {
        if (i == 0)//第一项的时候
        {
            if (CurStaPoint)//存在的时候
            {
                var car = new SuperMap.Feature.Vector(
                             CurStaPoint,
                {
                    FEATUREID: Name,
                    TIME: SuperpositionNumber
                }, style_car
                            );
                LZcar_cars.push(car);
                SuperpositionNumber = SuperpositionNumber + single;
            }
        }
        var myPoint = new SuperMap.Geometry.Point(Pointset[i].x, Pointset[i].y)
        var car = new SuperMap.Feature.Vector(
                            myPoint,
        {
            FEATUREID: Name,
            TIME: SuperpositionNumber
        }, style_car
                           );
        LZcar_cars.push(car);
        SuperpositionNumber = SuperpositionNumber + single;
        if (i == Pointset.length - 1)//最后一项的时候
        {
            if (CurEndPoint) {
                var car = new SuperMap.Feature.Vector(
                            CurStaPoint,
                {
                    FEATUREID: Name,
                    TIME: SuperpositionNumber
                }, style_car
                           );
                LZcar_cars.push(car);
                SuperpositionNumber = SuperpositionNumber + single;
            }
        }
    }
    LZcar_animatorVector.addFeatures(LZcar_cars);
}
//————————————————————————出警End————————————————————————
//新警情点
var MyBaoJingDianbool = false;
function LZClickMaker(marker) {
    MyBaoJingDianbool = true;
    isClickYellorM = false;
    LineSet = [];//线集合
    Point = [];//小人集合

    ClearLayer();//清除我的！
    LZFireCarPointIndex = 0;//初始化索引
    LZFireCarPoint = [];
    myCarTextweight = true;//显示文字
    //需要的参数！ 
    //所有消防站的点！  得到点集合！ 

    //绑定火灾点
    if (marker.bool == true) {
        LZarrElseFindplan.x = marker.lonlat.lon;
        LZarrElseFindplan.y = marker.lonlat.lat;
    }
    else {
        LZarrElseFindplan.x = marker.getLonLat().lon;
        LZarrElseFindplan.y = marker.getLonLat().lat;
    }
    LZCurClickMarker = marker;//绑定点击的点！

    //得到点集合~~~    添加到 LZFireCarPoint
    if (SmallFireHouseLayer.markers.length > 0 || WeiXingFireHouseLayer.markers.length > 0) {
        LZFireCarPointIndex = 0;//初始化索引
        LZFireCarPoint = [];
        for (var i = 0; i < SmallFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(SmallFireHouseLayer.markers[i]);
        }
        for (var i = 0; i < WeiXingFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(WeiXingFireHouseLayer.markers[i]);
        }
        LZmeasureCompleted();//开始分析！
    }
    //~~~~~~~
}

//————————————————————————已出警Sta————————————————————————
//单击黄色点！
var ZengYuanYellow;
var isClickYellorM = false;

function LZyellowMaker(marker) {

    $('#HDXdelIssue').hide();
    $('#HDXShouDui').hide();
    $('#HDXShouDuiMian').hide();



    isClickYellorM = false;
    ZengYuanYellow = marker;
    LZFireCarPointIndex = 0;//初始化索引
    LZFireCarPoint = [];
    myCarTextweight = false;//不显示导航小人
    //绑定火灾点
    if (marker.bool == true) {
        LZarrElseFindplan.x = marker.lonlat.lon;
        LZarrElseFindplan.y = marker.lonlat.lat;
    } else {
        LZarrElseFindplan.x = marker.getLonLat().lon;
        LZarrElseFindplan.y = marker.getLonLat().lat;
    }
    LZCurClickMarker = marker;//绑定点击的点！

    var CurAlarm = marker.AlarmID;

    LZDataSoure(CurAlarm);
    //绑定出警消防站信息




    //查询已经出警了的消防站点


    //通过出警id 来查询！~~~~~~~~

    //~~~~~~~~~~~~~~~
    // 得到消防站的点！ 然后再与于地图上的点匹配！ 然后最佳路径分析 ！不要导航人！ 添加车即可！

    //var MyGISID = { ID: 0, MyPointX: 0, MyPointY: 0 };//点！

    //var SFHL = SmallFireHouseLayer.markers;//小型消防站
    //var WXFHL = WeiXingFireHouseLayer.markers;//微型消防站

    //for (var k = 0; k < MyGISID.length; i++) //得到点集合！
    //{
    //    for (var i = 0; i < SGHL.length; i++)//小型消防站
    //    {
    //        if (SGHL[i].ID = MyGISID[i].ID)//如果匹配！
    //        {
    //            MyGISID[i].MyPointX = SGHL[i].lonlat.lon;
    //            MyGISID[i].MyPointY = SGHL[i].lonlat.lat;
    //        }
    //    }

    //    for (var i = 0; i < WXFHL.length; i++)//大型消防站
    //    {
    //        if (SGHL[i].ID = MyGISID[i].ID)//如果匹配！
    //        {
    //            MyGISID[i].MyPointX = SGHL[i].lonlat.lon;
    //            MyGISID[i].MyPointY = SGHL[i].lonlat.lat;
    //        }
    //    }
    //}
    ////-------------------------------------------------上面都是为了得到点！-----------------------

    //LZmeasureCompleted();//进行路径分析
}


function LZDataSoure(CurAlarm) {
    $.getJSON("/index/SelectYellowmarker?AlarmID=" + CurAlarm, function (data) {
        // var TableTR = document.getElementById("YiChuJingTable").getElementsByTagName("tr");
        $('#YiChuJingTable tbody').html('');
        var HTML = "";
        for (var i = 0; i < data.length; i++) {
            var CurID = data[i][0];//消防站ID
            var FireName = data[i][1];//消防站名称
            var FireType = data[i][2];//消防站类别
            var FirePhone = data[i][3];//消防站电话 
            var X = data[i][4];
            var Y = data[i][5];
            var GISID = data[i][6];
            HTML += "<tr X='" + X + "'Y='" + Y + "'GISID='" + GISID + "' onclick='FireStatioGIS(this)'><td>" + FireName + "</td><td>" + FireType + "</td><td>" + FirePhone + "</td><td><a  id='" + CurID + "' onclick='weiChuJIngDanjiClick(this)'>详情</a></td></tr>";
        }
        $('#YiChuJingTable tbody').append(HTML);
    });
}


//黄色定位
function FireStatioGIS(t) {

    CloseLayerPointPopup();
    CloseFireFightingApparatusXiangQing();
    ClosefirefighterXiangQing();
    CloseZhouBian();//关闭周边分析 
    closeDialog_T();//关闭搜索警点弹窗

    var X = t.getAttribute("X");
    var Y = t.getAttribute("Y");
    var GISID = t.getAttribute("GISID");
    if (SmallFireHouseLayer.markers.length > 0 || WeiXingFireHouseLayer.markers.length > 0) {
        LZFireCarPointIndex = 0;//初始化索引
        LZFireCarPoint = [];
        for (var i = 0; i < SmallFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(SmallFireHouseLayer.markers[i]);
        }
        for (var i = 0; i < WeiXingFireHouseLayer.markers.length; i++) {
            LZFireCarPoint.push(WeiXingFireHouseLayer.markers[i]);
        }
    }

    map.setCenter(new SuperMap.LonLat(X, Y), 4);
    setTimeout(function () {
        var LZrsDemoArray1 = LZFireCarPoint.filter(function (value, index, self) {
            return value.GISID == GISID;
        });
        LZrsDemoArray1[0].bool = true;
        OpenZhanDianMessagepopupss1(LZrsDemoArray1[0]);
    }, 500);

}

function LZfeaturerendered(feature) {
    var time = parseInt(LZcar_animatorVector.animator.getCurrentTime());
    if (time <= 5) {
        document.getElementById('iTunes_LT').pause();//暂停
    }
}

//————————————————————————已出警End————————————————————————
//**********************************************李志******************************


//===============报警点收队 ===============
var DataZhiHuiGuan, CommanderID;
$(document).ready(function () {
    //下拉框
    $.getJSON("/index/SelectXiaoFanDenJi", function (data) {
        if (data.length > 0) {
            var ComboBox, Option;
            for (var i = 0; i < data.length ; i++) {
                ComboBox = document.getElementById('FireGrade');
                Option = document.createElement("option");
                Option.text = data[i].PropertyDetailMC;
                Option.value = data[i].PropertyDetailID;
                ComboBox.appendChild(Option);
            } 
            var province = data[3].PropertyDetailID;
            $("#FireGrade option[value='" + province + "']").attr("selected", true);

        }
    })
    //从sql获取数据指挥官
    $.post("/index/SelectFireStationPersonnel", function (data) { DataZhiHuiGuan = data });

    //获取指挥官
    $("#Commander").click(function () {
        TeCommander();
    });
    //时间限制
    var EndOfProcessingTime = {
        elem: '#EndOfProcessingTime',//需显示日期的元素选择器
        start: laydate.now(),  //开始日期
        format: 'YYYY-MM-DD hh:mm:ss',//日期格式
        min: laydate.now(parseInt(laydate.now()) - parseInt(TimeFrist)), //最小日期
        max: laydate.now(), //最大日期
        istime: true,//是否开启时间选择
        istoday: false,//是否显示今天
        issure: true, //是否显示确认
        isclear: false //是否显示清空 
    };
    var TheClosingTime = {
        elem: '#TheClosingTime',//需显示日期的元素选择器
        start: laydate.now(),  //开始日期
        format: 'YYYY-MM-DD hh:mm:ss',//日期格式
        min: laydate.now(parseInt(laydate.now()) - parseInt(TimeFrist)), //最小日期
        max: laydate.now(), //最大日期
        istime: true,//是否开启时间选择
        istoday: false,//是否显示今天
        issure: true, //是否显示确认
        isclear: false //是否显示清空 
    };
    laydate(EndOfProcessingTime);
    laydate(TheClosingTime);

});
var get = {
    byClass: function (sClass, oParent) {
        var aClass = [];
        var reClass = new RegExp("(^| )" + sClass + "( |$)");
        var aElem = this.byTagName("*", oParent);
        for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
        return aClass
    },
    byTagName: function (elem, obj) {
        return (obj || document).getElementsByTagName(elem)
    }
};
/*-------------------------- +
  拖拽函数
 +-------------------------- */
function ShoDuiTangKang(oDrag, handle) {
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
function addShoDuiTangKangBase() {
    var oDrag = document.getElementById("ShoDuiTangKang");
    var oTitle = get.byClass("BJDXXHeal", oDrag)[0];
    ShoDuiTangKang(oDrag, oTitle);
    oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 - 10 + "px";
    oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 - 50 + "px";
}
var TimeFrist;
//冒泡里的按钮点击事件
function QiPaojihe() {
    boolOpenNew = false;
    $('#ShoDuiTangKang_div').show();
    $('#ShoDuiTangKang').show();
    addShoDuiTangKangBase();
    //清除图片
    $("#ImageBox").html('<li>请选择图片</li>');
    //清空
    $("#FireSite").val('');//起火部位
    $("#BurningArea").val('');//燃烧面积
    $("#EndOfProcessingTime").val('');//处理结束时间
    $("#Commander").val('');//指挥官
    $("#TheNumberOfPolice").val('');//出警人数
    $("#NumberOfCasualties").val('');//伤员人数
    $("#DeathToll").val('');//死亡人数
    $("#EconomicLoss").val('');//经济损失
    $("#DutyOfficer").val('');//负责人
    $("#FireRelatedPersonnel").val('');//起火相关人员
    $("#CauseOfFire").val('');//起火原因
    $("#ProcessingReport").val('');//灾情处理报告
    $("#FireResponsibilityAndHandling").val('');//火灾责任及处理
    //获取现在时间
    getFormat();
    //绑定
    TimeFrist = LZCurClickMarker.ReportTime;

    $("#HAddress").text(LZCurClickMarker.AddressOfTheCrime);//地址
    $("#IncidentUnit").val(LZCurClickMarker.AlarmTitle);//事发单位
    $("#TimeOfTheIncident").val(LZCurClickMarker.ReportTime);//案发时间
    $("#EndOfProcessingTime").val(format);//赋初始值
    $("#TheClosingTime").val(format);//赋初始值
    $.post("/index/SelectRenShu", { AlarmID: parseInt(LZCurClickMarker.AlarmID) }, function (data) {
        var renshu = data.length;
        $("#TheNumberOfPolice").val(renshu);//赋初始值
    });
}
//关闭收队
function CloseWin() {
    boolOpenNew = true;
    $('#ShoDuiTangKang_div').hide();
    $('#ShoDuiTangKang').hide();
}
//关闭指挥人员table
function ClosedCom() {
    $('#commandertable').hide();
}
var format = "";//全局变量 
function getFormat() {
    format = "";
    var nTime = new Date();
    format += nTime.getFullYear() + "-";
    format += (nTime.getMonth() + 1) < 10 ? "0" + (nTime.getMonth() + 1) : (nTime.getMonth() + 1);
    format += "-";
    format += nTime.getDate() < 10 ? "0" + (nTime.getDate()) : (nTime.getDate());
    format += " ";
    format += nTime.getHours() < 10 ? "0" + (nTime.getHours()) : (nTime.getHours());
    format += ":";
    format += nTime.getMinutes() < 10 ? "0" + (nTime.getMinutes()) : (nTime.getMinutes());
    format += ":";
    format += nTime.getSeconds() < 10 ? "0" + (nTime.getSeconds()) : (nTime.getSeconds());
}
//收队重置
function ResetShouDui() {
    if (confirm('是否清空您所填写的内容?')) {
        //清除图片
        $("#ImageBox").html('<li>请选择图片</li>');
        //$("#IncidentUnit").val(''); //事发单位
        //$("#TimeOfTheIncident").val('');//案发时间
        $("#FireSite").val('');//起火部位
        $("#BurningArea").val('');//燃烧面积
        $("#EndOfProcessingTime").val('');//处理结束时间
        $("#Commander").val('');//指挥官
        $("#TheNumberOfPolice").val('');//出警人数
        $("#NumberOfCasualties").val('');//伤员人数
        $("#DeathToll").val('');//死亡人数
        $("#EconomicLoss").val('');//经济损失
        $("#DutyOfficer").val('');//负责人
        $("#FireRelatedPersonnel").val('');//起火相关人员
        $("#CauseOfFire").val('');//起火原因
        $("#ProcessingReport").val('');//灾情处理报告
        $("#FireResponsibilityAndHandling").val('');//火灾责任及处理
    }
}
//获取指挥官
function TeCommander() {
    var testdiv = document.getElementById("commander");
    var textinnerHTML = "";
    textinnerHTML += "<div id='commandertable' style='position:absolute;left:91px;top:222px;width:300px;height:250px;border:1px solid #3586D7;background:#fff;'>";
    textinnerHTML += "<div id='commandertable_title' style='width:100%;height:25px;background:#3586D7;position: relative;text-align: center;'>";
    textinnerHTML += "<span>选择指挥官</span><div  id='closedCom' onclick='ClosedCom()'></div>";
    textinnerHTML += "</div>";
    //textinnerHTML += "<table  style='float:left;width:100%;height:20px;margin-bottom: 0px;' class='table table-bordered table-hover table-striped table-bordered BasicTable'>";
    //textinnerHTML += "<tr><th style='width:15%;'>编号</th><th style='width:25%;'>姓名</th><th style='width:15%;'>性别</th><th style='width:45%;'>手机号码</th></tr>";
    //textinnerHTML += "</table >";
    textinnerHTML += "<div style='float:left;width:100%;height:222px;padding:0px;overflow:auto;'>";
    textinnerHTML += "<table id='tbCommander' class='table table-bordered table-hover table-striped table-bordered BasicTable' style='float:left;width:100%;height:220px;'> <thead><tr><th style='width:15%;'>编号</th><th style='width:25%;'>姓名</th><th style='width:15%;'>性别</th><th style='width:45%;'>手机号码</th></tr> </thead>";
    textinnerHTML += "</table >";
    textinnerHTML += "</div>";
    textinnerHTML += "</div>";
    testdiv.innerHTML = textinnerHTML;
    if (DataZhiHuiGuan.length != 0) {
        $("#tbCommander tr:gt(0)").remove();//清除重复数据
        var table = document.getElementById("tbCommander");
        for (var i = 0; i < DataZhiHuiGuan.length; i++) {
            var tr = table.insertRow(i);
            var tdbianhao = tr.insertCell(0);
            var tdname = tr.insertCell(1);
            var tdxinbie = tr.insertCell(2);
            var tdPhone = tr.insertCell(3);
            tdbianhao.innerHTML = i + 1;
            tdname.innerHTML = DataZhiHuiGuan[i].PersonnelMC;
            tdxinbie.innerHTML = DataZhiHuiGuan[i].PropertyDetailMC;
            tdPhone.innerHTML = DataZhiHuiGuan[i].Phone;
            table.appendChild(tr);//将行添加到table 
            tr.personnel = DataZhiHuiGuan[i].PersonnelMC;
            tr.personnelid = DataZhiHuiGuan[i].PersonnelID;
            tr.onclick = function () {//行点击事件
                //将数据绑定到文本框
                var txtZFG = document.getElementById('Commander');
                txtZFG.value = "";
                txtZFG.value = this.personnel;
                CommanderID = this.personnelid;
                ClosedCom();
            }
        }
    } else {
        $("#tbEmp tr:gt(0)").remove();
    }
}
//确认收队
function FunctinoShouDui() {
   
    if (CommanderID != "" && $('#NumberOfCasualties').val() != "") {
        $.post("/index/ShouDuiIndert", {
            AlarmID: parseInt(nowSelectAlarm.AlarmID),//警情ID
            CommanderID: parseInt(CommanderID), //指挥官 document.getElementById('Commander').value
            FireGradeID: $("#FireGrade option:selected").val(),//消防等级id
            IncidentUnit: $('#IncidentUnit').val(),//单位名称
            FireSite: $('#FireSite').val(),//起火部位
            BurningArea: $('#BurningArea').val(),//燃烧面积
            TimeOfTheIncident: $('#TimeOfTheIncident').val(),//案发时间
            EndOfProcessingTime: $('#EndOfProcessingTime').val(),//扑灭时间
            TheClosingTime: $('#TheClosingTime').val(),//结案时间
            TheNumberOfPolice: $('#TheNumberOfPolice').val(),//出动警力
            NumberOfCasualties: $('#NumberOfCasualties').val(),//伤员人数
            DeathToll: $('#DeathToll').val(),//死忙人数
            EconomicLoss: $('#EconomicLoss').val(),//经济损失
            CauseOfFire: $('#CauseOfFire').val(),//起火原因
            ProcessingReport: $('#ProcessingReport').val(),//灾情报告
            FireRelatedPersonnel:"" ,//调查人员 $('#FireRelatedPersonnel').val()
            FireResponsibilityAndHandling: $('#FireResponsibilityAndHandling').val()//火灾责任及处理
        }, function (data) {
          
            if (data[0].status == "ok") {
                ClosedID = data[0].ClosedID;
                nowSelectAlarm.AlarmStateID = 12;
                for (var i = 0; i < moderateMarkerLayer.markers.length; i++) {
                    var moderateMarker = moderateMarkerLayer.markers[i];
                    if (moderateMarker.AlarmID == nowSelectAlarm.AlarmID) {
                        moderateMarkerLayer.removeMarker(moderateMarker);//移除选中警灯标记
                       
                        //添加处理完
                        addEnterpriseMarker(moderateMarker.AddressOfTheCrime, moderateMarker.ReportTime, moderateMarker.AlarmDescribe, moderateMarker.AlarmSourceTypeMC, moderateMarker.AlarmSourceTypeID, moderateMarker.AlarmTypeMC, moderateMarker.FireResistanceGradeMC, moderateMarker.AlarmTitle,
                            moderateMarker.AlarmID, 12, moderateMarker.AlarmNumber1, moderateMarker.XCoordinate, moderateMarker.YCoordinate, true, data[0].EndOfProcessingTime, data[0].FireGrade, "");
                       
                        break;
                    }
                }
               
              

                var features = [];//保存图层的图案
                //标记物图层
                var fieldNames = [];
                var fieldValues = [];
                var x = nowSelectAlarm.x;
                var y = nowSelectAlarm.y;

                var point = new SuperMap.Geometry.Point(x, y);//创建一个点图层
                var pointVector = new SuperMap.Feature.Vector(point);
                var geometry = pointVector.geometry;
                //获取方案ID和图层类型
                fieldNames.push('AlarmID');
                fieldValues.push(nowSelectAlarm.AlarmID);
                features.push({
                    fieldNames: fieldNames,//保存数据字段名称
                    fieldValues: fieldValues,//保存数据
                    geometry: geometry//保存的集合图像
                });
                var editFeatureParameter, editFeatureService;
                editFeatureParameter = new SuperMap.REST.EditFeaturesParameters({
                    features: features,//当前需要创建或者是修改的要素集。
                    isUseBatch: false,//是否使用批量添加要素功能，要素添加时有效。
                    editType: SuperMap.REST.EditType.ADD,//要素集更新类型(add、update、delete)，
                    returnContent: true
                });
                editFeatureService = new SuperMap.REST.EditFeaturesService(urldataAlarm, {
                    eventListeners: {
                        "processCompleted": addFeaturesProcessCompleted,//成功
                        "processFailed": processFailedAddMap//失败
                    }
                });
                editFeatureService.processAsync(editFeatureParameter);
                CloseWin();

                indexFiles = 0;
                sumFilesCount = 0;
                if ($("#HuoZaiMiageBtn").get(0).files.length>0) {
                    sumFilesCount = parseInt($("#HuoZaiMiageBtn").get(0).files.length);
                    uploadFile();
                }
                alert("收队成功");
            }
            else {
                alert("收队失败");
            }
        });
    } else {
        alert("请填写完数据！！")
    }
}




//保存到地图方案成功回调方法
function addFeaturesProcessCompleted(editFeaturesEventArgs) {
    
    //失败不做处理
}
//保存到地图方案失败回调方法
function processFailedAddMap(e) {
  
    //失败不做处理
}



//图片选择路径操作完毕的事件
function nexthuoqu() {
    getFiles();
}
var uploadImgArr = [];//定义存放图片对象的数组
//定义获取图片信息的函数
function getFiles(e) {
    var imageBox = document.getElementById("ImageBox");
    imageBox.innerHTML = "";
    e = e || window.event;
    var files = e.target.files,//获取file input中的图片信息列表
    reg = /image\/.*/i;//验证是否是图片文件的正则
    //console.log(files);
    for (var i = 0, f; f = files[i]; i++) {
        //判断是否是图片类型，不是则跳出 **把这个if判断去掉后，也能上传别的文件
        if (!reg.test(f.type)) {
            imageBox.innerHTML += "<li>你选择的" + f.name + "文件不是图片</li>";
            continue; //跳出循环
        }
        var reader = new FileReader();//类似于原生JS实现tab一样（闭包的方法）
        reader.onload = (function (file) {
            //获取图片相关的信息
            var newtime = "";
            var NTime = new Date();
            newtime += NTime.getFullYear();
            newtime += (NTime.getMonth() + 1) < 10 ? "0" + (NTime.getMonth() + 1) : (NTime.getMonth() + 1);
            newtime += NTime.getDate() < 10 ? "0" + (NTime.getDate()) : (NTime.getDate());
            newtime += NTime.getHours() < 10 ? "0" + (NTime.getHours()) : (NTime.getHours());
            newtime += NTime.getMinutes() < 10 ? "0" + (NTime.getMinutes()) : (NTime.getMinutes());
            newtime += NTime.getSeconds() < 10 ? "0" + (NTime.getSeconds()) : (NTime.getSeconds());
            newtime += NTime.getMilliseconds < 10 ? "0" + (NTime.getMilliseconds()) : (NTime.getMilliseconds());
            var fileSize = (file.size / 1024).toFixed(2) + "K",
            fileName = newtime;//+file.name;//时间+图片名 
            return function (e) {
                var img = new Image();
                img.src = e.target.result;
                imageBox.innerHTML += "<li><img src='" + e.target.result + "' alt='" + fileName + "' title='" + fileName + "'/><label> 名称：" + fileName + ";<br/>大小：" + fileSize + "</label></li>";
            }
        })(f);
        reader.readAsDataURL(f); //读取文件内容
    }
}

//上传图片
var indexFiles = 0;
var sumFilesCount = 0;
var ClosedID = 0;
var okCountFiles = 0;
var onCountFiles = 0;
//上传文件方法
function uploadFile() {
    var file = $("#HuoZaiMiageBtn").get(0).files[indexFiles];
    var form = new FormData();//实例化上传方法
    form.append("fileToUpload", file);//赋值 文件
    form.append("ClosedID", ClosedID);
    var xhr = new XMLHttpRequest();//
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "/index/ShouDuiIndertFile");
    xhr.send(form);
}

//开始上传
function uploadProgress(evt) {
    //不做处理
}
//上传完成方法
function uploadComplete(evt) {
    if (indexFiles < sumFilesCount - 1) {
        indexFiles++;
        uploadFile();
    }
    okCountFiles++;
    if ((okCountFiles + onCountFiles) == sumFilesCount - 1) {
        if (onCountFiles == 0) {
            //图片上传全部成功不做处理
            //   alert('图片全部上传成功!');
        } else {
            if (okCountFiles == 0) {
                //图片上传全部失败
                alert('图片全部上传成功!');
            } else {
                alert('图片上传成功' + okCountFiles + '张，失败' + onCountFiles + '张!');
            }
        }
    }
}
//上传出错方法
function uploadFailed(evt) {
    if (indexFiles < sumFilesCount - 1) {
        indexFiles++;
        uploadFile();
    }
    onCountFiles++;
    if ((okCountFiles + onCountFiles) == sumFilesCount) {
        if (onCountFiles == 0) {
            //图片上传全部成功不做处理
            // alert('图片全部上传成功!');
        } else {
            if (okCountFiles == 0) {
                //图片上传全部失败
                alert('图片全部上传失败!');
            } else {
                alert('图片上传成功' + okCountFiles + '张，失败' + onCountFiles + '张!');
            }
        }
    }
}
function uploadCanceled(evt) {
    alert('提示', '图片上传已由用户或浏览器取消删除连接！');
}

//>>>>>>>>>>>>>>>>>>>>>报警点收队>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>