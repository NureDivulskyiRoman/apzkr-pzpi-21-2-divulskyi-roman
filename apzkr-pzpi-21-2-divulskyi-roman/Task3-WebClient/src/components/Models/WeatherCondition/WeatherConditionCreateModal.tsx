import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createWeatherCondition } from '../../../http/weatherConditionApi';
import { IWeatherCondition } from '../../../interfaces/IWeatherCondition';


interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
  }
  
  export interface IWeatherConditionCreateFormData {
    dateTime: string,
    temperature: number,
    humidity: number,
    rainfall: number,
    location: string
  }

export const WeatherConditionCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IWeatherConditionCreateFormData>();
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IWeatherConditionCreateFormData) => {
        await createWeatherCondition(data)
          .then(() => {
            handleClose();
            fetch();
          })
          .catch(() => alert("Smth went wrong!"));
      };
  
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