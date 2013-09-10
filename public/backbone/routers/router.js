RampBackbone.Routers.Router = Backbone.Router.extend({
    routes: {
        "/" : "showIndex",
        "/model" : "showModel"
    },

    showIndex = function(){
        console.log("andito po me");
    },
    showModel= function(){
        console.log("Model me bitches");
    }
});
