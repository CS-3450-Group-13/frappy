import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

export default function NewUser() {
  const navigate = useNavigate();
  const addToData = () => {
    let name = document.getElementById('input-name') as HTMLInputElement;
    let email = document.getElementById('input-email') as HTMLInputElement;
    let password = document.getElementById(
      'input-password'
    ) as HTMLInputElement;
    let password2 = document.getElementById(
      'input-password-2'
    ) as HTMLInputElement;
    let input;
    if (password.value !== password2.value) {
      console.error('passwords to not match');
    } else {
      input = {
        username: name.value,
        email: email.value,
        password1: password.value,
        password2: password2.value,
      };
      console.log(input);
    }
    //POST request with body equal on data in JSON format
    fetch('http://127.0.0.1:8000/auth-endpoint/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log('Success:', data);
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
      });
    navigate('/');
  };

  return (
    <div className="login-div">
      <h1>Create An Account</h1>
      <div className="form-data">
        <form>
          <div className="form-input-item">
            <label>Username: </label>
            <input type="text" id="input-name"></input>
          </div>
          <div className="form-input-item">
            <label>Email: </label>
            <input type="email" id="input-email"></input>
          </div>
          <div className="form-input-item">
            <label>Password: </label>
            <input type="password" id="input-password"></input>
          </div>
          <div className="form-input-item">
            <label>Re-Enter Pass: </label>
            <input type="password" id="input-password-2"></input>
          </div>
          <div className="form-input-item-last">
            <button
              data-testid="newUserBtn"
              type="button"
              className="bttn"
              onClick={addToData}
            >
              Create New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
