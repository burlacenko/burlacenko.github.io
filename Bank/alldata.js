function AllData(){
  
  // a variable to control if I want to show as Card or simply stringified
  var showCard = true;
  
  const ctx = React.useContext(UserContext);

  const FormattedCurrentUser = () => {
    return (
      (ctx.currentUser ? (
      <div>
        {/* {JSON.stringify(ctx.currentUser)} */}
        <div>{`Name: ${ctx.currentUser.name}`}</div>
        <div>{`Email: ${ctx.currentUser.email}`}</div>
        <div>{`Password: ${ctx.currentUser.password}`}</div>
        <div>{`Balance $: ${ctx.currentUser.balance}`}</div>
        <div className="statementEntries">
          {/* <ul key="statementEntries"><MountStatement statement={ctx.currentUser.statement}/></ul> */}
          <AccountStatement aUser={ctx.currentUser}/>
        </div>
      </div>
      ):(
        <div>
          No user currently logged in
        </div>
      ))
    )
  }
    
  return (
      showCard?(
      <Card
        bgcolor="dark"
        header="All Data"
        // status={status}
        
        body={
              <div className="alldata">
              <div className="alldata-title">All Data in Store</div>
              <div className="alldata-currentUser">Current User Data:</div>
              <div className="alldata-currentUser-data">{FormattedCurrentUser()}</div>
              <div className="alldata-allUsers">All Users:</div>
              <div className="alldata-allUsers-data">{JSON.stringify(ctx.users)}</div>
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
