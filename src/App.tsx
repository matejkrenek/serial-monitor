import React, { useState } from 'react'
import { Alert, Button } from './components'

const App: React.FC = () => {
    console.log(useState())
    const [isVisible, setIsVisible] = useState(true)

    return (
        <div className="bg-gray-100 h-full">
            {isVisible && (
                <header className="bg-teal-400 px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="-mx-1">
                            <Button className="mx-1">Connect</Button>
                            <Button className="mx-1" color="secondary">
                                Disconnect
                            </Button>
                        </div>
                    </div>
                </header>
            )}
            <Alert
                type="error"
                text="Sorry, something went wrong please try again."
                className="my-4"
            />
            <Alert
                type="info"
                text="Sorry, something went wrong please try again."
                className="my-4"
            />
            <Alert
                type="success"
                text="Sorry, something went wrong please try again."
                className="my-4"
            />
            <Alert
                type="warning"
                text="Sorry, something went wrong please try again."
                className="my-4"
            />
        </div>
    )
}

export default App
