import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Wireless Headphones",
      image: "https://example.com/images/headphones.jpg",
      price: 50,
      stock: 20,
    },
    {
      title: "Smartphone",
      image: "https://example.com/images/smartphone.jpg",
      price: 700,
      stock: 15,
    },
    {
      title: "Laptop",
      image: "https://example.com/images/laptop.jpg",
      price: 1200,
      stock: 10,
    },
    {
      title: "Smart Watch",
      image: "https://example.com/images/smartwatch.jpg",
      price: 150,
      stock: 25,
    },
    {
      title: "Bluetooth Speaker",
      image: "https://example.com/images/speaker.jpg",
      price: 80,
      stock: 30,
    },
    {
      title: "Tablet",
      image: "https://example.com/images/tablet.jpg",
      price: 300,
      stock: 12,
    },
    {
      title: "Gaming Console",
      image: "https://example.com/images/console.jpg",
      price: 500,
      stock: 8,
    },
    {
      title: "Digital Camera",
      image: "https://example.com/images/camera.jpg",
      price: 400,
      stock: 18,
    },
    {
      title: "External Hard Drive",
      image: "https://example.com/images/harddrive.jpg",
      price: 100,
      stock: 40,
    },
    {
      title: "Mechanical Keyboard",
      image: "https://example.com/images/keyboard.jpg",
      price: 90,
      stock: 35,
    },
    {
      title: "4K Monitor",
      image: "https://example.com/images/monitor.jpg",
      price: 350,
      stock: 14,
    },
    {
      title: "Fitness Tracker",
      image: "https://example.com/images/tracker.jpg",
      price: 120,
      stock: 22,
    },
  ];

  const existingProducts = await getAllProducts();

  if (existingProducts.length === 0) {
    productModel.insertMany(products);
  }
};
