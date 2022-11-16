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
                  // postData();
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
