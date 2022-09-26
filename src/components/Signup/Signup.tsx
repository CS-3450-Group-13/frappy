import React, { useState } from 'react';

import './Signup.css';

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Signup({setIsLoggedIn}: Props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const tryCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    // Attempt to create user in database
    // Verify username doesn't already exist
    // event.preventDefault();

    console.log(`username is ${username} and password1 is ${password} and password2 is ${password2}`);

    if (password === password2) {
      console.log('passwords match');
    }

    setIsLoggedIn(true);
  }

  return (
    <div className="container">
      <form onSubmit={tryCreateUser}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          <p>Confirm password</p>
          <input type="password" onChange={e => setPassword2(e.target.value)} />
        </label>
        <button type='submit' />
      </form>
    </div>
  );
}