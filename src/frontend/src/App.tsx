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
  const [authKey, setAuthKey] = useState('');

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
      <Router>
        <NavBar pages={pages} />
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setPages={setPages}
                authKey={authKey}
                setAuthKey={setAuthKey}
              />
            }
          />
          <Route path="/new-user" element={<NewUser />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }
