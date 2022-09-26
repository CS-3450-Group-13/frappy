import React, { useState } from 'react';
import './App.css';
import EmployeesScreen from './screens/EmployeesScreen';
import InventoryScreen from './screens/InventoryScreen';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showPage = () => {
    switch (window.location.pathname) {
      case "/":
        return <LoginScreen setIsLoggedIn={setIsLoggedIn}></LoginScreen>;
      case "/signup":
        return <SignupScreen setIsLoggedIn={setIsLoggedIn}></SignupScreen>;
      case "/menu":
        return <MenuScreen />
      case "/inventory":
        return <InventoryScreen />
      case "/employees":
        return <EmployeesScreen />
    }
  }

  return (
    <div>{showPage()}</div>
  );
}

export default App;
