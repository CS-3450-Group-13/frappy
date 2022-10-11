import React from 'react';
import { Type } from 'typescript';
import '../css/UpdateFieldModal.css';

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

type Props = {
  fieldName: string;
  fieldValue: string;
  confirm: boolean;
};

type Props2 = {
  displayName: string;
  defaultValue: string;
  className: string;
};

export default function UpdateFieldModal(props: Props) {
  return (
    <div className="update-container">
      <div className="title heading">Enter New {props.fieldName}:</div>
      <TextField
        displayName={'New ' + props.fieldName}
        defaultValue={props.fieldValue}
        className="input-container"
      />
      <TextField
        displayName={'Confirm ' + props.fieldName}
        defaultValue="Retype Email"
        className={props.confirm ? 'input-container second' : 'hidden'}
      />

      <TextField
        displayName="Current Password"
        defaultValue="Enter Password"
        className="input-container second"
      />
      <div className="buttons">
        <div className="button cancel">Cancel</div>
        <div className="button confirm">Confirm</div>
      </div>
    </div>
  );
}

function TextField(props: Props2) {
  return (
    <div className={props.className}>
      <div className="input-name">{props.displayName}:</div>
      <div className="input-field">{props.defaultValue}</div>
    </div>
  );
}
