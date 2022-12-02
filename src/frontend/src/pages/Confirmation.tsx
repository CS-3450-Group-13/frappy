import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../components/auth';
import '../css/ConfirmationModal.css';
import { MenuItem } from '../types/Types';

interface PropsType {
  open: boolean;
  setOpen: (open: boolean) => void;
  cart: Array<MenuItem>;
  setCart: Function;
  userId: number;
  userRole: string | undefined;
  total: number;
}

export default function Confirmation({
  open,
  setOpen,
  cart,
  setCart,
  userId,
  userRole,
  total,
}: PropsType) {
  // const subTotal = getSubTotal();
  const navigate = useNavigate();

  console.log(`User id is ${userId}`);

  const auth = useAuth();
  const placeOrder = () => {
    // TODO: Wait to submit again until the previous is accepted if there is more than one drink
    cart.forEach((frappe) => {
      let tmp = {
        user: userId,
        milk: frappe.frappe.milk,
        base: frappe.frappe.base,
        extras: frappe.frappe.extras,
        menu_key: frappe.frappe.menu_key,
        size: frappe.frappe.size,
        comments: auth?.userInfo.fullName,
      };

      // Server doesn't want the frappe key for each extra
      tmp.extras.forEach((extra) => {
        delete extra.frappe;
      });

      console.log('Submitting this frappe to the server:');
      console.log(tmp);
      console.log(JSON.stringify(tmp));

      let endpoint = "http://127.0.0.1:8000/frappapi/frappes/";

      // Person is trying to order on behalf of someone else if userId > 0
      if (userRole !== "customer" && userId > 0) {
        endpoint = "http://127.0.0.1:8000/frappapi/cashier/";
      }

      fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Token ${auth?.userInfo.key}`,
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(tmp),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            // This particular error looks ugly. Prettify it for the user
            if (data.error.includes('insufficient stock')) {
              // Grab the extra name
              const extraName = data.error.substring(data.error.indexOf(':') + 2, data.error.indexOf('>'));
              toast.error(`Drink extra '${extraName}' does not have enough stock`)
            }
            else {
              toast.error(data.error);
            }
          } else {
            console.log('got response: ', data);
            toast.success('Your Order was placed!');
            setCart([]);
            navigate('/order-status');
          }
        })
        .catch((err) => {
          toast.error(err);
          console.log('got error: ', err);
        });
    });
  };

  return (
    <Modal
      isOpen={open}
      style={{
        content: {
          marginLeft: '10%',
          marginRight: '10%',
          padding: '0',
          border: '2px solid black',
          borderRadius: '15px',
          textAlign: 'center',
          backgroundColor: '#10603B',
          color: 'white',
          overflow: 'scroll',
        },
      }}
    >
      <div className="confirmation-title">
        <h1>Order Confirmation</h1>
        <p>Are you ready to order the following: </p>
      </div>
      <div className="order-content">
        <ul className="order-list">
          {cart.map(({ name, frappe }) => (
            <li className="order-list-item">
              <h4>{name}</h4>
              <h4>${frappe.final_price.toFixed(2)}</h4>
            </li>
          ))}
        </ul>
        <h2 className="total">Total: ${total.toFixed(2)}</h2>
        <button
          className="close-btn"
          onClick={() => {
            setOpen(false);
            navigate('/cart');
          }}
        >
          Back
        </button>
        <button
          className="order-btn"
          onClick={() => {
            setOpen(false);
            placeOrder();
          }}
        >
          Place Order
        </button>
      </div>
    </Modal>
  );
}
