import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';
import './css/App.css';
import CustomizeDrink from './pages/CustomizeDrink';
import Login from './components/Login';
import NewUser from './components/NewUser';
import OrderStatus from './pages/OrderStatus';
import Menu from './pages/Menu';
import Account from './pages/Account';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { CompleteFrappe } from './types/Types';
import { TestFrappes, TestMenu } from './tests/TestServerData';

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

      const [frappes, setFrappes] = useState(TestFrappes); // TODO query these from the server
      const [completeFrappes, setCompleteFrappes] = useState<Array<CompleteFrappe>>([]);
    
      // Map up all the known menu items with existing frappes
      useEffect(() => {
        TestMenu.forEach((menuItem) =>{
          let frappe = frappes.find((item) => item.id === menuItem.frappe);
    
          if (frappe !== undefined) {
            let completeFrappe = {
              frappe: frappe,
              menu_item: menuItem,
            };
      
            setCompleteFrappes([...completeFrappes, completeFrappe])
          }
        });
      }, []);

  return (
    <Routes>
    <Route index element={ <Login setPages={setPages} />} />
    <Route path='/new-user' element={ <NewUser />} />
    <Route path='/home' element={<Home />} />
    <Route path='/order-status' element={<OrderStatus />} />
    <Route path='/menu' element={<Menu menuItems={completeFrappes}/>} >
      <Route path='/menu/customize' element={<CustomizeDrink frappe={completeFrappes[0]}/>} />
    </Route>
    <Route path='/account' element={<Account />} />
  </Routes>
  )
}
