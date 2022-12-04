import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Customer Home Page Tests', () => {
  test('renders Home Component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('Home Header on screen', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  test('Home Order History on screen', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Order History/i)).toBeInTheDocument();
  });

  test('Home Balance on screen', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Balance/i)).toBeInTheDocument();
  });

  test('Home Favorite Drink on screen', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Favorite Drink/i)).toBeInTheDocument();
  });

  test('Home Edit Account on screen', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Edit Account/i)).toBeInTheDocument();
  });
});
