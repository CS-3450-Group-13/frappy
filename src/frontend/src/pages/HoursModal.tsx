import React, { ChangeEvent, useState } from 'react';
import '../css/HoursModal.css';

interface Props {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  currentHours: number;
}

export default function HoursModal(props: Props) {
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(0);

  function handleConfirm() {
    props.setModalIsOpen(false);
  }

  function handleCancel() {
    props.setModalIsOpen(false);
  }

  return (
    <div className="hours-container">
      <div className="hours-home-title">Enter Hours Worked</div>
      <div className="hours-step-container">
        <input
          className="hours-input"
          type="time"
          step="600"
          onChange={(e) =>
            setStartTime(
              Number(e.target.value.split(':')[0]) * 60 +
                Number(e.target.value.split(':')[1])
            )
          }
        ></input>
      </div>

      <div className="hours-step-container-2">
        <input
          className="hours-input"
          type="time"
          step="600"
          onChange={(e) =>
            setStopTime(
              Number(e.target.value.split(':')[0]) * 60 +
                Number(e.target.value.split(':')[1])
            )
          }
        ></input>
      </div>
      <div className="new-hours">
        <u className="hours-text-boi">Total Hours:</u>
        <div className="hours-value">
          {stopTime - startTime > 0 ? (
            `${Math.floor((stopTime - startTime) / 60)} Hrs ${Math.floor(
              (stopTime - startTime) % 60
            )} Min`
          ) : (
            <div className="red">Clock Out Time Must be Later</div>
          )}
        </div>
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
