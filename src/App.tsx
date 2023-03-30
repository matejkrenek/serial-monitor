import React from 'react'
import { Alert, Button } from './components'
import Select from 'react-select'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]
const App: React.FC = () => {
    const [state, setState] = React.useState(true)

    return (
        <div className="bg-gray-100 h-full">
            <header className="bg-teal-400 px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center -mx-1">
                        <Select isSearchable={false} options={options} className="h-8" />
                        <Button className="mx-1">Connect</Button>
                        <Button className="mx-1" color="secondary">
                            Disconnect
                        </Button>
                    </div>
                </div>
            </header>

            <Alert
                type="error"
                text="Sorry, something went wrong please try again."
                className="my-4"
            />
        </div>
    )
}

export default App
