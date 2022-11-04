import { setegid } from 'process';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';

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
  });
  const [accounts, setAccounts] = useState([
    {
      name: '',
      email: '',
      balance: '',
      role: '',
    },
  ]);

  const auth = useAuth();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/users/', {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let accountsData = [];
        for (let i = 0; i < data.length; i++) {
          let newAccount = {
            name: data[i].first_name + ' ' + data[i].last_name,
            email: data[i].email,
            balance: data[i].balance,
            role: 'customer',
          };
          accountsData.push(newAccount);
        }
        console.log(accountsData);
        setAccounts(accountsData);
      });
  }, []);

  function handleEditRole(name: string, role: string) {
    setCurrentPerson({
      name: name,
      role: role,
    });
    setEditOpen(true);
  }

  const tableRows = accounts.map((data) => (
    <tr>
      <td>{data.name}</td>
      <td>
        {data.role}
        <button
          className="inventory-btn"
          onClick={() => handleEditRole(data.name, data.role)}
        >
          edit
        </button>
      </td>
      <td>{data.balance}</td>
      <td>
        History <button className="btn">open</button>
      </td>
      <td>{data.email}</td>
    </tr>
  ));

  return (
    <div className="edit-inventory-container">
      <h1>Edit Account Permissions:</h1>
      <h2>Accounts:</h2>
      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <tr className="first-row">
            <th>Name</th>
            <th>Role</th>
            <th>Balance</th>
            <th>Order History</th>
            <th>Email:</th>
          </tr>
          {tableRows}
        </table>
      </div>
    </div>
  );
}
