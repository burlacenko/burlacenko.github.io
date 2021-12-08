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
      if (!field) {
        setStatus('Error: ' + label);
        
        // delay for simple purpose of waiting a little, simulate heavier processing
        // setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function getName(email) {
    // name should be retrieved from database
    // but for now we "form" from first word at email
    //debugger;
    if (email.includes('@')) {
      return email.substring(0, email.indexOf('@'));
    } else {
      return '';
    }
  }

  function getBalance(email) {
    return 0
  }

  function getStatement(email) {
    return []
  }

  function handleLogin(){

    // validate all
    // if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) {
      alert('Invalid email format');
      return;
    }

    if (!validate(password, 'password')){
      alert('Could not validate user');
      return;
    }

    // name, balance and statement will need a database search in the future
    let newName = getName(email);
    // login fail due to user unknown  
    if (!newName) {
      alert('Invalid login. Please enter a valid user and password or create a new user');
      return
    }
   
    // we'll need a better control to 
    // check if user already exists and load previously saved data
    setName(newName);
    setBalance(getBalance(email));
    setStatement(getStatement(email));

    ctx.users.push({name: newName, email, password, balance, statement});
    ctx.currentUser = {name: newName, email, password, balance, statement};

    setLoggedIn(true);
    ctx.loggedIn = true;
  }    

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
  }

  function getEmail() {
    if (ctx.currentUser) {
      return ctx.currentUser.email
    } else return '';
  }

  function getPassword() {
    if (ctx.currentUser) {
      return ctx.currentUser.password
    } else return '';
  }

  return (
    <Card
      bgcolor="warning"
      header="Login"
      status={status}
      
      // check this empty structure with ternary
      // body={show ? (<></>):(<></>)}
      
      body={!ctx.loggedIn ? (  
              <>
              Email<br/>
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
