var express = require("express");
var Firebase = require('firebase');
var ModelAdmin = require("model-admin").ModelAdmin;
var ModelAdminEvents = require("model-admin").ModelAdminEvents;
var ServerAdminEvents = require("model-admin").ServerAdminEvents;

var app = express();
var port = process.env.PORT || 8002;
//Set view
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

// var mainFirebase = new Firebase('https://ramp-model.firebaseio.com/');
var fieldTypes = new Firebase('https://ramp-model.firebaseio.com/field-types');
var modelRels = new Firebase('https://ramp-model.firebaseio.com/relationships');


var initSockets = function () {
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
};

initSockets ();

app.get("/", function(req, res){
    res.render("page");
});

app.get("/get_app/:id", function(req, res) {
    var modelAdmin = new Firebase('https://ramp-model.firebaseio.com/model-admin');
    modelAdmin.on('value', function(snapshot) {

        var result = findById(snapshot.val(), req.params.id);
        if (result instanceof Object) {
            console.log('[Firebase]Successfully sent!');
            res.send(JSON.stringify(result));
        } else {
            console.log('[Firebase]404 not found!');
            res.status(404).send(result);
        }
    });
});

app.post("/save", function(req, res) {
    req.content = "";
    req.addListener("data", function(chunk) {
        req.content += chunk;
    });

    req.addListener("end", function() {
        var modelAdmin = new Firebase('https://ramp-model.firebaseio.com/model-admin');

        if (modelAdmin.push(JSON.parse(req.content))) {
            console.log('[Firebase]Saving done!');
            res.status(200).send("App models saved!");
        } else {
            console.log('[Firebase]Saving failed!');
            res.status(404).send("App models not saved!");
        }
        res.end();
    });
});

function findById(source, id) {
  for (var key in source) {
      if (source[key]["id"] == id) {
          return source[key];
      }
  }
      return "Couldn't find damn app with id: " + id;
}

console.log("Listening on port " + port);
