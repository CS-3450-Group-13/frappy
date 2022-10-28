import React from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

interface UserType {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  balance: number;
  accountType: string;
  hours: number;
  authKey: string;
}

interface Props {
  setPages: Function;
  user: UserType;
  setUser: Function;
}

export default function Login({ setPages, user, setUser }: Props) {
  const navigate = useNavigate();

  const auth = useAuth();

  const submitForm = () => {
    let email = document.getElementById('input-email') as HTMLInputElement;
    let password = document.getElementById(
      'input-password'
    ) as HTMLInputElement;
    let input = {
      email: email.value,
      password: password.value,
    };
    // fetch('http://127.0.0.1:8000/auth-endpoint/login/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(input),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.key) {
    //       document.cookie = 'key=' + data.key + ';SameSite=Lax';
    //       console.log(data);
    //       fetch('http://127.0.0.1:8000/users/users/')
    //         .then((response) => response.json())
    //         .then((data) => {
    //           console.log('usersData: ', data);
    //         });
    // if (input.email == 'admin@admin') {
    //   navigate('/home-page');
    //   navigate('/home-page');
    //   auth?.loginAs(
    //     'Test Manager',
    //     'manager123',
    //     input.email,
    //     input.password,
    //     405.3,
    //     'manager',
    //     'key-here',
    //     15
    //   );
    //   setPages([
    //     {
    //       title: 'Home',
    //       path: '/home-page',
    //     },
    //     {
    //       title: 'Order Status',
    //       path: '/order-status',
    //     },
    //     {
    //       title: 'Menu',
    //       path: '/menu',
    //     },
    //     {
    //       title: 'Account',
    //       path: '/account',
    //     },
    //     {
    //       title: 'Cart',
    //       path: '/cart',
    //     },
    //     {
    //       title: 'Queue',
    //       path: '/queue',
    //     },
    //     {
    //       title: 'Edit Accounts',
    //       path: '/edit-accounts',
    //     },
    //     {
    //       title: 'Edit Menu',
    //       path: '/edit-menu',
    //     },
    //   ]);
    // } else if (auth.isEmployee(input.email)) {
    //   navigate('/home-page');
    //   auth?.loginAs(
    //     'Test Employee',
    //     'employee123',
    //     input.email,
    //     input.password,
    //     405.3,
    //     'employee',
    //     'key-here',
    //     15
    //   );
    //   setPages([
    //     {
    //       title: 'Home',
    //       path: '/home-page',
    //     },
    //     {
    //       title: 'Order Status',
    //       path: '/order-status',
    //     },
    //     {
    //       title: 'Menu',
    //       path: '/menu',
    //     },
    //     {
    //       title: 'Account',
    //       path: '/account',
    //     },
    //     {
    //       title: 'Cart',
    //       path: '/cart',
    //     },
    //     {
    //       title: 'Queue',
    //       path: '/queue',
    //     },
    //   ]);
    // } else {
    //   navigate('/home-page');
    //   auth?.loginAs(
    //     'Test Customer',
    //     'customer123',
    //     input.email,
    //     input.password,
    //     405.3,
    //     'customer',
    //     'key-here',
    //     0
    //   );
    //   setPages([
    //     {
    //       title: 'Home',
    //       path: '/home-page',
    //     },
    //     {
    //       title: 'Order Status',
    //       path: '/order-status',
    //     },
    //     {
    //       title: 'Menu',
    //       path: '/menu',
    //     },
    //     {
    //       title: 'Account',
    //       path: '/account',
    //     },
    //     {
    //       title: 'Cart',
    //       path: '/cart',
    //     },
    //   ]);
    // }
    //   } else {
    //     navigate('/new-user');
    //     alert(data.non_field_errors[0]);
    //   }
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
    switch (input.email) {
      case 'customer':
        navigate('/home-page');
        auth?.loginAs(
          'Test Customer',
          'customer123',
          input.email,
          input.password,
          405.3,
          'customer',
          'key-here',
          0
        );
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
        break;
      case 'employee':
        navigate('/home-page');
        auth?.loginAs(
          'Test Employee',
          'employee123',
          input.email,
          input.password,
          405.3,
          'employee',
          'key-here',
          15
        );
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
          {
            title: 'Queue',
            path: '/queue',
          },
        ]);
        break;
      case 'manager':
        navigate('/home-page');
        auth?.loginAs(
          'Test Manager',
          'manager123',
          input.email,
          input.password,
          405.3,
          'manager',
          'key-here',
          15
        );
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
          {
            title: 'Queue',
            path: '/queue',
          },
          {
            title: 'Edit Accounts',
            path: '/edit-accounts',
          },
          {
            title: 'Edit Menu',
            path: '/edit-menu',
          },
        ]);
        break;
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
