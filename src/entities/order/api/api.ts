import { axiosInstance } from "@/shared/lib/utils/axios";
import { API_PATHS } from "@/shared/lib/utils/constants/api-paths";

export interface OrderProductsDto {
  phone: string;
  cart: { id: number; quantity: number }[];
}

export interface OrderProductsResponse {
  success: "1" | "0";
  error?: string;
}

export class OrderApi {
  static async orderProducts(dto: OrderProductsDto) {
    const res = await axiosInstance.post<OrderProductsResponse>(
      API_PATHS.order.postOrder,
      dto,
    );
    return res.data;
  }
}
