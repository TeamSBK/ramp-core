var express = require("express");
var app = express();
var port = 3700;

//Set view
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));

app.get("/", function(req, res){
    res.render("page");
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

console.log("Listening on port " + port);
