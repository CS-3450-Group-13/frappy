import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';
import Confirmation from './Confirmation';
import { MenuItem } from '../types/Types';

export default function Menu() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
    .then((response) => response.json())
    .then((data) => {
      setMenuItems([]);
      data.forEach((item: MenuItem) => {
        setMenuItems(oldState => [...oldState, item]);
      });
      console.log("data is ", data);
      console.log(menuItems)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const drinkCards = menuItems.map((frappe) => 
    <div className='drinkCard' >
      <DrinkCard key={frappe.frappe.id} frappe={frappe}/>
      <button className='customize-btn' onClick={() => {
        setCurrentFrappe(frappe);

      navigate('/customize', {state:{
        drink: currentFrappe,
        setCurrentFrappe: setCurrentFrappe,
      }});
    }}>ORDER</button>
    </div>
  );

  return (
    <div className='menu-container'>
      <div className='heading'>CHOOSE YOUR FRAPPY: <button className='checkout-btn'
      onClick={()=>{setCheckoutOpen(true);}}>Checkout</button></div>
      <div className='drinkList'>
        {drinkCards}
      </div>
      <Confirmation open={checkoutOpen} setOpen={()=>setCheckoutOpen(false)} />
    </div>
  );
}
