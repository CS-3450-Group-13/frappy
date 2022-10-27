import React, { MouseEventHandler } from 'react';
import { Frappe, MenuItem } from '../types/Types';

import '../css/ItemCartDisplay.css';

type Props = {
  item: MenuItem;
  removeItemFromCart: (item: MenuItem) => MouseEventHandler<HTMLDivElement> | undefined;
}

export default function ItemCartDisplay({item, removeItemFromCart}: Props) {

  const handleEditDrink = () => {
    alert('User wants to edit drink ' + item);
  }

  return (
    <div className='item-cart-container'>
      <div className='item-cart-lhs'>
        <div>{item.frappe.size} {item.name}</div>
      </div>
      <div className='item-cart-rhs'>
        <div>${item.frappe.final_price.toFixed(2)}</div>
        <div className='item-cart-edit-btn'
          onClick={handleEditDrink}
        >
          Edit
        </div>
        <div className='item-cart-remove-btn'
          onClick={() => {removeItemFromCart(item)}}
        >
          X
        </div>
      </div>
    </div>
  );
}