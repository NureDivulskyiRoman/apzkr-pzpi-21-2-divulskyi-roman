import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { DeviceCreateModal } from '../components/Models/Device/DeviceCreateModal';
import { SheduleCreateModal } from '../components/Models/Shedule/SheduleCreateModal';
import { SheduleEditModal } from '../components/Models/Shedule/SheduleEditModal';
import { deleteShedule, getShedules } from '../http/sheduleApi';
import { IShedule } from '../interfaces/IShedule';

export const Schedules = () => {
    const [shedules, setShedules] = useState<IShedule[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IShedule>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IShedule) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getShedules()
        .then((data) => {
            setShedules(data);
        })
        .catch(() => alert("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteShedule(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <SheduleCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></SheduleCreateModal>
  
        <SheduleEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></SheduleEditModal>
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
              <th>Start time</th>
              <th>End time</th>
              <th>Frequency</th>
              <th>Device</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shedules.map((shedule) => (
              <tr key={shedule.id}>
                <td>{shedule.id}</td>
                <td>{shedule.startTime}</td>
                <td>{shedule.endTime}</td>
                <td>{shedule.frequency}</td>
                <td>{shedule.irrigationDevice?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(shedule)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(shedule.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
