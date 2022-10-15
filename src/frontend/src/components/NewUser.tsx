import React from 'react';
import '../css/Login.css';


export default function NewUser() {

    const addToData = () => {
        let name = document.getElementById('input-name') as HTMLInputElement;
        let email = document.getElementById('input-email') as HTMLInputElement;
        let password = document.getElementById('input-password') as HTMLInputElement;
        let password2 = document.getElementById('input-password-2') as HTMLInputElement;

        if(password.value !== password2.value){
            console.error('passwords to not match')
        }
        else{
            let input = {
                name: name.value,
                email: email.value,
                password: password.value
            };
            console.log(input);
        }
      }

  return (
    <div className='login-div'>
      <h1>Create An Account</h1>
      <div className='form-data'>
      <form>
      <div className='form-input-item'>
      <label>Name:  </label>
      <input type='text' id='input-name'></input>
      </div>
        <div className='form-input-item'>
      <label>Email:  </label>
      <input type='email' id='input-email'></input>
      </div>
      <div className='form-input-item'>
      <label>Password:  </label>
      <input type='password' id='input-password'></input>
      </div>
      <div className='form-input-item'>
      <label>Re-Enter Pass:  </label>
      <input type='password' id='input-password-2'></input>
      </div>
      <div className='form-input-item-last'>
        <button type='button' className='bttn' onClick={addToData}>Create New User</button>
      </div>
      </form>
      </div>
    </div>  )
}
