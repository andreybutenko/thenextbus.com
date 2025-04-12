import { useState } from 'react';
import { DataResult } from '../types/DataResult';
import { ApiWeatherData, WeatherData } from '../types/WeatherData';
import { transformWeatherDetails } from '../utils/weatherTransform';
import { MINUTE_MS, useInterval } from './useInterval';

type UseWeatherDataResult = DataResult<WeatherData, unknown>;

export function useWeatherData(endpoint: string): UseWeatherDataResult {
    const [dataResult, setDataResult] = useState<UseWeatherDataResult>({
        state: 'loading',
    });

    async function loadData() {
        if (dataResult.state === 'success') {
            setDataResult({ state: 'refetching', data: dataResult.data });
        } else {
            setDataResult({ state: 'loading' });
        }

        const newDataResult = await getWeatherData(endpoint);
        setDataResult(newDataResult);
    }

    useInterval(loadData, MINUTE_MS);

    return dataResult;
}

async function getWeatherData(endpoint: string): Promise<UseWeatherDataResult> {
    try {
        const response = await fetch(endpoint);
        const result = (await response.json()) as ApiWeatherData;
        console.log(result);

        return {
            state: 'success',
            data: {
                current: transformWeatherDetails(result.current),
                hourly: result.hourly.map((weatherDetails) =>
                    transformWeatherDetails(weatherDetails)
                ),
                daily: result.daily.map((weatherDetails) =>
                    transformWeatherDetails(weatherDetails)
                ),
            },
        };
    } catch (error) {
        console.error(error);

        return {
            state: 'error',
            error,
        };
    }
}
