import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Customer Home Page Tests', () =>{
    test('renders Home Component', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>);
      });
    })