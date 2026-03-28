import { ProductList } from "@/features/products/components/ProductList";
import type { Product } from "@/features/products/types";
import { useAppStore } from "@/shared/store/appStore";

const products: Product[] = [
	{
		id: "1",
		name: "Dæmi vara",
		price: 1500,
		description: "Flott lýsing",
	},
];

export function ProductsPage() {
	const addToCart = useAppStore((state) => state.addToCart);
	const handleAddToCart = (product: Product) => {
		addToCart(product.id, 1);
	};

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Vörur</h1>
			<ProductList products={products} onAddToCart={handleAddToCart} />
		</div>
	);
}
