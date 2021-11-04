import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders the header', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/BIN2dec/i)).toBeInTheDocument();
});

test('render form element', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByRole("form")).toBeInTheDocument();
});

test('render form submit element', () => {
  const { getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByRole("button", {name: "Enter"})).toBeInTheDocument();
});

describe('on form submit', () => {
  test('render error message if input is not 0s or 1s', () => {
    const { 
      getByTestId, 
      getByRole, 
      getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = getByPlaceholderText("Enter binary values");
    const button = getByRole("button", {name: "Enter"});
    fireEvent.change(input, {target: {value: '111aaa'}});
    fireEvent.click(button);
    expect(getByTestId("error")).toBeInTheDocument();
  });

  test('render error message if input length is greater than 8', () => {
    const { 
      getByTestId, 
      getByRole, 
      getByPlaceholderText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = getByPlaceholderText("Enter binary values");
    const button = getByRole("button", {name: "Enter"});
    fireEvent.change(input, {target: {value: '1111111111'}});
    fireEvent.click(button);
    expect(getByTestId("error")).toBeInTheDocument();
  });

  test('render input values on form submit', () => {
    const { 
      getByTestId, 
      getByRole, 
      getByPlaceholderText,
      getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = getByPlaceholderText("Enter binary values");
    const button = getByRole("button", {name: "Enter"});
    fireEvent.change(input, {target: {value: '111'}});
    fireEvent.click(button);
    expect(getByTestId("input values")).toBeInTheDocument();
    expect(getByText('1 1 1'));
  });

  test('render binary calculations on form submit', () => {
    const { 
      getByTestId, 
      getByRole, 
      getByPlaceholderText,
      getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = getByPlaceholderText("Enter binary values");
    const button = getByRole("button", {name: "Enter"});
    fireEvent.change(input, {target: {value: '111'}});
    fireEvent.click(button);
    expect(getByText('1 + 2 + 4'));
  });

  test('render binary to decimal conversion value', () => {
    const { 
      getByTestId, 
      getByRole, 
      getByPlaceholderText,
      getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = getByPlaceholderText("Enter binary values");
    const button = getByRole("button", {name: "Enter"});
    fireEvent.change(input, {target: {value: '111'}});
    fireEvent.click(button);
    expect(getByText('7'));
  });
});


  /**
   * 1. Render component you want to test
   * 2. Find element you want to test
   * 3, Interact with element
   * 4. Assert that the results are as expected
   * 
   */
