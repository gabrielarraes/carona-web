import { createContext } from 'react'
import { User } from '../../types'

export type AuthContextType = {
    isAuthenticated: boolean
    isLoading: boolean
    user: User | null
    handleLogin: (email: string, password: string) => Promise<boolean>
    handleForgotPassword: (email: string, resetUrl: string) => Promise<boolean>
    handleRecoverPassword: (email: string, token: string, resetUrl: string) => Promise<boolean>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
