import React from 'react';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
// import Login from './components/Login/Login';
// import NavBar from './components/NavBar/NavBar';
import Menu from './pages/Menu';

const drink = {
  name: "Pumpkin Spice",
  id: 0,
  inStock: true,
};

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>Hello World!</p>
        <Login />
        <NavBar />
      </header> */}
      {/* <Menu /> */}
      <CustomizeDrink drink={drink}/>
    </div>
  );
}

export default App;
