import React from 'react'

import { AuthContext } from '../../contexts'
import { useAuth } from '../../hooks'

const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading, user, setUser, handleLogout, handleLogin, handleForgotPassword, handleRecoverPassword, handleRegister } = useAuth()

    const value = {
        isAuthenticated,
        isLoading,
        user,
        setUser,
        handleLogin,
        handleLogout,
        handleForgotPassword,
        handleRecoverPassword,
        handleRegister
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
