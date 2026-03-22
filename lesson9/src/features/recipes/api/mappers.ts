import type { Recipe, RawRecipe } from "../types";

export const mapRawRecipeToRecipe = (raw: RawRecipe): Recipe => {
	return {
		id: raw.id,
		title: raw.title,
		image: raw.image,
		readyInMinutes: raw.readyInMinutes,
		servings: raw.servings,
		vegetarian: raw.vegetarian,
		vegan: raw.vegan,
		glutenFree: raw.glutenFree,
		healthScore: raw.healthScore,
		ingredients: raw.extendedIngredients.map((ing) => ({
			id: ing.id,
			name: ing.name,
			amount: ing.amount,
			unit: ing.unit,
		})),
		instructions: raw.instructions ?? undefined,
	};
};
