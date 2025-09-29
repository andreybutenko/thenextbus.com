import React, { useMemo } from 'react';
import { ROUTE_ID_DETAILS, TRIP_ID_HEADBOARDS } from '../constants/endpoints';
import { useStaticData } from '../hooks/useStaticData';
import { RouteIdDetailsData, TripIdHeadboardsData } from '../types/RouteIdDetailsData';
import { RouteData, RouteDataContext } from './RouteDataContext';

export type RouteDataLoadedContextProps = React.PropsWithChildren;

export function RouteDataLoadedContext(props: RouteDataLoadedContextProps): React.ReactElement {
    const routeIdDetails = useStaticData<RouteIdDetailsData>(ROUTE_ID_DETAILS);
    const tripIdHeadboards = useStaticData<TripIdHeadboardsData>(TRIP_ID_HEADBOARDS);

    const routeDataContext = useMemo<RouteData>(
        () => ({ routeIdDetails, tripIdHeadboards }),
        [routeIdDetails, tripIdHeadboards]
    );

    return <RouteDataContext value={routeDataContext}>{props.children}</RouteDataContext>;
}
