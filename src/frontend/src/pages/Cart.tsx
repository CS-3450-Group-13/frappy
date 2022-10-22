import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
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

  const removeItemFromCart = (drink: Drink): MouseEventHandler<HTMLDivElement> | undefined => {
    // Do something with setCart here
    alert('customer wants to remove item from cart');
    return;
  }

  const calculateTotal = () => {
    let total = 0.0;
    cart.forEach((drink) => {
      total += drink.price;
    });

    return <div className='cart-total'>${total}</div>
  }

  const handleBackToMenu = () => {
    alert('Customer wants to go back to the menu');
  }

  const handlePlaceOrder = () => {
    alert('Customer wants to place their order');
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
        <div className='cart-total-container'>TOTAL: {calculateTotal()}</div>
        <div className='cart-decision-btns'>
          <div className='cart-back-btn'
            onClick={() => {handleBackToMenu()}}
          >
            BACK TO MENU
          </div>
          <div className='cart-place-order-btn'
            onClick={() => {handlePlaceOrder()}}
          >
            PLACE ORDER
          </div>
        </div>
      </div>
    </div>
  );
}
