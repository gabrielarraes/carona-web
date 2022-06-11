import { useApiPrivate, useTitle } from '../../hooks'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { ReservationType } from '../../types'
import { toast } from 'react-toastify'

const Reservation = () => {
    useTitle('My Reservation | Carona App')
    const [reservations, setReservations] = useState<ReservationType[]>([])
    const apiPrivate = useApiPrivate()
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getReservations = async () => {
            try {
                const response = await apiPrivate.get('rides/reservations', {
                    signal: controller.signal
                })
                isMounted && setReservations(response.data)
            } catch (_) {}
        }

        getReservations().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [apiPrivate])

    const deleteRideReservation = async (id: number) => {
        return apiPrivate
            .delete(`rides/reservations/${id}`)
            .then((_) => {
                setReservations(reservations.filter((reservation) => reservation.id !== id))
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
                                <li className="breadcrumb-item active">My Reservations</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid my-3">
                    <h2 className="text-center display-4 mb-5">Lista das minhas reservas</h2>
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
                                        {reservations.length > 0 ? (
                                            reservations.map((reservation, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {reservation.rideProgram.isActive ? (
                                                            <span className="badge badge-success">Disponivel</span>
                                                        ) : (
                                                            <span className="badge badge-success">Indisponivel</span>
                                                        )}
                                                    </td>
                                                    <td>{reservation.rideProgram.cityFrom.name}</td>
                                                    <td>{reservation.rideProgram.cityTo.name}</td>
                                                    <td>
                                                        <span className="text-bold">
                                                            {reservation.rideProgram.day} <br /> {reservation.rideProgram.departureTime}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="text-bold">{reservation.rideProgram.car.licensePlate}</span> <br />
                                                        {reservation.rideProgram.car.model} - {reservation.rideProgram.car.color}
                                                    </td>
                                                    <td>
                                                        {reservation.rideProgram.car.driver.firstName} {reservation.rideProgram.car.driver.lastName}
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => navigate(`/reservations/${reservation.id}`)}>
                                                            Details
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDeleteRideReservation(reservation.id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="h4 text-center">
                                                    The list is empty
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
export default Reservation
