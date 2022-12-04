import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Queue from '../pages/Queue';
import { TestFrappes, TestMenu, TestBases, TestMilks, TestExtras } from './TestServerData';
import { BaseOptions, CashierFrappe, ExtraOptions, MenuItem, MilkOptions, SizeOptions, StatusOptions } from '../types/Types';

describe('Customer Cart Page Tests', () => {
  test('Page renders', () => {
    render(
      <BrowserRouter>
        <Queue></Queue>
      </BrowserRouter>
    );

    expect(screen.getByText(/BARISTA QUEUE/i)).toBeInTheDocument();
  });

  // test('Page renders with pending orders', () => {
  //   let testFrappe: CashierFrappe = {
  //     id: 1,
  //     user: 0,
  //     milk: MilkOptions.Soy_Milk,
  //     base: BaseOptions.Coffee,
  //     extras: [
  //       {amount: 1, extras: ExtraOptions.Caramel, frappe: 1}
  //     ],
  //     price: 8.84,
  //     final_price: 8.84,
  //     menu_key: 1,
  //     creator: 'John Doe',
  //     size: SizeOptions.Small,
  //     comments: '',
  //     create_date: '',
  //     status: StatusOptions.In_Progress,
  //   }
  
  //   const modalIsOpenState = false;
  //   const basesState = TestBases;
  //   const milksState = TestMilks;
  //   const extrasState = TestExtras;
  //   const menuItemsState = TestMenu;
  //   const currentFrappeState = testFrappe;
  //   const queueState = [testFrappe];

  //   React.useState = jest.fn()
  //    .mockReturnValueOnce([modalIsOpenState, {}])
  //    .mockReturnValueOnce([basesState, {}])
  //    .mockReturnValueOnce([milksState, {}])
  //    .mockReturnValueOnce([extrasState, {}])
  //    .mockReturnValueOnce([menuItemsState, {}])
  //    .mockReturnValueOnce([currentFrappeState, {}])
  //    .mockReturnValueOnce([queueState, {}]);

  //   render(
  //   <BrowserRouter>
  //     <Queue></Queue>
  //   </BrowserRouter>
  //   );

  //   expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  // });
});
