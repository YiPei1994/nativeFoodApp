import { supabase } from "@/app/lib/supabase";
import { Product } from "@assets/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProducts = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProducts } = useMutation({
    mutationFn: async ({ id, ...data }: Product) => {
      const { error } = await supabase

        .from("products")
        .update({ ...data })
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess(_, { id }) {
      await await queryClient.invalidateQueries({ queryKey: ["products"] });
      await await queryClient.invalidateQueries({
        queryKey: ["productById", id],
      });
    },
    onError(error) {
      console.log(error);
    },
  });
  return { updateProducts };
};
