import React, { ChangeEvent, useState } from 'react';
import '../css/HoursModal.css';

interface Props {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  currentHours: number;
}

export default function HoursModal(props: Props) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [newTotal, setNewTotal] = useState(String(props.currentHours));

  function handleConfirm() {
    props.setModalIsOpen(false);
  }

  function handleCancel() {
    props.setModalIsOpen(false);
  }

  return (
    <div className="hours-container">
      <div className="hours-home-title">Enter Hours</div>
      <div className="hours-step-container">
        <input
          className="hours-input"
          type="number"
          step="1"
          onChange={(e) => setStart(e.target.value)}
        ></input>
      </div>
      <div className="new-hours">
        <u className="hours-text-boi">Updated Hours:</u>
        <div className="hours-value">{newTotal} Hrs</div>
      </div>
      <div className="hours-buttons">
        <div className="hours-button cancel" onClick={handleCancel}>
          Cancel
        </div>
        <div className="hours-button confirm" onClick={handleConfirm}>
          Confirm
        </div>
      </div>
    </div>
  );
}
