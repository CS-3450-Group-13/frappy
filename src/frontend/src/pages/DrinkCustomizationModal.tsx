import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DrinkCustomizationModal.css'
import { Extra, BaseOptions } from '../types/Types';

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  // setDrinkContents: (drinkContents: Customizations) => void;
  base: BaseOptions;
  frappeExtras: Array<Extra>;
}

export default function DrinkCustomizationModal({setModalIsOpen, base, frappeExtras}: Props) {
  const [selectedBase, setSelectedBase] = useState("Soy Milk");
  const [serverExtras, setServerExtras] = useState<any[]>([]);

  const navigate = useNavigate();

  // Grab extras from the server when the modal is loaded (same as componentDidMount with classed react modules)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/extras/')
    .then((response) => response.json())
    .then((data) => {
      setServerExtras([]);
      data.forEach((extra: Extra) => {
        setServerExtras(extras => [...extras, extra]);
      });
      console.log("data is ", data);
      console.log(serverExtras)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [serverExtras]);

  const handleConfirm = () => {
    alert("User has confirmed");
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
        {serverExtras.length > 0 && serverExtras.map((extra) => {
          return (
            <div className='addin-item' key={extra.id}>{extra.name}</div>
          );
        })
        }
        {serverExtras.length === 0 &&
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
