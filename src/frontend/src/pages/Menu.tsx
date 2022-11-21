import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkCard from '../cards/DrinkCard';
import '../css/Menu.css';
import { MenuItem } from '../types/Types';

type Props = {
  cart: MenuItem[];
  setCart: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

export default function Menu({ cart, setCart }: Props) {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems([]);
        data.forEach((item: MenuItem) => {
          setMenuItems((oldState) => [...oldState, item]);
        });
        // console.log('data is ', data);
        // console.log(menuItems);
        setCurrentFrappe(menuItems[0]);
        // console.log('current frappe is ');
        // console.log(currentFrappe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      </div>
      <div className="drinkList">{drinkCards}</div>
    </div>
  );
}
