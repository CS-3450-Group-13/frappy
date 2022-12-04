import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home Page Tests', () => {
  test('Renders Home Component', () => {
    render(
      <BrowserRouter>
        <Home></Home>
      </BrowserRouter>
    );
  });

  test('Tests for Main Home Buttons', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/New Order/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Account/i)[0]).toBeInTheDocument();
  });

  test('Tests for Account Info', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Order History/i)).toBeInTheDocument();
    expect(screen.getByText(/Balance/i)).toBeInTheDocument();
  });

  //   test('Tests for Routing (Account)', async () => {
  //     render(
  //       <BrowserRouter>
  //         <Home />
  //       </BrowserRouter>
  //     );
  //     await fireEvent.click(screen.getAllByText('Account')[0]);
  //     const resp = await screen.getByText(/Account Information/i);
  //     expect(resp).toBeInTheDocument();
  //   });

  //   test('Tests for Routing (Menu)', async () => {
  //     render(
  //       <BrowserRouter>
  //         <Home />
  //       </BrowserRouter>
  //     );
  //     await fireEvent.click(screen.getByText('New Order'));
  //     const resp = await screen.getByText(/CHOOSE YOUR FRAPPY/i);
  //     expect(resp).toBeInTheDocument();
  //   });
});
