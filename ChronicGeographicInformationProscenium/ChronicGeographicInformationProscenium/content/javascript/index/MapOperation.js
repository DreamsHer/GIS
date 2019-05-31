//鹰眼
function mapOverviewMap(t) {
    var indexTyep = parseInt($(t).attr('indexTyep'));

    if (indexTyep == 0) {
        $(t).attr('title', '显示鹰眼');
        $(t).attr('indexTyep', 1);
        //  $(document.getElementById('SuperMap.Control.OverviewMap_11')).hide();
        $('.smControlOverviewMap').hide();
    } else {
        $(t).attr('title', '隐藏鹰眼');
        $(t).attr('indexTyep', 0);
        //    $(document.getElementById('SuperMap.Control.OverviewMap_11')).show();
        $('.smControlOverviewMap').show();
    }

    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
}


//地图类型切换
function mapType(t) {
    var indexTyep = parseInt($(t).attr('indexTyep'));

    if (indexTyep == 0) {
        //加载卫星图

        $(t).find('a').css('background-image', 'url(/content/images/toolIco/nanshang22.PNG)');
        $(t).find('a').text('行政图');
        $(t).attr('indexTyep', 1);
        $(t).attr('title', '切换到行政图');
        //layer.setVisibility(true);
        //baseLayer.setVisibility(false);
        baseLayer.bool = true;
        layer.bool = false;
        map.setBaseLayer(baseLayer);

    } else if (indexTyep == 1) {
        //加载行政图

        $(t).attr('indexTyep', 0);
        $(t).find('a').css('background-image', 'url(/content/images/toolIco/weixingtu.PNG)');
        $(t).find('a').text('卫星图');
        $(t).attr('title', '切换到卫星图');
        //layer.setVisibility(false);
        //baseLayer.setVisibility(true);
        baseLayer.bool = false;
        layer.bool = true;
        map.setBaseLayer(layer);
    }
    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
}
//根据图层更改图层顺序
function updateLayerIndex(LayerNmae) {
    //要把操作的图层放在最上层才可以操作
    map.setLayerIndex(LayerNmae,//要改变索引值的图层
        1);//指定的索引值。
}

//管辖区域
function ShowDominationArea(t) {

    GBTC(); GB();
    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
    $('.rides-cs1').show();
    $('#ContentView').animate({ width: '300px', opacity: 'show' }, 'normal', function () {
        $('#ContentView').show();
    });
    $('#supervise_Show').attr('style', 'display:none');
    $('#supervise_Hide').attr('style', 'display:block');

    var ZhongXinDian = JieShouDeX + "," + JieShouDeY;
    $("#ZhongXinDian").val(ZhongXinDian);
}
//截图
function mapScreenshot(t) {
    //setTimeout(function () {
    //    $(t).removeClass('active');
    //}, 100);
    //layer.isBaseLayer = false;
    //baseLayer.isBaseLayer = false;
    //map.allOverlays = false;
    //var CurZoom = parseInt(map.getZoom());//getZoom() 获取当前地图的缩放比例级别。
    //if (CurZoom >= 4) {
    //    MapToImg && MapToImg.excute(map);
    //} else {
    //    MapToImg && MapToImg.excute(map);
    //}
    //$("#supervise_Hide").click();
    //$("#aFloatTools_Hide").click();
    $('.rides-cs1').show();
    $('.rides-cs').show();
    $('#map_bottom').hide();
    $('#LZReaShow').hide();
}
//打印
function mapStamp(id) {
    setTimeout(function () {
        $('.toolLi').removeClass('active');
    }, 100);
    var broz = SuperMap.Browser.name;
    if (broz == 'msie' && parseInt(SuperMap.Browser.version) < 9) {
        alert("ie9版本以下部分打印功能不支持");
        return;
    }
    var printWindow = window.open("");
    var strInnerHTML = document.getElementById(id).innerHTML;//获取地图的链接

    var strHeader = "<!DOCTYPE html><html><head><META HTTP-EQUIV='pragma' CONTENT='no-cache'><META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'><META HTTP-EQUIV='expires' CONTENT='Wed, 26 Feb 1997 08:21:57 GMT'><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /><meta name='apple-mobile-web-app-capable' content='yes' /><title>地图打印</title>";
    var strCSS = "<link href='/SuperMap/theme/default/style.css' rel='stylesheet'><link href='/SuperMap/css/sm-doc.css' rel='stylesheet' />";
    var strScript = "<script src='/SuperMap/js/jquery.js'><\/script><script type = 'text/javascript'>" + "\n" + "function printDiv(){$('.newuiPrint').css({'display':'none'});window.print();$('.newuiPrint').css({'display':'block'});}<\/script>";
    var strBody = "</head><body><div class='print-header'><div class='superD'><h3 style='margin-top:-10px;'>地图预览</h3></div><div id='" + id + "' >" + strInnerHTML + "</div><div id='superft'><div class='printClose'>" + "<span class='newuiPrint' onclick = 'printDiv()'></span></div></div></div></body></html>";

    var strHTML = strHeader + strCSS + strScript + strBody;
    printWindow.document.write(strHTML);//打印窗口显示内容
    printWindow.document.close();

    function onloadHTML() {
        if (printWindow.document.getElementById(id) != null && printWindow.document.getElementById(id).children.length > 0) {
            var strDOM = printWindow.document.getElementById(id).children[0].children;
            for (var i = 0, length = strDOM.length; i < length ; i++) {
                var idStr = strDOM[i].id;
                if (idStr.indexOf("SuperMap.Control.ScaleLine") == -1 && idStr.indexOf("SuperMap.Map") == -1) {
                    strCss = strDOM[i].style.cssText;
                    strCss = strCss + "display: none;";
                    strDOM[i].style.cssText = strCss;
                }
            }

            var canvasPrint = printWindow.document.getElementsByTagName("canvas");
            var canvasMap = document.getElementsByTagName("canvas");
            for (var i = 0, length = canvasPrint.length; i < length; i++) {
                pasteCanvas(canvasMap[i], canvasPrint[i]);
            }
        }
    }
    if (broz == 'firefox') {
        printWindow.onload = onloadHTML;
    } else if (broz == 'safari' || broz == 'chrome' || broz == 'msie') {
        window.setTimeout(onloadHTML, 50);
    }

}
//如果涉及到Canvas的图层打印，需要将范例发布出来运行，否则会产生跨域的问题
function pasteCanvas(sCanvas/*source*/, dCanvas/*destination*/) {
    var w = sCanvas.width,
            h = sCanvas.height;
    dCanvas.width = w;
    dCanvas.height = h;
    var viewerImageSrc = sCanvas.toDataURL("image/png");
    var viewerImage = new Image();
    viewerImage.src = viewerImageSrc;
    var dContext = dCanvas.getContext("2d");
    dContext.drawImage(viewerImage, 0, 0, w, h);
}

//统计图
function ShowStatistics(t) {
    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
    $.getJSON("/index/StatisticsSelect", function (data) {
        document.getElementById("XiaoFangZhangDian").innerHTML = data.XiaoFangZhanDian.length + "个";
        document.getElementById("XianFangChe").innerHTML = data.XiaoFangCar.length + "辆";
        document.getElementById("XiaoFangGongJu").innerHTML = data.XiaoFangTool.length + "个";
        document.getElementById("MonthAnQing").innerHTML = data.MoonXiaoFangAnQing.length + "起";
        //设置被拖拽div的位置
        $('#TongJiTangWindow').attr("style", ' top: 0, right:43px;');

        $('#TongJiTangWindow').show('fast');
    });


}
function CloseTongJiTu() {
    $('#TongJiTangWindow').hide('fast');
}//关闭统计图






