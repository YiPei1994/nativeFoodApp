import { FlatList } from "react-native";

import orders from "@assets/data/orders";
import OrderListItem from "@/components/custom/OrderListItem";

export default function TabTwoScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} key={item.id} />}
    />
  );
}
