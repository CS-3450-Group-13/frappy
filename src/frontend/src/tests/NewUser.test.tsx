import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NewUser from '../pages/NewUser';

describe('New User Page Tests', () => {
  test('renders NewUser Component', () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
  });

  test('Test  to display First Name field', () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/First Name:/i)).toBeInTheDocument();
  });

  test('Test  to display Last Name field', () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Last Name:/i)).toBeInTheDocument();
  });

  test('Test  to display Email field', () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
  });

  test('Test  to display Password field', () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Password:/i)).toBeInTheDocument();
  });

  test('Test  to display re-enter field', () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Re-Enter Pass:/i)).toBeInTheDocument();
  });

  test('Test when Create New User is clicked', async () => {
    render(
      <BrowserRouter>
        <NewUser setPages={() => {}} />
      </BrowserRouter>
    );
    await fireEvent.click(screen.getByTestId(/newUserBtn/i));
    const response = await screen.getByText(/Create An Account/i);
    expect(response).toBeInTheDocument();
  });
});
