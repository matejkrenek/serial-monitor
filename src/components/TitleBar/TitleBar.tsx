import React, { useState } from 'react'
import { FiX, FiMinus, FiSquare } from 'react-icons/fi'

interface TitleBarProps {}

const TitleBar: React.FC<TitleBarProps> = () => {
    return (
        <div className="topbar h-8 bg-teal-400 overflow-hidden flex items-center justify-between flex-shrink-0">
            <div className=" p-4"></div>
            <div className="flex items-center h-full ">
                <button
                    onClick={() => window.app.minimize()}
                    tabIndex={-2}
                    className="toolbar-btn text-teal-700 outline-none text-sm p-2 h-full focus:bg-teal-100/20 hover:bg-teal-100/20"
                >
                    <FiMinus />
                </button>
                <button
                    onClick={() => window.app.maximize()}
                    tabIndex={-2}
                    className="toolbar-btn text-teal-700 outline-none text-sm p-2 h-full focus:bg-teal-100/20 hover:bg-teal-100/20"
                >
                    <FiSquare />
                </button>
                <button
                    onClick={() => window.app.close()}
                    tabIndex={-2}
                    className="toolbar-btn text-teal-700 outline-none text-sm p-2 h-full focus:bg-teal-100/20 hover:bg-teal-100/20"
                >
                    <FiX />
                </button>
            </div>
        </div>
    )
}

export default React.memo(TitleBar)
