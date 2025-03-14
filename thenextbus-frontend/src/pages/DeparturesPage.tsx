import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DepartureDisplay } from '../components/DepartureDisplay';
import { Wrapper } from '../components/Wrapper';
import { SECOND_MS } from '../hooks/useInterval';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { getDepartures } from '../utils/rtFilters';
import styles from './DeparturesPage.module.css';

dayjs.extend(relativeTime);

const BASE_KCM_RT_ENDPOINT = 'https://d2dw2n9grzfy70.cloudfront.net/tripupdates.json';

export function DeparturesPage(): React.ReactElement {
    const { stopId } = useParams();

    const realTimeData = useRealTimeData(BASE_KCM_RT_ENDPOINT);

    const [isFullScreen, setIsFullScreen] = useState(false);
    function toggleFullScreen() {
        if (!isFullScreen) {
            const pageElement = document.documentElement;
            pageElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    }

    const nextArrivals = useMemo(() => {
        if (realTimeData.state !== 'success' && realTimeData.state !== 'refetching') {
            return [];
        }

        const stopTimes = getDepartures(realTimeData.data, {
            stopIds: stopId !== undefined ? stopId.split(',') : [],
            laterThan: Date.now() / SECOND_MS,
            scheduleRelationship: 'SCHEDULED',
        });

        return stopTimes.sort((a, b) => a.departureTime - b.departureTime);
    }, [realTimeData]);

    return (
        <Wrapper contentType="default" disableContentPaddings={true}>
            <ContentLayout
                header={
                    <div className={styles.departuresPageHeader}>
                        <Box variant="h1">Upcoming departures</Box>
                        <Button
                            iconName={isFullScreen ? 'exit-full-screen' : 'full-screen'}
                            onClick={toggleFullScreen}
                            variant="icon"
                        />
                    </div>
                }
            >
                {nextArrivals.map((data, index) => (
                    <DepartureDisplay
                        key={index}
                        departureTime={data.departureTime}
                        tripId={data.tripId}
                        routeId={data.routeId}
                    />
                ))}
            </ContentLayout>
        </Wrapper>
    );
}
