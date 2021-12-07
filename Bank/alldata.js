function AllData(){
  
  // a variable to control if I want to show as Card or simply stringified
  var showCard = true;
  
  const ctx = React.useContext(UserContext);

  const FormattedCurrentUser = () => {
    return (
      (ctx.currentUser ? (
      <div className="currentUserAndAccountStatement">
        <div>{`Name: ${ctx.currentUser.name}`}</div>
        <div>{`Email: ${ctx.currentUser.email}`}</div>
        <div>{`Password: ${ctx.currentUser.password}`}</div>
        <div>{`Balance $: ${ctx.currentUser.balance}`}</div>
        <div className="statementEntries">
          <AccountStatement aUser={ctx.currentUser}/>
        </div>
      </div>
      ):(
        <div className="noCurrentUser">
          No user currently logged in
        </div>
      ))
    )
  }

  const FormattedAllUsers = () => {
    if (!ctx.users) return (<div className="noUsers">No users stored</div>);

    if (ctx.users.length === 0) return (<div className="noUsers">No users stored</div>);

    ctx.users.map( (item, index) => {
      return (
        <div key={index} className="aUserAndAccountStatement">
          <div>{`Name: ${item.name}`}</div>
          <div>{`Email: ${item.email}`}</div>
          <div>{`Password: ${item.password}`}</div>
          <div>{`Balance $: ${item.balance}`}</div>
          <div className="statementEntries">
            <AccountStatement aUser={item}/>
          </div>
        </div>
      )
      });
  }

    
  return (
      showCard?(
      <Card
        bgcolor="dark"
        header="All Data"
        // status={status}
        
        body={
              <div className="alldata">
              <div className="alldata-title">All Data stored</div>
              <div className="alldata-currentUser">Current User Data:</div>
              <div className="alldata-currentUser-data">{FormattedCurrentUser()}</div>
              <div className="alldata-allUsers">All Users:</div>
              {/* <div className="alldata-allUsers-data">{JSON.stringify(ctx.users)}</div> */}
              <div className="alldata-allUsers-data">{FormattedAllUsers()}</div>
              </div>
            }
      />
      ):(
      <>
      <h5>All Data in Store</h5>
      {JSON.stringify(ctx)}<br/>
      </>
      )
  );
}
