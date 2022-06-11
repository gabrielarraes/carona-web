import { FC, useContext } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import {
    CreateCar,
    CreateRide,
    ForgotPassword,
    ForgotPasswordRequestedSuccessfully,
    Home,
    Login,
    PageNotFound,
    PasswordRecoveredSuccessfully,
    RecoverPassword,
    Register,
    RegisteredSuccessfully,
    Reservation,
    ReservationDetails,
    RideDetails
} from './pages'
import { AppLayout, SecurityLayout } from './layouts'
import { AuthContext } from './contexts'
import { Preloader } from './components'

const PrivateOutlet: FC = ({ children }: any) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Preloader />
    }

    return isAuthenticated ? (
        <>
            {children}
            <Outlet />
        </>
    ) : (
        <Navigate to={'/auth/login'} replace />
    )
}

const PublicOutlet: FC = ({ children }: any) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Preloader />
    }

    return !isAuthenticated ? (
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
                        <Route path={'cars'}>
                            <Route path={'create'} element={<CreateCar />} />
                        </Route>
                        <Route path={'rides'}>
                            <Route path={':rideId'} element={<RideDetails />} />
                            <Route path={'create'} element={<CreateRide />} />
                            <Route path={'edit/:rideId'} element={<CreateRide />} />
                        </Route>
                        <Route path={'reservations'}>
                            <Route path={''} element={<Reservation />} />
                            <Route path={':reservationId'} element={<ReservationDetails />} />
                        </Route>
                    </Route>
                </Route>

                <Route element={<PublicOutlet />}>
                    <Route path={'/auth'} element={<SecurityLayout />}>
                        <Route path={'login'} element={<Login />} />
                        <Route path={'register'} element={<Register />} />
                        <Route path={'registered-successfully'} element={<RegisteredSuccessfully />} />
                        <Route path={'forgot-password'} element={<ForgotPassword />} />
                        <Route path={'forgot-password-requested-successfully'} element={<ForgotPasswordRequestedSuccessfully />} />
                        <Route path={'password-recovered-successfully'} element={<PasswordRecoveredSuccessfully />} />
                        <Route path={'recover-password'} element={<RecoverPassword />} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
