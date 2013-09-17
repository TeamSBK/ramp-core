window.onload = function () {
    var ModelAdmin = require ('./lib/ModelAdmin.js');
    admin = new ModelAdmin('SampleAdmin');

    openSockets(admin);
    createDiagram(admin);

    Backbone.history.start();

    $('.full-height').height($(window).height());


    view = new RampBackbone.Views.MainView({el: ".sidebar", model_admin: admin});
    view.render();

    $('.add-model').click(function(){
        var model_name = prompt('Enter model name:');
        admin.createModel(model_name);
    });
};
