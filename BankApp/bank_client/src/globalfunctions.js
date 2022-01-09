function getCharacterLength (str) {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
};

  // part of validation code from https://github.com/arnaudNYC/react-form-validation
  const emailValidateFormat = email => {
      if (
            // this seem to require something AFTER the DOT, but DOT itself is not mandatory:
            // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test
            // mandatory "@" and "."
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        ) {
        return null;
        };

      if (email.trim() === '') {
        return 'Invalid email format'; //'Email is required';
      }

      return 'Please enter a valid email format similar to "my@domain.com" or "my@domai.com.uk"'; // 'Username should be an email';
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

export { getCharacterLength, emailValidateFormat, passwordValidation };

  
