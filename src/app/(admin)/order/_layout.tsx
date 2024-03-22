import { Stack } from "expo-router";

function OrderLayout() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
}

export default OrderLayout;
