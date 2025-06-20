"use server";

import { ReviewApi } from "@/entities/review/api/api";

export const getReviews = async () => {
  try {
    const reviews = await ReviewApi.getReviews();
    return reviews;
  } catch (error) {
    return [];
  }
};
