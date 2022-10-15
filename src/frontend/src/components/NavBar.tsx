import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/NavBar.css'

interface Props {
  title: string;
  path: string;
}

export default function NavBar ({pages}:{pages: Array<Props>;}) {

  const navigate = useNavigate();
    return (
      <div className='container'>
        NavBar
        <div>
          {pages.map( ({title, path}) => (
            <button onClick={() => navigate(path)} >{title}</button>
          ))}
        </div>
      </div>
    )
}
