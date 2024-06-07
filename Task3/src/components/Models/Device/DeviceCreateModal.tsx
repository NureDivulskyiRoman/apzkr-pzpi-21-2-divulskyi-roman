import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createDevice } from '../../../http/irrigationDeviceApi';
import { getPlots } from '../../../http/plotApi';
import { IFarmPlot } from '../../../interfaces/IFarmPlot';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }
  
  export interface IDeviceCreateFormData {
    name: string,
    type: string,
    waterFlowRate: number,
    status: string,
    farmPlotId: number
  }

export const DeviceCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IDeviceCreateFormData>();
      const [plots, setPlots] = useState<IFarmPlot[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IDeviceCreateFormData) => {
        await createDevice(data)
          .then(() => {
            handleClose();
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
        <Modal show={show} onHide={handleClose}>
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
                  <label className="control-label">Type</label>
                  <Controller
                    control={control}
                    name={"type"}
                    rules={{
                      required: "enter type",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.type?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Status</label>
                  <Controller
                    control={control}
                    name={"status"}
                    rules={{
                      required: "enter status",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.status?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Water flow rate</label>
                  <Controller
                    control={control}
                    name={"waterFlowRate"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 100000,
                        message: "Maximum 100000"
                      },
                      required: "enter area",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.waterFlowRate?.message}</p>
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
                <Button variant="secondary" onClick={handleClose}>
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