import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react';
import ItemCartDisplay from '../components/ItemCartDisplay';
import { Frappe, SizeOptions, CompleteFrappe } from '../types/Types';
import '../css/Cart.css'

type Props = {
  cart: Array<CompleteFrappe>;
  setCart: Dispatch<SetStateAction<CompleteFrappe[]>>;
}

export default function Cart({cart, setCart}: Props) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calculateTotal);
  }, []);

  /**
   * @brief Callback for handling when the user wants to remove an item from the cart
   * @param item The cart item they want to remove 
   * @returns Nothing
   */
  const removeItemFromCart = (item: CompleteFrappe): MouseEventHandler<HTMLDivElement> | undefined => {
    // Do something with setCart here
    alert('customer wants to remove item from cart');
    return;
  }

  /**
   * @brief Calculates the total across all frappes in the cart
   * @note this is currently only relying on frontend data
   * @note **This function assumes the MenuItem portion of the CompleteFrappe
   *         has had it's price filled out when the user added the item to the cart**
   * @returns The total value of all frappes in the cart
   */
  const calculateTotal = () => {
    let total = 0.0;

    cart.forEach(({menu_item}) => {
      total += menu_item.price;
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
          {cart.map((item) => {
            return (
              <div className='cart-items'>
                <ItemCartDisplay item={item} removeItemFromCart={removeItemFromCart} />
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
