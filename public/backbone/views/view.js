var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

RampBackbone.Views.MainView = Backbone.View.extend({
    template: JST["index"],

    events: {
        'click div.show_list' : "showModelList"
    },

    initialize: function(options){
       var self = this
       this.el = options.el;
       this.model_admin = options.model_admin;

       window.wat = this.model_admin;
       //this.model_admin.on(ModelAdminEvents.MODEL_CREATED, function(){self.showModelList()})
    },

    render: function(){
        $(this.el).html(this.template());
    },

    showModelList: function(){
        this.clearList();

        _.each(this.model_admin.getModelPool(), function(model){
            $("#anydata").append("<div class='row list-entry'></div>");
            view = new RampBackbone.Views.ListItemView({el: $(".list-entry").last(), model: model})
            view.render();
        });

    },

    clearList: function(){
        var items = $("#anydata").children();

        if(items.length > 0)
            $("#anydata").empty();
    }

});

RampBackbone.Views.ListItemView = Backbone.View.extend({
    template: JST["listEntry"],

    events: {
        "click .list-entry" : "showModel"
    },

    initialize: function(options){
        this.el = options.el;
        this.model = options.model;
    },

    render: function(){
        $(this.el).html(this.template({name: this.model.name}))
    },

    showModel: function(){
        view = new RampBackbone.Views.ModelView({el: "#anydata",model: this.model});
        view.render();
    }
});

RampBackbone.Views.ModelView = Backbone.View.extend({
    template: JST["modelView"],
    initialize: function(options){
        this.el = options.el;
        this.model = options.model;
    },

    render: function(){
        $(this.el).html(this.template({model: this.model}))
    }
});
