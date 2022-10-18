import React, { ReactNode, useEffect, useState } from 'react';
import '../css/DrinkCustomizationModal.css'

interface addins {
  [key: string]: number;
}

interface Customizations {
  base: string;
  addins: addins
}

interface Extras {
  id: number;
  name: string;
  stock: number;
  price_per_unit: string;
  updated_on: string;
  created_on: string;
  decaf: boolean;
  non_dairy: boolean;
  gluten_free: boolean;
  limit: number;
}

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  // setDrinkContents: (drinkContents: Customizations) => void;
  customizations: Customizations;
}

export default function DrinkCustomizationModal({setModalIsOpen, customizations}: Props) {
  const [selectedBase, setSelectedBase] = useState("Soy Milk");
  const [extras, setExtras] = useState<any[]>([]);

  // Grab extras from the server when the modal is loaded (same as componentDidMount with classed react modules)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/extras/')
    .then((response) => response.json())
    .then((data) => {
      setExtras([]);
      data.forEach((extra: Extras) => {
        setExtras(extras => [...extras, extra]);
      });
      console.log("data is ", data);
      console.log(extras)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const handleConfirm = () => {
    alert("User has confirmed")
  }
  
  return (
    <div className='drink-customization-modal-container'>
      <div className='large-base'>BASES</div>
      <div className='base-options'>
        <div
          className={selectedBase === "Soy Milk" ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setSelectedBase("Soy Milk")}
        >
          SOY MILK
        </div>
        <div 
          className={selectedBase === "Milk" ? 'base-btn base-btn-selected' : 'base-btn'}
          onClick={() => setSelectedBase("Milk")}
        >
          MILK
        </div>
      </div>
      <div className='large-base'>ADD INS</div>
      <div className='addins-list'>
        {extras.length > 0 && extras.map((extra) => {
          return (
            <div className='addin-item' key={extra.id}>{extra.name}</div>
          );
        })
        }
        {extras.length === 0 &&
          <div>Fetching addins from server...</div>
        }
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
