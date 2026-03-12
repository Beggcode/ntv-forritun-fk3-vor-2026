import { CartPage } from "@/features/cart/pages/CartPage.js";
import { ProductListPage } from "@/features/products/pages/ProductListPage.js";
import { UserFormPage } from "@/features/user-form";
import { useState } from "react";
import "./index.css";

type Tab = "products" | "cart" | "register";

export default function App() {
	const [tab, setTab] = useState<Tab>("products");

	return (
		<div className="app">
			<nav>
				<button
					className={tab === "products" ? "active" : ""}
					onClick={() => setTab("products")}
				>
					Products
				</button>
				<button
					className={tab === "cart" ? "active" : ""}
					onClick={() => setTab("cart")}
				>
					Cart
				</button>
				<button
					className={tab === "register" ? "active" : ""}
					onClick={() => setTab("register")}
				>
					Register
				</button>
			</nav>
			<main>
				{tab === "products" && <ProductListPage />}
				{tab === "cart" && <CartPage />}
				{tab === "register" && <UserFormPage />}
			</main>
		</div>
	);
}
