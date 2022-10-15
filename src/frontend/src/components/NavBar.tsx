import React, { Component } from 'react';
import '../css/NavBar.css'

interface Props {
  title: string;
  path: string;
}

export default function NavBar ({pages}:{pages: Array<Props>;}) {
    return (
      <div className='container'>
        NavBar
        <div>
          {pages.map( ({title, path}) => (
            <a href={path}>{title}</a>
          ))}
        </div>
      </div>
    )
}
