import React from "react";

import Link from "next/link";

import { ShoppingBag } from "lucide-react";

import { Cart } from "../cart/cart";

const Header = () => {
  return (
    <header className="fixed z-[1] flex items-center top-0 left-0 w-full h-header-width bg-foreground border-b-2 border-light/20">
      <div className="w-full max-w-6xl mx-auto px-[0.9375rem] flex items-center justify-between gap-5">
        <Link href={"/"} className="text-xl flex items-center gap-3">
          <ShoppingBag className="text-accent" size={24} />{" "}
          <span className="hidden sm:block">CoolShop</span>
        </Link>
        <Cart />
      </div>
    </header>
  );
};

export default Header;
