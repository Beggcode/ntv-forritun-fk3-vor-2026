import type { ReactNode } from "react";
// TODO:

// DO NOT DO (unless you want an extra challenge): Make this component generic over the row data type.
// `columns` should be an array where each column's `accessor` is constrained to `keyof T`,
// `label` is a string, and the optional `format` function receives the cell value (typed as T[K]).
// `data` should be T[].
// `sortBy` should only accept `keyof T` — a typo in the sort field should be caught at compile time.
// `onSort` should receive a `keyof T` argument.

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// THIS IS AN EXTRA ASSIGNMENT DONT BOTHER IF YOU DONT CARE! ❤️
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

interface Column<T> {
	accessor: keyof T;
	label: string;
	format?: (value: T[keyof T]) => ReactNode;
}

interface SortableTableProps<T> {
	data: T[];
	columns: Column<T>[];
	sortBy?: keyof T;
	sortDirection?: "asc" | "desc";
	onSort?: (key: keyof T) => void;
	className?: string;
}

function SortableTable<T>({
	data,
	columns,
	sortBy,
	sortDirection,
	onSort,
	className,
}: SortableTableProps<T>) {
	return (
		<table className={`w-full border-collapse ${className || ""}`}>
			<thead>
				<tr>
					{columns.map((col) => (
						<th
							key={String(col.accessor)}
							onClick={() => onSort?.(col.accessor)}
							className="cursor-pointer border-b p-2 text-left font-semibold hover:bg-gray-50"
						>
							{col.label}
							{sortBy === col.accessor && (
								<span className="ml-1">
									{sortDirection === "asc" ? "▲" : "▼"}
								</span>
							)}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr key={index}>
						{columns.map((col) => (
							<td key={String(col.accessor)} className="border-b p-2">
								{col.format
									? col.format(row[col.accessor])
									: String(row[col.accessor] ?? "")}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export { SortableTable };
