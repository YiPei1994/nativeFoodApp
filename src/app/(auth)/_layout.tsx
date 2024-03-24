import { useSession } from "@/store/AuthProvider";
import { Redirect, Stack } from "expo-router";

function AuthLayout() {
  const { session } = useSession();

  if (session) {
    return <Redirect href="/" />;
  }

  return <Stack />;
}

export default AuthLayout;
