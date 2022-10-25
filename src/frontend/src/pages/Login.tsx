import React from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  setPages: Function;
  authKey: string;
  setAuthKey: Function;
}

export default function Login({ setPages, authKey, setAuthKey }: Props) {
  const navigate = useNavigate();

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
        if (data.key) {
          //Check if is manager or employee here
          navigate('/home-page');
          setAuthKey(data.key);
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
            {
              title: 'Cart',
              path: '/cart',
            },
          ]);
        } else {
          navigate('/new-user');
          alert(data.non_field_errors[0]);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
