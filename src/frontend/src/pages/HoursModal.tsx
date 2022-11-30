import React, { ChangeEvent, useState } from 'react';
import '../css/HoursModal.css';
import { useAuth } from '../components/auth';

interface Props {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  currentHours: number | undefined;
}

export default function HoursModal(props: Props) {
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(0);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth();

  let user = auth?.userInfo
    ? auth?.userInfo
    : {
        id: -1,
        fullName: 'Uknown User',
        userName: 'none@none.com',
        email: 'none@none.com',
        password: 'none',
        balance: 0,
        role: 'user',
        key: 'none',
        hours: 0,
      };

  function handleConfirm() {
    if (stopTime > startTime) {
      const formData = new FormData();
      formData.append('hours', String((stopTime - startTime) / 60));
      fetch(`http://127.0.0.1:8000/users/employees/${user?.id}/add_hours/`, {
        method: 'POST',
        headers: { Authorization: `Token ${user?.key}` },
        credentials: 'same-origin',
        body: formData,
      })
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.success) {
                auth?.loginAs(
                  user?.id,
                  user?.fullName,
                  user?.userName,
                  user?.email,
                  user?.password,
                  user?.balance,
                  user?.role,
                  user?.key,
                  data.hours
                );
                setErrorMessage('');
                props.setModalIsOpen(false);
              } else {
                setErrorMessage('Server Error: Please Try Again Later');
              }
            });
          } else {
            setErrorMessage('Server Error: Please Try Again Later');
          }
        })
        .catch(() => setErrorMessage('Server Error: Please Try Again Later'));
    }
  }

  function handleCancel() {
    setErrorMessage('');
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
      {errorMessage !== '' && (
        <div className="red  hours-error-div">{errorMessage}</div>
      )}
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
