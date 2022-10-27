import React, { ReactNode, useEffect, useState } from 'react'
import { MenuItem } from '../types/Types';

import '../css/QueueItemModal.css';
import { TestBases, TestExtras, TestMilks } from '../tests/TestServerData';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  frappe: MenuItem;
}

type ButtonPressedTracker = {
  extraName: string;
  pressed: boolean;
}

interface frappeWithBtnPress extends MenuItem {
  pressed: boolean;
}

export default function QueueItemModal({setModalIsOpen, frappe}: Props) {
  const [buttonPressedTracker, setButtonPressedTracker] = useState<ButtonPressedTracker[]>([]);

  useEffect(() => {
    let tmp: ButtonPressedTracker[] = [];

    frappe.frappe.extras.forEach((ingredient) => {
      const extra = TestExtras.find((item) => {return item.id === ingredient.extras});

      if (extra) {
        let buttonPressedTracker: ButtonPressedTracker = {extraName: extra?.name, pressed: false};
        tmp.push(buttonPressedTracker);
      }
    })

    setButtonPressedTracker(tmp);
  }, []);

  const createIngredientView = () => {
    let ingredientViews: ReactNode[] = [];

    const base = TestBases.find((b) => { return b.id === frappe.frappe.base });
    const milk = TestMilks.find((m) => { return m.id === frappe.frappe.milk });
    // ingredientViews.push(<div></div>)

    frappe.frappe.extras.forEach((ingredient, i) => {
      const extra = TestExtras.find((item) => {return item.id === ingredient.extras});

      if (extra) {
        ingredientViews.push(
          <div key={extra.id} className='queue-item-modal-ingredient'>
            <div>{extra.name}</div>
            <div className='queue-item-modal-rhs'>
              <div className='queue-item-modal-qty'>QTY {ingredient.amount}</div>
              <input
                type='checkbox'
                >
              </input>
            </div>
          </div>
        )
      }
    });

    return ingredientViews;
  }

  const handleBtnPress = (extraName: string) => {
    console.log("button pressed with name: ", extraName);
    const newState = buttonPressedTracker.map(obj => {
      if (obj.extraName === extraName) {
        return {...obj, pressed: true};
      }

      return obj;
    });

    setButtonPressedTracker(newState);
  }

  return (
    <div className='queue-item-modal-container'>
      {frappe.name}
      <div className='queue-item-modal-ingredient-container'>
        {createIngredientView()}
      </div>
      <div 
        className='queue-item-modal-complete-order-btn'
        onClick={() => setModalIsOpen(false)}
      >
        COMPLETE ORDER
      </div>
    </div>
  )
}
