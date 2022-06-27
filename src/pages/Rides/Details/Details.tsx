import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useApiPrivate, useTitle } from '../../../hooks'
import { Ride } from '../../../types'
import { PageNotFound } from '../../Errors'
import { Preloader } from '../../../components'

const Details = () => {
    useTitle('Ride Details | Carona App')
    const [carRide, setCarRide] = useState<Ride | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { rideId } = useParams()
    const apiPrivate = useApiPrivate()

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()

        const getCarRide = async () => {
            try {
                setIsLoading(true)
                const response = await apiPrivate.get(`rides/${rideId}`, {
                    signal: controller.signal
                })
                isMounted && setCarRide(response.data)
                setIsLoading(false)
            } catch (_) {
                setIsLoading(false)
            }
        }

        getCarRide().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [apiPrivate, rideId])

    if (isLoading) {
        return <Preloader />
    }

    if (!carRide) {
        return <PageNotFound />
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
                                <li className="breadcrumb-item active">Ride Details</li>
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
                                <h3 className="card-title">Ride Details</h3>
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
                                                <span className="info-box-number h6">{carRide.car.licensePlate}</span>
                                                <span className="info-box-text">
                                                    {carRide.car.model} - {carRide.car.color}
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
                                                    {carRide.car.driver.firstName} {carRide.car.driver.lastName}
                                                </span>
                                                <span className="info-box-text">
                                                    Phone Number: {carRide.car.driver.phoneNumber}
                                                </span>                    
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
                                                    {carRide.cityFrom.name} ({carRide.referencePoint}) - {carRide.cityTo.name} ({carRide.destinationPoint})
                                                </span>
                                                <span className="info-box-text">
                                                    {carRide.day} - {carRide.departureTime}
                                                </span>
                                                <span className="info-box-text">R$ {carRide.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details
