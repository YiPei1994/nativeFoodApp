import { Stack } from "expo-router";

function OrderLayout() {
  return (
    <Stack>
      <Stack.Screen name="order" options={{ title: "order" }} />
    </Stack>
  );
}

export default OrderLayout;
