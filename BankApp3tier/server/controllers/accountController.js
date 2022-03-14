var Account = require('../models/accounts.js');
var { DateTime } = require('luxon');
var async = require('async');

exports.account_list = function(req, res, next) {

    // res.send("You're the coolest!")

    Account.find({}, 'name email')
      .sort({name : 1})
       // we also call populate() on Book, specifying the author field—this will replace the stored book author id with the full author details
      // .populate('author')
      .exec(function (err, list_accounts) {
        if (err) { return next(err); }
        //Successful, so render
        //res.render('book_list', { title: 'Book List', book_list: list_books })
        res.send({ title: 'Account List', account_list: list_accounts })
      });
  
};

exports.account_user_request_login = function(req, res, next) {
  console.log('account_user_request_login')
  console.log(req.params);
  console.log(req.body);
  console.log(req.body.email);
  var DateTimeNowISO = DateTime.now().toISO();
  console.log(DateTimeNowISO);

  // res.send("You're account_user_request_login!");

  Account.findOne({'email': req.body.email, 'password': req.body.password}) //, '_id name email balance statement')
         .exec(function (err, user_login) {
          if (err) { return next(err); }
          // no error Successful, but may be empty?
          if (!user_login) {
            res.json({});
          } else {
            //res.send({ title: 'User requested login for '+ req.body.email, account: user_login });
            let oneLoginInfo = {date: DateTimeNowISO,
              ip_local: req.body.externalIP,
              ip_external: req.body.externalIP
            };
            // console.log(oneLoginInfo);
            // console.log(user_login);
            // console.log(user_login.logins);
            user_login.logins.push(oneLoginInfo);
            user_login.lastlogin = DateTimeNowISO;

            // is it time to update from new to active?
            if (user_login.status === 'new') {
              user_login.status = 'active'
            }            

            // update document!
            user_login.save();

            // we select fields that should be sent to client:
            let account = {
              _id: user_login._id,
              name: user_login.name,
              email: user_login.email,
              balance: user_login.balance,
              statement: user_login.statement,
              status: user_login.status
            }
            res.json({account});
          }
        });
};

exports.account_add_statement_entry = function(req, res, next) {
  console.log('account_add_statement_entry')
  console.log(req.params);
  console.log(req.body);
  console.log(req.body.id);
  console.log(req.body.statementEntry);
  console.log(req.body.balance);

  // https://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
  var conditions = { _id: req.body.id };
  var update = { $inc: { visits: 1 }};
  var options = { multi: false };

  Account.findOne({'_id': req.body.id}) //, '_id name email balance statement')
         .exec(function (err, account_info) {
          if (err) { return next(err); }
          //Successful?
          if (account_info) {
              account_info.statement.push(req.body.statementEntry);
              account_info.balance = req.body.balance;
              account_info.updated = req.body.statementEntry.date;
              account_info.save();
              // in the future we may limit returned content (let's NOT send statements!)
              res.json({account: account_info}); 
          } else {
            res.json({});
          }
        });
};

exports.account_user_request_create_account = function(req, res, next) {
  console.log('account_user_request_create_account')
  console.log(req.params);
  console.log(req.body);
  console.log(req.body.email);
  var DateTimeNowISO = DateTime.now().toISO();
  console.log(DateTimeNowISO);
  var autoLogin = false;

  // Upsert: https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
  var query = {'email': req.body.email};
  var update = { lastlogin: DateTimeNowISO };
  var options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  Account.findOneAndUpdate(query, update, options, 
      function(err, user_login) {
      if (err) {
        console.log('Error at findOneAndUpdate in account_user_request_create_account');
        return};

      // do something with the document
      // console.log('user_login.password:' + user_login.password);
      // console.log('req.body.password:' + req.body.password);
      if (!user_login) {
        console.log('findOneAndUpdate in account_user_request_create_account: email NOT FOUND?');
      } else {
        // so far, user_login already exists, BUT user_login.password should NOT exist if account is new!
        if (!user_login.password) {
          // user is new: name and password still haven't been created!
          autoLogin = true;
        } else {
          // user is NOT new: test if password matches
          
          if (!req.body.password) {
            // comparison is not possible and therefore login must be aborted
            autoLogin = false;
          } else {
            if (user_login.password.toLowerCase() === req.body.password.toLowerCase()) {
              // if so, we must auto login
              autoLogin = true;
            }
          }
        }
      }

      if (!autoLogin) {
        // sorry, but we have to stop
        res.json({userExists: true});
        return
      }

      // more updates, same as login:
      let oneLoginInfo = {date: DateTimeNowISO,
        ip_local: req.body.externalIP,
        ip_external: req.body.externalIP
      };
      console.log(oneLoginInfo);
      console.log(user_login);
      // console.log(user_login.logins);
      user_login.logins.push(oneLoginInfo);
      // levei para "update":
      // user_login.lastlogin = DateTimeNowISO;

      // is it time to update from new to active?
      if (user_login.status === 'new') {
        if (user_login.statement.length > 0) {
          // user already exists and is active because there were deposits
          user_login.status = 'active';
        } else {
          // user is new, so "name" and "password" need to be defined
          user_login.name = req.body.name;
          user_login.password = req.body.password;
        }            
      }

      // update document!
      user_login.save(); 
      
      // we select fields that should be sent to client:
      let account = {
        _id: user_login._id,
        name: user_login.name,
        email: user_login.email,
        balance: user_login.balance,
        statement: user_login.statement,
        status: user_login.status
      }
      res.json({account});

  }
  );


  // Account.findOne({'email': req.body.email, 'password': req.body.password}) //, '_id name email balance statement')
  //        .exec(function (err, user_login) {
  //         if (err) { return next(err); }
  //         // no error Successful, but may be empty?
  //         console.log('user_login:');
  //         console.log(user_login);
  //         if (!user_login) {
  //           // does NOT exist, so it needs to be created!


  //           res.json({});
  //         } else {
  //           // ACCOUNT ALREADY EXISTS!
  //           // check if NAME is equal (ignore case)
  //           console.log(`Current account name: ${req.body.name}`);
  //           console.log(`New account name: ${user_login.name}`);
  //           if ( req.body.name.toUpperCase() === user_login.name.toUpperCase() ) {
  //             // names are igual

  //           } else {
  //             // names are different

  //           }// CONCLUSION: we return the database name and let treatment and message be held at client! 

  //           // same as login:
  //           let oneLoginInfo = {date: DateTimeNowISO,
  //             ip_local: req.body.externalIP,
  //             ip_external: req.body.externalIP
  //           };
  //           console.log(oneLoginInfo);
  //           console.log(user_login);
  //           // console.log(user_login.logins);
  //           user_login.logins.push(oneLoginInfo);
  //           user_login.lastlogin = DateTimeNowISO;

  //           // is it time to update from new to active?
  //           if (user_login.status === 'new') {
  //             user_login.status = 'active'
  //           }            

  //           // update document!
  //           user_login.save();

  //           // we select fields that should be sent to client:
  //           let account = {
  //             _id: user_login._id,
  //             name: user_login.name,
  //             email: user_login.email,
  //             balance: user_login.balance,
  //             statement: user_login.statement,
  //             status: user_login.status
  //           }
  //           res.json({account});
  //         }
  //       }
  //       );
};
