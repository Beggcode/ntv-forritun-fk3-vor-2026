import { Box, Card, Chip, Typography, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
	fontWeight: "bold",
	borderRadius: theme.spacing(0.8),
	height: 24,
	cursor: "default",
	"& .MuiChip-icon": {
		fontSize: 14,
	},
}));

export const PriorityTag = styled(Typography, {
	shouldForwardProp: (prop) => prop !== "priority",
})<{ priority: string }>(({ theme, priority }) => ({
	fontSize: "0.65rem",
	fontWeight: 800,
	letterSpacing: "0.05rem",
	padding: theme.spacing(0.4, 1),
	borderRadius: theme.spacing(0.6),
	display: "inline-block",
	backgroundColor:
		priority === "high"
			? theme.palette.error.light
			: theme.palette.action.hover,
	color:
		priority === "high"
			? theme.palette.error.main
			: theme.palette.text.secondary,
	textTransform: "uppercase",
}));
