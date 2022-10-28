import React, { MouseEventHandler } from 'react';
import { Frappe, MenuItem } from '../types/Types';

import '../css/ItemCartDisplay.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: MenuItem;
  cart: MenuItem[];
  removeItemFromCart: (item: number) => MouseEventHandler<HTMLDivElement> | undefined;
  idx: number
}

export default function ItemCartDisplay({item, cart, removeItemFromCart, idx}: Props) {
  const navigate = useNavigate();

  const handleEditDrink = () => {
    navigate('/customize', {state:{
      drink: item,
      cart: cart,
      // setCart: setCart,
      // setCurrentFrappe: setCurrentFrappe,
    }});
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
          onClick={() => {removeItemFromCart(idx)}}
        >
          X
        </div>
      </div>
    </div>
  );
}