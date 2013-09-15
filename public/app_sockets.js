var openSockets = function (admin) {

    var ModelAdmin = require ('./lib/ModelAdmin.js');
    var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');
    var ModelObjectEvents = require ('./lib/ModelObjectEvents.js');
    var ServerAdminEvents = require ('./lib/ServerAdminEvents.js');
    var HistoryWriter = require ('./lib/HistoryWriter.js');

    var modelAdmin = admin;
    var writer = new HistoryWriter();

    var socket = io.connect('http://localhost:8000');
    var socketId;

    //send actions
    admin.on(ModelAdminEvents.MODEL_CREATED, function (model) {
        //nuke creatorId here
        if (!model.creatorId) {
            model.creatorId = socketId;
        }

        var evt = ModelAdminEvents.MODEL_CREATED;
        var params = { modelName : model.modelName, creatorId : model.creatorId };
        var history = writer.writeHistory (evt, params);


        socket.emit(ModelAdminEvents.MODEL_CREATED, history);
    });

    admin.on(ModelAdminEvents.MODEL_DELETED, function (model) {
        var evt = ModelAdminEvents.MODEL_DELETED;
        var params = { modelName : model.modelName, creatorId : model.creatorId };
        var history = writer.writeHistory(evt, params);
        socket.emit(ModelAdminEvents.MODEL_DELETED, history);
    });

    //receive actions
    socket.on(ServerAdminEvents.SOCKET_CONNECTED, function (sId) {
        socketId = sId;
    });

    socket.on(ServerAdminEvents.MODEL_CREATED, function (history) {
        if (socketId !== history.eventParams.creatorId) {
            admin.createModel(history.eventParams.modelName, history.eventParams.creatorId);
        }
    });
};
