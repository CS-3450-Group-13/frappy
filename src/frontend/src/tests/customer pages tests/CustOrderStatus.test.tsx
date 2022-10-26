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

  // test('Test OrderStatus Page', () => {
  //   render(
  //     <BrowserRouter>
  //       <OrderStatus />
  //     </BrowserRouter>
  //   );
  // });
  // expect(screen.getByTitle(/Wait/i)).toBeInTheDocument();
});
