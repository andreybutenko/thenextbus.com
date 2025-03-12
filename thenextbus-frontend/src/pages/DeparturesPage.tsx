import { Badge } from '@cloudscape-design/components';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DepartureDisplay } from '../components/DepartureDisplay';
import { Wrapper } from '../components/Wrapper';
import { SECOND_MS } from '../hooks/useInterval';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { getStopTimeUpdates } from '../utils/rtFilters';

dayjs.extend(relativeTime);

const BASE_KCM_RT_ENDPOINT = 'https://d2dw2n9grzfy70.cloudfront.net/tripupdates.json';

export function DeparturesPage(): React.ReactElement {
    const { stopId } = useParams();

    const realTimeData = useRealTimeData(BASE_KCM_RT_ENDPOINT);

    const nextArrivals = useMemo<number[]>(() => {
        if (realTimeData.state !== 'success' && realTimeData.state !== 'refetching') {
            return [];
        }

        const stopTimes = getStopTimeUpdates(realTimeData.data, {
            stopId: `${stopId}`,
            laterThan: Date.now() / SECOND_MS,
            scheduleRelationship: 'SCHEDULED',
        }).map((stopTime) => stopTime.departure!.time);

        return stopTimes;
    }, [realTimeData]);

    return (
        <Wrapper contentType="default">
            <ContentLayout
                header={
                    <Header variant="h1">
                        Departures <Badge color="blue">{stopId}</Badge>
                    </Header>
                }
            >
                {nextArrivals.map((time, index) => (
                    <DepartureDisplay key={index} time={time} />
                ))}
            </ContentLayout>
        </Wrapper>
    );
}
