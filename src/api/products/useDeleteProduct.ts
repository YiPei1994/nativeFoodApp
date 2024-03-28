import { supabase } from "@/app/lib/supabase";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return { deleteProduct };
};
