import { Box, styled } from "@mui/material";

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
