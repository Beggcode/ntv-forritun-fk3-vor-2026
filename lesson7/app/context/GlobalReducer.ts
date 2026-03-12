import { GlobalState, Action } from "./types";

export const initialState: GlobalState = {
	theme: "light",
	count: 0,
};

export function globalReducer(state: GlobalState, action: Action): GlobalState {
	switch (action.type) {
		case "TOGGLE_THEME":
			return { ...state, theme: state.theme === "light" ? "dark" : "light" };
		case "INCREMENT_COUNTER":
			return { ...state, count: state.count + 1 };
		case "DECREMENT_COUNTER":
			return { ...state, count: state.count - 1 };
		case "RESET_COUNTER":
			return { ...state, count: 0 };
		default:
			return state;
	}
}
