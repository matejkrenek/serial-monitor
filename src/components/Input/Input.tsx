import React from 'react'

interface InputProps {
    label?: string
    className?: string
    placeholder?: string
}

const Input: React.FC<InputProps> = ({ label, placeholder, className }) => {
    return (
        <div className={`w-full ${className}`}>
            {/* <label htmlFor=""></label> */}
            <input
                type="text"
                id="query"
                placeholder={placeholder}
                className={`h-8 px-3 py-2 rounded-md text-sm block w-full border text-black border-white bg-white focus:ring-teal-600 focus:border-teal-600 placeholder:text-gray-400`}
            />
        </div>
    )
}

export default React.memo(Input)
