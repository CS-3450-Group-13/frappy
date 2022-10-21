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
    size: 'small',
    price: 2.50
  },
  {
    title: 'Apple Crisp',
    size: 'medium',
    price: 3.22
  },
  {
    title: 'Custom pumpkin spice',
    size: 'large',
    price: 4.75
  },
  {
    title: 'Mocha Cookie Crumble',
    size: 'medium',
    price: 3.85
  },
  {
    title: 'Vanilla Bean',
    size: 'small',
    price: 1.85
  },
  {
    title: 'pumpkin spice',
    size: 'small',
    price: 2.50
  },
  {
    title: 'Apple Crisp',
    size: 'medium',
    price: 3.22
  },
  {
    title: 'Custom pumpkin spice',
    size: 'large',
    price: 4.75
  },
  {
    title: 'Mocha Cookie Crumble',
    size: 'medium',
    price: 3.85
  },
  {
    title: 'Vanilla Bean',
    size: 'small',
    price: 1.85
  },
  {
    title: 'Vanilla Bean',
    size: 'small',
    price: 1.85
  },
];

export default function Confirmation({open, setOpen}:PropsType) {

  const getSubTotal = () => {
    let total = 0.0
    for(let i = 0; i < mockOrder.length; i++){
      total += mockOrder[i].price;
    }
    return total;
  }

  const mockSubTotal = getSubTotal();

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
          <h1>Order Confirmation</h1>
          <p>Are you ready to order the following: </p>
          </div>
          <div className='order-content'>
            <ul className='order-list'>
              {mockOrder.map(({title, size, price}) => (
                <li className='order-list-item'>
                <h4>{title} ({size})</h4>
                <h4>${price.toFixed(2)}</h4>
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
