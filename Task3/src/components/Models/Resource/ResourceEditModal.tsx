import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getPlots } from '../../../http/plotApi';
import { editResource } from '../../../http/waterResourceApi';
import { IFarmPlot } from '../../../interfaces/IFarmPlot';
import { ISelect } from '../../../interfaces/ISelect';
import { IWaterResource } from '../../../interfaces/IWaterResource';
import { IResourceCreateFormData } from './ResourceCreateModal';

export interface IResourceEditFormData extends IResourceCreateFormData {
    id: number,
}

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IWaterResource,
}

export const ResourceEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IResourceEditFormData>();
      const [plots, setPlots] = useState<IFarmPlot[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IResourceEditFormData) => {
        await editResource(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Smth went wrong!"));
      };

    const fetchPlots = async () => {
        await getPlots().then((data) => setPlots(data));
      };
    
      useEffect(() => {
        fetchPlots();
      }, []);
    
      const selectPlots = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...plots.map((plot) => {
            return {
              value: plot.id.toString(),
              label: `Id: ${plot.id}, Name: ${plot?.name}`,
            };
          }),
        ];
      }, [plots]);
          
      return (
        <Modal show={show} onHide={onHide}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                ></div>
               <div className="form-group">
                  <label className="control-label">Name</label>
                  <Controller
                    control={control}
                    name={"name"}
                    rules={{
                      required: "enter name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Capacity</label>
                  <Controller
                    control={control}
                    name={"capacity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 100000,
                        message: "Maximum 100000"
                      },
                      required: "enter capacity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.capacity?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Current level</label>
                  <Controller
                    control={control}
                    name={"currentLevel"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 100000,
                        message: "Maximum 100000"
                      },
                      required: "enter current level",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.currentLevel?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Location</label>
                  <Controller
                    control={control}
                    name={"location"}
                    rules={{
                      required: "enter location",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.location?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Farm plot</label>
                <Controller
                  control={control}
                  name={"farmPlotId"}
                  rules={{
                    required: "enter plot",
                    validate: (data) => (data != 0 ? undefined : "Select plot"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectPlots.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.farmPlotId?.message}</p>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
      )
}
