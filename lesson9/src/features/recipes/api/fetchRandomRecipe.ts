import { RecipeResponseSchema } from "../schemas";
import type { Recipe } from "../types";
import { mapRawRecipeToRecipe } from "./mappers";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const fetchRandomRecipe = async (): Promise<Recipe> => {
	const response = await fetch(
		`https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`,
	);

	if (!response.ok) throw new Error("Network error");

	const data = await response.json();
	const parsed = RecipeResponseSchema.parse(data);

	return mapRawRecipeToRecipe(parsed.recipes[0]);
};
