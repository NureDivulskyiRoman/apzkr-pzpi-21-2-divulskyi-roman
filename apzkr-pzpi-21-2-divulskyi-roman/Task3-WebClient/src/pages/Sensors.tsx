import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { SensorCreateModal } from '../components/Models/Sensor/SensorCreateModal';
import { SensorEditModal } from '../components/Models/Sensor/SensorEditModal';
import { deleteSensor, getSensors } from '../http/sensorApi';
import { ISensor } from '../interfaces/ISensor';

export const Sensors = () => {
    const [sensors, setSensors] = useState<ISensor[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISensor>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISensor) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getSensors()
        .then((data) => {
            setSensors(data);
        })
        .catch(() => alert("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteSensor(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <SensorCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></SensorCreateModal>
  
        <SensorEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></SensorEditModal>
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
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Farm plot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr key={sensor.id}>
                <td>{sensor.id}</td>
                <td>{sensor.name}</td>
                <td>{sensor.type}</td>
                <td>{sensor.location}</td>
                <td>{sensor.farmPlot?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(sensor)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(sensor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
