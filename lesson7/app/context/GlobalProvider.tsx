import React, { useEffect, useReducer } from "react";
import { GlobalContext } from "./GlobalContext";
import { globalReducer, initialState } from "./GlobalReducer";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", state.theme);
		localStorage.setItem("theme", state.theme);
	}, [state.theme]);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
}
