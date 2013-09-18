window.onload = function () {
    var ModelAdmin = require ('./lib/ModelAdmin.js');

    function generateKey(plength){
      var keylist="abcdefghipqrstuvwxyz123456789"
      var temp='';
      for (i=0;i<plength;i++)
        temp+=keylist.charAt(Math.floor(Math.random()*keylist.length))
      return temp
    }

    admin = new ModelAdmin(generateKey(10));

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

