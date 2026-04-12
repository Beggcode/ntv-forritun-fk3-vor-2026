import { Box, Button, styled } from "@mui/material";

export const FormContainer = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2, 0),
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(3),
}));

export const FormRow = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(2),
	alignItems: "center",
	[theme.breakpoints.down("sm")]: {
		flexDirection: "column",
		alignItems: "stretch",
	},
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
	height: 56,
	paddingLeft: theme.spacing(4),
	paddingRight: theme.spacing(4),
	borderRadius: theme.spacing(1),
	textTransform: "none",
	fontWeight: "bold",
	whiteSpace: "nowrap",
	boxShadow: "none",
	"&:hover": {
		boxShadow: theme.shadows[2],
	},
}));
