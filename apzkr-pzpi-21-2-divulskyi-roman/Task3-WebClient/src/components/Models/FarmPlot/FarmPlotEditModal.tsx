import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editPlot } from '../../../http/plotApi';
import { IFarmPlot } from '../../../interfaces/IFarmPlot';
import { IPlotCreateFormData } from './FarmPlotCreateModal';

export interface IPlotEditFormData extends IPlotCreateFormData {
    id: number,
}

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IFarmPlot,
}

export const FarmPlotEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IPlotEditFormData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IPlotEditFormData) => {
        await editPlot(data.id, data)
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
                  <label className="control-label">Area</label>
                  <Controller
                    control={control}
                    name={"area"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      max: {
                        value: 10000,
                        message: "Maximum 10000"
                      },
                      required: "enter area",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.area?.message}</p>
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