import React from 'react'
import { useTitle } from '../../../hooks'
import { Link } from 'react-router-dom'

const RecoverPassword = () => {
    useTitle('Recover Password | Carona App')
    return (
        <>
            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
            <form action="#" method="post">
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Password" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Confirm Password" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-block">
                            Change password
                        </button>
                    </div>
                </div>
            </form>

            <p className="mt-3 mb-1">
                <Link to={'/auth/login'}>Login</Link>
            </p>
        </>
    )
}

export default RecoverPassword
