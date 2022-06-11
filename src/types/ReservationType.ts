import { Ride } from './Ride'
import { Driver as Customer } from './Ride'

export type ReservationType = {
    id: number
    createdAt: string
    updatedAt: string | null
    rideProgram: Ride
    customer: Customer
}
