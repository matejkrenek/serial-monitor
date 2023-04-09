import React from 'react'
import {
    Alert,
    Button,
    Checkbox,
    Footer,
    Header,
    Input,
    Monitor,
    Select,
    TitleBar,
} from './components'
import { useStore } from './hooks'

const App: React.FC = () => {
    const { store, setStore } = useStore()

    React.useEffect(() => {
        const [tabs, activeTab] = parseSerialMonitorBuffer(store.monitor.buffer)

        tabs.forEach((tab: any) => {
            const actualTab = store.monitor.tabs.find((_tab) => _tab.name === tab.name)

            if (!actualTab) {
                setStore('monitor.tabs', [
                    ...store.monitor.tabs,
                    {
                        id: store.monitor.tabs[store.monitor.tabs.length - 1].id + 1,
                        name: tab.name,
                        type: tab.type,
                        canBeDeleted: true,
                        data: tab.data,
                    },
                ])
            } else {
                setStore<any>(`monitor.tabs.${store.monitor.tabs.indexOf(actualTab)}`, {
                    id: actualTab.id,
                    name: actualTab.name,
                    type: actualTab.type,
                    canBeDeleted: actualTab.canBeDeleted,
                    data: tab.data,
                })
            }
        })

        setStore('monitor.tabs.0.data', store.monitor.buffer)
    }, [store.monitor.buffer])

    React.useEffect(() => {
        if (store.monitor.isReady) {
            setStore('monitor.alerts', [
                ...store.monitor.alerts,
                {
                    type: 'info',
                    text: 'List of available ports updated',
                },
            ])
        }
    }, [store.monitor.ports])

    React.useEffect(() => {
        window.monitor.onPorts((_: any, data: any) => {
            setStore(
                'monitor.ports',
                data.map((port: any) => ({
                    value: port.path,
                    label: port.path,
                }))
            )

            if (
                !store.monitor.activePort ||
                !data.find((port: any) => port.path === store.monitor.activePort)
            ) {
                setStore('monitor.activePort', data[0].path)
            }
            setStore('monitor.isReady', true)
        })
        window.monitor.onBaudRates((_: any, data: any) => {
            setStore(
                'monitor.baudRates',
                data.map((baudRate: any) => ({
                    value: baudRate,
                    label: baudRate,
                }))
            )

            if (
                !store.monitor.activeBaudRate ||
                !data.find((baudRate: any) => baudRate === store.monitor.activeBaudRate)
            ) {
                setStore('monitor.activeBaudRate', data[0])
            }
        })
        window.monitor.onOpen((_: any, data: any) => {
            setStore('monitor.alerts', [
                ...store.monitor.alerts,
                {
                    type: 'success',
                    text: `Port <strong>${store.monitor.activePort}</strong> was successfully opened on <strong>${store.monitor.activeBaudRate}</strong> baudrate`,
                },
            ])
            setStore('monitor.isLoading', false)
            setStore('monitor.isConnected', true)
        })
        window.monitor.onClose((_: any, data: any) => {
            setStore('monitor.alerts', [
                ...store.monitor.alerts,
                {
                    type: 'success',
                    text: `Port <strong>${store.monitor.activePort}</strong> was successfully closed`,
                },
            ])
            setStore('monitor.isLoading', false)
            setStore('monitor.isConnected', false)
        })
        window.monitor.onData((_: any, data: any) => {
            setStore('monitor.buffer', [
                ...store.monitor.buffer,
                {
                    timestamp: data.timestamp,
                    data: data.data,
                },
            ])
        })
        window.monitor.onError((_: any, data: any) => {
            setStore('monitor.isLoading', false)
            setStore('monitor.alerts', [
                ...store.monitor.alerts,
                {
                    type: 'error',
                    text: data,
                },
            ])
        })
        const timer = setInterval(() => {
            window.monitor.refreshPorts()
        }, 100)

        window.monitor.refreshPorts()
        window.monitor.refreshBaudRates()

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div className=" h-full flex flex-col relative overflow-x-hidden">
                <TitleBar />
                <Monitor />
                <Footer>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <Checkbox
                                name="autoscroll"
                                id="autoscroll"
                                label="autoscroll"
                                checked={store.monitor.autoScrolling}
                                onChange={(e: any) =>
                                    setStore('monitor.autoScrolling', e.target.checked)
                                }
                                className="mx-2"
                            />
                        </div>
                        <div className="flex">
                            <Select
                                className="mx-2 min-w-[8rem] max-w-[12rem]"
                                value={store.monitor.activePort}
                                disabled={store.monitor.isConnected || store.monitor.isLoading}
                                onChange={(e: any) =>
                                    setStore('monitor.activePort', e.target.value)
                                }
                                options={store.monitor.ports}
                            />
                            <Select
                                className="mx-2 min-w-[8rem] max-w-[12rem]"
                                value={store.monitor.activeBaudRate}
                                disabled={store.monitor.isConnected || store.monitor.isLoading}
                                onChange={(e: any) =>
                                    setStore('monitor.activeBaudRate', parseInt(e.target.value))
                                }
                                options={store.monitor.baudRates}
                            />
                            {!store.monitor.isConnected && (
                                <Button
                                    className="mx-2 min-w-[6rem]"
                                    loading={store.monitor.isLoading}
                                    onClick={() => {
                                        setStore('monitor.isLoading', true)
                                        window.monitor.connect({
                                            port: store.monitor.activePort,
                                            baudRate: store.monitor.activeBaudRate,
                                        })
                                    }}
                                >
                                    Connect
                                </Button>
                            )}
                            {store.monitor.isConnected && (
                                <>
                                    <Button
                                        className="mx-2 min-w-[6rem]"
                                        color="primary"
                                        loading={store.monitor.isLoading}
                                        onClick={() => {
                                            setStore('monitor.isLoading', true)
                                            window.monitor.disconnect()
                                        }}
                                    >
                                        Disconnect
                                    </Button>
                                </>
                            )}
                            <Button
                                className="mx-2 min-w-[6rem]"
                                color="secondary"
                                disabled={!store.monitor.buffer.length}
                                onClick={() => {
                                    setStore('monitor.buffer', [])
                                    setStore('monitor.tabs', [store.monitor.tabs[0]])
                                    setStore('monitor.activeTab', 1)
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </Footer>
                {store.monitor.alerts.map((alert, index) => (
                    <Alert key={index} type={alert.type} text={alert.text} className="my-2" />
                ))}
            </div>
        </>
    )
}

function parseSerialMonitorBuffer(buffer: { timestamp: string; data: string }[]) {
    let activeTab: any = null
    let tabs: any[] = []

    buffer.forEach((chunk) => {
        if (chunk.data.startsWith('cmd')) {
            const params = chunk.data.split(':')[1].split(';')
            if (params[0].startsWith('end')) {
                activeTab = null
            } else {
                let tabName = params.find((param) => param.startsWith('tab='))?.split('=')[1]
                let tabType = params.find((param) => param.startsWith('type='))?.split('=')[1]

                if (tabName && tabName.startsWith('"') && tabName.endsWith('"')) {
                    tabName = tabName.split('"')[1]
                }

                if (tabType && tabType.startsWith('"') && tabType.endsWith('"')) {
                    tabType = tabType.split('"')[1]
                }

                if (!tabs.find((tab) => tab.name === tabName)) {
                    tabs.push({
                        name: tabName,
                        type: tabType || 'monitor',
                        data: [],
                    })
                }

                activeTab = tabName
            }
        } else if (activeTab !== null && tabs.find((tab) => tab.name === activeTab)) {
            tabs.find((tab) => tab.name === activeTab).data.push(chunk)
        }
    })

    return [tabs, activeTab]
}

export default React.memo(App)
