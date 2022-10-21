import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';
import Confirmation from './Confirmation';

interface Drink {
  name: string;
  id: number;
  inStock: boolean;
}

const drinks: Drink[] = [
  {
    name: "Pumpkin Spice",
    id: 0,
    inStock: true,
  },
  {
    name: "Apple Crisp",
    id: 1,
    inStock: true,
  },
  {
    name: "Mocha Cookie Crumble",
    id: 2,
    inStock: true,
  },
  {
    name: "Caramel Ribbon Crunch",
    id: 3,
    inStock: true,
  },
  {
    name: "Vanilla Bean",
    id: 4,
    inStock: false,
  },
  {
    name: "White Chocolate",
    id: 5,
    inStock: false,
  },
  {
    name: "Java Chip",
    id: 6,
    inStock: true,
  },
  {
    name: "Custom Drink",
    id: 7,
    inStock: true
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const drinkCards = drinks.map((drink) => 
    <div className='drinkCard' >
      <DrinkCard key={drink.id} drink={drink}/>
      <button className='customize-btn' onClick={() => {
      navigate('/customize', {state:{
        drink: drink,
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
