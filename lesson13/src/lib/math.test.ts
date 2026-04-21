import { describe, it, expect } from "vitest";
import { add } from "./math";

describe("add", () => {
	it("Leggur saman tvær tölur", () => {
		const result = add(1, 1);
		expect(result).toBe(2);
	});
});
