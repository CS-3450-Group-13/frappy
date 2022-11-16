import React from 'react';
import Modal from 'react-modal';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';

interface Person {
  id: number;
  employeeId: number;
  name: string;
  role: string;
}

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  person: Person;
  getAccounts: Function;
}

export default function EditAccountRoleModal({
  open,
  setOpen,
  person,
  getAccounts,
}: PropsType) {
  const auth = useAuth();

  const updateRole = () => {
    var body = {
      id: person.id,
      user: person.id,
      is_cashier: false,
      is_barista: false,
      is_manager: false,
    };
    let newRole = document.getElementById('new-role') as HTMLInputElement;
    switch (newRole.value) {
      case 'Customer':
        break;
      case 'Cashier':
        body = {
          id: person.employeeId,
          user: person.id,
          is_cashier: true,
          is_barista: false,
          is_manager: false,
        };
        break;
      case 'Barista':
        body = {
          id: person.employeeId,
          user: person.id,
          is_cashier: false,
          is_barista: true,
          is_manager: false,
        };
        break;
      case 'Manager':
        body = {
          id: person.employeeId,
          user: person.id,
          is_cashier: true,
          is_barista: true,
          is_manager: true,
        };
        break;
      default:
        break;
    }
    console.log(body);
    if (person.role === 'Customer') {
      fetch('http://127.0.0.1:8000/users/employees/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${auth?.userInfo.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          getAccounts();
        });
    } else if (person.role === 'Barista' || person.role === 'Cashier') {
      if (newRole.value !== 'Customer') {
        fetch(`http://127.0.0.1:8000/users/employees/${person.employeeId}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Token ${auth?.userInfo.key}`,
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify(body),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            getAccounts();
          });
      } else {
        fetch(`http://127.0.0.1:8000/users/employees/${person.employeeId}/`, {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${auth?.userInfo.key}`,
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify(body),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            getAccounts();
          });
      }
    }
  };

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
          <select id="new-role">
            <option>Customer</option>
            <option>Barista</option>
            <option>Cashier</option>
            {/* <option>Manager</option> */}
          </select>
        </div>
        <div className="btns-container">
          <button className="accounts-close-btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button
            className="accounts-update-btn"
            onClick={() => {
              updateRole();
              setOpen(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
