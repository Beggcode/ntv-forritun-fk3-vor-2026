import * as z from "zod";

export const RecipeSchema = z.object({
	id: z.number(),
	title: z.string(),
	image: z.string(),
	readyInMinutes: z.number(),
	servings: z.number(),
	vegan: z.boolean(),
	vegetarian: z.boolean(),
	glutenFree: z.boolean(),
	healthScore: z.number(),
	extendedIngredients: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			amount: z.number(),
			unit: z.string(),
		}),
	),
	instructions: z.string().nullable().optional(),
});

export const RecipeResponseSchema = z.object({
	recipes: z.array(RecipeSchema),
});

export type Recipe = Omit<
	z.infer<typeof RecipeSchema>,
	"extendedIngredients"
> & {
	ingredients: { id: number; name: string; amount: number; unit: string }[];
};
