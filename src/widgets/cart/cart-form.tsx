"use client";

import React, { FC, useState } from "react";
import toast from "react-hot-toast";

import { useOrderProducts } from "@/entities/order/api/hooks";
import PhoneInput from "@/features/phone-input";
import { useBucketStore } from "@/shared/store/bucket-store";
import { Button } from "@/shared/ui/button";

interface Props {
  onSuccess?: () => void;
}

const CartForm: FC<Props> = ({ onSuccess }) => {
  const { bucket } = useBucketStore();
  const [phone, setPhone] = useState("");

  const { order, orderPending } = useOrderProducts();

  const handleSubmit = () => {
    if (orderPending || !bucket.length) return;
    order(
      {
        phone,
        cart: bucket.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      },
      {
        onSuccess(data) {
          if (data.error) {
            toast.error(data.error, {
              position: "top-left",
              style: {
                borderRadius: "10px",
                background: "var(--foreground)",
                color: "var(--light)",
              },
            });
          } else {
            onSuccess?.();
          }
        },
      },
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 px-6 mb-5">
      <PhoneInput
        className="w-full sm:w-max"
        value={phone}
        onChange={(value) => setPhone(value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && bucket?.length && phone.length >= 11) {
            handleSubmit();
          }
        }}
      />
      <Button
        className="w-full sm:w-max"
        disabled={!bucket.length || phone.length < 11 || orderPending}
        onClick={handleSubmit}
      >
        Заказать
      </Button>
    </div>
  );
};

export default CartForm;
