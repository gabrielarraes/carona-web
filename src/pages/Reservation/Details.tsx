import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ReservationType } from '../../types'
import { useApiPrivate, useTitle } from '../../hooks'
import { Preloader } from '../../components'
import { PageNotFound } from '../Errors'

const ReservationDetails = () => {
    useTitle('Reservation Details | Carona App')
    const [reservation, setReservation] = useState<ReservationType | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { reservationId } = useParams()
    const apiPrivate = useApiPrivate()
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getReservation = async () => {
            try {
                setIsLoading(true)
                const response = await apiPrivate.get(`rides/reservations/${reservationId}`, {
                    signal: controller.signal
                })
                isMounted && setReservation(response.data)
                setIsLoading(false)
            } catch (_) {
                setIsLoading(false)
            }
        }

        getReservation().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [apiPrivate, reservationId])

    const deleteRideReservation = async (id: number) => {
        return apiPrivate
            .delete(`rides/reservations/${id}`)
            .then((_) => {
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleDeleteRideReservation = async (id: number) => {
        const result = await deleteRideReservation(id)

        if (typeof result === 'object') {
            const { message } = result
            toast.error(message)
            return
        }

        toast.success('Ride Reservation successfully deleted!')
        navigate(`/reservations`)
    }

    if (isLoading) {
        return <Preloader />
    }

    if (!reservation) {
        return <PageNotFound />
    }

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Reservations</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active">Reservation Details</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    Reservation Details{' '}
                                    <span className="text-bold">
                                        ({reservation.rideProgram.cityFrom.name} - {reservation.rideProgram.cityTo.name})
                                    </span>
                                </h3>
                            </div>
                            <div className="card-body">
                                <h5 className="mb-4">O preço vai ser divido entre cada ocupante da carona</h5>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-info">
                                                <i className="fas fa-car-side"></i>
                                            </span>

                                            <div className="info-box-content">
                                                <span className="info-box-number h6">{reservation.rideProgram.car.licensePlate}</span>
                                                <span className="info-box-text">
                                                    {reservation.rideProgram.car.model} - {reservation.rideProgram.car.color}
                                                </span>
                                                <span className="info-box-text">&nbsp;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-info">
                                                <i className="fas fa-user-alt"></i>
                                            </span>

                                            <div className="info-box-content">
                                                <span className="info-box-number h6">
                                                    {reservation.rideProgram.car.driver.firstName} {reservation.rideProgram.car.driver.lastName}
                                                </span>
                                                <span className="info-box-text">&nbsp;</span>
                                                <span className="info-box-text">&nbsp;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6 col-12">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-info">
                                                <i className="fas fa-city"></i>
                                            </span>

                                            <div className="info-box-content">
                                                <span className="info-box-number">
                                                    {reservation.rideProgram.cityFrom.name} - {reservation.rideProgram.cityTo.name}
                                                </span>
                                                <span className="info-box-text">
                                                    {reservation.rideProgram.day} - {reservation.rideProgram.departureTime}
                                                </span>
                                                <span className="info-box-text">R$ {reservation.rideProgram.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-danger" onClick={() => handleDeleteRideReservation(reservation.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationDetails
