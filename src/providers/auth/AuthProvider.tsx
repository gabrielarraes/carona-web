import React from 'react'

import { AuthContext } from '../../contexts'
import { useAuth } from '../../hooks'

const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading, user, handleLogout, handleLogin } = useAuth()

    const value = {
        isAuthenticated,
        handleLogin,
        isLoading,
        handleLogout,
        user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
