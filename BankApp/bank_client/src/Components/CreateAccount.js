import React from 'react';
// import { Card } from 'bootstrap-react';
// import { UserContext } from 'react-router-dom';
import Card from './Card.js';
import { UserContext } from '../context.js';
import './CreateAccount.css';

function CreateAccount(){
  const [showButtonAdd, setShowButtonAdd] = React.useState(false);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [statement, setStatement] = React.useState([]);

  const ctx = React.useContext(UserContext);  

  React.useEffect( () => {
    if (ctx.currentUser) {
      console.log('Create account logged in with', ctx.currentUser);
    } else {
      console.log('Create account Not logged in:', ctx.currentUser);
    }
  });
  // , [status, showButtonAdd]
  // );  

  function currentUserLogoff  () {
    ctx.loggedIn = false;
    ctx.currentUser.name = '';
    ctx.currentUser.email = '';
    ctx.currentUser.password = '';
    ctx.currentUser.balance = 0;
    ctx.currentUser.statement = [];
  }

  function currentUserNull () {
    ctx.loggedIn = false;
    ctx.currentUser = null;
  }  

  // part of validation code from https://github.com/arnaudNYC/react-form-validation
  const emailValidateFormat = email => {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return null;
    }
    if (email.trim() === '') {
      return 'Invalid email format'; //'Email is required';
    }
    return 'Please enter a valid email format similar to "my@domain.com" or "my@domai.com.uk"'; // 'Username should be an email';
  };

  const passwordValidateFormat = password => {
    if (password.trim() === '') {
      return 'Field required'; //'Email is required';
    }

    // if (getCharacterLength(password)>=6) {
    if (password.length >=6 ) {
        return null;
    } else {
      return 'Please enter password with at least 6 alphacharacters';
    }
    
  };

  const validateFields = {
    email: emailValidation,
    password: passwordValidation
  };

  function validate(field, label){
      let message = '';

      if (!field) {
        message = `Cannot enter a blank ${label.toUpperCase()}`;
        setStatus(`Error: ${message}`);
        alert(message);
        return false;
      }

      if ( (label === 'name') && (field.length < 2) ) {
        message = `${label.toUpperCase()} needs to be more than one character`;
        setStatus(`Error: ${message}`);
        alert(message);
        return false;
      }

      if ( (label === 'password') && (field.length < 8) ) {
        message = `${label.toUpperCase()} needs at least 8 (eight) characters`;
        setStatus(`Error: ${message}`);
        alert(message);
        return false;
      }
      
      setStatus('');
      setShowButtonAdd(true);
      return true;
  }

  function nameValidation(e) {
    // a place for specific format and advanced requirements
    console.log(e.key);
    
    // maybe jump to next field?
    if (e.key === 'Enter' || e.keyCode === 13) {
      
    }

    return true;
  }

  function emailValidation(e) {
    // a place for specific format and advanced requirements
    console.log(e.currentTarget.value);

    // maybe jump to next field?
    if (e.key === 'Enter' || e.keyCode === 13) {
      
    }

    // return true;
    return emailValidateFormat(e.currentTarget.value);

  }

  function passwordValidation(e) {
    // a place for specific format and advanced requirements
    console.log(e.currentTarget.value);

    // maybe jump to next field? or hit submit ?
    if (e.key === 'Enter' || e.keyCode === 13) {
      
    }

    return true;
  }

  function handleAllValidations() {
    if (!validate(name,     'name'))     return false;
    if (!validate(email,    'email'))    return false;
    if (!validate(password, 'password')) return false;
    return true;
  }

  function handleCreate(){
    console.log('handleCreate for ',name, email, password);

    // if (!validate(name,     'name'))     return;
    // if (!validate(email,    'email'))    return;
    // if (!validate(password, 'password')) return;
    
    if (!handleAllValidations()) return;

    setBalance(0);
    setStatement([]);

    console.log('Created account for ', name, email, balance, statement);

    // for now, there is no database to be queried
    // so we simply push a new user to the base o users
    ctx.users.push({name, email, password, balance, statement});
    
    // if "auto login" is on, we should do:
    // ctx.currentUser.push({name, email, password, balance, statement});
	
	// thanks to ES6 destructuring:
    ctx.currentUser = {name, email, password, balance, statement};    
    ctx.loggedIn = true;
    // setShow(false);
    setShowButtonAdd(true);
    // alert('User created sucessfully!')
    alert('Sucessfully Created Account')
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setBalance(0);
    setStatement([]);

    setShowButtonAdd(false);
    
    currentUserNull();

    console.log(ctx);
  }

  function CardStatus() {
    return(
      <div className="erroCreateAccount">
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
      bgcolor="primary"
      header="Create Account"
      // status={status}
      
      // check this empty structure with ternary
      // body={show ? (<></>):(<></>)}
      
      body={ctx.loggedIn ? ( 
      //body={showButtonAdd ? (  
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add Another Account</button>
              </>
            ):(
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} onKeyUp={e => nameValidation(e)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} onKeyUp={e => emailValidation(e)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} onKeyUp={e => passwordValidation(e)}/><br/>
              <button type="submit"
                className="btn btn-light" 
                onClick={handleCreate}
                disabled={((name.length===0)||(email.length===0)||(password.length===0))}
                >Create Account</button>
              <CardStatus />
              </>
            )}
    />
  )
}

// disabled={((name.length===0)||(email.length===0)||(password.length===0))}
// disabled={!(showButton)}


// button was invisible while any field empty
// { ((name.length>0)&&(email.length>0)&&(password.length>0)) ? (
//   <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
//   ):(<></>)
//   }

export default CreateAccount;