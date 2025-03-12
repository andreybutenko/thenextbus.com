import { createContext } from 'react';
import { DataResult } from '../types/DataResult';
import { RouteIdDetailsData } from '../types/RouteIdDetailsData';

export type RouteData = {
    routeIdDetails: DataResult<RouteIdDetailsData>;
};

export const RouteDataContext = createContext<RouteData>({ routeIdDetails: { state: 'loading' } });
