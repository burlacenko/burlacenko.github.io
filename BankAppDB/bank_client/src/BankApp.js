import ReactDOM from 'react-dom';
import NavBar from './components/NavBar.js';
import Home from './components/Home.js';
// import CreateAccount from './components/CreateAccount.js';
import CreateAccountFormik from './components/CreateAccountFormik.js';
import Login from './components/Login.js';
import Deposit from './components/Deposit.js';
import Withdraw from './components/Withdraw.js';
import Statement from './components/Statement.js';
import AllData from './components/AllData.js';

// import { Route, Link, HashRouter } from 'react-router-dom';
// import { UserContext, Route, Link, HashRouter } from './context.js';
import { UserContext } from './context.js';
import { Route, HashRouter } from 'react-router-dom';
//Routes, 

// import './BankApp.css';

// https://stackoverflow.com/questions/69832748/error-error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element
// Routes and Route: https://reacttraining.com/blog/react-router-v6-pre/#introducing-routes
 
function BankApp() {
    return (
      <HashRouter>
        <UserContext.Provider value={{users:[], currentUser:null, loggedIn: false}}>
        <NavBar/>
          <div className="container" style={{padding: "20px"}}>
          {/* <Routes> */}
            <Route path="/" exact component={Home} />
            {/* <Route path="/createAccountOld" component={CreateAccount} /> */}
            <Route path="/createAccount" component={CreateAccountFormik} />
            <Route path="/login" component={Login} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/statement" component={Statement} />
            <Route path="/alldata" component={AllData} />
            {/* </Routes> */}
          </div>
        </UserContext.Provider>      
      </HashRouter>
    );
  }
  
  ReactDOM.render(
    <BankApp/>,
    document.getElementById('root')
  );

export default BankApp;