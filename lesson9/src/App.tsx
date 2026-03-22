import { Layout } from "@/components/Layout";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RecipePage } from "./features/recipes/pages/RecipePage";
import { IndexPage } from "./pages/IndexPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<IndexPage />} />
				<Route path="recipes" element={<RecipePage />} />
			</Route>
		</Routes>
	);
}

export default App;
