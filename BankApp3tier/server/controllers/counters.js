var Accounts = require('../models/accounts');

var async = require('async');

exports.count = function(req, res) {

    async.parallel({
        accounts_count: function(callback) {
            Accounts.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        // book_instance_count: function(callback) {
        //     BookInstance.countDocuments({}, callback);
        // },
        // book_instance_available_count: function(callback) {
        //     BookInstance.countDocuments({status:'Available'}, callback);
        // },
        // author_count: function(callback) {
        //     Author.countDocuments({}, callback);
        // },
        // genre_count: function(callback) {
        //     Genre.countDocuments({}, callback);
        // }
    }, function(err, results) {
        // res.render('count', { title: 'Local Library Home', error: err, data: results });
        res.send(`${results.accounts_count}`);
    });
};