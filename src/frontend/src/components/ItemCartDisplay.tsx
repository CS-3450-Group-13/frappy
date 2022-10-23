import React, { MouseEventHandler } from 'react';
import { Frappe } from '../types/Types';

import '../css/ItemCartDisplay.css';

type Props = {
  frappe: Frappe;
  removeItemFromCart: (frappe: Frappe) => MouseEventHandler<HTMLDivElement> | undefined;
}

export default function ItemCartDisplay({frappe, removeItemFromCart}: Props) {

  const handleEditDrink = () => {
    alert('User wants to edit drink ' + frappe);
  }

  return (
    <div className='item-cart-container'>
      <div className='item-cart-lhs'>
        <div>{frappe.size} {frappe.name}</div>
      </div>
      <div className='item-cart-rhs'>
        <div>${frappe.price.toFixed(2)}</div>
        <div className='item-cart-edit-btn'
          onClick={handleEditDrink}
        >
          Edit
        </div>
        <div className='item-cart-remove-btn'
          onClick={() => {removeItemFromCart(frappe)}}
        >
          X
        </div>
      </div>
    </div>
  );
}