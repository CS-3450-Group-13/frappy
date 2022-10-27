import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import ItemCartDisplay from '../components/ItemCartDisplay';
import { Frappe, SizeOptions, MenuItem } from '../types/Types';
import { TestBases, TestExtras, TestMilks } from '../tests/TestServerData';
import '../css/Cart.css'

type Props = {
  cart: Array<MenuItem>;
  setCart: Dispatch<SetStateAction<MenuItem[]>>;
}

export default function Cart({cart, setCart}: Props) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calculateTotal);
  }, [cart]);

  /**
   * @brief Callback for handling when the user wants to remove an item from the cart
   * @param item The cart item they want to remove 
   * @returns Nothing
   */
  const removeItemFromCart = (item: MenuItem): MouseEventHandler<HTMLDivElement> | undefined => {
    // Do something with setCart here
    alert('customer wants to remove item from cart');
    return;
  }

  /**
   * @brief Calculates the total across all frappes in the cart
   * @note this is currently only relying on frontend data
   * @returns The total value of all frappes in the cart
   */
  const calculateTotal = () => {
    let total = 0.0;

    // Find the price of each frappe based on the ingredients
    cart.forEach(({frappe}) => {
      let frappePrice = 0.0;
  
      // Calculate the cost of all the extras in the cart
      frappe.extras.forEach((extra) => {
        let frappeExtra = TestExtras.find((item) => item.id === extra.extras);

        if (frappeExtra) {
          frappePrice += extra.amount * parseFloat(frappeExtra.price_per_unit);
        }
      });

      const milk = TestMilks.find((item) => item.id === frappe.milk);
      const base = TestBases.find((item) => item.id === frappe.base);

      // TODO find out what the price of each size is. Somehow need to factor in markup
      if (milk) {
        frappePrice += (frappe.size * parseFloat(milk.price_per_unit))
      }
      if (base) {
        frappePrice += (frappe.size * parseFloat(base.price_per_unit));
      }

      frappe.final_price = frappePrice;
      total += frappePrice;
    });

    return total;
  }

  /**
   * @brief Callback for handling when the user wants to go back to the menu
   */
  const handleBackToMenu = () => {
    alert('Customer wants to go back to the menu');
  }

  /**
   * Callback for handling when the user wants to place their order
   */
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
                <ItemCartDisplay item={frappe} removeItemFromCart={removeItemFromCart} />
              </div>
            )
          })}
        </div>
        <div className='cart-total-container'>TOTAL: 
          <div className='cart-total'>${total.toFixed(2)}</div>
        </div>
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