//@@@@@@@@@@@@@@@@@@@@@@@@@@统计窗体拖动代码@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//拖拽
function dragAndDrop() {
    var _move = false;//移动标记
    var _x, _y;//鼠标离控件左上角的相对位置
    $("#TongJiTuTatle").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#TongJiTangWindow").css("left"));
        _y = e.pageY - parseInt($("#TongJiTangWindow").css("top"));
        $("#TongJiTuTatle").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#TongJiTangWindow").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#TongJiTangWindow").css("height"));
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
            $("#TongJiTangWindow").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        _move = false;
        $("#TongJiTuTatle").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@图层控制器窗体拖动代码@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//拖拽
function dragAndDrop1() {
    var ifmove = false;//判断是否移动
    var x1, y1;//鼠标离控件左上角的相对位置
    $("#LayerControllerTitle").mousedown(function (e) {
        ifmove = true;
        x1 = e.pageX - parseInt($("#LayerController").css("left"));
        y1 = e.pageY - parseInt($("#LayerController").css("top"));
        $("#LayerControllerTitle").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (ifmove) {
            var x = e.pageX - x1;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - y1;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#LayerController").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#LayerController").css("height"));
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
            $("#LayerController").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        ifmove = false;
        $("#LayerControllerTitle").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@消防设备详情体拖动代码@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function dragAndDrop2() {
    //cursor: move;
    var ifmove = false;//判断是否移动
    var x1, y1;//鼠标离控件左上角的相对位置
    $("#FireFightingApparatusXiangQingTatle").mousedown(function (e) {
        ifmove = true;
        x1 = e.pageX - parseInt($("#FireFightingApparatusXiangQing").css("left"));
        y1 = e.pageY - parseInt($("#FireFightingApparatusXiangQing").css("top"));
        $("#FireFightingApparatusXiangQingTatle").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (ifmove) {
            var x = e.pageX - x1;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - y1;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#FireFightingApparatusXiangQing").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#FireFightingApparatusXiangQing").css("height"));
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
            $("#FireFightingApparatusXiangQing").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        ifmove = false;
        $("#FireFightingApparatusXiangQingTatle").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@消防人员详情体拖动代码@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function dragAndDrop3() {
    //cursor: move;
    var ifmove = false;//判断是否移动
    var x1, y1;//鼠标离控件左上角的相对位置
    $("#firefighterTatle").mousedown(function (e) {
        ifmove = true;
        x1 = e.pageX - parseInt($("#firefighterXiangQing").css("left"));
        y1 = e.pageY - parseInt($("#firefighterXiangQing").css("top"));
        $("#firefighterTatle").fadeTo(20, 0.5);//点击开始拖动并透明显示
    });

    $(document).mousemove(function (e) {
        if (ifmove) {
            var x = e.pageX - x1;//移动时鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - y1;
            var Left = parseInt($("#content").css("left"));
            var top = parseInt($("#content").css("top"));
            var right = parseInt($("#content").css("right"));
            var width = parseInt($("#content").css("width"));
            var width1 = parseInt($("#firefighterXiangQing").css("width"));
            var height = parseInt($("#content").css("height"));
            var height1 = parseInt($("#firefighterXiangQing").css("height"));
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
            $("#firefighterXiangQing").css({ top: y, left: x });//控件新位置
        }
    }).mouseup(function () {
        ifmove = false;
        $("#firefighterTatle").fadeTo("fast", 1);//松开鼠标后停止移动并恢复成不透明
    });
}

//图层控制
function mapLayerControl(t) {
    $("#LayerController").css({ top: 0 + "px", left: 76 + "px" });
    $("#LayerController").show("fast");
    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
}
function CloseLayerController(t) {
    $("#LayerController").hide("fast");
}
//-----------------------------------------图层选择事件--------------------------------------------
var HospatilLayer = new SuperMap.Layer.Markers("医院");
var PharmacyLayer = new SuperMap.Layer.Markers("药店");
var PoliceSubstationLayer = new SuperMap.Layer.Markers("公安派出所");
var illnessCaseLayer = new SuperMap.Layer.Markers("病例分布热点图");
var PathogenicGene = new SuperMap.Layer.Markers("病原基因分布散点图");


var illActivity = new SuperMap.Layer.Vector("活动路径图");
var illActivit = new SuperMap.Layer.Markers("路径图标");

var LayerPopul;//信息气泡
function ClickHospatilLayer(e)//选择医院站图层
{

    if (e.checked == true) {

        HospatilLayer.setVisibility(true);
    }
    else {
        CloseLayerPointPopup();
        HospatilLayer.setVisibility(false);
    }

}


function ClickPharmacyLayer(e)//选择药店图层
{
    if (e.checked == true) {

        PharmacyLayer.setVisibility(true);
    }
    else {
        CloseLayerPointPopup();
        PharmacyLayer.setVisibility(false);

    }

}

function ClickillnessCaseLayer(e)//关闭病例分布热点图
{
    if (e.checked == true) {

        illnessCaseLayer.setVisibility(true);
    }
    else {
        CloseLayerPointPopup();
        illnessCaseLayer.setVisibility(false);

    }
}
function ClickPathogenicGene(e)//关闭病原基因上分布热点图
{
    if (e.checked == true) {

        PathogenicGene.setVisibility(true);
    }
    else {
        CloseLayerPointPopup();
        PathogenicGene.setVisibility(false);

    }
}

function ClickillActivity(e)//关闭病例活动路径图
{
    if (e.checked == true) {

        illActivity.setVisibility(true);
        illActivit.setVisibility(true);
    }
    else {
        CloseLayerPointPopup();
        illActivity.setVisibility(false);
        illActivit.setVisibility(false);
    }
}




function ClickSheQuWeb(e)//选择网图层
{
    if (e.checked == true) {
        vectorLayer_WG.setVisibility(true);
    }
    else {
        vectorLayer_WG.setVisibility(false);
    }
}
function ChaXunYiYuan()//定位医院站点
{
    $.post("/Main/SelectHospatil", function (data) {
        if (data.length > 0) {
            var YiYuanJiHe = [];//医院集
            for (var i = 0; i < data.length; i++) {
                YiYuanJiHe.push(data[i].HospitalName);
            }
            var queryParam, queryBySQLParams, queryBySQLService;
            queryParam = new SuperMap.REST.FilterParameter({
                name: "P15医疗服务_point_1_1@GuangZhouCongHua_Data#1",
                attributeFilter: "NAME like '%" + "医院" + "%' or NAME like '%" + "卫生站" + "%'"
            });
            queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
                queryParams: [queryParam]
            });
            queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
                eventListeners: { "processCompleted": Showlandmark, "processFailed": processFailed }
            });
            queryBySQLService.processAsync(queryBySQLParams);
        }
    });


}
//医院详细信息
function XiangXiXinXi() {

    XianShiYouCe();

    $("#accordion_result").append('<form class="form-horizontal">   <div class="row">   <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>名称</b>：</label>   <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.dbHospatil.HospitalName + '</b></label> </div>  </div>  <div class="row">     <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>地址：</label> <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.dbHospatil.HospitalAdress + '</b></label>  </div> </div>  <div class="row"> <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>级别：</b></label>  <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.dbHospatil.GradeName + '</b></label>  </div> </div>  <div class="row">   <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>附属医院：</b></label>   <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.Count + '个</b></label> </div>  </div>   <div class="row">    <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>分类：</b></label>   <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b> 医疗诊所 </b></label>  </div> </div>   <div class="row">    <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>电话：</b></label>   <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.dbHospatil.HospitalTlephone + '</b> </label> </div>  </div>    <div class="row">   <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>服务人数：</label>   <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.dbHospatil.ServiceNumber + ' </b></label>  </div> </div> <div class="row">     <label class="control-label col-lg-4 col-sm-4 col-md-4 col-xs-4" style="color:blue"><b>状态：</b></label>   <div class="col-lg-8 col-sm-8 col-md-8 col-xs-8"> <label class="control-label"><b>' + ShuJu.dbHospatil.ServiceStateIName + '</b> </label>  </div>  </div> </form>');



}






//关闭右侧
function GuanBiYouCe() {
    $('.rides-cs').hide();
    $('#divFloatToolsView').animate({ width: '300px', opacity: 'hide' }, 'normal', function () {
        $('#divFloatToolsView').hide();
    });
    $("#accordion_result").empty();
}
//显示右侧
function XianShiYouCe() {
    $('.rides-cs').show();
    $('#divFloatToolsView').animate({ width: '300px', opacity: 'show' }, 'normal', function () {
        $('#divFloatToolsView').show();
    });
    $("#accordion_result").empty();
}
var ID;
function DianJi(id) {
    if (ID != undefined) {
        var IsTrue = $("#" + id).val();
        if (($("#1").val() == "true" && id != "1") || ($("#2").val() == "true" && id != "2")) {
            alert("路径只能选择一个！！！！！", { icon: 0, title: "提示：" });
            $("#" + id).removeAttr("checked");

            return;

        }
    }
    if (IsTrue == "true") {
        $("#" + id).val(false);


    }
    else {
        $("#" + id).val(true);

    }
    ID = id;
}
//查询路径
function ChaXun() {

    illActivity.removeAllFeatures();
    illActivit.clearMarkers();
    var DengJiHao = $("#DengJiNumber").find("option:selected").text();
    var KaiShiShiJian = $("#KaiShiShiJian").val();
    var JieShuShiJian = $("#JieShuShiJian").val();

    var NianLing = $("#NianLing").val();
    var Sex = $("#Sex").find("option:selected").text()
    var DiseaseID = $("#JiBing").val();

    if (ID > 0) {


        $.post("/Main/SelectPath?KaiShi=" + KaiShiShiJian + "&JieShu=" + JieShuShiJian + "&DengJiHao=" + DengJiHao + "&NianLing=" + NianLing + "&Sex=" + Sex + "&DiseaseID=" + DiseaseID + "&ID=" + ID, function (data) {
            if (data.length > 0) {
                var StX; var StY;
                var EnX; var EnY;


                if (data.length > 1) {

                    for (var i = 0; i < data.length; i++) {
                        StX = data[i].XCoordinate;
                        StY = data[i].YCoordinate;
                        var size = new SuperMap.Size(18, 20),
                          offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                         icon = new SuperMap.Icon("/SuperMap/images/maker_L _Red2.png", size, offset);
                        var SuperMapLonLat = new SuperMap.LonLat(StX, StY);
                        var SuperMapMarker = new SuperMap.Marker(SuperMapLonLat, icon);
                        illActivit.addMarker(SuperMapMarker);
                        if (data.length > 1 && i + 1 != data.length) {
                            EnX = data[i + 1].XCoordinate;
                            EnY = data[i + 1].YCoordinate;

                            if (EnX != undefined && EnY != undefined) {
                                var start = new SuperMap.Geometry.Point(StX, StY);
                                var end = new SuperMap.Geometry.Point(EnX, EnY);
                                var line = new SuperMap.Geometry.LineString([start, end]);
                                var lineVector = new SuperMap.Feature.Vector(line);

                                //var circleVector1 = new SuperMap.Feature.Vector(line);

                                lineVector.style = {
                                    strokeColor: "#00ffff",
                                    fillColor: "#DC143C",
                                    strokeWidth: 2,
                                    fillOpacity: 0,
                                    label: data[i].Activitytime,
                                    fontColor: "#FF3300",
                                    fontWidth: 1,
                                };
                                illActivity.addFeatures([lineVector]);
                            }

                        }
                        //var centerPoint1 = new SuperMap.Geometry.Point(x, y);

                        //polygonLayer.addFeatures([circleVector1]);

                    }

                }
            }

        });

    } else {
        alert("请选择活动路径！！！！！！");
    }
}
//重置查询
function ChongZhi() {
    illActivity.removeAllFeatures();
    illActivit.clearMarkers();
    $("#1").val(false);
    $("#2").val(false);
    $("#1").removeAttr("checked");

    $("#2").removeAttr("checked");
    $("#KaiShiShiJian").val("");
    $("#JieShuShiJian").val("");
    $("#NianLing").val("");
    $("#JiBing").val("");
    $("#Sex").val("");
    $(".dropdown-selected").text("");
    $("#DengJiNumber").find("option:selected").text("");
    $(".dropdown-clear-all").click();
}

//查询药店
function PharmacyPoint()//定位药店站点
{
    $.post("/Main/SelectPharmcy", function (data) {
        if (data.length > 0) {

            var Pharmacy = [];//药店站集
            for (var i = 0; i < data.length; i++) {
                Pharmacy.push(data[i].PharmacyName);
            }
            var queryParam, queryBySQLParams, queryBySQLService;
            queryParam = new SuperMap.REST.FilterParameter({
                name: "P15医疗服务_point_1_1@GuangZhouCongHua_Data#1",
                attributeFilter: "NAME like '%" + "药" + "%' or NAME like '%" + "店" + "%'"
            });
            queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
                queryParams: [queryParam]
            });
            queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
                eventListeners: { "processCompleted": Showlandmark, "processFailed": processFailed }
            });
            queryBySQLService.processAsync(queryBySQLParams);
        }
    });

}
//查询派出所
function PoliceSubstationPoint()//定位公安派出所
{
    var queryParam, queryBySQLParams, queryBySQLService;
    queryParam = new SuperMap.REST.FilterParameter({ name: "P01政府机构_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + "公安" + "%' or NAME like '%" + "派出所" + "%'" });
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: [queryParam]
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
        eventListeners: { "processCompleted": Showlandmark, "processFailed": processFailed }
    });
    queryBySQLService.processAsync(queryBySQLParams);



}

var BingLiJiHe;//病例集
//查询病例
function ChaBingliRen()//定位病例点
{
    $.post("/Main/SelectPatient", function (data) {
        if (data.length > 0) {
            BingLiJiHe = data;
            for (var i = 0; i < data.length; i++) {
                chen_CustompointLayer.removeAllFeatures();
                chen_CustompointRouteLayer.removeAllFeatures();
                //清空所有
                chen_deactiveAll();
                var TatleText = "";
                var size = new SuperMap.Size(32, 35),//指定图标的大小
                offset = new SuperMap.Pixel(-(size.w / 2), -size.h);//指定图标的偏移量
                var icon;
                if (data[i].illnessCaseID == 1) {
                    icon = new SuperMap.Icon("/content/images/YiShi.png", size, offset);//图标类，表示显示在屏幕上的图标

                    TatleText = "疑似病例查看";
                }
                if (data[i].illnessCaseID == 2) {
                    icon = new SuperMap.Icon("/content/images/QueZhen.png", size, offset);//图标类，表示显示在屏幕上的图标
                    TatleText = "确诊病例查看";
                }
                if (data[i].illnessCaseID == 3) {
                    icon = new SuperMap.Icon("/content/images/XiangMuGuanLi.png", size, offset);//图标类，表示显示在屏幕上的图标

                    TatleText = "项目病例查看";
                }

                Callthepolicemarker = new SuperMap.Marker(SuperMap.LonLat.fromString(data[i].XCoordinate + "," + data[i].YCoordinate), icon);
                Callthepolicemarker.PatientID = data[i].PatientID;
                Callthepolicemarker.PatientName = data[i].PatientName;
                Callthepolicemarker.PresentResidenceAdress = data[i].PresentResidenceAdress;
                Callthepolicemarker.Sex = data[i].Sex;
                Callthepolicemarker.NianLing = data[i].NianLing;
                Callthepolicemarker.RegisterNumber = data[i].RegisterNumber;

                Callthepolicemarker.OutpatientNumber = data[i].OutpatientNumber;
                Callthepolicemarker.CardNumber = data[i].CardNumber;
                Callthepolicemarker.illnessCaseID = data[i].illnessCaseID;

                Callthepolicemarker.NianLing = data[i].NianLing;
                Callthepolicemarker.XCoordinate = data[i].XCoordinate;
                Callthepolicemarker.YCoordinate = data[i].YCoordinate;
                Callthepolicemarker.TatleText = TatleText;
                Callthepolicemarker.HospitalName = data[i].HospitalName;

                Callthepolicemarker.bool = false;//自定义参数赋值



                Callthepolicemarker.events.on({  //注册监听点击事件
                    "click": ChaKanBingLi,//单击触发
                    "scope": Callthepolicemarker,   //大概是传参数把
                });
                illnessCaseLayer.addMarker(Callthepolicemarker);//添加覆盖物到标记图层}







            }
        }
    });



}



var BingJunJiHe;//病例集

function ChaBingJun()//定位病原基因点
{
    $.post("/Main/SelectSinglePathogenic", function (data) {
        if (data.length > 0) {
            BingJunJiHe = data;
            for (var i = 0; i < data.length; i++) {
                chen_CustompointLayer.removeAllFeatures();
                chen_CustompointRouteLayer.removeAllFeatures();
                //清空所有
                chen_deactiveAll();
                var TatleText = "";
                var size = new SuperMap.Size(32, 35),//指定图标的大小
                offset = new SuperMap.Pixel(-(size.w / 2), -size.h);//指定图标的偏移量
                var icon;
                if (data[i].illnessCaseID == 1) {
                    icon = new SuperMap.Icon("/content/images/NaiYao.png", size, offset);//图标类，表示显示在屏幕上的图标

                    TatleText = "<b>耐药病原查看</b>";
                }
                if (data[i].illnessCaseID == 2) {
                    icon = new SuperMap.Icon("/content/images/FeiNaiYao.png", size, offset);//图标类，表示显示在屏幕上的图标
                    TatleText = "<b>非耐药病原查看</b>";
                }


                Callthepolicemarker = new SuperMap.Marker(SuperMap.LonLat.fromString(data[i].XCoordinate + "," + data[i].YCoordinate), icon);
                Callthepolicemarker.PatientID = data[i].PatientID;
                Callthepolicemarker.PatientName = data[i].PatientName;
                Callthepolicemarker.PresentResidenceAdress = data[i].PresentResidenceAdress;
                Callthepolicemarker.Sex = data[i].Sex;
                Callthepolicemarker.NianLing = data[i].NianLing;
                Callthepolicemarker.RegisterNumber = data[i].RegisterNumber;

                Callthepolicemarker.DrugResistanceType = data[i].DrugResistanceType;
                Callthepolicemarker.Genotype = data[i].Genotype;

                Callthepolicemarker.CardNumber = data[i].CardNumber;
                Callthepolicemarker.PathogenTypeName = data[i].PathogenTypeName;
                Callthepolicemarker.PathogenTypeID = data[i].PathogenTypeID;
                Callthepolicemarker.NianLing = data[i].NianLing;
                Callthepolicemarker.XCoordinate = data[i].XCoordinate;
                Callthepolicemarker.YCoordinate = data[i].YCoordinate;
                Callthepolicemarker.TatleText = TatleText;
                Callthepolicemarker.HospitalName = data[i].HospitalName;

                Callthepolicemarker.bool = false;//自定义参数赋值



                Callthepolicemarker.events.on({  //注册监听点击事件
                    "click": ChaKanBingYuanJiYin,//单击触发
                    "scope": Callthepolicemarker,   //大概是传参数把
                });
                PathogenicGene.addMarker(Callthepolicemarker);//添加覆盖物到标记图层}







            }
        }
    });



}
//查看病例
function ChaKanBingLi(object) {
    GuanBiYouCe();
    CloseZhouBian();
    CloseLayerPointPopup();
    CloseFireFightingApparatusXiangQing();
    ClosefirefighterXiangQing();
    var TatleText = object.object.TatleText;
    var X = object.object.XCoordinate; var Y = object.object.YCoordinate;
    var icon = object.object.icon;
    var myDate = new Date();
    //获取当前年
    var Year = myDate.getFullYear();
    var ChuShengNian = object.object.NianLing;
    var NianLian = Math.floor(Year - ChuShengNian);
    JieShouZuoBiao(X, Y);

    contentHTML = "<div class='popwin_titleDiv'><span class='popwin_title'>" + TatleText + "</span></div>" + "<div style='font-size:14px;overflow-y:hidden;overflow:auto;color:#000;height:auto;width: 100%;max-height: 200px;min-height: 160px;padding-left: 5px;'>" + "<b>项目登记号:" + object.object.RegisterNumber + "</b><br/><b>门诊号:&nbsp;</b><b>" + object.object.OutpatientNumber + "</b><br/> <b>卡片编号：</b><b>" + object.object.CardNumber + "</b>  <br/> <b>姓名:" + object.object.PatientName + " </b>   <br/>   <b>性别：" + object.object.Sex + "</b><br/> <b>年龄：</b><b>" + NianLian + "</b><br/> <b>家庭住址：</b><b>" + object.object.PresentResidenceAdress + "</b> <br/><b>隶属医院：" + object.object.HospitalName + " </b><br/>    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button class='btn btn-primary'onclick='ShowDominationArea(this)'><b>  周   边  分  析</b></button></div> ";

    var popup = new SuperMap.Popup.FramedCloud(
        "TuCengPopwin",
        new SuperMap.LonLat(X, Y),
        null,
   contentHTML,
        icon,
        true,
          function () {
              CloseLayerPointPopup();
              CloseFireFightingApparatusXiangQing();
              ClosefirefighterXiangQing();
          },
        true);
    popup.autoSize = true;
    popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
    LayerPopul = popup;
    map.addPopup(popup);

    chen_centerPoint = new SuperMap.Geometry.Point(X, Y);
    ChoosePoint = chen_centerPoint;

}

//查看病原
function ChaKanBingYuanJiYin(object) {
    GuanBiYouCe();
    CloseZhouBian();
    CloseLayerPointPopup();
    CloseFireFightingApparatusXiangQing();
    ClosefirefighterXiangQing();
    var TatleText = object.object.TatleText;
    var X = object.object.XCoordinate; var Y = object.object.YCoordinate;
    var icon = object.object.icon;
    var myDate = new Date();
    //获取当前年
    var Year = myDate.getFullYear();
    var ChuShengNian = object.object.NianLing;
    var NianLian = Math.floor(Year - ChuShengNian);
    JieShouZuoBiao(X, Y);
    if (object.object.PathogenTypeID == 1) {

        contentHTML = "<div class='popwin_titleDiv'><span class='popwin_title'>" + TatleText + "</span></div>" + "<div style='font-size:14px;overflow-y:hidden;overflow:auto;color:#000;height:auto;width: 100%;max-height: 200px;min-height: 160px;padding-left: 5px;'>" + "<b>基因型：" + object.object.Genotype + " </b><br/><b>耐药类型:&nbsp;" + object.object.DrugResistanceType + "</b><br/> <b>病原患者编号：" + object.object.CardNumber + "</b>  <br/>  <b>性别：" + object.object.Sex + "</b><br/> <b>年龄：" + NianLian + "</b><br/> <b>家庭住址：" + object.object.PresentResidenceAdress + " </b><br/>   &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button class='btn btn-primary'onclick='ShowDominationArea(this)'> <b> 周   边  分  析</b></button></div> ";
    }
    else {
        contentHTML = "<div class='popwin_titleDiv'><span class='popwin_title'>" + TatleText + "</span></div>" + "<div style='font-size:14px;overflow-y:hidden;overflow:auto;color:#000;height:auto;width: 100%;max-height: 200px;min-height: 160px;padding-left: 5px;'>" + "<b>基因型：" + object.object.Genotype + " </b><br/><b>病原患者编号：" + object.object.CardNumber + "  </b><br/>  <b>性别：" + object.object.Sex + "</b><br/> <b>年龄：" + NianLian + "</b><br/> <b>家庭住址：" + object.object.PresentResidenceAdress + " </b><br/>  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<button class='btn btn-primary'onclick='ShowDominationArea(this)'> <b> 周   边  分  析</b></button></div> ";
    }
    var popup = new SuperMap.Popup.FramedCloud(
        "TuCengPopwin",
        new SuperMap.LonLat(X, Y),
        null,
   contentHTML,
        icon,
        true,
          function () {
              CloseLayerPointPopup();
              CloseFireFightingApparatusXiangQing();
              ClosefirefighterXiangQing();
          },
        true);
    popup.autoSize = true;
    popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
    LayerPopul = popup;
    map.addPopup(popup);

    chen_centerPoint = new SuperMap.Geometry.Point(X, Y);
    ChoosePoint = chen_centerPoint;

}

function Showlandmark(obj)//在地图上显示站点地标
{
    var result = obj.result;
    var feature, x, y, LocalMrker, type = 0, index = 0,
size = new SuperMap.Size(25, 20),
offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
icon = new SuperMap.Icon("/SuperMap/theme/images/marker.png", size, offset);
    if (result && result.recordsets) {
        for (i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
            if (recordsets[i].features) {
                for (j = 0; j < recordsets[i].features.length; j++) {
                    feature = recordsets[i].features[j];
                    x = feature.geometry.x;
                    y = feature.geometry.y;
                    type = parseInt(feature.data.TYPE);
                    if (type == 7280 || type == 7204 || type == 7205)//判断站点类型
                    {
                        index = 1;
                        size = new SuperMap.Size(15, 15);
                        icon = new SuperMap.Icon("/content/images/YiYuan (2).jpg", size, offset);
                        LocalMrker = new SuperMap.Marker(new SuperMap.LonLat(x, y), icon);
                        LocalMrker.id = index;
                        LocalMrker.typeID = type;
                        LocalMrker.name = feature.attributes.Name;
                        LocalMrker.laction = feature.attributes.address;
                    } else if (type == 2800) {
                        index = 2;
                        size = new SuperMap.Size(18, 18);
                        icon = new SuperMap.Icon("/content/images/YaoDian.png", size, offset);
                        LocalMrker = new SuperMap.Marker(new SuperMap.LonLat(x, y), icon);
                        LocalMrker.id = index;
                        LocalMrker.typeID = type;
                        LocalMrker.name = feature.attributes.Name;
                        LocalMrker.laction = feature.attributes.address;
                    }
                    else
                        if (feature.data.TYPE == 7080) {
                            index = 3;
                            size = new SuperMap.Size(18, 18);
                            icon = new SuperMap.Icon("/content/images/gonganpaichsuo.png", size, offset);
                            LocalMrker = new SuperMap.Marker(new SuperMap.LonLat(x, y), icon);
                            LocalMrker.id = index;
                            LocalMrker.name = feature.attributes.NAME;
                            LocalMrker.laction = feature.attributes.ADDRESS;
                        }



                    LocalMrker.GISID = feature.attributes.SmID;


                    LocalMrker.bool = false;
                    LocalMrker.events.on({
                        "click": OpenZhanDianMessagepopupss1,
                        "touchstart": OpenZhanDianMessagepopupss1,  //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
                        "scope": LocalMrker
                    });
                    if (index == 1)//根据不同的类型添加到不同的图层上
                    {
                        HospatilLayer.addMarker(LocalMrker);
                    } else if (index == 2) {
                        PharmacyLayer.addMarker(LocalMrker);
                    } else if (index == 3) {
                        PoliceSubstationLayer.addMarker(LocalMrker);
                    }

                }
            }
        }
    }

}
var ShuJu;
function OpenZhanDianMessagepopupss1(obj) {
    GuanBiYouCe();
    CloseZhouBian();
    CloseLayerPointPopup();
    CloseFireFightingApparatusXiangQing();
    ClosefirefighterXiangQing();
    var marker = this;
    var index;
    var XCoordinate;//X轴
    var YCoordinate;//Y轴
    var GISID;
    var laction;
    var name;
    if (obj.bool == true) {
        index = obj.id;
        XCoordinate = obj.lonlat.lon;
        YCoordinate = obj.lonlat.lat;
        GISID = obj.GISID;
        laction = obj.laction;
        name = obj.name;
    } else {
        index = marker.id;
        XCoordinate = marker.getLonLat().lon;
        YCoordinate = marker.getLonLat().lat;
        GISID = marker.GISID;
        laction = marker.laction;
        name = marker.name;
    }
    JieShouZuoBiao(XCoordinate, YCoordinate);
    var size = new SuperMap.Size(18, 18),
     offset = new SuperMap.Pixel(-18, -18);
    var icon = new SuperMap.Icon("/SuperMap/images/marker-RK.png", size, offset);
    var contentHTML = "";  //设置在气泡中显示的内容
    if (index == 1) {
        $.post("/Main/SelectYiYuan?GISID=" + GISID, function (data) {
            //FireStationFireCarTalbe = data.FireFghtingApparatus;
            //FirefightersTable = data.FireStationFirefighter;
            var TatleText = "医院";
            ShuJu = data;
            contentHTML = "<div class='popwin_titleDiv'><span class='popwin_title'>" + TatleText + "</span></div>" + "<div style='font-size:14px;overflow-y:hidden;overflow:auto;color:#000;height:auto;width: 100%;max-height: 240px;min-height: 200px;padding-left: 5px;'>" +
                "<div style='width:300px;height:150px;overflow:hidden; text-align:center; padding:5px;margin:auto 0px;'><img style='width:100%;height:100%;' src=" + data.dbHospatil.HospitalPicturePath + "></div><b>站点名称：" + data.dbHospatil.HospitalName + " </b><br/><b>所在地址:&nbsp;"
            + data.dbHospatil.HospitalAdress + "</b><br/> <b>级别：" + data.dbHospatil.GradeName + "  </b><br/> <b>附属医院：" + data.Count
            + "个 </b></div> <br/><div class='col-lg-2 col-md-2 col-sm-2'></div><button class='btn btn-primary'onclick='ShowDominationArea(this)'><b>  周   边  分  析</b></button>&emsp;&emsp;<button class='btn btn-primary'   onclick='XiangXiXinXi()'> <b> 详 细 信 息</b></button>";

            var popup = new SuperMap.Popup.FramedCloud(
                "TuCengPopwin",
                new SuperMap.LonLat(XCoordinate, YCoordinate),
                null,
           contentHTML,
                icon,
                true,
                  function () {
                      CloseLayerPointPopup();
                      CloseFireFightingApparatusXiangQing();
                      ClosefirefighterXiangQing();
                  },
                true);
            popup.autoSize = true;
            popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
            LayerPopul = popup;
            map.addPopup(popup);

        });

    }
    if (index == 2) {
        $.post("/Main/SelectPharmacy?GISID=" + GISID, function (data) {
            //FireStationFireCarTalbe = data.FireFghtingApparatus;
            //FirefightersTable = data.FireStationFirefighter;
            var TatleText = "药店";

            contentHTML = "<div class='popwin_titleDiv' style=''><span class='popwin_title'>" + TatleText + "</span></div>" + "<div style='font-size:14px;overflow-y:hidden;overflow:auto;color:#000;height:auto;width: 100%;max-height: 240px;min-height: 200px;padding-left: 5px;'>" +
                "<div style='width:300px;height:150px;overflow:hidden; text-align:center; padding:5px;margin:auto 0px;'><img style='width:100%;height:100%;' src=" + data.PharmacyPicturePath + "></div><b>站点名称： " + data.PharmacyName + "</b><br/><b>所在地址:&nbsp;  "
            + data.PharmacyAdress + " </b></div><br/><div class='col-lg-4 col-md-4 col-sm-4'></div><button class='btn btn-primary'onclick='ShowDominationArea(this)'> <b> 周   边  分  析</b></button>";

            var popup = new SuperMap.Popup.FramedCloud(
                "TuCengPopwin",
                new SuperMap.LonLat(XCoordinate, YCoordinate),
                null,
           contentHTML,
                icon,
                true,
                  function () {
                      CloseLayerPointPopup();
                      CloseFireFightingApparatusXiangQing();
                      ClosefirefighterXiangQing();
                  },
                true);
            popup.autoSize = true;
            popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
            LayerPopul = popup;
            map.addPopup(popup);

        });
    }
    if (index == 3) {
        offset = new SuperMap.Pixel(-12, -30);
        icon = new SuperMap.Icon("/SuperMap/images/marker-RK.png", size, offset);
        contentHTML += "<div class='popwin_titleDiv' style=''><span class='popwin_title'></b>公安派出所</b></span></div><div><div style='width:100%;height:120px; padding:5px;'><img  src='/content/images/thumbnails.jpg' style='width:100%;height:100%;'></div><b>派出所名称： " + marker.name + "</b><br/><b>所在地址:&nbsp;" + marker.laction + "</b></div> <br/> <div class='col-lg-4 col-md-4 col-sm-4'></div> <button class=' btn btn-primary'onclick='ShowDominationArea(this)'> <b> 周   边  分  析</b></button>";
        var popup = new SuperMap.Popup.FramedCloud(
            "PaiChuSuoPopwin",
            marker.getLonLat(), null,
             contentHTML,
           icon,
            true,
            null,
            false);
        popup.autoSize = true;
        popup.panMapIfOutOfView = true;//是否移动地图以确保弹窗显示在窗口内
        LayerPopul = popup;
        map.addPopup(popup);

    }


    chen_centerPoint = new SuperMap.Geometry.Point(JieShouDeX, JieShouDeY);
    ChoosePoint = chen_centerPoint;
    //map.setCenter(new SuperMap.LonLat(lonlat.lon, lonlat.lat), 1);

}//单击冒泡

function CloseLayerPointPopup() {
    if (LayerPopul) {
        try {
            LayerPopul.hide();
            LayerPopul.destroy();
        }
        catch (e) { }
    }
}//关闭气泡

var FireStationFireCarTalbe, FirefightersTable;
function OpenFireFightingApparatusXiangQing()//打开消防设备的详细信息
{
    if (FireStationFireCarTalbe.length > 0) {
        ClosefirefighterXiangQing();
        $("#XiaoFangCarTable tr:gt(0)").remove();
        var Table = document.getElementById("XiaoFangCarTable");
        var tr, tdid, tdname, images, state;
        for (var i = 0; i < FireStationFireCarTalbe.length; i++) {
            tr = Table.insertRow(i);
            images = tr.insertCell(0);
            tdname = tr.insertCell(1);
            tdid = tr.insertCell(2);
            state = tr.insertCell(3);
            images.innerHTML = "<img src=" + FireStationFireCarTalbe[i].PicturePath + " style='width:80px;height:60px'/>";
            tdname.innerHTML = FireStationFireCarTalbe[i].ToolMC;
            tdid.innerHTML = FireStationFireCarTalbe[i].Number;
            state.innerHTML = FireStationFireCarTalbe[i].PropertyDetailMC;
            Table.appendChild(tr);
        };
        $('#FireFightingApparatusXiangQing').attr("style", ' top: 100px, left:25px;');
        $("#FireFightingApparatusXiangQing").show('fast');
    }


}
function OpenfirefighterXiangQing()//打开消防人员的详细信息
{

    if (FirefightersTable.length > 0) {
        CloseFireFightingApparatusXiangQing();
        $("#firefighterTable tr:gt(0)").remove();
        var Table = document.getElementById("firefighterTable");
        var tr, tdid, tdname, images, Sex, IDCar, Phone;
        for (var i = 0; i < FirefightersTable.length; i++) {
            tr = Table.insertRow(i);
            tdname = tr.insertCell(0);
            Sex = tr.insertCell(1);
            images = tr.insertCell(2);
            Phone = tr.insertCell(3);
            tdid = tr.insertCell(4);

            tdname.innerHTML = FirefightersTable[i].PersonnelMC;
            Sex.innerHTML = FirefightersTable[i].PropertyDetailMC;
            images.innerHTML = "<img src=" + FirefightersTable[i].PicturePath + " style='width:70px;height:70px'/>";
            Phone.innerHTML = FirefightersTable[i].Phone;
            tdid.innerHTML = FirefightersTable[i].ZhanTai;
            Table.appendChild(tr);
        };;
        $('#firefighterXiangQing').attr("style", ' top: 100px, left:25px;');
        $("#firefighterXiangQing").show('fast');
    }

}
function CloseFireFightingApparatusXiangQing() {
    $("#FireFightingApparatusXiangQing").hide('fast');
    $('#FireFightingApparatusXiangQingContent').animate({ scrollTop: 0 }, 0);

}
function ClosefirefighterXiangQing() {
    $("#firefighterXiangQing").hide('fast');
    $('#firefighterContent').animate({ scrollTop: 0 }, 0);
}
//------------------------------------------------------------定位--------------------------------------------------//
//定位
function mapFixedPosition() {
    $("#tabAddress tr").remove();
    setTimeout(function () {
        $('.toolLi').removeClass('active');
    }, 100);
    // $('#QQlogin').css('top', '0px').css('left', '0px');
    var addressName = $('#txtDZ').val();
    var queryParams = [], queryBySQLParams, queryBySQLService;
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P04汽车站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P05公交车站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P12零售行业_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P15医疗服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P13宾馆酒店_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P14休闲娱乐_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P19住宅小区_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P16科研教育_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P17公司企业_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P11商业大厦_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P24风景名胜_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P21餐饮服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    //queryParams.push(new SuperMap.REST.FilterParameter({ name: "P18公园广场_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID

    queryParams.push(new SuperMap.REST.FilterParameter({ name: "乡镇_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P24风景名胜_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P03火车站地铁站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "村庄_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P16科研教育_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P09收费站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P08高速服务区_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P15医疗服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P19住宅小区_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P18公园广场_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P17公司企业_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P13宾馆酒店_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P07停车场_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID


    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P05公交车站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P04汽车站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID  queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P22汽车服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID

    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P01政府机构_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P23省市区县政府_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID  queryParams.push(new SuperMap.REST.FilterParameter({ name: "P06加油站加气站_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P25电讯服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P27港口码头_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P20综合信息_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID


    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P14休闲娱乐_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID

    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P12零售行业_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P11商业大厦_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID

    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P10金融服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID
    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P21餐饮服务_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID

    queryParams.push(new SuperMap.REST.FilterParameter({ name: "P26公共厕所_point_1_1@GuangZhouCongHua_Data#1", attributeFilter: "NAME like '%" + addressName + "%' or ADDRESS like '%" + addressName + "%'" }));//获取最新的楼栋ID



    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        expectCount: 50,
        queryParams: queryParams//查询过滤条件参数数组               
    });
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {
        eventListeners: { "processCompleted": processCompleted_selectAddress, "processFailed": processFailed }
    });
    queryBySQLService.processAsync(queryBySQLParams);
}
var addressName;
function processCompleted_selectAddress(queryEventArgs) {
    var i, j, result = queryEventArgs.result;
    if (result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            var recordsets = result.recordsets[i];
            for (j = 0; j < recordsets.features.length; j++) {
                var feature = recordsets.features[j];//获取结果对象的矢量
                var geometry = feature.geometry;//获取几何对象
                //判断返回的数据是不是这个数据
                //"SuperMap.Geometry.Point" 点
                //"SuperMap.Geometry.LineString" 道路
                //"SuperMap.Geometry.Polygon"面
                //addressID = feature.data.SmID;
                if (geometry.CLASS_NAME == "SuperMap.Geometry.Point") {
                    //点数据
                    //添加table数据
                    var address;

                    //if (result.recordsets[0].datasetName == "消防站点@ShenZhenNanShan_Data") {
                    //    address = feature.data.Name + "(" + feature.data.address + ")";
                    //}
                    //else {
                    //    address = feature.data.NAME + feature.data.ADDRESS;
                    //}


                    if (feature.data.ADDRESS) {
                        address = feature.data.ADDRESS + feature.data.NAME;
                        addressName = feature.data.ADDRESS + feature.data.NAME;
                    }
                    else {
                        address = feature.data.NAME;
                    }
                    var X = feature.data.SmX;
                    var Y = feature.data.SmY;

                    $('#tabAddress').append("<tr><td><img src='/SuperMap/images/maker_L_Red2.png'style='width:18px;height:15px' />  " + address + "</td><td><a href='javascript:' X=" + X + " Y=" + Y + " address=" + address + " onclick='addressLocation(this)'>定位</a></td></tr>");

                }
            }
        }
        //当返回结果不为空时，调整登记内容栏的高度60%

    }
}//搜索成功调用

var geometryaddressLocation;
var address;
function addressLocation(t) {
    //closeInfoWin_casePlace();//加载弹窗前先清除，上一次的弹窗
    map.removeAllPopup();
    markerLayer.clearMarkers();//移除所有的案件标记物
    var X = $(t).attr("X");
    var Y = $(t).attr("Y");
    address = $(t).attr("address");

    geometryaddressLocation = { x: X, y: Y, address: address };
    var queryParam, queryByGeometryParameters, queryService;//查询参数
    var point1 = new SuperMap.Geometry.Point(X, Y);

    addMarker_casePlace(X, Y, address, true, 0);



    ////查询过滤条件参数类。
    //queryParam = new SuperMap.REST.FilterParameter(
    //    {
    //        name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
    //        attributeFilter: "far_Dat=0"//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
    //    });
    //// Geometry 查询参数类  几何查询类
    //queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
    //    queryParams: [queryParam],//查询条件
    //    geometry: point1, //drawGeometryArgs.feature.geometry,//查询的几何对象
    //    spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT//查询的模式 intersect:相交，交叉
    //})

    ////Geometry 查询服务类。
    //queryService = new SuperMap.REST.QueryByGeometryService(url,//查询的服务地址
    //    {
    //        eventListeners: {
    //            "processCompleted": processCompleted_selectaddressLocation,//成功
    //            "processFailed": processFailed_selectPointOnWeb//失败
    //        }
    //    });
    //queryService.processAsync(queryByGeometryParameters);//向服务端传递参数，然后服务端返回对象


}//搜索地址定位
function processCompleted_selectaddressLocation(queryEventArgs) {
    var i, j, result = queryEventArgs.result;
    var id = 0;
    if (result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            var recordsets = result.recordsets[i];
            for (j = 0; j < recordsets.features.length; j++) {
                var feature = recordsets.features[j];//获取结果对象的矢量
                var geometry = feature.geometry;//获取几何对象
                if (geometry.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME) {//判断返回的数据是不是这个数据

                } else {

                    //判断是否查询的到警务网格
                    id = feature.data.SmID;
                }
            }
        }
    }
    if (id >= 0) {
        addMarker_casePlace(geometryaddressLocation.x, geometryaddressLocation.y, geometryaddressLocation.address, true, 0);
        map.setCenter(new SuperMap.LonLat(geometryaddressLocation.x, geometryaddressLocation.y), map.getZoom());
    }
    else {
        alert('无法定位！');
    }
}//定位坐标判断是否在警务网格范围内
function addMarker_casePlace(X, Y, name, bool, FangDa) {
    var marker = null;
    //初始化弹窗参数---------------------------------------------------
    var size = new SuperMap.Size(25, 20);//标记的大小
    var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);//此类用x,y坐标描绘屏幕坐标（像素点）。
    var icon = new SuperMap.Icon('/SuperMap/theme/images/marker.png', size, offset);//图标类，表示显示在屏幕上的图标
    //---------------------------------------------------
    //初始化标记覆盖物类
    marker = new SuperMap.Marker(new SuperMap.LonLat(X, Y), icon);//LonLat坐标
    marker.name = name;//名称
    marker.bool = bool;
    marker.FangDa = FangDa;//放大的倍数
    if (bool == true) {
        //注册 click 事件,触发 mouseClickHandler()方法
        markerLayer.events.on({
            'click': OpenPersonMessagepopupss,//单击触发
            'touchstart': OpenPersonMessagepopupss,//当在触摸屏上对marker开始进行触摸时触发此事件。//假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
            "scope": marker,//大概是传参数把
        });
    }

    markerLayer.addMarker(marker);//添加到图层

    if (bool == true) {//判断是否自动打开消息框
        OpenPersonMessagepopupss(marker);//查询到位置就立刻把弹窗显示出来
    }

}//加载案件点报警点登记弹窗
function processFailed_selectPointOnWeb(e) {
    alert(e.error.errorMsg);
}
var infowinonMessage = null;
function OpenPersonMessagepopup(obj) {
    infowinonMessagefun();
    var marker = this;
    var lonlat = obj.getLonLat();
    ////    var PersonName = undefined;//姓名
    //var IDCar = undefined;//身份证
    //var FloorGISID = marker.FloorSimID;
    var size = new SuperMap.Size(3, 50),
offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
icon = new SuperMap.Icon("/content/images/toolIco/map-marker-marker-outside-greens.png", size, offset);
    var contentHTML = " <div class='popwin_titleDiv' style=''><span class='popwin_title'>地点详细信息</span></div>";
    //设置在气泡中显示的内容
    var ifNow = undefined;
    contentHTML += "<div style='font-size:15px;color:#222;word-break: break-all;margin:0px auto;padding-left: 5px;max-width: 300px;max-height: 300px;'> <span>地址：" + address + "</span></div>";


    var size = new SuperMap.Size(28, 20);
    var offset = new SuperMap.Pixel(-((size.w / 2)), -(size.h - 8));
    var icon = new SuperMap.Icon("/SuperMap/images/bus-H.png", size, offset);
    var popupOne = new SuperMap.Popup.FramedCloud("popwin_lo",
             new SuperMap.LonLat(lonlat.lon, lonlat.lat),
           null,
           contentHTML,
           icon,
           true,
           function () {
               infowinonMessagefun();
           },
           true);
    popupOne.isShowShadow = false;
    infowinonMessage = popupOne;
    map.addPopup(popupOne);
    map.panTo(new SuperMap.LonLat(lonlat.lon, lonlat.lat));

}
//关闭信息框
function infowinonMessagefun() {
    if (infowinonMessage) {
        try {
            infowinonMessage.hide();
            infowinonMessage.destroy();
            infowinonMessage = null;
        }
        catch (e) { }
    }
}
//自动冒泡
function OpenPersonMessagepopupss(obj) {
    infowinonMessagefun();
    var marker = this;


    //    var PersonName = undefined;//姓名
    var IDCar = undefined;//身份证
    var FloorGISID = marker.FloorSimID;
    var XCoordinate;//X轴
    var YCoordinate;//Y轴
    if (obj.bool == true) {
        index = obj.id;
        XCoordinate = obj.lonlat.lon;
        YCoordinate = obj.lonlat.lat;
    } else {
        index = marker.id;
        XCoordinate = marker.getLonLat().lon;
        YCoordinate = marker.getLonLat().lat;
    }



    //  map.setCenter(new SuperMap.LonLat(lonlat.lon, lonlat.lat), 4);//最大放大倍数是15
    //  $.getJSON("/index/SelectRenKouXinXiOnZuHeTiaoJian?PersonID=" + NeedLocationPersonID + "&FloorID=" + FloorGISID, function (data) {
    var contentHTML = " <div class='popwin_titleDiv' style=''><span class='popwin_title'>地点详细信息</span></div> ";
    //设置在气泡中显示的内容
    var ifNow = undefined;
    contentHTML += "<div style='font-size:15px;color:#222;word-break: break-all;margin:0px auto;padding-left: 5px;max-height'>地址：" + address + "</div>";

    var size = new SuperMap.Size(28, 20);
    var offset = new SuperMap.Pixel(-((size.w / 2)), -(size.h - 8));
    var icon = new SuperMap.Icon("/SuperMap/images/bus-H.png", size, offset);
    var popupOne = new SuperMap.Popup.FramedCloud("popwin_lo",
             new SuperMap.LonLat(XCoordinate, YCoordinate),
           null,
           contentHTML,
           icon,
           true,
            function () {
                infowinonMessagefun();
            },
           true);
    popupOne.isShowShadow = false;
    //var popup = new SuperMap.Popup.FramedCloud
    //("popwin",
    //    new SuperMap.LonLat(lonlat.lon, lonlat.lat),
    //    null,
    //        contentHTML,
    //       null,
    //        true);

    infowinonMessage = popupOne;
    map.addPopup(popupOne);

    //    });
    map.panTo(new SuperMap.LonLat(XCoordinate, YCoordinate));
    //  map.setCenter(new SuperMap.LonLat(lonlat.lon, lonlat.lat));//最大放大倍数是15
}//单击冒泡
function GB() {
    $("#QQlogin").css("display", "none");
    $("#Diastimeter").css("display", "none");
    YLDclearMarkers();
    map.removeAllPopup();
}
function mapFixedPosition1() {

    $("#supervise_Hide").click();
    clearElementsmzj();
    drawPolygon.deactivate();
    drawLine.deactivate();
    $("#tabAddress tr").remove();//清空当前查询的数据
    $('#QQlogin').css('top', '0px');
    $('#QQlogin').css('left', '0px');
    $("#QQlogin").css("display", "block");
    YLDclearMarkers();
    $("#Diastimeter").css("display", "none");
    setTimeout(function () {
        $('.toolLi').removeClass('active');
    }, 100);
}
//打开图层管理
function TuCeng() {
    $("#supervise_Hide").click();
    $('#TuCeng').css('top', '0px');
    $('#TuCeng').css('left', '0px');
    $("#TuCeng").css("display", "block");

}
//关闭图层管理
function GBTC() {
    $("#TuCeng").css("display", "none");
    $("#TuCeng").hide();
}
//打开路径管理
function LuJing() {
    $("#supervise_Hide").click();
    $('#LuJing').css('top', '0px');
    $('#LuJing').css('left', '0px');
    $("#LuJing").css("display", "block");

}
//关闭路径
function GBLJ() {
    $("#LuJing").css("display", "none");
    $("#LuJing").hide();

}

//打开工具箱
function GongJu() {
    $("#supervise_Hide").click();
    $('#CeLiang').css('top', '0px');
    $('#CeLiang').css('left', '0px');
    $("#CeLiang").css("display", "block");

}

//关闭工具箱
function GBCL() {
    $("#CeLiang").css("display", "none");
    $("#CeLiang").hide();
}

function processFailed(e) {
    alert(e.error.errorMsg);
}
function CloseDiastimeter() {
    $('#Diastimeter').attr('style', 'display:none');
    YLDclearMarkers();
    clearElementsmzj();
    polygonLayermzj.removeAllFeatures();
}
//测距
function mapStadiometry(type) {
    CloseDiastimeter();
    setTimeout(function () {
        $('.toolLi').removeClass('active');
    }, 100);
    map.removeAllPopup();
    if (type == 1) {

        $("#QQlogin").css("display", "none");
        clearFeaturesLine();
        clearFeatures();
        drawLine.activate();
        $("liangshujieguo").innerHTML = "";
        $('#Diastimeter').attr('style', 'display:none');
        YLDclearMarkers();
        drawPolygon.deactivate();
        clearElementsmzj()
        //mapMeasurementArea(this).
        o = 0;
        DS = 0;
    } else if (type == 2) {
        drawLine.deactivate();
        drawPolygon.deactivate();
        selectPointsmzj();
        $("#QQlogin").css("display", "none");
        YLDclearMarkers();
        intjulimzj = 0;
        selectWebLocationFeatureTetx.length = 0;
        $('#Diastimeter').attr('style', 'display:none');
    }
    //alert(type);
}

function clearFeaturesLine() {
    //lineLayer.removeAllFeatures();
    polygonLayer.removeAllFeatures();

}
//绘完触发事件
function drawCompletedLine(drawGeometryArgs) {
    GBCL();
    //停止画面控制
    drawLine.deactivate();
    //获得图层几何对象
    var geometry = drawGeometryArgs.feature.geometry,
            measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
            myMeasuerService = new SuperMap.REST.MeasureService(url); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
    drawLineSytle.addFeatures(drawGeometryArgs.feature);
    count = drawGeometryArgs.feature.geometry.components[0];
    for (var i = 0; i < drawGeometryArgs.feature.geometry.components[0].components.length; i++) {
        var x = count.components[i].x;//获取当前几何的界限上下左右除以2得到x轴，y同理
        var y = count.components[i].y;
        var size = new SuperMap.Size(25, 20),
        offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
       icon = new SuperMap.Icon("/SuperMap/theme/images/marker.png", size, offset);
        marker = new SuperMap.Marker(new SuperMap.LonLat(x, y), icon);

        var centerPoint1 = new SuperMap.Geometry.Point(x, y);
        var circleVector1 = new SuperMap.Feature.Vector(centerPoint1);
        if (i == 0) {
            circleVector1.style = {
                strokeColor: "#CAFF70",
                fillColor: "#DC143C",
                strokeWidth: 2,
                fillOpacity: 0,
                label: "起点",
                fontColor: "#000"
            };
        }

        polygonLayer.addFeatures([circleVector1]);
        Jia_markers.addMarker(marker);
    }
    myMeasuerService.events.on({ "processCompleted": measureCompletedLine });

    //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA

    myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;

    myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
}
//测量结束调用事件
function measureCompletedLine(measureEventArgs) {
    GBCL();
    var distance = measureEventArgs.result.distance;
    var unit = measureEventArgs.result.unit;
    var span = document.getElementById("liangshujieguo");
    span.innerHTML = parseInt(distance) + "米";
    $('#Diastimeter').attr('style', 'display:block');
    getGeometry();

}
function getGeometry() {
    for (var i = 0; i < count.components.length; i++) {
        if (i + 1 == count.components.length) {

        }
        else {
            var x = count.components[i].x;//获取当前几何的界限上下左右除以2得到x轴，y同理
            var y = count.components[i].y;
            var points = [new SuperMap.Geometry.Point(x, y),
             new SuperMap.Geometry.Point(count.components[i + 1].x, count.components[i + 1].y)],
              roadLine = new SuperMap.Geometry.LineString(points);
            var measureParam = new SuperMap.REST.MeasureParameters(roadLine), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
             myMeasuerService = new SuperMap.REST.MeasureService(url); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
            myMeasuerService.events.on({ "processCompleted": measureCompletedLine1 });

            //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA

            myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;

            myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
        }

    }

}
var o = 0;
var DS = 0;
function YLDclearMarkers() {
    Jia_markers.clearMarkers();
    drawLineSytle.removeAllFeatures();
    polygonLayer.removeAllFeatures();
    markerLayer.clearMarkers();
}//清空图层
function measureCompletedLine1(measureEventArgs) {
    o++;
    var distance = measureEventArgs.result.distance;
    DS += distance;
    var unit = measureEventArgs.result.unit;
    var x = count.components[o].x;//获取当前几何的界限上下左右除以2得到x轴，y同理
    var y = count.components[o].y;

    var centerPoint1 = new SuperMap.Geometry.Point(x, y);
    var circleVector1 = new SuperMap.Feature.Vector(centerPoint1);

    circleVector1.style = {
        strokeColor: "#CAFF70",
        fillColor: "#DC143C",
        strokeWidth: 15,
        fillOpacity: 0,
        label: "距离" + parseInt(DS) + "米",
        fontColor: "#FF3300",
        fontWidth: 20,
    };
    polygonLayer.addFeatures([circleVector1]);
}
//测面积
function mapMeasurementArea(t) {
    GBCL();
    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
    map.removeAllPopup();
    $("#QQlogin").css("display", "none");
    clearFeatures();
    drawPolygon.activate();
    YLDclearMarkers();
    clearFeaturesLine();
    $('#Diastimeter').attr('style', 'display:none');
    drawLine.deactivate();
    clearElementsmzj();
}
function clearFeatures() {
    polygonLayer.removeAllFeatures();
    //PolygonLayer2.removeAllFeatures();

}
function drawCompletedDrawPolygon(drawGeometryArgs) {
    //停止画面控制

    drawPolygon.deactivate();

    //获得图层几何对象
    var geometry = drawGeometryArgs.feature.geometry,
            measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
            myMeasuerService = new SuperMap.REST.MeasureService(url); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
    myMeasuerService.events.on({ "processCompleted": measureCompleted, "processFailed": processFailed111 });

    //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA

    myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;

    myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
}
//测量结束调用事件
function measureCompleted(measureEventArgs) {

    var area = measureEventArgs.result.area,
            unit = measureEventArgs.result.unit;
    $('#liangshujieguo').text(parseInt(area) + "平方米");
    $('#Diastimeter').attr('style', 'display:block');
}
function processFailed111(er) {
    //console.log(er);
}

////////////////////////////////////////////////////////////麦志坚最佳路进分析代码////////////
function selectPointsmzj() {
    clearElementsmzj();
    drawPointmzj.activate();
}
var pointmzjx = 0, pongintmzjy = 0;//麦志坚的坐标
function drawCompletedmzj(drawGeometryArgs) {
    var point = drawGeometryArgs.feature.geometry,
            size = new SuperMap.Size(25, 20),
            offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
            icon = new SuperMap.Icon("/SuperMap/theme/images/marker.png", size, offset);
    icon1 = new SuperMap.Icon("/SuperMap/theme/images/marker-1.png", size, offset);
    icon2 = new SuperMap.Icon("/SuperMap/theme/images/marker-2.png", size, offset);
    icon3 = new SuperMap.Icon("/SuperMap/theme/images/marker-3.png", size, offset);
    icon4 = new SuperMap.Icon("/SuperMap/theme/images/marker-4.png", size, offset);
    icon5 = new SuperMap.Icon("/SuperMap/theme/images/marker-5.png", size, offset);
    icon6 = new SuperMap.Icon("/SuperMap/theme/images/marker-6.png", size, offset);
    icon7 = new SuperMap.Icon("/SuperMap/theme/images/marker-7.png", size, offset);
    icon8 = new SuperMap.Icon("/SuperMap/theme/images/marker-8.png", size, offset);
    icon9 = new SuperMap.Icon("/SuperMap/theme/images/marker-9.png", size, offset);
    icon10 = new SuperMap.Icon("/SuperMap/theme/images/marker-10.png", size, offset);


    ///麦氏自创当双击时候自动结束绘制并自动最佳路径分析
    if ((pointmzjx == 0 && pongintmzjy == 0) || (pointmzjx != point.x && pongintmzjy != point.y)) {
        pointmzjx = point.x;
        pongintmzjy = point.y;
        //markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
        // alert(point.x + "\n" + point.y);
        nodeArraymzj.push(point);
        for (i = 0; i < nodeArraymzj.length; i++) {
            if (i == 0) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon1));
            }
            if (i == 1) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon2));
            }
            if (i == 2) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon3));
            }
            if (i == 3) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon4));
            }
            if (i == 4) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon5));
            }
            if (i == 5) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon6));
            }
            if (i == 6) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon7));
            }
            if (i == 7) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon8));
            }
            if (i == 8) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon9));
            }
            if (i == 9) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon10));
            }
            if (i >= 10) {
                markerLayermzj.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
            }
        }
    }
    else {
        findPathmzj();
    }
}

