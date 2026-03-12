import { useGlobalProvider } from "../context/useGlobalProvider";

export function Counter() {
	const { state, dispatch } = useGlobalProvider();

	return (
		<div className="card">
			<h2>Counter: {state.count}</h2>
			<div>
				<button onClick={() => dispatch({ type: "INCREMENT_COUNTER" })}>
					{" "}
					+{" "}
				</button>
				<button onClick={() => dispatch({ type: "DECREMENT_COUNTER" })}>
					{" "}
					-{" "}
				</button>
				<button onClick={() => dispatch({ type: "RESET_COUNTER" })}>
					{" "}
					Reset{" "}
				</button>
			</div>
		</div>
	);
}
