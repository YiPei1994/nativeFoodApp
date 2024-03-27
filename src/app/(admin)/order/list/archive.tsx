import { FlatList, Text } from "react-native";
import OrderListItem from "@/components/custom/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrder } from "@/api/orders/apiOrders";
import { ActivityIndicator } from "react-native";

export default function TabTwoScreen() {
  const { data: orders, isLoading, error } = useAdminOrder({ archived: true });
  if (error) return <Text>Something went wrong.</Text>;
  if (isLoading) return <ActivityIndicator />;
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
