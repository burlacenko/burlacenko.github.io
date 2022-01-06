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
      return <span className="material-icons">account_circle</span>;
    }
    return <></>;
  }
  
  // <nav className="navbar navbar-expand-lg navbar-dark bg-light">

  return(
    <div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#" title="Our home page">Home
      </a>
      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link"  href="#/createAccount/" title="Create a new user">Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/" title="Enter user">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/" title="Put some cash in">Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/" title="Take some cash out">Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/statement/" title="Check out your account statement">Statement</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/" title="See all data for development purposes">All Data</a>
          </li>    
        </ul>
      </div>
    </div>
    </nav>
    </div>
  );
};

{/* <form class="form-inline my-2 my-lg-0">
<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
</form> */}


{/* <Greeting isLoggedIn={ctx.loggedIn}/> */}
