import { useNavigate } from 'react-router-dom';
import Logo from '../images/frappy-logo.jpg';
import '../css/NavBar.css';
import { useAuth } from './auth';

interface Props {
  title: string;
  path: string;
}

export default function NavBar({
  pages,
  setPages,
}: {
  pages: Array<Props>;
  setPages: Function;
}) {
  const navigate = useNavigate();
  let auth = useAuth();

  const handleLogOut = () => {
    fetch('http://127.0.0.1:8000/auth-endpoint/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response: ', data);
      });
    localStorage.removeItem('LoginToken');
    auth?.logout();
    setPages([
      {
        title: 'Login',
        path: '/',
      },
      {
        title: 'New User',
        path: '/new-user',
      },
    ]);
  };
  return (
    <div className="nav-bar-container">
      <img alt="logo" src={Logo} />
      <div>
        {pages.map(({ title, path }) => (
          <button id={title} aria-label={title} onClick={() => navigate(path)}>
            {title}
          </button>
        ))}
        {auth?.userInfo.role !== 'none' ? (
          <button onClick={handleLogOut}>LogOut</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
