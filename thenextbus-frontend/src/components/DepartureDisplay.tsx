import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { SECOND_MS, useInterval } from '../hooks/useInterval';
import { useRouteData } from '../routeData/useRouteData';

export type DepartureDisplayProps = { routeId: string; departureTime: number };

type TimeDetails = {
    time: string;
    relativeTime: string;
};

export function DepartureDisplay(props: DepartureDisplayProps): React.ReactElement {
    const { routeIdDetails } = useRouteData();
    const [timeDetails, setTimeDetails] = useState<TimeDetails>({ time: '', relativeTime: '' });

    function computeTimeDetails() {
        const date = dayjs.unix(props.departureTime);

        setTimeDetails({
            time: date.format('hh:mma'),
            relativeTime: date.fromNow(),
        });
    }

    useInterval(computeTimeDetails, 5 * SECOND_MS);

    const routeDetails = routeIdDetails.data?.[props.routeId]?.[0];

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ flexBasis: '80px' }}>
                <Badge color="blue">{routeDetails?.route_short_name}</Badge>
            </div>
            <Box>{routeIdDetails.data?.[props.routeId]?.[0]?.route_desc}</Box>
            <div style={{ flexGrow: 1, textAlign: 'right' }}>
                <Box variant="strong">
                    {timeDetails.time} - {timeDetails.relativeTime}
                </Box>
            </div>
        </div>
    );
}
