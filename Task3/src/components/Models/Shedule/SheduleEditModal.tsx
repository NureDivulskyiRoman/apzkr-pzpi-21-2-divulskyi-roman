import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { getDevices } from '../../../http/irrigationDeviceApi'
import { editShedule } from '../../../http/sheduleApi'
import { IIrrigationDevice } from '../../../interfaces/IIrrigationDevice'
import { ISelect } from '../../../interfaces/ISelect'
import { IShedule } from '../../../interfaces/IShedule'
import { ISheduleCreateFormData } from './SheduleCreateModal'

export interface ISheduleEditFormData extends ISheduleCreateFormData {
    id: number,
}

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IShedule,
}

export const SheduleEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ISheduleEditFormData>();
      const [devices, setDevices] = useState<IIrrigationDevice[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ISheduleEditFormData) => {
        await editShedule(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Smth went wrong!"));
      };

      const fetchDevices = async () => {
        await getDevices().then((data) => setDevices(data));
      };
    
      useEffect(() => {
        fetchDevices();
      }, []);
    
      const selectDevices = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...devices.map((device) => {
            return {
              value: device.id.toString(),
              label: `Id: ${device.id}, Name: ${device?.name}`,
            };
          }),
        ];
      }, [devices]);

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
                  <label className="control-label">Start time</label>
                  <Controller
                    control={control}
                    name={"startTime"}
                    rules={{
                      required: "enter time",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.startTime?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">End time</label>
                  <Controller
                    control={control}
                    name={"endTime"}
                    rules={{
                      required: "enter time",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.endTime?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Frequency</label>
                  <Controller
                    control={control}
                    name={"frequency"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 72,
                        message: "Maximum 72"
                      },
                      required: "enter frequency",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.frequency?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Device</label>
                <Controller
                  control={control}
                  name={"irrigationDeviceId"}
                  rules={{
                    required: "enter device",
                    validate: (data) => (data != 0 ? undefined : "Select device"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectDevices.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.irrigationDeviceId?.message}</p>
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
