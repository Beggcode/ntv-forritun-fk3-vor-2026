import { useStore } from "../../../shared/store/useStore";
import { useStats } from "../../../shared/hooks/useStats";

export const DashboardPage = () => {
	const { tasks, projects } = useStore();
	const { total, completed, percentComplete } = useStats(tasks);

	return (
		<div
			style={{
				padding: "20px",
				backgroundColor: "#f9f9f9",
				borderRadius: "12px",
			}}
		>
			<h2>Project Dashboard</h2>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "20px",
					marginBottom: "30px",
				}}
			>
				<div style={statBoxStyle}>
					<h3>{projects.length}</h3>
					<p>Total Projects</p>
				</div>
				<div style={statBoxStyle}>
					<h3>{total}</h3>
					<p>Total Tasks</p>
				</div>
				<div style={statBoxStyle}>
					<h3>{completed}</h3>
					<p>Completed</p>
				</div>
			</div>

			<div
				style={{
					background: "#fff",
					padding: "20px",
					borderRadius: "8px",
					border: "1px solid #ddd",
				}}
			>
				<h3>Overall Progress</h3>
				<div
					style={{
						background: "#eee",
						borderRadius: "10px",
						height: "20px",
						width: "100%",
						marginTop: "10px",
					}}
				>
					<div
						style={{
							background: "#28a745",
							height: "100%",
							borderRadius: "10px",
							width: `${percentComplete}%`,
							transition: "width 0.5s ease-in-out",
						}}
					/>
				</div>
				<p style={{ textAlign: "right", fontWeight: "bold" }}>
					{percentComplete}%
				</p>
			</div>
		</div>
	);
};

const statBoxStyle = {
	background: "#fff",
	padding: "15px",
	borderRadius: "8px",
	border: "1px solid #ddd",
	textAlign: "center" as const,
};
