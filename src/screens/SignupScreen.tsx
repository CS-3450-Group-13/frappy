import Signup from "../components/Signup/Signup";

type Props = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function SignupScreen({setIsLoggedIn}: Props) {
  return (
    <Signup setIsLoggedIn={setIsLoggedIn}></Signup>
  );
}