import { Box } from '@cloudscape-design/components';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { SECOND_MS, useInterval } from '../hooks/useInterval';
import { useRouteData } from '../routeData/useRouteData';
import styles from './DepartureDisplay.module.css';

export type DepartureDisplayProps = { routeId: string; tripId: string; departureTime: number };

type TimeDetails = {
    time: string;
    relativeTime: string;
};

export function DepartureDisplay(props: DepartureDisplayProps): React.ReactElement {
    const { routeIdDetails, tripIdHeadboards } = useRouteData();
    const [timeDetails, setTimeDetails] = useState<TimeDetails>({ time: '', relativeTime: '' });

    function computeTimeDetails() {
        const date = dayjs.unix(props.departureTime);

        setTimeDetails({
            time: date.format('hh:mma'),
            relativeTime: `${date.diff(dayjs(), 'minutes')}`,
        });
    }

    useInterval(computeTimeDetails, 5 * SECOND_MS);

    const routeDetails = routeIdDetails.data?.[props.routeId]?.[0];
    const headboard = tripIdHeadboards.data?.[props.tripId]?.[0].ths;

    const routeNumber = useMemo<string | undefined>(() => {
        const routeShortName = routeDetails?.route_short_name;

        if (routeShortName === undefined) {
            return undefined;
        }

        if (routeShortName.endsWith(' Line')) {
            return routeShortName.replace(' Line', '');
        }

        return routeShortName;
    }, [routeDetails?.route_short_name]);
    const showRouteNumber = routeNumber !== undefined;

    return (
        <Box>
            <div className={styles.departureDisplay}>
                {showRouteNumber && (
                    <div className={styles.routeNumber}>
                        <span>{routeNumber}</span>
                    </div>
                )}
                <div className={styles.tripHeadboard}>{headboard} more more more more text</div>
                <div className={styles.departureTime}>
                    <span className={styles.departureTimeValue}>{timeDetails.relativeTime}</span>
                    <span className={styles.departureTimeUnit}>min</span>
                </div>
            </div>
        </Box>
    );
}
