import { tmpdir } from 'os';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DrinkCustomizationModal.css'
import { Extra, BaseOptions, FrappeExtra, Base, Milk, MenuItem, MilkOptions } from '../types/Types';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  // setDrinkContents: (drinkContents: Customizations) => void;
  bases: Base[];
  milks: Milk[];
  extras: Extra[];
  frappe: MenuItem;
}

export default function DrinkCustomizationModal({setModalIsOpen, bases, milks, extras, frappe}: Props) {
  // const [selectedBase, setSelectedBase] = useState(frappe.frappe.base);

  const navigate = useNavigate();

  const setBase = (baseOption: BaseOptions) => {
    frappe.frappe.base = baseOption;
  }

  const createBaseList = () => {
    let baseList: ReactNode[] = [];

    bases.forEach((base) => {
      baseList.push(
        <div
          className={frappe.frappe.base === base.id ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setBase(base.id)}
        >
          {base.name}
        </div>
      );
    });

    return baseList;
  }

  const createMilkList = () => {
    let milkList: ReactNode[] = [];

    milks.forEach((milk) => {
      milkList.push(
        <div
          className={frappe.frappe.milk === milk.id ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setMilk(milk.id)}
        >
          {milk.name}
        </div>
      );
    });

    return milkList;
  }

  const setMilk = (milk: MilkOptions) => {
    frappe.frappe.milk = milk;
  }

  const createExtrasList = () => {
    let extrasList: ReactNode[] = [];
    
    extras.forEach((extra) => {
      let addinString = extra.name;
      let frappeExtra = frappe.frappe.extras.find((e) => e.extras === extra.id);

      if (frappeExtra) {
        addinString += " " + frappeExtra.amount + "X";
      }
      extrasList.push(
        <div className='addin-item' key={extra.id}>
          <div>{addinString}</div>
          <div className='drink-customization-modal-addin-item-btns-container'>
            <div 
              className='drink-customization-modal-increase-btn'
              onClick={() => handleExtraIncrease(extra.id)}
            >
              +
            </div>
            <div 
              className='drink-customization-modal-decrease-btn'
              onClick={() => handleExtraDecrease(extra.id)}
            >
              -
            </div>
          </div>
        </div>
      );
    });

    return extrasList;
  }

  const handleExtraIncrease = (extraId: number) => {
    let idx = frappe.frappe.extras.findIndex((e) => e.extras === extraId);

    if (idx > -1) {
      frappe.frappe.extras[idx].amount += 1;
    }
    else {
      frappe.frappe.extras.push({
        amount: 1,
        extras: extraId,
        frappe: frappe.frappe.id,
      });
    }
  }

  const handleExtraDecrease = (extraId: number) => {
    let idx = frappe.frappe.extras.findIndex((e) => e.extras === extraId);

    if (idx > -1) {
      frappe.frappe.extras[idx].amount -= 1;

      if (frappe.frappe.extras[idx].amount < 1) {
        frappe.frappe.extras.splice(idx, 1);
      }
    }
  }

  const handleConfirm = () => {
    setModalIsOpen(false);
  }
  
  return (
    <div className='drink-customization-modal-container'>
      <div className='large-base'>BASES</div>
      <div className='base-options'>
        {createBaseList()}
      </div>
      <div className='large-base'>MILKS</div>
      <div className='base-options'>
        {createMilkList()}
      </div>
      <div className='large-base'>ADD INS</div>
      <div className='addins-list'>
        {createExtrasList()}
      </div>
      <div className='horizontal'>
        <div className='cancel-btn'
          onClick={() => setModalIsOpen(false)}
        >
          Close
        </div>
        <div className='base-btn base-btn-selected'
          onClick={handleConfirm}
        >
          Confirm
        </div>
      </div>
    </div>
  )
}
