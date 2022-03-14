// import mongoose from 'mongoose';
const mongoose = require('mongoose');

require('dotenv').config();
const DbUser = process.env.DB_USER;
const DbPass = process.env.DB_USER_PASS;
const mongoCluster = process.env.CLUSTER;
const database = process.env.DATABASE || 'EasyBank';
const localDbPort = process.env.LOCAL_DB_PORT || 27017;
// buildType = development or production
const buildType = process.env.BUILD_TYPE || 'development';

// this will define if MongoDB is cloud(Mongo Atlas) or local
// in the future:
// 1) "cloud" may be changed to a local inside the cloud server
// 2) so that localhost will consider 2 scenarios: a developer machine or a cloud server
console.log(buildType);
if (buildType === 'production') {
    var url = `mongodb+srv://${DbUser}:${DbPass}@${mongoCluster}/${database}?retryWrites=true&w=majority`;
  } else {
    // const url = 'mongodb://localhost:27017/easybank'
    var url = `mongodb://localhost:${localDbPort}/${database}`;
  }

const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

connect.then(db => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.log(err)
})