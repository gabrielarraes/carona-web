import { useEffect, useState } from 'react'
import { User } from '../types'
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
                return err
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

        return false
    }

    const handleForgotPassword = async (email: string, resetUrl: string) => {
        const result = await Api.post('/users/forgot-password', { email }, { params: { resetUrl } })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })
        const { status } = result

        return status !== undefined && status === 200
    }

    const handleRecoverPassword = async (newPassword: string, token: string, loginUrl: string) => {
        const result = await Api.post('/users/reset-password', { newPassword }, { params: { token, loginUrl } })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })
        const { status } = result

        return status !== undefined && status === 200
    }

    const handleLogout = () => {
        localStorage.removeItem(USER_KEY)
        Api.defaults.headers.common['Authorization'] = ''
        setIsAuthenticated(false)
        setUser(null)
    }

    return { isAuthenticated, isLoading, user, handleLogin, handleLogout, handleForgotPassword, handleRecoverPassword }
}
