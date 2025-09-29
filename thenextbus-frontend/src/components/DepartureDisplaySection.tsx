import Box from '@cloudscape-design/components/box';
import { useMemo } from 'react';
import { useRouteData } from '../routeData/useRouteData';
import { DepartureDisplay, DepartureDisplayProps } from './DepartureDisplay';
import styles from './DepartureDisplaySection.module.css';

export type DepartureDisplaySectionProps = {
    stopId: string;
    departureDisplayProps: DepartureDisplayProps[];
};

export function DepartureDisplaySection(props: DepartureDisplaySectionProps) {
    const { stopIdDetails } = useRouteData();

    const sectionHeader = useMemo(() => {
        const details = stopIdDetails.data?.[props.stopId]?.[0];

        if (!details) {
            return props.stopId;
        }

        return `${details.stop_name} (${props.stopId})`;
    }, [stopIdDetails, props.stopId]);

    return (
        <Box>
            <div className={styles.departureDisplaySectionHeader}>{sectionHeader}</div>
            {props.departureDisplayProps.map((props, index) => (
                <DepartureDisplay key={index} {...props} />
            ))}
        </Box>
    );
}
