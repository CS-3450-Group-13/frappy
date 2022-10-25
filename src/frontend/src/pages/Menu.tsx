import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';
import Confirmation from './Confirmation';
import { CompleteFrappe } from '../types/Types';

type Props = {
  menuItems: Array<CompleteFrappe>;
}

export default function Menu({menuItems}: Props) {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const drinkCards = menuItems.map((frappe) => 
    <div className='drinkCard' >
      <DrinkCard key={frappe.frappe.id} frappe={frappe}/>
      <button className='customize-btn' onClick={() => {
      navigate('/customize', {state:{
        drink: frappe,
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
