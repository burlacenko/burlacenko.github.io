import React from 'react';
// import { Route, Link, HashRouter } from 'react-router-dom';

// const UserContext = React.createContext(null);

// const Route       = ReactRouterDOM.Route;
// const Link        = ReactRouterDOM.Link;
// const HashRouter  = ReactRouterDOM.HashRouter;

// let oneStatement = {
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

// export { UserContext, Route, Link, HashRouter, emptyUser, oneStatement };
export { UserContext, emptyUser, oneStatement };
