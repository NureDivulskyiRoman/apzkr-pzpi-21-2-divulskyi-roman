import { ComponentType } from "react";
import { CHARTS_ROUTE, FARM_PLOTS_ROUTE, IRRIGATION_DEVICE_ROUTE, MAIN_ROUTE, SENSOR_ROUTE, SHEDULE_ROUTE, WATER_RESOURCE_ROUTE, WEATHER_CONDITIONS_ROUTE } from "./consts";
import { Charts } from "./pages/Charts";
import { FarmPlots } from "./pages/FarmPlots";
import { IrrigationDevices } from "./pages/IrrigationDevices";
import { MainPage } from "./pages/MainPage";
import { Schedules } from "./pages/Schedules";
import { Sensors } from "./pages/Sensors";
import { WaterResources } from "./pages/WaterResources";
import { WeatherConditions } from "./pages/WeatherConditions";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: FARM_PLOTS_ROUTE, Component: FarmPlots },
    { path: IRRIGATION_DEVICE_ROUTE, Component: IrrigationDevices },
    { path: SHEDULE_ROUTE, Component: Schedules },
    { path: SENSOR_ROUTE, Component: Sensors },
    { path: WATER_RESOURCE_ROUTE, Component: WaterResources },
    { path: WEATHER_CONDITIONS_ROUTE, Component: WeatherConditions },
    { path: CHARTS_ROUTE, Component: Charts },
]