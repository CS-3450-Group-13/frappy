import React from 'react';

interface addins {
  [key: string]: number;
}

interface Customizations {
  base: string;
  addins: addins
}

type Props = {
  setModalIsOpen: (modalIsOpen: boolean) => void;
  customizations: Customizations;
}

// Pull list of bases and extras here

export default function DrinkCustomizationModal({setModalIsOpen, customizations}: Props) {
  return (
    <div className='drink-customization-modal-container'>
      <div>DrinkCustomizationModal</div>
      <button onClick={() => setModalIsOpen(false)}>Close</button>
    </div>
  )
}
