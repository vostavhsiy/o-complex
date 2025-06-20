import { axiosInstance } from "@/shared/lib/utils/axios";
import { API_PATHS } from "@/shared/lib/utils/constants/api-paths";

import { Review } from "../model/review";

export type GetReviewsResponse = Review[];

export class ReviewApi {
  static async getReviews() {
    const res = await axiosInstance.get<GetReviewsResponse>(
      API_PATHS.review.getReviews,
    );
    return res.data;
  }
}
