import { Box, Card, Chip, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
	borderRadius: theme.spacing(1.5),
	boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
	transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	border: "1px solid",
	borderColor: theme.palette.divider,
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: theme.shadows[4],
	},
}));

export const TaskContent = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	flexGrow: 1,
	padding: theme.spacing(3),
}));

export const ProjectBadge = styled(Chip)(({ theme }) => ({
	fontSize: "0.7rem",
	fontWeight: 600,
	borderRadius: theme.spacing(0.5),
	height: 24,
	"& .MuiChip-icon": {
		fontSize: "1rem !important",
	},
}));

export const PriorityTag = styled(Box, {
	shouldForwardProp: (prop) => prop !== "priority",
})<{ priority: string }>(({ theme, priority }) => {
	const colors: Record<string, { bg: string; text: string }> = {
		high: { bg: "#d32f2f", text: "#fff" },
		medium: { bg: "#ed6c02", text: "#fff" },
		low: { bg: "#2e7d32", text: "#fff" },
	};
	const style = colors[priority.toLowerCase()] || {
		bg: "#757575",
		text: "#fff",
	};

	return {
		fontSize: "0.65rem",
		fontWeight: 900,
		letterSpacing: "0.05rem",
		padding: theme.spacing(0.5, 1),
		borderRadius: theme.spacing(0.5),
		display: "inline-block",
		backgroundColor: style.bg,
		color: style.text,
		textTransform: "uppercase",
		lineHeight: 1,
	};
});

export const TaskFooter = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	paddingTop: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	borderTop: "1px solid",
	borderColor: theme.palette.grey[100],
}));
