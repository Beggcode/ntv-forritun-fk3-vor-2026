import type { Product } from "../../products/types/product.js";

export type CartItem = {
	product: Product;
	quantity: number;
};
