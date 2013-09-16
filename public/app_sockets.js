var openSockets = function (admin) {

    var ModelAdmin = require ('./lib/ModelAdmin.js');
    var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');
    var ModelObjectEvents = require ('./lib/ModelObjectEvents.js');
    var ServerAdminEvents = require ('./lib/ServerAdminEvents.js');
    var HistoryWriter = require ('./lib/HistoryWriter.js');

    var modelAdmin = admin;
    var writer = new HistoryWriter();

    var socket = io.connect('http://localhost:8001');
    var socketId;

    //send actions
    admin.on(ModelAdminEvents.MODEL_CREATED, function (model) {
        var evt = ModelAdminEvents.MODEL_CREATED;
        var params = { modelName : model.modelName, actor : socketId };
        var history = writer.writeHistory (socketId, evt, params);


        socket.emit(ModelAdminEvents.MODEL_CREATED, history);
    });

    admin.on(ModelAdminEvents.MODEL_DELETED, function (model) {
        var evt = ModelAdminEvents.MODEL_DELETED;
        var params = { modelName : model.modelName };
        var history = writer.writeHistory(socketId, evt, params);

        socket.emit(ModelAdminEvents.MODEL_DELETED, history);
    });

    //receive actions
    socket.on(ServerAdminEvents.SOCKET_CONNECTED, function (sId) {
        socketId = sId;
    });

    socket.on(ServerAdminEvents.MODEL_CREATED, function (history) {
        try {
            admin.createModel(history.eventParams.modelName);
        } catch (err) {
            if (err.message === 'Model Name is already taken.') {
                //do nothing - assume that the request came from the same
                //socket.
            } else {
                throw err;
            }
        }
    });

    socket.on(ServerAdminEvents.MODEL_DELETED, function (history) {
        try {
            admin.deleteModel(history.eventParams.modelName);
        } catch (err) {
            if (err.message === 'Model is non existent.') {
                //do nothing - assume that the request came from the same
                //socket.
            } else {
                throw err;
            }
        }
    });
};
