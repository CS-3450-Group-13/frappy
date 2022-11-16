import { fireEvent, render, screen } from '@testing-library/react';
// import React from 'react';
// import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';
// import NewUser from '../pages/NewUser';

// describe('New User Page Tests', () => {
//   test('renders NewUser Component', () => {
//     render(
//       <BrowserRouter>
//         <NewUser />
//       </BrowserRouter>
//     );
//   });

//   test('Test  to display all input fields', () => {
//     render(
//       <BrowserRouter>
//         <NewUser />
//       </BrowserRouter>
//     );
//     expect(screen.getByText(/Username:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Email:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Password:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Re-Enter Pass:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Create New User/i)).toBeInTheDocument();
//   });

//   test('Test when Create New User is clicked', async () => {
//     render(
//       <BrowserRouter>
//         <NewUser />
//       </BrowserRouter>
//     );
//     await fireEvent.click(screen.getByTestId(/newUserBtn/i));
//     const response = await screen.getByText(/Create An Account/i);
//     expect(response).toBeInTheDocument();
//   });
// });
