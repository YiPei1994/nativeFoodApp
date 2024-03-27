import { supabase } from "@/app/lib/supabase";
import { OrderStatus } from "@assets/types";

import { useQuery } from "@tanstack/react-query";

export const useUserOrders = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  return { data, isLoading, error };
};

export const useAdminOrder = ({ archived = false }: { archived?: boolean }) => {
  const statuses: OrderStatus[] = archived
    ? ["Delivered"]
    : ["New", "Cooking", "Delivering"];

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", statuses)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  return { data, isLoading, error };
};
