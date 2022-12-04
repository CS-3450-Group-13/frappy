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

describe('Login Tests', () => {
  test('Test Login Fields', () => {
    render(
      <BrowserRouter>
        <Login setPages={mockSetPages} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });

  test('Test render of Login', async () => {
    render(
      <BrowserRouter>
        <Login setPages={mockSetPages} />
      </BrowserRouter>
    );
  });
});
