// this is a common content for
// deposits and withdrawals
function ATM ( {isDeposit} ){
    const operation = ["Deposit", "WithDrawal"];
    // const [loggedIn, setLoggedIn]  = React.useState(false);
    const [operationInProgress, setOperationInProgress] = React.useState(true);
    const [operationAmount, setOperationAmount] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    
    const ctx = React.useContext(UserContext);  
  
    React.useEffect( () => {
      if (ctx.currentUser) {
        console.log('Operation of ', operation[Number(!isDeposit)], ' logged in with', ctx.currentUser);
      } else {
        console.log('Operation of ', operation[Number(!isDeposit)], ' NOT logged in:', ctx.currentUser);
      }
    }, [balance, operationAmount]
    );
  
    const handleChange = event => {
      console.log(`handleChange ${event.target.value}`);
      let valueContent = event.target.value;
  
      // user may be trying to input a negative number, which is invalid
      // but the portfolio requirement gives an extra point for alert blocking negative numbers!
      if (event.target.value==="-") {
        setOperationAmount('-');
        return;
      }
      
      // in JavaScript, the best way to check for NaN is by checking for 
      // self-equality using either of the built-in equality operators, == or ===.
      // Because NaN is not equal to itself, NaN != NaN will always return true.
      let newAmount = Number(event.target.value);
      if (newAmount != newAmount) {
        // we set back to the previous amount:
        event.target.value = operationAmount;
        alert(`NOT A NUMBER Alert! Please ENTER a VALID NUMBER for the amount you wish to ${operation[Number(!isDeposit)]}!`);
      } else {
        setOperationAmount(newAmount);
      }
  
    };
  
    function handleOperationAmount(){
      let newStatementEntry = {};
      let newTotal = 0;
      setOperationInProgress(true);
  
      console.log(operation[Number(!isDeposit)] + 'ing for', ctx.currentUser.name, ctx.currentUser.email);
      console.log(`handleOperationAmount ${operationAmount}`);
  
      if (operationAmount < 0) {
        alert("Please, enter a positive value");
        setOperationInProgress(false);
        return
      }
  
      if (operationAmount === 0) {
        setOperationInProgress(false);
        alert('Set an amount higher than ZERO !');
        return
      }
      
      if ( (!isDeposit) && (operationAmount > ctx.currentUser.balance) ) {
        setOperationInProgress(false);
        alert('Cannot withdraw more money than you have in your account. Please check if a loan is available for you!');
        setOperationAmount('');
        return
      } else {
        
        // https://stackoverflow.com/questions/61604836/useeffect-and-the-context-api
        // ATTENTION: "spread" works, but at first I was limitin scope of variable to block-scope!! Solution was to give variable a function scope!
        // this works, but "updatedStatement" needs at least a function-scope:
        //updatedStatement = [...ctx.currentUser.statement, {entry: ctx.currentUser.statement.length + 1, kind: 'C', value: operationAmount} ];
        if (isDeposit) {
            newStatementEntry = {entry: ctx.currentUser.statement.length + 1, kind: 'C', value: operationAmount};
            newTotal = ctx.currentUser.balance + operationAmount;
        } else {
            newStatementEntry = {entry: ctx.currentUser.statement.length + 1, kind: 'D', value: operationAmount};
            newTotal = ctx.currentUser.balance - operationAmount;
        }
      }    
  
      // ctx.users.push({name:'to be retrieved',email,password,balance: newTotal});
      // ctx.currentUser.statement = updatedStatement;
      
      // "push" approach also works (maybe is will be fast in future):
      ctx.currentUser.statement.push(newStatementEntry);
      
      ctx.currentUser.balance = newTotal;
      setBalance(newTotal);
  
      setOperationInProgress(false);
  
      alert(`Your ${operation[Number(!isDeposit)].toLowerCase()} of $ ${operationAmount} was SUCCESSFULLY received!`);
  
      // finally we reset the field
      setOperationAmount('');
    }
    
    const handleKey = event => {
      if (event.key === 'Enter' || event.keyCode === 13) {
        handleOperationAmount();
      }    
    }
  
    return (
      <Card
        bgcolor={isDeposit ? "success" : "danger"}
        header={operation[Number(!isDeposit)]}
        // status={status}
        
        body={ctx.currentUser ?  
                (<div className="operation-logged">
                Balance ${ctx.currentUser.balance}<br/>
                <br/>
                {operation[Number(!isDeposit)]} Amount<br/>
                <input type="input" className="form-control" id="operationAmount" placeholder="Enter Amount" value={operationAmount} onKeyUp={handleKey} onChange={handleChange}/><br/>
                <button
                 type="submit"
                 className="btn btn-light"
                 onClick={handleOperationAmount}
                 disabled={( (operationAmount.length===0)||(operationAmount==='-') )}
                 >{operation[Number(!isDeposit)]}</button>
                </div>)
                :
                (
                <div className="operation-unlogged">
                Please log in
                </div>  
                )
              }
      />
    ) 
  }
  