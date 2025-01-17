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
