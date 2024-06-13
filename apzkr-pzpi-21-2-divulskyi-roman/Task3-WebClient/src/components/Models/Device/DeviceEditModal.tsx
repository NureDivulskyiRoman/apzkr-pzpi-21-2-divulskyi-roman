import React, { useEffect, useMemo, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { editDevice } from '../../../http/irrigationDeviceApi'
import { getPlots } from '../../../http/plotApi'
import { IFarmPlot } from '../../../interfaces/IFarmPlot'
import { IIrrigationDevice } from '../../../interfaces/IIrrigationDevice'
import { ISelect } from '../../../interfaces/ISelect'
import { IDeviceCreateFormData } from './DeviceCreateModal'

export interface IDeviceEditFormData extends IDeviceCreateFormData {
    id: number,
}

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IIrrigationDevice,
}

export const DeviceEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IDeviceEditFormData>();

      const [plots, setPlots] = useState<IFarmPlot[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IDeviceEditFormData) => {
        await editDevice(data.id, data)
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
