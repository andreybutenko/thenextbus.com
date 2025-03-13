export type RouteIdDetailsData = {
    [routeId: string]: {
        route_short_name: string;
        route_desc: string;
    }[];
};

export type TripIdHeadboardsData = {
    [tripId: string]: {
        ths: string;
    }[];
};
