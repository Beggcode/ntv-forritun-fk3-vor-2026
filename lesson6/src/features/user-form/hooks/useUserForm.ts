import { useState, useCallback, useEffect } from "react";
import type { FormValuesType } from "../types";

export const useUserForm = (initialValues: FormValuesType) => {
	const [values, setValues] = useState<FormValuesType>(initialValues);
	const [isStarted, setIsStarted] = useState(false);

	const onInputChange = useCallback(
		(key: keyof FormValuesType, value: string) => {
			setValues((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const toggleStarted = useCallback(() => {
		setIsStarted(true);
	}, []);

	const goBack = useCallback(() => {
		setIsStarted(false);
	}, []);

	useEffect(() => {
		if (isStarted && values.email) {
			const handler = setTimeout(() => {
				localStorage.setItem(values.email, JSON.stringify(values));
				console.log("Autosaved to localStorage");
			}, 1000);
			return () => clearTimeout(handler);
		}
	}, [values, isStarted]);

	return {
		values,
		isStarted,
		onInputChange,
		toggleStarted,
		goBack,
		setValues,
	};
};
