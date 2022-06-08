import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { toast } from 'react-toastify'

import { useApiPrivate, useTitle } from '../../../hooks'
import { ApiErrorType } from '../../../types'
import { TextInput } from '../../../components'

type CarType = {
    model: string
    licensePlate: string
    color: string
    nbSeats: number
}

const carSchema = Yup.object({
    model: Yup.string().trim().min(3).required(),
    licensePlate: Yup.string().min(6).required(),
    color: Yup.string().min(3).required(),
    nbSeats: Yup.number().integer().positive().moreThan(1).required()
}).required()

const Create = () => {
    useTitle('Create Car | Carona App')
    const navigate = useNavigate()
    const apiPrivate = useApiPrivate()
    const [hasLoggingError, setHasLoggingError] = useState<boolean | string>(false)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<CarType>({
        mode: 'onTouched',
        resolver: yupResolver(carSchema)
    })

    const handleCreateCar = async (car: CarType): Promise<ApiErrorType | boolean> => {
        return apiPrivate
            .post('cars', car)
            .then((_) => {
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const onSubmit = async (car: CarType) => {
        const result = await handleCreateCar(car)

        if (typeof result === 'object') {
            const { message } = result
            setHasLoggingError(message)
            return
        }
        toast.success('Car successfully created!')
        navigate('/')
    }

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Cars</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Create Car</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid my-5">
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Add Car</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {hasLoggingError && (
                                    <div className="col-md-6 mr-auto ml-auto">
                                        <div className="alert alert-danger alert-dismissible fade show">
                                            <h5>
                                                <i className="icon fas fa-ban"></i> Error!
                                            </h5>
                                            <p>{hasLoggingError}</p>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setHasLoggingError(false)}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-md-6 mx-auto">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="model">Model</label>
                                            <TextInput id="model" name={'model'} type={'text'} placeholder={'Car model'} register={register} error={errors.model && errors.model.message} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="licensePlate">License Plate</label>
                                            <TextInput
                                                id="licensePlate"
                                                name={'licensePlate'}
                                                type={'text'}
                                                placeholder={'License Plate'}
                                                register={register}
                                                error={errors.licensePlate && errors.licensePlate.message}
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="color">Color</label>
                                            <TextInput id="color" name={'color'} type={'text'} placeholder={'Color'} register={register} error={errors.color && errors.color.message} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <label htmlFor="nbSeats">Number of Seat</label>
                                            <TextInput
                                                id="nbSeats"
                                                name={'nbSeats'}
                                                type={'number'}
                                                placeholder={'Number of seat'}
                                                register={register}
                                                error={errors.nbSeats && errors.nbSeats.message}
                                            />
                                        </div>

                                        <div className="row mt-5">
                                            <div className="col-md-6 my-3">
                                                <button type="reset" className="btn btn-default btn-block">
                                                    Reset
                                                </button>
                                            </div>
                                            <div className="col-md-6 my-3">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Create
