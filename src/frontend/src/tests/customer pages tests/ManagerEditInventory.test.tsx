import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManagerEditInventory from '../../pages/ManagerEditInventory';

describe('Inventory Page Tests', () => {
  test('Renders Inventory Component', () => {
    render(
      <BrowserRouter>
        <ManagerEditInventory />
      </BrowserRouter>
    );
  });

  //   test('Tests for Tabless', () => {
  //     render(
  //       <BrowserRouter>
  //         <ManagerEditInventory />
  //       </BrowserRouter>
  //     );
  //     expect(screen.getByText(/Milks/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Bases/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Extras/i)).toBeInTheDocument();
  //   });

  test('Tests for Buttons', () => {
    render(
      <BrowserRouter>
        <ManagerEditInventory />
      </BrowserRouter>
    );
    expect(screen.getAllByText('Order')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Edit')[0]).toBeInTheDocument();
    expect(screen.getAllByText(/X/i)[0]).toBeInTheDocument();
  });

  test('Tests Edit', async () => {
    render(
      <BrowserRouter>
        <ManagerEditInventory />
      </BrowserRouter>
    );
    await fireEvent.click(screen.getAllByText('Edit')[0]);
    const resp = await screen.getByText(/Save/i);
    expect(resp).toBeInTheDocument();

    await fireEvent.click(screen.getByText(/Save/i));
    const resp2 = await screen.queryByText(/Save/i);
    expect(resp2).toBeNull();
  });

  test('Tests Order', async () => {
    render(
      <BrowserRouter>
        <ManagerEditInventory />
      </BrowserRouter>
    );
    await fireEvent.click(screen.getAllByText('Order')[0]);
    const resp = await screen.getByText(/Confirm/i);
    expect(resp).toBeInTheDocument();

    await fireEvent.click(screen.getByText(/Confirm/i));
    const resp2 = await screen.queryByText(/Confirm/i);
    expect(resp2).toBeNull();
  });
});
