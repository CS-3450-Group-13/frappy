import { createContext, useContext, useEffect, useState } from 'react';

interface StateType {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  balance: number;
  role: string;
  key: string;
  hours: number;
}

interface AppContextInterface {
  userInfo: StateType;
  loginAs: Function;
  logout: Function;
}

const AuthContext = createContext<AppContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    balance: 0.0,
    role: 'none',
    key: '',
    hours: 0,
  });

  // useEffect(() => {
  //   const data = window.localStorage.getItem('role');
  //   if (data !== null) setRole(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('role', JSON.stringify(role));
  // }, [role]);

  const loginAs = (
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

  console.log(userInfo.role);
  return (
    <AuthContext.Provider value={{ userInfo, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
