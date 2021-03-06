import React from 'react'
import { Link } from 'react-router-dom'

import { useTitle } from '../../../hooks'

const ForgotPasswordRequestedSuccessfully = () => {
    useTitle('Forgot password requested successfully | Carona App')
    return (
        <>
            <div className="text-center">
                <p>An email has been sent that contains a link that you can click to reset your password. This link will expire in 12 hour(s).</p>
                <p>
                    If you don't receive an email please check your spam folder or <Link to="/auth/forgot-password">try again</Link>.
                </p>

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

export default ForgotPasswordRequestedSuccessfully
