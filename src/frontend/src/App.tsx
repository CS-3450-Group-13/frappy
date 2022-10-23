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
import { Frappe, Milk, Base, Size, Extras } from './types/Types';

const frappe: Frappe = {
  id: 0,
  creator: 'David@David.com',
  milk: Milk.Whole_Milk,
  base: Base.Cream,
  size: Size.Medium,
  createDate: '',
  extras: [
    {
      id: Extras.Pumpkin_Sauce,
      name: 'Pumpkin Sauce',
      stock: 1000,
      pricePerUnit: '0.80',
      updatedOn: '',
      createdOn: '',
      decaf: true,
      nonDairy: true,
      glutenFree: true,
      limit: 3,
      amount: 2,
    },
    {
      id: Extras.Whip_Cream,
      name: 'Whip Cream',
      stock: 1000,
      pricePerUnit: '0.45',
      updatedOn: '',
      createdOn: '',
      decaf: true,
      nonDairy: false,
      glutenFree: true,
      limit: 2,
      amount: 1,
    }
  ],
  name: 'Pumpkin Spice',
  price: 0.0,
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
    frappe,
    {
      id: 1,
      creator: 'David@David.com',
      milk: Milk.Whole_Milk,
      base: Base.Cream,
      size: Size.Small,
      createDate: '',
      extras: [
        {
          id: Extras.Sugar,
          name: 'Sugar',
          stock: 1000,
          pricePerUnit: '0.45',
          updatedOn: '',
          createdOn: '',
          decaf: true,
          nonDairy: true,
          glutenFree: true,
          limit: 3,
          amount: 4,
        },
        {
          id: Extras.Secret_Sauce,
          name: 'Secret Sauce',
          stock: 10,
          pricePerUnit: '20.00',
          updatedOn: '',
          createdOn: '',
          decaf: true,
          nonDairy: false,
          glutenFree: false,
          limit: 1,
          amount: 2,
        },
        {
          id: Extras.Vanilla,
          name: 'Vanilla',
          stock: 1000,
          pricePerUnit: '0.30',
          updatedOn: '',
          createdOn: '',
          decaf: true,
          nonDairy: true,
          glutenFree: true,
          limit: 4,
          amount: 3,
        },
      ],
      name: 'Apple Crisp',
      price: 0.0,
    },
    {
      id: 2,
      creator: 'David@David.com',
      milk: Milk.Whole_Milk,
      base: Base.Cream,
      size: Size.Small,
      createDate: '',
      extras: [],
      name: 'Vanilla Bean',
      price: 0.0,
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
          <Route path='/customize' element={<CustomizeDrink frappe={frappe}/>} />
          <Route path='/cart' element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </div>
  )}

export default App;
