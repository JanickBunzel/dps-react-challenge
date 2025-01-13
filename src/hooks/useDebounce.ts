import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Update state only after delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleanup on unmount
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
