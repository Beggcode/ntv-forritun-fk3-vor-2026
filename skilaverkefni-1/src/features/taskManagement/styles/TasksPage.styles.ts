import { Box, styled } from "@mui/material";

export const ActionHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: theme.spacing(4),
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	gap: theme.spacing(2),
	marginBottom: theme.spacing(4),
	alignItems: "center",
}));
