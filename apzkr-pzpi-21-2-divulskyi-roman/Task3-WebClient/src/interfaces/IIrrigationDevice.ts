import { IFarmPlot } from "./IFarmPlot";

export interface IIrrigationDevice {
    id: number,
    name: string,
    type: string,
    waterFlowRate: number,
    status: string,
    farmPlotId: number,
    farmPlot: IFarmPlot
}