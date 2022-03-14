import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card.js';
import { UserContext, baseURL, log } from '../context.js';
import { useFormik, useFormikContext, useField, Formik, Form, Field, ErrorMessage, FormikProvider } from 'formik';
import * as Yup from 'yup'; // requires npm install yup
import { getCharacterLength, nameValidateFormat, emailValidateFormat, containsName_and_Email, containsEmailMatchingPassword } from '../globalfunctions.js';
import superagent from 'superagent';
import './CreateAccountFormik.css';

const TextInputLiveFeedback = ({ label, helpText, setterValid, ...props }) => {
  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers;
  const [didFocus, setDidFocus] = React.useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback = (!!didFocus && field.value.trim().length > 2) || meta.touched;

  if (field.value === '') {
    setterValid(false);    
  } else {
    if (typeof meta.error !== 'undefined') {
          if (meta.error) {
            setterValid(false);
          } else {
            setterValid(true);
          }
        } else {
          setterValid(true);
    }
  };

  const TestValidInput = () => {

    // const { values, submitForm } = useFormikContext();

    // React.useEffect(() => {
    //   if (typeof meta.error !== 'undefined') {
    //     if (meta.error) {
    //       setterValid(false);
    //     } else {
    //       setterValid(true);
    //     }
    //   } else {
    //     setterValid(true);
    //   }

    // }); //, [meta, values]);
    
    return null;
  };   

  return (
    <div
      className={`formik-control ${
        showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
      }`}
    >
      <div className="flex items-center space-between">
        <label htmlFor={props.id}>{label}</label>{' '}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
        // value={value}
        // onChange={onChangeEvent}
        // onChange={props.handleChange}
        
      />
      <div className="text-xs" id={`${props.id}-help`} tabIndex="-1">
        {helpText}
      </div>
      <TestValidInput />
    </div>
  );
};


