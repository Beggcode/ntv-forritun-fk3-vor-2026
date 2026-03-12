import { useCart } from "@/features/cart/hooks/useCart";
import { CartSummary } from "@/features/cart/ui/CartSummary";

export function CartPage() {
	const { items, removeFromCart } = useCart();

	return (
		<section>
			<h2>Your cart</h2>
			<CartSummary items={items} onRemove={removeFromCart} />
		</section>
	);
}
