import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProjectsPage } from "./features/projectManagement/pages/ProjectsPage";
import { TasksPage } from "./features/taskManagement/pages/TasksPage";

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
					<Link
						to="/"
						style={{
							fontWeight: "bold",
							textDecoration: "none",
							color: "#333",
						}}
					>
						Dashboard
					</Link>
					<Link
						to="/projects"
						style={{
							fontWeight: "bold",
							textDecoration: "none",
							color: "#333",
						}}
					>
						Projects
					</Link>
					<Link
						to="/tasks"
						style={{
							fontWeight: "bold",
							textDecoration: "none",
							color: "#333",
						}}
					>
						All Tasks
					</Link>
				</nav>

				<main>
					<Routes>
						<Route
							path="/"
							element={<div>Dashboard Placeholder (Step 8)</div>}
						/>
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/tasks" element={<TasksPage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
