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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main component rendered for the application. This function uses react routing for navigation
// and assigning of url paths to different components and pages throughout the entire project.
function App() {
  // pages in the navbar
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
  const [cart, setCart] = useState<MenuItem[]>([]);

  // Uses AuthProvider to get userinfo throughout entire app
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <ToastContainer />
          <NavBar pages={pages} setPages={setPages} />
          <Routes>
            <Route path="/" element={<Login setPages={setPages} />} />
            <Route path="/new-user" element={<NewUser setPages={setPages} />} />

            <Route element={<CustomerRoutes />}>
              <Route path="/home-page" element={<Home />} />
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
