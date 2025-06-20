"use client";

import React from "react";

import { useGetProducts } from "@/entities/product/api/hooks";
import {
  ProductSheet,
  ProductSheetSkeleton,
} from "@/features/product-sheet/product-sheet";
import { Heading } from "@/shared/ui/heading";
import { Loader } from "@/shared/ui/loader";

import { Box, Flame } from "lucide-react";
import { p } from "motion/react-client";

export const ProductFeed = () => {
  const { productPages, getProductsLoading, isFetchingNextPage, flagRef } =
    useGetProducts();

  return (
    <div className="pt-5">
      <Heading>
        <Box className="text-accent" size={24} /> Товары
      </Heading>
      <div className="flex flex-col gap-8">
        {getProductsLoading && <ProductSheetSkeleton />}
        {!getProductsLoading &&
          !!productPages?.length &&
          productPages
            .filter((page) => !!page.items.length)
            .map((page, index) => (
              <ProductSheet key={index} products={page.items} />
            ))}
        {!getProductsLoading && !productPages?.length && (
          <p>Пока товаров нет!</p>
        )}
        <div ref={flagRef}></div>
      </div>
      {!getProductsLoading && isFetchingNextPage && (
        <Loader className="mx-auto my-2" />
      )}
    </div>
  );
};
