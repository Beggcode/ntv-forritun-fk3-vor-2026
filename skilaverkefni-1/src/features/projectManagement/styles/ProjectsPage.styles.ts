import { Box, styled } from "@mui/material";

export const ProjectsHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	marginBottom: theme.spacing(4),
}));

export const ProjectsGrid = styled(Box)(({ theme }) => ({
	display: "grid",
	gap: theme.spacing(3),
	gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
}));