//选中时显示路径指引信息
function onFeatureSelectmzj(feature) {
    if (feature.attributes.description) {
        popup = new SuperMap.Popup("chicken",
                feature.geometry.getBounds().getCenterLonLat(),
                new SuperMap.Size(200, 30),
                "<div style='font-size:.8em; opacity: 0.8'>" + feature.attributes.description + "</div>",
                null, false);
        feature.popup = popup;
        map.addPopup(popup);
    }
    if (feature.geometry.CLASS_NAME != "SuperMap.Geometry.Point") {
        feature.style = styleGuideLinemzj;
        vectorLayermzj.redraw();
    }
}

//清除要素时调用此函数
function onFeatureUnselectmzj(feature) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
    if (feature.geometry.CLASS_NAME != "SuperMap.Geometry.Point") {
        feature.style = stylemzj;
    }
    vectorLayermzj.redraw();

}

function findPathmzj() {
    drawPointmzj.deactivate();
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
        resultSetting: resultSetting,
        //weightFieldName: "length"
    });
    parameter = new SuperMap.REST.FindPathParameters({
        isAnalyzeById: false,
        nodes: nodeArraymzj,
        hasLeastEdgeCount: false,
        parameter: analystParameter
    });
    if (nodeArraymzj.length <= 1) {
        alert("站点数目有误");
    }
    findPathService = new SuperMap.REST.FindPathService(urlNetwork, {
        eventListeners: { "processCompleted": processCompletedmzj }
    });
    findPathService.processAsync(parameter);
}
var intjulimzj = 0;
var selectWebLocationFeatureTetx = [];
function processCompletedmzj(findPathEventArgs) {
    var result = findPathEventArgs.result;
    if (result.pathList && result.pathList.length > 0) {//判断是否有数据返回来
        var facilityPathList = result.pathList[0];//只有一条数据返回
        var feature = new SuperMap.Feature.Vector();//创建一个信息
        feature.geometry = facilityPathList.route;//赋值几何信息
        var weight = parseInt(facilityPathList.weight);//获取距离
        for (var j = 0; j < nodeArraymzj.length - 1; j++) {
            feature.weight = weight;//赋值
            var intjulimzjtwo = intjulimzj + parseInt(result.pathList[0].stopWeights[j])
            stopWeightsmzj = "\n" + "距离：" + intjulimzjtwo + "米";
            intjulimzj = intjulimzjtwo;
            var featureComps = facilityPathList.route.components[0].components;//获取线路节点
            if (featureComps != null && featureComps.length > 0) {
                var point = new SuperMap.Geometry.Point(nodeArraymzj[j + 1].x, nodeArraymzj[j + 1].y);//创建一个点图层
                var pointVector = new SuperMap.Feature.Vector(point);//创建矢量

                pointVector.style = {//距离文本提示
                    fill: false,
                    label: stopWeightsmzj,
                    fontColor: '#ff9a00',
                    fontSize: '10px',
                    fontWeight: 900
                };

                selectWebLocationFeatureTetx.push(pointVector);//添加到存放文字距离提示数组
                polygonLayermzj.addFeatures(selectWebLocationFeatureTetx[j]);//添加到图层显示出来
            }

        }

    }
    allSchememzj(result);
    var span = document.getElementById("liangshujieguo");
    span.innerHTML = parseInt(result.pathList[0].weight) + "米";
    $('#Diastimeter').attr('style', 'display:block');
}
function allSchememzj(result) {
    if (pathListIndexmzj < result.pathList.length) {
        addPathmzj(result);
    } else {
        pathListIndexmzj = 0;
        //线绘制完成后会绘制关于路径指引点的信息
        addPathGuideItemsmzj(result);
    }
}
//以动画效果显示分析结果
function addPathmzj(result) {
    if (routeCompsIndexmzj < result.pathList[pathListIndexmzj].route.components.length) {
        var pathFeature = new SuperMap.Feature.Vector();
        var points = [];
        for (var k = 0; k < 2; k++) {
            if (result.pathList[pathListIndexmzj].route.components[routeCompsIndexmzj + k]) {
                points.push(new SuperMap.Geometry.Point(result.pathList[pathListIndexmzj].route.components[routeCompsIndexmzj + k].x, result.pathList[pathListIndexmzj].route.components[routeCompsIndexmzj + k].y));
            }
        }
        var curLine = new SuperMap.Geometry.LinearRing(points);
        pathFeature.geometry = curLine;
        pathFeature.style = stylemzj;
        vectorLayermzj.addFeatures(pathFeature);
        //每隔0.001毫秒加载一条弧段
        pathTimemzj = setTimeout(function () { addPathmzj(result); }, 0.001);
        routeCompsIndexmzj++;
    } else {
        clearTimeout(pathTimemzj);
        routeCompsIndexmzj = 0;
        pathListIndexmzj++;
        allSchememzj(result);
    }
}
//动画显示/////////////////////////////////////////////////////
var mmzj = 0;
var pathGuideItemTimemzj;
var vmzj = 0.5;

