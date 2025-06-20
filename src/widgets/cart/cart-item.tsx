import React, { FC } from "react";

import { ProductInBucket } from "@/entities/product/model/product";

interface Props {
  item: ProductInBucket;
}

export const CartItem: FC<Props> = ({ item }) => {
  return (
    <div className="flex-col sm:flex-row flex justify-between gap-3 py-6 sm:py-3 px-6 hover:bg-foreground">
      <p className="line-clamp-2 flex-shrink-0 sm:w-3/5">{item.title}</p>
      <div className="flex-shrink-0 flex items-center sm:items-start sm:flex-col gap-2 sm:w-1/4">
        <span className="text-lg font-semibold">
          {item.quantity * item.price}₽
        </span>
        <span className="text-sm text-light/70">
          {item.quantity} шт. по {item.price}₽
        </span>
      </div>
    </div>
  );
};
