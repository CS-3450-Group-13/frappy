import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import '../css/ManagerEditAccounts.css';
import { Base, Extra, Milk } from '../types/Types';

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  bases: Base[] | undefined;
  milks: Milk[] | undefined;
  extras: Extra[] | undefined;
  newId: number;
}

export default function NewMenuItemModal({
  open,
  setOpen,
  bases,
  milks,
  extras,
  newId,
}: PropsType) {
  let newFrappyBody = {
    name: '',
    frappe: {
      milk: 0,
      base: 0,
      extras: [],
      size: 1,
    },
    photo: null,
  };

  const postData = () => {
    if (extras !== undefined) {
      let newName = document.getElementById('new-name') as HTMLInputElement;
      let base = document.getElementById('base') as HTMLInputElement;
      let milk = document.getElementById('milk') as HTMLInputElement;
      let photo = document.getElementById('photo') as HTMLInputElement;

      if (photo.files !== null) {
        var reader = new FileReader();
        let photodata = reader.readAsBinaryString(photo.files[0]);
        console.log(photodata);
      }

      let extrasList = [];
      for (let i = 0; i < extras.length; i++) {
        let temp = document.getElementById(extras[i].name) as HTMLInputElement;
        if (Number(temp.value) > 0) {
          extrasList.push({
            amount: Number(temp.value),
            extras: extras[i].id,
            frappe: newId,
          });
        }
      }

      let newFrappyBody = {
        name: newName.value,
        frappe: {
          milk: Number(milk.value),
          base: Number(base.value),
          extras: extrasList,
          size: 1,
        },
        photo: 'http://127.0.0.1:8000/uploads/product-placeholder.webp',
      };
      console.log(newFrappyBody);

      fetch('http://127.0.0.1:8000/frappapi/menu/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFrappyBody),
      })
        .then((response) => response.json())
        .then((Data) => {
          console.log(Data);
        });
    }
  };
  console.log(extras);

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
        <h1>Create New Menu Item</h1>
        <div className="edit-menu-container">
          <form>
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
