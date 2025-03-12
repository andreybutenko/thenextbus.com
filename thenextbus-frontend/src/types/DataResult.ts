export type SuccessDataResult<TData> = {
    state: 'success';
    data: TData;
    error?: never;
};

export type RefetchingDataResult<TData> = {
    state: 'refetching';
    data: TData;
    error?: never;
};

export type ErrorDataResult<TError> = {
    state: 'error';
    error: TError;
    data?: never;
};

export type LoadingDataResult = {
    state: 'loading';
    data?: never;
    error?: never;
};

export type DataResult<TData, TError> =
    | SuccessDataResult<TData>
    | RefetchingDataResult<TData>
    | ErrorDataResult<TError>
    | LoadingDataResult;
