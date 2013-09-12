var stage, output;
        
function init() {
    stage = new createjs.Stage("demoCanvas");
    
    // this lets our drag continue to track the mouse even when it leaves the canvas:
    // play with commenting this out to see the difference.
    stage.mouseMoveOutside = true; 
    
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    
    var label = new createjs.Text("drag me", "bold 14px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.y = -7;
    
    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(circle, label);
    stage.addChild(dragger);
    
    dragger.onPress = function(evt) {
        var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};

        // add a handler to the event object's onMouseMove callback
        // this will be active until the user releases the mouse button:
        evt.onMouseMove = function(ev) {
            ev.target.x = ev.stageX+offset.x;
            ev.target.y = ev.stageY+offset.y;
        }
    }
            
    createjs.Ticker.addListener(stage);
    stage.update();
}