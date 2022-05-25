import React from 'react'
import { useTitle } from '../../../hooks'
import { Link } from 'react-router-dom'

const Register = () => {
    useTitle('Register | Carona App')
    return (
        <>
            <p className="login-box-msg">Register a new membership</p>
            <form action="#" method="post">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Full name" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-user"></span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Email" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Password" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Retype password" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="icheck-primary">
                            <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
                            <label htmlFor="agreeTerms">I agree to the terms</label>
                        </div>
                    </div>
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary btn-block">
                            Register
                        </button>
                    </div>
                </div>
            </form>
            <div className="social-auth-links text-center">
                {/*            <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i>
                Sign up using Facebook
            </a>
            <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i>
                Sign up using Google+
            </a>*/}
            </div>
            <Link to={'/auth/login'} className="text-center">
                I already have a membership
            </Link>
        </>
    )
}

export default Register
