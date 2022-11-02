import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import EditAccountRoleModal from './EditAccountRoleModal';
import { CompleteFrappe } from '../types/Types';

type Props = {
  menuItems: Array<CompleteFrappe>;
};

export default function ManagerEditMenu({ menuItems }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const tableRows = menuItems.map((data) => (
    <tr>
      <td>
        <div className="image-wrapper">
          <img src={data.menu_item.photo} alt={data.menu_item.name}></img>
        </div>
      </td>
      <td>{data.menu_item.name}</td>
      <td>{data.menu_item.frappe}</td>
      <td>{data.menu_item.price.toFixed(2)}</td>
      <td>
        <button>Extras</button>
      </td>
      <td>{data.frappe.create_date.slice(0, 10)}</td>
    </tr>
  ));

  return (
    <div className="edit-accounts-container">
      <h1>Edit Menu:</h1>
      <h2>Menu Items:</h2>
      <div className="accounts-table-wrapper">
        <table className="accounts-table">
          <tr className="first-row">
            <th>Photo</th>
            <th>Name</th>
            <th>Stock</th>
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
