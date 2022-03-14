// import mongoose from 'mongoose';
// const { Schema } = mongoose;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import passportLocalMongoose from 'passport-local-mongoose';
const passportLocalMongoose = require('passport-local-mongoose');

const Transactions = new Schema({
    accountID: {
        type: String,
        default: "",
    },
    entry: {
        type: Number,
        default: "",
    },
    dateTime: {
        type: Date,
        default: "",
    },
    value: {
        type: Number,
        default: "",
    },
    kind: {
        type: String,
        default: ""
    },
    authStrategy: {
        type: String,
        default: "local"
    },
});

const Transaction = mongoose.model('Transaction', Transactions);

Transactions.set("toJSON", {
    transform: function(doc, ret, options) {
        // delete ret.refreshToken
        return ret
    },
})

Transactions.plugin(passportLocalMongoose);

// export default mongoose.model("User", User)