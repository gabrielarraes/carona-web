import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { Ride } from '../../types'
import { City } from '../../types/Ride'
import { Select, SelectOptionType, TextInput } from '../../components'
import { useApiPrivate, useTitle } from '../../hooks'

type SearchType = {
    from: number
    to: number
    day?: string
    time?: string
}

const DAYS: SelectOptionType[] = [
    {
        id: 'todos-dias',
        name: 'Todos'
    },
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

const searchSchema = Yup.object({
    from: Yup.number().required(),
    to: Yup.number().required(),
    day: Yup.string(),
    time: Yup.string()
})

const Home = () => {
    useTitle('Home | Carona App')
    const [carsRides, setCarsRides] = useState<Ride[]>([])
    const [cities, setCities] = useState<City[]>([])
    const apiPrivate = useApiPrivate()
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getCarsRides = async () => {
            try {
                const response = await apiPrivate.get('rides', {
                    signal: controller.signal
                })
                isMounted && setCarsRides(response.data)
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

        getCarsRides().then()
        getCities().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [apiPrivate])

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm<SearchType>({
        mode: 'onTouched',
        resolver: yupResolver(searchSchema)
    })

    const getAllCarsRides = async () => {
        try {
            const response = await apiPrivate.get('rides')
            setCarsRides(response.data)
        } catch (_) {}
    }

    const handleSearchRideProgram = async (searchParams: SearchType): Promise<Ride[] | boolean> => {
        console.log(searchParams)
        return apiPrivate
            .get('rides/search', { params: searchParams })
            .then((response) => {
                return response.data
            })
            .catch((_) => {
                return false
            })
    }

    const onSubmit = async (searchType: SearchType) => {
        const { from, to, day, time } = searchType
        let params: SearchType = { from, to }

        if (day !== 'todos-dias') {
            params = { ...params, day }
        }

        if (time !== '') {
            params = { ...params, time }
        }

        const results = await handleSearchRideProgram(params)

        if (typeof results === 'boolean') {
            toast.error('An error occurred during the search, try again.')
            return
        }

        setCarsRides(results)
    }

    const handleReset = async () => {
        reset()
        await getAllCarsRides()
    }

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Carona App</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="#">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Home</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid my-5">
                    <h2 className="text-center display-4 mb-5">Lista de caronas disponiveis</h2>
                    <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>City from</label>
                                    <Select register={register} name="from" id="cityFromId" options={cities} style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>City to</label>
                                    <Select register={register} name="to" id="cityToId" options={cities} style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>Day</label>
                                    <Select register={register} name="day" id="day" options={DAYS} style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>Time</label>
                                    <TextInput id="departureTime" name="time" type={'time'} placeholder={'Departure Time'} register={register} />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4 my-2">
                                <button type="reset" className="btn btn-default btn-block">
                                    Reset
                                </button>
                            </div>
                            <div className="col-md-4 my-2">
                                <button className="btn btn-block btn-primary" disabled={isSubmitting}>
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <br />
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
                                            <th style={{ width: '5%' }} colSpan={2}>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carsRides.length > 0 ? (
                                            carsRides.map((ride, index) => (
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
                                                        <button className="btn btn-primary" onClick={() => navigate(`/rides/${ride.id}`)}>
                                                            Details
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-success">Reservar</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="h4 text-center">
                                                    No result found!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
