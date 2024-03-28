import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/store/AuthProvider";
import { CartItem, OrderStatus } from "@assets/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      console.log(statuses);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  return { data, isLoading, error };
};

export const useOrderById = (orderId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orderById"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", orderId)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  return { data, isLoading, error };
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const id = session?.user.id;
  const { mutate: createOrder } = useMutation({
    mutationFn: async (total: number) => {
      console.log(id, total);
      if (!id) return;
      const { data, error } = await supabase
        .from("orders")
        .insert([{ total, user_id: id }])
        .select();
      if (error) {
        throw new Error(error.message);
      }

      return data[0];
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { createOrder };
};

export const useCreateOrderItems = () => {
  const { mutate: createOrderItems } = useMutation({
    async mutationFn({
      items,
      order_id,
    }: {
      items: CartItem[];
      order_id: number;
    }) {
      const { error } = await supabase.from("order_items").insert(
        items.map((item) => ({
          size: item.size,
          quantity: item.quantity,
          order_id: order_id,
          product_id: item.product_id,
        }))
      );

      if (error) {
        throw error;
      }
    },
    onError(error) {
      console.log(error);
    },
  });

  return { createOrderItems };
};