function ActionFlash(pathGuideItems, mmzj, len) {
    //for (var mmzj = 0; mmzj < len; mmzj++) {
    var guideFeature = new SuperMap.Feature.Vector();
    guideFeature.geometry = pathGuideItems[mmzj].geometry;//一个m
    guideFeature.attributes = { description: pathGuideItems[mmzj].description };//两个m
    if (guideFeature.geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
        guideFeature.style = styleGuidePointmzj;
    }
    else {
        guideFeature.style = stylemzj;
    }
    vectorLayermzj.addFeatures(guideFeature);
    mmzj++;
    if (mmzj < len) {
        pathGuideItemTimemzj = setTimeout(function () { ActionFlash(pathGuideItems, mmzj, len); }, 0.1);
    } else {

    }
    //Pausetwo(this,2000);//调用暂停函数
    // }
}

function addPathGuideItemsmzj(result) {
    vectorLayermzj.removeAllFeatures();
    //显示每个pathGuideItem和对应的描述信息
    for (var k = 0; k < result.pathList.length; k++) {

        var pathGuideItems = result.pathList[pathListIndexmzj].pathGuideItems, len = pathGuideItems.length;
        ActionFlash(pathGuideItems, mmzj, len);
    }
    selectmzj.activate();
}

function clearElementsmzj() {
    pathListIndexmzj = 0;
    routeCompsIndexmzj = 0;
    nodeArraymzj = [];
    selectmzj.deactivate();
    if (vectorLayermzj.selectedFeatures.length > 0) {
        map.removePopup(vectorLayermzj.selectedFeatures[0].popup);
    }
    vectorLayermzj.removeAllFeatures();
    markerLayermzj.clearMarkers();
}
/////////////////////////////////////////////////////最佳路进分析代码结束///////////////////////////////////////////
$(function () {


    var QQlogin = document.querySelector("#QQlogin");
    var aside = document.querySelector("#QQlogin aside");
    var link = document.querySelector("#QQlogin dl dt a");
    var box = document.querySelector("#QQlogin dl dd");
    var links = document.querySelectorAll("#QQlogin dl dd a");
    var mask = document.querySelector("#mask");
    var qql = document.querySelector("div.login a");
    var close = document.querySelector("#QQlogin i.close");
    //alert(aside.nodeName);
    //处理拖动QQ的登录框

    aside.onmousedown = function (e) {
        var x = e.clientX - QQlogin.offsetLeft;
        var y = e.clientY - QQlogin.offsetTop;
        document.onmousemove = function (e) {
            var top = e.clientY - y;
            var left = e.clientX - x;
            top = Math.min((Math.max(0, top)), window.innerHeight - QQlogin.offsetHeight);
            left = Math.min((Math.max(0, left)), window.innerWidth - QQlogin.offsetWidth);

            QQlogin.style.top = top + "px";
            QQlogin.style.left = left + "px";
        };
        document.onmouseup = function () {
            this.onmousemove = null;
            this.onmouseup = null;
        }
    };
});

//------------------------------------------------------------定位--------------------------------------------------//
