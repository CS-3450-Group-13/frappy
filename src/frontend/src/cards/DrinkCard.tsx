import React from 'react';
import '../css/DrinkCard.css';
import '../css/Global.css'
import { MenuItem } from '../types/Types';

type Props = {
  frappe: MenuItem;
}

export default function DrinkCard({frappe}: Props) {
  
  return (
    <div className='drinkCard-container' >
      <div className='idk'> 
        <img className='circle image' src={ require('../images/Frappe.jpg') } />
      </div>
      <p className='drink-name'>{frappe.name}</p>
    </div>
  );
}
