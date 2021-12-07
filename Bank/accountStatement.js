// const AccountStatement = ({ updatedEntries }) => {
//   console.log('AccountStatement rendered for ' + updatedEntries.length + ' entries');

function AccountStatement ( {aUser} ) {
  //const ctx = React.useContext(UserContext);  

  var statement = [];

  // statement must exist even when ctx.currentUser doesn't exist
  if (aUser) {
    if (aUser.statement) {
      statement = aUser.statement
    } else {
      statement = [];  
    }
  } else {
    statement = []; 
  }

  const updatedEntries = statement.map( (item, index) => {
    // https://stackoverflow.com/questions/35762351/correct-way-to-handle-conditional-styling-in-react
    return (
      <li className={ item.kind === 'D' ? "statementEntries-entry-negative" : "statementEntries-entry-positive" } key={index} style={ { color: item.kind === 'D' ? 'red' : 'blue' } }> 
        {item.entry}: {item.value} {item.kind} 
      </li>
    );
  });

  const AllStatements = () => {
    console.log('All Statements rendered for ' + updatedEntries.length + ' entries');
    // <ul key="statementEntries" style={ { listStyleType: "none" } }>{updatedEntries}</ul>
    
//     // statement precisa existir
//     if (ctx.currentUser) {
//       statement = ctx.currentUser.statement
//     } else {
//       statement = []; 
//     }

    return (
      <div className="bankStatement">
        <div className="bankStatement--title">{`Account Statement:${statement.length===0 ? ' empty' : ''}`}</div>
        <div className="statementEntries">
          <ul key="statementEntries" >{updatedEntries}</ul>
        </div>
      </div>
    );
  };  

  console.log(`AccountStatement rendered for 0 entries`);
  
  return (
      <AllStatements />
    );
  };