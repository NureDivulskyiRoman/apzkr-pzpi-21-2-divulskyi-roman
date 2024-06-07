import React, { useEffect, useState } from 'react'
import { FarmPlotCreateModal } from '../components/Models/FarmPlot/FarmPlotCreateModal';
import { FarmPlotEditModal } from '../components/Models/FarmPlot/FarmPlotEditModal';
import { deletePlot, getPlots } from '../http/plotApi';
import { IFarmPlot } from '../interfaces/IFarmPlot';
import { Button } from 'react-bootstrap';

  export const FarmPlots = () => {
    const [plots, setPlots] = useState<IFarmPlot[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IFarmPlot>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IFarmPlot) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getPlots()
        .then((data) => {
            setPlots(data);
        })
        .catch(() => alert("Smth went wrong!"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deletePlot(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
        <FarmPlotCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></FarmPlotCreateModal>
  
        <FarmPlotEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></FarmPlotEditModal>
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
              <th>Area</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {plots.map((plot) => (
              <tr key={plot.id}>
                <td>{plot.id}</td>
                <td>{plot.name}</td>
                <td>{plot.area}</td>
                <td>{plot.location}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(plot)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(plot.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }