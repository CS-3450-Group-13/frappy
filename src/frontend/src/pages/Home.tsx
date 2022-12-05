import React, { useState, useEffect } from 'react';
import test from '../images/test.png';
import '../css/Home.css';
import ScrollableList from '../components/ScrollableList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';
import Modal from 'react-modal';
import userEvent from '@testing-library/user-event';
import { userInfo } from 'os';
import OrderHistory from '../components/OrderHistory';

const PAYMENT_ENDPOINT = 'http://127.0.0.1:8000/users/employees/pay_all/';
const ORDERS_ENDPOINT = 'http://127.0.0.1:8000/frappapi/frappes/';

// Basic User Details
interface StateType {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  balance: number;
  role: string;
  key: string;
  hours: number;
}

// Name Value Pair Used to Display Interesting User Information
interface PropsDetail {
  title: string;
  value: string;
}

enum ModalStates {
  default,
  processing,
  success,
  failure,
  broke,
  loading,
}

// Props for the Pay All Employees Modal
interface PayProps {
  setModalOpen: (open: boolean) => void;
  modalState: ModalStates;
  setModalState: (modalState: ModalStates) => void;
  payAll: () => void;
  toPay: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [payModalOpen, setPayModalOpen] = useState(false); // Opens the Pay All Users Modal
  const [payModalState, setPayModalState] = useState(ModalStates.default); // Controls the State of the Pay All Users Modal
  const [toPay, setToPay] = useState(0);

  const auth = useAuth();

  function updateUser() {
    if (auth !== null) {
      var USER = auth.userInfo;
    } else {
      USER = {
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

  var USER: StateType;

  if (auth !== null) {
    var USER = auth.userInfo;
  } else {
    USER = {
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

  // Posts Payment Request to Server
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
                data.remainging_balance,
                USER.role,
                USER.key,
                USER.hours
              );
              updateUser();
              setToPay(0);
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

  // Opens the Payment Modal, and Fetches Payment Info
  function openPayModal() {
    setPayModalOpen(true);
    setPayModalState(ModalStates.loading);
    fetch(PAYMENT_ENDPOINT, {
      headers: { Authorization: `Token ${USER.key}` },
      credentials: 'same-origin',
      method: 'GET',
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          response
            .json()
            .then((data) => {
              setToPay(data.wages_total);
              if (data.wages_total <= USER.balance) {
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

  // Main Page Element
  return (
    <div className="home-container">
      <div className="header">
        <div className="home-title">Welcome Back {USER.fullName}!</div>
        <div className="profile-picture">
          <img src={test} alt="test" width="110em" height="110em" />
        </div>
      </div>
      <div
        className={
          USER.role === 'manager' ? 'fast-nav-buttons' : 'fast-nav-buttons-2'
        }
      >
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
        <ScrollableList title="Account" width="95%">
          <DetailCard
            title="Balance"
            // eslint-disable-next-line
            value={USER.balance > 0 ? `\$${USER.balance.toFixed(2)}` : '$0.00'}
          />
          <DetailCard title="Favorite Drink" value={'Pumpkin Spice'} />
          <DetailCard
            title="Tab"
            value={
              USER.balance < 0 ? `\$${(-1 * USER.balance).toFixed(2)}` : '$0.00'
            }
          />
        </ScrollableList>
        <OrderHistory
          endpoint={ORDERS_ENDPOINT}
          title="Order History"
          width={70}
          outdated={true}
          condense={true}
          setOutdated={(argument) => {
            return;
          }}
        ></OrderHistory>
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
          {(user?.balance
            ? user.balance - props.toPay
            : 0 - props.toPay
          ).toFixed(2)}
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
