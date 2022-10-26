import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter } from 'react-router-dom';
  var mockPages = [
    {
        title: 'Home',
        path: '/home-page'
      },
      {
        title: 'Order Status',
        path: '/order-status'
      },
      {
        title: 'Menu',
        path: '/menu'
      },
      {
        title: 'Account',
        path: '/account'
      },
      {
        title: 'Login',
        path: '/'
      },
      {
        title: 'New User',
        path: '/new-user'
      },
  ];

  function mockSetPages(arr:{ title: string; path: string; }[]) {
    mockPages = arr;
  }

  describe('NavBar Tests', () =>{
    test('renders NavBar Component', () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);
      });

      test('Test NavBar Fields', () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Order Status/i)).toBeInTheDocument();
        expect(screen.getByText(/Menu/i)).toBeInTheDocument();
        expect(screen.getByText(/Account/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/New User/i)).toBeInTheDocument();
      });

      test('Test Home Btn Click', async () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);

        await fireEvent.click(screen.getByLabelText(/Home/i))
        const response = await screen.getByText(/Home/i)
        expect(response).toBeInTheDocument();
      });

      test('Test Menu Btn Click', async () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);

        await fireEvent.click(screen.getByLabelText(/Menu/i))
        const response = await screen.getByText(/Menu/i)
        expect(response).toBeInTheDocument();
      });

      test('Test Order Status Btn Click', async () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);

        await fireEvent.click(screen.getByLabelText(/Order Status/i))
        const response = await screen.getByText(/Order Status/i)
        expect(response).toBeInTheDocument();
      });

      test('Test Account Btn Click', async () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);

        await fireEvent.click(screen.getByLabelText(/Account/i))
        const response = await screen.getByText(/Account/i)
        expect(response).toBeInTheDocument();
      });

      test('Test Login Btn Click', async () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);

        await fireEvent.click(screen.getByLabelText(/Login/i))
        const response = await screen.getByText(/Login/i)
        expect(response).toBeInTheDocument();
      });

      test('Test New User Btn Click', async () => {
        render(
        <BrowserRouter>
        <NavBar pages={mockPages} />
        </BrowserRouter>);

        await fireEvent.click(screen.getByLabelText(/New User/i))
        const response = await screen.getByText(/New User/i)
        expect(response).toBeInTheDocument();
      });
  })

