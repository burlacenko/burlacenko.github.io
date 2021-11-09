// this app keeps a running total of deposits and withdrawals
// built upon ATM Exercise w15
// v15.6 added deposit and cash back buttons
// based on bankStatement.jsx where I added the bankStatement component

// improvements:
// created a BankStatement component to list all entries to the account
// withdrawals are red colored and followed by "D" for Debit
// deposits are blue colored and followed by "C" for Credit
// created css file
// additional styling
// emptying the input after submit
// negative values are not Submitted and user receives an alert

// future improvements:
// prevent negative balance
// emptying the input ONLY after SUCCESSFUL submit
// intro screen
// specific screen for each operation (deposit, withdrawal, bankstatement)
// more styling

const ATMDeposit = ({ onChange, isDeposit }) => {
  const operation = ["Deposit", "WithDrawal"];


  // <input id="enterAmount" type="number" onChange={onChange} placeholder="(+) Deposit or (-) Withdrawal"></input>
  return (
    <label className="label huge">
      <h3> {operation[Number(!isDeposit)]} </h3>
      <input id="enterAmount" type="number" onChange={onChange} placeholder="Enter amount"></input>
      <input id="submit" type="submit"></input>
    </label>
  );
};

const BankStatement = ({ updatedEntries }) => {
  console.log('BankStatement rendered for ' + updatedEntries.length + ' entries');
  // <ul key="statementEntries" style={ { listStyleType: "none" } }>{updatedEntries}</ul>
  return (
    <div className="bankStatement">
      <div className="bankStatement--title">Bank Statement</div>
      <div className="statementEntries">
        <ul key="statementEntries" >{updatedEntries}</ul>
      </div>
    </div>
  );
};

const Account = () => {
  console.log('Account rendered');
  var amount = 0;
  const [accountBalance, setAccountBalance] = React.useState(0);
  const [accountStatus, setAccountStatus] = React.useState(`Account Balance $ 0`);
  const [isDeposit, setIsDeposit] = React.useState(true);

  // added a memory for all operations:
  const [history, setHistory] = React.useState([]);

  const updatedEntries = history.map( (item, index) => {
    // https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react
    return (
      <li key={index} style={ { color: item.kind === 'D' ? 'red' : 'blue' } }> 
        {item.entry}: {item.value} {item.kind} 
      </li>
    );
  });

  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    amount = Number(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`handleSubmit ${amount}`);

    if (amount < 0) {
      alert("Please, enter a positive value");
      retunr
    }

    // old way where the sign would determine the deposit (+) or withdrawal(-)
    //let newTotal = accountBalance + amount;
    
    // now with buttons for each operation
    let newTotal = isDeposit ? accountBalance + amount : accountBalance - amount;

    setAccountBalance(newTotal);
    setAccountStatus(`Account Balance $ ${newTotal}`);

    let newHistory = [];

    // added control of operations' history (for bank "statement")
    // kind may be : 'C'=Credit, 'D'=Debit, 'B'=Balance
    // note: 'B' (Balance) simply registers current balance (it does not change it)

    // old "positive/negative" logic:
    // if (amount === 0) {
    //   // do nothing
    //   newHistory = [... history];} else
    // if (amount > 0) {
    //         // deposit
    //         newHistory = [... history, {entry: history.length + 1, kind: 'C', value: amount} ];
    //         } else {
    //         // withdraw
    //           newHistory = [... history, {entry: history.length + 1, kind: 'D', value: -amount} ];
    //         }

    if (amount === 0) {
      // do nothing
      newHistory = [... history];}
    else {
      newHistory = isDeposit ? [... history, {entry: history.length + 1, kind: 'C', value: amount} ]
                  : [... history, {entry: history.length + 1, kind: 'D', value: amount} ];
    }

    setHistory( newHistory );

    // added emptying the input:
    document.getElementById("enterAmount").value = '';

    // this is essencial so that the form wont reset
    event.preventDefault();
  };

  // <h2>Account Balance $ {accountBalance}</h2>
  // <ATMDeposit onChange={handleChange} isDeposit={isDeposit}>Amount:</ATMDeposit>
  return (
    <form onSubmit={handleSubmit}>
      <h2>{accountStatus}</h2>
      <button onClick={ () => setIsDeposit(true) }>Deposit</button>
      <button onClick={ () => setIsDeposit(false) }>Withdrawal</button>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
      <BankStatement updatedEntries={updatedEntries}></BankStatement>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
