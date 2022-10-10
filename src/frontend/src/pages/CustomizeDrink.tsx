import React from 'react';
import DrinkCard from '../cards/DrinkCard';
import '../css/DrinkCard.css';
import '../css/CustomizeDrink.css';

// interface Drink {
//   name: string;
//   id: number;
//   inStock: boolean;
//   contents: {
//     base: string;
//     addins: {
//       "Vanilla Syrup": 1,
//       "Secret Sauce": 2,
//       "Whip Cream": 1,
//     };
//   }
// }


interface Drink {
  name: string;
  id: number;
  inStock: boolean;
}

type Props = {
  drink: Drink;
}

const drinkContents = {
  base: "Soy Milk",
  addins: {
    "Vanilla Syrup": 1,
    "Secret Sauce": 2,
    "Whip Cream": 1,
  },
};

export default function CustomizeDrink({drink}: Props) {

  return (
    <div className='customizeDrink-container'>
      <div className='drink-details'>
        <DrinkCard drink={drink}/>
        <div className='customization-list'>
          Customization list
          <ul>
            <li>Soy Milk</li>
            <li>1 Pump Vanilla Syrup</li>
            <li>2 Pumps Secret Sauce</li>
            <li>Whip Cream</li>
          </ul>
        </div>
      </div>
      <div className='customization-selection'>
        <div className='size-options'>
          <div>Small</div>
          <div>Medium</div>
          <div>Large</div>
        </div>
      </div>
    </div>
  );
}
