import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantitu: number) => void;
  removeItemInCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
});

export const useCart = () => useContext(CartContext);
