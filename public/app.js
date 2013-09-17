window.onload = function () {
    var ModelAdmin = require ('./lib/ModelAdmin.js');
    admin = new ModelAdmin('SampleAdmin');

    openSockets(admin);
    createDiagram(admin);

    Backbone.history.start();

};
