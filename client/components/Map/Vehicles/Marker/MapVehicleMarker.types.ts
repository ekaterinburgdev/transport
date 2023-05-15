import { ClientUnit } from 'transport-common/types/masstrans';

export type MapVehicleMarkerProps = {
    id: string;
    routeNumber: string;
    type: ClientUnit;
    isCourseEast: boolean;
    accessibility?: boolean;
    warning?: boolean;
    course: number;
    additionalInfo?: boolean;
};
