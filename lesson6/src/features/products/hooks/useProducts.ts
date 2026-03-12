import { fetchProducts } from "@/features/products/api/productService.js";
import type { Product } from "@/features/products/types/product.js";
import { useEffect, useState } from "react";

export function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProducts().then((data) => {
			setProducts(data);
			setLoading(false);
		});
	}, []);

	return { products, loading };
}
