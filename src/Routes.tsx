import { FC } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import { ForgotPassword, Home, Login, PageNotFound, RecoverPassword, Register } from './pages'
import { AppLayout, SecurityLayout } from './layouts'

const PrivateOutlet: FC = ({ children }: any) => {
    // const user = { id: 1 }
    const user = null

    return user ? (
        <>
            {children}
            <Outlet />
        </>
    ) : (
        <Navigate to={'/auth/login'} replace />
    )
}

const PublicOutlet: FC = ({ children }: any) => {
    // const user = { id: 1 }
    const user = null

    return !user ? (
        <>
            {children}
            <Outlet />
        </>
    ) : (
        <Navigate to={'/'} replace />
    )
}

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<PrivateOutlet />}>
                    <Route path={'/'} element={<AppLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Route>

                <Route element={<PublicOutlet />}>
                    <Route path={'/auth'} element={<SecurityLayout />}>
                        <Route path={'login'} element={<Login />} />
                        <Route path={'register'} element={<Register />} />
                        <Route path={'forgot-password'} element={<ForgotPassword />} />
                        <Route path={'recover-password'} element={<RecoverPassword />} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
