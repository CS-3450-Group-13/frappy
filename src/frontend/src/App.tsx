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
import { CompleteFrappe } from './types/Types';
import { TestFrappes, TestMenu } from './tests/TestServerData';
import Queue from './pages/Queue';
import MangerEditAccounts from './pages/MangerEditAccounts';
import ManagerEditMenu from './pages/ManagerEditMenu';
import { AuthProvider } from './components/auth';
import CustomerRoutes from './components/CustomerRoutes';
import EmployeeRoutes from './components/EmployeeRoutes';
import ManagerRoutes from './components/ManagerRoutes';

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
    balance: 0,
    accountType: '',
    hours: 0.0,
    authKey: '',
  });

  const [cart, setCart] = useState<CompleteFrappe[]>([]);
  const [frappes, setFrappes] = useState(TestFrappes); // TODO query these from the server
  const [completeFrappes, setCompleteFrappes] = useState<Array<CompleteFrappe>>(
    []
  );

  // Map up all the known menu items with existing frappes
  useEffect(() => {
    setCompleteFrappes([]);

    TestMenu.forEach((menuItem) => {
      let frappe = frappes.find((item) => item.id === menuItem.frappe);

      if (frappe !== undefined) {
        let completeFrappe = {
          frappe: frappe,
          menu_item: menuItem,
        };

        console.log('Found frappe that matches menu item:', menuItem, frappe);
        setCompleteFrappes((oldState) => [...oldState, completeFrappe]);
      }
    });
  }, []);

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
              <Route path="/home-page" element={<Home />} />
              <Route path="/order-status" element={<OrderStatus />} />
              <Route
                path="/menu"
                element={<Menu menuItems={completeFrappes} />}
              ></Route>
              <Route
                path="/customize"
                element={<CustomizeDrink frappe={completeFrappes[5]} />}
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
                    element={<MangerEditAccounts />}
                  />
                  <Route path="/edit-menu" element={<ManagerEditMenu />} />
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
// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }
