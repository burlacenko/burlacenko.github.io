import React from 'react';

// professor removed this (why? since it was working):
// import { render, screen } from '@testing-library/react';

import * as ReactDOM from 'react-dom';

import App from './App';

// professor removed this (why? since it was working):
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('ToDo professor test1', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
});
