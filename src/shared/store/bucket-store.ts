import { ProductInBucket } from "@/entities/product/model/product";

import { create } from "zustand";

import { getLCBucket, setLCBucket } from "../lib/utils";

interface BucketState {
  bucket: ProductInBucket[];
  bucketPrice: number;
  bucketQuantity: number;
  setBucket: (bc: ProductInBucket[]) => void;
}

export const useBucketStore = create<BucketState>()((set) => ({
  bucket: getLCBucket(),
  bucketPrice: getLCBucket().reduce(
    (acc, pr) => acc + pr.quantity * pr.price,
    0,
  ),
  bucketQuantity: getLCBucket().reduce((acc, pr) => acc + pr.quantity, 0),
  setBucket: (bc) =>
    set((state) => {
      setLCBucket(bc);
      return {
        bucket: bc,
        bucketPrice: bc.reduce((acc, pr) => acc + pr.quantity * pr.price, 0),
        bucketQuantity: bc.reduce((acc, pr) => acc + pr.quantity, 0),
      };
    }),
}));
