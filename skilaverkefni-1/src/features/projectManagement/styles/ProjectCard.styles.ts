import {
	Box,
	styled,
	Card,
	CardContent,
	Typography,
	Button,
} from "@mui/material";
import type { Theme } from "@mui/material";

export const StyledProjectCard = styled(Card)(
	({ theme }: { theme: Theme }) => ({
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
	}),
);

export const ProjectContent = styled(CardContent)(
	({ theme }: { theme: Theme }) => ({
		padding: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
	}),
);

export const ProjectHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "flex",
	alignItems: "center",
	marginBottom: theme.spacing(2),
	gap: theme.spacing(1),
}));

export const TaskCountLabel = styled(Typography)(
	({ theme }: { theme: Theme }) => ({
		fontWeight: "bold",
		color: theme.palette.primary.main,
		marginTop: "auto",
		fontSize: "0.75rem",
		textTransform: "uppercase",
	}),
);

export const ProjectFooter = styled(Box)(({ theme }: { theme: Theme }) => ({
	padding: theme.spacing(2),
	backgroundColor: theme.palette.action.hover,
	display: "flex",
	gap: theme.spacing(1),
	marginTop: "auto",
}));

export const ViewButton = styled(Button)(({ theme }: { theme: Theme }) => ({
	borderRadius: theme.spacing(1),
	textTransform: "none",
	flexGrow: 1,
}));
