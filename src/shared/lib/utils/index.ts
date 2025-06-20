import { ProductInBucket } from "@/entities/product/model/product";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { LC_BUCKET_KEY } from "./constants";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getLCBucket = (): ProductInBucket[] => {
  try {
    const bucketString = localStorage.getItem(LC_BUCKET_KEY);
    const parsedBucket = bucketString ? JSON.parse(bucketString) : [];
    return parsedBucket;
  } catch (error) {
    return [];
  }
};

export const setLCBucket = (bucket: ProductInBucket[]) => {
  try {
    localStorage.setItem(LC_BUCKET_KEY, JSON.stringify(bucket));
  } catch (error) {
    console.error("Failed:", error);
  }
};

export const addNumeralEnding = (n: number) => {
  const lastDigit = n % 10;
  const lastTwoDigits = n % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return n + "-ый";
  }

  switch (lastDigit) {
    case 1:
      return n + "-ый";
    case 2:
      return n + "-ой";
    case 3:
      return n + "-ий";
    case 4:
      return n + "-ый";
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      return n + "-ый";
    default:
      return n + "-ый";
  }
};
