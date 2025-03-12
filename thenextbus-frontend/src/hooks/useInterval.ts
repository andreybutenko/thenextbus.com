import { useEffect, useRef } from 'react';

export const SECOND_MS = 1000;
export const MINUTE_MS = 60 * SECOND_MS;
export const HOUR_MS = 60 * MINUTE_MS;
export const DAY_MS = 24 * HOUR_MS;

export function useInterval(tickFn: () => void, intervalMs: number) {
    const timeoutId = useRef<number | undefined>(undefined);

    useEffect(() => {
        tickFn();
        timeoutId.current = setInterval(tickFn, intervalMs);

        return () => {
            if (timeoutId.current !== undefined) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);
}
