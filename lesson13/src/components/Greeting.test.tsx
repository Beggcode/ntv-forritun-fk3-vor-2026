import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { Greeting } from "./Greeting";

describe("Greeting", () => {
	it("sýnir kveðju þegar nafn er slegið inn og sent", async () => {
		const user = userEvent.setup();
		render(<Greeting />);

		const input = screen.getByLabelText("Nafn");
		await user.type(input, "test");

		const button = screen.getByRole("button", { name: /senda/i });
		await user.click(button);

		expect(screen.getByText("Halló, test!")).toBeInTheDocument();
	});
});
