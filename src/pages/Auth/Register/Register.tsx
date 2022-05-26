import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateCPF } from 'validations-br'

import { useTitle } from '../../../hooks'
import { TextInput } from '../../../components'
import { AuthContext } from '../../../contexts'
import { ApiErrorType } from '../../../types'

type RegisterType = {
    username: string
    email: string
    password: string
    cpf: string
    firstName: string
    lastName: string
    phoneNumber: string
}

const VALID_PASSWORD = new RegExp('^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$&*+=%]).{8,25}.*$')
const VALID_CPF = new RegExp('(^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$)|(^\\d{11})')

const registerSchema = Yup.object({
    username: Yup.string().trim().min(6).required(),
    email: Yup.string().email().trim().required(),
    password: Yup.string().min(8).matches(VALID_PASSWORD, 'The password must contain at least one lower case, one upper case, one number and one special character').required(),
    cpf: Yup.string().trim().min(11).matches(VALID_CPF, 'CPF valid format: 000.000.000-00 or 12345678900').required(),
    firstName: Yup.string().min(3).required(),
    lastName: Yup.string().min(3).required(),
    phoneNumber: Yup.string().min(6).required()
}).required()

const Register = () => {
    useTitle('Register | Carona App')
    const navigate = useNavigate()
    const [hasLoggingError, setHasLoggingError] = useState<boolean | string>(false)
    const { handleRegister } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors }
    } = useForm<RegisterType>({
        mode: 'onTouched',
        resolver: yupResolver(registerSchema)
    })

    const onSubmit = async (registerType: RegisterType) => {
        const loginUrl = window.location.origin + '/auth/login'
        const isValidCPF = validateCPF(registerType.cpf)
        !isValidCPF && setError('cpf', { type: 'custom', message: 'Invalid CPF' })
        const result = (await handleRegister(registerType, loginUrl)) as ApiErrorType | boolean

        if (typeof result === 'object') {
            const { message } = result
            setHasLoggingError(message)
        }

        typeof result === 'boolean' && navigate('/auth/registered-successfully')
    }

    return (
        <>
            {hasLoggingError && (
                <div className="w-100 p-1 mr-auto ml-auto">
                    <div className="alert alert-danger alert-dismissible fade show">
                        <h5>
                            <i className="icon fas fa-ban"></i> Error!
                        </h5>
                        <p>{hasLoggingError}</p>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setHasLoggingError(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )}

            <p className="login-box-msg">Register a new membership</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                    <TextInput name={'username'} type={'text'} placeholder={'Username'} icon={'fas fa-user'} register={register} error={errors.username && errors.username.message} />
                </div>
                <div className="input-group mb-3">
                    <TextInput name={'email'} type={'email'} placeholder={'example@domain.com'} icon={'fas fa-envelope'} register={register} error={errors.email && errors.email.message} />
                </div>
                <div className="input-group mb-3">
                    <TextInput name={'password'} type={'password'} placeholder={'Password'} icon={'fas fa-lock'} register={register} error={errors.password && errors.password.message} />
                </div>

                <div className="input-group mb-3">
                    <TextInput name={'cpf'} type={'text'} placeholder={'Your CPF'} icon={'fas fa-key'} register={register} error={errors.cpf && errors.cpf.message} />
                </div>
                <div className="input-group mb-3">
                    <TextInput name={'firstName'} type={'text'} placeholder={'First Name'} icon={'fas fa-user'} register={register} error={errors.firstName && errors.firstName.message} />
                </div>
                <div className="input-group mb-3">
                    <TextInput name={'lastName'} type={'text'} placeholder={'Last Name'} icon={'fas fa-user'} register={register} error={errors.lastName && errors.lastName.message} />
                </div>
                <div className="input-group mb-3">
                    <TextInput
                        name={'phoneNumber'}
                        type={'text'}
                        placeholder={'Your phone number'}
                        icon={'fas fa-phone'}
                        register={register}
                        error={errors.phoneNumber && errors.phoneNumber.message}
                    />
                </div>

                <div className="row mt-3">
                    <div className="col-12">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-5">
                <Link to={'/auth/login'} className="text-center">
                    I already have a membership
                </Link>
            </div>
        </>
    )
}

export default Register
