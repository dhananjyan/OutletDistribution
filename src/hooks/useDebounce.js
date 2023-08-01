import { useRef, useState } from "react";

export const useDebounce = (initialValue, delay = 500) => {
    const [value, setValue] = useState(initialValue);
    const timeoutRef = useRef(null);

    const debounceValue = (newValue) => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setValue(newValue);
        }, delay);
    };

    return [value, debounceValue];
};