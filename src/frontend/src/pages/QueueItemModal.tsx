import React, { ReactNode, useEffect, useState } from 'react'
import { CashierFrappe, MenuItem } from '../types/Types';

import '../css/QueueItemModal.css';
import { TestBases, TestExtras, TestMilks } from '../tests/TestServerData';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  frappe: CashierFrappe | undefined;
}

type ButtonPressedTracker = {
  extraName: string;
  pressed: boolean;
}

export default function QueueItemModal({setModalIsOpen, frappe}: Props) {
  const [buttonPressedTracker, setButtonPressedTracker] = useState<ButtonPressedTracker[]>([]);

  useEffect(() => {
    let tmp: ButtonPressedTracker[] = [];

    const base = TestBases.find((b) => { return b.id === frappe?.base });
    if (base) {
      let buttonPressedTracker: ButtonPressedTracker = {extraName: base.name, pressed: false};
      tmp.push(buttonPressedTracker);
    }
    
    const milk = TestMilks.find((b) => { return b.id === frappe?.milk });
    if (milk) {
      let buttonPressedTracker: ButtonPressedTracker = {extraName: milk.name, pressed: false};
      tmp.push(buttonPressedTracker);
    }

    frappe?.extras.forEach((ingredient) => {
      const extra = TestExtras.find((item) => {return item.id === ingredient.extras});

      if (extra) {
        let buttonPressedTracker = {extraName: extra?.name, pressed: false};
        tmp.push(buttonPressedTracker);
      }
    })

    setButtonPressedTracker(tmp);
    console.log("button pressed tracker is ");
    console.log(buttonPressedTracker);
  }, []);

  const createIngredientView = () => {
    let ingredientViews: ReactNode[] = [];

    const base = TestBases.find((b) => { return b.id === frappe?.base });
    let btnPressedTracker = buttonPressedTracker.find((item) => {return item.extraName === base?.name});
    
    if (base) {
      ingredientViews.push(
        <div key={100000} className='queue-item-modal-ingredient'>
          <div>{base.name}</div>
          <div className='queue-item-modal-rhs'>
            <div className='queue-item-modal-qty'>QTY 1</div>
            <div
              className={ btnPressedTracker?.pressed ? 'queue-item-modal-btn green' : 'queue-item-modal-btn'}
              onClick={() => handleBtnPress(base.name)}
            >
              +
            </div>
          </div>
        </div>
      );
    }

    const milk = TestMilks.find((m) => { return m.id === frappe?.milk });
    btnPressedTracker = buttonPressedTracker.find((item) => {return item.extraName === milk?.name});

    if (milk) {
      ingredientViews.push(
        <div key={100001} className='queue-item-modal-ingredient'>
          <div>{milk.name}</div>
          <div className='queue-item-modal-rhs'>
            <div className='queue-item-modal-qty'>QTY 1</div>
            <div
              className={ btnPressedTracker?.pressed ? 'queue-item-modal-btn green' : 'queue-item-modal-btn'}
              onClick={() => handleBtnPress(milk.name)}
            >
              +
            </div>
          </div>
        </div>
      );
    }

    frappe?.extras.forEach((ingredient, i) => {
      const extra = TestExtras.find((item) => {return item.id === ingredient.extras});
      btnPressedTracker = buttonPressedTracker.find((item) => {return item.extraName === extra?.name});

      if (extra) {
        ingredientViews.push(
          <div key={extra.id} className='queue-item-modal-ingredient'>
            <div>{extra.name}</div>
            <div className='queue-item-modal-rhs'>
              <div className='queue-item-modal-qty'>QTY {ingredient.amount}</div>
              <div
                className={ btnPressedTracker?.pressed ? 'queue-item-modal-btn green' : 'queue-item-modal-btn'}
                onClick={() => handleBtnPress(extra.name)}
              >
                +
              </div>
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

  const handleCompleteOrder = () => {
    let isIngredientUnchecked = false;

    // Only allow the barista to close the modal if they have checked off every ingredient
    for (let i = 0; i < buttonPressedTracker.length; i++) {
      if (!buttonPressedTracker[i].pressed) {
        isIngredientUnchecked = true;
        console.log("a button was not pressed");
        break;
      }
    }

    setModalIsOpen(isIngredientUnchecked);
  }

  return (
    <div className='queue-item-modal-container'>
      {frappe?.name}
      <div className='queue-item-modal-ingredient-container'>
        {createIngredientView()}
      </div>
      <div 
        className='queue-item-modal-complete-order-btn'
        onClick={handleCompleteOrder}
      >
        COMPLETE ORDER
      </div>
    </div>
  )
}
