import {
	AlertTitle,
	Box,
	Button,
	Container,
	Grid,
	LinearProgress,
	Paper,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStats } from "../../../shared/hooks/useStats";
import { useStore } from "../../../shared/store/useStore";
import {
	StyledNotification,
	StyledStatCard,
} from "../styles/DashboardPage.styles";

export const DashboardPage = () => {
	const { tasks, projects } = useStore();
	const { total, completed, percentComplete } = useStats(tasks);
	const navigate = useNavigate();

	const pendingCount = tasks.filter((t) => t.status !== "done").length;

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			{pendingCount > 0 && (
				<StyledNotification
					severity="info"
					action={
						<Button
							color="primary"
							size="small"
							onClick={() => navigate("/tasks")}
							sx={{ fontWeight: "bold" }}
						>
							VIEW TASKS
						</Button>
					}
				>
					<AlertTitle sx={{ fontWeight: "bold", m: 0 }}>
						You have {pendingCount} tasks pending
					</AlertTitle>
				</StyledNotification>
			)}

			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				sx={{ fontWeight: "bold", mb: 4 }}
			>
				Team Task Hub Dashboard
			</Typography>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid size={{ xs: 12, sm: 4 }}>
					<StatCard
						title="Total Projects"
						value={projects.length}
						color="#1976d2"
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 4 }}>
					<StatCard title="Total Tasks" value={total} color="#9c27b0" />
				</Grid>
				<Grid size={{ xs: 12, sm: 4 }}>
					<StatCard title="Completed" value={completed} color="#2e7d32" />
				</Grid>
			</Grid>

			<Paper
				elevation={0}
				sx={{
					p: 3,
					borderRadius: 3,
					boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
					border: "none",
				}}
			>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Overall Progress
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Box sx={{ width: "100%" }}>
						<LinearProgress
							variant="determinate"
							value={percentComplete}
							sx={{
								height: 12,
								borderRadius: 5,
								backgroundColor: "#f0f0f0",
								"& .MuiLinearProgress-bar": { backgroundColor: "#2e7d32" },
							}}
						/>
					</Box>
					<Typography variant="body1" sx={{ fontWeight: "bold", minWidth: 45 }}>
						{percentComplete}%
					</Typography>
				</Box>
			</Paper>
		</Container>
	);
};

const StatCard = ({
	title,
	value,
	color,
}: {
	title: string;
	value: number;
	color: string;
}) => (
	<StyledStatCard elevation={0}>
		<Typography variant="h3" sx={{ color: color, fontWeight: "bold" }}>
			{value}
		</Typography>
		<Typography
			variant="subtitle1"
			color="text.secondary"
			sx={{
				textTransform: "uppercase",
				fontSize: "0.75rem",
				fontWeight: 600,
				mt: 1,
			}}
		>
			{title}
		</Typography>
	</StyledStatCard>
);
