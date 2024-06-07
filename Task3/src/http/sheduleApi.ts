import { $authhost } from ".";
import { ISheduleCreateFormData } from "../components/Models/Shedule/SheduleCreateModal";
import { ISheduleEditFormData } from "../components/Models/Shedule/SheduleEditModal";

export const getShedules = async () => {
    const { data } = await $authhost.get('api/IrrigationSchedules')
    return data;
}

export const createShedule = async (formData: ISheduleCreateFormData) => {
    const { data } = await $authhost.post('api/IrrigationSchedules', formData)
    return data;
}

export const editShedule = async (id: number, formData: ISheduleEditFormData) => {
    const { data } = await $authhost.put(`api/IrrigationSchedules/${id}`, formData)
    return data;
}

export const deleteShedule = async (id: number) => {
    const { data } = await $authhost.delete(`api/IrrigationSchedules/${id}`)
    return data;
}
