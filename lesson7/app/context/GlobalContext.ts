import { createContext } from "react";
import { GlobalState, Action } from "./types";

export type GlobalContextType = {
	state: GlobalState;
	dispatch: React.Dispatch<Action>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
	undefined,
);
