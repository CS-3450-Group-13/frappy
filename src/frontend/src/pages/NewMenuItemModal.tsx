import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import { Base, Extra, Milk } from '../types/Types';

interface PropsType {
  getMenu: Function;
  open: boolean;
  setOpen: (open: boolean) => void;
  bases: Base[] | undefined;
  milks: Milk[] | undefined;
  extras: Extra[] | undefined;
  newId: number;
}

export default function NewMenuItemModal({
  getMenu,
  open,
  setOpen,
  bases,
  milks,
  extras,
  newId,
}: PropsType) {
  let newFrappyBody = {
    name: 'Test',
    frappe: {
      milk: '1',
      base: '1',
      extras: [],
      size: '1',
    },
    photo: null,
  };

  let auth = useAuth();

  const postData = () => {
    if (bases !== undefined && milks !== undefined && extras !== undefined) {
      let newName = (document.getElementById('new-name') as HTMLInputElement)
        .value;
      let newBase = (document.getElementById('base') as HTMLSelectElement)
        .value;
      let newMilk = (document.getElementById('milk') as HTMLSelectElement)
        .value;
      let ExtrasList = ['0'];
      for (let i = 0; i < extras.length; i++) {
        let temp = (
          document.getElementById(extras[i].name) as HTMLSelectElement
        ).value;
        ExtrasList.push(temp);
      }
      let frappyExtras = [];
      for (let i = 0; i < ExtrasList.length; i++) {
        if (ExtrasList[i] !== '0') {
          let frappy = {
            amount: Number(ExtrasList[i]),
            extras: i,
            frappe: newId,
          };
          frappyExtras.push(frappy);
        }
      }

      let body = {
        name: newName,
        frappe: {
          id: newId + 1,
          // menu_key: newId + 1,
          base: Number(newBase),
          milk: Number(newMilk),
          extras: frappyExtras,
          size: 1,
        },
        active: true,
        status: 2,
      };
      console.log(body);
      console.log(newId);

      fetch(`http://127.0.0.1:8000/frappapi/menu/`, {
        method: 'POST',
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
          getMenu();
        });
    }
    setOpen(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={open}
      style={{
        content: {
          marginLeft: '10%',
          marginRight: '10%',
          padding: '20px',
          borderRadius: '15px',
          backgroundColor: '#10603B',
          color: 'white',
          overflow: 'scroll',
          height: '80%',
        },
      }}
    >
      <div className="accounts-modal">
        <h1>Create New Menu Item</h1>
        <div className="edit-menu-container">
          <form>
            <label>Name: </label>
            <input id="new-name" type="text"></input>
            <label>Base: </label>
            <select id="base">
              {bases?.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
            <label>Milk: </label>
            <select id="milk">
              {milks?.map((item) => (
                <option value={item.id} id={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <label>Extras:</label>
            {extras?.map((item) => (
              <div>
                <label>
                  {item.name} -- price per unit: {item.price_per_unit}
                </label>
                <input
                  id={item.name}
                  min="0"
                  max={item.limit}
                  type="number"
                  defaultValue={0}
                ></input>
              </div>
            ))}
          </form>
        </div>
        <div className="btns-container">
          <button className="accounts-close-btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button
            className="accounts-update-btn"
            onClick={() => {
              postData();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
