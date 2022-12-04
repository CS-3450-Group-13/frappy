import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-modal';
import DrinkCard from '../cards/DrinkCard';
import '../css/DrinkCard.css';
import '../css/CustomizeDrink.css';
import DrinkCustomizationModal from './DrinkCustomizationModal';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MenuItem,
  Base,
  Milk,
  SizeNames,
  Extra,
  SizeOptions,
  BaseOptions,
  FrappeExtra,
} from '../types/Types';
import { TestBases, TestExtras } from '../tests/TestServerData';
import { useAuth } from '../components/auth';

const BASE_ENDPOINT = 'http://127.0.0.1:8000/frappapi/bases/';
const MILK_ENDPOINT = 'http://127.0.0.1:8000/frappapi/milks/';
const EXTRA_ENDPOINT = 'http://127.0.0.1:8000/frappapi/extras/';
const EMPTY_ITEM: item = {
  id: 0,
  name: '',
  price: 0,
  stock: 0,
  lastModified: '',
};

type Props = {
  setCart: Function;
};

type item = {
  id: number;
  name: string;
  price: number;
  stock: number;
  lastModified: string;
};

export default function CustomizeDrink({ setCart }: Props) {
  const navigate = useNavigate(); //!< Allows navigation to other pages through the Router
  const { state } = useLocation(); //!< State passed to us through the Router
  const isNewDrink = state.isNewDrink; //!< Flag to determine if the current drink is new (needs to be added to the cart), or is just being updated from the cart

  const [bases, setBases] = useState<item[]>([]); //!< Keeps track of the current bases retrieved from the server
  const [milks, setMilks] = useState<item[]>([]); //!< Keeps track of the current milks retrieved from the server
  const [extras, setExtras] = useState<item[]>([]); //!< Keeps track of the current extras retrieved from the server
  const [currentFrappe, setCurrentFrappe] = useState<MenuItem>(state.drink); //!< Keeps track of the current frappe customizations
  const [currentCost, setCurrentCost] = useState(0);
  const [costOutdated, setCostOutdated] = useState(false);

  const [basesCurrent, setBasesCurrent] = useState(false);
  const [milksCurrent, setMilksCurrent] = useState(false);
  const [extrasCurrent, setExtrasCurrent] = useState(false);

  console.log('current frappe is ', currentFrappe);

  const auth = useAuth();

  // Gets Ingredient Prices
  useEffect(() => {
    if (!basesCurrent) {
      getItems(BASE_ENDPOINT, setBases);
      setBasesCurrent(true);
    }
    if (!milksCurrent) {
      getItems(MILK_ENDPOINT, setMilks);
      setMilksCurrent(true);
    }
    if (!extrasCurrent) {
      getItems(EXTRA_ENDPOINT, setExtras);
      setExtrasCurrent(true);
    }
  }, []);

  // Updates Frappe Price
  useEffect(() => {
    if (!costOutdated) {
      return;
    }
    let newPrice = 0;

    console.log('CURRENT PRICE:');
    console.log(newPrice);

    for (const milk of milks) {
      if (milk.id === currentFrappe.frappe.milk) {
        newPrice += milk.price * currentFrappe.frappe.size;
        console.log(newPrice);
        break;
      }
    }

    for (const base of bases) {
      if (base.id === currentFrappe.frappe.base) {
        newPrice += base.price * currentFrappe.frappe.size;
        console.log(newPrice);
        break;
      }
    }

    for (const extra of extras) {
      for (const currentExtra of currentFrappe.frappe.extras) {
        if (currentExtra.extras === extra.id) {
          console.log('Extra Price:');
          console.log(extra);
          newPrice += extra.price * currentExtra.amount;
          console.log(newPrice);
          break;
        }
      }
    }

    newPrice += currentFrappe.markup
      ? Number.parseFloat(currentFrappe.markup)
      : 0;
    console.log(newPrice);
    setCurrentCost(newPrice);
    setCostOutdated(false);
    currentFrappe.frappe.final_price = currentCost;
    setCurrentFrappe(currentFrappe);
  }, [costOutdated]);

  // Makes Sure Cost Keeps Up With Frappe Changes
  useEffect(() => {
    setCostOutdated(true);
  }, [currentFrappe]);

  function getItems(endpoint: string, setFunction: (items: item[]) => void) {
    fetch(endpoint, {
      headers: {
        Authorization: `Token ${auth?.userInfo.key}`,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let dataList: item[] = [];

        for (let i = 0; i < data.length; i++) {
          let newItem = {
            id: data[i].id,
            name: data[i].name,
            stock: data[i].stock,
            price: data[i].price_per_unit,
            lastModified: String(data[i].updated_on).split('T')[0],
          };
          dataList.push(newItem);
        }
        setFunction(dataList);
        setCostOutdated(true);
      });
  }

  /**
   * @brief Handles updating the frappes current size choice
   * @param e The event that triggered the change
   */
  function handleSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newSize = SizeOptions.Small;
    if (e.target.value === 'medium') {
      newSize = SizeOptions.Medium;
    } else if (e.target.value === 'large') {
      newSize = SizeOptions.Large;
    }

    setCurrentFrappe((prevState) => {
      prevState.frappe.size = newSize;

      return { ...prevState };
    });
  }

  /**
   * @brief Creates a list of radio buttons, one for each base that was retrieved from the server
   * @returns A list of buttons, one for each base that was retrieved from the server
   */
  const createBasesBtns = () => {
    let basesBtns: ReactNode[] = [];

    bases.forEach((base) => {
      basesBtns.push(
        <label>
          <input
            className="hide-radio"
            type="radio"
            name={base.name}
            value={base.id}
            checked={currentFrappe.frappe.base === base.id}
            onChange={(e) => handleBaseChange(e)}
          />
          <div className="customize-drink-selection-btn">
            {base.name.toUpperCase()}
          </div>
        </label>
      );
    });

    return basesBtns;
  };

  /**
   * @brief Handles updating the frappes current base choice
   * @param e The event that triggered the change
   */
  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrappe((prevState) => {
      prevState.frappe.base = parseInt(e.target.value);

      return { ...prevState };
    });
  };

  /**
   * @brief Creates a list of radio buttons, one for each milk that was retrieved from the server
   * @returns A list of buttons, one for each milk that was retrieved from the server
   */
  const createMilkBtns = () => {
    let milkBtns: ReactNode[] = [];

    milks.forEach((milk) => {
      milkBtns.push(
        <label>
          <input
            className="hide-radio"
            type="radio"
            name={milk.name}
            value={milk.id}
            checked={currentFrappe.frappe.milk === milk.id}
            onChange={(e) => handleMilkChange(e)}
          />
          <div className="customize-drink-selection-btn">
            {milk.name.toUpperCase()}
          </div>
        </label>
      );
    });

    return milkBtns;
  };

  /**
   * @brief Handles updating the frappes current milk choice
   * @param e The event that triggered the change
   */
  const handleMilkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrappe((prevState) => {
      prevState.frappe.milk = parseInt(e.target.value);

      return { ...prevState };
    });
  };

  /**
   * @brief Creates a view for every extra that was retrieved from the server
   * @returns A list of views, one for every extra that was retrieved from the server
   */
  const createExtrasViews = () => {
    let extrasBtns: ReactNode[] = [];

    extras.forEach((extra) => {
      // Check and see if the currentFrappe currently has this extra in the drink
      let item = currentFrappe.frappe.extras.find(
        (item) => item.extras === extra.id
      );

      extrasBtns.push(
        <div className="customize-drink-extra-item">
          <div>{extra.name}</div>
          <div className="customize-drink-extra-btns-container">
            <div
              className="customize-drink-reduce-increment-extra-btn circle"
              onClick={() => {
                handleDecrementExtra(extra.id);
              }}
            >
              -
            </div>
            <div>{item ? item.amount : 0}</div>
            <div
              className="customize-drink-reduce-increment-extra-btn circle"
              onClick={() => {
                handleAddExtra(extra.id);
              }}
            >
              +
            </div>
          </div>
        </div>
      );
    });

    return extrasBtns;
  };

  /**
   * @brief Handles adding an extra to the drink. This takes into account whether
   * the item already exists in the drinks current customizations or not
   * @param extraId The ID of the extra
   */
  const handleAddExtra = (extraId: number) => {
    let idx = currentFrappe.frappe.extras.findIndex(
      (item) => item.extras === extraId
    );

    if (idx > -1) {
      setCurrentFrappe((prevState) => {
        prevState.frappe.extras[idx].amount += 1;

        return { ...prevState };
      });
    } else {
      setCurrentFrappe((prevState) => {
        let extra: FrappeExtra = {
          amount: 1,
          extras: extraId,
          frappe: prevState.frappe.id,
        };

        prevState.frappe.extras.push(extra);

        return { ...prevState };
      });
    }
  };

  /**
   * @brief Handles decrementing of an extra. If the extra is not already part of
   * their current customizations, nothing happens. If they decrement the extra to 0
   * then the extra is removed from the drinks extra list
   * @param extraId The ID of the extra
   */
  const handleDecrementExtra = (extraId: number) => {
    let idx = currentFrappe.frappe.extras.findIndex(
      (item) => item.extras === extraId
    );

    if (idx > -1) {
      // Completely remove the item from the frappe if there is only 1 and then want to decrement
      if (currentFrappe.frappe.extras[idx].amount <= 1) {
        setCurrentFrappe((prevState) => {
          prevState.frappe.extras.splice(idx, 1);

          return { ...prevState };
        });
      } else {
        setCurrentFrappe((prevState) => {
          prevState.frappe.extras[idx].amount -= 1;

          return { ...prevState };
        });
      }
    }
  };

  /**
   * @brief Generates a list of all the current customizations a user has for their frappe
   * so that they can easily see what's currently going to be in the drink
   *
   * @returns A list of <li>'s of all the current customizations of their frappe
   */
  const generateCustomizationList = () => {
    let listItems: ReactNode[] = [];

    const frappeMilk = milks.find((item) => {
      return item.id === currentFrappe.frappe.milk;
    });
    if (frappeMilk) {
      // Milk id will likely be the same as base id or an extras id. Just set it to something large so that it's 'unique-ish'
      listItems.push(<li key={10000}>{frappeMilk.name}</li>);
    }

    const frappeBase = bases.find((item) => {
      return item.id === currentFrappe.frappe.base;
    });
    if (frappeBase) {
      // Base id will likely be the same as milk id or an extras id. Just set it to something large so that it's 'unique-ish'
      listItems.push(<li key={10001}>{frappeBase.name}</li>);
    }

    currentFrappe.frappe.extras.map((extra) => {
      const frappeExtra = extras.find((item) => {
        return item.id === extra.extras;
      });

      if (frappeExtra) {
        const extraStr = extra.amount + 'x ' + frappeExtra.name;

        // These guys get ownership of the actual id's (1-12 or whatever). Why? Because extras are better I guess
        listItems.push(<li key={extra.extras}>{extraStr}</li>);
      }
    });

    return listItems;
  };

  /**
   * @brief Navigates back to the menu and discards current drink changes
   */
  function handleBackBtn() {
    navigate('/menu');
  }

  /**
   * @brief Adds a new drink to the cart
   */
  function handleAddToCart() {
    currentFrappe.frappe.final_price = currentCost;
    setCurrentFrappe(currentFrappe);
    setCart((oldState: any) => [...oldState, currentFrappe]);
    // console.log(cart);
    navigate('/menu');
  }

  return (
    <div className="customize-drink-container">
      <div className="customize-drink-details">
        <DrinkCard frappe={currentFrappe} />
        <div className="customize-drink-current-customizations">
          YOUR CUSTOMIZATIONS
          <ul className="customize-drink-current-customizations-list">
            {generateCustomizationList()}
          </ul>
        </div>
      </div>
      <div className="customize-drink-customizations-container">
        CUSTOMIZE YOUR SIZE
        <div className="customize-drink-size-options">
          <label>
            <input
              className="hide-radio"
              type="radio"
              name="small"
              value="small"
              checked={currentFrappe.frappe.size === SizeOptions.Small}
              onChange={(e) => handleSizeChange(e)}
            />
            <img
              className="customize-drink-img-sm circle"
              src={require('../images/small-frappe.png')}
              alt="size small"
            />
          </label>
          <label>
            <input
              className="hide-radio"
              type="radio"
              name="medium"
              value="medium"
              checked={currentFrappe.frappe.size === SizeOptions.Medium}
              onChange={(e) => handleSizeChange(e)}
            />
            <img
              className="customize-drink-img-sm circle"
              src={require('../images/medium-frappe.png')}
              alt="size medium"
            />
          </label>
          <label>
            <input
              className="hide-radio"
              type="radio"
              name="large"
              value="large"
              checked={currentFrappe.frappe.size === SizeOptions.Large}
              onChange={(e) => handleSizeChange(e)}
            />
            <img
              className="customize-drink-img-sm circle"
              src={require('../images/large-frappe.png')}
              alt="size large"
            />
          </label>
        </div>
        <div className="customize-drink-bases-container">
          CHOOSE YOUR MILK
          <div className="customize-drink-bases-options">
            {createMilkBtns()}
          </div>
        </div>
        <div className="customize-drink-bases-container">
          CHOOSE YOUR BASE
          <div className="customize-drink-bases-options">
            {createBasesBtns()}
          </div>
        </div>
        <div className="customize-drink-extras-container">
          CHOOSE YOUR EXTRAS
          <div>
            <div className="customize-drink-extras-options">
              {createExtrasViews()}
            </div>
          </div>
        </div>
        {!isNewDrink && (
          <div className="customize-drink-center">
            <div className="price-tracker">${currentCost.toFixed(2)}</div>
            <div
              className="customize-drink-nav-btn customize-drink-lgreen"
              onClick={() => {
                currentFrappe.frappe.final_price = currentCost;
                setCurrentFrappe(currentFrappe);
                navigate('/cart');
              }}
            >
              BACK TO CART
            </div>
          </div>
        )}
        {isNewDrink && (
          <div className="customize-drink-nav-btns">
            <div className="customize-drink-nav-btn" onClick={handleBackBtn}>
              BACK
            </div>
            <div className="price-tracker">${currentCost.toFixed(2)}</div>
            <div
              className="customize-drink-nav-btn customize-drink-lgreen"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
