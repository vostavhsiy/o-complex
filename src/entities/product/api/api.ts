import { axiosInstance } from "@/shared/lib/utils/axios";
import { API_PATHS } from "@/shared/lib/utils/constants/api-paths";

import { Product } from "../model/product";

export interface GetProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export class ProductApi {
  static async getProducts(page: number = 1, limit: number = 18) {
    const res = await axiosInstance.get<GetProductsResponse>(
      API_PATHS.product.getProducts,
      {
        params: {
          page,
          page_size: limit,
        },
      },
    );
    return res.data;
  }
}
