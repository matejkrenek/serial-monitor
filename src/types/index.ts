declare global {
    interface Window {
        monitor: {
            connect: any
            disconnect: any
            refreshPorts: any
            refreshBaudRates: any
            onPorts: any
            onError: any
            onBaudRates: any
        }
    }
}

export default null
