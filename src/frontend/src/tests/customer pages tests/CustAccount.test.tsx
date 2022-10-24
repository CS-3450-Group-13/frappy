import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Account from '../../pages/Account';

describe('Customer Account Page Tests', () =>{
    test('renders Account Component', () => {
        render(
        <BrowserRouter>
        <Account />
        </BrowserRouter>);
      });
    })