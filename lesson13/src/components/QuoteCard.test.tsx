import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { QuoteCard } from "./QuoteCard";
import { fetchRandomQuote } from "../lib/quotes";

vi.mock("../lib/quotes", () => ({
	fetchRandomQuote: vi.fn(),
}));

describe("QuoteCard", () => {
	it("sýnir villuskilaboð ef API klikkar", async () => {
		const user = userEvent.setup();

		vi.mocked(fetchRandomQuote).mockRejectedValue(new Error("API error"));

		render(<QuoteCard />);

		const button = screen.getByRole("button", { name: /sækja quote/i });
		await user.click(button);

		const errorMsg = await screen.findByRole("alert");
		expect(errorMsg).toHaveTextContent("Ekki tókst að sækja quote.");
	});
});
