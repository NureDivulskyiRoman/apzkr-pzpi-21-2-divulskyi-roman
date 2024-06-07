import { IIrrigationDevice } from "./IIrrigationDevice";

export interface IShedule {
    id: number,
    startTime: string,
    endTime: string,
    frequency: number,
    irrigationDeviceId: number,
    irrigationDevice: IIrrigationDevice
}