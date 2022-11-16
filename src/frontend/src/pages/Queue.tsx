import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  TestMenu,
  TestBases,
  TestMilks,
  TestExtras,
} from '../tests/TestServerData';
import { Base, CashierFrappe, Extra, FrappeExtra, MenuItem, Milk, SizeNames } from '../types/Types';

import '../css/Queue.css';
import QueueItemModal from './QueueItemModal';
import { useAuth } from '../components/auth';

export default function Queue() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bases, setBases] = useState<Base[]>([]); //!< Keeps track of the current bases retrieved from the server
  const [milks, setMilks] = useState<Milk[]>([]); //!< Keeps track of the current milks retrieved from the server
  const [extras, setExtras] = useState<Extra[]>([]); //!< Keeps track of the current extras retrieved from the server
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentFrappe, setCurrentFrappe] = useState<CashierFrappe>();
  const [queue, setQueue] = useState<CashierFrappe[]>([]);

  const auth = useAuth();
  let user = auth?.userInfo;

  // Get the current list of bases from the server
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/bases/')
      .then((response) => response.json())
      .then((data) => {
        setBases([]);
        data.forEach((item: Base) => {
          setBases((oldState) => [...oldState, item]);
        });
        // console.log('Got bases: ', data);
        // console.log(bases);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get the current list of milks from the server
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/milks/')
      .then((response) => response.json())
      .then((data) => {
        setMilks([]);
        data.forEach((item: Milk) => {
          setMilks((oldState) => [...oldState, item]);
        });
        // console.log('Got milks: ', data);
        // console.log(milks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get the current list of extras from the server
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/extras/')
      .then((response) => response.json())
      .then((data) => {
        setExtras([]);
        data.forEach((item: Extra) => {
          setExtras((oldState) => [...oldState, item]);
        });
        // console.log('data is ', data);
        // console.log(extras);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get the current list of menu items from the server
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/menu/')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems([]);
        data.forEach((item: MenuItem) => {
          setMenuItems((oldState) => [...oldState, item]);
        });
        console.log('menu items are ', data);
        console.log(menuItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get the queue of drinks that need to be made
  useEffect(() => {
    fetch('http://127.0.0.1:8000/frappapi/cashier/?status=1', {
      method: 'GET',
      headers: { Authorization: `Token ${user?.key}` },
      credentials: 'same-origin',
    })
      .then((response) => response.json())
      .then((data) => {
        setQueue([]);
        console.log('Got queue: ', data);
        console.log(queue);
        data.forEach((item: CashierFrappe) => {
          setQueue((oldState) => [...oldState, item]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const createQueueItemView = () => {
    let queueItem: ReactNode[] = [];

    for (const frappe of queue) {

      frappe.name = menuItems[(frappe.menu_key-1)].name ?? "undefined";

      const header =
      frappe.creator +
        ' -- ' +
        SizeNames[frappe.size - 1] +
        ' ' +
        frappe.name;
      const base = TestBases.find((b) => {
        return b.id === frappe.base;
      });
      const milk = TestMilks.find((m) => {
        return m.id === frappe.milk;
      });

      queueItem.push(
        <div className="queue-item">
          <div className="queue-item-details">
            {header}
            <ul className="queue-item-ingredients">
              <li>{base?.name}</li>
              <li>{milk?.name}</li>
              {frappe.extras.map((extra) => {
                const extraDetails = TestExtras.find(
                  (item) => item.id === extra.extras
                );
                return (
                  <li>
                    {extra.amount}X {extraDetails?.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className="queue-details-btn"
            onClick={() => handleQueueDetailsBtn(frappe)}
          >
            &gt;
          </div>
        </div>
      );
    }

    return queueItem;
  };

  const handleQueueDetailsBtn = (frappe: CashierFrappe) => {
    console.log('button clicked with frappe');
    console.log(frappe);
    setCurrentFrappe(frappe);
    setModalIsOpen(true);
  };

  return (
    <div className="queue-container">
      BARISTA QUEUE:
      <div className="queue-items-container">{menuItems.length > 0 && createQueueItemView()}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {setModalIsOpen(false)}}
        style={{
          content: {
            marginTop: '100px',
            marginBottom: '100px',
            marginLeft: '20%',
            marginRight: '20%',
            padding: '0',
            border: '2px solid black',
            backgroundColor: '#143224',
          },
        }}
      >
        <QueueItemModal
          setModalIsOpen={setModalIsOpen}
          frappe={currentFrappe}
          queue={queue}
          setQueue={setQueue}
        />
      </Modal>
    </div>
  );
}
