$(document).ready(function(){
    var targetDropOptions = {
        tolerance:'touch',
        hoverClass:'dropHover',
        activeClass:'dragActive'
    };

    var sourceColor = "#ccc";

    var sourceEndpoint = {
        endpoint:["Dot", { radius:5 }],
        paintStyle:{ fillStyle:sourceColor},
        isSource:true,
        scope:"red dot",
        connectorStyle:{ strokeStyle:sourceColor, lineWidth:2 },
        connector: ["Bezier", { curviness:20 } ],
        maxConnections:3,
    };

    //Setting up a Target endPoint
    var targetColor = "crimson";
    var targetEndpoint = {
        endpoint:["Dot", { radius:5 }],
        paintStyle:{ fillStyle:targetColor},
        scope:"red dot",
        connectorStyle:{ strokeStyle:targetColor, lineWidth:2 },
        connector: ["Bezier", { curviness:20 } ],
        maxConnections:3,
        isTarget:true,
        dropOptions : targetDropOptions
    };

    function bindEventItems() {
        var models = $("#model-container .model-container")
        jsPlumb.addEndpoint(models, {anchor: "TopCenter"}, targetEndpoint);
        jsPlumb.addEndpoint(models, {anchor: "BottomCenter"}, sourceEndpoint);
        jsPlumb.draggable(models);
    };

    window.addNewModel = function(name) {
        _modelContainer = "<div class = 'model-box rounded-corners model-container'>"  +
                        "<div class='model-box-header rounded-corners'>" + name + "</div></div>"
        $("#model-container").append(_modelContainer);
        bindEventItems();
    }

    bindEventItems();
});


