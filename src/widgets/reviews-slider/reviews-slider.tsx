"use client";

import { FC, useState } from "react";

import { Review } from "@/entities/review/model/review";
import { ReviewsCard } from "@/entities/review/ui/review-card";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface Props {
  reviews: Review[];
}

export const ReviewsSlider: FC<Props> = ({ reviews }) => {
  const [slider, setSlider] = useState<SwiperClass | null>(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <div className="relative z-0 mb-8">
      <Heading>
        <Star className="text-accent" size={24} /> Отзывы
      </Heading>
      <div className="px-16 relative">
        {!!reviews?.length && (
          <>
            <Button
              className="absolute top-1/2 -translate-y-1/2 left-0"
              disabled={isStart}
              onClick={() => slider?.slidePrev()}
              size="icon"
            >
              <ChevronLeft />
            </Button>
            <Swiper
              slidesPerView={1}
              onSlideChange={(sl) => {
                setIsStart(sl.isBeginning);
                setIsEnd(sl.isEnd);
              }}
              onSwiper={setSlider}
            >
              {reviews.map((review, index) => {
                return (
                  <SwiperSlide className="h-full" key={review.id}>
                    <ReviewsCard review={review} index={index + 1} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Button
              className="absolute top-1/2 -translate-y-1/2 right-0"
              disabled={isEnd}
              onClick={() => slider?.slideNext()}
              size="icon"
            >
              <ChevronRight />
            </Button>
          </>
        )}
      </div>
      {!reviews?.length && <p>Пока отзывов нет!</p>}
    </div>
  );
};
