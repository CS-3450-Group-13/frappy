import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import ItemCartDisplay from '../components/ItemCartDisplay';
import { Frappe, SizeOptions, MenuItem, User } from '../types/Types';
import { TestBases, TestExtras, TestMilks } from '../tests/TestServerData';
import '../css/Cart.css';
import { useNavigate } from 'react-router-dom';
import { FrappeExtra } from '../types/Types';
import { useAuth } from '../components/auth';
import Confirmation from './Confirmation';
import { toast } from 'react-toastify';

type Props = {
  cart: Array<MenuItem>;
  setCart: Dispatch<SetStateAction<MenuItem[]>>;
};

const emptyUser: User = {
  id: 0,
  last_login: "",
  first_name: "",
  last_name: "",
  is_active: true,
  dat_joined: "",
  email: "",
  balance: "",
  user_permissions: [],
}

export default function Cart({ cart, setCart }: Props) {
  const [total, setTotal] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [customer, setCustomer] = useState<User>(emptyUser);

  const navigate = useNavigate();
  const auth = useAuth();
  let user = auth?.userInfo;

  useEffect(() => {
    setTotal(calculateTotal);
  }, [cart]);

  /**
   * @brief Callback for handling when the user wants to remove an item from the cart
   * @param item The cart item they want to remove
   * @returns Nothing
   */
  const removeItemFromCart = (
    idx: number
  ): MouseEventHandler<HTMLDivElement> | undefined => {
    setCart(
      cart.filter((item, index) => {
        return index != idx;
      })
    );
    return;
  };

  /**
   * @brief Calculates the total across all frappes in the cart
   * @note this is currently only relying on frontend data
   * @returns The total value of all frappes in the cart
   */
  const calculateTotal = () => {
    let total = 0.0;

    // Find the price of each frappe based on the ingredients
    cart.forEach(({ frappe }) => {
      total += frappe.final_price;
    });

    return total;
  };

  /**
   * @brief Callback for handling when the user wants to go back to the menu
   */
  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const handleVerifyCustomer = () => {
    setCustomer(emptyUser);
    if (customerEmail.length > 0) {
      console.log("attempting to get user information for ", customerEmail);
      fetch(`http://127.0.0.1:8000/users/users/?email=${customerEmail}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${user?.key}`,
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 1) {
          toast.error("Cannot find customer " + customerEmail);
          return;
        }

        // Pretty sure data.detail is only for errors (the promise doesn't catch these
        // because they get returned as ok?). Hopefully this never happens but let them
        // know that something bad happened
        if (data.detail) {
            toast.error(data.detail);
            return;
          }
        
        // Customer comes in as an array for some reason... probably because query 
        // doesn't know that emails are unique
        setCustomer(data[0]);
        setVerifiedEmail(customerEmail);
      })
      .catch((err) => console.log('got error: ', err));
    }
  };

  /**
   * @brief Callback for handling when the user wants to place their order
   */
  const handlePlaceOrder = () => {
    cart.forEach((frappe) => {
      let tmp = {
        user: 'Deez nuts',
        milk: frappe.frappe.milk,
        base: frappe.frappe.base,
        extras: frappe.frappe.extras,
        menu_key: frappe.frappe.menu_key,
        size: frappe.frappe.size,
        comments: 'for testing',
      };

      // Server doesn't want the frappe key for each extra
      tmp.extras.forEach((extra) => {
        delete extra.frappe;
      });

      fetch('http://127.0.0.1:8000/frappapi/frappes/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${user?.key}`,
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(tmp),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('got response: ', data);
        })
        .catch((err) => console.log('got error: ', err));
    });
    navigate('/order-status');
  };

  const handleCustomerEmailChange = (text: string) => {
    setCustomerEmail(text);
  }

  return (
    <div className="cart-container">
      CART:
      <div className="cart-items-container">
        <div>
          {cart.map((frappe, idx) => {
            return (
              <div className="cart-items">
                <ItemCartDisplay
                  item={frappe}
                  cart={cart}
                  removeItemFromCart={removeItemFromCart}
                  idx={idx}
                />
              </div>
            );
          })}
        </div>
        <div className="cart-total-container">
          TOTAL:
          <div className="cart-total">${total.toFixed(2)}</div>
        </div>
        {user?.role !== "customer" &&
          <div className="cart-customer-order-container">
            <div className="cart-customer-order-text">
              Ordering on behalf of a customer? Verify their account here:
            </div>
            <input
              className="cart-customer-name-tb" 
              type="text"
              placeholder="customer email"
              onChange={(e) => handleCustomerEmailChange(e.target.value)}
            />
            <div
              className="cart-verify-customer-btn"
              onClick={handleVerifyCustomer}
            >
              verify
            </div>
          </div>
        }
        { user?.role !== "customer" && customer.id > 0 && parseFloat(customer.balance) < total &&
          <div className='cart-customer-balance-invalid'>Customer balance is too low</div>
        }
        { user?.role !== "customer" && customer.id > 0 &&
          <div className='cart-customer-balance-valid'>User {verifiedEmail} was successfully verified</div>
        }
        <div className="cart-decision-btns">
          <div
            className="cart-back-btn"
            onClick={() => {
              handleBackToMenu();
            }}
          >
            BACK TO MENU
          </div>
          <div
            className="cart-place-order-btn"
            onClick={() => {
              setCheckoutOpen(true);
            }}
          >
            CHECKOUT
          </div>
        </div>
      </div>
      <Confirmation
        open={checkoutOpen}
        cart={cart}
        setCart={setCart}
        setOpen={() => setCheckoutOpen(false)}
        userId={customer.id}
        userRole={user?.role}
        total={total}
      />
    </div>
  );
}
