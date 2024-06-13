import { $authhost } from ".";
import { IWeatherConditionCreateFormData } from "../components/Models/WeatherCondition/WeatherConditionCreateModal";
import { IWeatherConditionEditFormData } from "../components/Models/WeatherCondition/WeatherConditionEditModal";

export const getWeatherConditions = async () => {
    const { data } = await $authhost.get('api/WeatherConditions')
    return data;
}

export const createWeatherCondition = async (formData: IWeatherConditionCreateFormData) => {
    const { data } = await $authhost.post('api/WeatherConditions', formData)
    return data;
}

export const editWeatherCondition = async (id: number, formData: IWeatherConditionEditFormData) => {
    const { data } = await $authhost.put(`api/WeatherConditions/${id}`, formData)
    return data;
}

export const deleteWeatherCondition = async (id: number) => {
    const { data } = await $authhost.delete(`api/WeatherConditions/${id}`)
    return data;
}
