import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

vi.stubGlobal("confirm", () => true);

afterEach(() => {
	cleanup();
});
