import { supabase } from "@/app/lib/supabase";
import { Product } from "@assets/types";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return { data, isLoading, error };
};
