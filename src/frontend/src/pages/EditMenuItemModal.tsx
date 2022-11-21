import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../components/auth';
import '../css/ManagerEditAccounts.css';
import { Base, Extra, MenuItem, Milk } from '../types/Types';

interface PropsType {
  getMenu: Function;
  open: boolean;
  setOpen: (open: boolean) => void;
  menuItem: MenuItem | undefined;
  bases: Base[] | undefined;
  milks: Milk[] | undefined;
  extras: Extra[] | undefined;
}

export default function EditMenuItemModal({
  getMenu,
  open,
  setOpen,
  menuItem,
  bases,
  milks,
  extras,
}: PropsType) {
  const auth = useAuth();

  const postData = () => {
    if (
      menuItem !== undefined &&
      bases !== undefined &&
      milks !== undefined &&
      extras !== undefined
    ) {
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
            frappe: menuItem.frappe.id,
          };
          frappyExtras.push(frappy);
        }
      }
      let newMenuItem = menuItem;
      let newFrappy = {
        base: Number(newBase),
        milk: Number(newMilk),
        extras: frappyExtras,
      };
      newMenuItem.frappe.base = newFrappy.base;
      newMenuItem.frappe.milk = newFrappy.milk;
      newMenuItem.frappe.extras = newFrappy.extras;

      let body = {
        name: menuItem.name,
        frappe: {
          menu_key: menuItem.frappe.menu_key,
          base: Number(newBase),
          milk: Number(newMilk),
          extras: frappyExtras,
          size: menuItem.frappe.size,
        },
        prices: menuItem.prices,
      };
      console.log(newMenuItem);

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
  };

  return (
    <Modal
      ariaHideApp={false}
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
      {menuItem !== undefined &&
        bases !== undefined &&
        milks !== undefined &&
        extras !== undefined && (
          <div className="accounts-modal">
            <h1>Edit {menuItem.name}</h1>
            <div className="edit-menu-container">
              <form method="post" encType="multipart/form-data">
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
              <button
                className="accounts-close-btn"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                className="accounts-update-btn"
                onClick={() => {
                  postData();
                }}
              >
                Update
              </button>
            </div>
          </div>
        )}
    </Modal>
  );
}
