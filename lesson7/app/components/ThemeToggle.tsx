import { useGlobalProvider } from "../context/useGlobalProvider";

export function ThemeToggle() {
	const { state, dispatch } = useGlobalProvider();
	const isDark = state.theme === "dark";

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={() => dispatch({ type: "TOGGLE_THEME" })}
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
		>
			{isDark ? "☀️ Light" : "🌙 Dark"}
		</button>
	);
}
