import { CartItem, PizzaSize, Product } from "@assets/types";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { randomUUID } from "expo-crypto";

export type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: Product, size: PizzaSize) => void;

  updateQuantity: (itemId: string, quantity: -1 | 1) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  return (
    <CartContext.Provider value={{ cartItems, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

export const useCart = () => useContext(CartContext);
