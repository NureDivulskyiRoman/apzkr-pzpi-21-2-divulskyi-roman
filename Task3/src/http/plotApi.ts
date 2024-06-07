import { $authhost } from ".";
import { IPlotCreateFormData } from "../components/Models/FarmPlot/FarmPlotCreateModal";
import { IPlotEditFormData } from "../components/Models/FarmPlot/FarmPlotEditModal";

export const getPlots = async () => {
    const { data } = await $authhost.get('api/FarmPlots')
    return data;
}

export const createPlot = async (formData: IPlotCreateFormData) => {
    const { data } = await $authhost.post('api/FarmPlots', formData)
    return data;
}

export const editPlot = async (id: number, formData: IPlotEditFormData) => {
    const { data } = await $authhost.put(`api/FarmPlots/${id}`, formData)
    return data;
}

export const deletePlot = async (id: number) => {
    const { data } = await $authhost.delete(`api/FarmPlots/${id}`)
    return data;
}
