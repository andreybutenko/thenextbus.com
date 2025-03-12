import Box from '@cloudscape-design/components/box';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { SECOND_MS, useInterval } from '../hooks/useInterval';

export type DepartureDisplayProps = {
    time: number;
};

type TimeDetails = {
    time: string;
    relativeTime: string;
};

export function DepartureDisplay(props: DepartureDisplayProps): React.ReactElement {
    const [timeDetails, setTimeDetails] = useState<TimeDetails>({ time: '', relativeTime: '' });

    function computeTimeDetails() {
        const date = dayjs.unix(props.time);

        setTimeDetails({
            time: date.format('hh:mma'),
            relativeTime: date.fromNow(),
        });
    }

    useInterval(computeTimeDetails, 5 * SECOND_MS);

    return (
        <Box>
            {timeDetails.time} - {timeDetails.relativeTime}
        </Box>
    );
}
