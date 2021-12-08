function Statement () {
    const ctx = React.useContext(UserContext);

    const showAccountStatement = (user) => {
      return (
        (user ? (
        <div className="accountStatement">
          <div>{`Name: ${user.name}`}</div>
          <div>{`Email: ${user.email}`}</div>
          <div>{`Balance $: ${user.balance}`}</div>
          <div className="statementEntries">
            <AccountStatement aUser={user}/>
          </div>
        </div>
        ):(
          <div className="noUser">
            No client data
          </div>
        ))
      )
    }

    return (
      <Card
        bgcolor="secondary"
        txtcolor="white"
        header="Account Statement"
        body={ctx.currentUser ?
            (
              <div className="statement">
              <div className="statement-currentUser"></div>
              <div className="statement-currentUser-data">{ (ctx.currentUser) ? showAccountStatement(ctx.currentUser) : 'No user currently logged in'}</div>
              </div>
            ):(
              <div className="operation-unlogged">
              Please log in
              </div>  
            )

          }
      />    
    );  
  }