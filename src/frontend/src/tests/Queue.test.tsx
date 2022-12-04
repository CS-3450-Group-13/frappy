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
});
