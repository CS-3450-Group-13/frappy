import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';
import Confirmation from './Confirmation';
import { Frappe, Milk, Base, Size, Extras } from '../types/Types';

const drinks: Frappe[] = [
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Cream,
    size: Size.Medium,
    createDate: '',
    extras: [
      {
        id: Extras.Pumpkin_Sauce,
        name: 'Pumpkin Sauce',
        stock: 1000,
        pricePerUnit: '0.80',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: true,
        glutenFree: true,
        limit: 3,
        amount: 2,
      },
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'Pumpkin Spice',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Cream,
    size: Size.Medium,
    createDate: '',
    extras: [
      {
        id: Extras.Secret_Sauce,
        name: 'Secret Sauce',
        stock: 1000,
        pricePerUnit: '0.80',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: true,
        glutenFree: true,
        limit: 3,
        amount: 2,
      },
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'Apple Crisp',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Cream,
    size: Size.Medium,
    createDate: '',
    extras: [
      {
        id: Extras.Pumpkin_Sauce,
        name: 'Pumpkin Sauce',
        stock: 1000,
        pricePerUnit: '0.80',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: true,
        glutenFree: true,
        limit: 3,
        amount: 2,
      },
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'Mocha Cookie Crumble',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Cream,
    size: Size.Medium,
    createDate: '',
    extras: [
      {
        id: Extras.Pumpkin_Sauce,
        name: 'Pumpkin Sauce',
        stock: 1000,
        pricePerUnit: '0.80',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: true,
        glutenFree: true,
        limit: 3,
        amount: 2,
      },
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'Caramel Ribbon Crunch',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Cream,
    size: Size.Medium,
    createDate: '',
    extras: [
      {
        id: Extras.Pumpkin_Sauce,
        name: 'Pumpkin Sauce',
        stock: 1000,
        pricePerUnit: '0.80',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: true,
        glutenFree: true,
        limit: 3,
        amount: 2,
      },
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'Vanilla Bean',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Cream,
    size: Size.Medium,
    createDate: '',
    extras: [
      {
        id: Extras.Pumpkin_Sauce,
        name: 'Pumpkin Sauce',
        stock: 1000,
        pricePerUnit: '0.80',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: true,
        glutenFree: true,
        limit: 3,
        amount: 2,
      },
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'White Chocolate',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Mocha,
    size: Size.Small,
    createDate: '',
    extras: [
      {
        id: Extras.Whip_Cream,
        name: 'Whip Cream',
        stock: 1000,
        pricePerUnit: '0.45',
        updatedOn: '',
        createdOn: '',
        decaf: true,
        nonDairy: false,
        glutenFree: true,
        limit: 2,
        amount: 1,
      }
    ],
    name: 'Java Chip',
    price: 0.0,
  },
  {
    id: 0,
    creator: 'David@David.com',
    milk: Milk.Whole_Milk,
    base: Base.Coffee,
    size: Size.Large,
    createDate: '',
    extras: [],
    name: 'Custom Drink',
    price: 0.0,
  },
];

export default function Menu() {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const drinkCards = drinks.map((drink) => 
    <div className='drinkCard' >
      <DrinkCard key={drink.id} frappe={drink}/>
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
