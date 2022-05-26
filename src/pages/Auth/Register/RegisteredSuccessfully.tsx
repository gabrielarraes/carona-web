import React from 'react'
import { Link } from 'react-router-dom'

import { useTitle } from '../../../hooks'

const RegisteredSuccessfully = () => {
    useTitle('Registered successfully | Carona App')
    return (
        <>
            <div className="text-center">
                <p>Your account has been created successfully. Please check your email to confirm. This link will expire in 12 hour(s).</p>
                <p>If you already confirm your email, your can log in.</p>
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

export default RegisteredSuccessfully
