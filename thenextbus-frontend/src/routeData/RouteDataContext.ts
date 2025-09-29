import { createContext } from 'react';
import { DataResult } from '../types/DataResult';
import {
    RouteIdDetailsData,
    StopIdDetailsData,
    TripIdHeadboardsData,
} from '../types/RouteIdDetailsData';

export type RouteData = {
    routeIdDetails: DataResult<RouteIdDetailsData>;
    stopIdDetails: DataResult<StopIdDetailsData>;
    tripIdHeadboards: DataResult<TripIdHeadboardsData>;
};

export const RouteDataContext = createContext<RouteData>({
    routeIdDetails: { state: 'loading' },
    stopIdDetails: { state: 'loading' },
    tripIdHeadboards: { state: 'loading' },
});
