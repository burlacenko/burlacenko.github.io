function AllData(){
  
  // a variable to control if I want to show as Card or simply stringified
  var showCard = true;
  
  const ctx = React.useContext(UserContext);

  const showUserData = (user) => {
    return (
      (user ? (
      <div className="userAndAccountStatement">
        <div>{`Name: ${user.name}`}</div>
        <div>{`Email: ${user.email}`}</div>
        <div>{`Password: ${user.password}`}</div>
        <div>{`Balance $: ${user.balance}`}</div>
        <div className="statementEntries">
          <AccountStatement aUser={user}/>
        </div>
      </div>
      ):(
        <div className="noUser">
          No user data
        </div>
      ))
    )
  }

  const listAll = ctx.users.map( (item, index) => {
    return (
      showUserData(item)
    );
  });  

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
        </div>
      )
      });
  };
//            <div className="statementEntries">
//              <AccountStatement aUser={item}></div>

    
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
              <div className="alldata-currentUser-data">{showUserData(ctx.currentUser)}</div>
              <div className="alldata-allUsers">All Users:</div>
              <div className="alldata-allUsers-data">{listAll}</div>
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

// <div className="alldata-allUsers-data">{showAllUsers(ctx.users)}</div>
// <div className="alldata-allUsers-data">{showUserData(ctx.users[0])}</div>
// <div className="alldata-allUsers-data">{FormattedAllUsers()}</div>