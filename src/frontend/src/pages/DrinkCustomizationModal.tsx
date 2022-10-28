import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DrinkCustomizationModal.css'
import { Extra, BaseOptions, FrappeExtra, Base, Milk, MenuItem } from '../types/Types';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  // setDrinkContents: (drinkContents: Customizations) => void;
  bases: Base[];
  milks: Milk[];
  extras: Extra[];
  frappe: MenuItem;
}

export default function DrinkCustomizationModal({setModalIsOpen, bases, milks, extras, frappe}: Props) {
  const [selectedBase, setSelectedBase] = useState();

  const navigate = useNavigate();

  // Grab extras from the server when the modal is loaded (same as componentDidMount with classed react modules)
  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/frappapi/extras/')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setServerExtras([]);
  //     data.forEach((extra: Extra) => {
  //       setServerExtras(extras => [...extras, extra]);
  //     });
  //     console.log("data is ", data);
  //     console.log(serverExtras)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, [serverExtras]);

  const setBase = (baseOption: BaseOptions) => {
    console.log("Setting base to ", baseOption);
    console.log(frappe);
    frappe.frappe.base = baseOption;
    console.log(frappe);
  }

  const createExtrasList = () => {
    let extrasList: ReactNode[] = [];
    
    extras.forEach((extra) => {
      extrasList.push(<div className='addin-item' key={extra.id}>{extra.name}</div>);
    });

    return extrasList;
  }

  const handleConfirm = () => {
    setModalIsOpen(false);
  }
  
  return (
    <div className='drink-customization-modal-container'>
      <div className='large-base'>BASES</div>
      <div className='base-options'>
        <div
          className={frappe.frappe.base === BaseOptions.Coffee ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setBase(BaseOptions.Coffee)}
        >
          {bases[0].name}
        </div>
        <div 
          className={frappe.frappe.base === BaseOptions.Cream ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setBase(BaseOptions.Cream)}
        >
          {bases[1].name}
        </div>
        <div 
          className={frappe.frappe.base === BaseOptions.Mocha ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setBase(BaseOptions.Mocha)}
        >
          {bases[2].name}
        </div>
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
