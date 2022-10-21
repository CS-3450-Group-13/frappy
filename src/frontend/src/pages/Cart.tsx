import React, { Dispatch, SetStateAction } from 'react';
import ItemCartDisplay from '../components/ItemCartDisplay';

import '../css/Cart.css'

// TODO: make the drink interface actually match what the server gives
interface Drink {
  name: string;
  id: number;
  inStock: boolean;
  size: string;
  price: number;
}

type Props = {
  cart: Drink[];
  setCart: Dispatch<SetStateAction<{ name: string; id: number; inStock: boolean; size: string; price: number; }[]>>;
}

export default function Cart({cart, setCart}: Props) {

  const removeItemFromCart = (drink: Drink) => {
    // Do something with setCart here
    alert('customer wants to remove item from cart')
  }

  const calculateTotal = () => {
    // calculate total here
    return <div>TOTAL:</div>
  }

  return (
    <div className='cart-container'>
      CART:
      <div className='cart-items-container'>
        <div>
          {cart.map((drink) => {
            return (
              <div className='cart-items'>
                <ItemCartDisplay drink={drink} removeItemFromCart={removeItemFromCart} />
              </div>
            )
          })}
        </div>
        <div>{calculateTotal()}</div>
        <div className='cart-decision-btns'>
          <div>BACK TO MENU</div>
          <div>PLACE ORDER</div>
        </div>
      </div>
    </div>
  );
}
