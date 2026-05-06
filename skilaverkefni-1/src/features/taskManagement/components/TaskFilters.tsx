import { TextField, MenuItem } from "@mui/material";
import { FilterContainer } from "../styles/TasksPage.styles";

interface TaskFiltersProps {
	search: string;
	onSearchChange: (value: string) => void;
	statusFilter: string;
	onStatusChange: (value: string) => void;
	priorityFilter: string;
	onPriorityChange: (value: string) => void;
}

export const TaskFilters = ({
	search,
	onSearchChange,
	statusFilter,
	onStatusChange,
	priorityFilter,
	onPriorityChange,
}: TaskFiltersProps) => {
	return (
		<FilterContainer direction={{ xs: "column", sm: "row" }} spacing={2}>
			<TextField
				label="Search tasks"
				size="small"
				fullWidth
				value={search}
				onChange={(e) => onSearchChange(e.target.value)}
			/>
			<TextField
				select
				label="Status"
				size="small"
				sx={{ minWidth: 150 }}
				value={statusFilter}
				onChange={(e) => onStatusChange(e.target.value)}
			>
				<MenuItem value="all">All Statuses</MenuItem>
				<MenuItem value="todo">Todo</MenuItem>
				<MenuItem value="in-progress">In Progress</MenuItem>
				<MenuItem value="done">Done</MenuItem>
			</TextField>
			<TextField
				select
				label="Priority"
				size="small"
				sx={{ minWidth: 150 }}
				value={priorityFilter}
				onChange={(e) => onPriorityChange(e.target.value)}
			>
				<MenuItem value="all">All Priorities</MenuItem>
				<MenuItem value="low">Low</MenuItem>
				<MenuItem value="medium">Medium</MenuItem>
				<MenuItem value="high">High</MenuItem>
			</TextField>
		</FilterContainer>
	);
};
