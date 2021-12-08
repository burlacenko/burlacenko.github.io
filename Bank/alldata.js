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
              <div className="alldata-currentUser-data">{ (ctx.currentUser) ? showUserData(ctx.currentUser) : 'No user currently logged in'}</div>
              <div className="alldata-allUsers">All Users:</div>
              <div className="alldata-allUsers-data">{ (ctx.users.length > 0) ? listAll : 'No users stored'}</div>
              {/* <ListAll /> */}
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
