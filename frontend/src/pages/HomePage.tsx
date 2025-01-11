import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { BASE_URL } from "../constants/baseUrl";
import  Alert  from "@mui/material/Alert";

export default function HomePage() {
  const [products, setproducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {

      const fetchData = async () => {
        try {
          const response = await fetch(`${BASE_URL}/product`);
          const data = await response.json();
          setproducts(data);

        } catch  {
            setError(true)
        }
      }

      fetchData()
  }, []);

  if(error) {
    return <Alert severity="error">Something went wrong!</Alert>
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {products.map((p, index) => (
          <Grid key={index} item md={4}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
