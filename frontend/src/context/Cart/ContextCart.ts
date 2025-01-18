import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  addItemToCart: (productId: string) => void;
  updateItemInCart: (productId: string, quantitu: number) => void;
  removeItemInCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updateItemInCart: () => {},
  removeItemInCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);
