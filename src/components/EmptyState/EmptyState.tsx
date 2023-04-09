import React from 'react'
import { FiMonitor } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'

interface EmptyStateProps {
    icon: IconType
    message: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center text-3xl text-gray-300">
                {React.createElement(icon, {
                    className: 'text-6xl',
                })}
                <h1 className="mt-4">{message}</h1>
            </div>
        </div>
    )
}

export default React.memo(EmptyState)
