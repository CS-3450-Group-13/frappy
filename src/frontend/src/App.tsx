import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import NewUser from './pages/NewUser';
import OrderStatus from './pages/OrderStatus';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import { MenuItem } from './types/Types';
import { TestFrappes, TestMenu } from './tests/TestServerData';
import Queue from './pages/Queue';
import ManagerEditAccounts from './pages/ManagerEditAccounts';
import ManagerEditMenu from './pages/ManagerEditMenu';
import { AuthProvider } from './components/auth';
import CustomerRoutes from './components/CustomerRoutes';
import EmployeeRoutes from './components/EmployeeRoutes';
import ManagerRoutes from './components/ManagerRoutes';
import ManagerEditInventory from './pages/ManagerEditInventory';

function App() {
  const [pages, setPages] = useState([
    {
      title: 'Login',
      path: '/',
    },
    {
      title: 'New User',
      path: '/new-user',
    },
  ]);
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    balance: '',
    accountType: '',
    hours: '',
    authKey: '',
  });

  const [cart, setCart] = useState<MenuItem[]>([]);
  const [frappes, setFrappes] = useState(TestFrappes); // TODO query these from the server
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([]);
  const [authKey, setAuthKey] = useState('');
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavBar pages={pages} setPages={setPages} />
          <Routes>
            <Route
              path="/"
              element={
                <Login setPages={setPages} user={user} setUser={setUser} />
              }
            />
            <Route path="/new-user" element={<NewUser />} />

            <Route element={<CustomerRoutes />}>
              <Route path="/home-page" element={<Home authKey={authKey} />} />
              <Route path="/order-status" element={<OrderStatus />} />
              <Route
                path="/menu"
                element={<Menu cart={cart} setCart={setCart} />}
              />
              <Route
                path="/customize"
                element={<CustomizeDrink setCart={setCart} />}
              />
              <Route
                path="/cart"
                element={<Cart cart={cart} setCart={setCart} />}
              />
              <Route path="/account" element={<Account />} />
              <Route element={<EmployeeRoutes />}>
                <Route path="/queue" element={<Queue />} />
                <Route element={<ManagerRoutes />}>
                  <Route
                    path="/edit-accounts"
                    element={<ManagerEditAccounts />}
                  />
                  <Route path="/edit-menu" element={<ManagerEditMenu />} />
                  <Route
                    path="/edit-inventory"
                    element={<ManagerEditInventory />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
