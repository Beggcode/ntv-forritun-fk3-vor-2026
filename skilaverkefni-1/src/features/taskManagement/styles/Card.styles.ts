import { Card, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
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
