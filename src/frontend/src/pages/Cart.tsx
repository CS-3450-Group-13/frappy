import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import ItemCartDisplay from '../components/ItemCartDisplay';
import { Frappe, Size } from '../types/Types';
import '../css/Cart.css'

type Props = {
  cart: Frappe[];
  setCart: Dispatch<SetStateAction<Frappe[]>>;
}

export default function Cart({cart, setCart}: Props) {

  const removeItemFromCart = (frappe: Frappe): MouseEventHandler<HTMLDivElement> | undefined => {
    // Do something with setCart here
    alert('customer wants to remove item from cart');
    return;
  }

  const calculatePriceForFrappe = () => {
    let price = 0.0;

    cart.forEach((frappe) => {
      if (frappe.size === Size.Small) {
        price += 2.00;
      }
      else if (frappe.size === Size.Medium) {
        price += 3.00;
      }
      else {
        price += 4.00;
      }

      frappe.extras.forEach((extra) => {
        let pricePerUnit = parseFloat(extra.pricePerUnit);
        price += (pricePerUnit * extra.amount);
      });

      frappe.price = price;
    });
  }

  const calculateTotal = () => {
    let total = 0.0;
    cart.forEach((frappe) => {
      total += frappe.price;
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
          {cart.map((frappe) => {
            return (
              <div className='cart-items'>
                <ItemCartDisplay frappe={frappe} removeItemFromCart={removeItemFromCart} />
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
