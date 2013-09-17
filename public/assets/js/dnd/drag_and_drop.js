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
        connector: ["Bezier", { curviness:10 } ],
        maxConnections:3,
    };

    //Setting up a Target endPoint
    var targetColor = "crimson";
    var targetEndpoint = {
        endpoint:["Dot", { radius:5 }],
        paintStyle:{ fillStyle:targetColor},
        scope:"red dot",
        connectorStyle:{ strokeStyle:targetColor, lineWidth:2 },
        connector: ["Bezier", { curviness:10 } ],
        connectorOverlays: [['Arrow', {width: 8, length: 15}]],
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
    jsPlumb.bind('click', function(conn) {
        jsPlumb.detach({target: conn.targetId, source: conn.sourceId});
        admin.removeRelationship(conn.sourceId, conn.targetId);
        console.log('Successfully remove relationship');
    });

    function bindEvent(model) {
        jsPlumb.addEndpoint(model, {anchor: "TopCenter"}, targetEndpoint);
        jsPlumb.addEndpoint(model, {anchor: "BottomCenter"}, sourceEndpoint);
        jsPlumb.draggable(model);
    };

    function appendNewModel(model) {
        _modelContainer = $("<div class = 'model-box rounded-corners model-container' id = '" + model.modelName + "'>"  +
                        "<div class='model-box-header rounded-corners'>" + model.modelName + "</div></div>");
        _modelContainer.appendTo('#model-container');
        bindEvent(_modelContainer);
    };

    /* adding relationship */

    function addRelationship(model) {
        relationship = model.type;
        var from = jsPlumb.selectEndpoints({source: model.owner}).get(0);
        var to = jsPlumb.selectEndpoints({ target: model.withModel }).get(0);
        var attributes = []
        if(relationship === 'has_many'){
            var attributes = [['Arrow', { width: 20, length: 30, direction: -1, location: 0.8}]];
        }
        else if (relationship === 'belongs_to') {
            var attributes = [['Diamond', { width: 20, length: 20, direction: -1, location: 0.8}]];
        }

        jsPlumb.connect({ source: from, target: to, overlays: attributes });

    };

    var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

    admin.on(ModelAdminEvents.MODEL_CREATED, function(model) {
        appendNewModel(model);
    });

    admin.on(ModelAdminEvents.RELATIONSHIP_ADDED, function(relationshipObj){
        addRelationship(relationshipObj);
    });

    admin.on(ModelAdminEvents.RELATIONSHIP_REMOVED, function(relationshipObj){
        jsPlumb.detach({ source: relationshipObj.owner, target: relationshipObj.withModel });
    });
};

