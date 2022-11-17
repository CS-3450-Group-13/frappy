import React, { useState, useEffect } from 'react';
import test from '../images/test.png';
import Frappe from '../images/Frappe.jpg';
import '../css/Home.css';
import ScrollableList from '../components/ScrollableList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';
import Modal from 'react-modal';
import userEvent from '@testing-library/user-event';
import { userInfo } from 'os';

const PAYMENT_ENDPOINT = 'http://127.0.0.1:8000/users/employees/pay_all/';
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

enum ModalStates {
  default,
  processing,
  success,
  failure,
  broke,
  loading,
}

interface PayProps {
  setModalOpen: (open: boolean) => void;
  modalState: ModalStates;
  setModalState: (modalState: ModalStates) => void;
  payAll: () => void;
  toPay: number;
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

export default function Home(props: Props) {
  const navigate = useNavigate();
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payModalState, setPayModalState] = useState(ModalStates.default);
  const [toPay, setToPay] = useState(0);

  const auth = useAuth();

  if (auth !== null) {
    var USER = auth.userInfo;
  } else {
    var USER = {
      id: -1,
      fullName: '',
      userName: '',
      email: '',
      password: '',
      balance: 0.0,
      role: 'none',
      key: '',
      hours: 0,
    };
  }

  updateUser();

  function updateUser() {
    if (auth !== null) {
      var USER = auth.userInfo;
    } else {
      var USER = {
        id: -1,
        fullName: '',
        userName: '',
        email: '',
        password: '',
        balance: 0.0,
        role: 'none',
        key: '',
        hours: 0,
      };
    }
  }

  function payAll() {
    if (payModalState === ModalStates.broke) {
      const response = window.confirm(
        `Insufficient Store Balance. Would You Like to Take Out a Loan for ${
          toPay - USER.balance
        }?`
      );
    }
    setPayModalState(ModalStates.processing);
    fetch('http://127.0.0.1:8000/users/employees/pay_all/', {
      headers: { Authorization: `Token ${USER.key}` },
      credentials: 'same-origin',
      method: 'POST',
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            if (data.fail) {
              setPayModalState(ModalStates.broke);
            } else {
              setPayModalState(ModalStates.success);
              console.log(data);
              auth?.loginAs(
                USER.id,
                USER.fullName,
                USER.userName,
                USER.email,
                USER.password,
                data.manager_current,
                USER.role,
                USER.key,
                USER.hours
              );
              updateUser();
            }
          });
        } else {
          setPayModalState(ModalStates.failure);
        }
      })
      .catch(() => {
        setPayModalState(ModalStates.failure);
      });
  }

  function openPayModal() {
    setPayModalOpen(true);
    setPayModalState(ModalStates.loading);
    fetch(PAYMENT_ENDPOINT, {
      headers: { Authorization: `Token ${USER.key}` },
      credentials: 'same-origin',
      method: 'GET',
    })
      .then((response) => {
        if (response.status == 200) {
          response
            .json()
            .then((data) => {
              setToPay(data.wages_total);
              if (toPay <= USER.balance) {
                setPayModalState(ModalStates.default);
              } else {
                setPayModalState(ModalStates.broke);
              }
            })
            .catch(() => setPayModalState(ModalStates.failure));
        } else {
          setPayModalState(ModalStates.failure);
        }
      })
      .catch(() => {
        setPayModalState(ModalStates.failure);
      });
  }

  return (
    <div className="home-container">
      <div className="header">
        <div className="home-title">Welcome Back {USER.fullName}!</div>
        <div className="profile-picture">
          <img src={test} alt="test" width="110em" height="110em" />
        </div>
      </div>
      <div className="fast-nav-buttons">
        {USER.role === 'user' ||
          (USER.role === 'employee' && (
            <div
              className="button favorite-button"
              onClick={() => {
                navigate('/menu');
              }}
            >
              Order Favorite Drink
            </div>
          ))}
        {USER.role === 'manager' && (
          <div
            className="button favorite-button"
            onClick={() => {
              openPayModal();
            }}
          >
            Pay All Employees
          </div>
        )}
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
            value={USER.balance > 0 ? `\$${USER.balance.toFixed(2)}` : '$0.00'}
          />
          <DetailCard title="Favorite Drink" value={DEMO_USER.favoriteDrink} />
          <DetailCard
            title="Tab"
            value={
              USER.balance < 0 ? `\$${(-1 * USER.balance).toFixed(2)}` : '$0.00'
            }
          />
        </ScrollableList>
        <ScrollableList title="Order History" width="65%">
          {DEMO_USER.orderHistory.map((orderInstance) => (
            <OrderCard order={orderInstance} />
          ))}
        </ScrollableList>
      </div>
      <Modal
        overlayClassName="dark"
        isOpen={payModalOpen}
        style={{
          content: {
            height: '100vh',
            width: '500px',
            marginLeft: 'auto',
            padding: '0px',
            inset: '0px',
            border: 'none',
            borderRadius: '0px',
            background: 'white',
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}
      >
        <PayEmployeesModal
          setModalOpen={setPayModalOpen}
          modalState={payModalState}
          setModalState={setPayModalState}
          payAll={payAll}
          toPay={toPay}
        ></PayEmployeesModal>
      </Modal>
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

function PayEmployeesModal(props: PayProps) {
  const auth = useAuth();
  const user = auth?.userInfo;
  if (props.modalState == ModalStates.loading) {
    return (
      <div className="pay-container">
        <h1 className="pay-title">Payment Information</h1>
        <span className="pay-loader"></span>
        <div className="pay-buttons">
          <div
            className="pay-button pay-cancel"
            onClick={() => props.setModalOpen(false)}
          >
            Cancel
          </div>
          <div className="pay-button pay-confirm">Pay</div>
        </div>
      </div>
    );
  }
  return (
    <div className="pay-container">
      <h1 className="pay-title">Payment Information</h1>
      <h2>Store Balance:</h2>
      <div className="pay-field">
        <div className="pay-dollar">$</div>
        <div className="pay-number">{user?.balance.toFixed(2)}</div>
      </div>
      <h2>Employee Payment:</h2>
      <div className="pay-field">
        <div className="pay-dollar">$</div>
        <div className="pay-number">{props.toPay.toFixed(2)}</div>
      </div>
      <h2>Remaining Balance:</h2>
      <div className="pay-field last-field">
        <div className="pay-dollar">$</div>
        <div className="pay-number">
          {(user?.balance ? user.balance : 0 - props.toPay).toFixed(2)}
        </div>
      </div>
      {(props.modalState === ModalStates.failure ||
        props.modalState === ModalStates.broke ||
        props.modalState === ModalStates.success) && (
        <div
          className={`pay-status${
            props.modalState === ModalStates.success ? ' pay-green' : ' pay-red'
          }`}
        >
          {props.modalState === ModalStates.broke
            ? 'Warning: Insufficient Funds - Loan Required'
            : props.modalState === ModalStates.failure
            ? 'Server Error: Please Try Again Later'
            : 'Employees Payed Succesfully'}
        </div>
      )}
      {props.modalState !== ModalStates.processing && (
        <div className="pay-buttons">
          <div
            className="pay-button pay-cancel"
            onClick={() => props.setModalOpen(false)}
          >
            {props.modalState === ModalStates.success ? 'Exit' : 'Cancel'}
          </div>
          {props.modalState !== ModalStates.success && (
            <div
              className="pay-button pay-confirm"
              onClick={() => props.payAll()}
            >
              Pay
            </div>
          )}
        </div>
      )}
      {props.modalState === ModalStates.processing && (
        <span className="pay-loader"></span>
      )}
    </div>
  );
}
