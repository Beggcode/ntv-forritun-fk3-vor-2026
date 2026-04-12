import { Alert, Paper, styled } from "@mui/material";

export const StyledStatCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	textAlign: "center",
	border: "none",
	borderRadius: theme.spacing(3),
	transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
	backgroundColor: theme.palette.background.paper,
	boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: theme.shadows[4],
	},
}));

export const StyledNotification = styled(Alert)(({ theme }) => ({
	marginBottom: theme.spacing(4),
	borderRadius: theme.spacing(2),
	border: "none",
	backgroundColor: "#e3f2fd",
	color: "#01579b",
	display: "flex",
	alignItems: "center",
	"& .MuiAlert-icon": {
		color: "#0288d1",
	},
}));
