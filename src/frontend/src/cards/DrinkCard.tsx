import React from 'react';
import '../css/DrinkCard.css';

interface Drink {
  name: string;
  id: number;
  inStock: boolean;
}

type Props = {
  drink: Drink;
}

export default function DrinkCard({drink}: Props) {
  return (
    <div className='drinkCard-container'>
      <div className='idk'> 
        <img className='circle image' src={ require('../images/Frappe.jpg') } />
      </div>
      <p className='drink-name'>{drink.name}</p>
    </div>
  );
}
