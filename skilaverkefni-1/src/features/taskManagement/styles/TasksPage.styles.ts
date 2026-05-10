import { Box, styled, Stack } from "@mui/material";
import type { Theme } from "@mui/material";

export const ActionHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: theme.spacing(4),
}));

export const FilterContainer = styled(Stack)(({ theme }: { theme: Theme }) => ({
	marginBottom: theme.spacing(4),
}));
