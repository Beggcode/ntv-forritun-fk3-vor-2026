import { Box, styled, Stack } from "@mui/material";
import type { Theme, BoxProps } from "@mui/material";
import type { ElementType } from "react";

interface FormContainerProps extends BoxProps {
	component?: ElementType;
}

export const FormContainer = styled(Box)<FormContainerProps>(
	({ theme }: { theme: Theme }) => ({
		marginTop: theme.spacing(2),
	}),
);

export const FormActions = styled(Stack)(({ theme }: { theme: Theme }) => ({
	justifyContent: "flex-end",
	marginTop: theme.spacing(1),
}));
