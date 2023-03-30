import React from 'react'
import { TabsContext } from './Tabs'

interface TabProps {
    index: number
    className?: string
    children: React.ReactNode
}

const Tab: React.FC<TabProps> = ({ index, children, className }) => {
    const tabs = React.useContext(TabsContext)

    if (tabs?.active === index) {
        return (
            <div className={className} key={index}>
                {children}
            </div>
        )
    } else {
        return null
    }
}

export default Tab
