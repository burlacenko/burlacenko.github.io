import React from "react";
// TODO: import useFormik from formik library
import {useFormik} from 'formik';

function getCharacterLength (str) {
  // The string iterator that is used here iterates over characters,
  //  not mere code units
  return [...str].length;
}

// part of validation code from https://github.com/arnaudNYC/react-form-validation
const emailValidation = email => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    )
  ) {
    return null;
  }
  if (email.trim() === '') {
    return 'Field required'; //'Email is required';
  }
  return 'Please enter a valid email'; // 'Username should be an email';
};

const passwordValidation = password => {
  if (password.trim() === '') {
    return 'Field required'; //'Email is required';
  }

  if (getCharacterLength(password)>=6) {
    return null;
  } else {
    return 'Please enter password with at least 6 alphacharacters';
  }
  
};

const validateFields = {
  email: emailValidation,
  password: passwordValidation
};

function App() {
  // TODO: add a const called formik assigned to useFormik()
  const formik = useFormik({
    
    initialValues: {
      email: '',
      password: ''
    },

    onSubmit: values => {
      console.log('Form Login info:', values);
      alert(`Login Successful`);
    },
    
    // for validation we added this:
    validate: values => {
      let errors = {};
      let emailMessage = emailValidation(values.email);
      let passwordMessage = passwordValidation(values.password);

      if (emailMessage !== null) errors.email = emailMessage; //'Field required';
      if (passwordMessage !==null) errors.password = passwordMessage; //'Field required';
      return errors;
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div id="email">Email:
          <input id="emailField" name="email" type="text" placeholder="john@mail.com" onChange={formik.handleChange} value={formik.values.email} />
        </div>
        {formik.errors.email ? <div id="emailError" style={{color:'red'}}>{formik.errors.email}</div>: null}
        <div id="password">Password: 
          <input id="pswField" name="password" type="text" onChange={formik.handleChange} value={formik.values.password} />
        </div>
        {formik.errors.password ? <div id="pswError" style={{color:'red'}}>{formik.errors.password}</div>: null}
        <button id="submitBtn" type="submit">Submit</button>      
      </form>
    </div>
  );
}

export default App;
