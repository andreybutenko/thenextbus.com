import { FeedMessage, StopTimeUpdate } from 'gtfs-types';

type GetStopTimeUpdateFilterParams = {
    stopId: string;
    laterThan: number;
    scheduleRelationship: 'SCHEDULED' | 'SKIPPED' | 'NO_DATA';
};

export function getStopTimeUpdates(
    data: FeedMessage,
    params: GetStopTimeUpdateFilterParams
): StopTimeUpdate[] {
    return data
        .entity!.flatMap((entity) => entity.trip_update!.stop_time_update!)
        .filter(
            (stopTimeUpdate) =>
                stopTimeUpdate.departure?.time &&
                stopTimeUpdate.departure?.time >= params.laterThan &&
                stopTimeUpdate.stop_id === params.stopId &&
                (stopTimeUpdate.schedule_relationship as unknown as string) ===
                    params.scheduleRelationship
        );
}
