import React, { ChangeEvent, useState } from 'react';
import '../css/BalanceModal.css';
import { useAuth } from '../components/auth';

interface Props {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  currentBalance: number;
}

export default function BalanceModal(props: Props) {
  const [newBalance, setNewBalance] = useState(props.currentBalance);
  const [balanceValid, setBalanceValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth();
  let user = auth?.userInfo;

  function handleBalanceChange(event: ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    if (/^[0-9]*(\.[0-9][0-9])?$/.test(value)) {
      setNewBalance(Number(value));
      setBalanceValid(true);
    } else {
      setBalanceValid(false);
    }
  }
  function handleConfirm() {
    if (balanceValid) {
      console.log('lmaoo');
      fetch(
        `http://127.0.0.1/8000/users/users/add_balance/?balance=${newBalance}`,
        {
          headers: { Authorization: `Token ${user?.key}` },
          credentials: 'same-origin',
        }
      )
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (response.status === 200) {
            props.setModalIsOpen(false);
          } else {
            setErrorMessage('Server Error: Please Try Again Later');
          }
        })
        .catch(() => setErrorMessage('Server Error: Please Try Again Later'));
    } else {
      setErrorMessage('Invalid Input');
    }
  }

  function handleCancel() {
    props.setModalIsOpen(false);
  }

  return (
    <div className="balance-container">
      <div className="balance-title">Enter Balance</div>
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
        <div className="balance-value">
          {balanceValid && errorMessage === ''
            ? `$${(newBalance + props.currentBalance).toFixed(2)}`
            : errorMessage === ''
            ? 'N/A'
            : errorMessage}
        </div>
      </div>
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
