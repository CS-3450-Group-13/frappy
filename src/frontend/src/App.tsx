import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import NewUser from './pages/NewUser';
import OrderStatus from './pages/OrderStatus';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Home from './pages/Home';
import Confirmation from './pages/Confirmation';

const drink = {
  name: 'Pumpkin Spice',
  id: 0,
  inStock: true,
};

function App() {
  const [pages, setPages] = useState([
    {
      title: 'Login',
      path: '/'
    },
    {
      title: 'New User',
      path: '/new-user'
    }
  ]);

  return (
    <div className="App">
      <Router>
      <NavBar pages={pages} />
        <Routes>
          <Route path='/' element={<Login setPages={setPages} />} />
          <Route path='/new-user' element={ <NewUser />} />
          <Route path='/home-page' element={<Home />} />
          <Route path='/order-status' element={<OrderStatus />} />
          <Route path='/menu' element={<Menu />} ></Route>
          <Route path='/customize' element={<CustomizeDrink drink={drink}/>} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </div>
  )}

export default App;
