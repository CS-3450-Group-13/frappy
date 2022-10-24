import { ChildProcess } from 'child_process';
import React, { ReactElement } from 'react';
import '../css/ScrollableList.css';

interface Props {
  title?: string;
  width: string;
  children?: JSX.Element | JSX.Element[];
  loading?: boolean;
}
export default function ScrollableList(props: Props) {
  props.children &&
    React.Children.toArray(props.children).forEach((thing: any) =>
      console.log(React.cloneElement(thing))
    );
  console.log(React.Children.toArray(props.children));
  return (
    <div className="box" style={{ width: props.width }}>
      {props.title && <div className="scrollable-heading">{props.title}</div>}
      <div className="container">{props.children}</div>
    </div>
  );
}
