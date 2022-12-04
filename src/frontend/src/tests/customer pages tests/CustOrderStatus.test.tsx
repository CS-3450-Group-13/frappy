import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OrderStatus from '../../pages/OrderStatus';

describe('Customer OrderStatus Page Tests', () => {
  test('renders OrderStatus Component', () => {
    render(
      <BrowserRouter>
        <OrderStatus />
      </BrowserRouter>
    );
  });

  test('Test OrderStatus Intro', () => {
    render(
      <BrowserRouter>
        <OrderStatus />
      </BrowserRouter>
    );
    expect(screen.getByText(/Thank You/i)).toBeInTheDocument();
  });

  test('Test OrderStatus Page', () => {
    render(
      <BrowserRouter>
        <OrderStatus />
      </BrowserRouter>
    );
    expect(screen.getByText(/Your Order is Currently/i)).toBeInTheDocument();
  });

  test('Test OrderStatus Page Home button', () => {
    render(
      <BrowserRouter>
        <OrderStatus />
      </BrowserRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('Test OrderStatus Page New Order button', () => {
    render(
      <BrowserRouter>
        <OrderStatus />
      </BrowserRouter>
    );
    expect(screen.getByText(/New Order/i)).toBeInTheDocument();
  });
});
