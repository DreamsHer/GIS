//====================================缓存地图====================================
var bbolsss = true;//判断是不是第一次加载地图完成
var arrLoadMap = [];//存放未缓存的点
var addLoadMap = [];//存放已经缓存的点
var countSumMap = 0;//要缓存的数量
var boolAddMap = false;//判断地图加载状态
var loadMapindexType = 0;//缓存地图等级
var cacheMapHintCount = 0;//提示缓存地图次数
var defaultBounds;//派出所默认边界
var cacheType = 0;//缓存地图类型
var cacheMapFinishCount = 0;//缓存地图完成次数
//查询虎门派出所管辖范围
function selectMapBound() {
    var queryParam = [], queryBySQLParams, queryBySQLService;
    //查询警务子网格
    queryParam.push(new SuperMap.REST.FilterParameter({
        name: "街道网格@ShenZhenNanShan_Data",//查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性
        attributeFilter: "SmID=1",//属性过滤条件  相当于 SQL 语句中的 WHERE 子句，
        fields: ["SmSdriW", "SmSdriN", "SmSdriE", "SmSdriS"]//设置返回的字段
    }));
    //SQL 查询参数类。 该类用于设置 SQL 查询的相关参数。
    queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
        queryParams: queryParam//查询过滤条件参数数组
    });

    //SQL 查询服务类。 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
    queryBySQLService = new SuperMap.REST.QueryBySQLService(url, {//url 服务的访问地址
        eventListeners: { "processCompleted": processCompleted_bound, "processFailed": processFailed_bound }
    });
    //传递到服务端
    queryBySQLService.processAsync(queryBySQLParams);
}

