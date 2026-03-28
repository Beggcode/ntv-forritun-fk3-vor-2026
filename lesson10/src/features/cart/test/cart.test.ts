import { test, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAppStore, appStore } from "@/shared/store/appStore";

const MOCK_ID = "1";

beforeEach(() => {
	act(() => {
		appStore.setState({ items: [] });
	});
});

test("Add Product to set quantity 1", () => {
	const { result } = renderHook(() => useAppStore());
	act(() => {
		result.current.addToCart(MOCK_ID, 1);
	});
	expect(result.current.items[0].quantity).toBe(1);
});

test("Remove item -> cart is empty", () => {
	const { result } = renderHook(() => useAppStore());

	act(() => {
		result.current.addToCart(MOCK_ID, 1);
		result.current.removeFromCart(MOCK_ID);
	});

	expect(result.current.items.length).toBe(0);
});

test("Cart total calculates correctly", () => {
	const { result } = renderHook(() => useAppStore());

	act(() => {
		result.current.addToCart("1", 1);
		result.current.addToCart("2", 2);
	});

	const total = result.current.items.reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0,
	);

	expect(total).toBeGreaterThan(0);
});
