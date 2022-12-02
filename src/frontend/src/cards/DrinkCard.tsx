import React from 'react';
import '../css/DrinkCard.css';
import '../css/Global.css';
import { MenuItem } from '../types/Types';
import newDrink from '../images/large-new.png';

//simplify props passed in
type Props = {
  frappe: MenuItem;
};

// The drink card is the cards that appear on the menu.
export default function DrinkCard({ frappe }: Props) {
  return (
    <div className="drinkCard-container">
      <div className="idk">
        {frappe.photo && <img className="circle image" src={frappe.photo} />}
        {frappe.photo === null && (
          <img className="circle image new-drink" src={newDrink} />
        )}
      </div>
      <p className="drink-name">{frappe.name}</p>
    </div>
  );
}
