import React from 'react';

const baseURL = process.env.REACT_APP_BASE_URL;

const DEV_BUILD = (process.env.REACT_APP_CLIENT_BUILD_TYPE === 'development');

const log = function() {
    // https://stackoverflow.com/questions/9559725/extending-console-log-without-affecting-log-line
    // extended console.log code here:
    if (DEV_BUILD) {
    var args = Array.prototype.slice.call(arguments);		
    args.unshift(console);
    return Function.prototype.bind.apply(console.log, args);
    } else {
        // here we return an "empty function to cancel the console.log"
        return () => {}
    }
}

const oneStatement = {
    entry: 0, // absolute index incremented for each entry
    kind: 'C', // Credit ou Debit, default = C
    value: 0 // amount
};

// var emptyUser = {
const emptyUser = {
    name: '',
    email: '',
    password: '',
    balance: 0,
    statement: [],
};

const UserContext = React.createContext(null);

log('build:')();
log(process.env.REACT_APP_BUILD_TYPE)();
log(baseURL)();

// export { UserContext, Route, Link, HashRouter, emptyUser, oneStatement };
export { UserContext, emptyUser, oneStatement, baseURL, log };
