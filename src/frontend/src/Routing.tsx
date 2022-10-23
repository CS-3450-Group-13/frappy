import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
import Login from './components/Login';
import NewUser from './components/NewUser';
import OrderStatus from './pages/OrderStatus';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Home from './pages/Home';
import { useState } from 'react';
import { Frappe, MilkOptions, BaseOptions, SizeOptions, ExtraOptions } from './types/Types';

const frappe: Frappe = {
  id: 0,
  creator: 'David@David.com',
  milk: MilkOptions.Whole_Milk,
  base: BaseOptions.Cream,
  size: SizeOptions.Medium,
  createDate: '',
  extras: [
    {
      id: ExtraOptions.Pumpkin_Sauce,
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
      id: ExtraOptions.Whip_Cream,
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

export default function Routing() {
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
    <Routes>
    <Route index element={ <Login setPages={setPages} />} />
    <Route path='/new-user' element={ <NewUser />} />
    <Route path='/home' element={<Home />} />
    <Route path='/order-status' element={<OrderStatus />} />
    <Route path='/menu' element={<Menu />} >
      <Route path='/menu/customize' element={<CustomizeDrink frappe={frappe}/>} />
    </Route>
    <Route path='/account' element={<Account />} />
  </Routes>
  )
}
