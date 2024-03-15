import { useCart } from "@/store/cartContext";
import { StatusBar } from "expo-status-bar";

import { FlatList, Platform, View } from "react-native";
import CartListItem from "./CartListItem";

function Cart() {
  const { cartItems } = useCart();
  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartListItem key={item.id} cartItem={item} />
        )}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default Cart;
