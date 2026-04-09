import { useState } from "react";
import { z } from "zod";

export function useLocalStorage<T>(
	key: string,
	schema: z.ZodSchema<T>,
	initialValue: T,
) {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (!item) return initialValue;

			const parsed = JSON.parse(item);
			return schema.parse(parsed);
		} catch (error) {
			console.error(`Error parsing localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue] as const;
}
