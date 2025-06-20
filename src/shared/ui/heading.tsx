import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Heading: FC<Props> = ({ children }) => {
  return <h2 className="text-xl mb-8 flex items-center gap-3">{children}</h2>;
};
