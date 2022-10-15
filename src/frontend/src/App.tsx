import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route }  from 'react-router-dom';

import './css/App.css';
import Login from './components/Login';
import NavBar from './components/NavBar';
import NewUser from './components/NewUser';
import Home from './pages/Home';
import OrderStatus from './pages/OrderStatus';

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
          <Route index element={ <Login setPages={setPages} />} />
          <Route path='/new-user' element={ <NewUser />} />
          <Route path='/home' element={<Home />} />
          <Route path='/order-status' element={<OrderStatus />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
