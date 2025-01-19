import { createContext, useContext } from "react";
import { Order } from "../../types/order";

interface AuthContextType {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  myOrders: Order | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  getMyOrders: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  myOrders: null,
  login: () => {},
  logout: () => {},
  getMyOrders: () => {}
});

export const useAuth = () => useContext(AuthContext);
