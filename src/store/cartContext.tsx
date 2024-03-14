import { CartItem, PizzaSize, Product } from "@assets/types";
import React, { ReactNode, createContext, useState } from "react";

export type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: Product, size: PizzaSize) => void;
  removeItem: (id: number) => void;
};

type CartContextProps = { children: ReactNode };

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({ children }: CartContextProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (item: Product, size: PizzaSize) => {
    const exists = cartItems.some(
      (cartItem) => cartItem.product_id === item.id
    );
    if (!exists) {
      const cartItem: CartItem = {
        id: Math.random().toString(),
        product: item,
        product_id: item.id,
        size,
        quantity: 1,
      };

      setCartItems([...cartItems, cartItem]);
    } else {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.product_id === item.id) {
          // Increase the quantity of the existing item
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
