var ModelObject = require ('./model-admin/ModelObject');

var mod = new ModelObject('weto');
mod.addAttribute();

var polluted = function () {
    console.log('polluted');
};

module.exports = polluted;
