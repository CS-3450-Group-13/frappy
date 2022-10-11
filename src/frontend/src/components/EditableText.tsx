import React from 'react';
import { isPropertySignature } from 'typescript';
import editIcon from '../images/edit-icon.svg';
import '../css/EditableText.css';

type Props = {
  text: string;
};

export default function EditableText(props: Props) {
  return (
    <div className="editable-text-field">
      <span className="editable-text">{props.text}</span>
      <img className="edit-icon" src={editIcon} />
    </div>
  );
}
