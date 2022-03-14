var express = require('express');
const app = express();
var router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

var account_controller = require('../controllers/accountController.js');

router.get('/', account_controller.account_list);
  // function(req, res, next) {
  //   res.send("You're so cool");
  // });


router.post('/login/', account_controller.account_user_request_login);

router.post('/statementEntry/', account_controller.account_add_statement_entry);

router.post('/create/', account_controller.account_user_request_create_account);

module.exports = router;  