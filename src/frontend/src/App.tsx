import React, { useState } from 'react';
import './css/App.css';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [pages, setPages] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World!</p>
        <Login />
        <NavBar />
      </header>
    </div>
  );
}

export default App;
