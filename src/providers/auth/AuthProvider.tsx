import React from 'react'

import { AuthContext } from '../../contexts'
import { useAuth } from '../../hooks'

const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading, user, handleLogout, handleLogin, handleForgotPassword, handleRecoverPassword } = useAuth()

    const value = {
        isAuthenticated,
        isLoading,
        user,
        handleLogin,
        handleLogout,
        handleForgotPassword,
        handleRecoverPassword
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
