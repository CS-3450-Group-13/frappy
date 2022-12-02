import Modal from 'react-modal';
import OrderHistory from '../components/OrderHistory';
import '../css/OrderHistoryModal.css';

//simplify props passed in
interface Props {
  open: boolean;
  endpoint: string;
  filter: number;
  setOpen: (value: boolean) => void;
}

// Container of the order history for when clicked on the manager edit accounts page
export default function OrderHistoryModal(props: Props) {
  return (
    <Modal
      overlayClassName="dark"
      isOpen={props.open}
      style={{
        content: {
          height: '500px',
          width: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          padding: '0px',
          inset: '0px',
          border: 'none',
          borderRadius: '16px',
          background: 'white',
          backgroundColor: 'rgba(0,0,0,0)',
        },
      }}
    >
      <div className="order-modal-container">
        <div className="order-modal-x" onClick={() => props.setOpen(false)}>
          ✕
        </div>
        <OrderHistory
          title="User Order History"
          endpoint={props.endpoint}
          width={100}
          outdated={true}
          condense={true}
          filter={props.filter}
          setOutdated={(value) => {
            return;
          }}
        ></OrderHistory>
      </div>
    </Modal>
  );
}
