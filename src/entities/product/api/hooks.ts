import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ProductApi } from "./api";

export const useGetProducts = () => {
  const { ref, inView } = useInView({ rootMargin: "100px" });
  const { data, ...rest } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => ProductApi.getProducts(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItemsCount = allPages.reduce(
        (total, page) => total + page.items.length,
        0,
      );
      if (loadedItemsCount < lastPage.total) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
  useEffect(() => {
    if (inView && rest.hasNextPage) {
      rest.fetchNextPage();
    }
  }, [inView]);

  return {
    productPages: data?.pages || [],
    flagRef: ref,
    getProductsLoading: rest.status === "pending",
    ...rest,
  };
};
