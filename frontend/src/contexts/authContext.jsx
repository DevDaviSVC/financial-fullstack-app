import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("financial-app")) || null);

  useEffect(() => {
    localStorage.setItem("financial-app", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
      {children}
    </AuthContext.Provider>
  )
}