import React from 'react';
import '../css/BalanceModal.css';

interface User {
  fullName: string;
  userName: string;
  eMail: string;
  password: number; // Only Care About Password Length for Display Purposes, Should be Hashed Anyways
  balance: number;
}

const DEMO_USER: User = {
  fullName: 'Glorgo Glumbus',
  userName: 'GlorGlu',
  eMail: 'glorglugaming@gmail.com',
  password: 4,
  balance: 400.32,
};

export default function BalanceModal() {
  return (
    <div className="balance-container">
      <div className="title heading">Enter Balance:</div>
      <div className="balance-input">$50.00</div>
      <div className="new-balance">
        <u className="text-boi">New Balance:</u>
        <div className="balance-value">
          ${(DEMO_USER.balance + 50).toFixed(2)}
        </div>
      </div>
      <div className="buttons">
        <div className="button cancel">Cancel</div>
        <div className="button confirm">Confirm</div>
      </div>
    </div>
  );
}
