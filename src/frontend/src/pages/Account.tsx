import React from 'react';
import internal from 'stream';
import BalanceDisplay from '../components/BalanceDisplay';
import EditableText from '../components/EditableText';
import '../css/Account.css';
import test from '../images/test.png';

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

const maxSize = 16;

export default function Account() {
  return (
    <div className="user-container">
      <div className="heading">Account Information For:</div>
      <div className="user-header heading-2">
        <img src={test} width="75em" className="profile-picture" />
        <div className="user-title header-2">{DEMO_USER.fullName}</div>
      </div>
      <hr className="ruler" />
      <div className="user-details">
        <div className="account-details heading-2">
          <div className="field-title">Name </div>
          <div className="colon">:</div>
          <EditableText text={DEMO_USER.fullName}></EditableText>
          <div className="field-title">User Name </div>
          <div className="colon">:</div>
          <EditableText text={DEMO_USER.userName}></EditableText>
          <div className="field-title">Email </div>
          <div className="colon">:</div>
          <EditableText text={DEMO_USER.eMail}></EditableText>
          <div className="field-title">Password </div>
          <div className="colon">:</div>
          <EditableText text={'*'.repeat(DEMO_USER.password)}></EditableText>
        </div>

        <div className="balance-information heading-2">
          <div>
            <u>Balance:</u>
          </div>
          <BalanceDisplay balance={DEMO_USER.balance}></BalanceDisplay>
          <div className="smallLink">Add to Balance</div>
        </div>
      </div>
    </div>
  );
}
