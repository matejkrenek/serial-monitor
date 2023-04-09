import React from 'react'
import { FaBug } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

interface TabsContextProps {
    active: number
}

interface TabHandler {
    value: any
    label: string
    canBeDeleted: boolean
}

interface TabsProps {
    value: number
    handlers: TabHandler[]
    className?: string
    onChange: (index: number) => any
    onDelete: (index: number) => any
    children: React.ReactNode
}

export const TabsContext = React.createContext<TabsContextProps | null>(null)

const Tabs: React.FC<TabsProps> = ({
    value = 0,
    handlers,
    className,
    onChange,
    onDelete,
    children,
}) => {
    return (
        <TabsContext.Provider value={{ active: value }}>
            <div className={`flex flex-col relative overflow-hidden ${className}`}>
                <div className="flex items-center bg-white px-4 py-2 border-b-2 border-teal-700">
                    <div className="flex items-center w-full">
                        <div className="flex items-center  flex-grow -mx-1">
                            {handlers.map((handler, index) => (
                                <div className="peer relative p-1" key={index}>
                                    <button
                                        type="button"
                                        className={`group rounded-md cursor-pointer border border-white px-2 py-2 h-8 mx-1 text-xs font-semibold hover:text-teal-700 focus:outline-teal-700 ${
                                            value === handler.value &&
                                            'text-white hover:text-white bg-teal-700 border-teal-700'
                                        }`}
                                        onClick={() =>
                                            handler.value !== value ? onChange(handler.value) : null
                                        }
                                    >
                                        {handler.label}
                                        {handler.canBeDeleted && (
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onDelete(handler.value)
                                                }}
                                                className="group-hover:flex hidden cursor-pointer absolute -top-0 -right-0 rounded-full p-0.5 bg-red-600 text-white items-center justify-center"
                                            >
                                                <FiX className="text-white  text-xs" />
                                            </span>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div>
                            <a
                                href="https://github.com/matejkrenek/serial-monitor/issues/new"
                                target="_blank"
                                className="flex items-center text-xs text-red-600 rounded-md px-2 py-1 transition-all hover:bg-red-100/50"
                            >
                                <FaBug className="mr-2" />
                                <span className="mt-0.5">Report bug</span>
                            </a>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </TabsContext.Provider>
    )
}

export default React.memo(Tabs)
