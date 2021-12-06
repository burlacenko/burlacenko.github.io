function CreateAccount(){
  const [showButton, setShowButton] = React.useState(false);
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
  }, [status]
  );  

  function validate(field, label){
      let message = '';

      if (!field) {
        message = `Cannot enter a blank ${label.toUpperCase()}`;
        setStatus(`Error: ${message}`);
        alert(message);
        return false;
      }

      if ( (label === 'name') && (field.length < 2) ) {
        message = `${label.toUpperCase()} needs to be more than one caracter`;
        setStatus(`Error: ${message}`);
        alert(message);
        return false;
      }

      if ( (label === 'password') && (field.length < 8) ) {
        message = `${label.toUpperCase()} needs at least 8 (eight) caracters`;
        setStatus(`Error: ${message}`);
        alert(message);
        return false;
      }
      
      setStatus('');
      setShowButton(true);
      return true;
  }

  function handleCreate(){
    console.log('handleCreate for ',name, email, password);

    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    
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
    alert('User created sucessfully!')
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    // setShow(true);
    ctx.loggedIn = false;
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
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add Another Account</button>
              </>
            ):(
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
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

// button was invisible while any field empty
// { ((name.length>0)&&(email.length>0)&&(password.length>0)) ? (
//   <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
//   ):(<></>)
//   }
