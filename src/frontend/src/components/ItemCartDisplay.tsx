import { MouseEventHandler } from 'react';
import { MenuItem, SizeNames } from '../types/Types';

import '../css/ItemCartDisplay.css';
import { useNavigate } from 'react-router-dom';

// simplify props
type Props = {
  item: MenuItem;
  cart: MenuItem[];
  removeItemFromCart: (
    item: number
  ) => MouseEventHandler<HTMLDivElement> | undefined;
  idx: number;
};

// component that shows the cart before purchasing order
export default function ItemCartDisplay({
  item,
  cart,
  removeItemFromCart,
  idx,
}: Props) {
  const navigate = useNavigate();

  const handleEditDrink = () => {
    navigate('/customize', {
      state: {
        drink: item,
        cart: cart,
        isNewDrink: false,
      },
    });
  };

  return (
    <div className="item-cart-container">
      <div className="item-cart-lhs">
        <div>
          {SizeNames[item.frappe.size - 1]} {item.name}
        </div>
      </div>
      <div className="item-cart-rhs">
        <div>${item.frappe.final_price.toFixed(2)}</div>
        <div className="item-cart-edit-btn" onClick={handleEditDrink}>
          Edit
        </div>
        <div
          className="item-cart-remove-btn"
          onClick={() => {
            removeItemFromCart(idx);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}
