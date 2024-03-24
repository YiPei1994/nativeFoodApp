import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

import { Link, Redirect } from "expo-router";
import Button from "@/components/custom/Button";
import { useSession } from "@/store/AuthProvider";
import { supabase } from "./lib/supabase";

const index = () => {
  const { session, loading } = useSession();

  if (loading) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href="/signIn" />;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)/menu"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)/menu"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)/signIn"} asChild>
        <Button text="Sign in" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign Out" />
    </View>
  );
};

export default index;
