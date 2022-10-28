import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-modal';
import DrinkCard from '../cards/DrinkCard';
import '../css/DrinkCard.css';
import '../css/CustomizeDrink.css';
import DrinkCustomizationModal from './DrinkCustomizationModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem, Base, Milk, SizeNames, Extra, SizeOptions } from '../types/Types';
import { TestBases, TestExtras } from '../tests/TestServerData'

type Props = {
  setCart: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

export default function CustomizeDrink({setCart}: Props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const frappe: MenuItem = state.drink;
  const cart: MenuItem[] = state.cart;

  const [size, setSize] = useState(SizeNames[frappe.frappe.size]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bases, setBases] = useState<Base[]>([]);
  const [milks, setMilks] = useState<Milk[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/bases/')
    .then((response) => response.json())
    .then((data) => {
      setBases([]);
      data.forEach((item: Base) => {
        setBases(oldState => [...oldState, item]);
      });
      console.log("Got bases: ", data);
      console.log(bases)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/milks/')
    .then((response) => response.json())
    .then((data) => {
      setMilks([]);
      data.forEach((item: Milk) => {
        setMilks(oldState => [...oldState, item]);
      });
      console.log("Got milks: ", data);
      console.log(milks)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/extras/')
    .then((response) => response.json())
    .then((data) => {
      setExtras([]);
      data.forEach((item: Extra) => {
        setExtras(oldState => [...oldState, item]);
      });
      console.log("data is ", data);
      console.log(extras)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function sizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("size changed to " + e.target.value);
    console.log(e);

    let size = SizeOptions.Small;
    if (parseInt(e.target.value) === 2) {
      size = SizeOptions.Medium;
    }
    else if (parseInt(e.target.value) === 3) {
      size = SizeOptions.Large;
    }

    frappe.frappe.size = size;
    setSize(e.target.value);
  }

  function createCustomizationButtons() {
    let buttons: ReactNode[] = [];

    const frappeMilk = milks.find((item) => { return item.id === frappe.frappe.milk; });
    if (frappeMilk) {
      buttons.push(<div className='customization-button' onClick={handleCustomizeDrink}>{frappeMilk.name}</div>);
    }

    const frappeBase = bases.find((item) => { return item.id === frappe.frappe.base; });
    if (frappeBase) {
      buttons.push(<div className='customization-button' onClick={handleCustomizeDrink}>{frappeBase.name}</div>);
    }

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

  const generateCustomizationList = () => {
    let listItems: ReactNode[] = [];

    const frappeMilk = milks.find((item) => { return item.id === frappe.frappe.milk; });
    if (frappeMilk) {
      listItems.push(<li key={10000}>{frappeMilk.name}</li>);
    }

    const frappeBase = bases.find((item) => { return item.id === frappe.frappe.base; });
    if (frappeBase) {
      listItems.push(<li key={10001}>{frappeBase.name}</li>)
    }

    frappe.frappe.extras.map((extra) => {
      const frappeExtra = extras.find((item) => { return item.id === extra.extras; });

      if (frappeExtra) {
        const extraStr = extra.amount + " " + frappeExtra.name;
        listItems.push(<li key={extra.extras}>{extraStr}</li>);
      }
    })

    return listItems;
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
    setCart((oldState) => [...oldState, frappe]);
    console.log("the cart is now");
    console.log(cart);
    navigate("/menu");
  }

  return (
    <div className='customizeDrink-container'>
      <div className='drink-details'>
        <DrinkCard frappe={frappe}/>
        <div className='customization-list'>
          CUSTUMIZATIONS
          <ul>
            {generateCustomizationList()}
          </ul>
        </div>
      </div>
      <div className='customization-selection'>
        <div className='size-options'>
          <div className='column white'>
            <div>SMALL</div>
            <input type='radio' name='small' value='1' checked={frappe.frappe.size === 1} onChange={(e) => sizeChange(e)} />
          </div>
          <div className='column white'>
            <div>MEDIUM</div>
            <input type='radio' name='medium' value='2' checked={frappe.frappe.size === 2} onChange={(e) => sizeChange(e)} />
          </div>
          <div className='column white'>
            <div>LARGE</div>
            <input type='radio' name='large' value='3' checked={frappe.frappe.size === 3} onChange={(e) => sizeChange(e)} />
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
              backgroundColor: '#10603B',
            },
          }
        }>
        <DrinkCustomizationModal setModalIsOpen={setModalIsOpen} bases={bases} milks={milks} extras={extras} frappe={frappe} />
      </Modal>
    </div>
  );
}
