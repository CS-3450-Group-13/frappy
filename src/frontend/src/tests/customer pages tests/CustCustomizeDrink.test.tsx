import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomizeDrink from '../../pages/CustomizeDrink';

import { TestFrappes, TestMenu } from '../TestServerData';
import { MenuItem } from '../../types/Types';

var mockMenu: MenuItem[] = [];

TestMenu.forEach((menuItem) => {
  // let frappe = TestFrappes.find((item) => item.id === menuItem.frappe);

  // if (frappe !== undefined) {
  //   let completeFrappe = {
  //     frappe: frappe,
  //     menu_item: menuItem,
  //   };

    mockMenu.push(menuItem);

    // console.log('Found frappe that matches menu item:', menuItem, frappe);
  });

describe('Customer CustomizeDrink Page Tests', () => {
  test('renders CustomizeDrink Component', () => {
    render(
      <BrowserRouter>
        {/* <CustomizeDrink /> */}
      </BrowserRouter>
    );
  });

  // test('renders CustomizeDrink Component', () => {
  //   render(
  //     <BrowserRouter>
  // <CustomizeDrink frappe={mockMenu[4]} />
  //     </BrowserRouter>
  //   );
  // });
  // expect(screen.getByText(/Pumpkin Spice/i)).toBeInTheDocument();
});
