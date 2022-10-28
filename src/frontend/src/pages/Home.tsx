import React, { useState, useEffect } from 'react';
import test from '../images/test.png';
import Frappe from '../images/Frappe.jpg';
import '../css/Home.css';
import ScrollableList from '../components/ScrollableList';
import { useNavigate } from 'react-router-dom';

interface Props {
  authKey: string;
}

interface User2 {
  fullName: string;
  userName: string;
  eMail: string;
  password: number; // Only Care About Password Length for Display Purposes, Should be Hashed Anyways
  balance: number;
  favoriteDrink: string;
  orderHistory: Order[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  eMail: string;
  balance: number;
  accountType: string;
  hours: number;
}

interface Order {
  date: Date;
  drinks: Drink[];
}

interface Drink {
  name: string;
  ingredients: any;
  cost: number;
  picture: string;
}

interface PropsDetail {
  title: string;
  value: string;
}

interface PropsOrder {
  order: Order;
}

const DEMO_USER: User2 = {
  fullName: 'Glorgo Glumbus',
  userName: 'GlorGlu',
  eMail: 'glorglugaming@gmail.com',
  password: 4,
  balance: 400.32,
  favoriteDrink: 'Pumpkin Spice Latte',
  orderHistory: [
    {
      date: new Date(5000000000),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 23.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 12.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 1.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },

    {
      date: new Date(544533534534),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 2.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.01,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 102.32,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 3.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },
    {
      date: new Date(544533534534),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 2.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.01,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 102.32,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 3.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },
    {
      date: new Date(544533534534),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 2.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.01,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 102.32,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 3.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },
    {
      date: new Date(544533534534),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 2.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.01,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 102.32,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 3.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },
    {
      date: new Date(544533534534),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 2.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.01,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 102.32,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 3.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },
    {
      date: new Date(544533534534),
      drinks: [
        {
          name: 'Pumpkin Spice',
          ingredients: 1,
          cost: 2.0,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'All Spice',
          ingredients: 1,
          cost: 1.01,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Lame Spice',
          ingredients: 1,
          cost: 102.32,
          picture: '../images/Frappe.jpg',
        },
        {
          name: 'Scary Spice',
          ingredients: 1,
          cost: 3.03,
          picture: '../images/Frappe.jpg',
        },
      ],
    },
  ],
};

const FAKE_USER: User = {
  id: -1,
  firstName: '',
  lastName: '',
  userName: '',
  eMail: '',
  balance: 0,
  accountType: '',
  hours: 0,
};

export default function Home(props: Props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(FAKE_USER);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/users/current_user/', {
      headers: { Authorization: `Token ${props.authKey}` },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((json) => {
        const user: User = parseUser(json);
        setCurrentUser(user);
      });
  }, []);

  function parseUser(json: any) {
    let user: User = {
      id: json.id,
      firstName: json.firstName ? json.firstName : 'FirstName',
      lastName: json.lastName ? json.lastName : 'LastName',
      userName: json.email,
      eMail: json.email,
      balance: Number.parseFloat(json.balance),
      accountType: json.user_permissions.length === 0 ? 'employee' : 'employee',
      hours: 4,
    };

    return user;
  }

  return (
    <div className="home-container">
      <div className="header">
        <div className="home-title">
          Welcome Back {currentUser.firstName} {currentUser.lastName}!
        </div>
        <div className="profile-picture">
          <img src={test} alt="test" width="110em" height="110em" />
        </div>
      </div>
      <div className="fast-nav-buttons">
        <div
          className="button favorite-button"
          onClick={() => {
            navigate('/menu');
          }}
        >
          Order Favorite Drink
        </div>
        <div
          className="button order-button"
          onClick={() => {
            navigate('/menu');
          }}
        >
          New Order
        </div>
        <div
          className="button account-button"
          onClick={() => {
            navigate('/account');
          }}
        >
          Edit Account
        </div>
      </div>
      <div className="list-container">
        <ScrollableList title="Account" width="70%">
          <DetailCard
            title="Balance"
            // eslint-disable-next-line
            value={
              currentUser.balance > 0
                ? `\$${currentUser.balance.toFixed(2)}`
                : '$0.00'
            }
          />
          <DetailCard title="Favorite Drink" value={DEMO_USER.favoriteDrink} />
          <DetailCard
            title="Tab"
            value={
              currentUser.balance < 0
                ? `\$${(-1 * currentUser.balance).toFixed(2)}`
                : '$0.00'
            }
          />
        </ScrollableList>
        <ScrollableList title="Order History" width="65%">
          {DEMO_USER.orderHistory.map((orderInstance) => (
            <OrderCard order={orderInstance} />
          ))}
        </ScrollableList>
      </div>
    </div>
  );
}

function DetailCard(props: PropsDetail) {
  // Hack
  let fontSize = `${
    1 / Math.pow(1.5, Math.floor((props.value.length * 32) / 450))
  }em`;

  return (
    <div className="detail-card">
      <div className="detail-title">{props.title}:</div>
      <div className="detail-value" style={{ fontSize: fontSize }}>
        {props.value}
      </div>
    </div>
  );
}

function OrderCard(props: PropsOrder) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="order-card">
      <div className="content">
        <div className="order-date">
          {props.order.date.toLocaleString('en-us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </div>
        {!expanded && (
          <div className="order-summary">
            <div className="small-container">
              <div className="home-drink-name">
                {props.order.drinks[0].name}
                {props.order.drinks.length > 0
                  ? ` (${props.order.drinks.length})`
                  : ''}
              </div>
              <div className="cost">
                $
                {props.order.drinks
                  .map((drink) => drink.cost)
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className="drink-photo-container">
              <img src={Frappe} alt="frappe1" className="home-drink-photo" />
            </div>
          </div>
        )}
        {expanded && (
          <div className="drink-list">
            {props.order.drinks.map((drink) => (
              <div className="order-summary">
                <div className="small-container">
                  <div className="home-drink-name">{drink.name}</div>
                  <div className="cost">${drink.cost.toFixed(2)}</div>
                </div>
                <div className="drink-photo-container">
                  <img src={Frappe} alt="frappe" className="home-drink-photo" />
                </div>
              </div>
            ))}{' '}
          </div>
        )}
      </div>
      <div className="expand-arrow" onClick={() => setExpanded(!expanded)}>
        {expanded ? '▲' : '▼'}
      </div>
    </div>
  );
}
