function Login(){

  const [loggedIn, setLoggedIn]  = React.useState(false);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        
        // delay for simple purpose of waiting a little, simulate heavier processing
        // setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleLogin(){
    console.log(name,email,password);
    // if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;

    ctx.users.push({name:'to be retrieved',email,password,balance:100});

    setLoggedIn(true);
  }    

  function logOff(){
    setName('');
    setEmail('');
    setPassword('');
    setLoggedIn(false);
  }

  return (
    <Card
      bgcolor="warning"
      header="Login"
      status={status}
      
      // check this empty structure with ternary
      // body={show ? (<></>):(<></>)}
      
      body={!loggedIn ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
              </>
            ):(
              <>
              <h5>Logged in</h5>
              <button type="submit" className="btn btn-light" onClick={logOff}>Log Off</button>
              </>
            )}
    />
  ) 
}
