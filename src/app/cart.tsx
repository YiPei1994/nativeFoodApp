import { useCart } from "@/store/cartContext";
import { StatusBar } from "expo-status-bar";

import { FlatList, Platform, Text, View } from "react-native";
import CartListItem from "./CartListItem";
import Button from "@/components/custom/Button";

function Cart() {
  const { cartItems, totalPrice, checkout } = useCart();
  return (
    <View style={{ width: "95%", marginHorizontal: "auto" }}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartListItem key={item.id} cartItem={item} />
        )}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: {totalPrice}
      </Text>
      <Button text="Checkout" onPress={checkout}></Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default Cart;
