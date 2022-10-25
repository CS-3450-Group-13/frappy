import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../../pages/Menu';

describe('Customer Menu Page Tests', () => {
  test('renders Menu Component', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
  });

  test('Tests Menu Item Options', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    expect(screen.getByText(/Pumpkin Spice/i)).toBeInTheDocument();
    expect(screen.getByText(/Apple Crisp/i)).toBeInTheDocument();
    expect(screen.getByText(/Mocha Cookie Crumble/i)).toBeInTheDocument();
    expect(screen.getByText(/Caramel Ribbon Crunch/i)).toBeInTheDocument();
    expect(screen.getByText(/Vanilla Bean/i)).toBeInTheDocument();
    expect(screen.getByText(/White Chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/Java Chip/i)).toBeInTheDocument();
    expect(screen.getByText(/Custom Drink/i)).toBeInTheDocument();
  });
});
