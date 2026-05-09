import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { z } from "zod";
import { useLocalStorage } from "./useLocalStorage";

const StringSchema = z.string();
const NumberSchema = z.number();
const ObjectSchema = z.object({ name: z.string(), count: z.number() });

beforeEach(() => {
  localStorage.clear();
});

describe("useLocalStorage", () => {
  it("returns the initial value when storage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", StringSchema, "default"));
    expect(result.current[0]).toBe("default");
  });

  it("stores and retrieves a string", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", StringSchema, ""));
    act(() => result.current[1]("hello"));
    expect(result.current[0]).toBe("hello");
    expect(localStorage.getItem("test-key")).toBe('"hello"');
  });

  it("stores and retrieves a number", () => {
    const { result } = renderHook(() => useLocalStorage("num-key", NumberSchema, 0));
    act(() => result.current[1](42));
    expect(result.current[0]).toBe(42);
  });

  it("stores and retrieves an object", () => {
    const { result } = renderHook(() =>
      useLocalStorage("obj-key", ObjectSchema, { name: "", count: 0 })
    );
    act(() => result.current[1]({ name: "Alice", count: 5 }));
    expect(result.current[0]).toEqual({ name: "Alice", count: 5 });
  });

  it("supports an updater function", () => {
    const { result } = renderHook(() => useLocalStorage("num-key", NumberSchema, 10));
    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(11);
  });

  it("reads an existing value from storage on mount", () => {
    localStorage.setItem("pre-key", JSON.stringify("pre-existing"));
    const { result } = renderHook(() => useLocalStorage("pre-key", StringSchema, "default"));
    expect(result.current[0]).toBe("pre-existing");
  });

  it("falls back to the initial value when stored data fails validation", () => {
    localStorage.setItem("bad-key", JSON.stringify(123));
    const { result } = renderHook(() => useLocalStorage("bad-key", StringSchema, "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("falls back to the initial value when stored data is invalid JSON", () => {
    localStorage.setItem("corrupt-key", "not json {{");
    const { result } = renderHook(() => useLocalStorage("corrupt-key", StringSchema, "safe"));
    expect(result.current[0]).toBe("safe");
  });
});
