import React, { MouseEventHandler } from 'react';

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
  removeItemFromCart: (drink: Drink) => MouseEventHandler<HTMLDivElement> | undefined;
}

export default function ItemCartDisplay({drink, removeItemFromCart}: Props) {

  const handleEditDrink = () => {
    alert('User wants to edit drink ' + drink);
  }

  return (
    <div className='item-cart-container'>
      <div className='item-cart-lhs'>
        <div>{drink.size} {drink.name}</div>
      </div>
      <div className='item-cart-rhs'>
        <div>${drink.price}</div>
        <div className='item-cart-edit-btn'
          onClick={handleEditDrink}
        >
          Edit
        </div>
        <div className='item-cart-remove-btn'
          onClick={() => {removeItemFromCart(drink)}}
        >
          X
        </div>
      </div>
    </div>
  );
}