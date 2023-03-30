import React from 'react'
import { TabsContext } from './Tabs'

interface TabProps {
    index: number
    children: React.ReactNode
}

const Tab: React.FC<TabProps> = ({ index, children }) => {
    const tabs = React.useContext(TabsContext)

    if (tabs?.active === index) {
        return <div key={index}>{children}</div>
    } else {
        return null
    }
}

export default Tab
