import type { ReactNode } from "react";
// TODO: Make this component generic over the item type.
// When a consumer writes <SelectableList items={products} onSelect={(p) => ...} />,
// the `p` parameter in onSelect should be inferred as the Product type — not `any`.
// `renderItem` should also receive the correctly typed item.
// `selected` should be typed as T | null.
interface SelectableListProps<T> {
	items: T[];
	renderItem: (item: T) => ReactNode;
	onSelect: (item: T) => void;
	selected?: T | null;
	className?: string;
}

function SelectableList<T>({
	items,
	renderItem,
	onSelect,
	selected,
	className,
}: SelectableListProps<T>) {
	return (
		<ul className={`divide-y ${className || ""}`}>
			{items.map((item, index) => (
				<li
					key={index}
					onClick={() => onSelect(item)}
					className={`cursor-pointer p-2 hover:bg-gray-100 ${
						selected === item ? "bg-blue-50" : ""
					}`}
				>
					{renderItem(item)}
				</li>
			))}
		</ul>
	);
}

export { SelectableList };
