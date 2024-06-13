import { IFarmPlot } from "./IFarmPlot";

export interface ISensor {
    id: number,
    name: string,
    type: string,
    location: string,
    farmPlotId: number,
    farmPlot: IFarmPlot
}