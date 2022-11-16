import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
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

  const postData = () => {
    if (extras !== undefined) {
      let formData = new FormData();
      let newName = document.getElementById('new-name') as HTMLInputElement;
      let base = document.getElementById('base') as HTMLInputElement;
      let milk = document.getElementById('milk') as HTMLInputElement;
      let photo = document.getElementById('photo') as HTMLInputElement;
      let image_url = null;
      formData.append('name', newName.value);
      let extrasList = [];
      for (let i = 0; i < extras.length; i++) {
        let temp = document.getElementById(extras[i].name) as HTMLInputElement;
        if (Number(temp.value) > 0) {
          extrasList.push({
            amount: temp.value,
            extras: extras[i].id,
            frappe: '1',
          });
        }
      }
      let frappe = {
        milk: milk.value,
        base: base.value,
        extras: extrasList,
        size: 1,
      };
      if (photo.files !== null) {
        var file = photo.files[0];
        formData.append('photo', photo.files[0]);
      }

      formData.append('frappe', JSON.stringify(frappe));
      console.log(formData);
      fetch('http://127.0.0.1:8000/frappapi/menu/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((Data) => {
          console.log(Data);
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
          padding: '20px',
          borderRadius: '15px',
          backgroundColor: '#10603B',
          color: 'white',
          overflow: 'scroll',
        },
      }}
    >
      <div className="accounts-modal">
        <h1>Create New Menu Item</h1>
        <div className="edit-menu-container">
          <form method="post" encType="multipart/form-data">
            <label>Name: </label>
            <input id="new-name" type="text"></input>
            <label>Photo:</label>
            <input id="photo" type="file"></input>
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
