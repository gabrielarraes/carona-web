import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string
    error?: string
    register: any
}

const TextInput = ({ icon, error, register, ...props }: InputProps) => {
    const inputClassName = `form-control ${error && 'is-invalid'}`
    const feedbackId = props.name + '-error-feedback'

    return (
        <>
            <input type={props.type} className={inputClassName} placeholder={props.placeholder} {...props} {...register(props.name)} />
            {icon && (
                <div className="input-group-append">
                    <div className="input-group-text">
                        <span className={icon}></span>
                    </div>
                </div>
            )}

            {error && (
                <div id={feedbackId} className="invalid-feedback">
                    {error}
                </div>
            )}
        </>
    )
}

export default TextInput
