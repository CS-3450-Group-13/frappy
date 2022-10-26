import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

export default function NewUser() {
  const navigate = useNavigate();

  const addToData = () => {
    let email = document.getElementById('input-email') as HTMLInputElement;
    let password = document.getElementById(
      'input-password'
    ) as HTMLInputElement;
    let password2 = document.getElementById(
      'input-password-2'
    ) as HTMLInputElement;
    let input;
    if (password.value !== password2.value) {
      alert('passwords to not match');
    } else {
      input = {
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
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.key) {
          console.log('Success:', data);
          navigate('/');
        } else {
          alert(
            'Error can not create user, try again. Passwords must be at least 8 characters'
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="login-div">
      <h1>Create An Account</h1>
      <div className="form-data">
        <form>
          <div className="form-input-item">
            <label>Full Name: </label>
            <input type="text" id="input-fullName"></input>
          </div>
          <div className="form-input-item">
            <label>UserName: </label>
            <input type="text" id="input-username"></input>
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
