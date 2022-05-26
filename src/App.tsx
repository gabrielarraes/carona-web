import React from 'react'
import AppRoutes from './Routes'
import { AuthProvider } from './providers'

function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    )
}

export default App
