import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Counter } from "./Counter";

describe("Counter", () => {
	it("Hækkar counter", async () => {
		const user = userEvent.setup();
		render(<Counter />);

		await user.click(screen.getByRole("button", { name: "Hækka" }));

		expect(screen.getByText("1")).toBeInTheDocument();
	});
});
