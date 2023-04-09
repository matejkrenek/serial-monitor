import { SerialMonitorTab, TypeFromObjectPropertyPath } from '@/types'
import { setProperty } from '@/utils'
import React from 'react'

export const storeInitialState = {
    monitor: {
        ports: [],
        baudRates: [],
        isReady: false,
        autoScrolling: true,
        isLoading: false,
        activePort: null as string | null,
        activeBaudRate: null as number | null,
        alerts: [] as { type: 'error' | 'info' | 'warning' | 'success'; text: string }[],
        updatedPorts: false,
        activeTab: 1,
        isConnected: false,
        buffer: [] as { timestamp: string; data: string }[],
        tabs: [
            {
                id: 1,
                name: 'Monitor',
                type: 'monitor',
                canBeDeleted: false,
                data: [],
            },
        ] as SerialMonitorTab[],
    },
}

interface StoreContextProps {
    store: typeof storeInitialState
    setStore: <Property extends string>(
        prop: Property,
        value: TypeFromObjectPropertyPath<typeof storeInitialState, Property>
    ) => void
}

export const StoreContext = React.createContext<StoreContextProps>({
    store: storeInitialState,
    setStore: () => {},
})

const StoreProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [store, setStoreState] = React.useState(storeInitialState)

    const setStore: StoreContextProps['setStore'] = (prop, value) => {
        setStoreState((prev) => {
            return { ...setProperty(prop, value, prev) }
        })
    }

    return <StoreContext.Provider value={{ store, setStore }}>{children}</StoreContext.Provider>
}

export default StoreProvider
