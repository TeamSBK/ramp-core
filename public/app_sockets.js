var openSockets = function (admin) {

    var ModelAdmin = require ('./lib/ModelAdmin.js');
    var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');
    var ModelObjectEvents = require ('./lib/ModelObjectEvents.js');

    var modelAdmin = admin;

    var socket = io.connect('http://loacalhost:8000');

    admin.on(ModelAdminEvents.MODEL_CREATED, function (model) {
        socket.emit(ModelAdminEvents.MODEL_CREATED, {});
    });

    admin.on(ModelAdminEvents.MODEL_MODIFIED, function (model) {
    });

    admin.on(ModelAdminEvents.MODEL_DELETED, function (model) {
    });

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });
};
