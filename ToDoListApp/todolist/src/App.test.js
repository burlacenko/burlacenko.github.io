import React from 'react';
import * as ReactDOM from 'react-dom';
// import { render, screen } from '@testing-library/react';
// import { screen } from '@testing-library/react';
// import { getByText, getByLabelText, getQueriesForElement } from '@testing-library/dom';
// import { getQueriesForElement } from '@testing-library/dom';
import {getQueriesForElement} from '@testing-library/react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function ourRender(component) {
  // based on:
  // const root = document.createElement('div');
  // ReactDOM.render(<App />, root);
  // const {getByText,getByLabelText} = getQueriesForElement(root);

  // professor converted to:
  const root = document.createElement('div');
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
}

// professor removed this (why? since it was working):
// this will interact thru "render" and "screen" instead of ReactDOM
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('ToDo contents', () => {
  // w20 video 20-13 Testing Using The DOM
  // simply rendering our component
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);

  // after rendering our component
  // use DOM APIs (query selector) to make assertions (more programmatical type test)
  expect(root.querySelector('h1').textContent).toBe('ToDo List');
  expect(root.querySelector('label').textContent).toBe('Add todo:');
  expect(root.querySelector('button').textContent).toBe('Added #1');
});

test('ToDo functionalities', () => {
  // w20 video 20-14 Testing Using The React Library
  // more functional type test

  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
  const {getByText,getByLabelText} = getQueriesForElement(root);
  // after rendering our component
  // expect(getByLabelText('Add todo:')).not.toBeNull();
  expect(getByText('ToDo List')).not.toBeNull();
  expect(getByText('Add todo:')).not.toBeNull();
  expect(getByText('Added #1')).not.toBeNull();

  // expect(getByLabelText('Add todo:')).not.toBeNull();
});


test('ToDo functionalities 2', () => {
  // w20 video 20-14 Testing Using The React Library
  // more like a "user" type of test
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
  const { getByText, getByLabelText } = getQueriesForElement(root);
  // const {getByText,getByLabelText} = getQueriesForElement(root);
  // after rendering our component
  getByText('ToDo List');
  // getByLabelText('Add todo:');
  getByText('Add todo:');
  getByText('Added #1'); 
});

test('Testing with Our Render', () => {
  const root = document.createElement('div');
  ReactDOM.render(<App />, root);
  const {getByText,getByLabelText} = getQueriesForElement(root);
  // const {getByText} = getQueriesForElement(root);


  // Video 20-15 (2:31): Testing Render
  // const {getByText,getByLabelText} = ourRender(<App/>);
  // const {getByText,getByLabelText} = render(<App/>);
  // const {getByText} = render(<App/>);
  getByText('ToDo List');
  //getByLabelText('Add todo:');
  getByText('Add todo:');
  getByText('Added #1');
});

// NOTE: somehow "getByLabelText" is not working!
// this DID NOT solve: https://github.com/testing-library/react-testing-library/issues/497


test('Add items to list', () => {
  // Video 20-16 Testing Fire Event
  // getByText('ToDo List');
  // getByText('Add todo:');
  // const { getByText, getByLabelText } = render(<App/>);

  const { getByText, getByTestId, getByPlaceholderText } = ourRender(<App/>);

  const input = getByPlaceholderText('Add Todo...');
  
  // actions
  fireEvent.change(input, {target:{value:'wash car'}});
  fireEvent.click(input);

  // confirm data
  // getByText('Added #2');
  getByText('build todo app');
  // getByText('wash car');
});

test('user-events allos users to add...', () => {
  const {getByText, getByLabelText, getByPlaceholderText} = render(<App />);
  
  const input = getByPlaceholderText('Mock');
  const button = getByText('Mock click');

  // actions
  userEvent.type(input, 'Learn spanish');
  userEvent.click(button);

  // confirm data
  getByText('build todo app');
  getByText('Learn spanish');
  getByText('Added #2');
  
})