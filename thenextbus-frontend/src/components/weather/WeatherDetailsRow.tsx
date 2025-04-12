import { Box } from '@cloudscape-design/components';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { WeatherDetails } from '../../types/WeatherData';
import styles from './WeatherDetailsRow.module.css';

export type WeatherDetailsRowProps = {
    data: WeatherDetails;
};

export function WeatherDetailsRow(props: WeatherDetailsRowProps): React.ReactElement {
    const displayTime = useMemo<string>(() => dayjs(props.data.date).format('ha'), [props.data]);

    const displayDate = useMemo<string | undefined>(() => {
        const formattedDate = dayjs(props.data.date).format('MMM D');
        const formattedNow = dayjs().format('MMM D');
        if (formattedDate === formattedNow) {
            return undefined;
        }

        return formattedDate;
    }, [props.data]);
    const showDisplayDate = !!displayDate;

    const iconSrc = useMemo<string | undefined>(() => {
        if (!props.data.icon) {
            return undefined;
        }

        return `https://openweathermap.org/img/wn/${props.data.icon}@2x.png`;
    }, [props.data]);
    const showIconSrc = !!iconSrc;

    return (
        <Box>
            <div className={styles.weatherDetailsRow}>
                <div className={styles.timestamp}>
                    {showDisplayDate && <span className={styles.date}>{displayDate}</span>}
                    <span className={styles.time}>{displayTime}</span>
                </div>
                {showIconSrc && (
                    <div className={styles.iconWrapper}>
                        <img src={iconSrc} />
                    </div>
                )}
                <div className={styles.primaryContent}>
                    <div className={styles.description}>{props.data.description}</div>
                    <div className={styles.pop}>
                        {Math.round(props.data.pop * 100)}% chance of rain
                    </div>
                </div>
                <div className={styles.temperature}>
                    <span className={styles.temperatureValue}>{Math.round(props.data.temp)}</span>
                    <span className={styles.temperatureUnit}>&deg;F</span>
                </div>
            </div>
        </Box>
    );
}
