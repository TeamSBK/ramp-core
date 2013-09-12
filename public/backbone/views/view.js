RampBackbone.Views.MainView = Backbone.Router.extend({
    //template: JST["/backbone/templates/index"],
    template: JST["index"],
    initialize: function(options){
       this.el = options.el;
    },

    render: function(){
        $(this.el).html(this.template());
    }

});
