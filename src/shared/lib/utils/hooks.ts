"use client";

import { useEffect, useState } from "react";

import { Product, ProductInBucket } from "@/entities/product/model/product";
import { useBucketStore } from "@/shared/store/bucket-store";

export const useProductFromBucket = (productId: number) => {
  const { bucket, setBucket } = useBucketStore();
  const [product, setProduct] = useState<ProductInBucket | null>(null);

  const loadProduct = () => {
    setProduct(bucket.find((product) => product.id === productId) || null);
  };

  useEffect(() => {
    loadProduct();
  }, [bucket]);

  const addProductToBucket = (product: Product) => {
    const existingProduct = bucket.find((p) => p.id === product.id);
    let newBucket;
    if (existingProduct) {
      newBucket = bucket.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
      );
    } else {
      newBucket = [...bucket, { ...product, quantity: 1 }];
    }
    setBucket(newBucket);
  };

  const changeProductQuantityInBucket = (
    productId: number,
    quantity: number,
  ) => {
    const newBucket = bucket.map((p) =>
      p.id === productId ? { ...p, quantity } : p,
    );
    setBucket(newBucket);
  };

  const removeProductFromBucket = (productId: number) => {
    const newBucket = bucket.filter((p) => p.id !== productId);
    setBucket(newBucket);
  };

  return {
    productFromBucket: product,
    addProductToBucket,
    changeProductQuantityInBucket,
    removeProductFromBucket,
  };
};
