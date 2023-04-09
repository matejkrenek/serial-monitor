import React from 'react'

interface CheckboxProps {
    name: string
    id: string
    checked?: boolean
    onChange?: React.ChangeEventHandler
    label?: string
    className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({ name, id, label, checked, onChange, className }) => {
    return (
        <div className={`${className}`}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                id={id}
                className="mx-2 rounded border-teal-700/70 text-teal-700 focus:ring-offset-0 focus:ring-3 focus:ring-teal-700/30 -mt-0.5"
            />
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm text-teal-700 font-medium capitalize select-none"
                >
                    {label}
                </label>
            )}
        </div>
    )
}

export default React.memo(Checkbox)
