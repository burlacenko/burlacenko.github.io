function NavBar(){
  const ctx = React.useContext(UserContext);  

  React.useEffect (
    () => {
      if (!ctx.loggedIn) {
        console.log('NavBar is NOT logged in');
      } else {
        console.log('NavBar is logged in with', ctx.currentUser);
      }
    }
    
  );

  function Greeting(props) {
    if (props.isLoggedIn) {
      return <span class="material-icons">account_circle</span>;
    }
    return <></>;
  }
  

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>    
          <Greeting isLoggedIn={ctx.loggedIn}/>
        </ul>
      </div>
    </nav>
    </>
  );
}