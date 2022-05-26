export type User = {
    id: number
    username: string
    email: string
    roles: string[]
    accessToken: string
    refreshToken: string
}

export type RegisterType = {
    username: string
    email: string
    password: string
    cpf: string
    firstName: string
    lastName: string
    phoneNumber: string
}
