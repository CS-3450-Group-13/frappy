import { setegid } from 'process';
import React, { useState } from 'react';
import '../css/ManagerEditAccounts.css';
import EditAccountRoleModal from './EditAccountRoleModal';

const MockAccounts = [
  {
    photo: 'hehe',
    name: 'John Smith',
    role: 'customer',
    balance: 450.9,
    history: 'History',
  },
  {
    photo: 'hehe',
    name: 'Eli Smith',
    role: 'employee',
    balance: 450.9,
    history: 'History',
  },
  {
    photo: 'hehe',
    name: 'John Smith',
    role: 'customer',
    balance: 450.9,
    history: 'History',
  },
  {
    photo: 'hehe',
    name: 'John Smith',
    role: 'customer',
    balance: 450.9,
    history: 'History',
  },
];

export default function ManagerEditAccounts() {
  const [editOpen, setEditOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState({
    name: '',
    role: '',
    history: '',
  });

  function handleEditRole(name: string, role: string, history: string) {
    setCurrentPerson({
      name: name,
      role: role,
      history: history,
    });
    setEditOpen(true);
  }

  const tableRows = MockAccounts.map((data) => (
    <tr>
      <td>{data.photo}</td>
      <td>{data.name}</td>
      <td>
        {data.role}
        <button
          className="btn"
          onClick={() => handleEditRole(data.name, data.role, data.history)}
        >
          edit
        </button>
      </td>
      <td>{data.balance}</td>
      <td>
        {data.history} <button className="btn">open</button>
      </td>
    </tr>
  ));

  return (
    <div className="edit-accounts-container">
      <h1>Edit Account Permissions:</h1>
      <h2>Accounts:</h2>
      <div className="accounts-table-wrapper">
        <table className="accounts-table">
          <tr className="first-row">
            <th>Photo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Balance</th>
            <th>Order History</th>
          </tr>
          {tableRows}
        </table>
      </div>
      <EditAccountRoleModal
        open={editOpen}
        setOpen={setEditOpen}
        person={currentPerson}
      />
    </div>
  );
}
