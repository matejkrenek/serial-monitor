import React from 'react'

interface HeaderProps {
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="bg-teal-400 px-2 py-4">
            <div className="flex items-center w-full">{children}</div>
        </header>
    )
}

export default Header
