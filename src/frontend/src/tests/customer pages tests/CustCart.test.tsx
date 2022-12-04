import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../../pages/Cart';
import { TestFrappes, TestMenu } from '../TestServerData';
import { MenuItem } from '../../types/Types';

describe('Customer Cart Page Tests', () => {
  test('Page renders', () => {
    const cart: MenuItem[] = [];
    const setCart = () => {};

    render(
      <BrowserRouter>
        <Cart cart={cart} setCart={setCart}></Cart>
      </BrowserRouter>
    );

    expect(screen.getByText(/CART/i)).toBeInTheDocument();
    expect(screen.getByText(/TOTAL/i)).toBeInTheDocument();
    expect(screen.getByText(/BACK TO MENU/i)).toBeInTheDocument();
    expect(screen.getByText(/CHECKOUT/i)).toBeInTheDocument();
  });

  test('Page shows correct drinks', () => {
    const price = 8.54;
    const cart: MenuItem[] = [{active: true, name: 'Apple Crisp', frappe: TestFrappes[1], photo: '', prices: [0.0]}]
    cart[0].frappe.final_price = price;
    const setCart = () => {};

    render(
      <BrowserRouter>
        <Cart cart={cart} setCart={setCart}></Cart>
      </BrowserRouter>
    );

    expect(screen.getByText(/CART/i)).toBeInTheDocument();
    expect(screen.getByText(/TOTAL/i)).toBeInTheDocument();
    expect(screen.getByText(/BACK TO MENU/i)).toBeInTheDocument();
    expect(screen.getByText(/CHECKOUT/i)).toBeInTheDocument();
    expect(screen.getByText(/Apple Crisp/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    expect(screen.getByText(/X/i)).toBeInTheDocument();
  });
});
