import { SegmentedControl } from '@cloudscape-design/components';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DepartureDisplay } from '../components/DepartureDisplay';
import { Wrapper } from '../components/Wrapper';
import { WeatherDetailsRow } from '../components/weather/WeatherDetailsRow';
import { SECOND_MS } from '../hooks/useInterval';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { useWeatherData } from '../hooks/useWeatherData';
import { getDepartures } from '../utils/rtFilters';
import styles from './DeparturesPage.module.css';

dayjs.extend(relativeTime);

const BASE_KCM_RT_ENDPOINT = 'https://d2dw2n9grzfy70.cloudfront.net/tripupdates.json';
const WEATHER_ENDPOINT = 'https://d2dw2n9grzfy70.cloudfront.net/weather.json';

export function DeparturesPage(): React.ReactElement {
    const { stopId } = useParams();

    const weatherData = useWeatherData(WEATHER_ENDPOINT);
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

    const [view, setView] = useState<'weather' | 'departures'>('departures');

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

    const hourlyWeatherDetails = useMemo(() => {
        if (weatherData.state !== 'success' && weatherData.state !== 'refetching') {
            return [];
        }

        return weatherData.data.hourly;
    }, [realTimeData]);

    return (
        <Wrapper contentType="default" disableContentPaddings={true}>
            <ContentLayout
                header={
                    <div
                        className={`${styles.departuresPageHeader} ${
                            view === 'departures' ? styles.departuresHeader : styles.weatherHeader
                        }`}
                    >
                        <Box variant="h1">
                            {view === 'departures' ? 'Upcoming departures' : 'Hourly forecast'}
                        </Box>
                        <div className={styles.actions}>
                            <SegmentedControl
                                selectedId={view}
                                onChange={({ detail }) =>
                                    setView(detail.selectedId as 'weather' | 'departures')
                                }
                                options={[
                                    { text: 'Departures', id: 'departures' },
                                    { text: 'Weather', id: 'weather' },
                                ]}
                            />
                            <Button
                                iconName={isFullScreen ? 'exit-full-screen' : 'full-screen'}
                                onClick={toggleFullScreen}
                                variant="icon"
                            />
                        </div>
                    </div>
                }
            >
                {view === 'weather' &&
                    hourlyWeatherDetails.map((weather) => (
                        <WeatherDetailsRow key={weather.date.getUTCSeconds()} data={weather} />
                    ))}

                {view === 'departures' &&
                    nextArrivals.map((data, index) => (
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
