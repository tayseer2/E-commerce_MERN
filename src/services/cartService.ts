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

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  // Dose The Item exist in the cart?
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  // Fetch the Product

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "Product out of stock!", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });

  // uptade the total amount
  cart.totalAmount += product.price * quantity;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface UpdateItemInCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item does not exist in cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found!", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "Product out of stock!", statusCode: 400 };
  }

  existsInCart.quantity = quantity;

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let totla = otherCartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);

  totla += existsInCart.unitPrice * existsInCart.quantity;

  cart.totalAmount = totla;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}

export const deleteItemInCart = async ({
  productId,
  userId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "Item does not exist in cart!", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  const totla = otherCartItems.reduce((sum, product) => {
    sum += product.unitPrice * product.quantity;
    return sum;
  }, 0);

  cart.items = otherCartItems;
  cart.totalAmount = totla;

  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
