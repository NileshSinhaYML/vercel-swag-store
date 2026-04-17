import type { CartPayload } from "@/types/api/cart";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { API_ROUTES } from "@/constants/api.routes";

const PERSIST_NAME = "swag-store-cart";

const authHeaders = (token: string) => ({
  "Content-Type": "application/json",
  "x-cart-token": token,
});

export type CartStore = {
  token: string | null;
  cart: CartPayload | null;
  isBusy: boolean;
  error: string | null;
  createCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  ensureToken: () => Promise<string>;
  addProduct: (productId: string, quantity: number) => Promise<void>;
  setQuantity: (productId: string, quantity: number) => Promise<void>;
  removeLine: (productId: string) => Promise<void>;
  clearClientCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      token: null,
      cart: null,
      isBusy: false,
      error: null,

      clearClientCart: () => {
        set({ token: null, cart: null, error: null });
      },

      createCart: async () => {
        const res = await fetch(`${API_ROUTES.CART_PROXY}/create`, {
          method: "POST",
        });
        const json = (await res.json()) as {
          success: boolean;
          data?: CartPayload;
          error?: { message?: string };
        };
        if (!res.ok || !json.success || !json.data?.token) {
          throw new Error(json.error?.message ?? "Could not create cart");
        }
        const { token } = json.data;
        set({ token, cart: json.data, error: null });
      },

      refreshCart: async () => {
        const { token } = get();
        if (!token) {
          set({ cart: null });
          return;
        }
        const res = await fetch(API_ROUTES.CART_PROXY, {
          headers: authHeaders(token),
        });
        const json = (await res.json()) as {
          success: boolean;
          data?: CartPayload;
          error?: { message?: string };
        };
        if (!res.ok || !json.success) {
          if (res.status === 400 || res.status === 404) {
            get().clearClientCart();
          }
          set({ error: json.error?.message ?? "Could not load cart" });
          return;
        }
        if (json.data) {
          set({ cart: json.data, error: null });
        }
      },

      ensureToken: async () => {
        let { token } = get();
        if (!token) {
          await get().createCart();
          token = get().token;
        }
        if (!token) {
          throw new Error("No cart");
        }
        return token;
      },

      addProduct: async (productId, quantity) => {
        set({ isBusy: true, error: null });
        try {
          const token = await get().ensureToken();
          const res = await fetch(API_ROUTES.CART_PROXY, {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify({ productId, quantity }),
          });
          const json = (await res.json()) as {
            success: boolean;
            data?: CartPayload;
            error?: { message?: string };
          };
          if (!res.ok || !json.success || !json.data) {
            throw new Error(json.error?.message ?? "Could not add to cart");
          }
          set({ cart: json.data, error: null });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Cart error";
          set({ error: message });
          throw error;
        } finally {
          set({ isBusy: false });
        }
      },

      setQuantity: async (productId, quantity) => {
        set({ isBusy: true, error: null });
        try {
          const token = await get().ensureToken();
          if (quantity < 1) {
            const res = await fetch(
              `${API_ROUTES.CART_PROXY}/${encodeURIComponent(productId)}`,
              {
                method: "DELETE",
                headers: { "x-cart-token": token },
              },
            );
            const json = (await res.json()) as {
              success: boolean;
              data?: CartPayload;
              error?: { message?: string };
            };
            if (!res.ok || !json.success || !json.data) {
              throw new Error(json.error?.message ?? "Could not remove item");
            }
            set({ cart: json.data, error: null });
            return;
          }
          const res = await fetch(
            `${API_ROUTES.CART_PROXY}/${encodeURIComponent(productId)}`,
            {
              method: "PATCH",
              headers: authHeaders(token),
              body: JSON.stringify({ quantity }),
            },
          );
          const json = (await res.json()) as {
            success: boolean;
            data?: CartPayload;
            error?: { message?: string };
          };
          if (!res.ok || !json.success || !json.data) {
            throw new Error(json.error?.message ?? "Could not update cart");
          }
          set({ cart: json.data, error: null });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Cart error";
          set({ error: message });
          throw error;
        } finally {
          set({ isBusy: false });
        }
      },

      removeLine: async (productId) => {
        set({ isBusy: true, error: null });
        try {
          const token = await get().ensureToken();
          const res = await fetch(
            `${API_ROUTES.CART_PROXY}/${encodeURIComponent(productId)}`,
            {
              method: "DELETE",
              headers: { "x-cart-token": token },
            },
          );
          const json = (await res.json()) as {
            success: boolean;
            data?: CartPayload;
            error?: { message?: string };
          };
          if (!res.ok || !json.success || !json.data) {
            throw new Error(json.error?.message ?? "Could not remove item");
          }
          set({ cart: json.data, error: null });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Cart error";
          set({ error: message });
          throw error;
        } finally {
          set({ isBusy: false });
        }
      },
    }),
    {
      name: PERSIST_NAME,
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ token: state.token }),
      skipHydration: true,
    },
  ),
);

export const rehydrateCartStore = async (): Promise<void> => {
  await useCartStore.persist.rehydrate();
  const { token } = useCartStore.getState();
  if (token) {
    await useCartStore.getState().refreshCart();
  }
};

export const getLineQuantity = (
  cart: CartPayload | null,
  productId: string,
): number => {
  const line = cart?.items.find((i) => i.productId === productId);
  return line?.quantity ?? 0;
};

export const selectCartTotalItems = (state: CartStore): number =>
  state.cart?.totalItems ?? 0;
