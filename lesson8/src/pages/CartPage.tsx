import { Cart } from "@/features/cart/Cart";
import { useAppStore } from "@/shared/store/appStore";

export function CartPage() {
	const items = useAppStore((state) => state.items);
	const removeFromCart = useAppStore((state) => state.removeFromCart);
	const updateQuantity = useAppStore((state) => state.addToCart);

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Karfan þín</h1>
			<Cart
				items={items}
				onQuantityChange={(id, qty) => updateQuantity(id, qty)}
				onRemove={removeFromCart}
			/>
		</div>
	);
}
