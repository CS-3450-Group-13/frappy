import { setegid } from 'process';
import { stringify } from 'querystring';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { updatePartiallyEmittedExpression } from 'typescript';
import { useAuth } from '../components/auth';
import ItemCartDisplay from '../components/ItemCartDisplay';
import '../css/ManagerEditInventory.css';
import Modal from 'react-modal';
import { stat } from 'fs';
import { json } from 'stream/consumers';
import userEvent from '@testing-library/user-event';

const BASE_ENDPOINT = 'http://127.0.0.1:8000/frappapi/bases/';
const MILK_ENDPOINT = 'http://127.0.0.1:8000/frappapi/milks/';
const EXTRA_ENDPOINT = 'http://127.0.0.1:8000/frappapi/extras/';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type item = {
  id: number;
  name: string;
  price: number;
  stock: number;
  lastModified: string;
};

enum RowState {
  default,
  edit,
  updating,
  success,
  failed,
  deleted,
  order,
}

enum ModalState {
  default,
  updating,
  success,
  failed,
}

interface EditableRowPrpos {
  item: item;
  endpoint: string;
  stringify: (item: item) => string;
  updateItem: (item: item, oldItem: item) => void;
}

interface ItemModalProps {
  setModal: (state: boolean) => void;
  createParams: CreateParams;
}

interface CreateParams {
  endpoint: string;
  stringify: (item: item) => string;
  addItem: (item: item) => void;
}

const EMPTY_ITEM: item = {
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  lastModified: '',
};

const EMPTY_PARAMS: CreateParams = {
  endpoint: '',
  stringify: (item: item) => '',
  addItem: (item: item) => '',
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
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [createParams, setCreateParams] = useState(EMPTY_PARAMS);

  const auth = useAuth();

  useEffect(() => {
    if (!basesCurrent) {
      getItems(BASE_ENDPOINT, setBases);
      setBasesCurrent(true);
    }
    if (!milksCurrent) {
      getItems(MILK_ENDPOINT, setMilks);
      setMilksCurrent(true);
    }
    if (!extrasCurrent) {
      getItems(EXTRA_ENDPOINT, setExtras);
      setExtrasCurrent(true);
    }
  }, []);

  function openModal(
    endpoint: string,
    stringify: (item: item) => string,
    addFunction: (item: item) => void
  ) {
    setItemModalOpen(true);
    setCreateParams({
      endpoint: endpoint,
      stringify: stringify,
      addItem: addFunction,
    });
  }

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
            lastModified: String(data[i].updated_on).split('T')[0],
          };
          dataList.push(newItem);
        }
        setFunction(dataList);
      });
  }

  function stringifyBase(base: item) {
    const formBase = {
      name: base.name,
      stock: base.stock,
      price_per_unit: base.price,
      decaf: false,
    };

    return JSON.stringify(formBase);
  }

  function stringifyMilk(milk: item) {
    console.log(milk);
    const formMilk = {
      name: milk.name,
      stock: milk.stock,
      price_per_unit: milk.price,
      non_dairy: false,
    };

    return JSON.stringify(formMilk);
  }

  function stringifyExtra(extra: item) {
    const formExtra = {
      name: extra.name,
      stock: extra.stock,
      price_per_unit: extra.price,
      limit: 9999999,
    };

    return JSON.stringify(formExtra);
  }

  function updateItem(
    newItem: item,
    collection: item[],
    setter: (items: item[]) => void,
    oldItem: item
  ) {
    const newItems: item[] = collection.map((member: item) => {
      if (member.id === oldItem.id) {
        return newItem;
      }
      return member;
    });
    setter(newItems);
  }

  function addItem(
    newItem: item,
    collection: item[],
    setter: (items: item[]) => void
  ) {
    let copyCollection = [...collection];
    copyCollection.push(newItem);
    setter(copyCollection);
  }

  function createTable(
    list: item[],
    setter: (items: item[]) => void,
    endpoint: string,
    stringify: (item: item) => string
  ) {
    const tableRows = list.map((data: any) => {
      if (data.stock !== -1) {
        return (
          <EditableRow
            item={data}
            endpoint={endpoint}
            stringify={stringify}
            updateItem={(item: item, oldItem: item) =>
              updateItem(item, list, setter, oldItem)
            }
          />
        );
      }
      return;
    });

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
          <tr className="inventory-last-row">
            <td colSpan={5}>
              <div
                className="inventory-btn inventory-create-btn"
                onClick={() => {
                  openModal(endpoint, stringify, (item: item) =>
                    addItem(item, list, setter)
                  );
                }}
              >
                +Add Item
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  return (
    <div className="edit-inventory-container">
      <h1>Edit Inventory:</h1>
      <h2>Bases:</h2>
      {createTable(bases, setBases, BASE_ENDPOINT, stringifyBase)}
      <h2>Milk:</h2>
      {createTable(milks, setMilks, MILK_ENDPOINT, stringifyMilk)}
      <h2>Extras:</h2>
      {createTable(extras, setExtras, EXTRA_ENDPOINT, stringifyExtra)}
      <Modal
        overlayClassName="dark"
        isOpen={itemModalOpen}
        style={{
          content: {
            height: '100vh',
            width: '500px',
            marginLeft: 'auto',
            padding: '0px',
            inset: '0px',
            border: 'none',
            borderRadius: '0px',
            background: 'white',
            backgroundColor: 'rgba(0,0,0,0)',
          },
        }}
      >
        <ItemModal setModal={setItemModalOpen} createParams={createParams} />
      </Modal>
    </div>
  );
}

