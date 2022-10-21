import React, { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom';
import '../css/ConfirmationModal.css'

interface PropsType {
  open: boolean,
  setOpen: (open: boolean) => void,
}

export default function Confirmation({open, setOpen}:PropsType) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={open}
    style={
      {
        content: {
          marginTop: '75px',
          marginBottom: '75px',
          marginLeft: '15%',
          marginRight: '15%',
          padding: '0',
          border: '2px solid black',
        },}}>
          <h3>Order Confirmation</h3>
          <p>Are you ready to order the following: </p>
          <div className='order-content'>
            <ul className='order-list'>
              <li className='order-list-item'>Hello</li>
            </ul>

          </div>

      <button className='close-btn' onClick={()=>{
        setOpen(false);
        navigate('/menu');
        }}>Back</button>
      <button className='order-btn' onClick={()=>{
        setOpen(false);
        navigate('/menu');
        }}>Place Order</button>
    </Modal>
  )
}
