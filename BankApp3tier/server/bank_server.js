const express = require('express');
// const low = require('lowdb');
// const fs = require('lowdb/adapters/FileSync');
const cors = require('cors');
// const adapterUsers = new fs('../db/users.json');
// const db = low(adapterUsers);
// const adapterTransactions = new fs('../db/transactions.json');
// const dbTransactions = low(adapterTransactions);

// import router from './routes/auth.js'
const dbconnection = require('./dbconnection.js');
var async = require('async');

// set app
const app = express();

// this will allow access to .env
require('dotenv').config();
let port = process.env.SERVER_PORT || 3005;
const accessTokenSecret = process.env.JWT_SECRET;


// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow cross-origin resource sharing (CORS)
app.use(cors());

// our route files
// var indexRouter = require('./routes/index');
const accountsRouter = require('./routes/accountsRouter.js');
const auth = require('./routes/auth.js');

// needed databases
var Accounts = require('./models/accounts.js');

// routes
app.use('/accounts', accountsRouter);
app.use('/auth', auth);

app.get('/express_backend', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  });

// in production all static should run from react build 
// app.use(express.static('../bank_client/build'));
// app.use('../bank_client/static/css', express.static('css'));
// app.use('../bank_client/static/js', express.static('js'));

// in development serve static files from project
// app.use(express.static('../bank_client/public'));
// app.use('./bank_client/src', express.static('src'));
// app.use('./bank_client/src/components', express.static('components'));
// app.use('./bank_client/src/images', express.static('images'));
// app.use('./bank_client/src/functions', express.static('functions'));

// initialize databases
Accounts.initializeAccounts();
// initializeAccounts();

// start server
// -----------------------
app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});  