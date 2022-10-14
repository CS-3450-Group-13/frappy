import React from 'react';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
// import Login from './components/Login/Login';
// import NavBar from './components/NavBar/NavBar';
import Menu from './pages/Menu';
import Account from './pages/Account';
import BalanceModal from './pages/BalaceModal';
import UpdateFieldModal from './pages/UpdateFieldModal';
import Home from './pages/Home';

const drink = {
  name: 'Pumpkin Spice',
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
      {/* <CustomizeDrink drink={drink}/> */}
      {/* <Account /> */}
      {/* <BalanceModal /> */}
      {/* <UpdateFieldModal
        fieldName="Email"
        fieldValue="glorglugaming@gmail.com"
        confirm={true}
      /> */}
      <p>Hello World!</p>
      {/* <Home /> */}
    </div>
  );
}

export default App;
