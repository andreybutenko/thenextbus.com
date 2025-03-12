import dayjs from 'dayjs';
import { FeedMessage } from 'gtfs-types';
import { useState } from 'react';
import { DataResult } from '../types/DataResult';
import { MINUTE_MS, useInterval } from './useInterval';

type UseRealTimeDataResult = DataResult<FeedMessage, unknown>;

export function useRealTimeData(endpoint: string): UseRealTimeDataResult {
    const [dataResult, setDataResult] = useState<UseRealTimeDataResult>({
        state: 'loading',
    });

    async function loadData() {
        if (dataResult.state === 'success') {
            setDataResult({ state: 'refetching', data: dataResult.data });
        } else {
            setDataResult({ state: 'loading' });
        }

        const cacheBreaker = dayjs().format('YYYY-MM-DD-HH:mm');
        const newDataResult = await getRealTimeData(endpoint, cacheBreaker);
        setDataResult(newDataResult);
    }

    useInterval(loadData, MINUTE_MS);

    return dataResult;
}

async function getRealTimeData(
    endpoint: string,
    cacheBreaker: string
): Promise<UseRealTimeDataResult> {
    try {
        const response = await fetch(`${endpoint}?v=${cacheBreaker}`);
        const result = await response.json();
        console.log(result);

        return {
            state: 'success',
            data: result,
        };
    } catch (error) {
        console.error(error);

        return {
            state: 'error',
            error,
        };
    }
}
