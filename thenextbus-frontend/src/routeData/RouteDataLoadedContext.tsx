import React, { useMemo } from 'react';
import { useStaticData } from '../hooks/useStaticData';
import { RouteIdDetailsData, TripIdHeadboardsData } from '../types/RouteIdDetailsData';
import { RouteData, RouteDataContext } from './RouteDataContext';

const ROUTE_ID_DETAILS = 'https://d145btbn40ezqn.cloudfront.net/route_id_details.json';
const TRIP_ID_HEADBOARDS = 'https://d145btbn40ezqn.cloudfront.net/trip_id_headboards.json';

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
