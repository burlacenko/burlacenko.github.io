// this is a set of instructions adapted from books.js
// to be a middleware authenticated way to access the database

// const express = require('express');
// const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
// const app = express();

const accessTokenSecret = 'somerandomaccesstoken';

// app.use(bodyParser.json());
// app.use(bodyParser.json());

const authenticateJWT = require('../middleware/authenticateJwt.js');
// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     console.log(`Headers: ${JSON.stringify(req.headers)}`);
//     console.log(`Body: ${JSON.stringify(req.body)}`);
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, accessTokenSecret, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }

//             req.user = user;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// }

const books = [
    {
        "author": "Chinua Achebe",
        "country": "Nigeria",
        "language": "English",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "language": "Danish",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    },
    {
        "author": "Dante Alighieri",
        "country": "Italy",
        "language": "Italian",
        "pages": 928,
        "title": "The Divine Comedy",
        "year": 1315
    },
];

// following NextTech assignment, we added a root message:
// app.get('/', (req, res) => {
//     res.send('You need to authenticate in order to access functionality of this book server.');
// });

// app.get('/books', authenticateJWT, (req, res) => {
transactions.get('/transactions', authenticateJWT, (req, res) => {
    res.json(books);
});

// app.post('/books', authenticateJWT, (req, res) => {
transactions.post('/transactions', authenticateJWT, (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const book = req.body;
    books.push(book);

    res.send('transaction added successfully');
});

// following NextTech assignment, we added a remove functionality:
app.post('/books/remove', authenticateJWT, (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    const { title } = req.body; // should look like { "title": "Things Fall Apart" }
    
    const bookIndex = books.findIndex( (book) => (book.title === title) );

    var message = '';

    if (bookIndex > -1) {
      books.splice(bookIndex, 1);
      message = `books with name: ${title} removed successfully`;
    } else {
      message = `books with name: ${title} NOT found!`;
    }
    
    res.send(message);
});

app.listen(4000, () => {
    console.log('Books service started on port 4000');
});