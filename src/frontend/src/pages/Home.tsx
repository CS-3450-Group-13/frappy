import React, { useState } from 'react';
import test from '../images/test.png';
import Frappe from '../images/Frappe.jpg';
import '../css/Home.css';
import ScrollableList from '../components/ScrollableList';
import { useNavigate } from 'react-router-dom';

interface User {
  fullName: string;
  userName: string;
  eMail: string;
  password: number; // Only Care About Password Length for Display Purposes, Should be Hashed Anyways
  balance: number;
  favoriteDrink: string;
  orderHistory: Order[];
  hours: number;
  accountType: string;
}

interface Order {
  date: Date;
  drinks: Drink[];
  done?: boolean;
  id?: string;
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
  baristaMode: boolean;
}

const DEMO_USER: User = {
  hours: 543,
  accountType: 'employee',
  fullName: 'Glorgo Glumbus',
  userName: 'GlorGlu',
  eMail: 'glorglugaming@gmail.com',
  password: 4,
  balance: 400.32,
  favoriteDrink: 'Pumpkin Spice Latte',
  orderHistory: [
    {
      date: new Date(5000000000),
      done: true,
      id: '34234234234',
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
      done: true,
      id: '34234234234',
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
      done: false,
      id: '34234234234',
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
      done: true,
      id: '34234234234',
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
      done: true,
      id: '34234234234',
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
      done: false,
      id: '55424234',
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
      done: false,
      id: '55424234',
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

var summary = [
  {
    name: 'Balance',
    value: `\$${(DEMO_USER.balance < 0 ? 0 : DEMO_USER.balance).toFixed(2)}`,
  },
];

if (DEMO_USER.accountType === 'user') {
  summary.push({ name: 'Favorite Drink', value: DEMO_USER.favoriteDrink });
} else if (DEMO_USER.accountType === 'employee') {
  summary.push({
    name: 'Hours Worked',
    value: `${DEMO_USER.hours.toFixed(1)}`,
  });
}

summary.push({
  name: 'Tab',
  value: `\$${(DEMO_USER.balance > 0 ? 0 : DEMO_USER.balance * -1).toFixed(2)}`,
});

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header">
        <div className="title">Welcome Back {DEMO_USER.fullName}!</div>
        <div className="profile-picture">
          <img src={test} alt="test" width="110em" height="110em" />
        </div>
      </div>
      <div className="fast-nav-buttons">
        {DEMO_USER.accountType === 'user' && (
          <div
            className="button favorite-button"
            onClick={() => {
              navigate('/menu');
            }}
          >
            Order Favorite Drink
          </div>
        )}

        {DEMO_USER.accountType === 'employee' && (
          <div
            className="button favorite-button"
            onClick={() => {
              navigate('/Queue');
            }}
          >
            Queue
          </div>
        )}

        {DEMO_USER.accountType === 'user' && (
          <div
            className="button order-button"
            onClick={() => {
              navigate('/menu');
            }}
          >
            New Order
          </div>
        )}

        {DEMO_USER.accountType === 'employee' && (
          <div
            className="button order-button"
            onClick={() => {
              navigate('/menu');
            }}
          >
            Order for Customer
          </div>
        )}
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
          {summary.map((item) => (
            <DetailCard title={item.name} value={item.value} />
          ))}
        </ScrollableList>

        {DEMO_USER.accountType === 'user' && (
          <ScrollableList title="Order History" width="65%">
            {DEMO_USER.orderHistory.map((orderInstance) => (
              <OrderCard order={orderInstance} baristaMode={false} />
            ))}
          </ScrollableList>
        )}

        {DEMO_USER.accountType === 'employee' && (
          <ScrollableList title="Order Queue" width="65%">
            {DEMO_USER.orderHistory.map((orderInstance) => (
              <OrderCard order={orderInstance} baristaMode={true} />
            ))}
          </ScrollableList>
        )}
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
    <div
      className={`order-card${
        props.baristaMode
          ? props.order.done
            ? ' oc-green'
            : ' oc-orange'
          : ' oc-gray'
      }`}
    >
      <div className="content">
        {!props.baristaMode && (
          <div className="order-date">
            {props.order.date.toLocaleString('en-us', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        )}
        {props.baristaMode && (
          <div className="order-date">#{props.order.id}</div>
        )}
        {!expanded && (
          <div className="order-summary">
            <div className="small-container">
              <div className="home-drink-name">
                {props.order.drinks[0].name}
                {props.order.drinks.length > 0
                  ? ` (${props.order.drinks.length})`
                  : ''}
              </div>
              {!props.baristaMode && (
                <div className="cost">
                  $
                  {props.order.drinks
                    .map((drink) => drink.cost)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)}
                </div>
              )}
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
                  {!props.baristaMode && (
                    <div className="cost">${drink.cost.toFixed(2)}</div>
                  )}
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
