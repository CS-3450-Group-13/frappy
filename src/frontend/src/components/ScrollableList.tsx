import { ChildProcess } from 'child_process';
import React, { ReactElement } from 'react';
import '../css/ScrollableList.css';

//simplify props passed in
interface Props {
  title?: string;
  width: string;
  children?: JSX.Element | JSX.Element[];
  loading?: boolean;
}

//Makes a list of items scrollable, used for order history
export default function ScrollableList(props: Props) {
  return (
    <div className="box" style={{ minWidth: props.width }}>
      {props.title && <div className="scrollable-heading">{props.title}</div>}
      <div className="container">{props.children}</div>
    </div>
  );
}
