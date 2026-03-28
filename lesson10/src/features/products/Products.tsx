import { ProductList } from "./components/ProductList";
import type { Product } from "./types";
import { DEFAULT_PRODUCTS } from "./constants"; // Sækjum gögnin héðan

type ProductsProps = {
	products?: Product[];
	onAddToCart?: (product: Product) => void;
};

export function Products({
	products = DEFAULT_PRODUCTS,
	onAddToCart,
}: ProductsProps) {
	return (
		<section className="space-y-4">
			<h2 className="text-lg font-semibold">Products</h2>
			<ProductList products={products} onAddToCart={onAddToCart} />
		</section>
	);
}
