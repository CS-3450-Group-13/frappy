import React from 'react';
import { Frappe } from '../types/Types';

type Props = {
  drink: Frappe;
}

export default function QueueItem({drink}: Props) {

  const getQueue = () => {
    // Query the server for the queue of drinks (probably every 5s?)

    const queue: Frappe[] = [
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
