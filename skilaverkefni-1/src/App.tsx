import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProjectsPage } from "./features/projectManagement/pages/ProjectsPage";
import { TasksPage } from "./features/taskManagement/pages/TasksPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";

function App() {
	return (
		<Router>
			<div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
				<nav
					style={{
						display: "flex",
						gap: "20px",
						marginBottom: "30px",
						borderBottom: "1px solid #eee",
						paddingBottom: "10px",
					}}
				>
					<Link to="/" style={navLinkStyle}>
						Dashboard
					</Link>
					<Link to="/projects" style={navLinkStyle}>
						Projects
					</Link>
					<Link to="/tasks" style={navLinkStyle}>
						All Tasks
					</Link>
				</nav>

				<main>
					<Routes>
						<Route path="/" element={<DashboardPage />} />{" "}
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/tasks" element={<TasksPage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

const navLinkStyle = {
	fontWeight: "bold",
	textDecoration: "none",
	color: "#333",
};

export default App;
