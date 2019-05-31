var map,//地图
layer,//卫星图底图
baseLayer,//行政图底图2
alarmMarkerLayeraa,//新警情
seriousMarkerLayer,//未处理
moderateMarkerLayer,//正处理
safetyMarkerLayer,//处理完
SmallFireHouseLayer,//小型消防站  
WeiXingFireHouseLayer,//微型消防站
PoliceSubstationLayer,//公安派出所
blueLayer_T,//二次定位标记图层
vectorPoint_T,//点图层
drawPoint_T,//定点控件
chen_DangerousPoerMarkers,
nodeArraymzj = [], pathTimemzj, pathListIndexmzj = 0, routeCompsIndexmzj = 0,
drawPolygon, polygonLayer, drawLine, markerLayer, drawLineSytle, count, vectorLayermzj, markerLayermzj, polygonLayermzj,
            drawPointmzj, selectmzj, style = {
                strokeColor: "#304DBE",
                strokeWidth: 3,
                pointerEvents: "visiblePainted",
                fillColor: "#304DBE",
                fillOpacity: 0.8
            },
      styleHuanYuan = {
          strokeColor: "#304DBE",
          strokeWidth: 3,
          pointerEvents: "visiblePainted",
          fillColor: "#fff",
          fillOpacity: 0.3
      },
      styleDiw = {
          strokeColor: "#304DBE",
          strokeWidth: 2,
          pointerEvents: "visiblePainted",
          fillColor: "#fff",
          fillOpacity: 0.3
      },
//历史查询begin
vectorLayer_H, drawPolygon_H, markerLayer_H, drawPointr_H, drawLiner_H,
            style_H = {
                strokeColor: "#304DBE",
                strokeWidth: 1,
                pointerEvents: "visiblePainted",
                fillColor: "#304DBE",
                fillOpacity: 0.3
            },
      //历史查询end           
            stylemzj = {
                strokeColor: "#304DBE",
                strokeWidth: 3,
                pointerEvents: "visiblePainted",
                fill: false
            },
            styleGuidePointmzj = {
                pointRadius: 10,
                externalGraphic: "/SuperMap/images/walk.png"
            },
            styleGuideLinemzj = {
                strokeColor: "#25FF25",
                strokeWidth: 6,
                fill: false
            };

var vectorLayer_WG;
var vectorLayer_default;
//李志 底图实例化！---------------------------------
var LZFireCar,//消防站
    LayerSchemeeScheme,//线路
    LayerSchemeeAnimation,//小人
 //   vectorLine_LZ,//用于自定义路线
    LZcar_animatorVector,//车辆动画图层
    car_endTime = 100;//结束播放车子时间50秒

//-----------------------------
var host, url, urlNetwork, urldata, ugcv5url, chen_CustompointRouteLayer, chen_CustompointLayer, chen_CustomPoint, chen_DangerousMarkers, Jia_markers;
host = 'http://127.0.0.1:8090';//域名
url = host + '/iserver/services/map-NsDistrictWorkingSpace/rest/maps/深圳南山地图@ShenZhenNanShan_Data';//卫星图
url2 = host + '/iserver/services/map-ugcv5-NanShanHangZhengQuYuShenZhenNanShanData/rest/maps/南头镇';//行政图
urlNetwork = host + '/iserver/services/transportationAnalyst-NsDistrictWorkingSpace/rest/networkanalyst/BuildNetwork@ShenZhenNanShan_Data';//网络数据
urldata = host + "/iserver/services/data-NsDistrictWorkingSpace/rest/data/";//数据集数据地址  
urldataAlarm = host + "/iserver/services/data-NsDistrictWorkingSpace/rest/data/datasources/name/ShenZhenNanShan_Data/datasets/name/Alarm/";//警情数据集   
ugcv5url = host + '/iserver/services/map-ugcv5-ShenZhenNanShanDiTuShenZhenNanShanData/rest/maps/深圳南山地图@ShenZhenNanShan_Data';//卫星图切片地址
ugcv5url2 = host + '/iserver/services/map-ugcv5-NanTouZhen/rest/maps/南头镇';//行政图切片地址
var overviewMap;//鹰眼控件
var timeAlarm;//时间刷新警情
//缩放比例值
var heightsize = 0;

var setting = {//树形参数
    callback: {
        onClick: clickSelectMap
    }
};

var pw_seriousMarkerLayer;
//树形假数据
var json = [
 {
     "id": "1",
     "pId": "0",
     "name": "南头街道",
     open: true,
     "communityWebID": "4",
     "webID": "1",
     "webType": "1",
     "farID": "0",
     "children": [
       {
           "id": "11",
           "pId": "1",
           "name": "南头城社区",
           open: true,
           "webID": "9",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "12",
           "pId": "1",
           "name": "田厦社区",
           open: true,
           "webID": "11",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "13",
           "pId": "1",
           "name": "大新社区",
           open: true,
           "webID": "4",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "14",
           "pId": "1",
           "name": "大汪山社区",
           open: true,
           "webID": "3",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "15",
           "pId": "1",
           "name": "前海社区",
           open: true,
           "webID": "10",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "15",
           "pId": "1",
           "name": "红花园社区",
           open: true,
           "webID": "6",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "16",
           "pId": "1",
           "name": "南联社区",
           open: true,
           "webID": "8",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "17",
           "pId": "1",
           "name": "马家龙社区",
           open: true,
           "webID": "7",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "18",
           "pId": "1",
           "name": "莲城社区",
           open: true,
           "webID": "7",
           "farID": "2",
           "webType": "2"
       },
       {
           "id": "15",
           "pId": "1",
           "name": "星海名城社区",
           open: true,
           "webID": "12",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "19",
           "pId": "1",
           "name": "同乐社区",
           open: true,
           "webID": "13",
           "farID": "1",
           "webType": "2"
       },
       {
           "id": "20",
           "pId": "1",
           "name": "安乐社区",
           open: true,
           "webID": "2",
           "farID": "1",
           "webType": "2"
       }
     ]
 }];
//$(function () {
//    //实例化图层lZ<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//    LZFireCar = new SuperMap.Layer.Markers("消防");//创建消防图层
//    LZFirePlace = new SuperMap.Layer.Markers("火灾");//创建消防图层
//    LayerSchemeeScheme = new SuperMap.Layer.Vector("线路");
//    LayerSchemeeAnimation = new SuperMap.Layer.Vector("动画");
//    vectorPoint_T = new SuperMap.Layer.Vector("选点");//选点图层
//    drawPoint_T = new SuperMap.Control.DrawFeature(vectorPoint_T, SuperMap.Handler.Point);//选点控件
//    drawPoint_T.events.on({
//        "featureadded": featureadded_T//回调
//    });//注册事件
//    //   vectorLine_LZ = new SuperMap.Control.DrawFeature(LayerSchemeeScheme, SuperMap.Handler.Path);//绘线
//    //vectorLine_LZ.events.on({ "featureadded": drawCompleted_vectorLine_LZ });//绘线结束事件
//    LZcar_animatorVector = new SuperMap.Layer.AnimatorVector('实时动画警员视图图层', {}, {
//        speed: 0.1,//播放速度。不能小于0，默认为1（表示每帧渲染的数据之间的间隔为1），设置越大播放速度越快。
//        startTime: 0,//播放的起始时间，必须为数字，且小于等于endTime。如果不设置，初始化时为0，建议设置。
//        endTime: car_endTime,//播放的结束时间，必须为数字，且大于等于startTime。如果不设置，初始化时以当前时间进行设置，建议设置。
//        repeat: false,//是否重复循环播放。默认为true。
//        reverse: true//是否反向播放。默认为false。
//    });
//    LZcar_animatorVector.events.on({ "featurerendered": LZfeaturerendered });

//    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.


//    addDase();//加载基础设置
//    vectorLayer_WG = new SuperMap.Layer.Vector("街道社区网格"); //创建警务网格图层
//    vectorLayer_default = new SuperMap.Layer.Vector("南头街道网格"); //创建警务网格图层
//    overviewMap = new SuperMap.Control.OverviewMap();//实例化鹰眼
//    alarmMarkerLayeraa = new SuperMap.Layer.Markers("警情点");//创建报警点图层
//    blueLayer_T = new SuperMap.Layer.Markers("二次定位");//创建二次定位图层
//    pw_seriousMarkerLayer = new SuperMap.Layer.Markers("历史案件点");//历史案件点
//    //亮哥    //亮哥    //亮哥    //亮哥    //亮哥
//    //新建点矢量图层
//    chen_CustompointLayer = new SuperMap.Layer.Vector("pointLayer");
//    chen_CustomPoint = new SuperMap.Control.DrawFeature(chen_CustompointLayer, SuperMap.Handler.Point, { multi: true });
//    chen_CustomPoint.events.on({ "featureadded": chen_CustomPointFeatureCompleted });
//    //初始化标记图层类
//    chen_DangerousMarkers = new SuperMap.Layer.Markers("dangerous");
//    chen_CustompointRouteLayer = new SuperMap.Layer.Vector("查询路径");
//    Jia_markers = new SuperMap.Layer.Markers("Markers");
//    chen_DangerousPoerMarkers = new SuperMap.Layer.Markers("Markers");
//    //亮哥    //亮哥    //亮哥    //亮哥    //亮哥


//    //新建面矢量图层
//    polygonLayer = new SuperMap.Layer.Vector("polygonLayer");
//    polygonLayermzj = new SuperMap.Layer.Vector("polygonLayermzj");
//    //对面图层应用样式style（前面有定义）
//    polygonLayer.style = styleDiw;
//    drawPolygon = new SuperMap.Control.DrawFeature(polygonLayer, SuperMap.Handler.Polygon);
//    drawPolygon.events.on({ "featureadded": drawCompletedDrawPolygon });
//    //新建线矢量图层
//    markerLayer = new SuperMap.Layer.Markers("markerLayer");//创建一个有标签的图层
//    drawLineSytle = new SuperMap.Layer.Vector("polygonLayer");
//    //创建画线控制，图层是lineLayer;这里DrawFeature(图层,类型,属性)；multi:true在将要素放入图层之前是否现将其放入几何图层中
//    drawLine = new SuperMap.Control.DrawFeature(polygonLayer, SuperMap.Handler.Path, { multi: true });
//    drawLine.events.on({ "featureadded": drawCompletedLine });
//    vectorLayermzj = new SuperMap.Layer.Vector("vectorLayer");
//    drawPointmzj = new SuperMap.Control.DrawFeature(vectorLayermzj, SuperMap.Handler.Point);
//    selectmzj = new SuperMap.Control.SelectFeature(vectorLayermzj, { onSelect: onFeatureSelectmzj, onUnselect: onFeatureUnselectmzj });
//    drawPointmzj.events.on({ "featureadded": drawCompletedmzj });
//    //历史查询begin
//    vectorLayer_H = new SuperMap.Layer.Vector("历史查询渲染");
//    //vectorLayer1_H = new SuperMap.Layer.Vector("图层二");
//    markerLayer_H = new SuperMap.Layer.Markers("历史火灾点");
//    //几何圆查询
//    drawPolygon1 = new SuperMap.Control.DrawFeature(vectorLayer_H, SuperMap.Handler.RegularPolygon, { handlerOptions: { sides: 50 } });
//    drawPolygon1.events.on({ "featureadded": drawCompleted });
//    //多边形查询
//    drawPolygon2 = new SuperMap.Control.DrawFeature(vectorLayer_H, SuperMap.Handler.Polygon);
//    drawPolygon2.events.on({ "featureadded": drawCompleted });
//    //点查询
//    drawPointr_H = new SuperMap.Control.DrawFeature(vectorLayer_H, SuperMap.Handler.Point);
//    drawPointr_H.events.on({ "featureadded": drawPointCompleted });
//    //线查询
//    drawLiner_H = new SuperMap.Control.DrawFeature(vectorLayer_H, SuperMap.Handler.Path);
//    drawLiner_H.events.on({ "featureadded": drawCompleted });
//    //矩形
//    drawRectangle = new SuperMap.Control.DrawFeature(vectorLayer_H, SuperMap.Handler.Box);
//    drawRectangle.events.on({ "featureadded": drawRectangleCompleted });
//    //历史查询end

