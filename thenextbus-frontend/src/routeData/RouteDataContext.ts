import { createContext } from 'react';
import { DataResult } from '../types/DataResult';
import { RouteIdDetailsData, TripIdHeadboardsData } from '../types/RouteIdDetailsData';

export type RouteData = {
    routeIdDetails: DataResult<RouteIdDetailsData>;
    tripIdHeadboards: DataResult<TripIdHeadboardsData>;
};

export const RouteDataContext = createContext<RouteData>({
    routeIdDetails: { state: 'loading' },
    tripIdHeadboards: { state: 'loading' },
});
