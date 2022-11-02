import React, { ChangeEvent, useEffect, useState } from 'react';
import internal from 'stream';
import EditIcon from '../images/edit-icon.svg';
import '../css/Account.css';
import test from '../images/test.png';
import UpdateFieldModal from './UpdateFieldModal';
import Modal from 'react-modal';
import BalanceModal from './BalaceModal';
import HoursModal from './HoursModal';
import { useAuth } from '../components/auth';

interface PropsAuth {
  authKey: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  eMail: string;
  balance: number;
  accountType: string | undefined;
  hours: number;
}

interface Field {
  name: string;
  value: string;
  confirm: boolean;
}

type Props = {
  text: string;
  onClick: () => void;
};

const FAKE_USER: User = {
  id: -1,
  firstName: '',
  lastName: '',
  userName: '',
  eMail: '',
  balance: 0,
  accountType: '',
  hours: 0,
};

const maxSize = 16;

export default function Account(props: PropsAuth) {
  const [currentUser, setCurrentUser] = useState<User>(FAKE_USER);
  const [balanceModalOpen, setBalanceModal] = useState(false);
  const [fieldModalOpen, setFieldModal] = useState(false);
  const [hoursModalOpen, setHoursModal] = useState(false);
  const [currentField, setCurrentField] = useState({
    name: '',
    value: '',
    confirm: false,
  });
  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/users/current_user/', {
      headers: { Authorization: `Token ${props.authKey}` },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((json) => {
        const user: User = parseUser(json);
        setCurrentUser(user);
      });
  }, []);

function openFieldModal(field: Field) {
    setCurrentField(field);
    setFieldModal(true);
  }

  function openBalanceModal() {
    setBalanceModal(true);
  }

  function openHoursModal() {
    setHoursModal(true);
  }

  function parseUser(json: any) {
    let user: User = {
      id: json.id,
      firstName: json.firstName? json.firstName : "FirstName",
      lastName: json.lastName? json.lastName: "LastName",
      userName: json.email,
      eMail: json.email,
      balance: Number.parseFloat(json.balance),
      accountType: json.user_permissions.length === 0? 'user' : 'employee',
      hours: 4,
    }

    return user
  }

  return (
    <div className="user-container">
      <div className="account-heading">Account Information For:</div>
      <div className="user-header heading-2">
        <img src={test} width="75em" className="profile-picture" />
        <div className="user-title header-2">
          {currentUser.firstName} {currentUser.lastName}
        </div>
      </div>
      <hr className="ruler" />
      <div className="user-details">
        <div className="account-details heading-2">
          <div className="field-title">Name </div>
          <div className="colon">:</div>
          <EditableText
            text={`${currentUser.firstName} ${currentUser.lastName}`}
            onClick={() =>
              openFieldModal({
                name: 'Name',
                value: 'Full Name',
                confirm: false,
              })
            }
          ></EditableText>
          <div className="field-title">User Name </div>
          <div className="colon">:</div>
          <EditableText
            text={currentUser.userName}
            onClick={() =>
              openFieldModal({
                name: 'User Name',
                value: 'New User Name',
                confirm: false,
              })
            }
          ></EditableText>
          <div className="field-title">Email </div>
          <div className="colon">:</div>
          <EditableText
            data-testid="edit-email-btn"
            text={currentUser.eMail}
            onClick={() =>
              openFieldModal({
                name: 'Email',
                value: 'New Email',
                confirm: true,
              })
            }
          ></EditableText>
          <div className="field-title">Password </div>
          <div className="colon">:</div>
          <EditableText
            text={'*'.repeat(10)}
            onClick={() =>
              openFieldModal({
                name: 'Password',
                value: 'New Password',
                confirm: true,
              })
            }
          ></EditableText>
        </div>

        <div className="balance-information heading-2">
          <div>
            <u>
              {currentUser.accountType === 'manager' ? 'Store' : 'User'}{' '}
              Balance:
            </u>
          </div>
          <div className="balance-display">
            ${currentUser.balance.toFixed(2)}
          </div>
          <div className="small-link" onClick={openBalanceModal}>
            Add to Balance
          </div>
          {(currentUser.accountType === 'manager' ||
            currentUser.accountType === 'employee') && (
            <div className="time-worked-div">
              <div>
                <u>Hours Clocked:</u>
              </div>

              <div className="time-display">
                {currentUser.hours.toFixed(1)} Hr
              </div>
              <div className="small-link" onClick={openHoursModal}>
                Clock In
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        overlayClassName="dark"
        isOpen={fieldModalOpen}
        style={{
          content: {
            height: '100%',
            width: '550px',
            marginLeft: 'auto',
            padding: '0px',
            inset: '0px',
            border: 'none',
            borderRadius: '0px',
            background: 'white',
            flexWrap: 'wrap',
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}
      >
        <UpdateFieldModal
          setModalIsOpen={setFieldModal}
          fieldName={currentField.name}
          fieldValue={currentField.value}
          confirm={currentField.confirm}
        />
      </Modal>

      <Modal
        overlayClassName="dark"
        isOpen={balanceModalOpen}
        style={{
          content: {
            height: '100vh',
            width: '550px',
            marginLeft: 'auto',
            padding: '0px',
            inset: '0px',
            border: 'none',
            borderRadius: '0px',
            background: 'white',
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}
      >
        <BalanceModal
          setModalIsOpen={setBalanceModal}

          currentBalance={currentUser.balance}
          userNumber={currentUser.id}
          authKey={props.authKey}
        />
      </Modal>

      <Modal
        overlayClassName="dark"
        isOpen={hoursModalOpen}
        style={{
          content: {
            height: '100vh',
            width: '550px',
            marginLeft: 'auto',
            padding: '0px',
            inset: '0px',
            border: 'none',
            borderRadius: '0px',
            background: 'white',
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}
      >
        <HoursModal
          setModalIsOpen={setHoursModal}
          currentHours={currentUser.hours}
        />
      </Modal>
    </div>
  );
}

function EditableText(props: Props) {
  return (
    <div className="editable-text-field">
      <span className="editable-text">{props.text}</span>
      <img className="edit-icon" src={EditIcon} onClick={props.onClick} />
    </div>
  );
}
