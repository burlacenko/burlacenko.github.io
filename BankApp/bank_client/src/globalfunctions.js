function getCharacterLength (str) {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
};

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

export { getCharacterLength, emailValidation, passwordValidation };

  
