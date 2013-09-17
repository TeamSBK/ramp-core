var createDiagram = function(admin){
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


    bindEventItems();

    /* appending new box */
    function bindEvent(model) {
        jsPlumb.addEndpoint(model, {anchor: "TopCenter"}, targetEndpoint);
        jsPlumb.addEndpoint(model, {anchor: "BottomCenter"}, sourceEndpoint);
        jsPlumb.draggable(model);
    };

    function appendNewModel(model) {
        _modelContainer = $("<div class = 'model-box rounded-corners model-container'>"  +
                        "<div class='model-box-header rounded-corners'>" + model.modelName + "</div></div>");
        _modelContainer.appendTo('#model-container');
        bindEvent(_modelContainer);
    };

    var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

    admin.on(ModelAdminEvents.MODEL_CREATED, function(model) {
        appendNewModel(model);
    });


};


