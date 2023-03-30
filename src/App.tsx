import React from 'react'
import { Alert, Button, Chart, Input, Select, Tab, Table, Tabs } from './components'

const App: React.FC = () => {
    const [ports, setPorts] = React.useState([])
    const [baudrates, setBaudrates] = React.useState([
        {
            value: '300',
            label: '300',
        },
        {
            value: '600',
            label: '600',
        },
        {
            value: '900',
            label: '900',
        },
        {
            value: '1200',
            label: '1200',
        },
        {
            value: '2400',
            label: '2400',
        },
        {
            value: '4800',
            label: '4800',
        },
        {
            value: '14400',
            label: '14400',
        },
    ])
    React.useEffect(() => {
        window?.monitor.ports().then((ports: any) =>
            setPorts(
                ports.map((port: any) => {
                    return { label: port.path, value: port.path }
                })
            )
        )
    }, [])

    return (
        <div className="bg-gray-100 h-full flex flex-col relative">
            <header className="bg-teal-400 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center -mx-1 w-full">
                        <Input className="mx-1" placeholder="Message" />
                        <Button className="mx-1">Send</Button>
                        <Select className="mx-1 w-64" options={ports} />
                        <Select className="mx-1 w-64" options={baudrates} />
                        <Button className="mx-1">Connect</Button>
                        <Button className="mx-1" color="secondary">
                            Disconnect
                        </Button>
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
                    <Chart
                        head={['temperaterue', 'sdfdsf', 'fsdf']}
                        data={[
                            [1, 2, 3, 4, 5, 6],
                            [3, 4, 1],
                            [4, 4, 1, 8, 6, 8, 8, 8],
                        ]}
                    />
                </Tab>
                <Tab index={2}>
                    <Table
                        head={['time', 'humidity', 'temperature', 'dewPoint']}
                        rows={[['1085', '25', '28', '6.16']]}
                        className="w-full"
                    />
                </Tab>
            </Tabs>

            <Alert
                type="error"
                text="Sorry, something went wrong please try again."
                className="my-4"
            />
        </div>
    )
}

export default App
