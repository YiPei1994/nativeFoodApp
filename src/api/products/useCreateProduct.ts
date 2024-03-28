import { supabase } from "@/app/lib/supabase";
import { Product } from "@assets/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: createProduct } = useMutation({
    mutationFn: async (data: Omit<Product, "id">) => {
      const { error } = await supabase
        .from("products")
        .insert([{ ...data }])
        .select();
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError(error) {
      console.log(error);
    },
  });
  return { createProduct };
};
