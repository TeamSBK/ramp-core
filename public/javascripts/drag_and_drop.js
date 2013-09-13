var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

//ModelRepresentation object

var ModelRepresentation = function (labelTxt) {
    self = this;
    this.initialize = function () {
        var header = new createjs.Shape();
        var body = new createjs.Shape();

        //header div
        header.graphics.beginFill("rgba(172, 222, 101, 1)").drawRoundRect(0,0,150,30, 3);
        header.x = 0;
        header.y = 0;


        //body div
        body.graphics.beginFill("rgba(117, 163, 54, 1)").drawRect(0,0,150,125,5);
        body.x = 0;
        body.y = 25;

        var label = new createjs.Text(labelTxt, "14px 'Helvetica Neue', Helvetica,Arial,sans-serif", "#000000");
        label.textAlign = "center";
        label.x = 74;
        label.y = 5;

        var container = new createjs.Container();
        container.addChild(header, label, body);

        self.addChild(container);

        container.onPress = function(evt) {
            var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};

            // add a handler to the event object's onMouseMove callback
            // this will be active until the user releases the mouse button:
            evt.onMouseMove = function(ev) {
                ev.target.x = ev.stageX+offset.x;
                ev.target.y = ev.stageY+offset.y;
            };
        };
    };

    this.initialize(labelTxt);
    this.x = 20;
    this.y = 0;
};

ModelRepresentation.prototype = new createjs.Container(); // inherit from Container

//Entry Point
var AppCanvass  = function(admin){
    var stage = new createjs.Stage("demoImage");
    createjs.Ticker.addListener(stage);
    stage.update();

    // this lets our drag continue to track the mouse even when it leaves the canvas:
    stage.mouseMoveOutside = true;

    var createModelRepresentation = function (newModel){
        var modelRep = new ModelRepresentation(newModel.name);
        stage.addChild(modelRep);
    };

    admin.on(ModelAdminEvents.MODEL_CREATED, createModelRepresentation);
};
