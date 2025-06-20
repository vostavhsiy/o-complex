import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { ReviewApi } from "./api";

export const useGetReviews = () => {
  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => ReviewApi.getReviews(),
  });

  return {
    reviews: data,
    getReviewsLoading: isLoading,
    ...rest,
  };
};