//    map = new SuperMap.Map("map",//要绑定的html标签ID
//        {
//            controls: [//控件参数
//             //  new SuperMap.Control.LayerSwitcher(),//图层选择控件类。 用于控制地图中的图层可见性。
//               new SuperMap.Control.ScaleLine(),//比例尺控件。默认位置为地图左下角。
//               new SuperMap.Control.PanZoomBar(),//平移缩放类。 用于平移缩放地图，默认情况下垂直显示在地图左上角。
//               new SuperMap.Control.Navigation({//此控件处理伴随鼠标事件（拖拽，双击、鼠标滚轮缩放）的地图浏览， 如果创建地图时没有设置任何控件，此控件会默认添加到地图
//                   dragPanOptions: {
//                       enableKinetic: true//设置是否使用拖拽动画。默认为false，不使用动画。
//                   }
//               }),
//                 //历史查询begin
//                drawPolygon1, drawPolygon2, drawPointr_H, drawLiner_H, drawRectangle,
//                //历史查询end
//               drawPolygon,
//               drawPoint_T,//点
//               drawLine,
//            //   vectorLine_LZ,//LZ的绘线对象
//               chen_CustomPoint,
//               drawPointmzj,
//                    selectmzj
//            ], units: "m",//地图的单位
//            scales: [1 / 30000, 1 / 20000, 1 / 10000, 1 / 7500, 1 / 5000, 1 / 2000]//比例尺
//        });
//    // map.events.on({ "click": closeWinFindPlanDetails });
//    //图层相互叠加
//    map.allOverlays = false;
//    //初始化图层
//    seriousMarkerLayer = new SuperMap.Layer.Markers("未出警图层");
//    moderateMarkerLayer = new SuperMap.Layer.Markers("已出警图层");
//    safetyMarkerLayer = new SuperMap.Layer.Markers("收队图层");

//    map.addControl(new SuperMap.Control.MousePosition());//该控件显示鼠标移动时，所在点的地理坐标
//    map.addControl(overviewMap);//添加鹰眼
//    map.events.on({ 'zoomend': zoomendMap });//地图缩放完成事件
//    //隐藏鹰眼div
//    $('#btnOverviewMap').attr('title', '显示鹰眼');
//    $('#btnOverviewMap').attr('indexTyep', 1);
//    // $(document.getElementById('SuperMap.Control.OverviewMap_11')).hide();
//    $('.smControlOverviewMap').hide();


//    //获取数据库的地图url
//    $.post("/index/getMapUrl", function (data) {
//        if (data.length > 0) {
//            host = data[0].Url.trim();//域名
//            url = host + data[1].Url.trim();//卫星图
//            url2 = host + data[2].Url.trim();//行政图
//            ugcv5url = host + data[3].Url.trim();//卫星图切片地址
//            ugcv5url2 = host + data[4].Url.trim();//行政图切片地址
//            urlNetwork = host + data[5].Url.trim();//交通网络数据
//            urldata = host + data[6].Url.trim();//数据服务
//            urldataAlarm = host + data[7].Url.trim();//警情数据集
//            layer = new SuperMap.Layer.TiledDynamicRESTLayer("行政区划图",
//               ugcv5url2,//图层的服务地址，是数组也可以是单个url，前者支持多地图服务轮询出图，大大提高显示速度。 
//                {
//                    transparent: true,//transparent（图层是否透明,默认为false）
//                    cacheEnabled: true//cacheEnabled（是否使用服务端的缓存，默认为true）
//                }, {
//                    maxResolution: "auto",// 在图层实例化的时候设置图层最大的分辨率，默认最大的是360度/256像素（投影为4326），相当于缩放级别为0级。 不同的投影下maxResolution会不同，内部会进行计算。
//                    // useCanvas: false,////设置是否将一个图层用Canvas元素显示，默认为true，使用Canvas显示。 图层在初始化时会进行浏览器检测，若不支持Canvas方式显示时，自动处理为Image 方式出图，该属性会被设置成false。
//                    useCORS: true//使用跨域资源共享策略，这时请求的瓦片必须带有”access-control-allow-origin”响应头， 但是此时瓦片不带cookies信息，如果要带上cookies的信息，还要加一个响应头——”access-control-allow-credentials”, 如果”access-control-allow-origin”响应头不能为”*”，否则也没有cookies信息。默认为:false
//                    //如果useCORS设置了 false ，就不能截图了，就会出错
//                });
//            layer.isBaseLayer = true;
//            layer.bool = true;
//            //监听图层信息加载完成事件
//            layer.events.on({
//                "layerInitialized": addLayer1,//底图加载完成事件
//                "loadstart": loadstartMap,//当图层开始加载时触发事件。
//                "loadend": loadendMap//当图层结束加载时候触发事件。
//            });
//            $.fn.zTree.init($("#treeDemo"), setting, json);//绑定树形
//        }
//    });
//    markerLayermzj = new SuperMap.Layer.Markers("markerLayerPoint");

//});

//加载图层1
function addLayer1() {
    //初始化图层，此图层在最上层，做卷帘图层 
    baseLayer = new SuperMap.Layer.TiledDynamicRESTLayer("卫星地图", ugcv5url, { transparent: true, cacheEnabled: true }, { maxResolution: "auto", useCORS: true });
    baseLayer.isBaseLayer = true;
    baseLayer.bool = false;
    baseLayer.events.on({
        "layerInitialized": addLayer,//底图加载完成事件
        "loadstart": loadstartMap,//当图层开始加载时触发事件。
        "loadend": loadendMap//当图层结束加载时候触发事件。
    });

}
//加载基础设置
function addDase() {
    $(".rides-cs").hide();//隐藏右侧
    showOrFence();//收缩代码
    changeFrameHeight(); //计算嵌套标签的高度
    $('#content').click(function () {
        $('li.user').removeClass('open');
    });
    //切换功能背景颜色
    $('.navbar-nav li').click(function (e) {
        $(this).tab('show');
    });

    //拖拽
    dragAndDropThePerimeterQuery();//周边查询
    dragAndDropThePerimeterSelectDivQuery();//查询窗体结果

    dragAndDrop();//统计窗体拖动
    dragAndDrop1();//图层控制器窗体拖动
    dragAndDrop2();//消防设备详情体拖动
    dragAndDrop3();//消防人员详情体拖动
    dragAndDrop_T();
    //初始化位置

    addShoDuiTangKangBase();//报警点收队

    $('#UserName_a').text($('#PoliceName').val());//用户名称
    $('#portrait').attr('src', $('#PicturePath').val());//用户头像路径
}
//改变浏览器窗口大小，执行方法
window.onresize = function () {
    changeFrameHeight();
}
//计算嵌套标签的高度
function changeFrameHeight() {
    var content_div = document.getElementById("map");
    var height = window.document.documentElement.clientHeight;
    var navbar = document.getElementById('navbar').offsetHeight;
    var titleFenceTow_con = parseInt($('#titleFenceTow_con').height());
    $('body').css('padding-top', navbar + 'px');
    $('#content').css('height', (height - navbar) + 'px');

    setTimeout(function () {
        var content_div = document.getElementById("map");
        var height = document.documentElement.clientHeight;
        var navbar = document.getElementById('navbar').offsetHeight;
        var titleFenceTow_con = parseInt($('#titleFenceTow_con').height());
        $('body').css('padding-top', navbar + 'px');
        $('#content').css('height', (height - navbar) + 'px');

    }, 500);
}
//屏幕小时单击隐藏导航条
function clickHidesNav() {
    var Width = window.document.documentElement.clientWidth;
    if (Width <= 768) {
        $('#top-Navbar-collapse').removeClass('in');
        $('#bottom-Navbar-collapse').removeClass('in');
        changeFrameHeight();
    }
}



//展开或者收起导航栏
function hiddenTitleFence(t) {
    var status = parseInt($(t).attr('status'));//获取状态
    if (status == 0) {
        $(t).attr('status', 1);
        $(t).attr('title', '展开导航条');
        $(t).find('img').attr('src', '/content/images/downward.png');
    } else {
        $(t).attr('status', 0);
        $(t).attr('title', '收起导航条');
        $(t).find('img').attr('src', '/content/images/upward.png');
    }
    $('#titleFence').toggleClass('visible-xs');
    changeFrameHeight();
}


//跳转个人西面 

function hh() {


}

//跳转个人资料
function userData() {

    window.location.href = '/index/userData?OpenType=1';
}

//退出登录
function colseLogIn_a() {
    if (confirm('确定退出登录？')) {
        window.location.href = '/index/Login';
    }
}

