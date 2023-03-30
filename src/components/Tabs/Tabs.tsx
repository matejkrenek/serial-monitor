import React from 'react'

interface TabsContextProps {
    active: number
}

interface TabHandler {
    value: any
    label: string
}

interface TabsProps {
    value: number
    handlers: TabHandler[]
    className?: string
    children: React.ReactNode
}

export const TabsContext = React.createContext<TabsContextProps | null>(null)

const Tabs: React.FC<TabsProps> = ({ value = 0, handlers, className, children }) => {
    const [active, setActive] = React.useState(value)

    return (
        <TabsContext.Provider value={{ active: active }}>
            <div className={`flex flex-col relative overflow-hidden ${className}`}>
                <div className="flex items-center bg-white px-4 py-2 border-b-2 border-teal-700">
                    <div className=" -mx-1">
                        {handlers.map((handler, index) => (
                            <button
                                type="button"
                                key={index}
                                className={`rounded-md cursor-pointer border border-white px-2 py-2 h-8 mx-1 text-xs font-semibold hover:text-teal-700 focus:outline-teal-700 ${
                                    active === handler.value &&
                                    'text-white hover:text-white bg-teal-700 border-teal-700'
                                }`}
                                onClick={() => setActive(handler.value)}
                            >
                                {handler.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-4 flex-grow overflow-auto">{children}</div>
            </div>
        </TabsContext.Provider>
    )
}

export default React.memo(Tabs)
