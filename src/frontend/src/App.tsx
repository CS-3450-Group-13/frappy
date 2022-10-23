import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
import Login from './components/Login';
import NavBar from './components/NavBar';
import NewUser from './components/NewUser';
import OrderStatus from './pages/OrderStatus';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';

const drink = {
  name: 'Pumpkin Spice',
  id: 0,
  inStock: true,
  size: 'Small',
  price: 2.56,
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

  const [cart, setCart] = useState([
    drink,
    {
      name: 'Apple Crisp',
      id: 1,
      inStock: true,
      size: 'Medium',
      price: 3.36,
    },
    {
      name: 'Vanilla Bean',
      id: 2,
      inStock: true,
      size: 'Large',
      price: 4.25,
    },
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
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </div>
  )}

export default App;
