import { createContext, useContext, useEffect, useState } from 'react';

// simplify user data
interface StateType {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  balance: number;
  role: string;
  key: string;
  hours: number;
}

//simplify context data
interface AppContextInterface {
  userInfo: StateType;
  loginAs: Function;
  logout: Function;
}

const AuthContext = createContext<AppContextInterface | null>(null);

//This function defines all the data and functions that can be called
//throughout the entire app, without having to pass it to every component.
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [userInfo, setUserInfo] = useState({
    id: -1,
    fullName: '',
    userName: '',
    email: '',
    password: '',
    balance: 0.0,
    role: 'none',
    key: '',
    hours: 0,
  });

  const loginAs = (
    id: number,
    fullName: string,
    userName: string,
    email: string,
    password: string,
    balance: number,
    role: string,
    key: string,
    hours: number
  ) => {
    setUserInfo({
      id: id,
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
      balance: balance,
      role: role,
      key: key,
      hours: hours,
    });
  };

  const logout = () => {
    setUserInfo({
      id: -1,
      fullName: '',
      userName: '',
      email: '',
      password: '',
      balance: 0.0,
      role: 'none',
      key: '',
      hours: 0,
    });
  };

  return (
    <AuthContext.Provider value={{ userInfo, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// provides useAuth for constructor of data
export const useAuth = () => {
  return useContext(AuthContext);
};
