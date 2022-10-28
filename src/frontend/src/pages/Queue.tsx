import React, { ReactNode, useState } from 'react';
import Modal from 'react-modal';
import { TestMenu, TestBases, TestMilks, TestExtras } from '../tests/TestServerData';
import { Base, FrappeExtra, MenuItem, Milk, SizeNames } from '../types/Types';

import '../css/Queue.css'
import QueueItemModal from './QueueItemModal';

export default function Queue() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentFrappe, setCurrentFrappe] = useState(TestMenu[0]);
  const queue = [TestMenu[0], TestMenu[1], TestMenu[4]];
  
  const createQueueItemView = () => {
    let queueItem: ReactNode[] = []
  
    for (const item of queue) {
      const header = item.frappe.user + ' -- ' + SizeNames[item.frappe.size] + ' ' + item.name;
      const base = TestBases.find((b) => { return b.id === item.frappe.base });
      const milk = TestMilks.find((m) => { return m.id === item.frappe.milk });

      queueItem.push(
        <div className='queue-item'>
          <div className='queue-item-details'>
            {header}
            <ul className='queue-item-ingredients'>
              <li>{base?.name}</li>
              <li>{milk?.name}</li>
              {item.frappe.extras.map((extra) => {
                const extraDetails = TestExtras.find((item) => item.id === extra.extras);
                return <li>{extra.amount}X {extraDetails?.name}</li>
              })}
            </ul>
          </div>
          <div 
            className='queue-details-btn'
            onClick={() => handleQueueDetailsBtn(item)}
          >
              &gt;
          </div>
        </div>
      );
    };

    return queueItem;
  }

  const handleQueueDetailsBtn = (frappe: MenuItem) => {
    console.log("button clicked with frappe");
    console.log(frappe);
    setCurrentFrappe(frappe);
    setModalIsOpen(true);
  }

  return (
    <div className='queue-container'>
      BARISTA QUEUE:
      <div className='queue-items-container'>
        {createQueueItemView()}
      </div>
      <Modal 
        isOpen={modalIsOpen}
        style={
          {
            content: {
              marginTop: '100px',
              marginBottom: '100px',
              marginLeft: '20%',
              marginRight: '20%',
              padding: '0',
              border: '2px solid black',
              backgroundColor: '#143224',
            },
          }
        }>
        <QueueItemModal setModalIsOpen={setModalIsOpen} frappe={currentFrappe} />
      </Modal>
    </div>
  );
}
