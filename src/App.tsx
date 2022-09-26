import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showPage = () => {
    if (!isLoggedIn) {
      switch (window.location.pathname) {
        case "/":
          return <Login setIsLoggedIn={setIsLoggedIn}></Login>
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
