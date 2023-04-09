import React from 'react'
import { useStore } from '@/hooks'
import { Chart, MonitorTab, Tab, Table, Tabs } from '@/components'

const Monitor: React.FC = () => {
    const { store, setStore } = useStore()
    const containerRef = React.createRef<HTMLDivElement>()

    const getTabHandlers = () => {
        return store.monitor.tabs.map((tab) => ({
            value: tab.id,
            label: tab.name,
            canBeDeleted: tab.canBeDeleted,
        }))
    }

    const removeTab = (index: number) => {
        const tabToDelete = store.monitor.tabs.find((tab) => tab.id === index) as any
        const prevTabId = store.monitor.tabs[store.monitor.tabs.indexOf(tabToDelete) - 1].id

        setStore('monitor.activeTab', prevTabId)
        setStore(
            'monitor.tabs',
            store.monitor.tabs.filter((tab) => tab.id !== tabToDelete.id)
        )
        setStore('monitor.buffer', [])
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (containerRef.current && store.monitor.autoScrolling) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight
            }
        }, 0)

        return () => clearTimeout(timer)
    }, [containerRef])

    return (
        <Tabs
            value={store.monitor.activeTab}
            className="flex-grow overflow-x-auto"
            handlers={getTabHandlers()}
            onChange={(index) => setStore('monitor.activeTab', index)}
            onDelete={(index) => removeTab(index)}
        >
            <div ref={containerRef} className="bg-white flex-grow overflow-auto">
                {store.monitor.tabs.map((tab) => (
                    <Tab className="h-full" index={tab.id} key={tab.id}>
                        <MonitorTab tab={tab} />
                    </Tab>
                ))}
            </div>
        </Tabs>
    )
}

export default Monitor
