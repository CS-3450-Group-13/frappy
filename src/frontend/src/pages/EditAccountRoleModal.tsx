import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';

// simplify props passed in
interface Person {
  id: number;
  employeeId: number;
  name: string;
  role: string;
}

// simplify props passed in
interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  person: Person;
  getAccounts: Function;
}

//This is the popup when the manager is hiring or firing an employee
export default function EditAccountRoleModal({
  open,
  setOpen,
  person,
  getAccounts,
}: PropsType) {
  const auth = useAuth();

  // Call to database to update the user account
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
    // hiring an employee
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
          toast.success('Hired new employee');
          console.log(data);
          getAccounts();
        });
    }
    // Changing and employee
    else if (person.role === 'Barista' || person.role === 'Cashier') {
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
          });
        toast.success('Changed role');
        getAccounts();
      }
      // Firing an employee
      else {
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
          });
        getAccounts();
        toast.success('Fired employee, refresh page to see update');
      }
    } else {
      toast.error('Can not edit manager');
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
