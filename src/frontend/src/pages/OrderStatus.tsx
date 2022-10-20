import React, { useEffect, useState } from 'react';
import '../css/OrderStatus.css';

// interface Props {
//   order: string;
// }

export default function OrderStatus() {
  const [orderDone, updateOrderDone] = useState(false);
  const [time, setTime] = useState(0);

  function checkDone() {
    updateOrderDone(true); //API CALL HERE
    console.log('done');
  }

  // Updates the Timer Every Second
  useEffect(() => {
    let interval: any = null;

    if (!orderDone) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [orderDone]);

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

  return (
    <div className="order-container">
      <div className="details-container">
        <div className="title">Thank You For Your Purchase!</div>
        <div className="status-container">
          <div className="status-text">Your Order is Currently:</div>
          <div className={`order-status ${orderDone ? 'done' : 'waiting'}`}>
            {orderDone ? 'Finished!' : 'In Progress'}
          </div>
        </div>
        <div className="timer-container">
          <div className="wait-text">Wait Time:</div>
          <div className="timer">
            {String(Math.floor(time / 60)).padStart(2, '0')}:
            {String(time % 60).padStart(2, '0')}
          </div>
        </div>
        <div className="nav-buttons">
          <div
            className="button home"
            onClick={() => {
              // I Have No Idea How Navigations Works w/ React
              window.location.assign('./Home.tsx');
            }}
          >
            Home
          </div>
          <div
            className="button new-order"
            onClick={() => {
              // I Have No Idea How Navigations Works w/ React
              window.location.assign('./Menu.tsx');
            }}
          >
            New Order
          </div>
        </div>
      </div>
    </div>
  );
}
