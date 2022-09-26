import React, { useState } from 'react';
import './App.css';
import Signup from './components/Signup/Signup';
import LoginScreen from './screens/LoginScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showPage = () => {
    if (!isLoggedIn) {
      switch (window.location.pathname) {
        case "/":
          return <LoginScreen setIsLoggedIn={setIsLoggedIn}></LoginScreen>
        case "/signup":
          return <Signup setIsLoggedIn={setIsLoggedIn}></Signup>
      }
    } else {
      console.log(`Logged in with path ${window.location.pathname}`);
    }
  }
  return (
    <div>{showPage()}</div>
  );
}

export default App;
