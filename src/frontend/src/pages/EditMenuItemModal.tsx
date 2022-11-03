import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import '../css/ManagerEditAccounts.css';
import { Base, Extra, MenuItem, Milk } from '../types/Types';

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuItem: MenuItem | undefined;
  bases: Base[] | undefined;
  milks: Milk[] | undefined;
  extras: Extra[] | undefined;
}

export default function EditMenuItemModal({
  open,
  setOpen,
  menuItem,
  bases,
  milks,
  extras,
}: PropsType) {
  const [extraCount, setExtraCount] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const changeCountElement = (id: number, val: number) => {
    if (extraCount[id] !== val) {
      let arr = extraCount;
      arr[id] = val;
      setExtraCount(arr);
    }
  };

  const createExtrasList = () => {
    let extrasList: ReactNode[] = [];

    extras?.forEach((extra) => {
      let addinString = extra.name;
      let frappeExtra = menuItem?.frappe.extras.find(
        (e) => e.extras === extra.id
      );

      if (frappeExtra) {
        changeCountElement(extra.id - 1, frappeExtra.amount);
      }
      extrasList.push(
        <div className="addin-item" key={extra.id}>
          <div>
            {addinString} x{extraCount[extra.id - 1]}
          </div>
          <div className="drink-customization-modal-addin-item-btns-container">
            <div
              className="edit-increase-btn"
              onClick={() => handleExtraIncrease(extra.id)}
            >
              +
            </div>
            <div
              className="edit-decrease-btn"
              onClick={() => handleExtraDecrease(extra.id)}
            >
              -
            </div>
          </div>
        </div>
      );
    });

    return extrasList;
  };

  const handleExtraIncrease = (extraId: number) => {
    if (menuItem !== undefined) {
      let frappe = menuItem;
      let idx = frappe.frappe.extras.findIndex((e) => e.extras === extraId);

      if (idx > -1) {
        frappe.frappe.extras[idx].amount += 1;
        changeCountElement(extraId - 1, frappe.frappe.extras[idx].amount);
      } else {
        frappe.frappe.extras.push({
          amount: 1,
          extras: extraId,
          frappe: frappe.frappe.id,
        });
        changeCountElement(extraId - 1, 1);
      }
    }
  };

  const handleExtraDecrease = (extraId: number) => {
    if (menuItem !== undefined) {
      let frappe = menuItem;
      let idx = frappe.frappe.extras.findIndex((e) => e.extras === extraId);

      if (idx > -1) {
        frappe.frappe.extras[idx].amount -= 1;

        if (frappe.frappe.extras[idx].amount < 1) {
          frappe.frappe.extras.splice(idx, 1);
        }
      }
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
      <div className="accounts-modal">
        <h1>Edit {menuItem?.name}</h1>
        <div className="edit-menu-container">
          <form>
            <label id="new-name">Name: </label>
            <input
              aria-label="new-name"
              type="text"
              placeholder={menuItem?.name}
            ></input>
            <label id="small">Small Price: </label>
            <input
              aria-label="small"
              type="number"
              step="0.01"
              placeholder={menuItem?.prices[0].toString()}
            ></input>
            <label>Base: </label>
            <select>
              {bases?.map((item) => (
                <option id={item.name}>{item.name}</option>
              ))}
            </select>
            <label>Milk: </label>
            <select>
              {milks?.map((item) => (
                <option id={item.name}>{item.name}</option>
              ))}
            </select>
            <label>Extras:</label>
            {createExtrasList()}
            <div className="addin-item" key={0}>
              <div>x{extraCount[0]}</div>
              <div className="drink-customization-modal-addin-item-btns-container">
                <div
                  className="edit-increase-btn"
                  onClick={() => handleExtraIncrease(0)}
                >
                  +
                </div>
                <div
                  className="edit-decrease-btn"
                  onClick={() => handleExtraDecrease(0)}
                >
                  -
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="btns-container">
          <button className="accounts-close-btn" onClick={() => setOpen(false)}>
            Close
          </button>
          <button
            className="accounts-update-btn"
            onClick={() => setOpen(false)}
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}
