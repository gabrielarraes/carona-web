import { createContext } from 'react'
import { User, RegisterType, ApiErrorType } from '../../types'

export type AuthContextType = {
    isAuthenticated: boolean
    isLoading: boolean
    user: User | null
    handleLogin: (email: string, password: string) => Promise<ApiErrorType | boolean>
    handleForgotPassword: (email: string, resetUrl: string) => Promise<ApiErrorType | boolean>
    handleRecoverPassword: (email: string, token: string, resetUrl: string) => Promise<ApiErrorType | boolean>
    handleRegister: (registerType: RegisterType, loginUrl: string) => Promise<ApiErrorType | boolean>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
