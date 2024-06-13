import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getPlots } from '../../../http/plotApi';
import { createSensor } from '../../../http/sensorApi';
import { IFarmPlot } from '../../../interfaces/IFarmPlot';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }
  
  export interface ISensorCreateFormData {
   name: string,
   type: string,
   location: string,
   farmPlotId: number
  }

export const SensorCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<ISensorCreateFormData>();
      const [plots, setPlots] = useState<IFarmPlot[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: ISensorCreateFormData) => {
        await createSensor(data)
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