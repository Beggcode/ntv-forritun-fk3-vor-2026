import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "@/components/Layout";
import { CartPage } from "./features/cart/pages/CartPage";
import { ProductsPage } from "./features/products/pages/ProductsPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<ProductsPage />} />
				<Route path="cart" element={<CartPage />} />
			</Route>
		</Routes>
	);
}

export default App;
