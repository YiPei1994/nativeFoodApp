import { ActivityIndicator, FlatList, Text } from "react-native";

import OrderListItem from "@/components/custom/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrder } from "@/api/orders/apiOrders";

export default function TabTwoScreen() {
  const { data: orders, isLoading, error } = useAdminOrder({ archived: false });
  if (error) return <Text>Something went wrong.</Text>;
  if (isLoading) return <ActivityIndicator />;
  console.log(orders);
  return (
    <>
      <Stack.Screen options={{ title: "Active" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
