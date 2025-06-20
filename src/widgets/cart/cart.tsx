"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

import { useBucketStore } from "@/shared/store/bucket-store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Skeleton } from "@/shared/ui/skeleton";

import { ShoppingCart } from "lucide-react";

import CartForm from "./cart-form";
import { CartModal } from "./cart-modal";

const Button = dynamic(
  async () => (await import("@/shared/ui/button")).Button,
  {
    ssr: false,
    loading: () => <Skeleton className="h-10 w-[12rem] bg-secondary" />,
  },
);

const CartItems = dynamic(() => import("./cart-items"), {
  ssr: false,
  loading: () => (
    <div className="p-6 h-40">
      <Skeleton className="w-full h-full bg-foreground" />
    </div>
  ),
});

export const Cart = () => {
  const { bucket, bucketPrice, bucketQuantity, setBucket } = useBucketStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div>
      <DrawerTrigger onClick={() => setIsOpen(true)}>
        <Button className="flex-shrink-0" size={"sm"}>
          Корзина | {bucketQuantity} шт. | {bucketPrice}₽
        </Button>
      </DrawerTrigger>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerContent className="h-full overflow-y-auto">
          <DrawerHeader className="p-6 pb-0">
            <DrawerTitle className="text-xl mb-5 flex items-center gap-3">
              <ShoppingCart className="text-accent" size={24} /> Добавленные
              товары
            </DrawerTitle>
          </DrawerHeader>

          <CartForm
            onSuccess={() => {
              setIsOpen(false);
              setIsSuccessOpen(true);
              setBucket([]);
            }}
          />
          <CartItems />
          <DrawerClose
            className="absolute top-2 right-2"
            onClick={() => setIsOpen(false)}
          />
        </DrawerContent>
      </Drawer>
      <CartModal isOpen={isSuccessOpen} setOpen={setIsSuccessOpen} />
    </div>
  );
};
