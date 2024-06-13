import { IFarmPlot } from "./IFarmPlot";

export interface IWaterResource {
    id: number,
    name: string,
    capacity: number,
    currentLevel: number,
    location: string,
    farmPlotId: number,
    farmPlot: IFarmPlot
}