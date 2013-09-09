var ModelObject = require ('./ModelObject');
var ModelAdminEvents = require ('ModelAdminEvents');

var ModelAdmin = function () {
    var modelPool = [];

    this.getModelPool = function () {
        return modelPool;
    };
};

util.inherits(ModelObject, events.EventEmitter);

ModelAdmin.prototype.createModel = function (name) {
    //Check if the model name is already taken
    for (var i = 0; i < modelPool.length; i++) {
        if (modelPool[i].name === name) {
            throw new Error ("Model Name is already taken.");
        }
    }

    var newModel = new ModelObject (name);
    modePool.push (newModel);
    this.emit(ModelAdminEvents.MODEL_CREATED, newModel);

    return newModel;
};

ModelAdmin.prototype.getModel = function (name) {
    var modelPool = this.getModelPool();

    for (var i = 0; i < modelPool.length; i++) {
        if (modelPool[i].name === name) {
            return modelPool[i];
        }
    }

    //throw error if nothing is found
    throw new Error("Model is non existent.");
};

ModelAdmin.prototype.deleteModel = function (name) {
    var modelPool = this.getModelPool();
    var succeeded = false;

    for (var i = 0; i < modelPool.length; i++) {
        if (modelPool[i].name === name) {
            modelObject = modelPool.splice(i,1)[0];
            succeeded = true;
        }
    }

    if (!succeeded) {
        throw new Error ("Model is non existent.");
    }

    this.emit(ModelAdminEvents.MODEL_DELETED, modelObject);
};

module.exports = ModelAdmin;
