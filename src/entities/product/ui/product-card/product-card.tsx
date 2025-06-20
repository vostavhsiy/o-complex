import React, { FC } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import ImageWithFallback from "@/shared/ui/image-with-fallback";
import { Skeleton } from "@/shared/ui/skeleton";

import { Product } from "../../model/product";

const ProductBuyButton = dynamic(() => import("./product-buy-button"), {
  ssr: false,
  loading: () => <Skeleton className="h-10 w-full" />,
});

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="h-full flex flex-col gap-8 justify-between bg-light/5 rounded-t-md">
      <div>
        <div className="bg-foreground overflow-hidden rounded-md">
          <ImageWithFallback
            src={product.image_url || "/product.jpg"}
            className="cover block aspect-square"
            alt={product.title}
            width={281}
            height={366}
          />
        </div>
        <div className="px-4">
          <p className="line-clamp-2 text-lg mt-5">{product.title}</p>
          <p className="text-sm text-light/70 line-clamp-5 mt-3">
            {product.description}
          </p>
          <p className="mt-3">
            Цена: <span className="font-semibold">{product.price}₽</span>
          </p>
        </div>
      </div>
      <div>
        <ProductBuyButton product={product} />
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return <Skeleton className="w-full aspect-square" />;
};
