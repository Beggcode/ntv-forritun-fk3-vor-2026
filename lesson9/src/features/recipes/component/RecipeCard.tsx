import type { Recipe } from "../types";

interface RecipeCardProps {
	recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	return (
		<div className="border p-4 max-w-md">
			<img
				src={recipe.image}
				alt={recipe.title}
				fetchPriority="high"
				width={556}
				height={370}
				className="w-full h-48 object-cover"
			/>

			<h2 className="font-bold text-lg mt-2">{recipe.title}</h2>

			<div className="flex gap-4 text-sm my-2 text-gray-600">
				<span> Time: {recipe.readyInMinutes} mins</span>
				<span> Serves {recipe.servings}</span>
			</div>

			<div className="flex gap-2">
				{recipe.vegan && (
					<span className="bg-green-100 px-2 text-xs">Vegan</span>
				)}
				{recipe.glutenFree && (
					<span className="bg-yellow-100 px-2 text-xs">Gluten Free</span>
				)}
			</div>

			{recipe.instructions && (
				<div className="mt-4 border-t pt-2">
					<p className="text-xs font-bold uppercase text-gray-600">
						Instructions
					</p>
					<div
						className="text-sm"
						dangerouslySetInnerHTML={{ __html: recipe.instructions }}
					/>
				</div>
			)}
		</div>
	);
};
