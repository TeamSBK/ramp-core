var ModelAdminEvents = require ('./lib/ModelAdminEvents.js');

RampBackbone.Views.MainView = Backbone.View.extend({
    template: JST["index"],

    events: {
        'click div.show-list' : "toggleModelList",
        'click div.save-data' : "saveJSON"
    },

    initialize: function(options){
       self = this;
       this.el = options.el;
       this.model_admin = options.model_admin;

       window.wat = this.model_admin;
    },

    render: function(){
        $(this.el).html(this.template());
    },

    toggleModelList: function(){
        var items = $("#anydata").children();

        if(items.length == 0) {
            this.showModelList();
        } else {
            this.clearList();
        }
    },

    showModelList: function(){
        this.clearList();

        _.each(this.model_admin.getModelPool(), function(model){
            $("#anydata").append("<div class='row list-entry'></div>");
            view = new RampBackbone.Views.ListItemView({el: $(".list-entry").last(), model: model, admin: this.admin})
            view.render();
        });
    },

    saveJSON: function(){
        $.post("/save", this.model_admin.modelToJson(),
            function(){
                alert("This is your API KEY: "+ self.model_admin.getId())
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
        self = this
        this.el = options.el;
        this.model = options.model;
        this.admin = options.admin;

        this.admin.on(ModelAdminEvents.ATTRIBUTE_ADDED, function(attribute){
            if(attribute.owner == self.model.modelName){
                self.render();
            }
        });

        this.admin.on(ModelAdminEvents.ATTRIBUTE_REMOVED, function(attribute){
            if(attribute.owner == self.model.modelName){
                self.render();
            }
        });

        this.admin.on(ModelAdminEvents.RELATIONSHIP_ADDED, function(relationship){
            if(relationship.owner == self.model.modelName){
                self.render();
            }
        });

        this.admin.on(ModelAdminEvents.RELATIONSHIP_REMOVED, function(relationship){
            if(relationship.owner == self.model.modelName){
                self.render();
            }
        });
    },

    render: function(){
        $(this.el).html(this.template({model: this.model}))
        this.showAttributes();
        this.showRelationships();
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
                self.$("#attributes").append("<li></li>");
                view = new RampBackbone.Views.AttributeView({el:self.$("li").last(), attr: attribute, model: self.model, admin: self.admin});
                view.render();
        });
    },

    showRelationships: function(){
        _.each(this.model.getRelationships(), function(relationship){
            self.$("#relationships").append("<li></li>");
                view = new RampBackbone.Views.RelationshipView({el:self.$("li").last(), rel: relationship, model: self.model, admin: self.admin});
                view.render();
        });
    }
});

RampBackbone.Views.RelationshipView = Backbone.View.extend({
    events: {
        "click .remove-rel" : "removeRelationship"
    },

    template: JST["relationshipView"],

    initialize: function(options){
        this.el = options.el;
        this.rel = options.rel;
        this.model = options.model;
        this.admin = options.admin;
    },

    render: function(){
        $(this.el).html(this.template({rel: this.rel}));
    },

    removeRelationship: function(){
        this.$(".remove-rel").unbind();
        this.admin.removeRelationship(this.model.modelName,this.rel.withModel);
        this.admin.removeRelationship(this.rel.withModel,this.model.modelName);
        this.remove();
    },

});


RampBackbone.Views.AddRelationshipView = Backbone.View.extend({
    events: {
        "click .save-model" : "saveRelationship",
        "click .btn-default" : "removeMe"
    },

    template: JST["addRelationshipView"],
    initialize: function(options){
        _that = this
        this.el = options.el;
        this.model = options.model;
        this.admin = options.admin;
        this.relationship_types = ["has_many", "has_one"];
    },

    render: function(){
       $(this.el).html(this.template());

       this.addRelationshipTypes();
       this.addRelationshipModels();
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

    addRelationshipModels: function(){
        _.each(this.admin.getModelPool(), function(model){
            if(model.modelName != _that.model.modelName){
                this.$("#relationship-model").append(
                    "<option value='"+model.modelName+"'>"+model.modelName+"</option>"
                );
            }
        });
    },

    saveRelationship: function(){
        rel_type = this.$("#relationship-type").val();
        rel_model = this.$("#relationship-model").val();

        this.admin.addRelationship(this.model.modelName,rel_model,rel_type);
        this.admin.addRelationship(rel_model,this.model.modelName,"belongs_to");

        this.removeMe();
    }

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
