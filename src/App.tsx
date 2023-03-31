import React from 'react'
import { Alert, Button, Chart, Input, Select, Tab, Table, Tabs } from './components'

const App: React.FC = () => {
    const [ports, setPorts] = React.useState([])
    const [alerts, setAlerts] = React.useState<
        { type: 'info' | 'error' | 'success' | 'warning'; text: string }[]
    >([])
    const [baudrates, setBaudrates] = React.useState([])
    const [port, setPort] = React.useState<string>()
    const [baudrate, setBaudrate] = React.useState<string>()

    React.useEffect(() => {
        window.monitor.onPorts((_: any, data: any) => {
            setPorts(
                data.map((port: any) => ({
                    value: port.path,
                    label: port.path,
                }))
            )
            setAlerts((prevState) => [
                ...prevState,
                {
                    type: 'info',
                    text: 'Ports were updated',
                },
            ])
        })
        window.monitor.onBaudRates((_: any, data: any) => {
            setBaudrates(
                data.map((baudRate: any) => ({
                    value: baudRate,
                    label: baudRate,
                }))
            )
        })
        window.monitor.refreshPorts()
        window.monitor.refreshBaudRates()
    }, [])

    return (
        <div className="bg-gray-100 h-full flex flex-col relative">
            <header className="bg-teal-400 px-2 py-4">
                <div className="">
                    <div className="flex items-center w-full">
                        <Input className="mx-2 min-w-[12rem]" placeholder="Message" />
                        <Button className="mx-2 min-w-[6rem]">Send</Button>
                    </div>
                </div>
            </header>

            <Tabs
                value={0}
                className="flex-grow"
                handlers={[
                    {
                        label: 'Monitor',
                        value: 0,
                    },
                    {
                        label: 'Charts',
                        value: 1,
                    },
                    {
                        label: 'Data',
                        value: 2,
                    },
                ]}
            >
                <Tab index={0}>
                    <ul>
                        {Array.from(Array(100).keys()).map((num) => (
                            <li key={num} className="text-sm">
                                <span className="text-teal-400 font-semibold mr-4">
                                    2020-04-10, 15:51:23,454
                                </span>
                                <span>LED 1: OFF</span>
                            </li>
                        ))}
                    </ul>
                </Tab>
                <Tab index={1} className="h-full">
                    <Chart head={['temperaterue', '34']} data={[]} />
                </Tab>
                <Tab index={2}>
                    <Table
                        head={['time', 'humidity', 'temperature', 'dewPoint']}
                        rows={[
                            ['1085', '25', '28', '6.16'],
                            ['1085', '25', '28', '6.16'],
                            ['1085', '25', '28', '6.16'],
                            ['1085', '25', '28', '6.16'],
                            ['1085', '25', '28', '6.16'],
                            ['1085', '25', '28', '6.16'],
                        ]}
                        className="w-full"
                    />
                </Tab>
            </Tabs>
            <footer className="bg-teal-400 px-2 py-4">
                <div className="flex items-center w-full justify-end">
                    <div className="flex items-center">
                        <Select
                            className="mx-2 min-w-[8rem] max-w-[12rem]"
                            value={port}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setPort(e.target.value)
                            }
                            options={ports}
                        />
                        <Select
                            className="mx-2 min-w-[8rem] max-w-[12rem]"
                            value={baudrate}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setBaudrate(e.target.value)
                            }
                            options={baudrates}
                        />
                        <Button
                            className="mx-2 min-w-[6rem]"
                            onClick={() =>
                                window.monitor.connect({
                                    port,
                                    baudrate,
                                })
                            }
                        >
                            Connect
                        </Button>
                        <Button className="mx-2 min-w-[6rem]" color="secondary">
                            Disconnect
                        </Button>
                    </div>
                </div>
            </footer>
            {alerts.map((alert, index) => (
                <Alert type={alert.type} key={index} text={alert.text} className="my-4" />
            ))}
        </div>
    )
}

export default React.memo(App)
