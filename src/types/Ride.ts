export type City = {
    id: number
    name: string
}

export type Address = {
    state: string | null
    city: string | null
    address: string | null
    postalCode: string | null
}

export type Driver = {
    id: number
    createdAt: string
    updatedAt: string | null
    cpf: string
    email: string
    firstName: string
    lastName: string
    gender: string | null
    phoneNumber: string
    avatar: string | null
    address: Address
}

export type Car = {
    id: number
    createdAt: string
    updatedAt: string | null
    model: string
    licensePlate: string
    color: string
    nbSeats: 2
    driver: Driver
}

export type Ride = {
    id: number
    createdAt: string
    updatedAt: string | null
    cityFrom: City
    cityTo: City
    car: Car
    day: string
    departureTime: string
    isActive: boolean
    isFull: boolean
}
