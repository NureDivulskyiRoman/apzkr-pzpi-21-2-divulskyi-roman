import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { editWeatherCondition } from '../../../http/weatherConditionApi'
import { IWeatherCondition } from '../../../interfaces/IWeatherCondition'
import { IWeatherConditionCreateFormData } from './WeatherConditionCreateModal'

export interface IWeatherConditionEditFormData extends IWeatherConditionCreateFormData {
    id: number,
}

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IWeatherCondition,
}

export const WeatherConditionEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IWeatherConditionEditFormData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IWeatherConditionEditFormData) => {
        await editWeatherCondition(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Smth went wrong!"));
      };

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
                  <label className="control-label">Date time</label>
                  <Controller
                    control={control}
                    name={"dateTime"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.dateTime?.message}</p>
                </div>

                <div className="form-group">
                  <label className="control-label">Temperature</label>
                  <Controller
                    control={control}
                    name={"temperature"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 100,
                        message: "Maximum 100"
                      },
                      required: "enter temperature",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.temperature?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Humidity</label>
                  <Controller
                    control={control}
                    name={"humidity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 100,
                        message: "Maximum 100"
                      },
                      required: "enter humidity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.humidity?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Rainfall</label>
                  <Controller
                    control={control}
                    name={"rainfall"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 100,
                        message: "Maximum 100"
                      },
                      required: "enter rainfall",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.rainfall?.message}</p>
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
