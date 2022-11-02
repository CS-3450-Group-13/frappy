import React, { ChangeEvent, useEffect, useState } from 'react';
import internal from 'stream';
import EditIcon from '../images/edit-icon.svg';
import '../css/Account.css';
import test from '../images/test.png';
import UpdateFieldModal from './UpdateFieldModal';
import Modal from 'react-modal';
import BalanceModal from './BalaceModal';
import HoursModal from './HoursModal';
import { json } from 'stream/consumers';

interface PropsAuth {
  authKey: string;
}

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
  accountType: string;
  hours: number;
}

interface Field {
  name: string;
  value: string;
  confirm: boolean;
  updateFunction: any;
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

export default function Account(props: PropsAuth) {
  const [currentUser, setCurrentUser] = useState<User>(FAKE_USER);
  const [balanceModalOpen, setBalanceModal] = useState(false);
  const [fieldModalOpen, setFieldModal] = useState(false);
  const [hoursModalOpen, setHoursModal] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [currentField, setCurrentField] = useState<Field>({
    name: '',
    value: '',
    confirm: false,
    updateFunction: '',
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
    setFieldError('');
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
      firstName: json.firstName ? json.firstName : 'FirstName',
      lastName: json.lastName ? json.lastName : 'LastName',
      userName: json.email,
      eMail: json.email,
      balance: Number.parseFloat(json.balance),
      accountType: json.user_permissions.length === 0 ? 'employee' : 'employee',
      hours: 4,
    };

    return user;
  }

  function postName(field1: string, field2: string, password: string) {
    console.log(fieldError);
    if (field1.split(' ').length !== 2) {
      setFieldError('Name Must Consist of Two Parts, Seperated by a Space');
      return;
    }
    const first = field1.split(' ')[0];
    const last = field1.split(' ')[1];

    fetch('http://127.0.0.1:8000/users/users/', {
      headers: { Authorization: `Token ${props.authKey}` },
      credentials: 'same-origin',
      body: JSON.stringify({ firstName: first, lastName: last }),
    })
      .then((response) => {
        if (response.status === 200) {
          setFieldError('');
          setFieldModal(false);
        } else {
          setFieldError('Server Error: Please Try Again Later');
        }
        console.log(response);
      })
      .catch(() => setFieldError('Server Error: Please Try Again Later'));
  }

  function postEmail(field1: string, field2: string, password: string) {
    console.log(fieldError);
    if (field1.split('@').length !== 2) {
      setFieldError('Must Contain User and Domain');
      return;
    }

    if (field1 !== field2) {
      setFieldError('Emails Must Match');
      return;
    }

    fetch('http://127.0.0.1:8000/users/users/', {
      headers: { Authorization: `Token ${props.authKey}` },
      credentials: 'same-origin',
      body: JSON.stringify({ email: field1 }),
    })
      .then((response) => {
        if (response.status === 200) {
          setFieldError('');
          setFieldModal(false);
        } else {
          setFieldError('Server Error: Please Try Again Later');
        }
        console.log(response);
      })
      .catch(() => setFieldError('Server Error: Please Try Again Later'));
  }

  function postPassword(field1: string, field2: string, password: string) {
    console.log(fieldError);
    if (field1.length < 8) {
      setFieldError('Password Must be At Least 8 Characters');
      return;
    }

    if (field1 !== field2) {
      setFieldError('Passwords Must Match');
      return;
    }

    var data = new FormData();
    data.append('new_password1', field1);
    data.append('new_password2', field2);

    fetch('http://127.0.0.1:8000/auth-endpoint/password/change/', {
      headers: { Authorization: `Token ${props.authKey}` },
      credentials: 'same-origin',
      method: 'POST',
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          setFieldError('');
          setFieldModal(false);
        } else {
          setFieldError('Server Error: Please Try Again Later');
        }
        console.log(response);
      })
      .catch(() => setFieldError('Server Error: Please Try Again Later'));
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
                updateFunction: postName,
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
                updateFunction: postEmail,
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
                updateFunction: postEmail,
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
                updateFunction: postPassword,
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
          updateFunction={currentField.updateFunction}
          error={fieldError}
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
            width: '600px',
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
          authKey={props.authKey}
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
