import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const localData = localStorage.getItem("user-data");
    return localData !== null ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    if (user) window.localStorage.setItem("user-data", JSON.stringify(user));
    else window.localStorage.clear();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
