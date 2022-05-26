import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useTitle } from '../../../hooks'
import { AuthContext } from '../../../contexts'
import { TextInput } from '../../../components'

type ForgotPasswordType = {
    email: string
}

const forgotPasswordSchema = Yup.object({
    email: Yup.string().email().trim().required()
}).required()

const ForgotPassword = () => {
    useTitle('Forgot Password | Carona App')
    const navigate = useNavigate()
    const [hasLoggingError, setHasLoggingError] = useState<boolean>(false)
    const { handleForgotPassword } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<ForgotPasswordType>({
        mode: 'onTouched',
        resolver: yupResolver(forgotPasswordSchema)
    })

    const onSubmit = async ({ email }: ForgotPasswordType) => {
        const resetUrl = window.location.origin + '/auth/recover-password?token='
        const isSent = await handleForgotPassword(email, resetUrl)

        isSent ? navigate('/auth/forgot-password-requested-successfully') : setHasLoggingError(true)
    }

    return (
        <>
            {hasLoggingError && (
                <div className="w-100 p-1 mr-auto ml-auto">
                    <div className="alert alert-danger alert-dismissible fade show">
                        <h5>
                            <i className="icon fas fa-ban"></i> Error!
                        </h5>
                        <p>Email not found</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setHasLoggingError(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}

            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <TextInput name={'email'} type={'text'} placeholder={'example@domain.com'} icon={'fas fa-envelope'} register={register} error={errors.email && errors.email.message} />
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Request new password
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

export default ForgotPassword
