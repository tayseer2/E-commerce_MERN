import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./ContextCart";
import { CartItem } from "../../types/cartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await response.json();

      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          product: any;
          quantity: number;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.productImage,
          quantity,
          unitPrice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
