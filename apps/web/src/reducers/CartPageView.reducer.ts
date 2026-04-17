import type {
  CartPageViewAction,
  CartPageViewState,
} from "@/types/components/cart.types";
import type { Reducer } from "react";

export const initialCartPageViewState: CartPageViewState = {
  isHydrated: false,
  pendingId: null,
  stockBySlug: {},
};

export const cartPageViewReducer: Reducer<
  CartPageViewState,
  CartPageViewAction
> = (state, action) => {
  switch (action.type) {
    case "setIsHydrated":
      return { ...state, isHydrated: true };
    case "pendingId":
      return { ...state, pendingId: action.pendingId };
    case "stockForSlug":
      return {
        ...state,
        stockBySlug: { ...state.stockBySlug, [action.slug]: action.stock },
      };
    default:
      return state;
  }
};
