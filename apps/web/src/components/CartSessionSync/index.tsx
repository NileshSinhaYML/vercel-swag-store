"use client";

import { rehydrateCartStore } from "@/stores/cart.store";
import { useEffect } from "react";
import type { FC } from "react";

export const CartSessionSync: FC = () => {
  useEffect(() => {
    void rehydrateCartStore();
  }, []);
  return null;
};
