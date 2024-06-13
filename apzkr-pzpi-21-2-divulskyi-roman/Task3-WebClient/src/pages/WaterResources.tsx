import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ResourceCreateModal } from '../components/Models/Resource/ResourceCreateModal';
import { ResourceEditModal } from '../components/Models/Resource/ResourceEditModal';
import { deleteResource, getResources } from '../http/waterResourceApi';
import { IWaterResource } from '../interfaces/IWaterResource';

export const WaterResources = () => {
    const [resources, setResources] = useState<IWaterResource[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IWaterResource>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IWaterResource) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getResources()
        .then((data) => {
            setResources(data);
        })
        .catch(() => alert("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteResource(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <ResourceCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></ResourceCreateModal>
  
        <ResourceEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></ResourceEditModal>
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
              <th>Capacity</th>
              <th>Current level</th>
              <th>Location</th>
              <th>Farm plot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.name}</td>
                <td>{resource.capacity}</td>
                <td>{resource.currentLevel}</td>
                <td>{resource.location}</td>
                <td>{resource.farmPlot?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(resource)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(resource.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
