import React from 'react';
import { isPropertySignature } from 'typescript';
import '../css/BalanceDisplay.css';

type Props = {
  balance: number;
};

export default function BalanceDisplay(props: Props) {
  return <div className="balance-display">${props.balance.toFixed(2)}</div>;
}