//收缩代码
function showOrFence() {

    //左侧栏
    //单击显示左侧栏
    $("#supervise_Show").click(function () {
        $('#ContentView').animate({ width: 'show', opacity: 'show' }, 'normal', function () {
            $('#ContentView').show();
        });
        $('#supervise_Show').attr('style', 'display:none');
        $('#supervise_Hide').attr('style', 'display:block');
    });

    //单击隐藏左侧栏
    $("#supervise_Hide").click(function () {
        $('#ContentView').animate({ width: 'hide', opacity: 'hide' }, 'normal', function () {
            $('#ContentView').hide();
        });
        $('#supervise_Show').attr('style', 'display:block');
        $('#supervise_Hide').attr('style', 'display:none');

    });

    //右侧栏
    //单击显示右侧栏
    $("#aFloatTools_Show").click(function () {
        $('#divFloatToolsView').animate({ width: 'show', opacity: 'show' }, 'normal', function () {
            $('#divFloatToolsView').show();
        });
        $('#aFloatTools_Show').attr('style', 'display:none');
        $('#aFloatTools_Hide').attr('style', 'display:block');
    });

    //单击隐藏右侧栏
    $("#aFloatTools_Hide").click(function () {
        $('#divFloatToolsView').animate({ width: 'hide', opacity: 'hide' }, 'normal', function () {
            $('#divFloatToolsView').hide();
        });
        $('#aFloatTools_Show').attr('style', 'display:block');
        $('#aFloatTools_Hide').attr('style', 'display:none');

    });
    //-------------------------NED-------------------------------
    // $("#supervise_Show").click();//显示左侧栏
    //$("#aFloatTools_Show").click();//显示右侧栏
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var openType = 0;
//=========================================功能选择===============================================
function functionSelect(t) {
    var typeIndex = parseInt($(t).attr('typeIndex'));

    if (typeIndex == 0) {
        $(".rides-cs").hide();//隐藏右侧
        $("#aFloatTools_Hide").click();
        $('.Operate_div').hide();
        $('#RealTimeCenterDiv').hide();
        $("#aFloatTools_Show").click();
        $('.functionA').attr('status', 0);
        $(t).attr('status', 1);
        clearFeatures();//历史查询——清除画图的样式

        $('#CaseStatistics').hide();
        $('#FireInformation').hide();
        $('#Conflagration_Details').hide();
        $('#Popup_Detail').hide();
        $('#Police_renwu').hide();


        if (openType == 1) {
            map.removeAllPopup();
        }

        document.getElementById('alarmPointAll').checked = true;
        alarmPointAllShow();
        alarmMarkerLayeraa.setVisibility(true);
        $('#realWarning2').show();
        $('#map_bottom').show();



        CloseZhouBian();//关闭周边分析

        closeDialog_T();//关闭搜索警点弹窗
        $('#realWarning_table tr').css('background-color', '#fff');
        if (openType == 0) {
            map.removeAllPopup();
        }

        pw_seriousMarkerLayer.clearMarkers();

        //出警关闭--- zjdm
        ClearLayer();
        $('#LZJieMian').hide();
        $('#delIssue').hide();
        $('#HDXShouDuiMian').hide();
        $('#HDXShouDui').hide();
        $('#HDXYiChuJingMian').hide();
        $('#HDXdelIssue').hide();

        $("#aFloatTools_Hide").click();

    }
    else if (typeIndex == 1) {
        $(".rides-cs").show();//隐藏右侧
        $('.Operate_div').hide();
        $('#HistoricalInquiryDiv').show();
        $("#aFloatTools_Show").click();
        $('.functionA').attr('status', 0);
        $(t).attr('status', 1);
        //FireGrade.length = null;//复选框清空事件
        showCaseStatistics();
        closeFireInformation()//历史查询重置按钮
        CloseZhouBian();//关闭周边分析

        closeDialog_T();//关闭搜索警点弹窗
        $('#realWarning_table tr').css('background-color', '#fff');
        if (openType == 0) {
            map.removeAllPopup();
        }


        //出警关闭--- zjdm
        ClearLayer();
        $('#LZJieMian').hide();
        $('#delIssue').hide();
        $('#HDXShouDuiMian').hide();
        $('#HDXShouDui').hide();
        $('#HDXYiChuJingMian').hide();
        $('#HDXdelIssue').hide();


        document.getElementById('alarmPointAll').checked = false;
        alarmPointAllShow();
        alarmMarkerLayeraa.setVisibility(false);
        $('#realWarning2').hide();
        $('#map_bottom').hide();
    }

    //把上一次选中的报警点图片换点
    //把上一次选中的报警点图片换点
    for (var i = 0; i < seriousMarkerLayer.markers.length; i++) {//未出警
        seriousMarkerLayer.markers[i].setUrl('/SuperMap/images/red.png');
    }
    for (var i = 0; i < moderateMarkerLayer.markers.length; i++) {//已出警
        moderateMarkerLayer.markers[i].setUrl('/SuperMap/images/yellow-2.png');
    }
    for (var i = 0; i < safetyMarkerLayer.markers.length; i++) {//已收队
        safetyMarkerLayer.markers[i].setUrl('/SuperMap/images/greed.png');
    }
    for (var i = 0; i < alarmMarkerLayeraa.markers.length; i++) {//新警情
        alarmMarkerLayeraa.markers[i].setUrl('/SuperMap/images/2cf11b3bb909db55bbd6360317fd7f15.gif');
    }

    openType = typeIndex;
    clickHidesNav();
    map.zoomToMaxExtent();
    loadWeb();
    lastAlarmID = 0;

    nowSelectAlarm.x = 0;
    nowSelectAlarm.y = 0;
    nowSelectAlarm.AlarmID = 0;
    nowSelectAlarm.AlarmStateID = 0;

    //关闭消防站详情
    CloseFireFightingApparatusXiangQing();
    ClosefirefighterXiangQing();
    boolOpenNew = true;
    CloseWin();//关闭收队弹窗

    CloseDiastimeter();
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//=================================页面或者打开关闭操作div事件=======================================
//左侧界面
//关闭树形
function closeTree() {
    $('#ContentView').animate({ width: 'hide', opacity: 'hide' }, 'normal', function () {
        $('#ContentView').hide();
        $('#supervise_Show').attr('style', 'display:block');
        $('#supervise_Hide').attr('style', 'display:none');
        $('.rides-cs1').hide();
    });
}
//显示详情模板
function showLeftDetailTempletDiv() {

    //左往右移
    $('#leftDetailTempletDiv')
        .animate({ left: '-280px' }, 0, function () {

            $('#leftDetailTempletDiv').show();
        })
        .animate({ left: '0px' }, 1000, function () {

        });

}
//关闭详情模板
function closeLeftDetailTempletDiv() {

    // 右往左移
    $('#leftDetailTempletDiv')
        .animate({ left: '0px' }, 0)
        .animate({ left: '-280px' }, 1000, function () {
            $('#leftDetailTempletDiv').hide();
        });
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//右侧界面

//详情界面模板
//打开详情界面
function ShowDetailOne() {
    //左往右移
    $('#detailOne').show();
    $('#detailOne')
       .animate({ left: '100%', right: '-100%' }, 0)
       .animate({ left: '0%', right: '0%' }, 1000);
}
//关闭详情界面
function closeDetailOne() {
    //左往右移
    $('#detailOne')
        .animate({ left: '0%', right: '0%' }, 0)
        .animate({ left: '100%', right: '-100%' }, 1000, function () {
            $('#detailOne').hide();
        });
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//跳转到指挥中心界面
function openCaseDetail(t) {
    var status = parseInt($(t).attr('status'));
    var id = parseInt($(t).attr('id'));
    var type = parseInt($(t).attr('type'));
    if (parseInt($('#controlCenter').attr('status')) == 1) {
        $('#RealTimeCenterDiv').show();
    }
    if (type == 1) {
        for (var i = 0; i < seriousMarkerLayer.markers.length; i++) {
            if (seriousMarkerLayer.markers[i].id == id) {
                seriousMarkerLayer.markers[i].bool = true;
                openInfoWinPoliceIntelligence(seriousMarkerLayer.markers[i]);
                var X = seriousMarkerLayer.markers[i].getLonLat().lon;
                var Y = seriousMarkerLayer.markers[i].getLonLat().lat;
                map.setCenter(new SuperMap.LonLat(X, Y));
            }
        }
        if ($("#LZJieMian").is(":hidden") == true) {
            $('#LZJieMian').show();
            $('#LZJieMian')
            .animate({ left: '285px' }, 0)
            .animate({ left: '0' }, 1000, function () {
                $('#HDXYiChuJingMian').hide();
                $('#HDXdelIssue').hide();
                $('#HDXShouDuiMian').hide();
                $('#HDXShouDui').hide();
            });
        }
    }
    else if (type == 2) {
        for (var i = 0; i < moderateMarkerLayer.markers.length; i++) {
            if (moderateMarkerLayer.markers[i].id == id) {
                moderateMarkerLayer.markers[i].bool = true;
                openInfoWinPoliceIntelligence(moderateMarkerLayer.markers[i]);
                var X = moderateMarkerLayer.markers[i].getLonLat().lon;
                var Y = moderateMarkerLayer.markers[i].getLonLat().lat;
                map.setCenter(new SuperMap.LonLat(X, Y));
            }
        }
        //左往右移
        if ($("#HDXYiChuJingMian").is(":hidden") == true) {
            $('#HDXYiChuJingMian').show();
            $('#HDXYiChuJingMian')
           .animate({ left: '285px' }, 0)
           .animate({ left: '0' }, 1000, function () {
               $('#LZJieMian').hide();
               $('#HDXShouDuiMian').hide();
               $('#delIssue').hide();
               $('#HDXShouDui').hide();
           });
        }


    }
    else if (type == 3) {
        for (var i = 0; i < safetyMarkerLayer.markers.length; i++) {
            if (safetyMarkerLayer.markers[i].id == id) {
                safetyMarkerLayer.markers[i].bool = true;
                openInfoWinPoliceIntelligence(safetyMarkerLayer.markers[i]);
                var X = safetyMarkerLayer.markers[i].getLonLat().lon;
                var Y = safetyMarkerLayer.markers[i].getLonLat().lat;
                map.setCenter(new SuperMap.LonLat(X, Y));
            }
        }
        if ($("#HDXShouDuiMian").is(":hidden") == true) {
            $('#HDXShouDuiMian').show();
            $('#HDXShouDuiMian')
         .animate({ left: '285px' }, 0)
         .animate({ left: '0' }, 1000, function () {
             $('#HDXYiChuJingMian').hide();
             $('#HDXdelIssue').hide();
             $('#LZJieMian').hide();
             $('#delIssue').hide();
         });
        }

    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//地图缩放操作完成后被触发
function zoomendMap(zoomend) {
    var zoom = parseInt(zoomend.object.zoom);//获取缩放等级
    zoomend2(zoom);
}
function zoomend2(zoom) {

    if (zoom == 0) {//第二级 1:30000
        //设置警务网格样式
        for (var i = 0; i < vectorLayer_WG.features.length; i++) {
            var features = vectorLayer_WG.features[i];
            var smID = parseInt(features.smID);
            if (smID == 1) {
                features.style.fontSize = '18px';
                features.style.fontOpacity = '1';
                features.style.fontColor = "Orange";
            } else {
                features.style.fontSize = '10px';
                features.style.fontOpacity = '1';
                features.style.fontColor = "Orange";
            }
            features.style.fillOpacity = 0.2;
        }
        for (var i = 0; i < vectorLayer_default.features.length; i++) {
            vectorLayer_default.features[i].style.fillOpacity = 0.08;
            vectorLayer_default.features[i].style.fontSize = "18px";
            vectorLayer_default.features[i].style.fontOpacity = '1';
            vectorLayer_default.features[i].style.fontColor = '#003eec';
        }

        for (var i = 0; i < chen_CustompointLayer.features.length; i++) {
            if (chen_CustompointLayer.features[i] != null && chen_CustompointLayer.features[i].style != null) {

                chen_CustompointLayer.features[i].style.fillOpacity = 0.3;

            }
        }

        map.pan(0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明
        map.pan(-0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明

    }
    else if (zoom == 1) {//第二级 1:20000
        //设置警务网格样式
        for (var i = 0; i < vectorLayer_WG.features.length; i++) {
            var features = vectorLayer_WG.features[i];

            var smID = parseInt(features.smID);
            if (smID == 1) {
                features.style.fontSize = '20px';
                features.style.fontOpacity = '1';
                features.style.fontColor = "Orange";
            } else {
                features.style.fontSize = '10px';
                features.style.fontOpacity = '1';
                features.style.fontColor = "Orange";
            }
            features.style.fillOpacity = 0.15;
        }
        for (var i = 0; i < vectorLayer_default.features.length; i++) {
            vectorLayer_default.features[i].style.fillOpacity = 0.05;
            vectorLayer_default.features[i].style.fontSize = 20 + "px";
            vectorLayer_default.features[i].style.fontOpacity = '1';
            vectorLayer_default.features[i].style.fontColor = '#003eec';
        }
        for (var i = 0; i < chen_CustompointLayer.features.length; i++) {
            if (chen_CustompointLayer.features[i] != null && chen_CustompointLayer.features[i].style != null) {
                chen_CustompointLayer.features[i].style.fillOpacity = 0.25;

            }

        }

        map.pan(0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明
        map.pan(-0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明

    }
    else if (zoom == 2) {//第二级 1:10000
        //设置警务网格样式
        for (var i = 0; i < vectorLayer_WG.features.length; i++) {
            var features = vectorLayer_WG.features[i];
            var smID = parseInt(features.smID);
            if (smID == 1) {
                features.style.fontSize = '25px';
                features.style.fontOpacity = '1';
                features.style.fontColor = "Orange";
            } else {
                features.style.fontSize = '12px';
                features.style.fontOpacity = '1';
                features.style.fontColor = "Orange";
            }
            features.style.fillOpacity = 0.05;
        }
        for (var i = 0; i < vectorLayer_default.features.length; i++) {
            vectorLayer_default.features[i].style.fillOpacity = 0.03;
            vectorLayer_default.features[i].style.fontSize = 25 + "px";
            vectorLayer_default.features[i].fontOpacity = "1";
            vectorLayer_default.features[i].style.fontColor = "#003eec";
        }
        for (var i = 0; i < chen_CustompointLayer.features.length; i++) {
            if (chen_CustompointLayer.features[i] != null && chen_CustompointLayer.features[i].style != null) {
                chen_CustompointLayer.features[i].style.fillOpacity = 0.2;

            }
        }

        map.pan(0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明
        map.pan(-0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明

    }
    else if (zoom == 3) {//第二级 1:7500
        //设置警务网格样式
        for (var i = 0; i < vectorLayer_WG.features.length; i++) {
            var features = vectorLayer_WG.features[i];
            var smID = parseInt(features.smID);
            if (smID == 1) {
                features.style.fontSize = "30px";
                features.style.fontOpacity = "1";
                features.style.fontColor = "Orange";

            } else {
                features.style.fontSize = "15px";
                features.style.fontOpacity = "1";
                features.style.fontColor = "Orange";
            }
            features.style.fillOpacity = 0.02;
        }
        for (var i = 0; i < vectorLayer_default.features.length; i++) {
            vectorLayer_default.features[i].style.fillOpacity = 0.02;
            vectorLayer_default.features[i].style.fontSize = "30px";
            vectorLayer_default.features[i].style.fontOpacity = "1";
            vectorLayer_default.features[i].style.fontColor = "#003eec";
        }
        for (var i = 0; i < chen_CustompointLayer.features.length; i++) {
            if (chen_CustompointLayer.features[i] != null && chen_CustompointLayer.features[i].style != null) {
                chen_CustompointLayer.features[i].style.fillOpacity = 0.2;

            }
        }

        map.pan(0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明
        map.pan(-0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明

    } else if (zoom == 4) {//第二级 1:5000

        //设置警务网格样式
        for (var i = 0; i < vectorLayer_WG.features.length; i++) {
            var features = vectorLayer_WG.features[i];
            var smID = parseInt(features.smID);

            if (smID == 1) {

                features.style.fontSize = "30px";
                features.style.fontOpacity = "1";
                features.style.fontColor = "Orange";

            } else {
                features.style.fontSize = "17px";
                features.style.fontOpacity = "1";
                features.style.fontColor = "Orange";
            }
            features.style.fillOpacity = 0;
        }

        for (var i = 0; i < vectorLayer_default.features.length; i++) {
            vectorLayer_default.features[i].style.fillOpacity = 0;
            vectorLayer_default.features[i].style.fontSize = "30px";
            vectorLayer_default.features[i].style.fontOpacity = "1";
            vectorLayer_default.features[i].style.fontColor = "#003eec";
        }
        for (var i = 0; i < chen_CustompointLayer.features.length; i++) {
            if (chen_CustompointLayer.features[i] != null && chen_CustompointLayer.features[i].style != null) {
                chen_CustompointLayer.features[i].style.fillOpacity = 0.18;

            }
        }

        map.pan(0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明
        map.pan(-0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明

    } else if (zoom == 5) {//第二级 1:2500

        //设置警务网格样式
        for (var i = 0; i < vectorLayer_WG.features.length; i++) {
            var features = vectorLayer_WG.features[i];
            var smID = parseInt(features.smID);

            if (smID == 1) {

                features.style.fontSize = "30px";
                features.style.fontOpacity = "1";
                features.style.fontColor = "Orange";

            } else {
                features.style.fontSize = "17px";
                features.style.fontOpacity = "1";
                features.style.fontColor = "Orange";
            }
            features.style.fillOpacity = 0;
        }

        for (var i = 0; i < vectorLayer_default.features.length; i++) {
            vectorLayer_default.features[i].style.fillOpacity = 0;
            vectorLayer_default.features[i].style.fontSize = "30px";
            vectorLayer_default.features[i].style.fontOpacity = "1";
            vectorLayer_default.features[i].style.fontColor = "#003eec";
        }
        for (var i = 0; i < chen_CustompointLayer.features.length; i++) {
            if (chen_CustompointLayer.features[i] != null && chen_CustompointLayer.features[i].style != null) {
                chen_CustompointLayer.features[i].style.fillOpacity = 0.1;

            }
        }

        map.pan(0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明
        map.pan(-0.0001, 0, { animate: false });//偏移一点地图，可以有刷新地图的效果，可以使设置的图层立刻透明

    }

}
//异步加载图层
function addLayer() {
    map.addLayers([baseLayer,
        layer,//底图             
        vectorLayer_default,
        vectorLayer_WG,
        pw_seriousMarkerLayer,

         SmallFireHouseLayer,//小型消防站  
        WeiXingFireHouseLayer,//微型消防站
        PoliceSubstationLayer,//公安派出所
        alarmMarkerLayeraa,
        blueLayer_T,//二次定位图层
        vectorPoint_T,//选点图层
        chen_DangerousPoerMarkers,
        seriousMarkerLayer,//未出警图层
        moderateMarkerLayer,//已出警图层
        safetyMarkerLayer,//已收队图层
        markerLayer,
        polygonLayer,
        markerLayermzj,
         vectorLayermzj,
        polygonLayermzj,
        chen_CustompointLayer,
        chen_DangerousMarkers,

        Jia_markers,


         //李志添加的图层
        LZFireCar,
        LayerSchemeeScheme,
         chen_CustompointRouteLayer,
        LayerSchemeeAnimation,
        LZFirePlace,
        LZcar_animatorVector,

        //历史查询-begin
        vectorLayer_H, markerLayer_H
                //历史查询-end
    ]);
    map.setCenter(new SuperMap.LonLat(113.91, 22.55), heightsize);
    map.setBaseLayer(layer);


    showJustMap();//调用定位显示方法
    selectMapBound();//查询派出所默认边界


    //加载消防站点图层
    WeiXingFireHousePoint();

    SmallFireHousePoint();


    PoliceSubstationPoint();

    //去掉显示未出警，已出警，已收队的标记物
    document.getElementById('alarmPointAll').checked = false;
    alarmPointAllShow();

    loadWeb();//加载南山区网格
    selectAlarm();
    timeAlarm = setInterval("selectAlarm()", 10000);//实时刷新警情

    var obj = new Object();
    obj.communityWebID = "4";
    obj.webType = "1";
    obj.webID = "1";
    clickSelectMap(null, null, obj, null);

}
//把地图最好的效果显示出来
function showJustMap() {
    map.zoomToMaxExtent();
}
//当图层开始加载时触发事件。
function loadstartMap() {
    var Width = window.document.documentElement.clientWidth;
    if (Width < 768) {//判断浏览器宽度小于768自动把树形隐藏

    } else {
        if (boolAddMap == false) {//不是加载地图状态在显示加载界面
            $("#loadMap").show();
        }
    }
}

//当图层结束加载时候触发事件。
function loadendMap() {
    var Width = window.document.documentElement.clientWidth;
    if (Width < 768) {//判断浏览器宽度小于768自动把树形隐藏
        if (boolAddMap == false) {//地图加载状态为假时执行

            $("#loadMap").hide();
        }
    } else {
        if (boolAddMap == false) {//地图加载状态为假时执行

            $("#loadMap").hide();
        }
    }


    if (bbolsss == true) {//判断是不是第一次加载地图挖完成设置最好的可视范围
        bbolsss = false;//第一次加载完成

        if (defaultBounds != null) {
            var Width = window.document.documentElement.clientWidth;//获取浏览器窗口可视宽度
            if (Width < 768) {//判断浏览器宽度小于768自动把树形隐藏

            } else {
                //判断是不是第一次登陆进来
                $.getJSON('/index/getPromptLoadMap', function (data) {
                    if (parseInt(data) == 1) {
                        showLoadMapDiv();//如果是第一次登陆就提示加载地图
                    }
                });
            }
        }
    }
    if (boolAddMap == true) {//判断是不是要缓存地图

        //判断是不是加载地图全部完成
        if (arrLoadMap.length > 0) {
            //继续缓存
            map.setCenter(new SuperMap.LonLat(arrLoadMap[0].x, arrLoadMap[0].y), 0);//设置中心点和初始缩放等级，一定要设置初始缩放等级，不然就没有效果了
            map.zoomTo(loadMapindexType);//设置缩放等级，也就是获取到的下拉框选择的缩放等级
            addLoadMap.push(arrLoadMap[0]);//添加到缓存完成的数组
            arrLoadMap.shift();//移除已缓存完成的点，移除第一个元素

            //计算进度条
            var countAn = parseInt((addLoadMap.length / countSumMap) * 100);
            $('#countMapText').text(countAn + '%');
            $('#countMap').css('width', countAn + '%');
            $('#countMap').attr('aria-valuenow', countAn);
        } else {

            boolAddMap = false;//缓存完成
            $('#loadMapText').hide();//隐藏进度条
            $("#loadMap").hide();//隐藏加载界面
            //计算地图要缩放的级别
            showJustMap();//调用定位显示方法
            $('#btnSelectAllMap').attr('indexType', 1);//缓存完成状态
            $('#btncontinueSelectAllMap').hide();//显示继续缓存地图按钮
            cacheMapFinishCount++; //缓存地图完成次数
            loadWeb();//加载南山区网格
        }
    }
}

//======================================树形单击查询网格事件===================================
var webTypeTree = 0;
//树形单击事件
function clickSelectMap(event, treeId, treeNode, clickFlag) {
    var Width = window.document.documentElement.clientWidth;
    if (Width > 768) {//判断浏览器宽度小于768自动把树形隐藏
        $("#aFloatTools_Show").click();
    } else {
        $('#aFloatTools_Hide').click();
        $("#supervise_Hide").click();
    }
    document.getElementById('ClickSheQuWeb').checked = true;
    vectorLayer_WG.setVisibility(true);
    //绑定网格类型
    var communityWebID = parseInt(treeNode.communityWebID);//获取等级类型
    webTypeTree = parseInt(treeNode.webType);//网格ID
    var webID = parseInt(treeNode.webID);//网格ID
    //声明字段
    var queryParam = [], queryBySQLParams, queryBySQLService;

    if (webTypeTree == 1) {
        ////查询警务子网格
        //queryParam.push(new SuperMap.REST.FilterParameter({
        //    name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
        //    attributeFilter: "SmID=" + webID,//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
        //}));
        //查询警务子网格
        queryParam.push(new SuperMap.REST.FilterParameter({
            name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
            attributeFilter: "far_Dat=" + webID,//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
        }));

    } else if (webTypeTree == 2) {
        //查询警务子网格
        queryParam.push(new SuperMap.REST.FilterParameter({
            name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
            attributeFilter: "SmID=" + webID,//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
        }));
    }

    //SQL 查询参数类。 该类用于设置 SQL 查询的相关参数。
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: queryParam//查询过滤条件参数数组
    });
    //SQL 查询服务类。 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {//url 服务的访问地址
        eventListeners: { "processCompleted": processCompleted_PG, "processFailed": processFailed_PG }
    });
    //传递到服务端
    queryBySQLService.processAsync(queryBySQLParams);

}

//加载南山区
function loadWeb() {
    vectorLayer_default.removeAllFeatures();//清除上一次查询
    //声明字段
    var queryParam = [], queryBySQLParams, queryBySQLService;
    //查询警务子网格
    queryParam.push(new SuperMap.REST.FilterParameter({
        name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
        attributeFilter: "SmID=1",//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
    }));
    //SQL 查询参数类。 该类用于设置 SQL 查询的相关参数。
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: queryParam//查询过滤条件参数数组
    });
    //SQL 查询服务类。 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {//url 服务的访问地址
        eventListeners: { "processCompleted": processCompleted_PG, "processFailed": processFailed_PG }
    });

    //传递到服务端
    queryBySQLService.processAsync(queryBySQLParams);

}

function processCompleted_PG(queryEventArgs) {
    //声明字段
    var i, j, feature, bounds, N = [], S = [], W = [], E = [],
    result = queryEventArgs.result;//获取服务器传回来的数据
    vectorLayer_WG.removeAllFeatures();//清除上一次查询
    var features = [];
    //判断是否有数据
    if (result && result.recordsets) {//判断查询的查询结果记录集数组是否为空
        for (i = 0; i < result.recordsets.length; i++) {//循环记录集数组
            //features===用于存放矢量要素
            if (result.recordsets[i].features) {//判断记录集数组的矢量要素是否为空
                //如果记录集数组的矢量要素不为空，则又循环 记录集数组的矢量要素
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];//获取记录集数组的矢量要素

                    //判断显示面或点
                    if (feature.geometry.CLASS_NAME == SuperMap.Geometry.Point.prototype.CLASS_NAME) {//判断返回的数据是不是这个数据

                    }
                    else {

                        var smID = parseInt(feature.data.SmID);
                        feature.smID = smID;
                        if (smID == 1) {
                            //街道网格
                            feature.style = {
                                strokeColor: '#0322ff',//边颜色
                                strokeWidth: 1,//边宽度
                                strokeDashstyle: 'dash',//边类型，虚线
                                fillColor: '#0322ff',//填充颜色
                                fillOpacity: 0.08,//透明度
                                //label: feature.data.Name,
                                fontColor: '#0322ff',
                                fontOpacity: "1",
                                fontSize: '18px',
                                fontWeight: 700
                            };
                            vectorLayer_default.addFeatures(feature);
                        } else {
                            //社区网格
                            feature.style = {
                                strokeColor: 'Orange',//边颜色
                                strokeWidth: 1,//边宽度
                                strokeDashstyle: 'solid',//边类型，虚线
                                fillColor: 'Orange',//填充颜色
                                fillOpacity: 0.15,//透明度
                                label: feature.data.Name,
                                fontColor: 'Orange',
                                fontOpacity: "1",
                                fontSize: '10px',
                                fontWeight: 700
                            };
                            vectorLayer_WG.addFeatures(feature);//给这个图层添加features。也就是把查询结果显示出来                                   
                        }

                        bounds = feature.geometry.bounds;
                        if (bounds != null) {
                            if (bounds.top != null && Boolean(bounds.top) == true) {
                                N.push(Number(bounds.top));
                            }
                            if (bounds.bottom != null && Boolean(bounds.bottom) == true) {
                                S.push(Number(bounds.bottom));
                            }
                            if (bounds.left != null && Boolean(bounds.left) == true) {
                                W.push(Number(bounds.left));
                            }
                            if (bounds.right != null && Boolean(bounds.right) == true) {
                                E.push(Number(bounds.right));
                            }
                        }
                    }
                }

            }
        }
    }

    if (W.length > 0 && S.length > 0 && E.length > 0 && N.length > 0) {
        var bounds = new SuperMap.Bounds(
                                      Math.min.apply(null, W),//最小的水平坐标系。
                                      Math.min.apply(null, S),//最小的垂直坐标系。
                                      Math.max.apply(null, E),//最大的水平坐标系。
                                      Math.max.apply(null, N) //最大的垂直坐标系。
                                  );

        map.zoomToExtent(bounds);//缩放到指定范围，重新定位中心点。
    }
}

function processFailed_PG(er) {

}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//=========================================地图底部图例勾选================================================================
//所有
function alarmPointAllShow() {
    if ($("#alarmPointAll").is(':checked') == true) { //当“所有”打钩时
        document.getElementById('alarmPointPink').checked = true;//未出警
        document.getElementById('alarmPointYellow').checked = true;//已出警
        document.getElementById('alarmPointGreen').checked = true;//收队
    }
    else { //当“所有”取消打钩时
        document.getElementById('alarmPointPink').checked = false;
        document.getElementById('alarmPointYellow').checked = false;
        document.getElementById('alarmPointGreen').checked = false;
    }
    alarmPointPink(1);//未出警方法
    alarmPointPink(2);//未出警方法
    alarmPointPink(3);//未出警方法
}

//其他选择
function alarmPointPink(index) {

    if (index == 1) {
        if (document.getElementById('alarmPointPink').checked == true) { //当打钩时
            seriousMarkerLayer.setVisibility(true);
        } else {
            document.getElementById('alarmPointAll').checked = false;
            seriousMarkerLayer.setVisibility(false);
        }
    } else if (index == 2) {
        if (document.getElementById('alarmPointYellow').checked == true) { //当打钩时
            moderateMarkerLayer.setVisibility(true);
        } else {
            document.getElementById('alarmPointAll').checked = false;
            moderateMarkerLayer.setVisibility(false);
        }
    } else if (index == 3) {
        if (document.getElementById('alarmPointGreen').checked == true) { //当打钩时
            safetyMarkerLayer.setVisibility(true);
        } else {
            document.getElementById('alarmPointAll').checked = false;
            safetyMarkerLayer.setVisibility(false);
        }
    }

    if (document.getElementById('alarmPointPink').checked == true && document.getElementById('alarmPointYellow').checked == true && document.getElementById('alarmPointGreen').checked == true) {
        document.getElementById('alarmPointAll').checked = true;
    } else {
        document.getElementById('alarmPointAll').checked = false;
    }

}

//隐藏或者显示 报警点状态 控制器
function hiddenFloot(t) {
    var status = parseInt($(t).attr('status'));//获取状态
    if (status == 0) {
        $(t).attr('status', 1);
        $(t).attr('title', '展开');

        $(t).find('img').attr('src', '/content/images/upward.png');
        $('#map_bottom_content').removeClass('visible-xs');
        $('#map_bottom_content').addClass('hidden-xs');
    } else {
        $(t).attr('status', 0);
        $(t).attr('title', '收起');
        $(t).find('img').attr('src', '/content/images/downward.png');
        $('#map_bottom_content').removeClass('hidden-xs');
        $('#map_bottom_content').addClass('visible-xs');
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>地图底部图例勾选>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//添加数据
function addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, boolOpen, EndOfProcessingTime, FireGradeMC, AddressDescribe) {
    var size = new SuperMap.Size(17, 17),//标记的大小
         offset = new SuperMap.Pixel(-(size.w / 2), -size.h);//此类用x,y坐标描绘屏幕坐标（像素点）
    var icon;
    if (AlarmStateID == 9) {//新警情
        icon = new SuperMap.Icon("/SuperMap/images/2cf11b3bb909db55bbd6360317fd7f15.gif", new SuperMap.Size(15, 18), offset);//图标类，表示显示在屏幕上的图标
    }
    else if (AlarmStateID == 10) {//未出警状态
        icon = new SuperMap.Icon("/SuperMap/images/red.png", size, offset);//图标类，表示显示在屏幕上的图标
    }
    else if (AlarmStateID == 11) {//已出警状态
        icon = new SuperMap.Icon("/SuperMap/images/yellow-2.png", size, offset);//图标类，表示显示在屏幕上的图标
    }
    else if (AlarmStateID == 12) {//已收队状态
        icon = new SuperMap.Icon("/SuperMap/images/greed.png", size, offset);//图标类，表示显示在屏幕上的图标
    }

    var marker = new SuperMap.Marker(new SuperMap.LonLat(Number(XCoordinate), Number(YCoordinate)), icon);
    marker.AddressOfTheCrime = AddressOfTheCrime;//警情地址
    marker.ReportTime = ReportTime;//报警时间
    marker.AlarmDescribe = AlarmDescribe;//警情描述
    marker.AlarmSourceTypeMC = AlarmSourceTypeMC;//警情来源类别
    marker.AlarmSourceTypeID = AlarmSourceTypeID;//警情来源类别ID
    marker.AlarmTypeMC = AlarmTypeMC;//警情类型
    marker.FireResistanceGradeMC = FireResistanceGradeMC;//耐火等级
    marker.AlarmTitle = AlarmTitle;//标题
    marker.AlarmID = AlarmID;//警情ID
    marker.AlarmStateID = AlarmStateID;//警情状态ID
    marker.AlarmNumber1 = AlarmNumber1;//编号
    marker.XCoordinate = XCoordinate;//X轴
    marker.YCoordinate = YCoordinate;//Y轴
    marker.EndOfProcessingTime = EndOfProcessingTime;//结束灭火时间
    marker.FireGradeMC = FireGradeMC;//火灾事故等级
    marker.AddressDescribe = AddressDescribe;//地址口述
    marker.bool = boolOpen;//自动打开

    marker.events.on({
        "click": openInfoWinPoliceIntelligence,
        "touchstart": openInfoWinPoliceIntelligence, //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
        "scope": marker
    });

    if (AlarmStateID == 9) {//新警情
        document.getElementById('iTunes_T').play();//铃声提醒
        alarmMarkerLayeraa.addMarker(marker);//添加覆盖物到标记图层}
    }
    else if (AlarmStateID == 10) {//未出警状态      
        seriousMarkerLayer.addMarker(marker);
    }
    else if (AlarmStateID == 11) {//已出警状态
        moderateMarkerLayer.addMarker(marker);
    }
    else if (AlarmStateID == 12) {//已收队状态
        safetyMarkerLayer.addMarker(marker);
    }

    //自动打开
    if (boolOpen == true) {
        openInfoWinPoliceIntelligence(marker);
    }
}
//打开对应的信息框
var infowinPoliceIntelligence = null;
var newInfowinPoliceIntelligence = null;//新警情
var zjRemoveMarkerQ;
var lastAlarmID = 0;
var bolSelect_T = false;//是否正在手动选择警点
var boolAddInfo = true;
function openInfoWinPoliceIntelligence(t) {

    if (bolSelect_T == true) {
        return false;
    }
    blueLayer_T.clearMarkers();//清空二次定位标记
    $("#selectAddress_T tr:not(:first)").html("");//清空搜索警点表格除首行外的所有数据
    $(".rides-cs").show();//隐藏右侧   
    closenewInfowinPoliceIntelligence(1);
    closeInfoWinPoliceIntelligence();
    map.removeAllPopup();
    var marker = this;//接收参数
    var AddressOfTheCrime;//警情地址
    var ReportTime;//报警时间
    var AlarmDescribee;//警情描述
    var AlarmSourceTypeMC;//警情来源类别
    var AlarmSourceTypeID;//警情来源类别ID
    var AlarmTypeMC;//警情类型
    var FireResistanceGradeMC;//耐火等级
    var AlarmTitle;//标题
    var AlarmID;//警情ID
    var AlarmStateID;//警情状态ID
    var AlarmNumber1;//编号
    var XCoordinate;//X轴
    var YCoordinate;//Y轴
    var EndOfProcessingTime;//结束灭火时间
    var FireGradeMC;//火灾事故等级
    var AddressDescribe;//案发地址口述

    //把上一次选中的报警点图片换点
    for (var i = 0; i < seriousMarkerLayer.markers.length; i++) {//未出警
        seriousMarkerLayer.markers[i].setUrl('/SuperMap/images/red.png');
    }
    for (var i = 0; i < moderateMarkerLayer.markers.length; i++) {//已出警
        moderateMarkerLayer.markers[i].setUrl('/SuperMap/images/yellow-2.png');
    }
    for (var i = 0; i < safetyMarkerLayer.markers.length; i++) {//已收队
        safetyMarkerLayer.markers[i].setUrl('/SuperMap/images/greed.png');
    }
    for (var i = 0; i < alarmMarkerLayeraa.markers.length; i++) {//新警情
        alarmMarkerLayeraa.markers[i].setUrl('/SuperMap/images/2cf11b3bb909db55bbd6360317fd7f15.gif');
    }
    if (t.bool == true) {
        AddressOfTheCrime = t.AddressOfTheCrime;
        ReportTime = t.ReportTime;
        AlarmDescribee = t.AlarmDescribe;
        AlarmSourceTypeMC = t.AlarmSourceTypeMC;
        AlarmSourceTypeID = t.AlarmSourceTypeID;
        AlarmTypeMC = t.AlarmTypeMC;
        FireResistanceGradeMC = t.FireResistanceGradeMC;
        AlarmTitle = t.AlarmTitle;
        AlarmID = t.AlarmID;
        number = t.number;
        AlarmStateID = t.AlarmStateID;
        AlarmNumber1 = t.AlarmNumber1;
        XCoordinate = t.XCoordinate;
        YCoordinate = t.YCoordinate;
        EndOfProcessingTime = t.EndOfProcessingTime;
        FireGradeMC = t.FireGradeMC;
        AddressDescribe = t.AddressDescribe;
        marker = t;
        zjRemoveMarkerQ = t;
        selectMarker = t;
        if (AlarmStateID == 9) {
            t.setUrl('/SuperMap/images/2cf11b3bb909db55bbd6360317fd7.gif');
        } else {


            t.setUrl('/SuperMap/images/Circle_Blue.png');
        }
    }
    else {
        AddressOfTheCrime = marker.AddressOfTheCrime;
        ReportTime = marker.ReportTime;
        AlarmDescribee = marker.AlarmDescribe;
        AlarmSourceTypeMC = marker.AlarmSourceTypeMC;
        AlarmSourceTypeID = marker.AlarmSourceTypeID;
        AlarmTypeMC = marker.AlarmTypeMC;
        FireResistanceGradeMC = marker.FireResistanceGradeMC;
        AlarmTitle = marker.AlarmTitle;
        AlarmID = marker.AlarmID;
        number = marker.number;
        AlarmID = marker.AlarmID;
        AlarmStateID = marker.AlarmStateID;
        AlarmNumber1 = marker.AlarmNumber1;
        XCoordinate = marker.XCoordinate;
        YCoordinate = marker.YCoordinate;
        EndOfProcessingTime = marker.EndOfProcessingTime;
        FireGradeMC = marker.FireGradeMC;
        AddressDescribe = marker.AddressDescribe;
        if (AlarmStateID == 9) {
            marker.setUrl('/SuperMap/images/2cf11b3bb909db55bbd6360317fd7.gif');
        } else {


            marker.setUrl('/SuperMap/images/Circle_Blue.png');
        }
        zjRemoveMarkerQ = marker;
        selectMarker = marker;
    }
    nowSelectAlarm.x = XCoordinate;
    nowSelectAlarm.y = YCoordinate;
    nowSelectAlarm.AlarmID = AlarmID;
    nowSelectAlarm.AlarmStateID = AlarmStateID;

    var chen_Point = new SuperMap.Geometry.Point(XCoordinate, YCoordinate);
    xnodeArray.push(chen_Point);//巡逻队位置点

    var contentHTML = '';
    ClearLayer();//清除
    if (parseInt(AlarmStateID) == 9) {//新警情

        LZClickMaker(marker);
        //--------关闭出警弹窗 ZJDM -----
        $('#divFloatToolsView').animate({ width: 'hide', opacity: 'hide' }, 'normal', function () {
            $('#divFloatToolsView').hide();
        });
        $('#aFloatTools_Show').attr('style', 'display:block');
        $('#aFloatTools_Hide').attr('style', 'display:none');
        $(".rides-cs").hide();//隐藏右侧
        $('#LZJieMian').hide();
        $('#delIssue').hide();
        $('#HDXShouDuiMian').hide();
        $('#HDXShouDui').hide();
        $('#HDXYiChuJingMian').hide();
        $('#HDXdelIssue').hide();
        ClearLayer();
        $('.Operate_div').hide();


        contentHTML = "<div class='popwin_titleDiv' ><span class='popwin_title'>新警情</span></div>" +
            "<div class='popwin_content_div' ><b>火灾地址：</b>" + AddressOfTheCrime +
            "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情描述：</b>" + AlarmDescribee + "</div>" +
            "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情来源：</b>" + AlarmSourceTypeMC + "</div>" +
            "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>报警时间：</b>" + ReportTime + "</div>" +
            "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情编号：</b>" + AlarmNumber1 + "</div>" +
            "<div class='popwin_border_bottom''></div><div style='padding-top:5px;'><b>警情类型：</b>" + AlarmTypeMC + "</div>" +
            "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>耐火等级：</b>" + FireResistanceGradeMC + "</div><div class='popwin_border_bottom'></div><div id='AlarmIDImgDiv' style='text-align:center;'><b style='text-align:center;'>现场图片</b></div></div>";
        showDialog_T(marker);//显示搜索警点弹窗



    }
    else if (parseInt(AlarmStateID) == 10) {//未出警

        contentHTML = "<div class='popwin_titleDiv' style=''><span class='popwin_title'>未处理</span></div>" +
            "<div class='popwin_content_div'><b>火灾地址：</b>" + AddressOfTheCrime +
        "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'> <b>警情描述：</b>" + AlarmDescribee + "</div>" +
        "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情来源：</b>" + AlarmSourceTypeMC + "</div>" +
        "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>报警时间：</b>" + ReportTime + "</div>" +
        "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情编号：</b>" + AlarmNumber1 + "</div>" +
        "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情类型：</b>" + AlarmTypeMC + "</div>" +
        "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>耐火等级：</b>" + FireResistanceGradeMC + "</div><div class='popwin_border_bottom'></div><div id='AlarmIDImgDiv' style='text-align:center;'><b style='text-align:center;'>现场图片</b></div></div>";
        tag = 1;
        chen_DrawS(XCoordinate, YCoordinate, 1);
        PeripheralAnalysis(parseInt(AlarmStateID), AlarmID);

        //---- 获取 警情地址名称 zjdm ---
        var LZJieMianLocationPl = document.getElementById("LZJieMianLocationPl");
        LZJieMianLocationPl.innerHTML = AddressOfTheCrime;

    } else if (parseInt(AlarmStateID) == 11) {//已出警

        contentHTML = "<div class='popwin_titleDiv' ><span class='popwin_title'>正处理</span></div>" +
      "<div class='popwin_content_div' ><b>火灾地址：</b>" + AddressOfTheCrime +
      "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'> <b>警情描述：</b>" + AlarmDescribee + "</div>" +
      "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情来源：</b>" + AlarmSourceTypeMC + "</div>" +
      "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>报警时间：</b>" + ReportTime + "</div>" +
      "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情编号：</b>" + AlarmNumber1 + "</div>" +
      "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情类型：</b>" + AlarmTypeMC + "</div>" +
      "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>耐火等级：</b>" + FireResistanceGradeMC + "</div><div class='popwin_border_bottom'></div><div id='AlarmIDImgDiv' style='text-align:center;'><b style='text-align:center;'>现场图片</b></div></div>";
        tag = 2;
        chen_DrawS(XCoordinate, YCoordinate, 2);
        PeripheralAnalysis(parseInt(AlarmStateID), AlarmID);

        //---- 获取 警情地址名称 zjdm ---
        var LZJieMianLocationPl = document.getElementById("hdxPoliceLCTA");
        LZJieMianLocationPl.innerHTML = AddressOfTheCrime;

    }
    else if (parseInt(AlarmStateID) == 12) {//已收队
        tag = 3;
        contentHTML = "<div class='popwin_titleDiv' ><span class='popwin_title'>处理完</span></div>" +
              "<div class='popwin_content_div' ><b>火灾地址：</b>" + AddressOfTheCrime +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情描述：</b>" + AlarmDescribee + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情来源：</b>" + AlarmSourceTypeMC + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>报警时间：</b>" + ReportTime + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>结束时间：</b>" + EndOfProcessingTime + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情编号：</b>" + AlarmNumber1 + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>警情类型：</b>" + AlarmTypeMC + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>耐火等级：</b>" + FireResistanceGradeMC + "</div>" +
              "<div class='popwin_border_bottom'></div><div style='padding-top:5px;'><b>事故等级：</b>" + FireGradeMC + "</div><div class='popwin_border_bottom'></div><div id='AlarmIDImgDiv' style='text-align:center;'><b style='text-align:center;'>现场图片</b></div></div>";
        PeripheralAnalysis(AlarmStateID, AlarmID);

        //---- 获取 警情地址名称 zjdm ---
        var LZJieMianLocationPl = document.getElementById("hdxPoliceLCTB");
        LZJieMianLocationPl.innerHTML = AddressOfTheCrime;

    }
    var size = new SuperMap.Size(0, 33);
    var offset = new SuperMap.Pixel(0, -30);
    var icon = new SuperMap.Icon("../theme/images/marker.png", size, offset);
    if (parseInt(AlarmStateID) == 9) {//新警情
        if (boolAddInfo == true) {
            var popup = new SuperMap.Popup.FramedCloud(
               "popwin",
               new SuperMap.LonLat(XCoordinate, YCoordinate),
               null,
               contentHTML,
               icon,
               true,
               function () {
                   closenewInfowinPoliceIntelligence(0);
               },
               true);
            newInfowinPoliceIntelligence = popup;
            map.addPopup(popup);
        } else {
            boolAddInfo = true;
        }
    } else {
        closeDialog_T();//关闭新警情弹窗
        var popup = new SuperMap.Popup.FramedCloud(
                "popwin",
                new SuperMap.LonLat(XCoordinate, YCoordinate),
                null,
                contentHTML,
                icon,
                true,
                function () {
                    closeInfoWinPoliceIntelligence();
                },
                true);
        infowinPoliceIntelligence = popup;
        map.addPopup(popup);
    }



    $("#aFloatTools_Show").click();//显示右侧栏
    if (parseInt($('#controlCenter').attr('status')) == 1) {
        $('#RealTimeCenterDiv').show();
    }
    map.panTo(new SuperMap.LonLat(XCoordinate, YCoordinate));
    map.zoomTo(3);


    //-----------出警弹窗Begin ZJDM 弹窗 --------------
    ClearLayer();//清除
    if (parseInt(AlarmStateID) == 9) {//新警情
        if (lastAlarmID != AlarmID && lastAlarmID > 0) {
            $('#PerimeterQuerySelectDivController').hide();
        }
        PeripheralAnalysis(1, -1);//再次选点
    }
    else if (AlarmStateID == 10) {//未出
        LZAlarmClick(selectMarker);
        if ($("#LZJieMian").is(":hidden") == true) {
            $('#LZJieMian').show();
            $('#LZJieMian')
            .animate({ left: '285px' }, 0)
            .animate({ left: '0' }, 1000, function () {
                $('#HDXChuJingMian').hide();
                $('#HDXdelIssue').hide();
                $('#HDXShouDuiMian').hide();
                $('#HDXShouDui').hide();
            });
        }
    }
    if (AlarmStateID == 11)//已出
    {
        LZyellowMaker(selectMarker);
        if ($("#HDXChuJingMian").is(":hidden") == true) {
            $('#HDXChuJingMian').show();
            $('#HDXChuJingMian')
           .animate({ left: '285px' }, 0)
           .animate({ left: '0' }, 1000, function () {
               $('#LZJieMian').hide();
               $('#HDXShouDuiMian').hide();
               $('#HDXShouDui').hide();
               $('#HDXdelIssue').hide();
           });
        }
        $('#HDXChuJingMian').show();
    }
    if (AlarmStateID == 12) {//收队 
        HDXclickGreen(selectMarker);
        if ($("#HDXShouDuiMian").is(":hidden") == true) {
            $('#HDXShouDuiMian').show();
            $('#HDXShouDuiMian')
         .animate({ left: '285px' }, 0)
         .animate({ left: '0' }, 1000, function () {
             $('#HDXChuJingMian').hide();
             $('#LZJieMian').hide();
             $('#HDXShouDui').hide();
             $('#HDXdelIssue').hide();
         });
        }
    }
    //-----------出警弹窗End--------------


    $('#realWarning_table tr').css('background-color', '#fff');


    //查询现场图片

    $.post('/index/selectAlarmNowImg', { intAlarmID: AlarmID }, function (data) {
        if ($('#AlarmIDImgDiv').length > 0) {
            for (var i = 0; i < data.length; i++) {
                $('#AlarmIDImgDiv').append('<img src="' + data[i].PicturePath + '" />');
            }
        }
    });
}

//关闭信息框
function closeInfoWinPoliceIntelligence() {
    if (infowinPoliceIntelligence) {
        try {
            infowinPoliceIntelligence.hide();
            infowinPoliceIntelligence.destroy();
            infowinPoliceIntelligence = null;
        }
        catch (e) { }
    }
}

//关闭新警情信息框
function closenewInfowinPoliceIntelligence(index) {
    if (newInfowinPoliceIntelligence) {
        try {
            newInfowinPoliceIntelligence.hide();
            newInfowinPoliceIntelligence.destroy();
            newInfowinPoliceIntelligence = null;
            //if (index == 0) {
            //    if (confirm('是否退出新警情二次地址匹配？')) {                   
            //        newInfowinPoliceIntelligence.hide();
            //        newInfowinPoliceIntelligence.destroy();
            //        newInfowinPoliceIntelligence = null;
            //        nowSelectAlarm.x = 0;
            //        nowSelectAlarm.y = 0;
            //        nowSelectAlarm.AlarmID = 0;
            //        nowSelectAlarm.AlarmStateID = 0;
            //        closeDialog_T();
            //        CloseZhouBian();
            //    }
            //} else {
            //    newInfowinPoliceIntelligence.hide();
            //    newInfowinPoliceIntelligence.destroy();
            //    newInfowinPoliceIntelligence = null;
            //    nowSelectAlarm.x = 0;
            //    nowSelectAlarm.y = 0;
            //    nowSelectAlarm.AlarmID = 0;
            //    nowSelectAlarm.AlarmStateID = 0;
            //    closeDialog_T();

            //    CloseZhouBian();
            //}
        }
        catch (e) { }
    }
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//当前选择的警情点信息
var nowSelectAlarm = { x: 0, y: 0, AlarmID: 0, AlarmStateID: 0 };
var selectMarker;//选择的警情数据
var boolOpenNew = true;
//实时刷新警情
function selectAlarm() {
    $.post('/index/selectAlarm', function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var AlarmID = parseInt(data[i].AlarmID);//警情ID
                var AlarmStateID = parseInt(data[i].AlarmStateID);//警情状态
                var AddressOfTheCrime = data[i].AddressOfTheCrime;//警情地址
                var AlarmDescribe = data[i].AlarmDescribe;//警情描述
                var AlarmNumber1 = data[i].AlarmNumber1;//警情编号
                var AlarmTitle = data[i].AlarmTitle;//标题
                var AlarmTypeMC = data[i].AlarmTypeMC;//警情类型
                var FireResistanceGradeMC = data[i].FireResistanceGradeMC;//耐火等级
                var ReportTime = data[i].ReportTime;//案发时间
                var EndOfProcessingTime = data[i].EndOfProcessingTime;//灭火时间
                var FireGradeMC = data[i].FireGradeMC;//火灾事故等级
                var AlarmSourceTypeMC = data[i].AlarmSourceTypeMC;//警情来源类别MC
                var AlarmSourceTypeID = data[i].AlarmSourceTypeID;//警情来源类别ID
                var XCoordinate = Number(data[i].XCoordinate);//X
                var YCoordinate = Number(data[i].YCoordinate);//Y
                var AddressDescribe = data[i].AddressDescribe;//Y;//案发地址口述

                //新警情
                var countAlarmMarkerLayeraa = 0;
                for (var j = 0; j < alarmMarkerLayeraa.markers.length; j++) {
                    var oddAlarmID = parseInt(alarmMarkerLayeraa.markers[j].AlarmID);
                    var oddAlarmStateID = parseInt(alarmMarkerLayeraa.markers[j].AlarmStateID);
                    if (oddAlarmID == AlarmID) {
                        countAlarmMarkerLayeraa++;
                        if (oddAlarmStateID == AlarmStateID) {//状态没有改变
                            alarmMarkerLayeraa.markers[j].AlarmStateID = AlarmStateID;
                            alarmMarkerLayeraa.markers[j].AddressOfTheCrime = AddressOfTheCrime;
                            alarmMarkerLayeraa.markers[j].AlarmDescribe = AlarmDescribe;
                            alarmMarkerLayeraa.markers[j].AlarmNumber1 = AlarmNumber1;
                            alarmMarkerLayeraa.markers[j].AlarmTitle = AlarmTitle;
                            alarmMarkerLayeraa.markers[j].AlarmTypeMC = AlarmTypeMC;
                            alarmMarkerLayeraa.markers[j].FireResistanceGradeMC = FireResistanceGradeMC;
                            alarmMarkerLayeraa.markers[j].ReportTime = ReportTime;
                            alarmMarkerLayeraa.markers[j].EndOfProcessingTime = EndOfProcessingTime;
                            alarmMarkerLayeraa.markers[j].FireGradeMC = FireGradeMC;
                            alarmMarkerLayeraa.markers[j].AlarmSourceTypeMC = AlarmSourceTypeMC;
                            alarmMarkerLayeraa.markers[j].AlarmSourceTypeID = AlarmSourceTypeID;
                            alarmMarkerLayeraa.markers[j].XCoordinate = XCoordinate;
                            alarmMarkerLayeraa.markers[j].YCoordinate = YCoordinate;
                            alarmMarkerLayeraa.markers[j].AddressDescribe = AddressDescribe;
                        } else {

                            if (AlarmStateID == 10) {//改变为未处理了
                                alarmMarkerLayeraa.removeMarker(alarmMarkerLayeraa.markers[j]);
                                if (nowSelectAlarm.AlarmID == AlarmID) {//判断当前选择的点是不是改了状态
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                } else {
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);

                                }
                            }
                            else if (AlarmStateID == 11) {//改变为正处理了
                                alarmMarkerLayeraa.removeMarker(alarmMarkerLayeraa.markers[j]);
                                if (nowSelectAlarm.AlarmID == AlarmID) {//判断当前选择的点是不是改了状态
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                } else {
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                }

                            }
                            else if (AlarmStateID == 12) {//改变为处理完了
                                alarmMarkerLayeraa.removeMarker(alarmMarkerLayeraa.markers[j]);
                                if (nowSelectAlarm.AlarmID == AlarmID) {//判断当前选择的点是不是改了状态
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                } else {
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                }

                            }
                        }
                        break;
                    }
                }

                if (countAlarmMarkerLayeraa == 0 && AlarmStateID == 9) {

                    if (XCoordinate == "" && YCoordinate == "") {
                        //110接警过来，地址
                        selectAddress_Y(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, "", "", false, EndOfProcessingTime, FireGradeMC, AddressDescribe);

                    }
                    else {

                        $('#realWarning_table tbody').append("<tr xx=" + XCoordinate + " yy=" + YCoordinate + " id=" + AlarmID + " onclick='locationMilitaryPatrol(this)'><td>" + AddressOfTheCrime + "</td><td>" + AlarmDescribe + "</td></tr>");
                        nowShow2();
                        if (nowSelectAlarm.AlarmStateID != 9) {
                            if (openType == 0 && boolOpenNew == true) {
                                boolAddInfo = false;
                                addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                            } else {
                                addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                            }

                        } else {
                            addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                        }

                        //发送通知信息
                        sendNoticeInfo(AlarmID, XCoordinate, YCoordinate);
                    }

                }

                //未处理
                var countSeriousMarker = 0;
                for (var j = 0; j < seriousMarkerLayer.markers.length; j++) {
                    var oddAlarmID = parseInt(seriousMarkerLayer.markers[j].AlarmID);
                    var oddAlarmStateID = parseInt(seriousMarkerLayer.markers[j].AlarmStateID);
                    var serious = seriousMarkerLayer.markers[j];
                    if (oddAlarmID == AlarmID) {
                        countSeriousMarker++;
                        if (oddAlarmStateID == AlarmStateID) {//状态没有改变
                            serious.AlarmStateID = AlarmStateID;
                            serious.AddressOfTheCrime = AddressOfTheCrime;
                            serious.AlarmDescribe = AlarmDescribe;
                            serious.AlarmNumber1 = AlarmNumber1;
                            serious.AlarmTitle = AlarmTitle;
                            serious.AlarmTypeMC = AlarmTypeMC;
                            serious.FireResistanceGradeMC = FireResistanceGradeMC;
                            serious.ReportTime = ReportTime;
                            serious.EndOfProcessingTime = EndOfProcessingTime;
                            serious.FireGradeMC = FireGradeMC;
                            serious.AlarmSourceTypeMC = AlarmSourceTypeMC;
                            serious.AlarmSourceTypeID = AlarmSourceTypeID;
                            serious.XCoordinate = XCoordinate;
                            serious.YCoordinate = YCoordinate;
                        } else {
                            if (AlarmStateID == 11) {//改变为正处理了
                                seriousMarkerLayer.removeMarker(seriousMarkerLayer.markers[j]);
                                if (nowSelectAlarm.AlarmID == AlarmID) {//判断当前选择的点是不是改了状态
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                } else {
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                }
                            } else if (AlarmStateID == 12) {//改变为处理完了
                                seriousMarkerLayer.removeMarker(seriousMarkerLayer.markers[j]);
                                if (nowSelectAlarm.AlarmID == AlarmID) {//判断当前选择的点是不是改了状态
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                } else {
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                }

                            }
                        }
                        break;
                    }
                }
                if (countSeriousMarker == 0 && AlarmStateID == 10) {
                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, "");
                }


                //正处理
                var countModerateMarker = 0;
                for (var j = 0; j < moderateMarkerLayer.markers.length; j++) {
                    var oddAlarmID = parseInt(moderateMarkerLayer.markers[j].AlarmID);
                    var oddAlarmStateID = parseInt(moderateMarkerLayer.markers[j].AlarmStateID);
                    if (oddAlarmID == AlarmID) {
                        countModerateMarker++;
                        if (oddAlarmStateID == AlarmStateID) {//状态没有改变
                            moderateMarkerLayer.markers[j].AlarmStateID = AlarmStateID;
                            moderateMarkerLayer.markers[j].AddressOfTheCrime = AddressOfTheCrime;
                            moderateMarkerLayer.markers[j].AlarmDescribe = AlarmDescribe;
                            moderateMarkerLayer.markers[j].AlarmNumber1 = AlarmNumber1;
                            moderateMarkerLayer.markers[j].AlarmTitle = AlarmTitle;
                            moderateMarkerLayer.markers[j].AlarmTypeMC = AlarmTypeMC;
                            moderateMarkerLayer.markers[j].FireResistanceGradeMC = FireResistanceGradeMC;
                            moderateMarkerLayer.markers[j].ReportTime = ReportTime;
                            moderateMarkerLayer.markers[j].EndOfProcessingTime = EndOfProcessingTime;
                            moderateMarkerLayer.markers[j].FireGradeMC = FireGradeMC;
                            moderateMarkerLayer.markers[j].AlarmSourceTypeMC = AlarmSourceTypeMC;
                            moderateMarkerLayer.markers[j].AlarmSourceTypeID = AlarmSourceTypeID;
                            moderateMarkerLayer.markers[j].XCoordinate = XCoordinate;
                            moderateMarkerLayer.markers[j].YCoordinate = YCoordinate;
                        } else {
                            if (AlarmStateID == 12) {//改变为处理完了
                                moderateMarkerLayer.removeMarker(moderateMarkerLayer.markers[j]);
                                if (nowSelectAlarm.AlarmID == AlarmID) {//判断当前选择的点是不是改了状态
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, true, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                } else {
                                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, AddressDescribe);
                                }
                            }
                        }
                        break;
                    }
                }
                if (countModerateMarker == 0 && AlarmStateID == 11) {
                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, "");
                }


                //处理完
                var countSafetyMarker = 0;
                for (var j = 0; j < safetyMarkerLayer.markers.length; j++) {
                    var oddAlarmID = parseInt(safetyMarkerLayer.markers[j].AlarmID);
                    var oddAlarmStateID = parseInt(safetyMarkerLayer.markers[j].AlarmStateID);
                    if (oddAlarmID == AlarmID) {
                        countSafetyMarker++;
                        safetyMarkerLayer.markers[j].AlarmStateID = AlarmStateID;
                        safetyMarkerLayer.markers[j].AddressOfTheCrime = AddressOfTheCrime;
                        safetyMarkerLayer.markers[j].AlarmDescribe = AlarmDescribe;
                        safetyMarkerLayer.markers[j].AlarmNumber1 = AlarmNumber1;
                        safetyMarkerLayer.markers[j].AlarmTitle = AlarmTitle;
                        safetyMarkerLayer.markers[j].AlarmTypeMC = AlarmTypeMC;
                        safetyMarkerLayer.markers[j].FireResistanceGradeMC = FireResistanceGradeMC;
                        safetyMarkerLayer.markers[j].ReportTime = ReportTime;
                        safetyMarkerLayer.markers[j].EndOfProcessingTime = EndOfProcessingTime;
                        safetyMarkerLayer.markers[j].FireGradeMC = FireGradeMC;
                        safetyMarkerLayer.markers[j].AlarmSourceTypeMC = AlarmSourceTypeMC;
                        safetyMarkerLayer.markers[j].AlarmSourceTypeID = AlarmSourceTypeID;
                        safetyMarkerLayer.markers[j].XCoordinate = XCoordinate;
                        safetyMarkerLayer.markers[j].YCoordinate = YCoordinate;
                        break;
                    }
                }

                if (countSafetyMarker == 0 && AlarmStateID == 12) {
                    addEnterpriseMarker(AddressOfTheCrime, ReportTime, AlarmDescribe, AlarmSourceTypeMC, AlarmSourceTypeID, AlarmTypeMC, FireResistanceGradeMC, AlarmTitle, AlarmID, AlarmStateID, AlarmNumber1, XCoordinate, YCoordinate, false, EndOfProcessingTime, FireGradeMC, "");
                }
            }
            var tr = $('#realWarning_table tbody tr');
            if (tr.length == 0) {
                closeNow();
            }

        } else {

            if (openType == 0) {//指挥中心
                $('#rides-cs').hide();//隐藏右侧栏

            }
            nowSelectAlarm.x = 0;
            nowSelectAlarm.y = 0;
            nowSelectAlarm.AlarmID = 0;
            nowSelectAlarm.AlarmStateID = 0;
            //查询不到点要清除全部
            alarmMarkerLayeraa.clearMarkers();//新警情
            seriousMarkerLayer.clearMarkers();//未处理
            moderateMarkerLayer.clearMarkers();//正处理
            safetyMarkerLayer.clearMarkers();//处理完
            closeInfoWinPoliceIntelligence();//关闭选择的警情弹窗
            closeNow();
        }
    });
}


//发送新警情通知消防站人员
var sendNoticeInfoAlarmID;//通知警情ID
var FireStationIDSmID = [];
function sendNoticeInfo(AlarmID, XX, YY) {
    sendNoticeInfoAlarmID = AlarmID;
    FireStationIDSmID = [];
    var queryParamOne = [];
    queryParamOne.push(new SuperMap.REST.FilterParameter(
            {
                name: "消防站点@ShenZhenNanShan_Data",
                attributeFilter: "TypeID=33"
            }));
    var queryParamTow = [];
    queryParamTow.push(new SuperMap.REST.FilterParameter(
        {
            name: "消防站点@ShenZhenNanShan_Data",
            attributeFilter: "TypeID=34"
        }));

    var centerPoint = new SuperMap.Geometry.Point(XX, YY);//构造一个点的几何图形

    var queryByDistanceParamsOne = new SuperMap.REST.QueryByDistanceParameters({
        queryParams: queryParamOne,
        isNearest: true,
        distance: 1,
        expectCount: 1,
        geometry: centerPoint
    });
    var queryByDistanceServiceOne = new SuperMap.REST.QueryByDistanceService(url);
    queryByDistanceServiceOne.events.on({
        "processCompleted": processCompleted_sendNoticeInfoOne,
        "processFailed": processFailed_sendNoticeInfoOne
    });
    queryByDistanceServiceOne.processAsync(queryByDistanceParamsOne);

    var queryByDistanceParamsTow = new SuperMap.REST.QueryByDistanceParameters({
        queryParams: queryParamTow,
        isNearest: true,
        distance: 1,
        expectCount: 1,
        geometry: centerPoint
    });
    var queryByDistanceServiceTow = new SuperMap.REST.QueryByDistanceService(url);
    queryByDistanceServiceTow.events.on({
        "processCompleted": processCompleted_sendNoticeInfoTow,
        "processFailed": processFailed_sendNoticeInfoTow
    });
    queryByDistanceServiceTow.processAsync(queryByDistanceParamsTow);
}


function processCompleted_sendNoticeInfoOne(queryEventArgs) {
    var i, j, result = queryEventArgs.result;
    if (result.recordsets.length > 0) {

        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features.length > 0) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    var feature = result.recordsets[i].features[j];
                    var SmID = feature.data.SmID;
                    if (SmID.trim() != '') {
                        FireStationIDSmID.push(SmID);
                        break;
                    } else {
                        FireStationIDSmID.push(0);
                        break;
                    }

                }
                break;
            } else {
                FireStationIDSmID.push(0);
                break;
            }

        }
    } else {
        FireStationIDSmID.push(0);
    }
    if (FireStationIDSmID.length >= 2) {
        if (sendNoticeInfoAlarmID <= 0) {
            sendNoticeInfoAlarmID = 0;
        }
        $.post('/index/sendNoticeInfo', { intAlarmID: sendNoticeInfoAlarmID, strFireStationIDSmID: FireStationIDSmID.toString() }, function (data) {
            //console.log(data);
        });
    }
}

