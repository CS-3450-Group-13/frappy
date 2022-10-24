import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomizeDrink from '../../pages/CustomizeDrink';

const mockDrink = {
    name: 'Pumpkin Spice',
    id: 0,
    inStock: true,
  };

describe('Customer CustomizeDrink Page Tests', () =>{
    test('renders CustomizeDrink Component', () => {
        render(
        <BrowserRouter>
        <CustomizeDrink drink={mockDrink} />
        </BrowserRouter>);
      });
    })