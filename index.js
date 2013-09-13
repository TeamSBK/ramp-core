var express = require("express");
var Firebase = require('firebase');
var app = express();
var port = 8000;

//Set view
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

// var mainFirebase = new Firebase('https://ramp-model.firebaseio.com/');
var fieldTypes = new Firebase('https://ramp-model.firebaseio.com/field-types');
var modelRels = new Firebase('https://ramp-model.firebaseio.com/relationships');

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

app.get("/:room", function(req, res){
    res.render("weto");
});

io.sockets.on('connection', function (socket) {
    socket.on('send', function (data) {
        socket.emit('message', { message: 'welcome to the chat' });
        io.sockets.emit('message', data);
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
