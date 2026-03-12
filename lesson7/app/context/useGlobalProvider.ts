import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export function useGlobalProvider() {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error("useGlobalProvider must be used within a GlobalProvider");
	}
	return context;
}
