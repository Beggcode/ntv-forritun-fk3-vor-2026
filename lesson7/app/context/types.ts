export type Theme = "light" | "dark";

export type GlobalState = {
	theme: Theme;
	count: number;
};

export type Action =
	| { type: "TOGGLE_THEME" }
	| { type: "INCREMENT_COUNTER" }
	| { type: "DECREMENT_COUNTER" }
	| { type: "RESET_COUNTER" };
