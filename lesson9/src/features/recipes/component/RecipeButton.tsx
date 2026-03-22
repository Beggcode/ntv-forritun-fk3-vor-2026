interface RecipeButtonProps {
	onClick: () => void;
	disabled?: boolean;
}

export const RecipeButton = ({ onClick, disabled }: RecipeButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
		>
			{disabled ? "Fetching..." : "Get New Recipe"}
		</button>
	);
};
