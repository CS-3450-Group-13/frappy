import React from 'react';
import '../css/UpdateFieldModal.css';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
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
  function handleConfirm() {
    props.setModalIsOpen(false);
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
      />
      <TextField
        displayName={'Confirm ' + props.fieldName}
        defaultValue={'Retype ' + props.fieldValue}
        className={props.confirm ? 'input-container' : 'hidden'}
      />

      <TextField
        displayName="Current Password"
        defaultValue="Enter Password"
        className="input-container"
      />
      <div className="balance-buttons">
        <div className="balance-button cancel" onClick={handleCancel}>
          Cancel
        </div>
        <div className="balance-button confirm" onClick={handleConfirm}>
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
      <input className="input-field" placeholder={props.defaultValue}></input>
    </div>
  );
}
