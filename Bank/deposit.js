function Deposit(){

  // const [loggedIn, setLoggedIn]  = React.useState(false);
  const [depositInProgress, setDepositInProgress] = React.useState(true);
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [depositAmount, setDepositAmount] = React.useState(0);
  const ctx = React.useContext(UserContext);  

  function handleDepositAmount(){
    setDepositInProgress(true);

    //novo comentário direto pelo edge

    console.log('Depositing for', name, email);
    console.log(`handleDepositAmount ${depositAmount}`);

    if (depositAmount < 0) {
      alert("Please, enter a positive value");
      setDepositInProgress(false);
      return
    }

    if (depositAmount === 0) {
      // do nothing
      setDepositInProgress(false);
      alert('Set an amount higher than ZERO !');
      return
    } else {
      let updatedStatement = [... statement, {entry: statement.length + 1, kind: 'C', value: depositAmount} ]
    }    

    // now with buttons for each operation
    let newTotal = accountBalance + depositAmount;

    ctx.users.push({name:'to be retrieved',email,password,balance: newTotal});

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
              <input type="input" className="form-control" id="depositAmount" placeholder="Deposit Amount" value={depositAmount} onChange={e => setDepositAmount(e.currentTarget.value)}/><br/>
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
