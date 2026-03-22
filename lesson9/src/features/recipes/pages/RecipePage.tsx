import { useEffect, useState } from "react";
import { fetchRandomRecipe } from "../api";
import { RecipeCard } from "../component/RecipeCard";
import type { Recipe } from "../types";

export const RecipePage = () => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleFetch = async () => {
		setIsLoading(true);
		setIsError(false);
		try {
			const data = await fetchRandomRecipe();
			setRecipe(data);
		} catch (error) {
			console.error("Fetch failed:", error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleFetch();
	}, []);

	return (
		<div className="p-4 max-w-2xl mx-auto border-t mt-4">
			<h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>

			<button
				onClick={handleFetch}
				disabled={isLoading}
				className="bg-blue-600 text-white px-4 py-2 disabled:bg-gray-300 transition-colors"
			>
				{isLoading ? "Fetching..." : "Get New Recipe"}
			</button>

			<div className="mt-6">
				{isLoading && !recipe && <p>Loading initial recipe...</p>}

				{isError && (
					<p className="text-red-600 border border-red-600 p-2">Error</p>
				)}

				{recipe && <RecipeCard recipe={recipe} />}
			</div>
		</div>
	);
};
