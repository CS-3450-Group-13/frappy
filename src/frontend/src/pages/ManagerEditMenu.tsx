import { useEffect, useState } from 'react';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import { Base, Extra, FrappeExtra, MenuItem, Milk } from '../types/Types';
import EditMenuItemModal from './EditMenuItemModal';
import NewMenuItemModal from './NewMenuItemModal';
import newDrink from '../images/large-new.png';

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
    fetchExtras();
    getMenu();
    fetchBases();
    fetchMilks();
    console.log(menuItems);
  }, []);

  const getMenu = () => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMenuItems([]);
        data.forEach((item: MenuItem) => {
          setMenuItems((oldState) => [...oldState, item]);
        });
        setNewId(data.length);
        console.log(newId);
        setCurrentFrappe(menuItems[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchExtras = () => {
    fetch('http://127.0.0.1:8000/frappapi/extras/')
      .then((response) => response.json())
      .then((data) => {
        setExtras([]);
        data.forEach((item: Extra) => {
          setExtras((oldState) => [...oldState, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBases = () => {
    fetch('http://127.0.0.1:8000/frappapi/bases/')
      .then((response) => response.json())
      .then((data) => {
        setBases([]);
        data.forEach((item: Base) => {
          setBases((oldState) => [...oldState, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMilks = () => {
    fetch('http://127.0.0.1:8000/frappapi/milks/')
      .then((response) => response.json())
      .then((data) => {
        setMilks([]);
        data.forEach((item: Milk) => {
          setMilks((oldState) => [...oldState, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const auth = useAuth();

  const handleEditOpen = (menuItem: MenuItem) => {
    setCurrentMenuItem(menuItem);
    setEditOpen(true);
  };

  const handleNewOpen = () => {
    setNewItemOpen(true);
  };

  const getExtras = (frappeExtras: FrappeExtra[]) => {
    const ExtrasNameList = [''];
    for (let i = 0; i < extras.length; i++) {
      ExtrasNameList.push(extras[i].name);
    }
    return (
      <td>
        <ul className="extras-list">
          {frappeExtras.map(
            (extra) =>
              extra.frappe !== undefined && (
                <li>
                  {ExtrasNameList[extra.extras]} -- {extra.amount}
                </li>
              )
          )}
        </ul>
      </td>
    );
  };

  const deActivate = (menuItem: MenuItem) => {
    fetch(
      `http://127.0.0.1:8000/frappapi/menu/${menuItem.frappe.menu_key}/activate/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${auth?.userInfo.key}`,
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(menuItem),
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        getMenu();
      });
  };

  const tableRows = menuItems.map((data) => (
    <tr>
      <td>
        <button className="btn" onClick={() => handleEditOpen(data)}>
          Edit
        </button>
      </td>
      <td>
        {data.photo === null && (
          <div className="image-wrapper">
            <img src={newDrink} alt={data.name}></img>
          </div>
        )}
        {data.photo && (
          <div className="image-wrapper">
            <img src={data.photo} alt={data.name}></img>
          </div>
        )}
      </td>
      <td>{data.name}</td>
      <td>
        sm: ${data.prices[0].toFixed(2)} md: ${data.prices[1].toFixed(2)} lg: $
        {data.prices[2].toFixed(2)}
      </td>
      <td>{bases.find((item) => item.id === data.frappe.base)?.name}</td>
      <td>{milks.find((item) => item.id === data.frappe.milk)?.name}</td>
      <td>{getExtras(data.frappe.extras)}</td>
      <td>{data.frappe.create_date.slice(0, 10)}</td>
      <td>
        <div className="status-row">
          {data.active && <div>Active</div>}
          {data.active === false && <div>Not Active</div>}
          <button className="btn active" onClick={() => deActivate(data)}>
            Change
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="edit-accounts-container">
      <h1>Edit Menu:</h1>
      <div className="table-header">
        <h2>Menu Items:</h2>
        <button className="add-item-btn" onClick={handleNewOpen}>
          Add New Item
        </button>
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
            <th>Status</th>
          </tr>
          {tableRows}
        </table>
      </div>
      <EditMenuItemModal
        getMenu={getMenu}
        menuItem={currentMenuItem}
        open={editOpen}
        setOpen={setEditOpen}
        bases={bases}
        milks={milks}
        extras={extras}
        newId={newId}
      ></EditMenuItemModal>
      <NewMenuItemModal
        getMenu={getMenu}
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
