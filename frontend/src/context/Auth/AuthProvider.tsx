import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("usernaem")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("usernaem", username);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider value={{ username, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
