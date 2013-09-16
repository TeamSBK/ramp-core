var express = require("express");
var Firebase = require('firebase');
var ModelAdmin = require("model-admin").ModelAdmin;
var ModelAdminEvents = require("model-admin").ModelAdminEvents;
var ServerAdminEvents = require("model-admin").ServerAdminEvents;

var app = express();
var port = 8001;
//Set view
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

// var mainFirebase = new Firebase('https://ramp-model.firebaseio.com/');
var fieldTypes = new Firebase('https://ramp-model.firebaseio.com/field-types');
var modelRels = new Firebase('https://ramp-model.firebaseio.com/relationships');

io.sockets.on('connection', function (socket) {
    socket.emit(ServerAdminEvents.SOCKET_CONNECTED, socket.id);

    socket.on(ModelAdminEvents.MODEL_CREATED, function (history) {
        socket.broadcast.emit(ServerAdminEvents.MODEL_CREATED, history);
    });

    socket.on(ModelAdminEvents.MODEL_DELETED, function (history) {
        socket.broadcast.emit(ServerAdminEvents.MODEL_DELETED, history);
    });

    socket.on(ModelAdminEvents.ATTRIBUTE_ADDED, function (history) {
        socket.broadcast.emit(ServerAdminEvents.ATTRIBUTE_ADDED, history);
    });

    socket.on(ModelAdminEvents.ATTRIBUTE_REMOVED, function (history) {
        socket.broadcast.emit(ServerAdminEvents.ATTRIBUTE_REMOVED, history);
    });

    socket.on(ModelAdminEvents.RELATIONSHIP_ADDED, function (history) {
        socket.broadcast.emit(ServerAdminEvents.RELATIONSHIP_ADDED, history);
    });

    socket.on(ModelAdminEvents.RELATIONSHIP_REMOVED, function (history) {
        socket.broadcast.emit(ServerAdminEvents.RELATIONSHIP_REMOVED, history);
    });
});

var init = function () {
};

init ();

app.get("/", function(req, res){
    res.render("page");
});

app.get("/get_app/:id", function(req, res) {
    var modelAdmin = new Firebase('https://ramp-model.firebaseio.com/model-admin');
    modelAdmin.on('value', function(snapshot) {

        var result = findById(snapshot.val(), req.params.id);
        if (result instanceof Object) {
            res.send(JSON.stringify(result));
        } else {
            res.status(404).send(result);
        }
    });
});

function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id == id) {
      return source[i];
    }
  }
  return "Couldn't find damn app with id: " + id;
}

console.log("Listening on port " + port);
