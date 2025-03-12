import React, { useMemo } from 'react';
import { useStaticData } from '../hooks/useStaticData';
import { RouteIdDetailsData } from '../types/RouteIdDetailsData';
import { RouteData, RouteDataContext } from './RouteDataContext';

const ROUTE_ID_DETAILS = 'https://d145btbn40ezqn.cloudfront.net/route_id_details.json';

export type RouteDataLoadedContextProps = React.PropsWithChildren;

export function RouteDataLoadedContext(props: RouteDataLoadedContextProps): React.ReactElement {
    const routeIdDetails = useStaticData<RouteIdDetailsData>(ROUTE_ID_DETAILS);

    const routeDataContext = useMemo<RouteData>(() => ({ routeIdDetails }), [routeIdDetails]);

    return <RouteDataContext value={routeDataContext}>{props.children}</RouteDataContext>;
}
