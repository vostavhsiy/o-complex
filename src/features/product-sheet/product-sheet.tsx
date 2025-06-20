import React, { FC } from "react";

import { Product } from "@/entities/product/model/product";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/entities/product/ui/product-card/product-card";

interface Props {
  products: Product[];
}

export const ProductSheet: FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export const ProductSheetSkeleton = ({ n = 18 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
      {Array(n)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
};
