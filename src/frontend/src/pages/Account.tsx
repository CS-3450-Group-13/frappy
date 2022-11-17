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
import { useAuth } from '../components/auth';
import userEvent from '@testing-library/user-event';

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
  updateFunction: any;
}

type Props = {
  text: string | undefined;
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

export default function Account() {
  const [outOfDate, setOutOfDate] = useState(false);
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

  const auth = useAuth();
  let user = auth?.userInfo;

  useEffect(() => {
    if (outOfDate) {
      fetch('http://127.0.0.1:8000/users/users/current_user/', {
        headers: { Authorization: `Token ${user?.key}` },
        credentials: 'same-origin',
      })
        .then((response) => response.json())
        .then((json) => {
          const newUser: User = parseUser(json);
          auth?.loginAs(
            user?.id,
            newUser.firstName + ' ' + newUser.lastName,
            newUser.userName,
            newUser.eMail,
            user?.password,
            newUser.balance,
            user?.role,
            user?.key,
            newUser.hours
          );
        });
      setOutOfDate(false);
    }
  }, [outOfDate]);

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

  function reAuth(password: string) {
    const formData = new FormData();
    formData.append('email', user?.email ? user.email : '');
    formData.append('password', password);
    fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
      headers: { Authorization: `Token ${user?.key}` },
      credentials: 'same-origin',
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status == 200) {
          return true;
        }
        return false;
      })
      .catch((response) => {
        return false;
      });
  }

  function parseUser(json: any) {
    console.log(json);
    let user: User = {
      id: json.id,
      firstName: json.first_name ? json.first_name : 'FirstName',
      lastName: json.last_name ? json.last_name : 'LastName',
      userName: json.email,
      eMail: json.email,
      balance: Number.parseFloat(json.balance),
      accountType: json.user_permissions.length === 0 ? 'employee' : 'employee',
      hours: 4,
    };

    return user;
  }

  async function postName(field1: string, field2: string, password: string) {
    if (field1.split(' ').length !== 2) {
      setFieldError('Name Must Consist of Two Parts, Seperated by a Space');
      return;
    }
    const first = field1.split(' ')[0];
    const last = field1.split(' ')[1];

    console.log(user?.key);
    console.log(user);

    const formData = new FormData();
    formData.append('first_name', first);
    formData.append('last_name', last);

    const formData2 = new FormData();
    formData2.append('email', user?.email ? user.email : '');
    formData2.append('password', password);
    fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
      headers: { Authorization: `Token ${user?.key}` },
      credentials: 'same-origin',
      method: 'POST',
      body: formData2,
    })
      .then((response) => {
        if (response.status == 200) {
          fetch(`http://127.0.0.1:8000/auth-endpoint/user/`, {
            method: 'PUT',
            headers: { Authorization: `Token ${user?.key}` },
            credentials: 'same-origin',
            body: formData,
          })
            .then((response) => {
              if (response.status === 200) {
                setFieldError('');
                setFieldModal(false);
                setOutOfDate(true);
              } else {
                setFieldError('Server Error: Please Try Again Later');
              }
              console.log(response);
            })
            .catch(() => {
              setFieldError('Server Error: Please Try Again Later');
            });
        } else {
          setFieldError('Incorrect Password');
        }
      })
      .catch(() => {
        setFieldError('Incorrect Password');
      });
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

    const formData = new FormData();
    formData.append('email', field1);

    const formData2 = new FormData();
    formData2.append('email', user?.email ? user.email : '');
    formData2.append('password', password);
    fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
      headers: { Authorization: `Token ${user?.key}` },
      credentials: 'same-origin',
      method: 'POST',
      body: formData2,
    })
      .then((response) => {
        if (response.status == 200) {
          fetch(`http://127.0.0.1:8000/auth-endpoint/user/`, {
            headers: { Authorization: `Token ${user?.key}` },
            method: 'PUT',
            credentials: 'same-origin',
            body: formData,
          })
            .then((response) => {
              if (response.status === 200) {
                setFieldError('');
                setFieldModal(false);
                setOutOfDate(true);
              } else {
                setFieldError('Server Error: Please Try Again Later');
              }
              console.log(response);
            })
            .catch(() => setFieldError('Server Error: Please Try Again Later'));
        } else {
          setFieldError('Incorrect password');
        }
      })
      .catch(() => {
        setFieldError('Incorrect password');
      });
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

    const formData2 = new FormData();
    formData2.append('email', user?.email ? user.email : '');
    formData2.append('password', password);
    fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
      headers: { Authorization: `Token ${user?.key}` },
      credentials: 'same-origin',
      method: 'POST',
      body: formData2,
    })
      .then((response) => {
        if (response.status == 200) {
          fetch('http://127.0.0.1:8000/auth-endpoint/password/change/', {
            headers: { Authorization: `Token ${user?.key}` },
            credentials: 'same-origin',
            method: 'POST',
            body: data,
          })
            .then((response) => {
              if (response.status === 200) {
                setFieldError('');
                setFieldModal(false);
                setOutOfDate(true);
              } else {
                setFieldError('Server Error: Please Try Again Later');
              }
              console.log(response);
            })
            .catch(() => setFieldError('Server Error: Please Try Again Later'));
        } else {
          setFieldError('Incorrect Password');
        }
      })
      .catch(() => {
        setFieldError('Incorrect Password');
      });
  }

  return (
    <div className="user-container">
      <div className="account-heading">Account Information For:</div>
      <div className="user-header heading-2">
        <img src={test} width="75em" className="profile-picture" />
        <div className="user-title header-2">{user?.fullName}</div>
      </div>
      <hr className="ruler" />
      <div className="user-details">
        <div className="account-details heading-2">
          <div className="field-title">Name </div>
          <div className="colon">:</div>
          <EditableText
            text={`${user?.fullName}`}
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
            text={user?.email}
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
            text={user?.email}
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
            <u>{user?.role === 'manager' ? 'Store' : 'User'} Balance:</u>
          </div>
          <div className="balance-display">${user?.balance.toFixed(2)}</div>
          <div className="small-link" onClick={openBalanceModal}>
            Add to Balance
          </div>
          {(user?.role === 'manager' || user?.role === 'employee') && (
            <div className="time-worked-div">
              <div>
                <u>Hours Clocked:</u>
              </div>

              <div className="time-display">{user?.hours.toFixed(1)} Hr</div>
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
          setOutOfDate={setOutOfDate}
          currentBalance={user?.balance ? user?.balance : 0.0}
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
        <HoursModal setModalIsOpen={setHoursModal} currentHours={user?.hours} />
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
