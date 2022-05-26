import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useTitle } from '../../../hooks'
import { TextInput } from '../../../components'
import { AuthContext } from '../../../contexts'

function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
}

type RecoverPasswordType = {
    newPassword: string
    passwordConfirmation: string
}

const recoverPasswordSchema = Yup.object({
    newPassword: Yup.string().trim().required(),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
}).required()

const RecoverPassword = () => {
    useTitle('Recover Password | Carona App')
    const navigate = useNavigate()
    const query = useQuery()
    const [hasLoggingError, setHasLoggingError] = useState<boolean>(false)
    const { handleRecoverPassword, handleLogout } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<RecoverPasswordType>({
        mode: 'onTouched',
        resolver: yupResolver(recoverPasswordSchema)
    })

    const onSubmit = async ({ newPassword }: RecoverPasswordType) => {
        const token = query.get('token') as string
        const loginUrl = window.location.origin + '/auth/login'
        const isSent = await handleRecoverPassword(newPassword, token, loginUrl)

        if (isSent) {
            handleLogout()
            navigate('/auth/login')
        } else {
            setHasLoggingError(true)
        }
    }

    return (
        <>
            {hasLoggingError && (
                <div className="w-100 p-1 mr-auto ml-auto">
                    <div className="alert alert-danger alert-dismissible fade show">
                        <h5>
                            <i className="icon fas fa-ban"></i> Error!
                        </h5>
                        <p>An error occurred during the recover password</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setHasLoggingError(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}

            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <TextInput name={'newPassword'} type={'password'} placeholder={'New password'} icon={'fas fa-lock'} register={register} error={errors.newPassword && errors.newPassword.message} />
                </div>
                <div className="input-group mb-3">
                    <TextInput
                        name={'passwordConfirmation'}
                        type={'password'}
                        placeholder={'Confirm password'}
                        icon={'fas fa-lock'}
                        register={register}
                        error={errors.passwordConfirmation && errors.passwordConfirmation.message}
                    />
                </div>
                <div className="row">
                    <div className="col-12">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
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
