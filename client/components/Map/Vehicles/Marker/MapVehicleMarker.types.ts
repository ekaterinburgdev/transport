import { VehicleType } from 'common/types/masstrans';

export type MapVehicleMarkerProps = {
    boardId: number;
    routeNumber: number;
    type: VehicleType;
    isCourseEast: boolean;
    disability?: boolean;
    warning?: boolean;
    course: number;
    additionalInfo?: boolean;
};
