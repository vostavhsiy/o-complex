import React, { FC } from "react";

import dynamic from "next/dynamic";

import { addNumeralEnding } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

import { Review } from "../model/review";

const ReviewText = dynamic(() => import("./review-text"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-20" />,
});

interface Props {
  review: Review;
  index: number;
}

export const ReviewsCard: FC<Props> = ({ review, index }) => {
  return (
    <div className="w-full h-full flex flex-col gap-2">
      <span className="text-sm text-light/80">
        {addNumeralEnding(index)} отзыв
      </span>
      <ReviewText text={review.text} />
    </div>
  );
};
