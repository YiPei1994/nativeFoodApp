import { useContext } from "react";
import { CartContext } from "./cartContext";

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === null) {
    console.error("CartContext was used outside context provider");
  }
  return context;
};
