var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

//ModelRepresentation object

var ModelRepresentation = function (labelTxt) {
    self = this;
    this.initialize = function () {
        colors = ["crimson", "yellow", "blue"];
        var rand = Math.floor((Math.random(3)*3));
        var rect = new createjs.Shape();

        rect.graphics.beginFill(colors[rand]).drawRect(0,0,100,100);

        var label = new createjs.Text(labelTxt, "bold 14px Arial", "#000000");
        label.textAlign = "center";

        var container = new createjs.Container();
        container.addChild(rect, label);

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
    this.x = 100;
    this.y = 100;
};

ModelRepresentation.prototype = new createjs.Container(); // inherit from Container

//Entry Point
var AppCanvass  = function(admin){
    var stage = new createjs.Stage("demoCanvas");
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
