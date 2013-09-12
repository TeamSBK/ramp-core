var Attribute = require ("./Attribute");
var Relationship = require ("./Relationship");
var ModelObjectEvents = require("./ModelObjectEvents");
var util = require("util");
var events = require("events");

var ModelObject = function (modelName) {
    if (typeof modelName === 'undefined') {
        throw Error (new Error ('Model Name parameter required.'));
    }

    this.name = modelName;

    var attributes = [];
    var relationships = [];

    this.getAttributes = function () {
        return attributes;
    };

    this.getRelationships = function () {
        return relationships;
    };
};

util.inherits(ModelObject, events.EventEmitter);

ModelObject.prototype.addAttribute = function (attribute, type) {
    var attributeArr = this.getAttributes();

    //Check if attribute is taken
    for (var i = 0; i < attributeArr.length; i++) {
        if (attributeArr[i].attribute === attribute) {
            throw new Error("Attribute name already taken.");
        }
    }

    var newAttribute = new Attribute (attribute, type);
    attributeArr.push(newAttribute);
    this.emit(ModelObjectEvents.ATTRIBUTE_ADDED, newAttribute );
};

ModelObject.prototype.removeAttribute = function(attribute) {
    var attributeArr = this.getAttributes();
    var succeeded = false;

    for (var i = 0; i < attributeArr.length; i++) {
        if (attributeArr[i].attribute === attribute) {
            attributeObject = attributeArr.splice(i, 1)[0];
            succeeded = true;
        }
    }

    if (!succeeded) {
        throw new Error("Attribute is non existent.");
    }

    this.emit(ModelObjectEvents.ATTRIBUTE_REMOVED, attributeObject);
};

ModelObject.prototype.addRelationShip = function (model, type) {
    var relationshipArr = this.getRelationships();

    //Check if relatioship is taken
    for (var i = 0; i < relationshipArr.length; i++) {
        if (relationshipArr[i].model === model) {
            throw new Error("Model name already taken.");
        }
    }

    var newRelationship = new Relationship (model, type);
    relationshipArr.push(newRelationship);
    this.emit(ModelObjectEvents.RELATIONSHIP_ADDED, newRelationship);
};

ModelObject.prototype.removeRelationShip = function (model) {
    var relationshipArr = this.getRelationships();
    var relationshipObject;
    var succeeded = false;

    for (var i = 0; i < relationshipArr.length; i++) {
        if (relationshipArr[i].model === model) {
            relationshipObject = relationshipArr.splice(i, 1)[0];
            succeeded = true;
        }
    }

    if (!succeeded) {
        throw new Error("Relationship is non existent.");
    }

    this.emit(ModelObjectEvents.RELATIONSHIP_REMOVED, relationshObject);
};

module.exports = ModelObject;
