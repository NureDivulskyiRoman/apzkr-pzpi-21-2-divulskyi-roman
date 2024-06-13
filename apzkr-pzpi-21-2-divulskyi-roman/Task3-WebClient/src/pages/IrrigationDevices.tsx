import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { DeviceCreateModal } from '../components/Models/Device/DeviceCreateModal';
import { DeviceEditModal } from '../components/Models/Device/DeviceEditModal';
import { deleteDevice, getDevices } from '../http/irrigationDeviceApi';
import { IIrrigationDevice } from '../interfaces/IIrrigationDevice';

export const IrrigationDevices = () => {
    const [devices, setDevices] = useState<IIrrigationDevice[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IIrrigationDevice>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IIrrigationDevice) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getDevices()
        .then((data) => {
            setDevices(data);
        })
        .catch(() => alert("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteDevice(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <DeviceCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></DeviceCreateModal>
  
        <DeviceEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></DeviceEditModal>
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
              <th>Water</th>
              <th>Status</th>
              <th>Plot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.waterFlowRate}</td>
                <td>{device.status}</td>
                <td>{device.farmPlot?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(device)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(device.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
