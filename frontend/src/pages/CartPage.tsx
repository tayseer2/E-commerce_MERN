import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/ContextCart";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate()

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleRemove = (product: string) => {
    removeItemInCart(product);
  };

  const handleCheckout = () =>  {
    navigate("/checkout")
  }
  return (
    <Container fixed sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Typography sx={{ marginLeft: 2 }} variant="h4">
          My Cart
        </Typography>
        <Button
          sx={{ marginRight: 2 }}
          variant="outlined"
          color="error"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </Box>
      {cartItems.length ? (
        <Box>
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
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemove(productId)}
                >
                  Delete
                </Button>
              </Box>
            </>
          ))}

          <Box
            sx={{
              marginTop: 5,
              marginBottom: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">
              Total Amount: {totalAmount.toFixed(2)} TRY
            </Typography>
            <Button variant="contained" onClick={handleCheckout}>GO TO CHECKOUT</Button>
          </Box>
        </Box>
      ) : (
        <Typography>
          Cart is empty. Please start shopping and items first.
        </Typography>
      )}
    </Container>
  );
}
