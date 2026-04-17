import type {
  CartPageViewAction,
  CartPageViewState,
} from "@/types/components/cart.types";
import type { Reducer } from "react";

export const initialCartPageViewState: CartPageViewState = {
  hydrated: false,
  pendingId: null,
  stockBySlug: {},
};

export const cartPageViewReducer: Reducer<
  CartPageViewState,
  CartPageViewAction
> = (state, action) => {
  switch (action.type) {
    case "hydrated":
      return { ...state, hydrated: true };
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
