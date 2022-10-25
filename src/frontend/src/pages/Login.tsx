import React from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setPages }: { setPages: Function }) {
  const navigate = useNavigate();

  const TestUsers = [
    {
      email: 'dyl2elite@gmail.com',
      password: 'hello1234',
    },
    {
      email: 'test@test.com',
      password: 'hello1234',
    },
  ];

  const submitForm = () => {
    let email = document.getElementById('input-email') as HTMLInputElement;
    let password = document.getElementById(
      'input-password'
    ) as HTMLInputElement;
    let input = {
      email: email.value,
      password: password.value,
    };

    fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    console.log();
    if (
      TestUsers.some(
        (data) => data.email === input.email && data.password === input.password
      )
    ) {
      navigate('/home-page');
      setPages([
        {
          title: 'Home',
          path: '/home-page',
        },
        {
          title: 'Order Status',
          path: '/order-status',
        },
        {
          title: 'Menu',
          path: '/menu',
        },
        {
          title: 'Account',
          path: '/account',
        },
      ]);
    } else {
      navigate('/new-user');
    }
  };

  return (
    <div className="login-div">
      <h1>Login Page</h1>
      <div className="form-data">
        <form>
          <div className="form-input-item">
            <label>Email: </label>
            <input type="email" id="input-email" aria-label="email"></input>
          </div>
          <div className="form-input-item">
            <label>Password: </label>
            <input
              type="password"
              id="input-password"
              aria-label="password"
            ></input>
          </div>
          <div className="form-input-item-last">
            <button
              data-testid="loginBtn"
              type="button"
              className="bttn"
              onClick={submitForm}
            >
              Log In
            </button>
          </div>
        </form>
        <h6>
          No account? create an account <Link to="/new-user">here</Link>
        </h6>
      </div>
    </div>
  );
}
