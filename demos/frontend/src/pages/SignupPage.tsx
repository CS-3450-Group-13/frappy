import Signup from "../components/Signup/Signup";

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function SignupPage({setIsLoggedIn}: Props) {
  return (
    <div className='container'>
      <h2>To create an account, please fill out the form below</h2>
      <Signup setIsLoggedIn={setIsLoggedIn}></Signup>
    </div>
  );
}
