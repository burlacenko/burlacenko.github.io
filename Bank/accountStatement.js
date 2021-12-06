// const AccountStatement = ({ updatedEntries }) => {
//   console.log('AccountStatement rendered for ' + updatedEntries.length + ' entries');


const AccountStatement = () => {
    console.log(`AccountStatement rendered for 0 entries`);
    // <ul key="statementEntries" style={ { listStyleType: "none" } }>{updatedEntries}</ul>
    return (
      <div className="accountStatement">
        <div className="accountStatement--title">Account Statement</div>
        <div className="statementEntries">
          {/* <ul key="statementEntries">{updatedEntries}</ul> */}
        </div>
      </div>
    );
  };