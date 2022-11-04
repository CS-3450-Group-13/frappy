import { setegid } from 'process';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { updatePartiallyEmittedExpression } from 'typescript';
import { useAuth } from '../components/auth';
import ItemCartDisplay from '../components/ItemCartDisplay';
import '../css/ManagerEditInventory.css';

const FRONT_TO_BACK_DICT = {
  id: 'id',
  name: 'name',
  price: 'price_per_unit',
  stock: 'stock',
};

type item = {
  id: number;
  name: string;
  price: number;
  stock: number;
  lastModified: string;
};

type itemKey = keyof item;

interface editableTextProps {
  text: string;
  id: number;
  field: itemKey;
  updateFunction: any;
}

const EMPTY_ITEM: item = {
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  lastModified: '',
};

export default function ManagerEditInventory() {
  const [editOpen, setEditOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState({
    name: '',
    role: '',
  });
  const [bases, setBases] = useState([EMPTY_ITEM]);
  const [milks, setMilks] = useState([EMPTY_ITEM]);
  const [extras, setExtras] = useState([EMPTY_ITEM]);
  const [basesCurrent, setBasesCurrent] = useState(false);
  const [milksCurrent, setMilksCurrent] = useState(false);
  const [extrasCurrent, setExtrasCurrent] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    if (!basesCurrent) {
      getItems('http://127.0.0.1:8000/frappapi/bases/', setBases);
      setBasesCurrent(true);
    }
    if (!milksCurrent) {
      getItems('http://127.0.0.1:8000/frappapi/milks/', setMilks);
      setMilksCurrent(true);
    }
    if (!extrasCurrent) {
      getItems('http://127.0.0.1:8000/frappapi/extras/', setExtras);
      setExtrasCurrent(true);
    }
  }, []);

  function getItems(endpoint: string, setFunction: (items: item[]) => void) {
    fetch(endpoint, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let dataList: item[] = [];
        for (let i = 0; i < data.length; i++) {
          let newItem = {
            id: data[i].id,
            name: data[i].name,
            stock: data[i].stock,
            price: data[i].price_per_unit,
            lastModified: data[i].updated_on,
          };
          dataList.push(newItem);
        }
        console.log(endpoint);
        console.log(dataList);
        setFunction(dataList);
      });
  }

  function godWhy<O extends Object, K extends keyof O, V extends O[K]>(
    object: O,
    key: K,
    value: V
  ) {
    object[key] = value;
  }

  function updateItem(
    value: any,
    id: number,
    field: itemKey,
    items: item[],
    setter: (items: item[]) => void
  ) {
    let updateItem = EMPTY_ITEM;
    const newItems: item[] = items.map((item) => {
      if (item.id == id) {
        let newItem: item = {
          id: item.id,
          name: item.name,
          stock: item.stock,
          price: item.price,
          lastModified: item.lastModified,
        };
        godWhy(newItem, field, value);
        updateItem = newItem;
        return newItem;
      }
      return item;
    });
    fetch('http://127.0.0.1:8000/frappapi/bases/1/').then((response) => {
      if (response.status === 200) {
        response.json().then((itemData) => {
          console.log(itemData);
          const realField = FRONT_TO_BACK_DICT[field as keyof Object];
          godWhy(itemData, field, value);
          fetch('http://127.0.0.1:8000/frappapi/bases/1/', {
            method: 'PUT',
            headers: {
              Authorization: `Token ${auth?.userInfo.key}`,
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(updateBase),
          }).then((response) => {
            if (response.status === 200) {
              setter(newItems);
            } else {
              alert('Server Error: Please Try Again Later');
            }
          });
        });
      } else {
        alert('Server Error: Please Try Again Later');
      }
    });
  }

  function updateBase(value: string | number, id: number, field: itemKey) {
    updateItem(value, id, field, bases, setBases);
  }

  function updateMilk(value: string | number, id: number, field: itemKey) {
    updateItem(value, id, field, milks, setMilks);
  }

  function updateExtra(value: string | number, id: number, field: itemKey) {
    updateItem(value, id, field, extras, setExtras);
  }

  function createTable(list: any) {
    const tableRows = list.map((data: any) => (
      <tr>
        <EditableTextCell
          text={data.name}
          id={data.id}
          field="name"
          updateFunction={updateBase}
        />
        <EditableTextCell
          text={data.stock}
          id={data.id}
          field="name"
          updateFunction={updateBase}
        />
        <EditableTextCell
          text={data.price}
          id={data.id}
          field="name"
          updateFunction={updateBase}
        />
        <td>{data.lastModified.split('T')[0]}</td>
      </tr>
    ));

    return (
      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <tr className="first-row">
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Last Ordered</th>
          </tr>
          {tableRows}
        </table>
      </div>
    );
  }

  console.log(extras);

  return (
    <div className="edit-inventory-container">
      <h1>Edit Inventory:</h1>
      <h2>Bases:</h2>
      {createTable(bases)}
      <h2>Milk:</h2>
      {createTable(milks)}
      <h2>Extras:</h2>
      {createTable(extras)}
    </div>
  );
}

function EditableTextCell(props: editableTextProps) {
  const [editOn, setEditOn] = useState(false);
  const [newVal, setNewVal] = useState('');

  return (
    <td>
      {!editOn && (
        <div className="cell-container">
          <div className="invetory-edit-text">{props.text}</div>
          <div className="inventory-edit-btn" onClick={() => setEditOn(true)}>
            Edit
          </div>
        </div>
      )}
      {editOn && (
        <div className="cell-container">
          <input
            defaultValue={props.text}
            onChange={(e) => setNewVal(e.target.value)}
          ></input>
          <div className="action-btn-container">
            <div
              className="inventory-edit-btn inventory-cancel-btn"
              onClick={() => setEditOn(false)}
            >
              Cancel
            </div>
            <div
              className="inventory-edit-btn inventory-accept-btn"
              onClick={() => {
                props.updateFunction(newVal, props.id, props.field);
                setEditOn(false);
              }}
            >
              Save
            </div>
          </div>
        </div>
      )}
    </td>
  );
}
