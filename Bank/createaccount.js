function CreateAccount(){
//   const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [statement, setStatement] = React.useState([]);

  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        
        // delay for simple purpose of waiting a little, simulate heavier processing
        setTimeout(() => setStatus(''),3000);
        return false;
      }
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
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    // setShow(true);
    ctx.loggedIn = false;
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      
      // check this empty structure with ternary
      // body={show ? (<></>):(<></>)}
      
      body={ctx.loggedIn ? (  
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            ):(
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
              </>
            )}
    />
  )
}