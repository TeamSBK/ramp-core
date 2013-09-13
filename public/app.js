window.onload = function () {
    admin = new ModelAdmin('SampleAdmin');

    openSockets(admin);

    Backbone.history.start();
    appCanvass = new AppCanvass(admin);
};
