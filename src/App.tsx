import React from 'react'
import { ToastContainer } from 'react-toastify'

import AppRoutes from './Routes'
import { AuthProvider } from './providers'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
    return (
        <AuthProvider>
            <>
                <AppRoutes />
                <ToastContainer />
            </>
        </AuthProvider>
    )
}

export default App