function CreateAccountFormik(){

    const [showButtonAdd, setShowButtonAdd] = React.useState(false);
    const [loggedIn, setLoggedIn]  = React.useState(false);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    const [statement, setStatement] = React.useState([]);
    const [validName, setValidName] = React.useState(false);
    const [validEmail, setValidEmail] = React.useState(false);
    const [validPassword, setValidPassword] = React.useState(false);
    
    const history = useHistory();
  
    const ctx = React.useContext(UserContext);  
  
    React.useEffect( () => {
      if (ctx.currentUser) {
        log('Create account logged in with', ctx.currentUser)();
        ctx.loggedIn = true;
        setLoggedIn(true);
      } else {
        log('Create account Not logged in:', ctx.currentUser)();
        ctx.loggedIn = false;        
      }
    }, [ctx, loggedIn]);
    // , [status, showButtonAdd]
    // );

    React.useEffect(() => {
      log('Re-rendering thru valid change')()
    }, [validName, validEmail, validPassword]);
    

    function currentUserLogoff  () {
      ctx.loggedIn = false;
      ctx.currentUser.name = '';
      ctx.currentUser.email = '';
      ctx.currentUser.password = '';
      ctx.currentUser.balance = 0;
      ctx.currentUser.statement = [];
    }
  
    function currentUserNull () {
      ctx.loggedIn = false;
      ctx.currentUser = null;
    }  
  
    const passwordValidateFormat = password => {
      if (password.trim() === '') {
        return 'Field required'; //'Email is required';
      }
  
      if (getCharacterLength(password)>=6) {
      //if (password.length >=6 ) {
        return null;
      } else {
        return 'Please enter password with at least 6 alphacharacters';
      }
      
    };
  
    const validateFields = {
      email: emailValidation,
      password: passwordValidation
    };
  
    function validate(field, label){
        let message = '';
  
        if (!field) {
          message = `Cannot enter a blank ${label.toUpperCase()}`;
          setStatus(`Error: ${message}`);
          alert(message);
          return false;
        }
  
        if (label === 'name') {
          if (field.length < 2) {
            message = `${label.toUpperCase()} needs to be more than one character`;
            setStatus(`Error: ${message}`);
            alert(message);
            return false;
          } else {
            let returnMessage = nameValidateFormat(field);
            if (returnMessage) {
              alert(returnMessage);
              return false;
            } else {
              return true
            }
        }};

        if (label === 'email') {
          if (field.length < 5) {
            message = `${label.toUpperCase()} needs to be more than 5 (five) characters AND present special format`;
            setStatus(`Error: ${message}`);
            alert(message);
            return false;
          } else {
            let returnMessage = emailValidateFormat(field);
            if (returnMessage) {
              alert(returnMessage);
              return false;
            } else {
              return true
            }
          }
        }        
  
        if ( (label === 'password') && (field.length < 8) ) {
          message = `${label.toUpperCase()} needs at least 8 (eight) characters`;
          setStatus(`Error: ${message}`);
          alert(message);
          return false;
        }
        
        setStatus('');
        setShowButtonAdd(true);
        return true;
    }
  
    function nameValidation(e) {
      // a place for specific format and advanced requirements
      log(e.key)();
      
      // maybe jump to next field?
      if (e.key === 'Enter' || e.keyCode === 13) {
        
      }
  
      return true;
    }
  
    function emailValidation(e) {
      // a place for specific format and advanced requirements
      log(e.currentTarget.value)();
  
      // maybe jump to next field?
      if (e.key === 'Enter' || e.keyCode === 13) {
        
      }
  
      // return true;
      return emailValidateFormat(e.currentTarget.value);
  
    }
  
    function passwordValidation(e) {
      // a place for specific format and advanced requirements
      log(e.currentTarget.value)();
  
      // maybe jump to next field? or hit submit ?
      if (e.key === 'Enter' || e.keyCode === 13) {
        
      }
  
      return true;
    }

    function handleAllValidationsFormik(values) {
      if (!validate(values.name,     'name'))     return false;
      if (!validate(values.email,    'email'))    return false;
      if (!validate(values.password, 'password')) return false;

      // check if user already exists
      if (containsName_and_Email(ctx.users, values.name, values.email)) {
        let error = 'User Already Exists!';
        alert(`Error: ${error}`);
        setStatus(`${error} Hint: the provided e-mail is registered`);
        return false;
      };

      return true;
    }    

    function submitCreateAccount(name, email, password) {

      var message = '';
      var url = `${baseURL}/accounts/create/`;
      log(url)();
      // var body = `{"email":"${email}"}`;
      // const info = req.query.info;
      // const userid = req.query.id;
      // const key = 'fde7f8d0b3c9471cbf787ea0fb0ca043';
      log(`Sent login for:`)();
      log({email: email})();
      
      // https://www.npmjs.com/package/superagent
      superagent.post(url)
        .send({name: name, email: email, password: password, externalIP: ctx.externalIP}) //, userid, key})
        .end((err, res) => {
          // the answer is processed here
          if (err) {
            //global.logger.error(err);
            log(err);
            let error = 'Connection error.';
            alert(`Create Account failed: ${error}\n${err}`);
            setStatus(error);
            return
          } else {
            log(res)();
            log(res.text)();
  
            // ATTENTION: when select uses "findOne" we receive a single document
            // ATTENTION: when select uses "find" we receive and array with the answers
            // const account = res.body.account[0];
            const account = res.body.account;
            const userExists = res.body.userExists;
            // do some async action with result:
            log(`Received reply:`)();
            log(account)();
            // test if account is the same meaning user already exists:
            if (!account) {
              if (!userExists) {
                let error = 'Please try again later.';
                alert(`Create Account failed: something went wrong!\n${error}`);
                setStatus(error);
                return
              } else {
                let error = 'User Already Exists!';
                alert(`Error: ${error}`);
                setStatus(`${error} Hint: Please use login page!`);
                return false;
              }
            } else {
              // A SERIES OF TESTS AND MESSAGES:
  
              if ((account.status === 'closed')||(account.status === 'blocked')) {
                let error = `Account is ${account.status}`;
                alert(`Create Account failed: please contact our support for help!\n${error}`);
                setStatus(error);
                return
              }
  
              // a consistency test of EMAIL
              if (account.email.toLowerCase() !== email.toLowerCase()) {
                let error = `Please try again later.`;
                alert(`Create Account failed: communication error!\n${error}`);
                setStatus(error);
                return
              }

              // a consistency test of NAME
              // for now, we'll not stop the process but we include a warning to the user
              if (account.name.toUpperCase() !== name.toUpperCase()) {
                message += 'Beaware that names did not match exactly.\nCheck if it is necessary to modify you data\n';
                // alert(`Create Account failed: communication error!\n${error}`);
              }              
            
              if (account.status === 'new') {
                  message += 'Sucessfully Created Account and you are now logged in';
                }
              
              if (account.status === 'active') {
                  message += 'Account already exists and you are now logged in';
                }
  
              // success!
              alert(`${message}`);
              setStatus('');
              setName(account.name);
              setBalance(account.balance);
              setStatement(account.statement);
              setPassword(password);
          
              // if valid existing user was retrieved and returned, then all we need is to make him/her the current user
              ctx.currentUser = account;
              ctx.currentUser.password = password;
  
              // update all users
              // should we still use all users ?
              // first we need to check if it is not on local memory
              let found = containsEmailMatchingPassword(ctx.users, email, password, account);
              if (!found) {
                ctx.users.push({_id: account._id,
                  name: account.name,
                  email: account.email,
                  password: password,
                  balance: account.balance,
                  statement: account.statement,
                  status: account.status});
                }          
  
                setLoggedIn(true);
                ctx.loggedIn = true;
                setShowButtonAdd(true);
                // this alert is not necessary anymore:
                // alert(`User ${account.name} Sucessfully Logged in`);
                log('Try to redirect at getName')();
                history.push("/statement");
            }
          }
        })     
    }    
  
    function handleCreateFormik(values){
      log('handleCreate thru Formik for ',values)();
      log('handleCreate thru Formik for ',name, email, password)();
  
      // if (!validate(name,     'name'))     return;
      // if (!validate(email,    'email'))    return;
      // if (!validate(password, 'password')) return;
      
      if (!handleAllValidationsFormik(values)) return false;
  
      setBalance(0);
      setStatement([]);
  
      log('Created account thru Formik for ', values.name, values.email, balance, statement)();

      submitCreateAccount(values.name, values.email, values.password);
  
      // // for now, there is no database to be queried
      // // so we simply push a new user to the base o users
      // ctx.users.push({name: values.name, email: values.email, password: values.password, balance, statement});
      
      // // if "auto login" is on, we should do:
      // // ctx.currentUser.push({name, email, password, balance, statement});
      
      // // thanks to ES6 destructuring:
      // ctx.currentUser = {name: values.name, email: values.email, password: values.password, balance, statement};    
      // ctx.loggedIn = true;
      // // setShow(false);
      // setShowButtonAdd(true);
      // // alert('User created sucessfully!')
      // alert('Sucessfully Created Account');
      // return true;
    }        
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setBalance(0);
      setStatement([]);
  
      setShowButtonAdd(false);

      setValidName(false);
      setValidEmail(false);
      setValidPassword(false);
      
      currentUserNull();
  
      log(ctx)();
    }
  
    function CardStatus() {
      return(
        <div className="erroCreateAccount">
        { (!status) ? (
          <div></div>
          ):(
          <div><br/>{status}</div>)
        }
        </div>
      )
    }

    const formik = useFormik({
      initialValues: {
        name: '',
        //username: '',
        email: '',
        password: '',
      },
      onSubmit: async (values, actions) => {
        let result = handleCreateFormik(values);
        
        if (result) {
        //actions.setSubmitting(false);
        actions.resetForm();
        } else {
          //actions.setSubmitting(true);
        }
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .min(3, 'Must be at least 2 characters in 2 words')
          // .max(20, 'Must be less  than 20 characters')
          .required('Name is required')
          .matches(
            /^[a-zA-Z0-9]+ [a-zA-Z0-9]+(?:[a-zA-Z0-9 ])*$/,
            'Cannot contain special characters and requires at least 2 words'
          ),
        
        // username: Yup.string()
        //   .min(6, 'Must be at least 6 characters')
        //   .max(20, 'Must be less  than 20 characters')
        //   .required('Username is required')
        //   .matches(
        //     /^[a-zA-Z0-9]+$/,
        //     'Cannot contain special characters or spaces'
        //   ),
        
        email: Yup.string()
          .required('Email is required')
          .matches(
            // this seem to require something AFTER the DOT, but DOT itself is not mandatory:
            // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            // mandatory "@" and "."
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            'Should contain @ and at least one dot in the domain side'
          ),        
        password: Yup.string()
          .min(8, 'Must be at least 8 characters')
          .required('Password is required')
          .matches(
            /^[a-zA-Z0-9.@!#$%&’*+/=?^_`{|}~-]+$/,
            'It may contain special characters or spaces'
          ),  
      }),
    });    
  
    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        // status={status}
        
        // check this empty structure with ternary
        // body={show ? (<></>):(<></>)}
        
        body={ctx.loggedIn ? ( 
        //body={showButtonAdd ? (  
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add Another Account</button>
                </>
              ):(
                <>
                {/* Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} onKeyUp={e => nameValidation(e)} /><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} onKeyUp={e => emailValidation(e)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} onKeyUp={e => passwordValidation(e)}/><br/>
                <button type="submit"
                  className="btn btn-light" 
                  onClick={handleCreate}
                  disabled={((name.length===0)||(email.length===0)||(password.length===0))}
                  >Create Account</button> */}

                <FormikProvider value={formik}>
                    <Form>
                        <TextInputLiveFeedback
                        label="Name"
                        id="name"
                        name="name"
                        placeholder="Example: John Doe"
                        // helpText="Must be at least two words with more than 2 characters each."
                        type="text"
                        // value={name}
                        // handleChange={e => setName(name + e.currentTarget.value)}
                        setterValid={setValidName}
                        />
                        <TextInputLiveFeedback
                        label="Email"
                        id="email"
                        name="email"
                        placeholder="Example: inbox@domain.ext or inbox@domain.ext.cy"
                        // helpText="Should contain @ and at least one dot in the domain side."
                        type="email"
                        // value={email}
                        // handleChange={e => setEmail(email + e.currentTarget.value)}
                        setterValid={setValidEmail}
                        />          
                        <TextInputLiveFeedback
                        label="Password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        // helpText="Must be at least 8 characters and may contain special characters."
                        type="password"
                        // value={password}
                        // handleChange={e => setPassword(password + e.currentTarget.value)}
                        setterValid={setValidPassword}
                        />        
                        <div>
                        <button 
                          type="submit"
                          className="btn btn-light"
                          id="formik-submit"
                          // disabled={((name.length===0)||(email.length===0)||(password.length===0))}
                          disabled={((!validName)||(!validEmail)||(!validPassword))}
                          >Create Account</button>
                        {/* <button
                          type="reset"
                          className="btn btn-light"
                          id="formik-reset"
                          // disabled={((name.length===0)||(email.length===0)||(password.length===0))}
                          disabled={!((validName)&&(validEmail)&&(validPassword))}
                          >Reset</button> */}
                        </div>
                    </Form>
                </FormikProvider>
                <CardStatus />
                </>


              )}
      />
    );
     
  }

export default CreateAccountFormik;