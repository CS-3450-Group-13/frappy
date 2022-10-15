import React from 'react';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';

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
  const drinkCards = drinks.map((drink) => 
    <div className='drinkCard'>
      <DrinkCard key={drink.id} drink={drink}/>
    </div>
  );

  return (
    <div className='menu-container'>
      <div className='heading'>CHOOSE YOUR FRAPPY:</div>
      <div className='drinkList'>
        {drinkCards}
      </div>
    </div>
  );
}