function processFailed_sendNoticeInfoOne(er) {
    FireStationIDSmID.push(0);
    if (FireStationIDSmID.length >= 2) {
        if (sendNoticeInfoAlarmID <= 0) {
            sendNoticeInfoAlarmID = 0;
        }
        $.post('/index/sendNoticeInfo', { intAlarmID: sendNoticeInfoAlarmID, strFireStationIDSmID: FireStationIDSmID.toString() }, function (data) {
            //console.log(data);
        });
    }
}

function processCompleted_sendNoticeInfoTow(queryEventArgs) {
    var i, j, result = queryEventArgs.result;
    if (result.recordsets.length > 0) {

        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features.length > 0) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    var feature = result.recordsets[i].features[j];
                    var SmID = feature.data.SmID;
                    if (SmID.trim() != '') {
                        FireStationIDSmID.push(SmID);
                        break;
                    } else {
                        FireStationIDSmID.push(0);
                        break;
                    }

                }
                break;
            } else {
                FireStationIDSmID.push(0);
                break;
            }

        }
    } else {
        FireStationIDSmID.push(0);
    }
    if (FireStationIDSmID.length >= 2) {
        if (sendNoticeInfoAlarmID <= 0) {
            sendNoticeInfoAlarmID = 0;
        }
        $.post('/index/sendNoticeInfo', { intAlarmID: sendNoticeInfoAlarmID, strFireStationIDSmID: FireStationIDSmID.toString() }, function (data) {
            //console.log(data);
        });
    }
}

