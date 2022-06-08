import { useEffect, useState } from 'react'

import { RegisterType, User } from '../types'
import { Api } from '../services'

export function useAuth() {
    const USER_KEY: string = '@CaronaApp:User'
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const appUser = localStorage.getItem(USER_KEY)

        if (appUser) {
            const userData = JSON.parse(appUser) as User
            setUser(userData)
            Api.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`
            setIsAuthenticated(true)
        }

        setIsLoading(false)
    }, [])

    const handleLogin = async (email: string, password: string) => {
        const result = await Api.post('/auth/sign-in', { username: email, password })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err.response.data
            })

        const { data, status } = result

        if (status !== undefined && status === 200) {
            const userData = data as User
            setUser(userData)
            localStorage.setItem(USER_KEY, JSON.stringify(data))
            Api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
            setIsAuthenticated(true)

            return true
        }

        return result
    }

    const handleForgotPassword = async (email: string, resetUrl: string) => {
        return await Api.post('/users/forgot-password', { email }, { params: { resetUrl } })
            .then((_) => {
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleRecoverPassword = async (newPassword: string, token: string, loginUrl: string) => {
        return await Api.post('/users/reset-password', { newPassword }, { params: { token, loginUrl } })
            .then((_) => {
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleRegister = async (registerType: RegisterType, loginUrl: string) => {
        const customer = {
            user: {
                username: registerType.username,
                email: registerType.email,
                password: registerType.password
            },
            cpf: registerType.cpf,
            firstName: registerType.firstName,
            lastName: registerType.lastName,
            phoneNumber: registerType.phoneNumber
        }
        return await Api.post('/customers', customer, { params: { loginUrl } })
            .then((_) => {
                return true
            })
            .catch((err) => {
                return err.response.data
            })
    }

    const handleLogout = () => {
        localStorage.removeItem(USER_KEY)
        Api.defaults.headers.common['Authorization'] = ''
        setIsAuthenticated(false)
        setUser({ accessToken: '', email: '', id: 0, refreshToken: '', roles: [], username: '' })
    }

    return { isAuthenticated, isLoading, user, setUser, handleLogin, handleLogout, handleForgotPassword, handleRecoverPassword, handleRegister }
}
