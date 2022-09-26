import React, { useState } from 'react';

import './Login.css';

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Login({setIsLoggedIn}: Props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const tryLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Query database for valid login credentials

    setIsLoggedIn(true);
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
          <a href="/signup">sign up here!</a>
        </p>
      </div>
    </div>
  );
}