function processFailed_sendNoticeInfoTow(er) {
    FireStationIDSmID.push(0);
    if (FireStationIDSmID.length >= 2) {
        if (sendNoticeInfoAlarmID <= 0) {
            sendNoticeInfoAlarmID = 0;
        }
        $.post('/index/sendNoticeInfo', { intAlarmID: sendNoticeInfoAlarmID, strFireStationIDSmID: FireStationIDSmID.toString() }, function (data) {
            //console.log(data);
        });
    }
}

//历史查询-地图画点线面圆矩-Begin
//清除图层方法
function clearFeatures() {
    vectorLayer_H.removeAllFeatures();
    //vectorLayer1_H.removeAllFeatures();
    markerLayer_H.clearMarkers();
    map.removeAllPopup();
    //map.setCenter(new SuperMap.LonLat(113.91365, 22.55169), 0);//地图全屏
    rightToleft();//关闭火灾事件详情窗体
    SmX.length = null;
    SmY.length = null;
}
//画圆
function QueryByDistanceRound() {

    map.removeAllPopup();
    //先清除上次的显示结果
    clearFeatures();
    drawPolygon1.activate();
}
//画多边形
function queryByDistancePolygon() {
    map.removeAllPopup();
    //先清除上次的显示结果
    clearFeatures();
    drawPolygon2.activate();
}
//画点
function QueryByDistancePoint() {
    map.removeAllPopup();
    //先清除上次的显示结果
    clearFeatures();
    drawPointr_H.activate();
}
//画线
function drawGeometryLine() {
    map.removeAllPopup();
    //先清除上次的显示结果
    clearFeatures();
    drawLiner_H.activate();
}
//画矩形
function drawGeometry() {
    map.removeAllPopup();
    //先清除上次的显示结果
    clearFeatures();
    drawRectangle.activate();
}
//线、多边形、圆
function drawCompleted(drawGeometryArgs) {
    var feature = new SuperMap.Feature.Vector();
    feature.geometry = drawGeometryArgs.feature.geometry,
            feature.style = style_H;
    vectorLayer_H.addFeatures(feature);
    var queryParam, queryByGeometryParameters, queryService;
    queryParam = new SuperMap.REST.FilterParameter({ name: "Alarm@ShenZhenNanShan_Data" });
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        queryParams: [queryParam],
        geometry: drawGeometryArgs.feature.geometry,
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
    });
    queryService = new SuperMap.REST.QueryByGeometryService(url2, {
        eventListeners: {
            "processCompleted": processCompleted,
            "processFailed": processFailed
        }
    });
    queryService.processAsync(queryByGeometryParameters);
}
//画完几何点
function drawPointCompleted(drawGeometryArgs) {
    var feature = new SuperMap.Feature.Vector();
    feature.geometry = drawGeometryArgs.feature.geometry;
    feature.style = style_H;
    vectorLayer_H.addFeatures(feature);
    if (feature.geometry.bounds.left && feature.geometry.bounds.right && feature.geometry.bounds.top && feature.geometry.bounds.bottom) {
        var x = (feature.geometry.bounds.left + feature.geometry.bounds.right) / 2;//获取当前几何的界限上下左右除以2得到x轴，y同理
        var y = (feature.geometry.bounds.top + feature.geometry.bounds.bottom) / 2;
        map.setCenter(new SuperMap.LonLat(x, y), 3);//最大放大倍数是15
    };
    var queryParam, queryByGeometryParameters, queryService;
    queryParam = new SuperMap.REST.FilterParameter({ name: "Alarm@ShenZhenNanShan_Data" });
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        queryParams: [queryParam],
        geometry: drawGeometryArgs.feature.geometry,
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
    });
    queryService = new SuperMap.REST.QueryByGeometryService(url2, {
        eventListeners: {
            "processCompleted": processCompleted,
            "processFailed": processFailed
        }
    });
    queryService.processAsync(queryByGeometryParameters);
}
//矩形
function drawRectangleCompleted(obj) {
    drawRectangle.deactivate();
    //先清除上次的显示结果
    clearFeatures();
    var feature = obj.feature;
    feature.style = style_H;
    vectorLayer_H.addFeatures(feature);
    var queryBounds = feature.geometry.bounds;
    var queryParam, queryByBoundsParams, queryService;
    queryParam = new SuperMap.REST.FilterParameter({ name: "Alarm@ShenZhenNanShan_Data" });//FilterParameter设置查询条件，name是必设的参数，（图层名称格式：数据集名称@数据源别名）
    queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({ queryParams: [queryParam], bounds: queryBounds });//queryParams查询过滤条件参数数组。bounds查询范围
    queryService = new SuperMap.REST.QueryByBoundsService(url2, {
        eventListeners: {
            "processCompleted": processCompleted,
            "processFailed": processFailed
        }
    });
    queryService.processAsync(queryByBoundsParams);//向服务端传递参数，然后服务端返回对象
}
var GlobalAlarm = new Array();
var SmX = new Array();
var SmY = new Array();
var ScopeP = true;//划范围锁
//处理数据代码
var HistoryPopul = null;
function processCompleted(queryEventArgs) {
    ScopeP = true;
    drawPolygon1.deactivate();
    drawPolygon2.deactivate();
    drawPointr_H.deactivate();
    drawLiner_H.deactivate();
    drawRectangle.deactivate();
    SmX.length = null;
    SmY.length = null;
    var i, j, z = 0, result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
            if (recordsets[i].features) {
                for (j = 0; j < recordsets[i].features.length; j++) {
                    var feature = recordsets[i].features[j];
                    var point = feature.geometry;
                    SmX[z] = point.x;
                    SmY[z] = point.y;
                    var AlarmID = feature.data.AlarmID;
                    //addEnterpriseMarkerSelectAll(AlarmID, point.x, point.y, false);//让气泡弹出
                    z++;
                }
            }
        }
        if (SmX.length > 0 && SmY.length > 0) {
            showFireInformation(0);//查询按钮
        }
        else {
            alert("当前范围没有获取到数据！请重新选择范围！");
            ScopeP = false;
            rightToleft();
        }
    }
}
//function OpenHistoryPopul(obj) {
//    CloseHistoryPopul();
//    $.getJSON("/index/getAlarm12", { XZuoBiao: obj.object.X1, YZuoBiao: obj.object.Y1 }, function (data) {
//        var lonlat = obj.object.lonlat;
//        var size = new SuperMap.Size(20, 25),
//         offset = new SuperMap.Pixel(-25, -25);
//        var icon = new SuperMap.Icon("/SuperMap/images/marker-RK.png", size, offset);
//        var contentHTML = "<div class='popwin_titleDiv' ><span class='popwin_title'>" + "历史案情" + "</span></div>"+
//                 "<div style='padding-left: 5px;'><b>事发单位： </b>" + data[0].IncidentUnit + "<div class='popwin_border_bottom'></div><b>事件编号:&nbsp;</b>"
//              + data[0].AlarmNumber + "<div class='popwin_border_bottom'></div><b>发生时间：</b>" + CovertToDateTime(data[0].TimeOfTheIncident) + " <div class='popwin_border_bottom'></div><b>火灾等级：</b>" +
//            data[0].PropertyDetail + "</div></div>";
//        var popup = new SuperMap.Popup.FramedCloud
//        ("TuCengPopwin", new SuperMap.LonLat(lonlat.lon, lonlat.lat),
//            null,
//                contentHTML,
//            icon,
//               true,
//             function () {
//                 CloseHistoryPopul();
//             },
//                true);
//        infowin = popup;
//        map.addPopup(popup);
//    });
//}//单击冒泡
//function CloseHistoryPopul() {
//    if (HistoryPopul) {
//        try {
//            HistoryPopul.hide();
//            HistoryPopul.destroy();
//        }
//        catch (e) { }
//    }
//}//关闭气泡
////时间戳转换
//function CovertToDateTime(unittime) {
//    if (unittime == "") {
//        return "";
//    }
//    else {
//        //截取时间字符串  就是获取时间戳
//        unittime = unittime.replace("/Date(", "").replace(")/", "");
//        //剪除最后面的毫秒数
//        var timeNumber = unittime.substr(0, unittime.length - 3);
//        //把获取的数据*1000
//        timeNumber = timeNumber * 1000;
//        //转换成js时间格式
//        var jsDate = new Date(timeNumber);
//        var UnixTimeToDate =
//            jsDate.getFullYear() + '年' + (jsDate.getMonth() + 1) + '月' + jsDate.getDate() + '日     ' +
//             +jsDate.getHours() + '时' + jsDate.getMinutes() + '分';
//        return UnixTimeToDate;
//    }
//}
//错误时执行这段代码
function processFailed(e) {
    //alert(e.error.errorMsg);
}
//历史查询-地图画点线面圆矩-End
