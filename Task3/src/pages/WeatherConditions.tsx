import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { WeatherConditionCreateModal } from '../components/Models/WeatherCondition/WeatherConditionCreateModal';
import { WeatherConditionEditModal } from '../components/Models/WeatherCondition/WeatherConditionEditModal';
import { deleteWeatherCondition, getWeatherConditions } from '../http/weatherConditionApi';
import { IWeatherCondition } from '../interfaces/IWeatherCondition';

export const WeatherConditions = () => {
    const [weatherConditions, setWeatherConditions] = useState<IWeatherCondition[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IWeatherCondition>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IWeatherCondition) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getWeatherConditions()
        .then((data) => {
            setWeatherConditions(data);
        })
        .catch(() => alert("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteWeatherCondition(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <WeatherConditionCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></WeatherConditionCreateModal>
  
        <WeatherConditionEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></WeatherConditionEditModal>
        <h1>Index</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Rainfall</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {weatherConditions.map((weatherCondition) => (
              <tr key={weatherCondition.id}>
                <td>{weatherCondition.id}</td>
                <td>{weatherCondition.dateTime}</td>
                <td>{weatherCondition.temperature}</td>
                <td>{weatherCondition.humidity}</td>
                <td>{weatherCondition.rainfall}</td>
                <td>{weatherCondition.location}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(weatherCondition)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(weatherCondition.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
