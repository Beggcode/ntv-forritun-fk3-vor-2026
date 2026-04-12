import { Box, styled, Card } from "@mui/material";

export const StyledProjectCard = styled(Card)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
	transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: theme.shadows[4],
	},
}));

export const ProjectHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	marginBottom: theme.spacing(2),
	gap: theme.spacing(1),
}));

export const ProjectFooter = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.action.hover,
	borderTop: `1px solid ${theme.palette.divider}`,
	marginTop: "auto",
}));
