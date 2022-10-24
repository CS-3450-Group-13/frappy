import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe("main App tests", () => {
  test('renders App', () => {
    render(<App />);
  });
});

