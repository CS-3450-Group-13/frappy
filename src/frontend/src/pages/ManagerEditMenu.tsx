import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import { MenuItem } from '../types/Types';
import EditAccountRoleModal from './EditAccountRoleModal';

export default function ManagerEditMenu() {
  const [editOpen, setEditOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems([]);
        data.forEach((item: MenuItem) => {
          setMenuItems((oldState) => [...oldState, item]);
        });
        console.log('data is ', data);
        console.log(menuItems);
        setCurrentFrappe(menuItems[0]);
        console.log('current frappe is ');
        console.log(currentFrappe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const auth = useAuth();

  const tableRows = menuItems.map((data) => (
    <tr>
      <td>
        <button>Edit</button>
      </td>
      <td>
        <div className="image-wrapper">
          <img src={data.photo} alt={data.name}></img>
        </div>
      </td>
      <td>{data.name}</td>
      <td>
        sm: ${data.prices[0].toFixed(2)} md: ${data.prices[1].toFixed(2)} lg: $
        {data.prices[2].toFixed(2)}
      </td>
      <td>
        <button>Extras</button>
      </td>
      <td>{data.frappe.create_date.slice(0, 10)}</td>
    </tr>
  ));

  return (
    <div className="edit-accounts-container">
      <h1>Edit Menu:</h1>
      <div className="table-header">
        <h2>Menu Items:</h2>
        <button>Add New Item</button>
      </div>
      <div className="accounts-table-wrapper">
        <table className="accounts-table">
          <tr className="first-row">
            <th></th>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Extras</th>
            <th>Date Created</th>
          </tr>
          {tableRows}
        </table>
      </div>
    </div>
  );
}
