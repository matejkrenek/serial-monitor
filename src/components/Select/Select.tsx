import React from 'react'

interface SelectOption {
    label: string
    value: any
}

interface SelectProps {
    label?: string
    className?: string
    placeholder?: string
    value?: string
    onChange?: React.ChangeEventHandler
    options: SelectOption[]
}

const Select: React.FC<SelectProps> = ({
    label,
    placeholder,
    value,
    options,
    onChange,
    className,
}) => {
    return (
        <div className={`w-full ${className}`}>
            {/* <label htmlFor=""></label> */}
            <select
                onChange={onChange}
                value={value}
                className="h-8 px-3 leading-4 py-2 rounded-md cursor-pointer text-sm block w-full border text-black border-white bg-white focus:ring-teal-600 focus:border-teal-600 placeholder:text-gray-400"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.memo(Select)
