'use strict';

var customerCtrl = require('../controllers/customerControler');
var cb = require('./../utils/callback');

module.exports = function(app, config) {
    app.route(config.api_version + '/customer')
        .post(function onRequest(req, res) {
            customerCtrl.insertCustomer(req.body, cb.setupResponseCallback(res));
        })
        .get(function onRequest(req, res) {
            customerCtrl.getallCustomer(cb.setupResponseCallback(res));

        });
    app.route(config.api_version + '/customer/:id')
        .get(function onRequest(req, res) {
            customerCtrl.getCustomerById(req.params.id, cb.setupResponseCallback(res));
        })
        .delete(function onRequest(req, res) {
            customerCtrl.deletCustomer(req.params.id, cb.setupResponseCallback(res));
        })
        .put(function onRequest(req, res) {
            customerCtrl.updateCustomer(req.params.id,req.body, cb.setupResponseCallback(res));
        });

    app.route(config.api_version + '/customer/upload')
        .post(function onRequest(req, res, next) {
            var picture = req.files.file;
            picture.ID = req.body.ID;
            customerCtrl.uploadPicture(picture, cb.setupResponseCallback(res));

        });
    app.route(config.api_version + '/customer/comments')
        .post(function onRequest(req, res) {
            customerCtrl.saveComments(req.body, cb.setupResponseCallback(res));

        });

    app.route(config.api_version + '/customer/comments/:id')
        .get(function onRequest(req,res){
            customerCtrl.getComments(req.params.id,cb.setupResponseCallback(res));
        })
};
