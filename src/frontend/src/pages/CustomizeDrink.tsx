import React, { MouseEventHandler, ReactNode, useState } from 'react';
import DrinkCard from '../cards/DrinkCard';
import '../css/DrinkCard.css';
import '../css/CustomizeDrink.css';

interface Drink {
  name: string;
  id: number;
  inStock: boolean;
}

type Props = {
  drink: Drink;
}

interface addins {
  
}

const tmp = {
  base: "Soy Milk",
  addins: {
    "Vanilla Syrup": 1,
    "Secret Sauce": 2,
    "Whip Cream": 1,
  },
};

export default function CustomizeDrink({drink}: Props) {
  const [size, setSize] = useState("small");
  const [drinkContents, setDrinkContents] = useState(tmp);

  function sizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("size changed to " + e.target.value);
    console.log(e);
    setSize(e.target.value);
  }

  function createCustomizationButtons(): ReactNode {
    let buttons: ReactNode[] = [];
    buttons.push(<div className='customization-button'>{drinkContents.base}</div>);

    for (const [key, value] of Object.entries(drinkContents.addins)) {
      buttons.push(
        <div className='row customization-button'>
          <div className='delete-btn' onClick={() => handleDeleteAddin(key)}>X</div>
          <div className='customization-amounts'>{value} {key}</div>
        </div>
      );
    }

    return buttons
  }

  function handleDeleteAddin(addin: string) {
    alert("User wants to delete " + addin);
    return;
  }

  function handleBackBtn() {
    alert("Back button clicked, drink not added to cart");
  }

  function handleAddToCart() {
    let customizations: string[] = [];
    customizations.push(drinkContents.base);

    for (const [key, value] of Object.entries(drinkContents.addins)) {
      let str = value.toString() + " " + key;
      customizations.push(str);
    }
    alert("drink added to cart with " + customizations);
  }

  return (
    <div className='customizeDrink-container'>
      <div className='drink-details'>
        <DrinkCard drink={drink}/>
        <div className='customization-list'>
          Customization list
          <ul>
            <li>Soy Milk</li>
            <li>1 Pump Vanilla Syrup</li>
            <li>2 Pumps Secret Sauce</li>
            <li>Whip Cream</li>
          </ul>
        </div>
      </div>
      <div className='customization-selection'>
        <div className='size-options'>
          <div className='column white'>
            <div>SMALL</div>
            <input type='radio' name='small' value='small' checked={size === "small"} onChange={(e) => sizeChange(e)} />
          </div>
          <div className='column white'>
            <div>MEDIUM</div>
            <input type='radio' name='medium' value='medium' checked={size === "medium"} onChange={(e) => sizeChange(e)} />
          </div>
          <div className='column white'>
            <div>LARGE</div>
            <input type='radio' name='large' value='large' checked={size === "large"} onChange={(e) => sizeChange(e)} />
          </div>
        </div>
        <div className='current-customizations white'>
          <div className='large'>CUSTOMIZATIONS</div>
          <div>{createCustomizationButtons()}</div>
        </div>
        <div className='decision-btns'>
          <div className='back-btn' onClick={handleBackBtn}>BACK</div>
          <div className='add-to-cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div>
      </div>
    </div>
  );
}
