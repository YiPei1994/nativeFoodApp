import { ActivityIndicator, FlatList, Text } from "react-native";

import OrderListItem from "@/components/custom/OrderListItem";
import { Stack } from "expo-router";
import { useUserOrders } from "@/api/orders/apiOrders";
import { useAuth } from "@/store/AuthProvider";

export default function TabTwoScreen() {
  const {
    profile: { id },
  } = useAuth();

  const { data: orders, isLoading, error } = useUserOrders(id);
  if (error) return <Text>Something went wrong.</Text>;
  if (isLoading) return <ActivityIndicator />;

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
