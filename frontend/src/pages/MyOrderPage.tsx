import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Container, Typography } from "@mui/material";


export default function MyOrderPage() {
  const { getMyOrders, myOrders } = useAuth();



  useEffect(() => {
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
        {myOrders.map(({address, total}, index) => (
            <div key={index}>
                <Typography>{address}</Typography>
                <Typography>{total}</Typography>
            </div>
        ))}
    </Container>
  );
}
