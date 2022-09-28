import React, { useState } from 'react';
import './App.css';
import AccountPage from './pages/AccountPage';
import EmployeesPage from './pages/EmployeesPage';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showPage = () => {
    switch (window.location.pathname) {
      case "/":
        return <LoginPage setIsLoggedIn={setIsLoggedIn}></LoginPage>;
      case "/signup":
        return <SignupPage setIsLoggedIn={setIsLoggedIn}></SignupPage>;
      case "/menu":
        return <MenuPage />
      case "/inventory":
        return <InventoryPage />
      case "/employees":
        return <EmployeesPage />
      case "/account":
        return <AccountPage />
      case "/settings":
        return <SettingsPage />
    }
  }

  return (
    <div>{showPage()}</div>
  );
}

export default App;
