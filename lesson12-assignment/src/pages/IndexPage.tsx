import { useState } from "react";
// TODO: Add three test buttons so you can verify every part of your error
// handling is wired up correctly. Each button targets a different handler:
//
// 1. "Crash on next render" → flips a useState flag that causes a child
//    component to `throw new Error(...)` during render.
//    => should be caught by <ErrorBoundary>
//
// 2. "Unhandled promise rejection" → onClick creates a `Promise.reject(...)`
//    with no .catch().
//    => should be caught by the window 'unhandledrejection' listener
//
// 3. "Throw from setTimeout" → onClick schedules a setTimeout callback
//    that throws.
//    => should be caught by the window 'error' listener
//
// After clicking each one, check the console — every error should be
// prefixed with [error] (your logger), proving it flowed through logger.error.

function CrashSimulation(): null {
	throw new Error("Crash test");
}

export function IndexPage() {
	const [isTriggeringCrash, setIsTriggeringCrash] = useState<boolean>(false);

	const handleAsyncError = () => {
		Promise.reject(new Error("Promise rejection test"));
	};

	const handleTimeoutError = () => {
		setTimeout(() => {
			throw new Error("Timeout test");
		}, 200);
	};

	return (
		<main className="min-h-screen bg-background p-8 flex flex-col items-center text-center">
			<h1 className="text-4xl font-bold">Verkefni 12</h1>
			<p className="mt-2 text-gray-600 mb-6">
				Click the buttons below to test error handlers.
			</p>

			<div className="flex flex-col gap-4 max-w-sm">
				{/* Triggers Render Crash - ErrorBoundary.tsx */}
				<button
					onClick={() => setIsTriggeringCrash(true)}
					className="rounded bg-red-500 px-4 py-4 font-bold text-white hover:bg-red-600"
				>
					Crash on next render
				</button>

				{/* Triggers Promise Rejection - main.tsx */}
				<button
					onClick={handleAsyncError}
					className="rounded bg-pink-500 px-4 py-4 font-bold text-white hover:bg-pink-600"
				>
					Async promise failed
				</button>

				{/* Trigger Timeout Error - main.tsx */}
				<button
					onClick={handleTimeoutError}
					className="rounded bg-indigo-500 px-4 py-4 font-bold text-black hover:bg-indigo-600"
				>
					Delayed timeout crash
				</button>
			</div>

			{isTriggeringCrash && <CrashSimulation />}
		</main>
	);
}
