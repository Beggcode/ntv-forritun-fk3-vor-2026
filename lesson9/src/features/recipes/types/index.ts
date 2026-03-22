import { RecipeSchema } from "../schemas/recipeSchema";
import * as z from "zod";

export type RawRecipe = z.infer<typeof RecipeSchema>;

export type Recipe = Omit<RawRecipe, "extendedIngredients"> & {
	ingredients: {
		id: number;
		name: string;
		amount: number;
		unit: string;
	}[];
};
