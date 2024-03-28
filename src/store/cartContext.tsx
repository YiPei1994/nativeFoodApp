import { CartItem, PizzaSize, Product } from "@assets/types";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { randomUUID } from "expo-crypto";
import { useCreateOrder, useCreateOrderItems } from "@/api/orders/apiOrders";
import { useRouter } from "expo-router";

export type CartContextType = {
  cartItems: CartItem[];
  totalPrice: number;
  addItem: (item: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, quantity: -1 | 1) => void;
  checkout: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalPrice: 0,
  addItem: () => {},
  updateQuantity: () => {},
  checkout: () => {},
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { createOrder } = useCreateOrder();
  const { createOrderItems } = useCreateOrderItems();
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  );
  const addItem = (item: Product, size: PizzaSize) => {
    const exist = cartItems.find(
      (cartItem) => cartItem.product === item && cartItem.size === size
    );

    if (exist) {
      updateQuantity(exist.id, 1);
      return;
    }

    const cartItem: CartItem = {
      id: randomUUID(),
      product: item,
      product_id: item.id,
      size,
      quantity: 1,
    };

    setCartItems([...cartItems, cartItem]);
  };

  const updateQuantity = (itemId: string, quantity: -1 | 1) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + quantity }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /*  const saveOrderItems = (newOrder) => {
    if (!newOrder) return;
  
    createOrderItems(
      {
        items:cartItems,
        order_id: newOrder.id,
      },
      {
        onSuccess() {
          setCartItems([]);
          router.push(`/(user)/order/${newOrder.id}`);
        },
      }
    );
  } */
  const checkout = () => {
    console.warn("checkout");
    createOrder(totalPrice);
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateQuantity, totalPrice, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
