import { createContext, useContext, useEffect, useState } from 'react';

interface AppContextInterface {
  role: string;
  authkey: string;
  loginAs: Function;
  logout: Function;
  setAuthkey: Function;
}

const AuthContext = createContext<AppContextInterface | null>(null);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [role, setRole] = useState('none');
  const [authkey, setAuthkey] = useState('');

  // useEffect(() => {
  //   const data = window.localStorage.getItem('role');
  //   if (data !== null) setRole(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('role', JSON.stringify(role));
  // }, [role]);

  const loginAs = (role: string) => {
    setRole(role);
  };

  const logout = () => {
    setRole('none');
  };

  console.log(role);
  return (
    <AuthContext.Provider
      value={{ role, authkey, loginAs, logout, setAuthkey }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
