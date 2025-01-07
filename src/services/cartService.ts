import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};


interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({productId, quantity, userId}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });


  // Dose The Item exist in the cart?
  const existsInCart = cart.items.find((p) => p.product.toString() === productId);

  if(existsInCart) {
    return {data: "Item already exists in cart!", statusCode: 400};
  }

  // Fetch the Product

  const product = await productModel.findById(productId);

  if (!product) {
    return {data: "Product not found!", statusCode: 404};
  }

  if(product.stock < quantity) {
    return {data: "Product out of stock!", statusCode: 400};
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
    price: 0
  })

  // uptade the total amount
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();
  
  return {data: updatedCart, statusCode: 200};
}


