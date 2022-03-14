// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// import passportLocalMongoose from 'passport-local-mongoose';
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: "",
    }
})

const Account = new Schema({
    accountID: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    // firstName: {
    //     type: String,
    //     default: "",
    // },
    // lastName: {
    //     type: String,
    //     default: "",
    // },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "accountOwner"
    },
    authStrategy: {
        type: String,
        default: "local"
    },
    refreshToken: {
        type: [Session]
    },
})

Account.set("toJSON", {
    transform: function(doc, ret, options) {
        delete ret.refreshToken
        return ret
    },
})

Account.plugin(passportLocalMongoose);

// export default mongoose.model("User", User)