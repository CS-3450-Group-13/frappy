import { setegid } from 'process';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
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
    id: 0,
    name: '',
    role: '',
  });
  const [accounts, setAccounts] = useState([
    {
      id: 0,
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
          let Newrole = 'Customer';
          if (data[i].employee !== null) {
            let employee = data[i].employee;
            if (employee.is_manager) {
              Newrole = 'Manager';
            } else if (employee.is_barista) {
              Newrole = 'Barista';
            } else if (employee.is_cashier) {
              Newrole = 'Cashier';
            }
          }
          let newAccount = {
            id: data[i].id,
            name: data[i].first_name + ' ' + data[i].last_name,
            email: data[i].email,
            balance: data[i].balance,
            role: Newrole,
          };
          accountsData.push(newAccount);
        }
        console.log(accountsData);
        setAccounts(accountsData);
      });
  }, []);

  function handleEditRole(id: number, name: string, role: string) {
    setCurrentPerson({
      id: id,
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
          className="btn"
          onClick={() => handleEditRole(data.id, data.name, data.role)}
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
    <div className="edit-accounts-container">
      <h1>Edit Account Permissions:</h1>
      <h2>Accounts:</h2>
      <div className="accounts-table-wrapper">
        <table className="accounts-table">
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
      <EditAccountRoleModal
        open={editOpen}
        setOpen={setEditOpen}
        person={currentPerson}
      />
    </div>
  );
}
