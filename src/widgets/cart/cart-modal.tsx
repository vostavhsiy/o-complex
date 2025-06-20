import React, { FC } from "react";

import { Modal } from "@/shared/ui/modal";

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

export const CartModal: FC<Props> = ({ isOpen, setOpen }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={(value) => setOpen(value)}>
      <Modal.Header title="Заказ успешно совершен!" />
      <Modal.Content>
        <p className="mb-3">Корзина очищена!</p>
        <p>Заказывайте товары в считанные минуты, получайте в этот же день!</p>
      </Modal.Content>
    </Modal>
  );
};
