import { Box, styled } from "@mui/material";
import type { Theme, BoxProps } from "@mui/material";
import type { ElementType } from "react";

export const ProjectsHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: theme.spacing(4),
}));

export const ProjectsGrid = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "grid",
	gap: theme.spacing(3),
	gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
}));
interface ProjectFormWrapperProps extends BoxProps {
	component?: ElementType;
}

export const ProjectFormWrapper = styled(Box)<ProjectFormWrapperProps>(
	({ theme }) => ({
		marginTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	}),
);
