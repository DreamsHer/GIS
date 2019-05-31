$(function () {
    var PrintMap = {};
    var LAYER_COUNT = 0;
    var LAYER_LENGTH = 0;

    window.MapToImg = PrintMap;

    PrintMap.excute = function (map) {

        var canvas = document.createElement("canvas");
        var broz = SuperMap.Browser.name;
        if (!canvas.getContext || (broz == 'msie' && !canvas.msToBlob)) {
            alert("您的浏览器版本太低，请升级。");
            return;
        }
        LAYER_COUNT = 0;
        var layers = map.layers.concat([]);
        //layers排序，将markers放到最上边
        var layers1 = [];
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].CLASS_NAME == "SuperMap.Layer.Markers") {
                var templayer = layers.splice(i, 1);
                layers1.push(templayer[0]);
            }
        }
        layers = layers.concat(layers1);
        LAYER_LENGTH = 0;
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.CLASS_NAME == "SuperMap.Layer.TiledDynamicRESTLayer") {
                var name = layer.name.trim();
                var nowType = parseInt($('#mapTypeLi').attr('indexTyep'));
                if (nowType == 1 && name == "卫星地图") {
                    LAYER_LENGTH = LAYER_LENGTH + 1;
                } else if (nowType == 0 && name == "行政区划图") {
                    LAYER_LENGTH = LAYER_LENGTH + 1;
                }
            }
            else if (layer.CLASS_NAME == "SuperMap.Layer.Markers" && layer.markers.length > 0) {
                var name2 = layer.name.trim();
                if (name2 == "未出警图层") {
                    if (document.getElementById('alarmPointPink').checked == true) {
                        LAYER_LENGTH = LAYER_LENGTH + 1;
                    }
                } else if (name2 == "已出警图层") {
                    if (document.getElementById('alarmPointYellow').checked == true) {
                        LAYER_LENGTH = LAYER_LENGTH + 1;
                    }
                } else if (name2 == "收队图层") {
                    if (document.getElementById('alarmPointGreen').checked == true) {
                        LAYER_LENGTH = LAYER_LENGTH + 1;
                    }
                } else {
                    LAYER_LENGTH = LAYER_LENGTH + 1;
                }
            }
            else if (layer.CLASS_NAME == "SuperMap.Layer.Vector" && layer.features.length > 0) {
                LAYER_LENGTH = LAYER_LENGTH + 1;
            }
        }

        var imgUrls = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.CLASS_NAME == "SuperMap.Layer.TiledDynamicRESTLayer") {
                var nowType = parseInt($('#mapTypeLi').attr('indexTyep'));
                var name = layer.name.trim();
                if (nowType == 1 && name == "卫星地图") {
                    //卫星图
                    if (layer.useCanvas == false) {
                        draw(getImgLayerData(layer, map), i, imgUrls);
                    }
                    else {
                        draw(getCanvasLayerData(layer), i, imgUrls);
                    }
                } else if (nowType == 0 && name == "行政区划图") {
                    //行政区划图
                    if (layer.useCanvas == false) {
                        draw(getImgLayerData(layer, map), i, imgUrls);
                    }
                    else {
                        draw(getCanvasLayerData(layer), i, imgUrls);
                    }
                }
            }
            else if (layer.CLASS_NAME == "SuperMap.Layer.Markers" && layer.markers.length > 0) {
                var name2 = layer.name.trim();
                if (name2 == "未出警图层") {
                    if (document.getElementById('alarmPointPink').checked == true) {
                        draw(getImgLayerData(layer, map), i, imgUrls);
                    }

                } else if (name2 == "已出警图层") {
                    if (document.getElementById('alarmPointYellow').checked == true) {
                        draw(getImgLayerData(layer, map), i, imgUrls);
                    }
                } else if (name2 == "收队图层") {
                    if (document.getElementById('alarmPointGreen').checked == true) {
                        draw(getImgLayerData(layer, map), i, imgUrls);
                    }
                } else {
                    draw(getImgLayerData(layer, map), i, imgUrls);
                }
            }
            else if (layer.CLASS_NAME == "SuperMap.Layer.Vector" && layer.features.length > 0) {
                getVectorLayerData(layer, map, function (imgUrls, i) {
                    return function (img) {
                        draw(img, i, imgUrls);
                    }
                }(imgUrls, i))
            }
        }
    }

    function draw(img, i, imgUrls) {
        imgUrls[imgUrls.length] = img;
        LAYER_COUNT++;
        if (LAYER_COUNT >= LAYER_LENGTH) {
            var canvas = document.createElement("canvas");
            var size = map.getSize();
            canvas.height = size.h;
            canvas.width = size.w;
            var ctx = canvas.getContext("2d");
            canvas.style.position = "relative";
            canvas.style.border = "1px solid #4c4c4c";
            //document.body.appendChild(canvas);
            var panel = document.createElement("div");
            panel.style.position = "absolute";
            panel.style.left = "0px";
            panel.style.top = "70px";
            panel.style.height = "100%";
            panel.style.width = "100%";
            panel.style.background = "#ffffff";
            panel.style.zIndex = 999999999;
            document.body.appendChild(panel);

            var buttonPanel = document.createElement("div");
            buttonPanel.id = "buttonPanel";
            buttonPanel.style.position = "relative";
            buttonPanel.style.left = "45%";
            panel.appendChild(buttonPanel);
            panel.appendChild(canvas);

            window.setTimeout(function () {
                for (var i = 0; i < imgUrls.length; i++) {
                    ctx.drawImage(imgUrls[i], 0, 0);
                }

                if (canvas.msToBlob) {
                    var button = document.createElement("input");
                    buttonPanel.appendChild(button);
                    button.type = "button";
                    button.value = "保存";
                    button.className = "btn btn-primary btn-sm PreservationImg";
                    button.onclick = function () {
                        window.navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
                    }
                }
                else {
                    var aa = document.createElement("a");
                    buttonPanel.appendChild(aa);
                    aa.target = "_blank";
                    aa.download = "map.png";
                    aa.href = canvas.toDataURL();

                    var button = document.createElement("input");
                    aa.appendChild(button);
                    button.type = "button";
                    button.value = "保存";
                    button.className = "btn btn-primary btn-sm PreservationImg";
                }

                var button = document.createElement("input");
                buttonPanel.appendChild(button);
                var span = document.createElement("span");
                span.innerHTML = "注意：如保存失败，请鼠标右键地图保存图片即可！";
                buttonPanel.appendChild(span);
                button.type = "button";
                button.value = "关闭";
                button.className = "btn btn-primary btn-sm closeImg";
                button.onclick = function () {
                    map.allOverlays = false;
                    var nowType = parseInt($('#mapTypeLi').attr('indexTyep'));
                    if (nowType == 1) {
                        //卫星图
                        layer.isBaseLayer = true;
                        baseLayer.isBaseLayer = false;
                    } else if (nowType == 0) {
                        //行政区划图
                        layer.isBaseLayer = false;
                        baseLayer.isBaseLayer = true;
                    }

                    var CurZoom = parseInt(map.getZoom());
                    $('.rides-cs1').show();
                    $('.rides-cs').show();
                    $('#map_bottom').show();
                    $('#LZReaShow').show();
                    document.body.removeChild(panel);
                }
            }, 30);
        }
    }
    //截取图片图层
    function getImgLayerData(layer, map) {
        var div = layer.div;
        var pdiv = div.parentNode;
        var offsetX = parseInt(pdiv.style.left.replace(/px/, ""));
        var offsetY = parseInt(pdiv.style.top.replace(/px/, ""));
        var canvas = document.createElement("canvas");
        var size = map.getSize();
        canvas.height = size.h;
        canvas.width = size.w;
        var ctx = canvas.getContext("2d");
        canvas.style.position = "absolute";
        canvas.style.left = "5px";
        canvas.style.top = "600px";
        canvas.style.border = "1px solid #3586D7";

        //document.body.appendChild(canvas);

        var divs = div.getElementsByTagName("div");
        for (var i = 0; i < divs.length; i++) {
            var div1 = divs[i];
            if (div1.style.display != "none") {
                var left = parseInt(div1.style.left.replace(/px/, ""));
                var top = parseInt(div1.style.top.replace(/px/, ""));
                var img = div1.getElementsByTagName("img")[0];
                var imgWidth = img.style.width;
                var imgHeight = img.style.height;
                var imgW = null, imgH = null;
                if (imgWidth != null || imgWidth != "") {
                    imgW = parseInt(imgWidth.replace(/px/, ""));
                }
                if (imgHeight != null || imgHeight != "") {
                    imgH = parseInt(imgHeight.replace(/px/, ""));
                }
                if (imgW != null && imgH != null) {
                    ctx.drawImage(img, left + offsetX, top + offsetY, imgW, imgH);
                }
                else {
                    ctx.drawImage(img, left + offsetX, top + offsetY);
                }
            }
        }

        var imageUrl = canvas.toDataURL("image/png");
        var img = new Image();
        img.src = imageUrl;
        return img;
    }
    //截取canvas图层
    function getCanvasLayerData(layer) {
        var div = layer.div;
        var canvas0 = div.getElementsByTagName("canvas")[0];
        var imageUrl = canvas0.toDataURL("image/png");
        var img = new Image();
        img.src = imageUrl;

        return img;
    }
    //截取Vector图层
    function getVectorLayerData(layer, map, callback) {
        var printLayer,
            strategy,
            features1 = [],
            features = layer.features,
            layerStrategies = layer.strategies;
        //GeoText无法截图问题修复
        if (layerStrategies) {
            strategy = new SuperMap.Strategy.GeoText();
            strategy.style = layerStrategies[0].style;
            printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", { strategies: [strategy], visibility: true, renderers: ["Canvas"] });
        } else {
            printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", { visibility: true, renderers: ["Canvas"] });
        }
        map.addLayer(printLayer);
        for (var j = 0; j < features.length; j++) {
            var feature = features[j];
            var feature1 = new SuperMap.Feature.Vector();
            feature1.geometry = feature.geometry;//.clone()
            feature1.style = feature.style;

            features1.push(feature1);
        }
        if (layer.style) {
            printLayer.style = layer.style;
        }

        printLayer.setOpacity(0);
        printLayer.addFeatures(features1);

        window.setTimeout(function (printLayer, map, callback) {
            return function () {
                var div = printLayer.div;
                var canvas1 = div.getElementsByTagName("canvas")[0];
                var cxt1 = canvas1.getContext("2d");
                var imageUrl = canvas1.toDataURL("image/png");

                map.removeLayer(printLayer);
                printLayer.destroy();

                var img = new Image();
                img.src = imageUrl;

                callback(img);
            }
        }(printLayer, map, callback), 30);

    }
});