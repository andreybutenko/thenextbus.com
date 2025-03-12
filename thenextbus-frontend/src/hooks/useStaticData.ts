import { useEffect, useState } from 'react';
import { DataResult } from '../types/DataResult';

type UseStaticDataResult<TResult> = DataResult<TResult, unknown>;

export function useStaticData<TResult>(endpoint: string): UseStaticDataResult<TResult> {
    const [dataResult, setDataResult] = useState<UseStaticDataResult<TResult>>({
        state: 'loading',
    });

    async function loadData() {
        if (dataResult.state === 'success') {
            setDataResult({ state: 'refetching', data: dataResult.data });
        } else {
            setDataResult({ state: 'loading' });
        }

        const newDataResult = await getData<TResult>(endpoint);
        setDataResult(newDataResult);
    }

    useEffect(() => {
        loadData();
    }, []);

    return dataResult;
}

async function getData<TResult>(endpoint: string): Promise<UseStaticDataResult<TResult>> {
    try {
        const response = await fetch(endpoint);
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
