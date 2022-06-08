import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { useApiPrivate, useTitle } from '../../../hooks'
import { ApiErrorType, Ride } from '../../../types'
import { City } from '../../../types/Ride'
import { Select, SelectOptionType, TextInput } from '../../../components'

type RideProgramType = {
    cityFromId: number
    cityToId: number
    day: string
    departureTime: string
}

const rideProgramSchema = Yup.object({
    cityFromId: Yup.number().required(),
    cityToId: Yup.number().required(),
    day: Yup.string().required(),
    departureTime: Yup.string().required()
})

const DAYS: SelectOptionType[] = [
    {
        id: 'Segunda',
        name: 'Segunda'
    },
    {
        id: 'Terça',
        name: 'Terça'
    },
    {
        id: 'Quarta',
        name: 'Quarta'
    },
    {
        id: 'Quinta',
        name: 'Quinta'
    },
    {
        id: 'Sexta',
        name: 'Sexta'
    },
    {
        id: 'Sabado',
        name: 'Sabado'
    },
    {
        id: 'Domingo',
        name: 'Domingo'
    }
]

const Create = () => {
    useTitle('My Rides Programs | Carona App')
    const [ridesPrograms, setRidesPrograms] = useState<Ride[]>([])
    const [ridesProgram, setRidesProgram] = useState<Ride | null>(null)
    const [cities, setCities] = useState<City[]>([])
    const apiPrivate = useApiPrivate()
    const navigate = useNavigate()
    const [hasLoggingError, setHasLoggingError] = useState<boolean | string>(false)
    const { rideId } = useParams()
    const isCreation: boolean | false = !rideId

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getRidesPrograms = async () => {
            try {
                const response = await apiPrivate.get('rides/programs', {
                    signal: controller.signal
                })
                isMounted && setRidesPrograms(response.data)
            } catch (_) {}
        }

        const getCities = async () => {
            try {
                const response = await apiPrivate.get('cities', {
                    signal: controller.signal
                })
                isMounted && setCities(response.data)
            } catch (_) {}
        }

        getRidesPrograms().then()
        getCities().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [apiPrivate])

    useEffect(() => {
        !rideId && setRidesProgram(null)
    }, [rideId])

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<RideProgramType>({
        mode: 'onTouched',
        resolver: yupResolver(rideProgramSchema)
    })

    const handleCreateRideProgram = async (rideProgram: RideProgramType): Promise<ApiErrorType | boolean> => {
        return apiPrivate
            .post('rides/programs', rideProgram)
            .then((response) => {
                const { data } = response
                setRidesPrograms((prevState) => {
                    return [...prevState, data]
                })
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleUpdateRideProgram = async (rideProgram: RideProgramType): Promise<ApiErrorType | boolean> => {
        return apiPrivate
            .put(`rides/programs/${rideId}`, rideProgram)
            .then((response) => {
                const { data } = response
                setRidesPrograms(ridesPrograms.filter((item) => item.id !== data.id))
                setRidesPrograms((prevState) => {
                    return [...prevState, data]
                })
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const createRideProgram = async (rideProgram: RideProgramType) => {
        const result = await handleCreateRideProgram(rideProgram)

        if (typeof result === 'object') {
            const { message } = result
            setHasLoggingError(message)
            return
        }
        reset()
        toast.success('Ride Program successfully created!')
    }

    const updateRideProgram = async (rideProgram: RideProgramType) => {
        const result = await handleUpdateRideProgram(rideProgram)

        if (typeof result === 'object') {
            const { message } = result
            setHasLoggingError(message)
            return
        }
        reset()
        toast.success('Ride Program successfully updated!')
        navigate('/rides/create')
    }

    const onSubmit = async (rideProgram: RideProgramType) => {
        isCreation ? await createRideProgram(rideProgram) : await updateRideProgram(rideProgram)
    }

    const deleteRideProgram = async (id: number) => {
        return apiPrivate
            .delete(`rides/programs/${id}`)
            .then((_) => {
                setRidesPrograms(ridesPrograms.filter((rideProgram) => rideProgram.id !== id))
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleDeleteRideProgram = async (id: number) => {
        const result = await deleteRideProgram(id)

        if (typeof result === 'object') {
            const { message } = result
            setHasLoggingError(message)
            toast.error(message)
            return
        }

        toast.success('Ride Program successfully deleted!')
    }

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Rides</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">My Rides</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid my-3">
                    <div className="card card-secondary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Add New Ride Program</h3>
                        </div>

                        <div className="card-body">
                            {hasLoggingError && (
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="alert alert-danger alert-dismissible fade show">
                                            <h5>
                                                <i className="icon fas fa-ban"></i> Error!
                                            </h5>
                                            <p>{hasLoggingError}</p>
                                            <button
                                                type="button"
                                                className="close"
                                                data-dismiss="alert"
                                                aria-label="Close"
                                                onClick={() => {
                                                    setHasLoggingError(false)
                                                    clearErrors()
                                                }}
                                            >
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="cityFromId">City From</label>
                                            <Select
                                                register={register}
                                                name="cityFromId"
                                                id="cityFromId"
                                                options={cities}
                                                style={{ width: '100%' }}
                                                // defaultValue={ridesProgram !== null ? ridesProgram.cityFrom.id : -1}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="cityToId">City To</label>
                                            <Select
                                                register={register}
                                                name="cityToId"
                                                id="cityToId"
                                                options={cities}
                                                style={{ width: '100%' }}
                                                // defaultValue={ridesProgram !== null ? ridesProgram.cityTo.id : -1}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group mb-3">
                                            <label htmlFor="day">Day</label>
                                            <Select
                                                register={register}
                                                name="day"
                                                id="day"
                                                options={DAYS}
                                                style={{ width: '100%' }}
                                                // defaultValue={ridesProgram !== null ? ridesProgram.day : DAYS[0].id}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="form-group mb-3">
                                            <label htmlFor="departureTime">Departure Time</label>
                                            <TextInput
                                                id="departureTime"
                                                name={'departureTime'}
                                                type={'time'}
                                                placeholder={'Departure Time'}
                                                register={register}
                                                defaultValue={ridesProgram ? ridesProgram.departureTime : '00:00'}
                                                error={errors.departureTime && errors.departureTime.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 my-3">
                                        <div className="row">
                                            <div className="col-md-6 my-2">
                                                {isCreation ? (
                                                    <button
                                                        type="reset"
                                                        className="btn btn-default btn-block"
                                                        onClick={() => {
                                                            reset()
                                                            clearErrors()
                                                        }}
                                                    >
                                                        Reset
                                                    </button>
                                                ) : (
                                                    <Link to="/rides/create" className="btn btn-default btn-block">
                                                        Cancel
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="col-md-6 my-2">
                                                <button type="submit" disabled={isSubmitting} className={`btn btn-${isCreation ? 'primary' : 'warning'} btn-block`}>
                                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                    {isCreation ? 'Create' : 'Update'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid my-5">
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">&nbsp;</h3>
                        </div>

                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '5%' }}>#</th>
                                                <th style={{ width: '5%' }}>Status</th>
                                                <th style={{ width: '20%' }}>From</th>
                                                <th style={{ width: '20%' }}>To</th>
                                                <th style={{ width: '10%' }}>Hour</th>
                                                <th style={{ width: '15%' }}>Car</th>
                                                <th style={{ width: '20%' }}>Driver</th>
                                                <th style={{ width: '5%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ridesPrograms.length > 0 ? (
                                                ridesPrograms.map((ride, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{ride.isActive ? <span className="badge badge-success">Disponivel</span> : <span className="badge badge-success">Indisponivel</span>}</td>
                                                        <td>{ride.cityFrom.name}</td>
                                                        <td>{ride.cityTo.name}</td>
                                                        <td>
                                                            <span className="text-bold">
                                                                {ride.day} <br /> {ride.departureTime}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="text-bold">{ride.car.licensePlate}</span> <br />
                                                            {ride.car.model} - {ride.car.color}
                                                        </td>
                                                        <td>
                                                            {ride.car.driver.firstName} {ride.car.driver.lastName}
                                                        </td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button type="button" className="btn btn-info btn-flat" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <button type="button" className="btn btn-info btn-flat dropdown-toggle dropdown-hover dropdown-icon" data-toggle="dropdown">
                                                                    <span className="sr-only">Toggle Dropdown</span>
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <Link className="dropdown-item" to="#">
                                                                        Show
                                                                    </Link>
                                                                    <Link
                                                                        className="dropdown-item"
                                                                        to={'/rides/edit/' + ride.id}
                                                                        onClick={() => {
                                                                            setRidesProgram(ride)
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </Link>

                                                                    <button className="dropdown-item" onClick={() => handleDeleteRideProgram(ride.id)}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={8} className="h4 text-center">
                                                        The list empty.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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
