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

const drink = {
  name: 'Pumpkin Spice',
  id: 0,
  inStock: true,
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
      <Route path='/menu/customize' element={<CustomizeDrink drink={drink}/>} />
    </Route>
    <Route path='/account' element={<Account />} />
  </Routes>
  )
}
