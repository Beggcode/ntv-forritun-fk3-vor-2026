import type { CartItem } from "@/features/cart/types/cart.js";
import { Button } from "@/shared/components/ui/Button";
import { formatPrice } from "@/shared/utils/formatPrice";

type CartSummaryProps = {
	items: CartItem[];
	onRemove: (productId: string) => void;
};

export function CartSummary({ items, onRemove }: CartSummaryProps) {
	const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

	if (items.length === 0) {
		return <p className="empty">Cart is empty.</p>;
	}

	return (
		<div className="cart-summary">
			<h3>Cart</h3>
			<ul>
				{items.map(({ product, quantity }) => (
					<li key={product.id}>
						{product.name} × {quantity} —{" "}
						{formatPrice(product.price * quantity)}
						<Button onClick={() => onRemove(product.id)}>Remove</Button>
					</li>
				))}
			</ul>
			<p className="total">Total: {formatPrice(total)}</p>
		</div>
	);
}
