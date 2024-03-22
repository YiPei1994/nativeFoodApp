import { Stack } from "expo-router";

function OrderLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "order" }} />
    </Stack>
  );
}

export default OrderLayout;
