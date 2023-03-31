import React from 'react'

interface ButtonProps {
    color?: 'primary' | 'secondary'
    className?: string
    onClick?: React.MouseEventHandler
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, color = 'primary', onClick, className }) => {
    const colorClassName = () => {
        if (color === 'primary') {
            return 'bg-teal-700 text-white hover:bg-teal-600 focus-visible:outline-teal-700'
        } else if (color === 'secondary') {
            return 'bg-gray-100 text-teal-700 hover:bg-gray-200 focus-visible:outline-teal-700'
        }
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-md cursor-pointer px-3 py-2 h-8 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${colorClassName()} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button
