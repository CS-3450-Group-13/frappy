import Login from "../components/Login/Login";

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function LoginScreen({setIsLoggedIn}: Props) {
  return (
    <div className="container">
      <h1>Welcome to Frappy!</h1>
      <Login setIsLoggedIn={setIsLoggedIn}></Login>
    </div>
  );
}