'use strict';

var env = process.env.NODE_ENV;
var customerDaos = require('../daos/customerDaos');

var fs = require('fs');
var fsx = require('fs-extra');
var mysql = require('mysql'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../../config/environment/' + env),
    Database = require('../../app/utils/database').Database,
    db = new Database(mysql, config),
    async = require('async');

exports.insertCustomer = function insertCustomer(data, next) {
    customerDaos.insertCustomer(data, function(err, res) {
        next(err, res);
    });

};

exports.updateCustomer = function updateCustomer(id,data, next) {
    customerDaos.updateCustomer(id,data, function(err, res) {
        next(err, res);
    })

};

exports.deletCustomer = function deleteDocument(id, next) {

    customerDaos.deletCustomer(id, function(err, res) {
        next(err, res);
    })

};

exports.getallCustomer = function getallCustomer(next) {
    customerDaos.getallCustomer(function(err, res) {
        next(err, res);
    })

};

exports.getCustomerById = function getCustomerById(id, next) {

    customerDaos.getCustomerById(id, function(err, res) {
        next(err, res);
    })

};

exports.saveComments = function saveComments(data, next) {
    customerDaos.saveComments(data, function(err, res) {
        next(err,res);

    });

};

exports.getComments = function getComments(id,next){
    customerDaos.getComments(id,function(err,res){
        next(err,res);
    });
}

exports.uploadPicture = function uploadPicture(picture, next) {
        var path2='/public/upload/images/';
  
    var tmp_path = picture.path;

    var target_path = '.'+path2 + picture.name;
    var paths=path2+picture.name;


    var updatepicture = function(data) {
        
        customerDaos.savePicture(data, function(err, res) {
            console.log(res);
            next(err, res);
        });


    };

    if (!fsx.existsSync('.'+path2)) {


        fsx.ensureDirSync('.'+path2);
        fs.rename(tmp_path, target_path, function(err) {
            if (err) next(err, null);
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) next(err, null);
                var data = {
                    ID: picture.ID,
                    path: paths,
                    size: picture.size,
                    originalname: picture.originalname,
                    name: picture.name,
                    extension: picture.extension
                };
                updatepicture(data);
            });
        });


    } else {

        fs.rename(tmp_path, target_path, function(err) {
            if (err) next(err, null);
            fs.unlink(tmp_path, function() {
                if (err) next(err, null);
                var data = {
                    ID: picture.ID,
                    path: paths,
                    size: picture.size,
                    originalname: picture.originalname,
                    name: picture.name,
                    extension: picture.extension
                };
                updatepicture(data);
            });
        });
    }





};
