import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const SecurityLayout = () => {
    return (
        <div className="login-page register-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <Link to={'/'} className="h1">
                            <b>Carona</b>APP
                        </Link>
                    </div>
                    <div className="card-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecurityLayout
