import React, { FC, useEffect, useState } from "react";

import { useProductFromBucket } from "@/shared/lib/utils/hooks";
import { Button } from "@/shared/ui/button";

import { Product } from "../../model/product";

interface Props {
  product: Product;
}

const ProductBuyButton: FC<Props> = ({ product }) => {
  const {
    productFromBucket,
    addProductToBucket,
    removeProductFromBucket,
    changeProductQuantityInBucket,
  } = useProductFromBucket(product.id);

  const handleAdding = () => {
    if (productFromBucket) return;
    addProductToBucket(product);
  };

  const handleIncrease = () => {
    addProductToBucket(product);
  };

  const handleChange = (quantity: number) => {
    if (quantity === 0) {
      removeProductFromBucket(product.id);
    } else if (quantity >= 1) {
      changeProductQuantityInBucket(product.id, quantity);
    }
  };

  return (
    <Button className="w-full flex items-center gap-3" onClick={handleAdding}>
      {!productFromBucket && "Купить"}
      {productFromBucket && (
        <>
          <span
            onClick={(event) => {
              event.stopPropagation();
              handleChange(productFromBucket.quantity - 1);
            }}
            className="bg-dark/30 rounded-md block w-1/3 text-2xl"
          >
            -
          </span>
          <input
            className="w-1/3 text-center outline-none"
            value={productFromBucket.quantity}
            onChange={(event) => {
              const value = event.currentTarget.value.replace(/[^0-9]/g, "");
              if (value === "") return;
              const quantity = +value;
              if (quantity === 0) removeProductFromBucket(product.id);
              else changeProductQuantityInBucket(product.id, quantity);
            }}
          />
          <span
            onClick={(event) => {
              event.stopPropagation();
              handleIncrease();
            }}
            className="bg-dark/30 rounded-md block w-1/3 text-2xl"
          >
            +
          </span>
        </>
      )}
    </Button>
  );
};

export default ProductBuyButton;
