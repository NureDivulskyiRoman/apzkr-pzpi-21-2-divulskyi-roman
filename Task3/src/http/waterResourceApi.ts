import { $authhost } from ".";
import { IResourceCreateFormData } from "../components/Models/Resource/ResourceCreateModal";
import { IResourceEditFormData } from "../components/Models/Resource/ResourceEditModal";

export const getResources = async () => {
    const { data } = await $authhost.get('api/WaterResources')
    return data;
}

export const createResource = async (formData: IResourceCreateFormData) => {
    const { data } = await $authhost.post('api/WaterResources', formData)
    return data;
}

export const editResource = async (id: number, formData: IResourceEditFormData) => {
    const { data } = await $authhost.put(`api/WaterResources/${id}`, formData)
    return data;
}

export const deleteResource = async (id: number) => {
    const { data } = await $authhost.delete(`api/WaterResources/${id}`)
    return data;
}
