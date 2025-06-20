import { useMutation } from "@tanstack/react-query";

import { OrderApi } from "./api";

export const useOrderProducts = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["order"],
    mutationFn: OrderApi.orderProducts,
  });

  return { order: mutate, orderPending: isPending };
};
