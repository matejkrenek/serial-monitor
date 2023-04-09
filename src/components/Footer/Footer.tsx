import React from 'react'

interface FooterProps {
    children: React.ReactNode
}

const Footer: React.FC<FooterProps> = ({ children }) => {
    return (
        <footer className="bg-teal-400 px-2 py-4 overflow-x-auto flex-shrink-0">
            <div className="flex items-center w-full justify-end">{children}</div>
        </footer>
    )
}

export default Footer
