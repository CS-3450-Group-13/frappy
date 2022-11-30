import React, { useState } from 'react';
import '../css/UpdateFieldModal.css';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  fieldName: string;
  fieldValue: string;
  confirm: boolean;
  updateFunction?: any;
  error: string;
};

type Props2 = {
  displayName: string;
  defaultValue: string;
  className: string;
  setter: (input: string) => void;
  obfuscate: boolean;
};

export default function UpdateFieldModal(props: Props) {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [password, setPassword] = useState('');

  function handleConfirm() {
    props.updateFunction(field1, field2, password);
  }

  function handleCancel() {
    props.setModalIsOpen(false);
  }

  console.log(props.confirm);

  return (
    <div className="update-container">
      <div className="update-title">Enter New {props.fieldName}</div>
      <TextField
        displayName={'New ' + props.fieldName}
        defaultValue={props.fieldValue}
        className="input-container"
        setter={setField1}
        obfuscate={false}
      />
      <TextField
        displayName={'Confirm ' + props.fieldName}
        defaultValue={'Retype ' + props.fieldValue}
        className={props.confirm ? 'input-container' : 'hidden'}
        setter={setField2}
        obfuscate={false}
      />

      <TextField
        displayName="Current Password"
        defaultValue="Enter Password"
        className="input-container"
        setter={setPassword}
        obfuscate={true}
      />

      <div className="field-error-div">
        {props.error === '' ? '' : props.error}
      </div>
      <div className="field-balance-buttons">
        <div className="field-balance-button cancel" onClick={handleCancel}>
          Cancel
        </div>
        <div className="field-balance-button confirm" onClick={handleConfirm}>
          Confirm
        </div>
      </div>
    </div>
  );
}

function TextField(props: Props2) {
  return (
    <div className={props.className}>
      <div className="input-name">{props.displayName}:</div>
      <input
        className="input-field"
        type={!props.obfuscate ? 'text' : 'password'}
        placeholder={props.defaultValue}
        onChange={(e) => props.setter(e.target.value)}
      ></input>
    </div>
  );
}
