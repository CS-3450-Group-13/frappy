import { createContext, useContext, useEffect, useState } from 'react';

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

interface Customer {
  email: string;
  name: string;
  key: string;
}

interface AppContextInterface {
  userInfo: StateType;
  loginAs: Function;
  logout: Function;
  customer: Customer;
  setCustomer: Function;
}

const AuthContext = createContext<AppContextInterface | null>(null);

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

  const [customer, setCustomer] = useState({
    email: 'self',
    name: 'self',
    key: 'none',
  });

  // useEffect(() => {
  //   const data = window.localStorage.getItem('role');
  //   if (data !== null) setRole(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('role', JSON.stringify(role));
  // }, [role]);

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

  console.log(userInfo.role);
  return (
    <AuthContext.Provider
      value={{ userInfo, loginAs, logout, customer, setCustomer }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
