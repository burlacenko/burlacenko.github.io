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