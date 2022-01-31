import React from 'react';
// import { Card } from 'bootstrap-react';
// import { UserContext } from 'react-router-dom';
import Card from './Card.js';
import { UserContext } from '../context.js';
import { containsEmailMatchingPassword } from '../globalfunctions.js';
import './Login.css';

function Login(){

  const [loggedIn, setLoggedIn]  = React.useState(false);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [statement, setStatement] = React.useState([]);

  const ctx = React.useContext(UserContext);  
  
  React.useEffect( () => {
    if (ctx.currentUser) {
      console.log('Logged in with', ctx.currentUser);
      ctx.loggedIn = true;
    } else {
      console.log('Not logged in:', ctx.currentUser);
      ctx.loggedIn = false;
    }
  });
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
    
    // old simple "automatic valid"
    // if (email.includes('@')) {
    //   return email.substring(0, email.indexOf('@'));
    // } else {
    //   return '';
    // }

    return containsEmailMatchingPassword(ctx.users, email, password);
  }

  // currently unnecessary
  // function getBalance(email) {
  //   return 0
  // }

  // currently unnecessary
  // function getStatement(email) {
  //   return []
  // }

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

    // name, balance and statement will need a database search in the future
    let existingUser = getName(email, password);
    // login fail due to user unknown  
    if (!existingUser) {
      let error = 'Please enter a valid user identified by email and password or create a new account.';
      alert(`Invalid login: failed validation of email + password.\n${error}`);
      setStatus(error);
      return
    } else {
      if (!existingUser.name) {
        let error = 'Please enter a valid user identified by email and password or create a new account.';
        alert(`Invalid login: failed validation.\n${error}`);
        setStatus(error);
        return
      }
    }
   
    // we'll need a better control to 
    // check if user already exists and load previously saved data
    setName(existingUser.name);
    // setBalance(getBalance(email));
    // setStatement(getStatement(email));
    setBalance(existingUser.balance);
    setStatement(existingUser.statement);

    // old simplification:
    // ctx.currentUser = {name: newName, email, password, balance, statement};
    // in the old way the simplified login would create a new user, but NOT MORE!
    // ctx.users.push({name: newName, email, password, balance, statement});
    
    // is valid existing user was retrieved and returned, then all we need is to make him/her the current user
    ctx.currentUser = existingUser;

    setLoggedIn(true);
    ctx.loggedIn = true;

    alert('Sucessfully Logged in');
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
    

    console.log(ctx);    
  };

  // currently unnecessary
  // function getEmail() {
  //   if (ctx.currentUser) {
  //     return ctx.currentUser.email
  //   } else return '';
  // };

  // currently unnecessary
  // function getPassword() {
  //   if (ctx.currentUser) {
  //     return ctx.currentUser.password
  //   } else return '';
  // };

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
