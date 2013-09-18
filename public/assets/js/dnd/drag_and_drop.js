var createDiagram = function(admin){
    var targetDropOptions = {
        tolerance:'touch',
        hoverClass:'dropHover',
        activeClass:'dragActive'
    };

    var sourceColor = "#75a336";

    var sourceEndpoint = {
        endpoint:["Dot", { radius:5 }],
        paintStyle:{ fillStyle:sourceColor},
        isSource:true,
        scope:"red dot",
        connectorStyle:{ strokeStyle:sourceColor, lineWidth:4 },
        connector: ["Flowchart", {cornerRadius: 20}],
        maxConnections:3,
    };

    //Setting up a Target endPoint
    var targetColor = "#acde65";
    var targetEndpoint = {
        endpoint:["Dot", { radius:5 }],
        paintStyle:{ fillStyle:targetColor},
        scope:"red dot",
        connectorStyle:{ strokeStyle:targetColor, lineWidth:4 },
        connector: ["Flowchart", { cornerRadius: 20}],
        connectorOverlays: [['Arrow', {width: 5, length: 15}]],
        maxConnections:3,
        isTarget:true,
        dropOptions : targetDropOptions
    };

    function bindEventItems() {
        var models = $("#model-container .model-container")
        jsPlumb.addEndpoint(models, {anchor: ["TopCenter"]}, targetEndpoint);
        jsPlumb.addEndpoint(models, {anchor: "BottomCenter"}, sourceEndpoint);
        jsPlumb.draggable(models);
    };


    bindEventItems();


    jsPlumb.bind('beforeDrop', function(conn){
        rel = $('input[name="rel"]');
        rel.prop('checked', false);
        $("#dialog").dialog({
            modal: true,
            height: 200,
            width: 200,
            buttons: {
                "Save": function() {
                    if (rel.val()) {
                        admin.addRelationship(conn.sourceId, conn.targetId, $('input[name="rel"]:checked').val());
                        admin.addRelationship(conn.targetId, conn.sourceId, 'belongs_to');
                        $(this).dialog('close');
                    } else {
                        alert('Please select relationship first!');
                    }
                },
                "Cancel": function() {
                    $(this).dialog('close');
                }
            }
        });

    });


    /* appending new box */
    jsPlumb.bind('click', function(conn) {
        if(confirm(' Delete relation between: ' + conn.sourceId + ' and ' + conn.targetId + '?')){
            jsPlumb.detach({target: conn.targetId, source: conn.sourceId});
            admin.removeRelationship(conn.sourceId, conn.targetId);
            admin.removeRelationship(conn.targetId, conn.sourceId);
        }
    });

    function bindEvent(model) {
        jsPlumb.addEndpoint(model, {anchor: "TopCenter"}, targetEndpoint);
        jsPlumb.addEndpoint(model, {anchor: "BottomCenter"}, sourceEndpoint);
        jsPlumb.draggable($(model),{containment: '#model-container'});

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
        if (!(relationship === 'belongs_to')) {
            var from = jsPlumb.selectEndpoints({source: model.owner}).get(0);
            var to = jsPlumb.selectEndpoints({ target: model.withModel }).get(0);
            var attributes = []
                if(relationship === 'has_many'){
                    var attributes = [['Arrow', { width: 30, length: 20, direction: -1, location: 0.9}],
                        ['Custom', { create: function(component){ return $('<p style = "color: #fff; font-size: 15px;">has_many</p>');}, location: 0.5 }]
                            ];
                }
                else if (relationship === 'has_one') {
                    var attributes = [['Diamond', { width: 20, length: 20, direction: -1, location: 0.9}],
                        ['Custom', { create: function(component){ return $('<p style = "color: #fff; font-size: 15px;">has_one</p>');}, location: 0.5 }]
                            ];
                }
            jsPlumb.connect({ source: from, target: to, overlays: attributes });
        }

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


