import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import '../css/ConfirmationModal.css'

interface PropsType {
  open: boolean,
  setOpen: (open: boolean) => void,
}

const mockOrder = [
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
  {
    title: 'pumpkin spice',
    price: '$2.50'
  },
];

const mockSubTotal = 20.00

export default function Confirmation({open, setOpen}:PropsType) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={open}
    style={
      {
        content: {
          marginLeft: '10%',
          marginRight: '10%',
          padding: '0',
          border: '2px solid black',
          borderRadius:'15px',
          textAlign:'center',
          backgroundColor: '#10603B',
          color: 'white',
          overflow: 'scroll'
          
        },}}>
          <div className='confirmation-title'>
          <h2>Order Confirmation</h2>
          <p>Are you ready to order the following: </p>
          </div>
          <div className='order-content'>
            <ul className='order-list'>
              {mockOrder.map(({title, price}) => (
                <li className='order-list-item'>
                <button>X</button>
                <h3>{title}</h3>
                <h3>{price}</h3>
              </li>
              ))}
            </ul>
            <h2 className='subtotal'>Subtotal: ${mockSubTotal.toFixed(2)}</h2>
            <h2 className='total'>Total: ${(mockSubTotal * 1.07).toFixed(2)}</h2>
          </div>
          <div className='btn-container'>
      <button className='close-btn' onClick={()=>{
        setOpen(false);
        navigate('/menu');
        }}>Back</button>
      <button className='order-btn' onClick={()=>{
        setOpen(false);
        navigate('/order-status');
        }}>Place Order</button>
        </div>
    </Modal>
  )
}
