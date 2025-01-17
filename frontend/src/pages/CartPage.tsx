import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../constants/baseUrl";
import { useCart } from "../context/Cart/ContextCart";

export default function CartPage() {
  // const { token } = useAuth();
  const { cartItems, totalAmount } = useCart();
  // const [error, setError] = useState("");

  // console.log(error);

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   const fetchCart = async () => {
  //     const response = await fetch(`${BASE_URL}/cart`, {
  //       headers: {
  //         Authorization: `Bearat ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       setError("Failed to fetch user cart, please try agin");
  //     }

  //     const data = await response.json();

  //     setCart(data);
  //   };

  //   fetchCart();
  // }, [token]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography>My Cart</Typography>
      {cartItems.map(({ title, image, quantity, unitPrice }) => (
        <>
          <Box>{title}</Box>
          <Box>{quantity}</Box>
          <Box>{unitPrice}</Box>
        </>
      ))}
    </Container>
  );
}
