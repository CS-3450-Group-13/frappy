import React from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Login({setPages}:{setPages: Function;}) {

  const navigate = useNavigate();

  const TestUsers = [
    {
      email: "dyl2elite@gmail.com",
      password: "hello1234"
    },
    {
      email: 'test@test.com',
      password: 'hello1234'
    },
  ];

  const submitForm = () => {
    fetch('http://127.0.0.1:8000/frappapi/extras/').then((response) => response.json()).then((data) => console.log(data))


    let email = document.getElementById('input-email') as HTMLInputElement;
    let password = document.getElementById('input-password') as HTMLInputElement;
    let input = {
      email: email.value,
      password: password.value
    }
    if(TestUsers.some(data => data.email === input.email 
      && data.password === input.password)){
        alert('Login success');
        navigate('/home');
        setPages(
          [
            {
            title: 'Home',
            path: '/home'
          },
          {
            title: 'Order',
            path: '/order'
          },
          {
            title: 'Account',
            path: '/account'
          },
        ]
        );
      }
      else{
        alert('Login Failed');
        navigate('/new-user');
      }
  }


  return (
    <div className='login-div'>
      <h1>Login Page</h1>
      <div className='form-data'>
      <form>
        <div className='form-input-item'>
      <label>Email:  </label>
      <input type='email' id='input-email'></input>
      </div>
      <div className='form-input-item'>
      <label>Password:  </label>
      <input type='password' id='input-password'></input>
      </div>
      <div className='form-input-item-last'>
        <button type='button' className='bttn' onClick={submitForm}>Log In</button>
      </div>
      </form>
      <h6>No account? create an account <Link to='/new-user'>here</Link></h6>
      </div>
    </div>
  );
}
