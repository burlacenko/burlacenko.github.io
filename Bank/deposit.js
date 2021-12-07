function Deposit(){

  // const [loggedIn, setLoggedIn]  = React.useState(false);
  const [depositInProgress, setDepositInProgress] = React.useState(true);
  const [depositAmount, setDepositAmount] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  
  const ctx = React.useContext(UserContext);  

  React.useEffect( () => {
    if (ctx.currentUser) {
      console.log('Deposit logged in with', ctx.currentUser);
    } else {
      console.log('Deposit Not logged in:', ctx.currentUser);
    }
  }, [balance, depositAmount]
  );

  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    let valueContent = event.target.value;

    // user may be trying to input a negative number, which is invalid
    // but the portfolio requirement gives an extra point for alert blocking negative numbers!
    if (event.target.value==="-") {
      setDepositAmount('-');
      return;
    }
    
    // In JavaScript, the best way to check for NaN is by checking for 
    // self-equality using either of the built-in equality operators, == or ===.
    // Because NaN is not equal to itself, NaN != NaN will always return true.
    let newAmount = Number(event.target.value);
    if (newAmount != newAmount) {
      // we set back to the previous amount:
      event.target.value = depositAmount;
      alert('Please enter a valid number for the amount you wish to deposit!');
    } else {
      setDepositAmount(newAmount);
    }

  };

  function handleDepositAmount(){
    //let updatedStatement = [];
    let newStatementEntry = {};
    setDepositInProgress(true);

    console.log('Depositing for', ctx.currentUser.name, ctx.currentUser.email);
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
    setBalance(newTotal);

    setDepositInProgress(false);

    alert(`Your deposit of $ ${depositAmount} was SUCCESSFULLY received!`);

    // finally we reset the field
    setDepositAmount('');
  }
  
  const handleKey = event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleDepositAmount();
    }    
  }

  return (
    <Card
      bgcolor="success"
      header="Deposit"
      // status={status}
      
      body={ctx.currentUser ?  
              (<div className="deposit-logged">
              Balance ${ctx.currentUser.balance}<br/>
              <br/>
              Deposit Amount<br/>
              {/* <input type="input" className="form-control" id="depositAmount" placeholder="Deposit Amount" value={depositAmount} onChange={handleChange}/><br/> */}
              <input type="input" className="form-control" id="depositAmount" placeholder="Enter Amount" value={depositAmount} onKeyUp={handleKey} onChange={handleChange}/><br/>
              <button
               type="submit"
               className="btn btn-light"
               onClick={handleDepositAmount}
               disabled={( (depositAmount.length===0)||(depositAmount==='-') )}
               >Deposit</button>
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
