import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';
import Confirmation from './Confirmation';
import { MenuItem } from '../types/Types';
import { useAuth } from '../components/auth';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { totalmem } from 'os';

type Props = {
  cart: MenuItem[];
  setCart: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

export default function Menu({ cart, setCart }: Props) {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>();
  const [loginOpen, setLoginOpen] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems([]);
        data.forEach((item: MenuItem) => {
          setMenuItems((oldState) => [...oldState, item]);
        });
        console.log('data is ', data);
        console.log(menuItems);
        setCurrentFrappe(menuItems[0]);
        console.log('current frappe is ');
        console.log(currentFrappe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loginCustomer = () => {
    let email = document.getElementById('new-email') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;
    let body = {
      email: email.value,
      password: password.value,
    };
    fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((LoginData) => {
        if (LoginData.key) {
          fetch('http://127.0.0.1:8000/users/users/current_user/', {
            headers: {
              Authorization: `Token ${LoginData.key}`,
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
          })
            .then((response) => response.json())
            .then((CurrentUserdata) => {
              console.log(CurrentUserdata);
              auth?.setCustomer({
                email: email.value,
                name:
                  CurrentUserdata.first_name + ' ' + CurrentUserdata.last_name,
                key: LoginData.key,
              });
              setLoginOpen(false);
              toast.success(
                `Logged in for ${
                  CurrentUserdata.first_name + ' ' + CurrentUserdata.last_name
                }`
              );
            });
        } else {
          toast.error(`Could not login for ${email.value}`);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const drinkCards = menuItems.map((frappe) => (
    <div className="drinkCard">
      <DrinkCard key={frappe.frappe.id} frappe={frappe} />
      <button
        className="customize-btn"
        onClick={() => {
          setCurrentFrappe(frappe);

          navigate('/customize', {
            state: {
              drink: frappe,
              cart: cart,
              isNewDrink: true,
              // setCart: setCart,
              // setCurrentFrappe: setCurrentFrappe,
            },
          });
        }}
      >
        ORDER
      </button>
      {auth?.userInfo.role === 'employee' && (
        <button
          className="customize-btn"
          onClick={() => {
            setCurrentFrappe(frappe);

            navigate('/customize', {
              state: {
                drink: frappe,
                cart: cart,
                isNewDrink: true,
                // setCart: setCart,
                // setCurrentFrappe: setCurrentFrappe,
              },
            });
          }}
        >
          ORDER FOR CUSTOMER
        </button>
      )}
      {auth?.userInfo.role === 'manager' && (
        <button
          className="customize-btn"
          onClick={() => {
            setCurrentFrappe(frappe);

            navigate('/customize', {
              state: {
                drink: frappe,
                cart: cart,
                isNewDrink: true,
                // setCart: setCart,
                // setCurrentFrappe: setCurrentFrappe,
              },
            });
          }}
        >
          ORDER FOR CUSTOMER
        </button>
      )}
    </div>
  ));

  return (
    <div className="menu-container">
      <div className="heading">
        CHOOSE YOUR FRAPPY:{' '}
        <button
          className="checkout-btn"
          onClick={() => {
            navigate('/cart');
          }}
        >
          Checkout
        </button>
        {auth?.userInfo.role === 'manager' && (
          <button
            className="checkout-btn login"
            onClick={() => {
              setLoginOpen(true);
            }}
          >
            LoginCustomer
          </button>
        )}
        {auth?.userInfo.role === 'employee' && (
          <button
            className="checkout-btn login"
            onClick={() => {
              setLoginOpen(true);
            }}
          >
            LoginCustomer
          </button>
        )}
      </div>
      <div className="drinkList">{drinkCards}</div>
      <Modal className="login-modal" isOpen={loginOpen}>
        <div className="login-modal-container">
          <label>Customer Email:</label>
          <input type="email" id="new-email"></input>
          <label>Customer Password:</label>
          <input type="text" id="password"></input>
          <button onClick={() => loginCustomer()}>Login Customer</button>
          <button onClick={() => setLoginOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
}
