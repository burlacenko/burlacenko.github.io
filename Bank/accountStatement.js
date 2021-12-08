function AccountStatement ( {aUser} ) {
  //const ctx = React.useContext(UserContext);  

  var statement = [];
  var name = '';

  // statement must exist even when ctx.currentUser doesn't exist
  if (aUser) {
    if (aUser.statement) {
      statement = aUser.statement;
      name = aUser.name;
    } else {
      statement = [];  
      name = '';
    }
  } else {
    statement = [];
    name = ''; 
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
    console.log('All Statements rendered for ' + statement.length + ' entries');

    return (
      <div className="bankStatement">
        <div className="bankStatement--title">{`Account Statement:${statement.length===0 ? ' empty' : ''}`}</div>
        <div className="statementEntries">
          <ul key="statementEntries" >{updatedEntries}</ul>
        </div>
      </div>
    );
  };  

  console.log(`AccountStatement rendered for ${statement.length} entries of user ${name}`);
  
  return (
      <AllStatements />
    );
  };