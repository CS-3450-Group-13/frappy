import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
var mockPages = [
  {
    title: 'Login',
    path: '/',
  },
  {
    title: 'New User',
    path: '/new-user',
  },
];

function mockSetPages(arr: { title: string; path: string }[]) {
  mockPages = arr;
}

function mockSetAuthKey(key: string) {
  var authkey = key;
}

const setup = () => {
  const utils = render(
    <BrowserRouter>
      <Login setPages={mockSetPages} authKey={''} setAuthKey={mockSetAuthKey} />
    </BrowserRouter>
  );
  const email = screen.getByLabelText('email');
  const password = screen.getByLabelText('password');
  return {
    email,
    password,
    ...utils,
  };
};

describe('Login Tests', () => {
  test('renders Login Component', () => {
    const { email, password } = setup();
  });

  test('Test Login Fields', () => {
    render(
      <BrowserRouter>
        <Login
          setPages={mockSetPages}
          authKey={''}
          setAuthKey={mockSetAuthKey}
        />
      </BrowserRouter>
    );
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });

  test('Test when login is clicked with no input', async () => {
    render(
      <BrowserRouter>
        <Login
          setPages={mockSetPages}
          authKey={''}
          setAuthKey={mockSetAuthKey}
        />
      </BrowserRouter>
    );
    await fireEvent.click(screen.getByTestId(/loginBtn/i));
    const response = await screen.getByText(/Create An Account/i);
    expect(response).toBeInTheDocument();
  });
  //   add test for when login information is correct
});
