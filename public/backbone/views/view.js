var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');
var ModelObjectEvents = require('./lib/ModelObjectEvents.js');

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
        $("#anydata").unbind();
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
        this.view;
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
    events: {
        "click .add-model" : "addModel",
        "click .add-relationship" : "addRelationship"
    },

    template: JST["modelView"],

    initialize: function(options){
        _that = this
        this.el = options.el;
        this.model = options.model;
        this.model.on(ModelObjectEvents.ATTRIBUTE_ADDED, function(){ _that.render() })
        this.model.on(ModelObjectEvents.ATTRIBUTE_REMOVED, function(){ _that.render() })
    },

    render: function(){
        $(this.el).html(this.template({model: this.model}))
        this.showAttributes();
    },

    addModel: function(){
        view = new RampBackbone.Views.AddModelView({el: "#add-attribute", model: this.model});
        view.render();
    },

    removeAttribute: function(){

    },

    //addRelationship: function(){
        //view = new RampBackbone.Views.AddRelationshipView({el: "#add-relationship"}, model: this.model);
        //view.render
    //},

    showAttributes: function(){
        _.each(this.model.getAttributes(),function(attribute){
                _that.$("#attributes").append("<li></li>");
                view = new RampBackbone.Views.AttributeView({el:_that.$("li").last(), attr: attribute, model: _that.model});
                view.render();
        });
    },
});

RampBackbone.Views.AttributeView = Backbone.View.extend({
    events: {
        "click .remove-attr" : "removeAttribute"
    },

    template: JST["attributeView"],

    initialize: function(options){
        this.el = options.el;
        this.attr = options.attr;
        this.model = options.model;
    },

    render: function(){
        $(this.el).html(this.template({attr: this.attr}));
    },

    removeAttribute: function(){
        this.$(".remove-attr").unbind();
        this.model.removeAttribute(this.attr.attribute);
        this.remove();
    }

});

RampBackbone.Views.AddModelView = Backbone.View.extend({
    events: {
        "click .save-model" : "saveAttribute",
        "click .btn-default" : "removeMe"
    },

    template: JST["addModelView"],
    initialize: function(options){
        this.el = options.el;
        this.model = options.model;
        this.attribute_types = ["binary", "boolean", "date", "dateTime", "decimal",
            "float", "integer", "primary_key", "references", "string", "text",
            "time", "timestamp"
        ];
    },

    render: function(){
        $(this.el).html(this.template({model:this.model}));
        this.addAttributeTypes();
    },

    addAttributeTypes: function(){
        _.each(this.attribute_types, function(val){
            this.$("#attribute-type").append(
                "<option value='"+val+"'>"+val+"</option>"
            );
        });
    },

    saveAttribute:  function(){
        attr_name = this.$("#attribute-name").val();
        attr_type = this.$("#attribute-type").val();

        this.model.addAttribute(attr_name,attr_type);
        this.removeMe();
    },

    removeMe: function(){
        $(this.el).empty();
        $(this.el).unbind();
    }
});
