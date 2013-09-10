window.onload = function () {
    var ModelAdmin = require ('./model-admin/ModelAdmin.js');
    window.admin = new ModelAdmin('SampleAdmin');
};
