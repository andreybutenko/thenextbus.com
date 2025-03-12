import { FeedMessage, StopTimeUpdate } from 'gtfs-types';

type GetStopTimeUpdateFilterParams = {
    stopId: string;
    laterThan: number;
    scheduleRelationship: 'SCHEDULED' | 'SKIPPED' | 'NO_DATA';
};

export function getDepartures(
    data: FeedMessage,
    params: GetStopTimeUpdateFilterParams
): { routeId: string; departureTime: number }[] {
    function filterStopTimeUpdate(stopTimeUpdate: StopTimeUpdate) {
        return (
            stopTimeUpdate.departure?.time &&
            stopTimeUpdate.departure?.time >= params.laterThan &&
            stopTimeUpdate.stop_id === params.stopId &&
            (stopTimeUpdate.schedule_relationship as unknown as string) ===
                params.scheduleRelationship
        );
    }

    return data
        .entity!.filter((entity) =>
            entity.trip_update!.stop_time_update!.some(filterStopTimeUpdate)
        )
        .map((entity) => ({
            routeId: entity.trip_update!.trip.route_id,
            departureTime:
                entity.trip_update!.stop_time_update!.find(filterStopTimeUpdate)!.departure!.time,
        }));
}

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
