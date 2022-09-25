import React, { useState } from 'react';

import './Login.css'

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const tryLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Query database for valid login credentials
  }

  const handleSignup = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    console.log("clicked");
  }

  return (
    <div className='container'>
      <h1>Please log in</h1>
      <div className='loginBox'>
        <form onSubmit={tryLogin}>
          <label>
            <p>Username</p>
            <input type='text' onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type='password' onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        <p className='signupText'>Don't have an account? 
          <a onClick={handleSignup} href="">sign up here!</a>
        </p>
      </div>
    </div>
  );
}
