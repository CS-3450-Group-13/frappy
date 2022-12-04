import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../../pages/Menu';
import { TestFrappes, TestMenu } from '../TestServerData';
import { MenuItem } from '../../types/Types';

describe('Customer Menu Page Tests', () => {
  test('renders Menu Component', () => {
    render(
      <BrowserRouter>
        <Menu cart={[]} setCart={() => {}} />
      </BrowserRouter>
    );
  });

  test('Tests Menu Checkout', () => {
    render(
      <BrowserRouter>
        <Menu cart={[]} setCart={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });

  test('Tests Menu Choose your frappe:', () => {
    render(
      <BrowserRouter>
        <Menu cart={[]} setCart={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/CHOOSE YOUR FRAPPY:/i)).toBeInTheDocument();
  });
});
