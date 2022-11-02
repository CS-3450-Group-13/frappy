import React from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/auth';

interface UserType {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  balance: string;
  accountType: string;
  hours: string;
  authKey: string;
}

interface Props {
  setPages: Function;
  user: UserType;
  setUser: Function;
}

export default function Login({ setPages, user, setUser }: Props) {
  const navigate = useNavigate();
  const authToken = '7af6c160689e100b567df19b91e8a4ad0f2de704';

  const auth = useAuth();

  const submitForm = () => {
    let HOURS = 0;
    let role = 'none';
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
      .then((LoginData) => {
        role = 'customer';
        console.log(role);
        if (LoginData.key) {
          fetch('http://127.0.0.1:8000/users/users/current_user/', {
            headers: {
              Authorization: `Token ${LoginData.key}`,
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
          })
            .then((response) => response.json())
            .then((CurrentUserdata) => {
              console.log(CurrentUserdata);
              console.log('k');
              const USERID = CurrentUserdata.id;
              const FIRSTNAME = CurrentUserdata.first_name;
              const LASTNAME = ' ' + CurrentUserdata.last_name;
              const BALANCE = Number(CurrentUserdata.balance);
              fetch('http://127.0.0.1:8000/users/employees/', {
                headers: {
                  Authorization: `Token ${authToken}`,
                  'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  for (let i = 0; i < data.length; i++) {
                    if (data[i].user == USERID) {
                      HOURS = Number(data[i].hours);
                      if (data[i].is_manager) {
                        role = 'manager';
                      } else {
                        role = 'employee';
                      }
                    }
                  }
                  switch (role) {
                    case 'customer':
                      navigate('/home-page');
                      auth?.loginAs(
                        USERID,
                        FIRSTNAME + ' ' + LASTNAME,
                        'username',
                        input.email,
                        input.password,
                        BALANCE,
                        role,
                        LoginData.key,
                        HOURS
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
                        USERID,
                        FIRSTNAME + LASTNAME,
                        'username',
                        input.email,
                        input.password,
                        BALANCE,
                        role,
                        LoginData.key,
                        HOURS
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
                        USERID,
                        FIRSTNAME + LASTNAME,
                        'username',
                        input.email,
                        input.password,
                        BALANCE,
                        role,
                        LoginData.key,
                        HOURS
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
                    case 'none':
                      console.error("can't login");
                      break;
                  }
                });
            });
        } else {
          navigate('/new-user');
          alert(LoginData.non_field_errors[0]);
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
