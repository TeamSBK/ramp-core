window.onload = function () {
    var ModelAdmin = require ('./lib/ModelAdmin.js');
    var ModelAdminEvents = require ('./model-admin/ModelAdminEvents.js');
    var ModelObjectEvents = require ('./model-admin/ModelObjectEvents.js');

    var socket = io.connect('http://loacalhost:3700');

    admin = new ModelAdmin('SampleAdmin');

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
