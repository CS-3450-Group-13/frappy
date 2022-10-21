import React from 'react';

import '../css/ItemCartDisplay.css';

interface Drink {
  name: string;
  id: number;
  inStock: boolean;
  size: string;
  price: number;
}

type Props = {
  drink: Drink;
  removeItemFromCart: (drink: Drink) => void;
}

export default function ItemCartDisplay({drink, removeItemFromCart}: Props) {
  return (
    <div className='item-cart-container'>
      <div className='item-cart-lhs'>
        <div>{drink.size} {drink.name}</div>
      </div>
      <div className='item-cart-rhs'>
        <div>${drink.price}</div>
        <div>Edit</div>
        <div className='item-cart-remove-btn'>X</div>
      </div>
    </div>
  );
}