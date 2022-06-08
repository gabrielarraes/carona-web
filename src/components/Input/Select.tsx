import React, { SelectHTMLAttributes } from 'react'

export type SelectOptionType = {
    id: string | number
    name: string | number
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    error?: string
    options: SelectOptionType[]
    register: any
}

const Select = ({ error, register, options, ...props }: SelectProps) => {
    const selectClassName = `form-control ${error && 'is-invalid'}`
    const feedbackId = props.name + '-error-feedback'

    return (
        <>
            <select {...register(props.name)} {...props} className={selectClassName}>
                {options.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.name}
                    </option>
                ))}
            </select>

            {error && (
                <div id={feedbackId} className="invalid-feedback">
                    {error}
                </div>
            )}
        </>
    )
}

export default Select
