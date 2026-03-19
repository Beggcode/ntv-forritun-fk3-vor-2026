import type { CartItem } from "@/features/cart/types";
import { DEFAULT_PRODUCTS } from "@/features/products/constants";
import type { Product } from "@/features/products/types";
import { useStore } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

const products: Product[] = DEFAULT_PRODUCTS;

export interface AppStore {
	items: CartItem[];
	addToCart: (productId: string, quantity: number) => void;
	removeFromCart: (productId: string) => void;
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	count: number;
	increment: () => void;
	decrement: () => void;
	notification: string | null;
	showNotification: (msg: string) => void;
	clearCart: () => void;
}

const appStore = createStore<AppStore>()(
	devtools(
		subscribeWithSelector(
			persist(
				(set, get) => ({
					items: [],
					count: 0,
					theme: "light",
					notification: null,

					increment: () => set((state) => ({ count: state.count + 1 })),
					decrement: () => set((state) => ({ count: state.count - 1 })),
					setTheme: (theme) => set({ theme }),

					showNotification: (msg) => {
						set({ notification: msg });
						setTimeout(() => set({ notification: null }), 3000);
					},

					addToCart: (productId, quantity = 1) => {
						const state = get();
						const product = products.find((p) => p.id === productId);

						if (!product) return;

						state.showNotification(`${product.name} bætt í körfu!`);

						const existing = state.items.find(
							(i) => i.product.id === productId,
						);

						if (existing) {
							set({
								items: state.items.map((i) =>
									i.product.id === productId
										? { ...i, quantity: i.quantity + quantity }
										: i,
								),
							});
						} else {
							set({
								items: [...state.items, { product, quantity }],
							});
						}
					},

					removeFromCart: (productId) =>
						set((state) => ({
							items: state.items.filter((i) => i.product.id !== productId),
						})),

					clearCart: () => {
						if (window.confirm("Viltu örugglega tæma körfuna?")) {
							set({ items: [] });
						}
					},
				}),
				{
					name: "shop-storage",
				},
			),
		),
		{ name: "appStore", store: "appStore" },
	),
);

export function useAppStore(): AppStore;
export function useAppStore<T>(selector: (state: AppStore) => T): T;
export function useAppStore<T>(selector?: (state: AppStore) => T) {
	return useStore(appStore, (selector ?? ((s) => s)) as (state: AppStore) => T);
}

export { appStore };
