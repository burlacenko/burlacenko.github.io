/* eslint-disable no-unused-expressions */
import React from 'react';
// import { Card } from 'bootstrap-react';
import { useHistory } from 'react-router-dom';
import Card from './Card.js';
import { UserContext, baseURL, log } from '../context.js';
import { containsEmailMatchingPassword } from '../globalfunctions.js';
import './Login.css';
import superagent from 'superagent';
// import bodyParser from 'body-parser';

function Login(){

  const [loggedIn, setLoggedIn]  = React.useState(false);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [statement, setStatement] = React.useState([]);

  // https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router
  // https://www.kindacode.com/article/programmatically-navigate-using-react-router/
  const history = useHistory();

  const ctx = React.useContext(UserContext);  
  
  React.useEffect( () => {
    if (ctx.currentUser) {
      log('Logged in with', ctx.currentUser)();
      ctx.loggedIn = true;
      setLoggedIn(true);
      // log('Try to redirect at useEffect')();
      // history.push("/statement")
    } else {
      log('Not logged in:', ctx.currentUser)();
      ctx.loggedIn = false;
    }
    
  }, [ctx, loggedIn]);
  //, [loggedIn]
  //);

  function validate(field, label){
      // if (!field) {
      //   setStatus('Error: ' + label + ' invalid');
      let message = '';

      if (!field) {
          message = `Cannot enter a blank ${label.toUpperCase()}`;
          setStatus(`Error: ${message}`);
          alert(message);
          return false;
      };

      setStatus('');
      return true;
  };

  function getName(email, password) {
    // name should be retrieved from database
    // but for now we "form" from first word at email

    // until 21/02/2022 we only called this
    // return containsEmailMatchingPassword(ctx.users, email, password);

    // from 22/02/2022 we check up user at database
    var url = `${baseURL}/accounts/login/`;
    log(url)();
    // var body = `{"email":"${email}"}`;
    // const info = req.query.info;
    // const userid = req.query.id;
    // const key = 'fde7f8d0b3c9471cbf787ea0fb0ca043';
    log(`Sent login for:`)();
    log({email: email})();
    
    // https://www.npmjs.com/package/superagent
    superagent.post(url)
      .send({email: email, password: password, externalIP: ctx.externalIP}) //, userid, key})
      .end((err, res) => {
        // the answer is processed here
        if (err) {
          //global.logger.error(err);
          log(err);
          let error = 'Connection error.';
          alert(`Invalid login: ${error}\n${err}`);
          setStatus(error);
          return
        } else {
          log(res)();
          log(res.text)();

          // ATTENTION: when select uses "findOne" we receive a single document
          // ATTENTION: when select uses "find" we receive and array with the answers
          // const account = res.body.account[0];
          const account = res.body.account;
          // do some async action with result:
          log(`Received account:`)();
          log(account)();
          // test if account is the same meaning user already exists:
          if (!account) {
            let error = 'Please enter a valid user identified by email and password or create a new account.';
            alert(`Invalid login: failed validation of email + password.\n${error}`);
            setStatus(error);
            return
          } else {
            // A SERIES OF TESTS AND MESSAGES:
            
            if ((account.status === 'closed')||(account.status === 'blocked')) {
              let error = `Account is ${account.status}`;
              alert(`Create Account failed: please contact our support for help!\n${error}`);
              setStatus(error);
              return
            }

            // a consistency test
            if (account.email !== email) {
              let error = `Please try again later.`;
              alert(`Create Account failed: communication error!\n${error}`);
              setStatus(error);
              return
            }

            // success
            // email matches, so user exists!!
            setName(account.name);
            setBalance(account.balance);
            setStatement(account.statement);
            setPassword(password);
        
            // if valid existing user was retrieved and returned, then all we need is to make him/her the current user
            ctx.currentUser = account;
            ctx.currentUser.password = password;

            // update all users
            // should we still use all users ?
            // first we need to check if it is not on local memory
            let found = containsEmailMatchingPassword(ctx.users, email, password, account);
            if (!found) {
              ctx.users.push({_id: account._id,
                name: account.name,
                email: account.email,
                password: password,
                balance: account.balance,
                statement: account.statement});
            }

            setLoggedIn(true);
            ctx.loggedIn = true;
            alert(`User ${account.name} Sucessfully Logged in`);
            log('Try to redirect at getName')();
            history.push("/statement");            

          }          
        }
      }) 
  }

  function handleLogin(){
    // validate all
    // if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) {
      //alert('Invalid email format');
      return;
    }

    if (!validate(password, 'password')){
      //alert('Could not validate user');
      return;
    }

    // since 22/02/2022 getName will get user data from server:
    getName(email, password);
  };    

  function logOff(){
//     setName('');
//     setEmail('');
//     setPassword('');
    ctx.currentUser = null;
    setLoggedIn(false);
    ctx.loggedIn = false;

    setName('');
    setEmail('');
    setPassword('');
    setBalance(0);
    setStatement([]);

    //setShowButtonLogoff(false);
    
    log(ctx)();    
  };

  function CardStatus() {
    return(
      <div className="erroLogin">
      { (!status) ? (
        <div></div>
        ):(
        <div><br/>{status}</div>)
      }
      </div>
    )
  }  

  return (
    <Card
      bgcolor="warning"
      header="Login"
      // status={status}
      
      // check this empty structure with ternary
      // body={show ? (<></>):(<></>)}
      
      body={!ctx.loggedIn ? (  
              <>
              Email<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button 
                type="submit"
                className="btn btn-light"
                onClick={handleLogin}
                disabled={ ((email.length===0)||(password.length===0)) }
                >Login
              </button>
              <CardStatus />
              </>
            ):(
              <>
              <h5>Logged in</h5>
              <button 
                type="submit" 
                className="btn btn-light" 
                onClick={logOff}
                >Log Off
              </button>
              </>
            )}
    />
  ) 
};

export default Login;
