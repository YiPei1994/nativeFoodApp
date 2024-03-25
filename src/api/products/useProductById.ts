import { supabase } from "@/app/lib/supabase";
import { Product } from "@assets/types";
import { useQuery } from "@tanstack/react-query";

export const useProductById = (id: number) => {
  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["productById", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return { data, error, isLoading };
};
