"use client";

import React from "react";

import { useBucketStore } from "@/shared/store/bucket-store";

import { CartItem } from "./cart-item";

const CartItems = () => {
  const { bucket, bucketPrice, bucketQuantity, setBucket } = useBucketStore();
  return (
    <div>
      <div className="px-6 flex-col sm:flex-row flex items-center justify-between gap-3">
        <p className="w-max sm:w-[75%] flex items-center justify-between gap-3">
          <span className="hidden sm:block">Товары</span>
          <span
            onClick={() => setBucket([])}
            className="text-sm text-light/60 hover:underline cursor-pointer"
          >
            Удалить все <span className="hidden sm:inline">товары</span>
          </span>
        </p>
        <p className="w-max sm:w-1/4 flex items-center gap-3 text-lg font-semibold">
          <span>{!!bucket.length ? bucketPrice : 0}₽</span>
          <span className="text-sm flex-shrink-0 text-light/60">
            {bucketQuantity} шт.
          </span>
        </p>
      </div>
      <div className="px-6 flex items-center justify-between gap-3 w-full">
        <div className="w-auto flex-1 sm:flex-none sm:w-[75%] h-[1px] bg-light flex-shrink-0"></div>
        <span>+</span>
        <div className="flex-1 h-[1px] bg-light flex-shrink-0"></div>
      </div>
      {!!bucket.length ? (
        bucket.map((product) => <CartItem key={product.id} item={product} />)
      ) : (
        <p className="px-6">В корзине ничего нет!</p>
      )}
    </div>
  );
};

export default CartItems;
