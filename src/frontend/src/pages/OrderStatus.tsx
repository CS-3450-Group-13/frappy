import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/OrderStatus.css';
import OrderHistory from '../components/OrderHistory';

const ORDERS_ENDPOINT = 'http://127.0.0.1:8000/frappapi/frappes/?status=1';

export default function OrderStatus() {
  const [orderDone, updateOrderDone] = useState(false);
  const [outdated, setOutdated] = useState(false);
  const [length, setLength] = useState(1);

  const navigate = useNavigate();

  function checkDone() {
    console.log('ChEKC');
    if (!orderDone) {
      setOutdated(true);
    }
  }
  // Checks if the Drink is Done Every 10 Seconds
  useEffect(() => {
    let interval: any = null;

    if (!orderDone) {
      interval = setInterval(checkDone, 10000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [orderDone]);

  useEffect(() => {
    console.log('LENGTH');
    console.log(length);
    if (length <= 0) {
      updateOrderDone(true);
    } else {
      updateOrderDone(false);
    }
  }, [length]);

  return (
    <div className="order-container">
      <div className="details-container">
        <div className="order-title">Thank You For Your Purchase!</div>
        <div className="status-container">
          <div className="status-text">Your Order is Currently:</div>
          <div className={`order-status ${orderDone ? 'done' : 'waiting'}`}>
            {orderDone ? 'Finished!' : 'In Progress'}
          </div>
        </div>
        <div className="timer-container">
          <OrderHistory
            endpoint={ORDERS_ENDPOINT}
            outdated={outdated}
            width={65}
            condense={false}
            setOutdated={setOutdated}
            title=" "
            setLength={setLength}
          ></OrderHistory>
        </div>
        <div className="nav-buttons">
          <div
            className="button home"
            onClick={() => {
              navigate('/home-page');
            }}
          >
            Home
          </div>
          <div
            className="button new-order"
            onClick={() => {
              // I Have No Idea How Navigations Works w/ React
              navigate('/menu');
            }}
          >
            New Order
          </div>
        </div>
      </div>
    </div>
  );
}
