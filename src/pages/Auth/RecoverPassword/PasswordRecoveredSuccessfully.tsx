import React from 'react'
import { Link } from 'react-router-dom'

import { useTitle } from '../../../hooks'

const PasswordRecoveredSuccessfully = () => {
    useTitle('Password recovered successfully | Carona App')

    return (
        <>
            <div className="text-center">
                <p>Your password has been reset successfully.</p>
                <div className="row mt-3">
                    <div className="col-12">
                        <Link to={'/auth/login'} className="btn btn-primary btn-block">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordRecoveredSuccessfully
