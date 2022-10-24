import React, { useState } from 'react';
import internal from 'stream';
import EditIcon from '../images/edit-icon.svg';
import '../css/Account.css';
import test from '../images/test.png';
import UpdateFieldModal from './UpdateFieldModal';
import Modal from 'react-modal';
import BalanceModal from './BalaceModal';

interface User {
  fullName: string;
  userName: string;
  eMail: string;
  password: number; // Only Care About Password Length for Display Purposes, Should be Hashed Anyways
  balance: number;
}

interface Field {
  name: string;
  value: string;
  confirm: boolean;
}

const DEMO_USER: User = {
  fullName: 'Glorgo Glumbus',
  userName: 'GlorGlu',
  eMail: 'glorglugaming@gmail.com',
  password: 4,
  balance: 400.32,
};

type Props = {
  text: string;
  onClick: () => void;
};

const maxSize = 16;

export default function Account() {
  const [balanceModalOpen, setBalanceModal] = useState(false);
  const [fieldModalOpen, setFieldModal] = useState(false);
  const [currentField, setCurrentField] = useState({
    name: '',
    value: '',
    confirm: false,
  });

  function openFieldModal(field: Field) {
    setCurrentField(field);
    setFieldModal(true);
  }

  function openBalanceModal() {
    setBalanceModal(true);
  }

  return (
    <div className="user-container">
      <div className="account-heading">Account Information For:</div>
      <div className="user-header heading-2">
        <img src={test} width="75em" className="profile-picture" />
        <div className="user-title header-2">{DEMO_USER.fullName}</div>
      </div>
      <hr className="ruler" />
      <div className="user-details">
        <div className="account-details heading-2">
          <div className="field-title">Name </div>
          <div className="colon">:</div>
          <EditableText
            text={DEMO_USER.fullName}
            onClick={() =>
              openFieldModal({
                name: 'Name',
                value: DEMO_USER.fullName,
                confirm: false,
              })
            }
          ></EditableText>
          <div className="field-title">User Name </div>
          <div className="colon">:</div>
          <EditableText
            text={DEMO_USER.userName}
            onClick={() =>
              openFieldModal({
                name: 'User Name',
                value: DEMO_USER.userName,
                confirm: false,
              })
            }
          ></EditableText>
          <div className="field-title">Email </div>
          <div className="colon">:</div>
          <EditableText
            text={DEMO_USER.eMail}
            onClick={() =>
              openFieldModal({
                name: 'Email',
                value: DEMO_USER.eMail,
                confirm: true,
              })
            }
          ></EditableText>
          <div className="field-title">Password </div>
          <div className="colon">:</div>
          <EditableText
            text={'*'.repeat(DEMO_USER.password)}
            onClick={() =>
              openFieldModal({
                name: 'Password',
                value: '*'.repeat(DEMO_USER.password),
                confirm: true,
              })
            }
          ></EditableText>
        </div>

        <div className="balance-information heading-2">
          <div>
            <u>Balance:</u>
          </div>
          <div className="balance-display">${DEMO_USER.balance.toFixed(2)}</div>
          <div className="small-link" onClick={openBalanceModal}>
            Add to Balance
          </div>
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
          confirm={true}
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
          currentBalance={DEMO_USER.balance}
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
