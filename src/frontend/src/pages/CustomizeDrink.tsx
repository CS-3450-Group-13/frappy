import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import DrinkCard from '../cards/DrinkCard';
import '../css/DrinkCard.css';
import '../css/CustomizeDrink.css';
import DrinkCustomizationModal from './DrinkCustomizationModal';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Base } from '../types/Types';
import { TestBases, TestExtras } from '../tests/TestServerData'

type Props = {
  frappe: MenuItem;
}

export default function CustomizeDrink({frappe}: Props) {
  const [size, setSize] = useState("small");
  const [frappeExtras, setFrappeExtras] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  function sizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("size changed to " + e.target.value);
    console.log(e);
    setSize(e.target.value);
  }

  function createCustomizationButtons() {
    let buttons: ReactNode[] = [];
    let base: Base | undefined = TestBases.find((item) => item.id === frappe.frappe.base); 

    console.log("frappe has a base of ", frappe.frappe.base);

    buttons.push(<div className='customization-button' onClick={handleCustomizeDrink}>{base ? base.name : "ERROR"}</div>);

    frappe.frappe.extras.forEach((extra) => {
      let extraObj = TestExtras.find((item) => item.id === extra.extras);

      buttons.push(
        <div className='row customization-button'>
          <div className='delete-btn' onClick={() => handleDeleteAddin(extra.extras)}>X</div>
          <div className='customization-amounts' onClick={handleCustomizeDrink}>{extra.amount}x {extraObj ? extraObj.name : "ERROR"}</div>
        </div>
      );
    })

    return buttons
  }

  function handleCustomizeDrink() {
    setModalIsOpen(true);
  }

  function handleDeleteAddin(addin: number) {
    alert("User wants to delete " + addin);
    return;
  }

  function handleBackBtn() {
    alert("Back button clicked, frappe not added to cart");
    navigate("/menu");
  }

  function handleAddToCart() {
    // let customizations: string[] = [];
    // customizations.push(frappeContents.base);

    // for (const [key, value] of Object.entries(frappeContents.addins)) {
    //   let str = value.toString() + " " + key;
    //   customizations.push(str);
    // }
    // alert("frappe added to cart with " + customizations);
    navigate("/menu");
  }

  return (
    <div className='customizeDrink-container'>
      <div className='drink-details'>
        <DrinkCard frappe={frappe}/>
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
      <Modal 
        isOpen={modalIsOpen}
        style={
          {
            content: {
              marginTop: '100px',
              marginBottom: '100px',
              marginLeft: '20%',
              marginRight: '20%',
              padding: '0',
              border: '2px solid black',
            },
          }
        }>
        <DrinkCustomizationModal setModalIsOpen={setModalIsOpen} base={frappe.frappe.base} frappeExtras={frappe.frappe.extras} />
      </Modal>
    </div>
  );
}