//查询虎门派出所管辖范围成功
function processCompleted_bound(queryEventArgs) {
    //声明字段
    var i, j, feature, bounds, N = [], S = [], W = [], E = [],
    result = queryEventArgs.result;//获取服务器传回来的数据
    var features = [];

    //判断是否有数据
    if (result && result.recordsets) {//判断查询的查询结果记录集数组是否为空
        for (i = 0; i < result.recordsets.length; i++) {//循环记录集数组

            if (result.recordsets[i].features) {//判断记录集数组的矢量要素是否为空

                //如果记录集数组的矢量要素不为空，则又循环 记录集数组的矢量要素
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];//获取记录集数组的矢量要素
                    //判断显示面或点
                  
                        var data = feature.data;
                        if (data != null) {
                            if (data.SmSdriN != null && Boolean(data.SmSdriN) == true) {
                                N.push(Number(data.SmSdriN));
                            }
                            if (data.SmSdriS != null && Boolean(data.SmSdriS) == true) {
                                S.push(Number(data.SmSdriS));
                            }
                            if (data.SmSdriW != null && Boolean(data.SmSdriW) == true) {
                                W.push(Number(data.SmSdriW));
                            }
                            if (data.SmSdriE != null && Boolean(data.SmSdriE) == true) {
                                E.push(Number(data.SmSdriE));
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
            bounds.top = bounds.top + 0.002;
            bounds.bottom = bounds.bottom - 0.002;
            bounds.left = bounds.left - 0.0015;
            bounds.right = bounds.right + 0.0015;
            defaultBounds = bounds;
        } else {
            var bound = layer.getMaxExtent();//获取地图最大边界
            defaultBounds = bound;
        }
    }
}

//查询虎门派出所管辖范围失败
function processFailed_bound(er) {
    var bound = layer.getMaxExtent();//获取地图最大边界
    defaultBounds = bound;
}

//获取要缓存的点
function getAddLonlat(bound, type) {
    arrLoadMap = [];//重置未缓存的点数组
    addLoadMap = [];//重置已经缓存的点
    countSumMap = 0;//重置要缓存的数量

    var top = 22.79;//固定边界
    var bottom = 22.74;
    var left = 113.566;
    var right = 113.6213;
    top = bound.top;
    bottom = bound.bottom;
    left = bound.left;
    right = bound.right;

    var distanceX = right - left;//获取地图x轴长度，也就是获取要缓存的总经度
    var distanceY = top - bottom;//获取地图Y轴长度，也就是获取要缓存的总纬度
    var solitaryY = 0.005;//设置点与点的距离
    var solitaryX = 0.003;//设置点与点的距离

    for (var i = 0; i < distanceX  ; i += solitaryX) {//循环经度
        for (var j = 0; j < distanceY; j += solitaryY) {//再循环纬度，组合取点
            arrLoadMap.push({ x: (left + i), y: (bottom + j) });//添加到数组

            countSumMap++;
        }
    }
}

//单击显示确定加载地图弹窗
function showLoadMapDiv(t) {
    if (cacheMapFinishCount > 0) {  //判断缓存地图完成次数
        $('#showLoadBodyText>span').text('是否重新缓存地图？');
    } else {
        $('#showLoadBodyText>span').text('缓存地图后浏览地图会变流畅很多。');
    }
    var count = parseInt($('#btnSelectAllMap').attr('count'));//获取开始缓存次数
    var indexType = parseInt($('#btnSelectAllMap').attr('indexType'));//获取上一次缓存是否完成了

    if (indexType == 0 && count > 0 && arrLoadMap.length) {
        //缓存没有完成
        $('#btncontinueSelectAllMap').show();//显示继续按钮
        $('#btnSelectAllMap').text('重新缓存');//更改按钮文本
    } else if (indexType == 1) {
        //缓存完成
        $('#btncontinueSelectAllMap').hide();//显示继续缓存地图按钮
        $('#btnSelectAllMap').text('开始缓存');//更改按钮文本
    }
    $('#myLoadMapModal').modal('show');
    setTimeout(function () {
        $(t).removeClass('active');
    }, 100);
}

//开始加载地图，重新加载地图
function selectAllMap(t) {
    //获取缓存地图类型
    var cacheTypeSelectedIndex = document.getElementById('cacheType').selectedIndex;
    var cacheTypeOption = document.getElementById('cacheType').getElementsByTagName('option');

    cacheType = parseInt($(cacheTypeOption[cacheTypeSelectedIndex]).attr('indexType'));
    if (cacheType == 0) {
        //缓存地图全图
        var bound = layer.getMaxExtent();//获取地图最大边界
        bound.top = bound.top - 0.0016;
        bound.bottom = bound.bottom + 0.002;
        bound.left = bound.left + 0.002;
        bound.right = bound.right - 0.002;
        getAddLonlat(bound, cacheType);//计算点
    }
    else {
        //虎门派出所管辖区域
        getAddLonlat(defaultBounds, cacheType);//计算点
    }
    //获取缓存地图等级
    var selectedIndex = document.getElementById('loadMapRank').selectedIndex;
    var cboFileTypeOption = document.getElementById('loadMapRank').getElementsByTagName('option');
    loadMapindexType = parseInt($(cboFileTypeOption[selectedIndex]).attr('indexType'));
    if (loadMapindexType < 0) {
        loadMapindexType = 0;
    }

    $('#myLoadMapModal').modal('hide');//隐藏弹窗

    boolAddMap = true;//地图加载状态为true

    var count = parseInt($('#btnSelectAllMap').attr('count'));
    count += 1;
    $('#btnSelectAllMap').attr('count', count);//叠加开始获取重新缓存次数

    $('#btnSelectAllMap').attr('indexType', 0);//未完成状态

    //重置进度条
    $('#countMapText').text('0%');//重置进度条
    $('#countMap').css('width', '0%');
    $('#countMap').attr('aria-valuenow', 0);
    $('#addMapText').hide();

    //判断缓存的点数组要大于长度要大于0，才开始缓存
    if (arrLoadMap.length > 0) {
        $("#loadMap").show();//显示加载界面
        $('#loadMapText').show();//显示进度条界面

        map.setCenter(new SuperMap.LonLat(arrLoadMap[0].x, arrLoadMap[0].y), 0);//设置中心点和初始缩放等级，一定要设置初始缩放等级，不然就没有效果了
        map.zoomTo(loadMapindexType);//设置缩放等级，也就是获取到的下拉框选择的缩放等级
        addLoadMap.push(arrLoadMap[0]);//添加到缓存完成的数组
        arrLoadMap.shift();//移除已缓存完成的点，移除第一个元素
    }
    else {
        $('#loadMapText').hide();//隐藏进度条界面
    }


    var obj = new Object();
    obj.communityWebID = "4";
    obj.webType = "1";
    obj.webID = "1";
    clickSelectMap(null, null, obj, null);

}
//继续缓存地图
function continueSelectAllMap(t) {
    //判断缓存的点数组要大于长度要大于0，才开始缓存
    if (arrLoadMap.length > 0) {
        $('#addMapText').hide();
        //获取缓存地图类型
        var cacheTypeSelectedIndex = document.getElementById('cacheType').selectedIndex;
        var cacheTypeOption = document.getElementById('cacheType').getElementsByTagName('option');
        if (cacheType != parseInt($(cacheTypeOption[cacheTypeSelectedIndex]).attr('indexType'))) {
            if (confirm('缓存地图类型与上一次不同是否重新缓存新选择的地图类型？')) {
                $('#myLoadMapModal').modal('hide');//隐藏弹窗
                selectAllMap('');//c重新缓存地图
            } else {
                document.getElementById('cacheType').selectedIndex = cacheType;
                $('#myLoadMapModal').modal('hide');//隐藏弹窗
                boolAddMap = true;//地图加载状态为true
                $("#loadMap").show();//显示加载界面
                $('#loadMapText').show();//显示进度条界面

                map.setCenter(new SuperMap.LonLat(arrLoadMap[0].x, arrLoadMap[0].y), 0);//设置中心点和初始缩放等级，一定要设置初始缩放等级，不然就没有效果了
                map.zoomTo(loadMapindexType);//设置缩放等级，也就是获取到的下拉框选择的缩放等级
                addLoadMap.push(arrLoadMap[0]);//添加到缓存完成的数组
                arrLoadMap.shift();//移除已缓存完成的点，移除第一个元素
            }
        } else {
            $('#myLoadMapModal').modal('hide');//隐藏弹窗
            boolAddMap = true;//地图加载状态为true
            $("#loadMap").show();//显示加载界面
            $('#loadMapText').show();//显示进度条界面

            map.setCenter(new SuperMap.LonLat(arrLoadMap[0].x, arrLoadMap[0].y), 0);//设置中心点和初始缩放等级，一定要设置初始缩放等级，不然就没有效果了
            map.zoomTo(loadMapindexType);//设置缩放等级，也就是获取到的下拉框选择的缩放等级
            addLoadMap.push(arrLoadMap[0]);//添加到缓存完成的数组
            arrLoadMap.shift();//移除已缓存完成的点，移除第一个元素
        }
    }
    else {
        $('#addMapText').hide();
        $('#myLoadMapModal').modal('hide');//隐藏弹窗
        if (arrLoadMap.length > 0) {
            $("#loadMap").show();//显示加载界面
            $('#loadMapText').show();//显示进度条界面

            map.setCenter(new SuperMap.LonLat(arrLoadMap[0].x, arrLoadMap[0].y), 0);//设置中心点和初始缩放等级，一定要设置初始缩放等级，不然就没有效果了
            map.zoomTo(loadMapindexType);//设置缩放等级，也就是获取到的下拉框选择的缩放等级
            addLoadMap.push(arrLoadMap[0]);//添加到缓存完成的数组
            arrLoadMap.shift();//移除已缓存完成的点，移除第一个元素
        } else {

            boolAddMap = false;//缓存完成
            $('#loadMapText').hide();//隐藏进度条
            $("#loadMap").hide();//隐藏加载界面
            //计算地图要缩放的级别
            showJustMap();//调用定位显示方法
            $('#btnSelectAllMap').attr('indexType', 1);//缓存完成状态
            $('#btncontinueSelectAllMap').hide();//显示继续缓存地图按钮
            cacheMapFinishCount++; //缓存地图完成次数
        }
    }
}
//取消加载地图
function closeLoadMap() {
    $('#addMapText').show();
    boolAddMap = false;//地图加载状态为false
    $('#loadMapText').hide();//隐藏进度条
    $("#loadMap").hide();//隐藏加载界面

    showJustMap();//调用定位显示方法
    loadWeb();//加载南山区网格

    var obj = new Object();
    obj.communityWebID = "4";
    obj.webType = "1";
    obj.webID = "1";
    clickSelectMap(null, null, obj, null);
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>