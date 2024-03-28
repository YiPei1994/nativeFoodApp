import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderListItem from "@/components/custom/OrderListItem";
import OrderItemListItem from "@/components/custom/OrderItemListItem";
import OrderItemStatus from "@/components/custom/OrderItemStatus";
import { useOrderById } from "@/api/orders/apiOrders";

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: order, isLoading, error } = useOrderById(+id);

  if (error || !order) {
    return <Text>Order not found!</Text>;
  }
  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => <OrderItemStatus order={order} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
