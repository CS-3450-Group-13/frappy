import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-modal';
import DrinkCard from '../cards/DrinkCard';
import '../css/DrinkCard.css';
import '../css/CustomizeDrink.css';
import DrinkCustomizationModal from './DrinkCustomizationModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItem, Base, Milk, SizeNames, Extra, SizeOptions, BaseOptions, FrappeExtra } from '../types/Types';
import { TestBases, TestExtras } from '../tests/TestServerData'

type Props = {
  setCart: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

export default function CustomizeDrink({setCart}: Props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart: MenuItem[] = state.cart;

  const [bases, setBases] = useState<Base[]>([]);
  const [milks, setMilks] = useState<Milk[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>(state.drink)

  // Get the current list of bases from the server
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

  // Get the current list of milks from the server
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

  // Get the current list of extras from the server
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

  function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {

    let newSize = SizeOptions.Small;
    if (e.target.value === 'medium') {
      newSize = SizeOptions.Medium;
    }
    else if (e.target.value === 'large') {
      newSize = SizeOptions.Large;
    }

    setCurrentFrappe((prevState) => {
      prevState.frappe.size = newSize;

      return({...prevState});
    });
  }

  // function createCustomizationButtons() {
  //   let buttons: ReactNode[] = [];

  //   const frappeMilk = milks.find((item) => { return item.id === currentFrappe.frappe.milk; });
  //   if (frappeMilk) {
  //     buttons.push(<div className='customization-button' onClick={handleCustomizeDrink}>{frappeMilk.name}</div>);
  //   }

  //   const frappeBase = bases.find((item) => { return item.id === currentFrappe.frappe.base; });
  //   if (frappeBase) {
  //     buttons.push(<div className='customization-button' onClick={handleCustomizeDrink}>{frappeBase.name}</div>);
  //   }

  //   currentFrappe.frappe.extras.forEach((extra) => {
  //     let extraObj = TestExtras.find((item) => item.id === extra.extras);

  //     buttons.push(
  //       <div className='row customization-button'>
  //         <div className='delete-btn' onClick={() => handleDeleteAddin(extra.extras)}>X</div>
  //         <div className='customization-amounts' onClick={handleCustomizeDrink}>{extra.amount}x {extraObj ? extraObj.name : "ERROR"}</div>
  //       </div>
  //     );
  //   })

  //   return buttons
  // }

  const createBasesBtns = () => {
    let basesBtns: ReactNode[] = [];

    bases.forEach((base) => {
      basesBtns.push(
        <label>
            <input className='hide-radio' type='radio' name={base.name} value={base.id} checked={ currentFrappe.frappe.base === base.id } onChange={(e) => handleBaseChange(e)} />
            <div className='customize-drink-selection-btn'>{base.name.toUpperCase()}</div>
        </label>
      );
    });

    return basesBtns;
  }

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrappe((prevState) => {
      prevState.frappe.base = parseInt(e.target.value);

      return({...prevState});
    })
  }

  const createMilkBtns = () => {
    let milkBtns: ReactNode[] = [];

    milks.forEach((milk) => {
      milkBtns.push(
        <label>
            <input className='hide-radio' type='radio' name={milk.name} value={milk.id} checked={ currentFrappe.frappe.milk === milk.id } onChange={(e) => handleMilkChange(e)} />
            <div className='customize-drink-selection-btn'>{milk.name.toUpperCase()}</div>
        </label>
      );
    });

    return milkBtns;
  }

  const handleMilkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrappe((prevState) => {
      prevState.frappe.milk = parseInt(e.target.value);

      return({...prevState});
    })
  }

  const createExtrasBtns = () => {
    let extrasBtns: ReactNode[] = [];

    extras.forEach((extra) => {
      // Check and see if the currentFrappe currently has this extra in the drink
      let item = currentFrappe.frappe.extras.find((item) => item.extras === extra.id);

      extrasBtns.push(
        <div className='customize-drink-extra-item'>
          <div>{extra.name}</div>
          <div className='customize-drink-extra-btns-container'>
            <div 
              className='customize-drink-reduce-increment-extra-btn circle'
              onClick={() => {handleDecrementExtra(extra.id)}}
            >
              -
            </div>
            <div>{item ? item.amount : 0}</div>
            <div 
              className='customize-drink-reduce-increment-extra-btn circle'
              onClick={() => {handleAddExtra(extra.id)}}
            >
              +
            </div>
          </div>
        </div>
      );
    })

    return extrasBtns;
  }

  const handleAddExtra = (extraId: number) => {
    let idx = currentFrappe.frappe.extras.findIndex((item) => item.extras === extraId);

    if (idx > -1) {
      setCurrentFrappe((prevState) => {
        prevState.frappe.extras[idx].amount += 1;

        return({...prevState});
      });
    }

    else {
      setCurrentFrappe((prevState) => {
        let extra: FrappeExtra = {
          amount: 1,
          extras: extraId,
          frappe: prevState.frappe.id,
        };

        prevState.frappe.extras.push(extra);

        return({...prevState});
      });
    }
  }

  const handleDecrementExtra = (extraId: number) => {
    let idx = currentFrappe.frappe.extras.findIndex((item) => item.extras === extraId);

    if (idx > -1) {
      // Completely remove the item from the frappe if there is only 1 and then want to decrement
      if (currentFrappe.frappe.extras[idx].amount <= 1) {
        setCurrentFrappe((prevState) => {
          prevState.frappe.extras.splice(idx, 1);

          return({...prevState});
        });
      }
      else {
        setCurrentFrappe((prevState) => {
          prevState.frappe.extras[idx].amount -= 1;

          return({...prevState});
        });
      }
    }
  }

  /**
   * @brief Generates a list of all the current customizations a user has for their frappe
   * so that they can easily see what's currently going to be in the drink
   *
   * @returns A list of <li>'s of all the current customizations of their frappe
   */
  const generateCustomizationList = () => {
    let listItems: ReactNode[] = [];

    const frappeMilk = milks.find((item) => { return item.id === currentFrappe.frappe.milk; });
    if (frappeMilk) {
      // Milk id will likely be the same as base id or an extras id. Just set it to something large so that it's 'unique-ish'
      listItems.push(<li key={10000}>{frappeMilk.name}</li>);
    }

    const frappeBase = bases.find((item) => { return item.id === currentFrappe.frappe.base; });
    if (frappeBase) {
      // Base id will likely be the same as milk id or an extras id. Just set it to something large so that it's 'unique-ish'
      listItems.push(<li key={10001}>{frappeBase.name}</li>)
    }

    currentFrappe.frappe.extras.map((extra) => {
      const frappeExtra = extras.find((item) => { return item.id === extra.extras; });

      if (frappeExtra) {
        const extraStr = extra.amount + "x " + frappeExtra.name;
        
        // These guys get ownership of the actual id's (1-11 or whatever). Why? Because extras are better I guess
        listItems.push(<li key={extra.extras}>{extraStr}</li>);
      }
    })

    return listItems;
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
    setCart((oldState) => [...oldState, currentFrappe]);
    console.log("the cart is now");
    console.log(cart);
    navigate("/menu");
  }

  return (
    <div className='customize-drink-container'>
      <div className='customize-drink-details'>
        <DrinkCard frappe={currentFrappe} />
        <div className='customize-drink-current-customizations'>
          YOUR CUSTOMIZATIONS
          <ul className='customize-drink-current-customizations-list'>
            {generateCustomizationList()}
          </ul>
        </div>
      </div>
      <div className='customize-drink-customizations-container'>
        CUSTOMIZE YOUR SIZE
        <div className='customize-drink-size-options'>
          <label>
            <input className='hide-radio' type='radio' name='small' value='small' checked={ currentFrappe.frappe.size === SizeOptions.Small } onChange={(e) => handleSizeChange(e)} />
            <img className='customize-drink-img-sm circle' src={ require('../images/small-frappe.png') } alt='size small' />
          </label>
          <label>
            <input className='hide-radio' type='radio' name='medium' value='medium' checked={ currentFrappe.frappe.size === SizeOptions.Medium } onChange={(e) => handleSizeChange(e)} />
            <img className='customize-drink-img-sm circle' src={ require('../images/medium-frappe.png') } alt='size medium' />
          </label>
          <label>
            <input className='hide-radio' type='radio' name='large' value='large' checked={ currentFrappe.frappe.size === SizeOptions.Large } onChange={(e) => handleSizeChange(e)} />
            <img className='customize-drink-img-sm circle' src={ require('../images/large-frappe.png') } alt='size large' />
          </label>
        </div>
        <div className='customize-drink-bases-container'>
          CHOOSE YOUR MILK
          <div className='customize-drink-bases-options'>
            {createMilkBtns()}
          </div>
        </div>
        <div className='customize-drink-bases-container'>
          CHOOSE YOUR BASE
          <div className='customize-drink-bases-options'>
            {createBasesBtns()}
          </div>
        </div>
        <div className='customize-drink-extras-container'>
          CHOOSE YOUR EXTRAS
          <div>
            <div className='customize-drink-extras-options'>
              {createExtrasBtns()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


{/* <div className='drink-details'>
        <DrinkCard frappe={frappe}/>
        <div className='customization-list'>
          CUSTOMIZATIONS
          <ul>
            {generateCustomizationList()}
          </ul>
        </div>
      </div>
      <div className='customization-section'>
        <div className='size-options'>
        <div className='large'>CUSTOMIZATIONS</div>
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
          <div>{createCustomizationButtons()}</div>
        </div>
        <div className='decision-btns'>
          <div className='back-btn' onClick={handleBackBtn}>BACK</div>
          <div className='add-to-cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div>
      </div> */}