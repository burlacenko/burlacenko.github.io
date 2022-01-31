 function getCharacterLength (str) {
    // The string iterator that is used here iterates over characters,
    //  not mere code units
    return [...str].length;
  };

  // part of validation code from https://github.com/arnaudNYC/react-form-validation
  
  

  const nameValidateFormat = name => {
    if (
          // requires at least 2 words and does not accept special characters
          /^[a-zA-Z0-9]+ [a-zA-Z0-9]+(?:[a-zA-Z0-9 ])*$/.test(name)
      ) {
      return null;
      };

    if (name.trim() === '') {
      return 'Invalid name format';
    }

    return 'Please enter a valid name format with at least 2 words';
  };

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

  const containsEmailMatchingPassword = (anArrayOfItems, anEmail, aPassword) => {
    for (let i = 0; i < anArrayOfItems.length; i++) {
        const element = anArrayOfItems[i];
        if (element.email !== undefined) {
            if (element.email === anEmail) {
              // Email exists, now checking password
              if (element.password !== undefined) {
                if (element.password === aPassword) {
                  if (element.name !== undefined) {
                    return element;
                  }
                }
              }
            }
        }
    }
    return null;
  };

  const containsName_and_Email = (anArrayOfItems, aName, anEmail) => {
    for (let i = 0; i < anArrayOfItems.length; i++) {
        const element = anArrayOfItems[i];
        if ((element.name === undefined)||(element.email === undefined)) return false;

        // validation: CANNOT contain same email (works like id)
        // but 2 equal names could exist if different email !
        if ((aName !== undefined)&&(anEmail !== undefined)) {
          // when one or another coudn't exist
          //if ((element.name === aName)||(element.email === anEmail)) {
          if (element.email === anEmail) {
            return true;
          }
        }
    }
    return false;
  };  

export { getCharacterLength, nameValidateFormat, emailValidateFormat, passwordValidation, containsEmailMatchingPassword, containsName_and_Email };

  
