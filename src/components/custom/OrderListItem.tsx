import Colors from "@/constants/Colors";
import { Order } from "@assets/types";

import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
type OrderListItemProps = {
  order: Order;
};

function OrderListItem({ order }: OrderListItemProps) {
  dayjs.extend(utc);

  return (
    <Link asChild href={`/order/${order.id}`}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.text}>
            {dayjs.utc(order.created_at).hour()} hours ago
          </Text>
        </View>
        <Text style={styles.title}>{order.status}</Text>
      </View>
    </Link>
  );
}

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    overflow: "scroll",
    flex: 1,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
  },
  text: {
    color: Colors.light.tabIconDefault,
  },
});
