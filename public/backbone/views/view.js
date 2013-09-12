RampBackbone.Views.MainView = Backbone.View.extend({
    template: JST["index"],

    events: {
        'click div.show_list' : "showModelList"
    },

    initialize: function(options){
       this.el = options.el;
       if(typeof(options.model_admin) != "undefined"){
           this.model_admin = options.model_admin;
        }
       //bind rerender when new model is created
    },

    render: function(){
        $(this.el).html(this.template());
    },

    showModelList: function(){
        _.each(this.model_admin, function(){
            //render each model small view
        });

    }

});
