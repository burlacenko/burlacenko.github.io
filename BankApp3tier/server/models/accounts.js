// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// luxon: a powerful, modern, and friendly library for parsing, validating, manipulating, formatting and localising dates.
const { DateTime } = require('luxon');
var async = require('async');

// import passportLocalMongoose from 'passport-local-mongoose';
// const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: Schema.Types.ObjectId
    }
})

const AccountSchema = new Schema({
    name: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true, unique: true },
    password: { type: String, trim: true },
    role: {
        type: String,
        enum: ['accountOwner', 'employee'],
        default: 'accountOwner',
    },
    status: {
        type: String,
        enum: ['new', 'active', 'closed', 'blocked'],
        default: 'new',
    },
    authStrategy: {
        type: String,
        default: 'local',
    },
    balance: {
        type: Number,
        default: 0,
    },
    statement: [ {entry: Number,
                  date: Date,
                  value: Number,
                  kind: {type: String, enum:['D', 'C']},
                 }
               ],
    refreshToken: {
        type: [Session]
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    lastlogin: { type: Date, default: Date.now },
    logins: [ {date: Date,
               ip_local: String,
               ip_external: String,
              }
            ],
},
//optional collectionname or default will be plural,
// { collection: 'accounting' } 
);

// AccountSchema.set("toJSON", {
//     transform: function(doc, ret, options) {
//         delete ret.refreshToken
//         return ret
//     },
// })
// 
// AccountSchema.plugin(passportLocalMongoose);

// some Arrays to hold data
// var accounts = [];

function accountCreate(name, email, password, role, status, authStrategy, balance, statement, callback) {
    accountdetail = {name: name , email: email, password: password}
    
    if (!authStrategy) {accountdetail.authStrategy = 'active'}
        else {accountdetail.authStrategy = authStrategy};

    if (!balance) {accountdetail.balance = 0}
        else { accountdetail.balance = balance}

    if (!statement) {accountdetail.statement = []}
        else { accountdetail.statement = statement}
    
    var aAccount = new Account(accountdetail);
         
    aAccount.save(function (err) {
      if (err) {
        callback(err, null)
        return
      }
      console.log('New Account: ' + aAccount);
      
    //   accounts.push(aAccount);
      callback(null, aAccount);
    }  );
}

function reCountCallback (err, result) {
  if (err){
     console.log(`Erro: ${err}`)
     } else {   
         console.log(result);

         async function Recontagem () {
         var novaContagem = await Account.countDocuments({});   
         console.log(`Nova contagem: ${novaContagem}`);
         }
         
         Recontagem();
      }
}

async function createAccounts() {
    async.series([
        function(callback) {
          accountCreate('Da Bur', 'dabur@mit.edu', '11111111', 'accountOwner', 'active', 'local', 0, [], callback);
        },
        function(callback) {
          accountCreate('John Doe', 'john@doe.com', '22222222', undefined, undefined, undefined, 0, [], callback);
        }
        ],
        // optional callback
        //cb
        reCountCallback
        );
}

AccountSchema.statics.initializeAccounts = async function () {
// const initializeAccounts = async function () {
  var getPromise = await Account.countDocuments({});
  console.log(getPromise);
  if (getPromise === 0) {
      console.log(`No data to be shown`)
      createAccounts();
  }
}

// The first argument is the singular name of the collection that will be created for your model (Mongoose will create the database collection for the above model SomeModel above)
// by default, mongoose creates collection in "PLURAL" inside the database!
// https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name
// FUNNY: set this "Mouse" and the Collection name will be its correct plural: "mice"
// set it to plural and plural COLLECION NAME will be
// set it to singular and plural COLLECION NAME will be
// THIS IS the string that sets the default COLLECION NAME to be pluralized if collection (name) is not defined in the Schema definition (at new Schema)
// module.exports = mongoose.model('Accounts', AccountSchema);
Account = mongoose.model('Account', AccountSchema);

// THIS WON'T WORK:
// module.exports = { Account, initializeAccounts };
// SOLUTION is to attach that function as a static method and export the model: https://stackoverflow.com/questions/31410676/nodejs-mongoose-exports-function-and-module-exports-incompatibility
module.exports = Account; //mongoose.model('Account', AccountSchema);


// if we needed 2 models in one file:
// https://javascript.tutorialink.com/how-to-exports-many-mongoose-models-modules-in-node-js/
