import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import EditAccountRoleModal from './EditAccountRoleModal';
import customer from '../images/test.png';
import employee from '../images/test1.png';
import OrderHistoryModal from './OrderHistoryModal';

const ORDER_ENDPOINT = 'http://127.0.0.1:8000/frappapi/cashier/';

// Component where the manager can hire and fire employees and view their information
export default function ManagerEditAccounts() {
  // state variables to keep track of users
  const [editOpen, setEditOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState({
    id: 0,
    employeeId: 0,
    name: '',
    role: '',
  });
  const [accounts, setAccounts] = useState([
    {
      id: 0,
      employeeId: 0,
      name: '',
      email: '',
      balance: '',
      role: '',
    },
  ]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [filter, setFilter] = useState(0);

  const auth = useAuth();

  // api call to get all user accounts
  const getAccounts = () => {
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
          let employeeId = 0;
          if (data[i].employee !== null) {
            let employee = data[i].employee;
            employeeId = employee.id;
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
            employeeId: employeeId,
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
  };

  // on first render get all accounts
  useEffect(() => {
    getAccounts();
  }, []);

  // Change role on frontend display
  function handleEditRole(
    id: number,
    employeeId: number,
    name: string,
    role: string
  ) {
    setCurrentPerson({
      id: id,
      employeeId: employeeId,
      name: name,
      role: role,
    });
    setEditOpen(true);
  }

  function handleOpenHistory(id: number) {
    console.log('OPEN HISTORY');
    setFilter(id);
    setHistoryOpen(true);
  }

  // returns all the table rows based on the data received from the database
  const tableRows = accounts.map((data) => (
    <tr>
      <td>
        {data.role == 'Customer' ? (
          <div className="image-wrapper-customer">
            <img src={customer} alt={data.name}></img>
          </div>
        ) : (
          <div className="image-wrapper-employee">
            <img src={employee} alt={data.name}></img>
          </div>
        )}
      </td>
      <td>{data.name}</td>
      <td>
        {data.role}
        <button
          className="btn"
          onClick={() =>
            handleEditRole(data.id, data.employeeId, data.name, data.role)
          }
        >
          edit
        </button>
      </td>
      <td>${data.balance}</td>
      <td>
        History{' '}
        <button onClick={() => handleOpenHistory(data.id)} className="btn">
          open
        </button>
      </td>
      <td>{data.email}</td>
    </tr>
  ));

  // Header and buttons of the table and modals that open when buttons are clicked
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
            <th>Email:</th>
          </tr>
          {tableRows}
        </table>
      </div>
      <EditAccountRoleModal
        getAccounts={getAccounts}
        open={editOpen}
        setOpen={setEditOpen}
        person={currentPerson}
      />
      <OrderHistoryModal
        open={historyOpen}
        endpoint={ORDER_ENDPOINT}
        filter={filter}
        setOpen={setHistoryOpen}
      />
    </div>
  );
}
