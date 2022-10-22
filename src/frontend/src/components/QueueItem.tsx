import React from 'react';
import { Frappe } from '../types/Types';

type Props = {
  drink: Frappe;
}

export default function QueueItem({drink}: Props) {

  const getQueue = () => {
    // Query the server for the queue of drinks (probably every 5s?)

    const queue: Frappe[] = [
      {
        name: 'Pumpkin Spice',
        id: 41,
        inStock: true,
        size: 'Small',
        price: 2.53,
        customizations: {
          decaf: true,
          addins: {
            "Vanilla Syrup": 1,
            "Secret Sauce": 2,
            "Whip Cream": 1,
          },
        }
      },
      {
        name: 'Apple Crisp',
        id: 42,
        inStock: true,
        size: 'Small',
        price: 2.53,
        customizations: {
          decaf: true,
          addins: {
            "Chocolate Syrup": 1,
            "Secret Sauce": 1,
          },
        }
      },
      {
        name: 'White Chocolate',
        id: 42,
        inStock: true,
        size: 'Small',
        price: 2.53,
        customizations: {
          decaf: false,
          addins: {
            "Chocolate Syrup": 1,
            "Secret Sauce": 2,
          },
        }
      }
    ];

    return queue;
  }

  const createExtrasList = () => {

  }

  return (
    <div className='queue-item-container'>

    </div>
  );
}
