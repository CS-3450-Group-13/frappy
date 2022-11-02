import React from 'react';
import Modal from 'react-modal';
import '../css/ManagerEditAccounts.css';

interface Person {
  name: string;
  role: string;
}

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  person: Person;
}

export default function EditAccountRoleModal({
  open,
  setOpen,
  person,
}: PropsType) {
  return (
    <Modal
      isOpen={open}
      style={{
        content: {
          marginLeft: '10%',
          marginRight: '10%',
          height: '300px',
          padding: '20px',
          borderRadius: '15px',
          backgroundColor: '#10603B',
          color: 'white',
          overflow: 'scroll',
        },
      }}
    >
      <div className="accounts-modal">
        <h1>Edit Account Role</h1>
        <h2>Name: {person.name}</h2>
        <h2>Current Role: {person.role}</h2>
        <div className="options-container">
          <h3>Change To: </h3>
          <select>
            <option>Customer</option>
            <option>Barista</option>
            <option>Cashier</option>
            <option>Manager</option>
          </select>
        </div>
        <div className="btns-container">
          <button className="accounts-close-btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button
            className="accounts-update-btn"
            onClick={() => setOpen(false)}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
