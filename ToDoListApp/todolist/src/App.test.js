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

test('ToDo', () => {
  // simply rendering our component
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);

  // after rendering our component
  // use DOM APIs (query selector) to make assertions
  expect(root.querySelector('h1').textContent).toBe('ToDo List');
  expect(root.querySelector('label').textContent).toBe('Add todo:');
  expect(root.querySelector('button').textContent).toBe('Added #1');


});
