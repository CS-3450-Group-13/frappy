import React from 'react';
import './css/App.css';
// import Login from './components/Login/Login';
// import NavBar from './components/NavBar/NavBar';
import Menu from './pages/Menu';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Hello World!</p>
        <Login />
        <NavBar />
      </header> */}
      <Menu />
    </div>
  );
}

export default App;
