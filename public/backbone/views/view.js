var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

RampBackbone.Views.MainView = Backbone.View.extend({
    template: JST["index"],

    events: {
        'click div.show-list' : "showModelList"
    },

    initialize: function(options){
       var self = this
       this.el = options.el;
       this.model_admin = options.model_admin;

       window.wat = this.model_admin;
    },

    render: function(){
        $(this.el).html(this.template());
    },

    showModelList: function(){
        this.clearList();

        _.each(this.model_admin.getModelPool(), function(model){
            $("#anydata").append("<div class='row list-entry'></div>");
            view = new RampBackbone.Views.ListItemView({el: $(".list-entry").last(), model: model, admin: this.admin})
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
        "click .list-val" : "showModel"
    },

    initialize: function(options){
        this.el = options.el;
        this.model = options.model;
        this.admin = options.admin;
    },

    render: function(){
        $(this.el).html(this.template({name: this.model.modelName}))
    },

    showModel: function(){
        view = new RampBackbone.Views.ModelView({el: "#anydata",model: this.model, admin: this.admin});
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
        this.admin = options.admin;

        this.admin.on(ModelAdminEvents.ATTRIBUTE_ADDED, function(attribute){
            if(attribute.owner == _that.model.modelName){
                _that.render();
            }
        });

        this.admin.on(ModelAdminEvents.ATTRIBUTE_REMOVED, function(attribute){
            if(attribute.owner == _that.model.modelName){
                _that.render();
            }
        });
        //this.model.on(ModelObjectEvents.ATTRIBUTE_ADDED, function(){ _that.render() })
        //this.model.on(ModelObjectEvents.ATTRIBUTE_REMOVED, function(){ _that.render() })
    },

    render: function(){
        $(this.el).html(this.template({model: this.model}))
        this.showAttributes();
    },

    addModel: function(){
        view = new RampBackbone.Views.AddModelView({el: "#add-attribute", model: this.model, admin: this.admin});
        view.render();
    },

    addRelationship: function(){
        view = new RampBackbone.Views.AddRelationshipView({el: "#add-relationship", model: this.model, admin: this.admin});
        view.render();
    },

    showAttributes: function(){
        _.each(this.model.getAttributes(),function(attribute){
                _that.$("#attributes").append("<li></li>");
                view = new RampBackbone.Views.AttributeView({el:_that.$("li").last(), attr: attribute, model: _that.model, admin: _that.admin});
                view.render();
        });
    },
});

RampBackbone.Views.AddRelationshipView = Backbone.View.extend({
    events: {
        "click .save-model" : "saveAttribute",
        "click .btn-default" : "removeMe"
    },

    template: JST["addRelationshipView"],
    initialize: function(options){
        this.el = options.el;
        this.model = options.model;
        this.relationship_types = ["has_many", "has_one", "belongs_to"];
    },

    render: function(){
       $(this.el).html(this.template());

       this.addRelationshipTypes();
    },

    removeMe: function(){
        $(this.el).empty();
        $(this.el).unbind();
    },

    addRelationshipTypes: function(){
        _.each(this.relationship_types, function(val){
            this.$("#relationship-type").append(
                "<option value='"+val+"'>"+val+"</option>"
            );
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
        this.admin = options.admin;
    },

    render: function(){
        $(this.el).html(this.template({attr: this.attr}));
    },

    removeAttribute: function(){
        this.$(".remove-attr").unbind();
        this.admin.removeAttribute(this.model.modelName,this.attr.attribute);
        this.remove();
    },

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
        this.admin = options.admin;
        this.attribute_types = ["binary", "boolean", "date", "dateTime", "decimal",
            "float", "integer", "primary_key", "references", "string", "text",
            "time", "timestamp"
        ];
    },

    render: function(){
        $(this.el).html(this.template());
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

        this.admin.addAttribute(this.model.modelName,attr_name,attr_type);
        this.removeMe();
    },

    removeMe: function(){
        $(this.el).empty();
        $(this.el).unbind();
    }
});
