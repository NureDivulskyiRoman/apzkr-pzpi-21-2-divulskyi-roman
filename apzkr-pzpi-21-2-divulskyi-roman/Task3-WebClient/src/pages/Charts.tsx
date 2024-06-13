import { Chart, ChartData, registerables } from 'chart.js'
import React, {useRef, useState, useMemo, useEffect} from 'react'
import { getWeatherConditions } from '../http/weatherConditionApi';
import { IWeatherCondition } from '../interfaces/IWeatherCondition';
Chart.register(...registerables);

export const Charts = () => {
    const [weatherConditions, setWeatherConditions] = useState<IWeatherCondition[]>([]);
    
      const fetchWeatherConditions = async () => {
        await getWeatherConditions().then((data) => setWeatherConditions(data));
      }
      
      useEffect(() => {
        fetchWeatherConditions();
      }, [])

      const sortWeatherConditions = (items: IWeatherCondition[]): IWeatherCondition[] => {
        return items.sort((a, b) => {
            const dateA = new Date(a.dateTime);
            const dateB = new Date(b.dateTime);
            return dateA.getTime() - dateB.getTime();
        });
    }

      const chartData = useMemo<ChartData>(() => {
        const sortedItems = sortWeatherConditions(weatherConditions);
        const formatData = (): ChartData => ({
            labels: sortedItems.map(({dateTime}) => dateTime),
            datasets: [{
                label: 'Temperature',
                data: sortedItems.map(({ temperature }) => temperature)
            },
            {
                label: 'Rainfall',
                data: sortedItems.map(({ rainfall }) => rainfall)
            },
            {
                label: 'Humidity',
                data: sortedItems.map(({ humidity }) => humidity)
            }
        ]
          });
        return formatData();
      }, [weatherConditions])

    const chartRef = useRef<Chart | null>(null);
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx && weatherConditions) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
            });
        }
    };

  return (
    <div>
        <canvas ref={canvasCallback}></canvas>
    </div>
  )
}