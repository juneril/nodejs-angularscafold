var env = process.env.NODE_ENV;

var mysql = require('mysql');
var config = require('../../config/environment/' + env);
var Database = require('../../app/utils/database').Database;
var db = new Database(mysql, config);
var async = require('async');
var fs = require('fs');
var moment = require('moment');

exports.insertCustomer = function insertCustomer(data, next) {
    var costumerobj = {

        FirstName: data.FirstName,
        LastName: data.LastName,
        Address: data.Address,
        ContactNumber: data.ContactNumber,
        Email: data.Email,
        DateCreated: moment(new Date(Date.now())).format('YYYY-MM-DD H:m:s'),
        CreatedBy: 'Admin',
        Deleted: 0

    };
    var costumerInsert = mysql.format('INSERT INTO customers SET  ?', costumerobj);
    console.log(costumerInsert);
    db.insertWithId(costumerInsert, next);


};

exports.updateCustomer = function updateCustomer(id, data, next) {

    var sqljob = 'UPDATE customers SET FirstName = ?,LastName = ?,Address = ? ,ContactNumber =?,Email =?,DateUpdated =now() WHERE ID=?';
    var updatetjob = [data.FirstName, data.LastName, data.Address, data.ContactNumber, data.Email, id];
    var sqlString = mysql.format(sqljob, updatetjob);
    console.log(sqlString);
    db.actionQuery(sqlString, next);

};

exports.savePicture = function savePicture(data, next) {


    async.waterfall([
        function(callback) {
            var sql = 'SELECT Picture FROM customers Where ID =' + data.ID;
            db.query(sql, function(err, response) {
                if (err) {
                    callback(err, null);
                }


                if (response && response.length) {
                    console.log(response[0]);
                    var delpath = '.' + response[0].Picture;
                    fs.unlink(delpath);
                }
                callback(null, response);
            });
        },
        function(result, callback) {
            var sqljob = 'UPDATE customers SET Picture = ?,DateUpdated=now() WHERE ID= ?';
            var updatetjob = [data.path, data.ID];

            var sqlString = mysql.format(sqljob, updatetjob);
            db.actionQuery(sqlString, function(err,response){
                if(err){callback(err,null);}
                    callback(null,err);
            });
        }
    ], next);

    // var sqljob = 'UPDATE customers SET Picture = ?,DateUpdated=now() WHERE ID= ?';
    // var updatetjob = [data.path, data.ID];

    // var sqlString = mysql.format(sqljob, updatetjob);
    // db.actionQuery(sqlString, next);

};

exports.deletCustomer = function deletCustomer(id, next) {

    async.waterfall([
        function(callback) {
            var sql = 'SELECT Picture FROM customers Where ID =' + id;
            db.query(sql, function(err, response) {
                if (err) {
                    callback(err, null);
                }


                if (response && response.length) {
                    console.log(response[0]);
                    var delpath = '.' + response[0].Picture;
                    fs.unlink(delpath);
                }
                callback(null, response);
            });
        },
        function(data, callback) {
            var sSQL = 'DELETE FROM customers WHERE ID =' + id;
            db.query(sSQL, function(error, resp) {
                if (error) {
                    callback(error, null);
                }
                callback(null, resp);
            });
        }
    ], next);

};

exports.getallCustomer = function getallCustomer(next) {

    var sql = 'SELECT * FROM customers ORDER BY ID DESC;';
    db.query(sql, next);

};

exports.getCustomerById = function getCustomerById(id, next) {

    var sql = 'SELECT * FROM customers WHERE ID = ' + id;
    db.query(sql, next);

};

exports.saveComments = function saveComments(data, next) {
    console.log(data);
    var comobj = {
        DocumentationId: data.id,
        comment: data.comment,
        commentDate: 'NOW()',
        commentedBy: 'ADMIN'
    }
    var commentinsert = mysql.format('INSERT INTO doc_comments (DocumentationId,comment,commentDate,commentedBy) VALUES (?,?,now(),\'Admin\')');
    var values = [data.id, data.comment];
    var sqlString = mysql.format(commentinsert, values);
    db.insertWithId(sqlString, next);

};

exports.getComments = function getComments(id, next) {

    var sql = 'SELECT * FROM doc_comments dc LEFt join documentation dm on dc.DocumentationId=dm.DocumentationId  where dm.DocumentationId =' + id;
    db.query(sql, next);

};
