import { FlatList } from "react-native";

import orders from "@assets/data/orders";
import OrderListItem from "@/components/custom/OrderListItem";
import { Stack } from "expo-router";

export default function TabTwoScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Archive" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
