function Deposit(){

  // const [loggedIn, setLoggedIn]  = React.useState(false);
  const [depositInProgress, setDepositInProgress] = React.useState(true);
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [depositAmount, setDepositAmount] = React.useState(Number(0));
  const ctx = React.useContext(UserContext);  

  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    let newAmount = Number(event.target.value);
    setDepositAmount(newAmount);
  };

  function handleDepositAmount(){
    //let updatedStatement = [];
    let newStatementEntry = {};
    setDepositInProgress(true);

    console.log('Depositing for', name, email);
    console.log(`handleDepositAmount ${depositAmount}`);

    if (depositAmount < 0) {
      alert("Please, enter a positive value");
      setDepositInProgress(false);
      return
    }

    if (depositAmount === 0) {
      setDepositInProgress(false);
      alert('Set an amount higher than ZERO !');
      return
    } else {
      
      // https://stackoverflow.com/questions/61604836/useeffect-and-the-context-api
      // ATTENTION: "spread" works, but at first I was limitin scope of variable to block-scope!! Solution was to give variable a function scope!
      // this works, but "updatedStatement" needs at least a function-scope:
      //updatedStatement = [...ctx.currentUser.statement, {entry: ctx.currentUser.statement.length + 1, kind: 'C', value: depositAmount} ];
      
      newStatementEntry = {entry: ctx.currentUser.statement.length + 1, kind: 'C', value: depositAmount};
    }    

    // now with buttons for each operation
    let newTotal = ctx.currentUser.balance + depositAmount;

    // ctx.users.push({name:'to be retrieved',email,password,balance: newTotal});
    //ctx.currentUser.statement = updatedStatement;
    
    // "push" approach also works (maybe is will be fast in future):
    ctx.currentUser.statement.push(newStatementEntry);
    
    
    ctx.currentUser.balance = newTotal;

    setDepositInProgress(false);
  }    

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      // status={status}
      
      body={ctx.currentUser ?  
              (<div className="deposit-logged">
              Balance $100<br/>
              Deposit Amount<br/>
              <input type="input" className="form-control" id="depositAmount" placeholder="Deposit Amount" value={depositAmount} onChange={handleChange}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleDepositAmount}>Deposit</button>
              </div>)
              :
              (
              <div className="deposit-unlogged">
              Please log in
              </div>  
              )
            }
    />
  ) 
}
