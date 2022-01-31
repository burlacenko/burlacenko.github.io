const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const cors = require('cors');
const adapterUsers = new fs('../db/users.json');
const dbUsers = low(adapterUsers);
const adapterTransactions = new fs('../db/transactions.json');
const dbTransactions = low(adapterTransactions);

// allow cross-origin resource sharing (CORS)
app.use(cors());

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // in production all static should run from react build 
// app.use(express.static('../bank_client/build'));
// app.use('../bank_client/static/css', express.static('css'));
// app.use('../bank_client/static/js', express.static('js'));

// // in development serve static files from project?
// // -------------------------------------------
// app.use(express.static('../bank_client/public'));
// app.use('./bank_client/src', express.static('src'));
// app.use('./bank_client/src/components', express.static('components'));
// app.use('./bank_client/src/images', express.static('images'));
// app.use('./bank_client/src/functions', express.static('functions'));

// init the data store
dbUsers.defaults({ users: [] }).write();
dbTransactions.defaults({ transactions: [] }).write();

let port = process.env.PORT || 3005;

function nextEntry(accountNumber) {

    return -1;
}

function getAccountNumber() {

    return -1;
}

// return all users
app.get('/users', function (req, res) {
    res.send(db.get('users').value());
});

// return one user info
app.get('/user/:accountNumber/', function (req, res) {
    let accountNumber = Number(req.params.accountNumber);
    let listSelected = db.get("users").find({accountNumber: accountNumber}).value();

    // for development only:
    console.log("Filtered for " + accountNumber);
    console.log(listSelected);    
    console.log(`Found ${listSelected.length} account number ${req.params.accountNumber} for ${listSelected.name}`);

    // respond to client (in this case, to be seen in browser!)
    res.send(listSelected);
});

// add accounts
app.post('/addUser', function (req, res) {
    // create accountNumber
    var accountNumber = getAccountNumber(req.body.email);

    if (typeof accountNumber === 'undefined'){
        // account cannot be created
        res.send('Error: account cannot be created')
    } else {
        if (accountNumber === -1) {
            // account cannot be created: already exists
            res.send('Error: account cannot be created - already exists')
        } else {
            var user = {
                'accountNumber': accountNumber,
                'name': req.body.name,
                'email': req.body.email,
                'password': req.body.password
            }
            db.get('users').push(user).write();
            console.log(db.get('users').value());
            res.send(db.get('users').value());
        }
    }   
});

// add transactions
app.post('/addTransaction', function (req, res) {

    // define next entry
    var entry = nextEntry(req.body.accountNumber);

    var transaction = {
        'accountNumber': req.body.accountNumber,
        // in the future we will also need a DATETIME
        'entry': entry,
        'value': req.body.value,
        'kind': req.body.kind
    }

    db.get('transactions').push(transaction).write();
    console.log(db.get('transactions').value());
    res.send(db.get('transactions').value());
});


// start server
// -----------------------
app.listen(port, function () {
    console.log(`Running on port ${port}`);
});
