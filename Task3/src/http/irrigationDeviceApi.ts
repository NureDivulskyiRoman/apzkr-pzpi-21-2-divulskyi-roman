import { $authhost } from ".";
import { IDeviceCreateFormData } from "../components/Models/Device/DeviceCreateModal";
import { IDeviceEditFormData } from "../components/Models/Device/DeviceEditModal";

export const getDevices = async () => {
    const { data } = await $authhost.get('api/IrrigationDevices')
    return data;
}

export const createDevice = async (formData: IDeviceCreateFormData) => {
    const { data } = await $authhost.post('api/IrrigationDevices', formData)
    return data;
}

export const editDevice = async (id: number, formData: IDeviceEditFormData) => {
    const { data } = await $authhost.put(`api/IrrigationDevices/${id}`, formData)
    return data;
}

export const deleteDevice = async (id: number) => {
    const { data } = await $authhost.delete(`api/IrrigationDevices/${id}`)
    return data;
}
