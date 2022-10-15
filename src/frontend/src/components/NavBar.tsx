import { useNavigate } from 'react-router-dom';
import Logo from '../images/frappy-logo.jpg';
import '../css/NavBar.css'

interface Props {
  title: string;
  path: string;
}

export default function NavBar ({pages}:{pages: Array<Props>;}) {

  const navigate = useNavigate();
    return (
      <div className='nav-bar-container'>
        <img alt='logo' src={Logo} />
        <div>
          {pages.map( ({title, path}) => (
            <button onClick={() => navigate(path)} >{title}</button>
          ))}
        </div>
      </div>
    )
}
