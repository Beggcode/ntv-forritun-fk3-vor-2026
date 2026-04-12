import { Box, styled, Stack } from "@mui/material";
import type { Theme, BoxProps } from "@mui/material";
import type { ElementType } from "react";

export const ActionHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: theme.spacing(4),
}));

export const FilterContainer = styled(Stack)(({ theme }: { theme: Theme }) => ({
	marginBottom: theme.spacing(4),
}));

interface ModalFormWrapperProps extends BoxProps {
	component?: ElementType;
}

export const ModalFormWrapper = styled(Box)<ModalFormWrapperProps>(
	({ theme }) => ({
		marginTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	}),
);
