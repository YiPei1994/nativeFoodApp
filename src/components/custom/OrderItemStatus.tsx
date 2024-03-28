import Colors from "@/constants/Colors";
import { Tables } from "@/database.types";
import { Order, OrderStatusList } from "@assets/types";
import { Pressable, Text, View } from "react-native";

type OrderItemStatusProps = {
  order: Tables<"orders">;
};

function OrderItemStatus({ order }: OrderItemStatusProps) {
  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={() => console.warn(`Update status ${status}`)}
            style={{
              borderColor: Colors.light.tint,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
              backgroundColor:
                order.status === status ? Colors.light.tint : "transparent",
            }}
          >
            <Text
              style={{
                color: order.status === status ? "white" : Colors.light.tint,
              }}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export default OrderItemStatus;
