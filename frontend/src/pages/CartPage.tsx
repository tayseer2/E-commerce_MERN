import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/ContextCart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartPage() {
  const { cartItems, totalAmount, updateItemInCart } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if(quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };



  return (
    <Container fixed sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        My Cart
      </Typography>
      {cartItems.map(({ title, image, quantity, unitPrice, productId }) => (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              border: "2px dashed #1976D2",
              borderRadius: 2,
              p: 2,
              margin: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <img src={image} width={110} />
              <Box>
                <Typography variant="h5">{title}</Typography>
                <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
                  {quantity} x {unitPrice} TRY
                </Typography>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() => handleQuantity(productId, quantity - 1)}
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => handleQuantity(productId, quantity + 1)}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => removeItemFromCart()}>
              Delete
            </Button>
          </Box>
        </>
      ))}
      <Box sx={{ marginTop: 5, marginBottom: 5 }}>
        <Typography variant="h4">
          Total Amount: {totalAmount.toFixed(2)} TRY
        </Typography>
      </Box>
    </Container>
  );
}