function EditableRow(props: EditableRowPrpos) {
  const [state, setState] = useState<RowState>(RowState.default);
  const [name, setName] = useState(props.item.name);
  const [stock, setStock] = useState(props.item.stock);
  const [price, setPrice] = useState(props.item.price);
  const [order, setOrder] = useState(0);

  const auth = useAuth();
  const user = auth?.userInfo;

  function handleOrder() {
    setState(RowState.order);
  }

  function updateOrder(value: any) {
    if (value) {
      setOrder(value);
    } else {
      setOrder(0);
    }
  }

  function orderInventory() {
    const orderDetails = { amount: order };
    updateOrder(0);
    setState(RowState.updating);
    fetch(`${props.endpoint}${props.item.id}/buy/`, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            if (!data.error) {
              const newItem: item = {
                id: props.item.id,
                name: props.item.name,
                price: props.item.price,
                stock: data.stock,
                lastModified: props.item.lastModified,
              };

              props.updateItem(newItem, props.item);

              auth?.loginAs(
                user?.id,
                user?.fullName,
                user?.userName,
                user?.email,
                user?.password,
                data.current_balance,
                user?.role,
                user?.key,
                user?.hours
              );

              setState(RowState.success);
            } else {
              setState(RowState.failed);
            }
          });
        } else {
          setState(RowState.failed);
        }
      })
      .catch(() => setState(RowState.failed));
  }

  function handelEdit() {
    setState(RowState.edit);
    setName(props.item.name);
    setStock(props.item.stock);
    setPrice(props.item.price);
  }

  function verifyInput(name: string, stock: number, price: number) {
    if (!/^[0-9]*(\.([0-9])?([0-9])?)?$/.test(String(price))) {
      return false;
    }
    if (!/^[0-9]*$/.test(String(stock))) {
      return false;
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return false;
    }
    return true;
  }

  function updateRow() {
    if (!verifyInput(name, stock, price)) {
      setState(RowState.failed);
      return;
    }

    const newItem: item = {
      id: props.item.id,
      name: name,
      stock: stock,
      price: price,
      lastModified: props.item.lastModified,
    };
    console.log(newItem);
    setState(RowState.updating);
    fetch(`${props.endpoint}${props.item.id}/`, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'PUT',
      body: props.stringify(newItem),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const newItem = {
              id: data.id,
              name: data.name,
              stock: data.stock,
              price: data.price_per_unit,
              lastModified: String(data.updated_on).split('T')[0],
            };

            props.updateItem(newItem, props.item);
            setState(RowState.success);
          });
        } else {
          setState(RowState.failed);
        }
      })
      .catch(() => setState(RowState.failed));
  }

  function deleteRow() {
    setState(RowState.updating);

    const newItem: item = {
      id: props.item.id,
      name: props.item.name,
      stock: -1,
      price: price,
      lastModified: props.item.lastModified,
    };

    fetch(`${props.endpoint}${props.item.id}/`, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'PUT',
      body: props.stringify(newItem),
    })
      .then((response) => {
        if (response.status === 200) {
          setState(RowState.deleted);
        } else {
          setState(RowState.failed);
        }
      })
      .catch(() => setState(RowState.failed));
  }

  function restoreRow() {
    setState(RowState.updating);
    const postItem: item = props.item;
    fetch(`${props.endpoint}${props.item.id}/`, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'PUT',
      body: props.stringify(postItem),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const newItem: item = {
              id: data.id,
              name: data.name,
              price: data.price_per_unit,
              stock: data.stock,
              lastModified: String(data.updated_on).split('T')[0],
            };

            console.log(newItem);
            console.log(props.item);
            props.updateItem(newItem, props.item);
            setState(RowState.success);
          });
        } else if (response.status === 400) {
          response.json().then((data) => {
            console.log(data);
            if (data.name === 'base with this name already exists.') {
              setState(RowState.success);
            } else {
              setState(RowState.deleted);
            }
          });
        } else {
          setState(RowState.deleted);
        }
      })
      .catch(() => setState(RowState.deleted));
  }

  if (state === RowState.deleted) {
    return (
      <tr className="inventory-red">
        <td>DELETED</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>N/A</td>
        <td>
          <div className="action-btn-container">
            <div className="inventory-x">✕</div>
            <div
              className="inventory-btn inventory-restore-btn"
              onClick={() => restoreRow()}
            >
              Restore
            </div>
          </div>
        </td>
      </tr>
    );
  }

  if (state === RowState.order) {
    return (
      <tr>
        <td>
          {props.item.name}{' '}
          <span className="orange">(@${props.item.price})</span>
        </td>
        <td colSpan={3}>
          <div className="inventory-order-sheet">
            <div className="inventory-order-cell">
              <div>Current Balance:</div>
              <div>${user?.balance.toFixed(2)}</div>
            </div>
            <div className="inventory-order-cell">
              <div>To Order:</div>
              <div className="order-input-container">
                <input
                  className="order-input"
                  type="number"
                  onChange={(e) => updateOrder(Number.parseInt(e.target.value))}
                  value={order !== 0 ? String(order) : ''}
                ></input>
                <div className="garbo">({props.item.stock + order})</div>
              </div>
            </div>
            <div className="inventory-order-cell">
              {' '}
              <div>Total Cost:</div>
              <div>${(props.item.price * order).toFixed(2)}</div>
            </div>
            <div className="inventory-order-cell">
              {' '}
              <div>Remaining Balance:</div>
              <div>
                $
                {(
                  (user?.balance ? user.balance : 0) -
                  props.item.price * order
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="action-btn-container">
            <div className="inventory-increment-btns">
              <div
                className="inventory-increment"
                onClick={() => updateOrder(order + 1)}
              >
                +
              </div>
              <div
                className="inventory-decrement"
                onClick={() => {
                  if (order > 0) {
                    updateOrder(order - 1);
                  }
                }}
              >
                -
              </div>
            </div>
            <div
              className="inventory-btn inventory-cancel-btn"
              onClick={() => {
                updateOrder(0);
                setState(RowState.default);
              }}
            >
              Cancel
            </div>
            <div
              className="inventory-btn inventory-save-btn"
              onClick={() => orderInventory()}
            >
              Confirm
            </div>
          </div>
        </td>
      </tr>
    );
  }

  if (state !== RowState.edit) {
    return (
      <tr>
        <td>{props.item.name}</td>
        <td>{props.item.stock}</td>
        <td>${props.item.price}</td>
        <td>{props.item.lastModified}</td>
        {state !== RowState.updating && (
          <td>
            <div className="action-btn-container">
              {(state === RowState.failed || state === RowState.success) && (
                <div
                  className={`status-display ${
                    state == RowState.failed
                      ? 'inventory-red'
                      : 'inventory-green'
                  }`}
                >
                  {state === RowState.success ? '✓' : '✕'}
                </div>
              )}
              <div
                className="inventory-btn inventory-order-btn"
                onClick={() => handleOrder()}
              >
                Order
              </div>
              <div
                className="inventory-btn inventory-edit-btn"
                onClick={() => handelEdit()}
              >
                Edit
              </div>
              <div
                className="inventory-btn inventory-delete-btn"
                onClick={() => deleteRow()}
              >
                X
              </div>
            </div>
          </td>
        )}
        {state === RowState.updating && (
          <td>
            <div className="inventory-loader-container">
              <div className="loader"></div>
            </div>
          </td>
        )}
      </tr>
    );
  } else {
    return (
      <tr>
        <td>
          <div>
            <input
              defaultValue={props.item.name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        </td>
        <td>
          <div>{props.item.stock}</div>
        </td>
        <td>
          <div className="inventory-price-container">
            <div className="inventory-dollar">$</div>
            <input
              className="inventory-price-input"
              defaultValue={props.item.price}
              type="number"
              pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
              step="0.01"
              onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
            ></input>
          </div>
        </td>
        <td>{props.item.lastModified}</td>
        <td>
          <div className="action-btn-container">
            <div
              className="inventory-btn inventory-cancel-btn"
              onClick={() => setState(RowState.default)}
            >
              Cancel
            </div>
            <div
              className="inventory-btn inventory-save-btn"
              onClick={() => updateRow()}
            >
              Save
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

function ItemModal(props: ItemModalProps) {
  const [state, setState] = useState(ModalState.default);
  const [name, setName] = useState('');
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const auth = useAuth();

  function verifyInput(name: string, stock: number, price: number) {
    if (!/^[0-9]*(\.([0-9])?([0-9])?)?$/.test(String(price)) || price <= 0) {
      return false;
    }
    if (!/^[0-9]*$/.test(String(stock))) {
      return false;
    }
    if (!/^[a-zA-Z\s]*$/.test(name) || name === '') {
      return false;
    }
    return true;
  }

  function createItem() {
    if (!verifyInput(name, stock, price)) {
      setState(ModalState.failed);
      return;
    }
    const newItem: item = {
      id: 0,
      name: name,
      price: price,
      stock: stock,
      lastModified: '',
    };

    fetch(props.createParams.endpoint, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'POST',
      body: props.createParams.stringify(newItem),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            const addItem: item = {
              id: data.id,
              name: data.name,
              price: data.price_per_unit,
              stock: data.stock,
              lastModified: String(data.updated_on).split('T')[0],
            };
            props.createParams.addItem(addItem);
            setState(ModalState.success);
          });
        } else if (response.status === 400) {
          response.json().then((data) => {
            if (data.name[0] === 'milk with this name already exists.') {
              setState(ModalState.success);
            } else {
              setState(ModalState.failed);
            }
          });
        } else {
          setState(ModalState.failed);
        }
      })
      .catch(() => setState(ModalState.failed));
  }

  return (
    <div className="item-modal-container">
      <h1>Create New Item:</h1>
      <h2>Name:</h2>
      <input onChange={(e) => setName(e.target.value)}></input>
      <h2>Initial Stock:</h2>
      <input
        type="number"
        pattern="\d.*$"
        step="1"
        onChange={(e) => setStock(Number.parseInt(e.target.value))}
      ></input>
      <h2>Price:</h2>
      <div className="modal-price-container">
        <div className="modal-dollar">$</div>
        <input
          type="number"
          pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
          step="0.01"
          onChange={(e) => setPrice(Number.parseFloat(e.target.value))}
        ></input>
      </div>
      {(state === ModalState.failed || state === ModalState.success) && (
        <div
          className={`modal-status ${
            state == ModalState.failed ? 'inventory-red' : 'inventory-green2'
          }`}
        >
          {state === ModalState.success ? '✓' : '✕'}
        </div>
      )}
      {state !== ModalState.updating && (
        <div className="inventory-modal-btns">
          <div
            className="inventory-btn inventory-decline-btn"
            onClick={() => props.setModal(false)}
          >
            {state === ModalState.default ? 'Cancel' : 'Close'}
          </div>
          <div
            className="inventory-btn inventory-accept-btn"
            onClick={() => createItem()}
          >
            Create
          </div>
        </div>
      )}
      {state === ModalState.updating && <div className="modal-loader"></div>}
    </div>
  );
}
