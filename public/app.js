window.onload = function () {
    var ModelAdmin = require ('./model-admin/ModelAdmin.js');
    window.admin = new ModelAdmin('SampleAdmin');

    RampBackbone.router = new RampBackbone.Routers.AppRouter();
    Backbone.history.start();
};
