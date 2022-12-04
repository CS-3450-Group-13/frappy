import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Account from '../../pages/Account';

describe('Customer Account Page Tests', () => {
  test('renders Account Component', () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
  });

  test('Testing Fields for edit in Account Page', () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  test('Account Header on screen', () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );
    expect(screen.getByText(/Account Information For:/i)).toBeInTheDocument();
  });
});
