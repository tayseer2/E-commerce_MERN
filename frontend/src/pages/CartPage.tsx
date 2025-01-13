import { Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

export default function CartPage() {
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");

  console.log(error);
  

  useEffect(() => {
    if(!token) {
        return
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearat ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart, please try agin");
      }

      const data = await response.json();

      setCart(data);
    };

    fetchCart();
  }, [token]);

  console.log({ cart });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography>My Cart</Typography>
    </Container>
  );
}
