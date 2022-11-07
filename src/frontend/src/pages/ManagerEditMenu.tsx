import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import { Base, Extra, MenuItem, Milk } from '../types/Types';
import EditMenuItemModal from './EditMenuItemModal';
import NewMenuItemModal from './NewMenuItemModal';

// const blankMenuItem = {
//   name: '',
//   frappe: {

//   },
//   photo: '',
//   prices: [1, 2, 3],
// };

export default function ManagerEditMenu() {
  const [editOpen, setEditOpen] = useState(false);
  const [newItemOpen, setNewItemOpen] = useState(false);
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>();
  const [bases, setBases] = useState<Base[]>([]);
  const [milks, setMilks] = useState<Milk[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [newId, setNewId] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/bases/')
      .then((response) => response.json())
      .then((data) => {
        setBases([]);
        data.forEach((item: Base) => {
          setBases((oldState) => [...oldState, item]);
        });
        console.log('Got bases: ', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/milks/')
      .then((response) => response.json())
      .then((data) => {
        setMilks([]);
        data.forEach((item: Milk) => {
          setMilks((oldState) => [...oldState, item]);
        });
        console.log('Got milks: ', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/extras/')
      .then((response) => response.json())
      .then((data) => {
        setExtras([]);
        data.forEach((item: Extra) => {
          setExtras((oldState) => [...oldState, item]);
        });
        console.log('data is ', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems([]);
        data.forEach((item: MenuItem) => {
          setMenuItems((oldState) => [...oldState, item]);
        });
        setNewId(menuItems[menuItems.length - 1].frappe.id + 1);
        setCurrentFrappe(menuItems[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const auth = useAuth();

  const handleEditOpen = (menuItem: MenuItem) => {
    setCurrentMenuItem(menuItem);
    setEditOpen(true);
  };

  const handleNewOpen = () => {
    setNewItemOpen(true);
  };

  const tableRows = menuItems.map((data) => (
    <tr>
      <td>
        <button onClick={() => handleEditOpen(data)}>Edit</button>
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
      <td>{bases.find((item) => item.id === data.frappe.base)?.name}</td>
      <td>{milks.find((item) => item.id === data.frappe.milk)?.name}</td>
      <td>
        <button>Extras</button>
      </td>
      <td>{data.frappe.create_date.slice(0, 10)}</td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="edit-accounts-container">
      <h1>Edit Menu:</h1>
      <div className="table-header">
        <h2>Menu Items:</h2>
        <button onClick={handleNewOpen}>Add New Item</button>
      </div>
      <div className="accounts-table-wrapper">
        <table className="accounts-table">
          <tr className="first-row">
            <th></th>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Base</th>
            <th>Milk</th>
            <th>Extras</th>
            <th>Date Created</th>
            <th>Delete</th>
          </tr>
          {tableRows}
        </table>
      </div>
      <EditMenuItemModal
        menuItem={currentMenuItem}
        open={editOpen}
        setOpen={setEditOpen}
        bases={bases}
        milks={milks}
        extras={extras}
      ></EditMenuItemModal>
      <NewMenuItemModal
        open={newItemOpen}
        setOpen={setNewItemOpen}
        bases={bases}
        milks={milks}
        extras={extras}
        newId={newId}
      ></NewMenuItemModal>
    </div>
  );
}
