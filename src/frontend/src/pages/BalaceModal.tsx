import React, { ChangeEvent, useState } from 'react';
import '../css/BalanceModal.css';

interface Props {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  currentBalance: number;
}

export default function BalanceModal(props: Props) {
  const [newTotal, setNewTotal] = useState(String(props.currentBalance));

  function handleBalanceChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    if (/^[0-9]*(\.[0-9][0-9])?$/.test(value)) {
      setNewTotal(
        String((Number(props.currentBalance) + Number(value)).toFixed(2))
      );
    } else {
      setNewTotal('N/A');
    }
  }
  function handleConfirm() {
    props.setModalIsOpen(false);
  }

  function handleCancel() {
    props.setModalIsOpen(false);
  }

  return (
    <div className="balance-container">
      <div className="home-title">Enter Balance</div>
      <div className="step-container">
        <div className="dollar">$</div>
        <input
          className="balance-input"
          type="number"
          pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
          step="0.01"
          onChange={handleBalanceChange}
        ></input>
      </div>
      <div className="new-balance">
        <u className="text-boi">New Balance:</u>
        <div className="balance-value">${newTotal}</div>
      </div>
      <div className="buttons">
        <div className="button cancel" onClick={handleCancel}>
          Cancel
        </div>
        <div className="button confirm" onClick={handleConfirm}>
          Confirm
        </div>
      </div>
    </div>
  );
}
