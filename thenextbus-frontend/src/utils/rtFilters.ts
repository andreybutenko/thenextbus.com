import { FeedMessage, StopTimeUpdate } from 'gtfs-types';

type GetStopTimeUpdateFilterParams = {
    stopIds: string[];
    laterThan: number;
    scheduleRelationship: 'SCHEDULED' | 'SKIPPED' | 'NO_DATA';
};

export function getDepartures(
    data: FeedMessage,
    params: GetStopTimeUpdateFilterParams
): { routeId: string; tripId: string; departureTime: number }[] {
    function filterStopTimeUpdate(stopTimeUpdate: StopTimeUpdate) {
        return (
            stopTimeUpdate.departure?.time &&
            stopTimeUpdate.departure?.time >= params.laterThan &&
            params.stopIds.includes(stopTimeUpdate.stop_id) &&
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
            tripId: entity.trip_update!.trip.trip_id,
            departureTime:
                entity.trip_update!.stop_time_update!.find(filterStopTimeUpdate)!.departure!.time,
        }));
}
