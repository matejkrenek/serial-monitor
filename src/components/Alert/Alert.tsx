import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi'

interface AlertProps {
    type?: 'error' | 'info' | 'warning' | 'success'
    text: string
    className?: string
}

const Alert: React.FC<AlertProps> = ({ type = 'error', text, className }) => {
    const wrapperClassName = () => {
        if (type === 'error') {
            return 'bg-red-500 text-white'
        } else if (type === 'info') {
            return 'bg-blue-500 text-white'
        } else if (type === 'warning') {
            return 'bg-orange-500 text-white'
        } else if (type === 'success') {
            return 'bg-green-500 text-white'
        }
    }

    const buttonClassName = () => {
        if (type === 'error') {
            return 'hover:bg-red-100/30 focus-visible:outline-red-100/30'
        } else if (type === 'info') {
            return 'hover:bg-blue-100/30 focus-visible:outline-blue-100/30'
        } else if (type === 'warning') {
            return 'hover:bg-orange-100/30 focus-visible:outline-orange-100/30'
        } else if (type === 'success') {
            return 'hover:bg-green-100/30 focus-visible:outline-green-100/30'
        }
    }

    const icon = () => {
        if (type === 'error') {
            return <FiAlertCircle className="text-lg mr-2" />
        } else if (type === 'info') {
            return <FiInfo className="text-lg mr-2" />
        } else if (type === 'warning') {
            return <FiAlertTriangle className="text-lg mr-2" />
        } else if (type === 'success') {
            return <FiCheckCircle className="text-lg mr-2" />
        }
    }

    return ReactDOM.createPortal(
        <div
            className={`rounded-lg px-6 py-3 flex items-center justify-between max-w-2xl mx-auto ${wrapperClassName()} ${className}`}
        >
            <div className="flex items-center">
                {icon()}
                <p className="text-base">{text}</p>
            </div>
            <div>
                <button
                    className={`rounded-md px-2 py-1 text-xs uppercase font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonClassName()}`}
                >
                    close
                </button>
            </div>
        </div>,
        document.getElementById('portal') as HTMLElement
    )
}

export default Alert
