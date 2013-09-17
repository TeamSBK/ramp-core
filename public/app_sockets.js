var openSockets = function (admin) {

    var ModelAdmin = require ('./lib/ModelAdmin.js');
    var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');
    var ServerAdminEvents = require ('./lib/ServerAdminEvents.js');
    var HistoryWriter = require ('./lib/HistoryWriter.js');

    var modelAdmin = admin;
    var writer = new HistoryWriter();

    var socket = io.connect('http://localhost:8002');
    var socketId;

    //send actions
    admin.on(ModelAdminEvents.MODEL_CREATED, function (model) {
        var evt = ModelAdminEvents.MODEL_CREATED;
        var params = { modelName : model.modelName, actor : socketId };
        var history = writer.writeHistory (socketId, evt, params);

        socket.emit(evt, history);
    });

    admin.on(ModelAdminEvents.MODEL_DELETED, function (model) {
        var evt = ModelAdminEvents.MODEL_DELETED;
        var params = { modelName : model.modelName };
        var history = writer.writeHistory(socketId, evt, params);

        socket.emit(evt, history);
    });

    admin.on(ModelAdminEvents.ATTRIBUTE_ADDED, function (attributeObj) {
        var evt = ModelAdminEvents.ATTRIBUTE_ADDED;

        var params = {
                       owner : attributeObj.owner,
                       attribute : attributeObj.attribute,
                       type : attributeObj.type
        };

        var history = writer.writeHistory(socketId, evt, params);

        socket.emit(evt, history);
    });

    admin.on(ModelAdminEvents.ATTRIBUTE_REMOVED, function (attributeObj) {
        var evt = ModelAdminEvents.ATTRIBUTE_REMOVED;

        var params = {
                       owner : attributeObj.owner,
                       attribute : attributeObj.attribute
        };

        var history = writer.writeHistory(socketId, evt, params);

        socket.emit(evt, history);
    });

    admin.on(ModelAdminEvents.RELATIONSHIP_ADDED, function (relationshipObj) {
        var evt = ModelAdminEvents.RELATIONSHIP_ADDED;

        var params = {
                       owner : relationshipObj.owner,
                       withModel : relationshipObj.withModel,
                       type : relationshipObj.type
        };

        var history = writer.writeHistory(socketId, evt, params);

        socket.emit(evt, history);
    });

    admin.on(ModelAdminEvents.RELATIONSHIP_REMOVED, function (relationshipObj) {
        var evt = ModelAdminEvents.RELATIONSHIP_REMOVED;

        var params = {
                       owner : relationshipObj.owner,
                       withModel : relationshipObj.withModel,
        };

        var history = writer.writeHistory(socketId, evt, params);

        socket.emit(evt, history);
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

    socket.on(ServerAdminEvents.ATTRIBUTE_ADDED, function (history) {
        try {
            admin.addAttribute(history.eventParams.owner,
                               history.eventParams.attribute,
                               history.eventParams.type);
        } catch (err) {
            if (err.message === 'Attribute name already taken.') {
                //do nothing - assume that the request came from the same
                //socket.
            } else {
                throw err;
            }
        }
    });

    socket.on(ServerAdminEvents.ATTRIBUTE_REMOVED, function (history) {
        try {
            admin.removeAttribute(history.eventParams.owner,
                                  history.eventParams.attribute);
        } catch (err) {
            if (err.message === 'Attribute is non existent.') {
                //do nothing - assume that the request came from the same
                //socket.
            } else {
                throw err;
            }
        }
    });

    socket.on(ServerAdminEvents.RELATIONSHIP_ADDED, function (history) {
        try {
            admin.addRelationship(history.eventParams.owner,
                                  history.eventParams.withModel,
                                  history.eventParams.type);
        } catch (err) {
            if (err.message === 'Relationship exists.') {
                //do nothing - assume that the request came from the same
                //socket.
            } else {
                throw err;
            }
        }
    });

    socket.on(ServerAdminEvents.RELATIONSHIP_REMOVED, function (history) {
        try {
            admin.removeRelationship(history.eventParams.owner,
                                     history.eventParams.withModel);
        } catch (err) {
            if (err.message === 'Relationship is non existent.') {
                //do nothing - assume that the request came from the same
                //socket.
            } else {
                throw err;
            }
        }
    });

};

