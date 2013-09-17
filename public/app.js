window.onload = function () {
    var ModelAdmin = require ('./lib/ModelAdmin.js');
    admin = new ModelAdmin('SampleAdmin');

    openSockets(admin);
    createDiagram(admin);

    Backbone.history.start();

    $('.full-height').height($(window).height());

    //test ko lang to -ace
    admin.createModel("ace");
    admin.createModel("weto");

    view = new RampBackbone.Views.MainView({el: ".sidebar", model_admin: admin});
    view.render();

};
