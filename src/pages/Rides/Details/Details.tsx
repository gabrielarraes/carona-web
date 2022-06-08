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
                console.log({ carRide, isLoading })
                const response = await apiPrivate.get(`rides/${rideId}`, {
                    signal: controller.signal
                })
                isMounted && setCarRide(response.data)
                setIsLoading(false)
                console.log({ carRide, isLoading })
            } catch (_) {
                setIsLoading(false)
            }
            console.log({ carRide, isLoading })
        }

        getCarRide().then()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [apiPrivate, carRide, isLoading, rideId])

    if (isLoading) {
        return <Preloader />
    }

    console.log({ carRide, isLoading })

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
        </>
    )
}

export default Details
