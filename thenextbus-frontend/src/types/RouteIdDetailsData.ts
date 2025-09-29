export type RouteIdDetailsData = {
    [routeId: string]: {
        route_short_name: string;
        route_desc: string;
    }[];
};

export type StopIdDetailsData = {
    [stopId: string]: {
        stop_name: string;
        stop_lat: string;
        stop_lon: string;
    }[];
};

export type TripIdHeadboardsData = {
    [tripId: string]: {
        ths: string;
    }[];
};
