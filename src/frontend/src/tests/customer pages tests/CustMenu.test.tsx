import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Menu from '../../pages/Menu';

describe('Customer Menu Page Tests', () =>{
    test('renders Menu Component', () => {
        render(
        <BrowserRouter>
        <Menu />
        </BrowserRouter>);
      });
    })