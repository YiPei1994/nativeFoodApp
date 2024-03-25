import { supabase } from "@/app/lib/supabase";
import { Product } from "@assets/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const { mutate: createProduct } = useMutation({
    mutationFn: async (data: Omit<Product, "id">) => {
      const { error } = await supabase
        .from("products")
        .insert([{ ...data }])
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  return { createProduct };
};
